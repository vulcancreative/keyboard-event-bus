import React, { useState } from "react";
import { useKeyboardEventBus, Key } from "../src";

interface Shortcut {
  keys: Key[],
  text: string;
  removeCallback?: () => void;
}

const ShortcutForm = () => {
  const [mod1, setMod1] = useState<any>(Key.ALT);
  const [mod2, setMod2] = useState<any>(Key.SHIFT);
  const [char, setChar] = useState<any>(Key.CHAR_K);
  const [text, setText] = useState<any>("This is my first alert");
  const [shortcutList, setShortcutList] = useState<Shortcut[]>([]);
  const shortcut = useKeyboardEventBus();

  const buttonDisabled = () => {
    if (text === "") {
      return true;
    }
    return false;
  }

  const onAddShortcut = () => {
    const removeCallback = shortcut?.add([mod1, mod2, char], () => {
      alert(text);
    });
    setShortcutList([
      ...shortcutList,
      {
        keys: [mod1, mod2, char],
        text,
        removeCallback,
      },
    ]);
    setText("");
  }

  const onRemove = (key: number) => {
    const shortcutItem = shortcutList[key];
    if (shortcutItem?.removeCallback) {
      shortcutItem?.removeCallback();
    }
    setShortcutList(shortcutList?.filter((s, i) => i !== key));
  }

  return (
    <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
      <h1 style={{ marginBottom: 30 }}>Keyboard Event Bus Demo</h1>
      <div className="row">
        <div className="col">
          <h2 style={{ marginBottom: 20 }}>Add new shortcut</h2>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Modifier 1
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setMod1(e.target.value)}
                value={mod1}
              >
                <option value={Key.ALT}>{Key.ALT}</option>
                <option value={Key.ALT_LEFT}>{Key.ALT_LEFT}</option>
                <option value={Key.ALT_RIGHT}>{Key.ALT_RIGHT}</option>
                <option value={Key.SHIFT}>{Key.SHIFT}</option>
                <option value={Key.SHIFT_LEFT}>{Key.SHIFT_LEFT}</option>
                <option value={Key.SHIFT_RIGHT}>{Key.SHIFT_RIGHT}</option>
                <option value={Key.CMD_CTRL}>
                  {Key.CMD_CTRL} (Command on MacOS, Ctrl on Windows)
                </option>
                <option value={Key.CMD}>{Key.CMD}</option>
                <option value={Key.CTRL}>{Key.CTRL}</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Modifier 2
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setMod2(e.target.value)}
                value={mod2}
              >
                <option value={Key.ALT}>{Key.ALT}</option>
                <option value={Key.ALT_LEFT}>{Key.ALT_LEFT}</option>
                <option value={Key.ALT_RIGHT}>{Key.ALT_RIGHT}</option>
                <option value={Key.SHIFT}>{Key.SHIFT}</option>
                <option value={Key.SHIFT_LEFT}>{Key.SHIFT_LEFT}</option>
                <option value={Key.SHIFT_RIGHT}>{Key.SHIFT_RIGHT}</option>
                <option value={Key.CMD_CTRL}>
                  {Key.CMD_CTRL} (Command on MacOS, Ctrl on Windows)
                </option>
                <option value={Key.CMD}>{Key.CMD}</option>
                <option value={Key.CTRL}>{Key.CTRL}</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Char Key
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setChar(e.target.value)}
                value={char}
              >
                <option value={Key.CHAR_A}>{Key.CHAR_A}</option>
                <option value={Key.CHAR_B}>{Key.CHAR_B}</option>
                <option value={Key.CHAR_C}>{Key.CHAR_C}</option>
                <option value={Key.CHAR_D}>{Key.CHAR_D}</option>
                <option value={Key.CHAR_E}>{Key.CHAR_E}</option>
                <option value={Key.CHAR_F}>{Key.CHAR_F}</option>
                <option value={Key.CHAR_G}>{Key.CHAR_G}</option>
                <option value={Key.CHAR_H}>{Key.CHAR_H}</option>
                <option value={Key.CHAR_I}>{Key.CHAR_I}</option>
                <option value={Key.CHAR_J}>{Key.CHAR_J}</option>
                <option value={Key.CHAR_K}>{Key.CHAR_K}</option>
                <option value={Key.CHAR_L}>{Key.CHAR_L}</option>
                <option value={Key.CHAR_M}>{Key.CHAR_M}</option>
                <option value={Key.CHAR_N}>{Key.CHAR_N}</option>
                <option value={Key.CHAR_O}>{Key.CHAR_O}</option>
                <option value={Key.CHAR_P}>{Key.CHAR_P}</option>
                <option value={Key.CHAR_Q}>{Key.CHAR_Q}</option>
                <option value={Key.CHAR_R}>{Key.CHAR_R}</option>
                <option value={Key.CHAR_S}>{Key.CHAR_S}</option>
                <option value={Key.CHAR_T}>{Key.CHAR_T}</option>
                <option value={Key.CHAR_U}>{Key.CHAR_U}</option>
                <option value={Key.CHAR_V}>{Key.CHAR_V}</option>
                <option value={Key.CHAR_W}>{Key.CHAR_W}</option>
                <option value={Key.CHAR_X}>{Key.CHAR_X}</option>
                <option value={Key.CHAR_Y}>{Key.CHAR_Y}</option>
                <option value={Key.CHAR_Z}>{Key.CHAR_Z}</option>
                <option value={Key.NUM_0}>{Key.NUM_0}</option>
                <option value={Key.NUM_1}>{Key.NUM_1}</option>
                <option value={Key.NUM_2}>{Key.NUM_2}</option>
                <option value={Key.NUM_3}>{Key.NUM_3}</option>
                <option value={Key.NUM_4}>{Key.NUM_4}</option>
                <option value={Key.NUM_5}>{Key.NUM_5}</option>
                <option value={Key.NUM_6}>{Key.NUM_6}</option>
                <option value={Key.NUM_7}>{Key.NUM_7}</option>
                <option value={Key.NUM_8}>{Key.NUM_8}</option>
                <option value={Key.NUM_9}>{Key.NUM_9}</option>
              </select>
            </div>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Text to show on alert
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setText(e.target.value)}
                value={text}
              ></textarea>
            </div>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onAddShortcut}
                disabled={buttonDisabled()}
              >
                Add Shortcut
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <h2 style={{ marginBottom: 20 }}>Shortcut list</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Keys</th>
                <th scope="col">Text</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {shortcutList?.map((shortcut, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{shortcut.keys.join(" + ")}</td>
                    <td>{shortcut.text?.substring(0, 50)}...</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemove(key)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 style={{ marginTop: 40 }}>How to use</h2>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          1. Wrap your React app with <code>KeyboardEventBusProvider</code>
        </div>
        <code>{`import {KeyboardEventBusProvider} from "@vulcancreative/keyboard-event-bus";`}</code>
        <br />
        <pre style={{ color: "var(--bs-code-color)" }}>
          <code>
            {`
<KeyboardEventBusProvider>
  <App />
</KeyboardEventBusProvider>`}
          </code>
        </pre>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          2. Inside your React app, use <code>useKeyboardEventBus</code> hook to
          add new shortcut.
        </div>
        <code>{`import { useKeyboardEventBus, Key } from "@vulcancreative/keyboard-event-bus";`}</code>
        <br />
        <pre style={{ color: "var(--bs-code-color)" }}>
          <code>
            {`
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
`}
          </code>
        </pre>
        The <code>useKeyboardEventBus</code>'s <code>add</code> method returns a
        callback to remove the shortcut from the keyboard event bus list. <br />
        Use it when you want to remove the shortcut, for example on component
        re-render.
      </div>
    </div>
  );
}

export default ShortcutForm;