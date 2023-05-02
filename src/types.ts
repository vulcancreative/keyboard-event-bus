export type EBCallback = (...args: any[]) => any;
export type EBTarget = HTMLElement | React.Component;

export interface EBSub {
  name: string;
  id: string;
  target?: EBTarget;
  callback: EBCallback;
}

export interface IPublisher {
  target?: EBTarget;
  id: string;
  name: string;
  keys: Key[];
  subscribers?: EBSub[];
}

export interface ShortcutSetting {
  [name: string]: Key[];
}

export enum Key {
  SHIFT_LEFT = "ShiftLeft",
  SHIFT_RIGHT = "ShiftRight",
  SHIFT = "Shift",
  TAB = "Tab",
  CTRL_LEFT = "ControlLeft",
  CTRL_RIGHT = "ControlRight",
  CTRL = "Control",
  CMD_CTRL = "CommandControl",
  ALT_LEFT = "AltLeft",
  ALT_RIGHT = "AltRight",
  ALT = "Alt",
  CMD_LEFT = "MetaLeft",
  CMD_RIGHT = "MetaRight",
  CMD = "Meta",
  BACKSPACE = "Backspace",
  ENTER = "Enter",
  CAPSLOCK = "CapsLock",
  CHAR_A = "a",
  CHAR_B = "b",
  CHAR_C = "c",
  CHAR_D = "d",
  CHAR_E = "e",
  CHAR_F = "f",
  CHAR_G = "g",
  CHAR_H = "h",
  CHAR_I = "i",
  CHAR_J = "j",
  CHAR_K = "k",
  CHAR_L = "l",
  CHAR_M = "m",
  CHAR_N = "n",
  CHAR_O = "o",
  CHAR_P = "p",
  CHAR_Q = "q",
  CHAR_R = "r",
  CHAR_S = "s",
  CHAR_T = "t",
  CHAR_U = "u",
  CHAR_V = "v",
  CHAR_W = "w",
  CHAR_X = "x",
  CHAR_Y = "y",
  CHAR_Z = "z",
  NUM_0 = "0",
  NUM_1 = "1",
  NUM_2 = "2",
  NUM_3 = "3",
  NUM_4 = "4",
  NUM_5 = "5",
  NUM_6 = "6",
  NUM_7 = "7",
  NUM_8 = "8",
  NUM_9 = "9",
  BACKQUOTE = "`",
  SLASH = "/",
  BACKSLASH = "\\",
}

export interface IShortcutContext {
  activeKeys: string[];
  addPublisher: (
    name: string,
    keys: Key[],
    target?: EBTarget
  ) => IPublisher | undefined;
  removePublisher: (nameOrId: string) => void;
  removeAllPublishers: () => void;
  addSubscriber: (
    name: string,
    publisherNameOrId: string,
    callback: EBCallback,
    target?: EBTarget
  ) => EBSub | undefined;
  removeSubscriber: (publisherNameOrId: string, nameOrId: string) => void;
  removeAllSubscribers: (publisherNameOrId: string) => void;
  add: (keys: Key[], callback: () => void) => () => void;
}