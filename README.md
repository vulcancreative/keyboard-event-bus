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

Inside your React app, use the `useKeyboardEventBus` hook to add new shortcut.

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

## List of available keys

| Key         | Description   |
|-------------|---------------|
| SHIFT_LEFT  | Left Shift    |
| SHIFT_RIGHT | Right Shift   |
| SHIFT       | All Shift         |
| TAB         | Tab           |
| CTRL_LEFT   | Left Control  |
| CTRL_RIGHT  | Right Control |
| CTRL        | Control       |
| CMD_CTRL    | Command / Control (Use Command on MacOs and Control on Windows)|
| ALT_LEFT    | Left Alt      |
| ALT_RIGHT   | Right Alt      |
| ALT         | All Alt           |
| CMD_LEFT    | Left  Meta / Command    |
| CMD_RIGHT   | Right Meta / Command     |
| CMD         | All Meta / Command      |
| BACKSPACE   | Backspace     |
| ENTER       | Enter         |
| CAPSLOCK    | CapsLock      |
| CHAR_A      | a             |
| CHAR_B      | b             |
| CHAR_C      | c             |
| CHAR_D      | d             |
| CHAR_E      | e             |
| CHAR_F      | f             |
| CHAR_G      | g             |
| CHAR_H      | h             |
| CHAR_I      | i             |
| CHAR_J      | j             |
| CHAR_K      | k             |
| CHAR_L      | l             |
| CHAR_M      | m             |
| CHAR_N      | n             |
| CHAR_O      | o             |
| CHAR_P      | p             |
| CHAR_Q      | q             |
| CHAR_R      | r             |
| CHAR_S      | s             |
| CHAR_T      | t             |
| CHAR_U      | u             |
| CHAR_V      | v             |
| CHAR_W      | w             |
| CHAR_X      | x             |
| CHAR_Y      | y             |
| CHAR_Z      | z             |
| NUM_0       | 0             |
| NUM_1       | 1             |
| NUM_2       | 2             |
| NUM_3       | 3             |
| NUM_4       | 4             |
| NUM_5       | 5             |
| NUM_6       | 6             |
| NUM_7       | 7             |
| NUM_8       | 8             |
| NUM_9       | 9             |
| BACKQUOTE   | `             |
| SLASH       | /             |
| BACKSLASH   | \\            |

