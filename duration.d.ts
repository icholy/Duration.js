type DurationLike = Duration | string | number;
type DateLike = Date | number;

declare class Duration {

    private _milliseconds: number;

    constructor(value?: DurationLike);

    static millisecond: Duration;
    static second:      Duration;
    static minute:      Duration;
    static hour:        Duration;
    static day:         Duration;
    static week:        Duration;

    static milliseconds(milliseconds: number): Duration;
    static seconds(seconds: number):           Duration;
    static minutes(minutes: number):           Duration;
    static hours(hours: number):               Duration;
    static days(days: number):                 Duration;
    static weeks(weeks: number):               Duration;

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

    isGreaterThan(duration: DurationLike): boolean;
    isLessThan(duration: DurationLike):    boolean;
    isEqualTo(duration: DurationLike):     boolean;

    roundTo(duration: DurationLike): void;

    after(date: DateLike): Date;

    static since(date: DateLike):             Duration;
    static until(date: DateLike):             Duration;
    static between(a: DateLike, b: DateLike): Duration;
    static parse(duration: string):           Duration;
    static fromMicroseconds(us: number):      Duration;
    static fromNanoseconds(ns: number):       Duration;

    static add(a: Duration, b: Duration):      Duration;
    static subtract(a: Duration, b: Duration): Duration;
    static multiply(a: Duration, b: number):   Duration;
    static multiply(a: number, b: Duration):   Duration;
    static divide(a: Duration, b: Duration):   number;
    static abs(d: DurationLike):               Duration;
}

