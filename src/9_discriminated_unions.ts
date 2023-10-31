export interface MouseEvent {
  type: "mouse";
  button: number;
  clientX: number;
  clientY: number;
}
export interface KeyboardEvent {
  type: "keyboard";
  key: string;
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
}
export interface TouchEvent {
  type: "touch";
  points: number;
}
type Event = MouseEvent | KeyboardEvent | TouchEvent;

function handleEvent(event: Event): string {
  switch (event.type) {
    case "keyboard":
      return `Keyboard Event - Key = ${event.key}`;
    case "touch":
      return `Touch Event - Point = ${event.points}`;
    case "mouse":
      return "Mouse Event - (X, Y) = " + `(${event.clientX}, ${event.clientY})`;
    // case "something else": // Anything else will not compile
    //   return "Something else";
  }
}

console.log(
  handleEvent({
    type: "mouse",
    button: 0,
    clientX: 10,
    clientY: 20,
  }),
);

function assertNever(obj: any): never {
  throw new Error(`Unexpected object: ${obj}`);
}

function handleKeyboardEvent(event: Event): string {
  switch (event.type) {
    case "keyboard":
      return `Keyboard Event - Key = ${event.key}`;
    default:
      assertNever(event);
  }
}

console.log(
  handleKeyboardEvent({
    type: "keyboard",
    key: "a",
    shiftKey: false,
    ctrlKey: false,
    altKey: false,
  }),
);
