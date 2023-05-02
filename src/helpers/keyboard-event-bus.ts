import { EBCallback, EBSub, EBTarget, IPublisher, Key } from "../types";
import { v1 as uuidv1 } from "uuid";
import sortStringArray from "./sort-string-array";
import getOS from "./get-os";

class KeyboardEventBus {
  keyMapping: { [key: string]: Key[] } = {
    [Key.ALT as string]: [Key.ALT_LEFT, Key.ALT_RIGHT],
    [Key.SHIFT as string]: [Key.SHIFT_LEFT, Key.SHIFT_RIGHT],
    [Key.CMD as string]: [Key.CMD_LEFT, Key.CMD_RIGHT],
    [Key.CTRL as string]: [Key.CTRL_LEFT, Key.CTRL_RIGHT],
    [Key.CMD_CTRL as string]: [
      Key.CTRL_LEFT,
      Key.CTRL_RIGHT,
      Key.CMD_LEFT,
      Key.CMD_RIGHT,
    ],
  };
  static inst?: KeyboardEventBus;
  static get instance(): KeyboardEventBus {
    if (KeyboardEventBus.inst) {
      return KeyboardEventBus.inst;
    }
    KeyboardEventBus.inst = new KeyboardEventBus();
    return KeyboardEventBus.inst;
  }

  private _publishers: IPublisher[] = [];

  getAllPublishers(): IPublisher[] {
    return this._publishers;
  }

  lowercaseArrayJoin(arr: any[]) {
    return arr?.map((a) => a?.toLowerCase()).join("");
  }

  generateCombinations(...inputArrays: Key[][]): Key[][] {
    // Base case: return the first array as-is if there's only one input array
    if (inputArrays.length === 1) {
      return inputArrays[0].map((e) => [e]);
    }
    // Recursive case:
    // Generate combinations for the rest of the arrays and then combine with the first array
    const restCombinations = this.generateCombinations(...inputArrays.slice(1));

    let result = [];

    for (let i = 0; i < inputArrays[0].length; i++) {
      for (let j = 0; j < restCombinations.length; j++) {
        result.push([inputArrays[0][i], ...restCombinations[j]]);
      }
    }

    return result;
  }

  filterPublisherByKeys(keys: Key[]): IPublisher[] {
    const sortedKeys = sortStringArray<Key>(keys);
    const publishers = this._publishers.filter((pub) => {
      const sortedPubKeys: Key[] = sortStringArray<Key>(pub.keys);
      // check if one of the key has mapping defined
      const mappedKeys = sortedPubKeys?.map((key) => {
        return this.keyMapping[key] || [key];
      })

      const combination = this.generateCombinations(...mappedKeys);
      const lowercaseKeys = combination
        ?.map(sortStringArray)
        ?.map(this.lowercaseArrayJoin);

      if (lowercaseKeys?.includes(this.lowercaseArrayJoin(sortedKeys))) {
        return true;
      }
      return false;
    });
    return publishers;
  }

  fireAllCallbacks(publishers: IPublisher[]): void {
    publishers?.forEach((publisher) => {
      const subscribers = publisher.subscribers;
      subscribers?.forEach((subscriber) => {
        if (subscriber.callback) {
          subscriber.callback();
        }
      });
    });
  }

  addOnce(keys: Key[], callback: () => void) {
    const name = uuidv1();
    this.addPublisher(name, keys);
    this.addSubscriber(`sub_${name}`, name, callback);
    return () => {
      this.removePublisher(name);
      this.removeSubscriber(name, `sub_${name}`);
    };
  }

  addPublisher(
    name: string,
    keys: Key[],
    target?: EBTarget
  ): IPublisher | undefined {
    // Check if a publisher with same name is already exist
    if (this.doesExist(name)) {
      return;
    }
    // Generate unique id for publisher
    const id = uuidv1();
    const publisher: IPublisher = {
      target,
      id,
      name,
      keys,
      subscribers: [],
    };
    this._publishers = [...this._publishers, publisher];
    return publisher;
  }

  removePublisher(nameOrId: string): void {
    this._publishers = this._publishers.filter(
      (publisher) => publisher.id !== nameOrId && publisher.name !== nameOrId
    );
  }

  removeAllPublishers(): void {
    this._publishers = [];
  }

  addSubscriber(
    name: string,
    publisherNameOrId: string,
    callback: EBCallback,
    target?: EBTarget
  ): EBSub | undefined {
    // Check if publisher exist
    if (!this.doesExist(publisherNameOrId)) {
      throw new Error("Publisher does not exist.");
    }

    // Generate unique ID for subscriber
    const id = uuidv1();
    const subscriber: EBSub = {
      id,
      name,
      target,
      callback,
    };

    this._publishers = this._publishers?.map((publisher) => {
      if ([publisher.id, publisher.name].includes(publisherNameOrId)) {
        return {
          ...publisher,
          subscribers: [...(publisher.subscribers || []), subscriber],
        };
      }
      return publisher;
    });

    return subscriber;
  }

  removeSubscriber(publisherNameOrId: string, nameOrId: string): void {
    this._publishers = this._publishers?.map((publisher) => {
      if ([publisher.id, publisher.name].includes(publisherNameOrId)) {
        return {
          ...publisher,
          subscribers: publisher.subscribers?.filter(
            (_sub) => _sub.id !== nameOrId && _sub.name !== nameOrId
          ),
        };
      }
      return publisher;
    });
  }

  removeAllSubscribers(publisherNameOrId: string): void {
    this._publishers = this._publishers?.map((publisher) => {
      if ([publisher.id, publisher.name].includes(publisherNameOrId)) {
        return {
          ...publisher,
          subscribers: [],
        };
      }
      return publisher;
    });
  }

  doesExist(publisherNameOrId: string): boolean {
    const publisher = this._publishers.find((_pub) =>
      [_pub.name, _pub.id].includes(publisherNameOrId)
    );
    if (publisher) {
      return true;
    }
    return false;
  }
}

export default KeyboardEventBus;
