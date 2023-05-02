import { useEffect, useRef, useState } from "react";
import getLocalizedKey from "../helpers/get-localized-key";
import KeyboardEventBus from "../helpers/keyboard-event-bus";
import { Key } from "../types";

const useShortcut = () => {
  const activeKeysRef = useRef<Key[]>([]);
  const [activeKeys, setActiveKeys] = useState<Key[]>([]);

  useEffect(() => {
    if (!activeKeys.length) {
      return;
    }
    const matchesPublishers =
      KeyboardEventBus.instance.filterPublisherByKeys(activeKeys);
    if (matchesPublishers.length) {
      KeyboardEventBus.instance.fireAllCallbacks(matchesPublishers);
    }
  }, [activeKeys]);

  const resetKeys = () => {
    activeKeysRef.current = [];
    setActiveKeys(activeKeysRef.current);
  };

  const addKey = (key: Key) => {
    if (activeKeysRef.current.includes(key)) {
      return;
    }
    activeKeysRef.current = [...activeKeysRef.current, key];
    setActiveKeys(activeKeysRef.current);
  };

  useEffect(() => {
    const onKeyDown = async (evt: KeyboardEvent) => {
      const event = evt || (window.event as KeyboardEvent);
      const key = await getLocalizedKey(event);
      addKey(key as Key);
    };
    const onKeyUp = async () => {
      resetKeys();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    // Detect window blur event and reset all
    window.addEventListener("blur", () => {
      resetKeys();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", resetKeys);
    };
  }, []);

  return [activeKeys];
};

export default useShortcut;
