# Duration [![Build Status](https://travis-ci.org/icholy/Duration.js.png?branch=master)](https://travis-ci.org/icholy/Duration.js)

This is a library for dealing with durations. 
It works well with javascript's Date objects.

**Note:** For compatibility with Go's `time.Duration` use the [golang_compatible](https://github.com/icholy/Duration.js/tree/golang_compatible) branch.


``` sh
$ npm install @icholy/duration
```

``` js
import { Duration } from "@icholy/duration";
```

### Parse

* `ms` - millisecond
* `s` - second
* `m` - minute
* `h` - hour
* `d` - day
* `w` - week

``` js
var d = new Duration("6w5d4h3m2s1ms");

console.log(
    d.milliseconds(), "\n", // => 4075382001
    d.seconds(),      "\n", // => 4075382
    d.minutes(),      "\n", // => 67923
    d.hours(),        "\n", // => 1132
    d.days(),         "\n", // => 47
    d.weeks(),        "\n"  // => 6
);
```

### Format
``` js
console.log(
  "str:",  Duration.hour.toString(),
  "ms:",   Duration.hour.valueOf()
); // => "str: 1h ms: 3600000"
```

### Basic Operations
``` js
// Addition
var d1 = new Duration("6d"),
    d2 = new Duration(d1 + Duration.day);
console.log(d2.toString()) // => "168h"

// Multiplication
var d3 = new Duration("5m"),
    d4 = new Duration(d3 * 12);
console.log(d4.toString()) // => "1h"

// etc ...
```

### Dates
``` js
// Adding duration to date
var d     = Duration.parse("5h"),
    now   = new Date(),
    later = new Date(now + d);
console.log(later.toString());

// Duration between two dates
var bday = new Date("March 3, 1991"),
    now  = new Date(),
    age  = new Duration(now - bday);
console.log(age.toString());
```

### setTimeout / setInterval

``` js
setTimeout(function () {
    // runs 5 minutes later
}, new Duration("5m"));

setInterval(function () {
    // runs every 10 seconds 
}, 10 * Duration.second);
```

