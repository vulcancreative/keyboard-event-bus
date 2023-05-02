# Keyboard Event Bus

## How to use
Wrap your React app with `KeyboardEventBusProvider`

```
import {KeyboardEventBusProvider} from "../src";

<KeyboardEventBusProvider>
  <App />
</KeyboardEventBusProvider>
```

Inside your React app, use useKeyboardEventBus hook to add new shortcut.

```
import { useKeyboardEventBus, Key } from "../src";

const App = () => {
  const shortcut = useKeyboardEventBus();

  useEffect(() => {
    const removeShortcut = shortcut?.add([Key.CMD_CTRL, Key.SHIFT, Key.CHAR_K], () => {
      alert("This will show when you hit your shortcut");
    });
    return () => {
      if (removeShortcut) {
        removeShortcut();
      }
    }
  }, []);
}
```

The `useKeyboardEventBus`'s `add` method returns a callback to remove the shortcut from the keyboard event bus list.
Use it when you want to remove the shortcut, for example on component re-render.