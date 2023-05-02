<a target="_blank" href="https://www.npmjs.com/package/@vulcancreative/keyboard-event-bus"><img src="https://img.shields.io/npm/v/@vulcancreative/keyboard-event-bus" /></a>

# Keyboard Event Bus
A lightweight package for handling keyboard events and triggering user-defined actions in React applications

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

```js
import {KeyboardEventBusProvider} from "@vulcancreative/keyboard-event-bus";

<KeyboardEventBusProvider>
  <App />
</KeyboardEventBusProvider>
```

Inside your React app, use useKeyboardEventBus hook to add new shortcut.

```js
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
