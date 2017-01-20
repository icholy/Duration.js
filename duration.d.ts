type DurationLike = Duration | string | number;

declare class Duration {

  private _milliseconds: number;

  constructor(value?: DurationLike);

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

  roundTo(duration: DurationLike): void;

  after(date: Date | number): Duration;

  static since(date: Date | number):   Duration;
  static parse(duration: string):      Duration;
  static fromMicroseconds(us: number): Duration;
  static fromNanoseconds(ns: number):  Duration;

  static add(a: Duration, b: Duration):      Duration;
  static subtract(a: Duration, b: Duration): Duration;
  static multiply(a: Duration, b: number):   Duration;
  static multiply(a: number: b: Duration):   Duration;
  static divide(a: Duration, b: Duration):   number;
}

