declare class Duration {

  private _milliseconds: number;

  constructor(value?: string|number|Duration);

  static millisecond: Duration;
  static second:      Duration;
  static minute:      Duration;
  static hour:        Duration;
  static day:         Duration;
  static week:        Duration;

  nanoseconds():  number;
  microseconds(): number;
  milliseconds(): number;
  seconds():      number;
  minutes():      number;
  hours():        number;
  days():         number;
  weeks():        number;

  toString(): string;
  valueOf():  number;

  roundTo(duration: string|number|Duration): void;

  static parse(duration: string):      Duration;
  static fromMicroseconds(us: number): Duration;
  static fromNanoseconds(ns: number):  Duration;
  static since(date: Date|number):     Duration;
  static after(date: Date|number):     Duration;
}

