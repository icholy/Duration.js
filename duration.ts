
const millisecond = 1,
      second      = 1000 * millisecond,
      minute      = 60   * second,
      hour        = 60   * minute,
      day         = 24   * hour,
      week        = 7    * day;

const microsecond = millisecond / 1000,
      nanosecond  = microsecond / 1000;

const unitMap: Record<string, number> = {
    "ns": nanosecond,
    "us": microsecond,
    "µs": microsecond,
    "μs": microsecond,
    "ms": millisecond,
    "s":  second,
    "m":  minute,
    "h":  hour,
    "d":  day,
    "w":  week
};

export type DurationLike = Duration | string | number;
export type DateLike = Date | number;

export class Duration {

  private _milliseconds: number;

  constructor(value?: DurationLike) {
    if (value instanceof Duration) {
      this._milliseconds = value.valueOf();
      return;
    }
    switch (typeof value) {
      case "number":
        if (!isFinite(value)) {
          throw new Error(`invalid duration: ${value}`);
        }
        this._milliseconds = value;
        break;
      case "string":
        this._milliseconds = Duration.parse(value).valueOf();
        break;
      case "undefined":
        this._milliseconds = 0;
        break;
      default:
        throw new Error(`invalid duration: ${value}`);
    }
  }

  static millisecond = new Duration(millisecond);
  static second      = new Duration(second);
  static minute      = new Duration(minute);
  static hour        = new Duration(hour);
  static day         = new Duration(day);
  static week        = new Duration(week);

  static microseconds(us: number): Duration {
    let ms = Math.floor(us / 1000);
    return new Duration(ms);
  }

  static nanoseconds = function (ns: number): Duration {
    let ms = Math.floor(ns / 1000000);
    return new Duration(ms);
  }

  static milliseconds(milliseconds: number): Duration {
    return new Duration(milliseconds * millisecond);
  }

  static seconds(seconds: number): Duration {
    return new Duration(seconds * second);
  }

  static minutes(minutes: number): Duration {
    return new Duration(minutes * minute);
  }

  static hours(hours: number): Duration {
    return new Duration(hours * hour);
  }

  static days(days: number): Duration {
    return new Duration(days * day);
  }

  static weeks(weeks: number): Duration {
    return new Duration(weeks * week);
  }

  nanoseconds(): number {
    return Math.floor(this._milliseconds / nanosecond);
  }

  microseconds(): number {
    return Math.floor(this._milliseconds / microsecond);
  }

  milliseconds(): number {
    return this._milliseconds;
  }

  seconds(): number {
    return Math.floor(this._milliseconds / second);
  }

  minutes(): number {
    return Math.floor(this._milliseconds / minute);
  }

  hours(): number {
    return Math.floor(this._milliseconds / hour);
  }

  days(): number {
    return Math.floor(this._milliseconds / day);
  }

  weeks(): number {
    return Math.floor(this._milliseconds / week);
  }

  toString(): string {
    let str          = "",
        milliseconds = Math.abs(this._milliseconds),
        sign         = this._milliseconds < 0 ? "-" : "";

    // no units for 0 duration
    if (milliseconds === 0) {
      return "0";
    }

    // hours
    let hours = Math.floor(milliseconds / hour);
    if (hours !== 0) {
      milliseconds -= hour * hours;
      str += hours.toString() + "h";
    }

    // minutes
    let minutes = Math.floor(milliseconds / minute);
    if (minutes !== 0) {
      milliseconds -= minute * minutes;
      str += minutes.toString() + "m";
    }

    // seconds
    let seconds = Math.floor(milliseconds / second);
    if (seconds !== 0) {
      milliseconds -= second * seconds;
      str += seconds.toString() + "s";
    }

    // milliseconds
    if (milliseconds !== 0) {
      str += milliseconds.toString() + "ms";
    }

    return sign + str;
  }

  valueOf(): number {
    return this._milliseconds;
  }

  abs(): Duration {
    return new Duration(Math.abs(this._milliseconds));
  }

  static parse(duration: string): Duration {

    if (duration === "0" || duration === "+0" || duration === "-0") {
      return new Duration(0);
    }

    let regex = /([\-\+\d\.]+)([a-zµμ]+)/g,
        total = 0,
        count = 0,
        sign  = duration[0] === '-' ? -1 : 1,
        value;

    while (true) {

      let match = regex.exec(duration);
      if (!match) {
        break;
      }

      let unit  = match[2] as string;
      value = Math.abs(parseFloat(match[1]));
      count++;

      if (isNaN(value)) {
        throw new Error(`invalid duration: "${duration}"`);
      }

      if (typeof unitMap[unit] === "undefined") {
        throw new Error(`invalid duration: "${duration}": bad unit ${unit}`);
      }

      total += value * unitMap[unit];
    }

    if (count === 0) {
      throw new Error(`invalid duration: "${duration}"`);
    }

    return new Duration(Math.floor(total) * sign);
  }

  static valueOf(duration: DurationLike): number {
    return new Duration(duration).valueOf();
  }

  truncate(duration: DurationLike): Duration {
    let ms = Duration.valueOf(duration);
    return new Duration(ms * Math.round(this._milliseconds / ms));
  }

  isGreaterThan(duration: DurationLike): boolean {
    return this.valueOf() > Duration.valueOf(duration);
  }

  isLessThan(duration: DurationLike): boolean {
    return this.valueOf() < Duration.valueOf(duration);
  }

  isEqualTo(duration: DurationLike): boolean {
    return this.valueOf() === Duration.valueOf(duration);
  }

  after(date: DateLike): Date {
    return new Date(date.valueOf() + this._milliseconds);
  }

  static since(date: DateLike): Duration {
    return new Duration(new Date().valueOf() - date.valueOf());
  }

  static until(date: DateLike): Duration {
    return new Duration(date.valueOf() - new Date().valueOf());
  }

  static between(a: DateLike, b: DateLike): Duration {
    return new Duration(b.valueOf() - a.valueOf());
  }

  static add(a: DurationLike, b: DurationLike) {
    return new Duration(Duration.valueOf(a) + Duration.valueOf(b));
  }

  static subtract(a: DurationLike, b: DurationLike): Duration {
    return new Duration(Duration.valueOf(a) - Duration.valueOf(b));
  }

  static multiply(a: DurationLike, b: DurationLike): Duration {
    return new Duration(Duration.valueOf(a) * Duration.valueOf(b));
  }

  static divide(a: DurationLike, b: DurationLike): number {
    return Duration.valueOf(a) / Duration.valueOf(b);
  }

}

export default Duration;
