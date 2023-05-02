# Keyboard Event Bus

## Demo
[https://vulcancreative.github.io/keyboard-event-bus/](https://vulcancreative.github.io/keyboard-event-bus)

## Instalation
```
npm install @vulcancreative/keyboard-event-bus
```

or 

```
yarn add @vulcancreative/keyboard-event-bus
```

## How to use
Wrap your React app with `KeyboardEventBusProvider`

```
import {KeyboardEventBusProvider} from "@vulcancreative/keyboard-event-bus";

<KeyboardEventBusProvider>
  <App />
</KeyboardEventBusProvider>
```

Inside your React app, use useKeyboardEventBus hook to add new shortcut.

```
import { useKeyboardEventBus, Key } from "@vulcancreative/keyboard-event-bus";

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
