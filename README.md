# Duration [![Build Status](https://travis-ci.org/icholy/Duration.js.png?branch=master)](https://travis-ci.org/icholy/Duration.js)

This is a simple library for dealing with durations. 
It works well with javascript's Date objects.

**Note:** For compatibility with Go's `time.Duration` use the [golang_compatible](https://github.com/icholy/Duration.js/tree/golang_compatible) branch.

``` js
var Duration = require("./duration.js");
```

### Parse

* `ms` - millisecond
* `s` - second
* `m` - minute
* `h` - hour
* `d` - day
* `w` - week

``` js
var d = Duration.parse("6w5d4h3m2s1ms");

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
var d1 = Duration.parse("6d"),
    d2 = new Duration(d1 + Duration.day);
console.log(d2.toString()) // => "1w"

// Multiplication
var d1 = Duration.parse("5m"),
    d2 = new Duration(d1 * 12);
console.log(d2.toString()) // => "1h"

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
var bday = Date.parse("March 3, 1991"),
    now  = new Date(),
    age  = new Duration(now - bday);
console.log(age.toString());
```

### setTimeout / setInterval

``` js
setTimeout(function () {
    // runs 5 minutes later
}, Duration.parse("5m"));

setInterval(function () {
    // runs every 10 seconds 
}, 10 * Duration.second);
```


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/icholy/duration.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

