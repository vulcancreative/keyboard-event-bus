import React, { useEffect, useState } from "react";
import { IShortcutContext, ShortcutSetting } from "../types";
import KeyboardEventBus from "../helpers/keyboard-event-bus";
import useShortcut from "../hooks/use-shortcut";

export const ShortcutContext = React.createContext<IShortcutContext | null>(
  null
);

const ShortcutProvider = ({
  children,
  defaultShortcuts,
}: {
  children: React.ReactElement;
  defaultShortcuts?: ShortcutSetting;
}) => {
  const [activeKeys] = useShortcut();

  return (
    <ShortcutContext.Provider
      value={{
        activeKeys,
        add: (keys, callback) => KeyboardEventBus.instance.addOnce(keys, callback),
        addPublisher: (name, keys, target) =>
          KeyboardEventBus.instance.addPublisher(name, keys, target),
        removePublisher: (nameOrId) =>
          KeyboardEventBus.instance.removePublisher(nameOrId),
        removeAllPublishers: () =>
          KeyboardEventBus.instance.removeAllPublishers(),
        addSubscriber: (name, publisherNameOrId, callback, target) =>
          KeyboardEventBus.instance.addSubscriber(
            name,
            publisherNameOrId,
            callback,
            target
          ),
        removeSubscriber: (publisherNameOrId, nameOrId) =>
          KeyboardEventBus.instance.removeSubscriber(
            publisherNameOrId,
            nameOrId
          ),
        removeAllSubscribers: (publisherNameOrId) =>
          KeyboardEventBus.instance.removeAllSubscribers(publisherNameOrId),
      }}
    >
      <ShortcutWrapper defaultShortcuts={defaultShortcuts}>
        {children}
      </ShortcutWrapper>
    </ShortcutContext.Provider>
  );
};

const ShortcutWrapper = ({
  children,
  defaultShortcuts,
}: {
  children: React.ReactElement;
  defaultShortcuts?: ShortcutSetting;
}) => {
  const [isReady, setReady] = useState(false);

  // Init shortcuts
  useEffect(() => {
    if (defaultShortcuts) {
      const shortcutArray = Object.keys(defaultShortcuts);
      shortcutArray?.forEach((shortcutKey) => {
        const keys = defaultShortcuts[shortcutKey];
        KeyboardEventBus.instance.addPublisher(shortcutKey, keys);
      });
    }
    setReady(true);

    return () => {
      setReady(false);
    };
  }, [defaultShortcuts]);

  if (!isReady) {
    return null;
  }

  return children;
};

export default ShortcutProvider;
