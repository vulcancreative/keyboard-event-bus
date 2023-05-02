import { useContext } from "react";
import { ShortcutContext } from "../providers/shortcut";

const useKeyboardEventBus = () => {
  const shortcut = useContext(ShortcutContext);
  return shortcut;
}

export default useKeyboardEventBus;