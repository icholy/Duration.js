# Duration [![Build Status](https://travis-ci.org/icholy/Duration.js.png?branch=millisecond_unit)](https://travis-ci.org/icholy/Duration.js)

This is a simple library for dealing with durations. 
It works well with javascript's Date objects.

**Note:** If you don't care about the compatibility with Go checkout out the [millisecon_unit](https://github.com/icholy/Duration.js/tree/millisecond_unit) branch. It makes working with `Date` objects much easier.

``` js
var Duration = require("./duration.js");
```

### Parse
``` js
var d = Duration.parse("6w5d4h3m2s");

console.log(
    "milliseconds", d.milliseconds(), "\n", // => 4075382000
    "seconds",      d.seconds(),      "\n", // => 4075382
    "minutes",      d.minutes(),      "\n", // => 67923
    "hours",        d.hours(),        "\n", // => 1132
    "days",         d.days(),         "\n", // => 47
    "weeks",        d.weeks(),        "\n"  // => 6
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

