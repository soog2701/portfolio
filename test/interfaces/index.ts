/* You can include shared interfaces/types in a separate file
and then use them in any component by importing them. For
example, to import the interface below do:

import User from 'path/to/interfaces'; */

export type User = {
  id: number
  name: string
}
export interface EventTarget {
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  dispatchEvent(evt: Event): boolean;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

export interface SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: Date;
  type: string;
}
