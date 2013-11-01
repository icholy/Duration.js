# Duration [![Build Status](https://travis-ci.org/icholy/Duration.js.png?branch=master)](https://travis-ci.org/icholy/Duration.js)
This is a port of Go's [Time/ParseDuration](http://golang.org/pkg/time/#ParseDuration) functionality.

It passes the same [test cases](http://golang.org/src/pkg/time/time_test.go#L1194)

``` js
var Duration = require("./duration.js");
```

### Parse duration string
``` js
var d = Duration.parse("4h3m2s");

console.log(
    "nanoseconds",  d.nanoseconds(),  "\n", // => 14582000000000
    "microseconds", d.microseconds(), "\n", // => 14582000000
    "milliseconds", d.milliseconds(), "\n", // => 14582000
    "seconds",      d.seconds(),      "\n", // => 14582
    "minutes",      d.minutes(),      "\n", // => 243
    "hours",        d.hours(),        "\n"  // => 4
);
```

### Create duration string
``` js
console.log(
  "str:",  Duration.hour.toString(),
  "nano:", Duration.hour.valueOf()
); // => "str: 1h nano: 3600000000000"
```

### Can use basic operators
``` js
// Addition
var d1 = Duration.parse("2h"),
    d2 = new Duration(d1 + Duration.hour);
console.log(d2.toString()) // => "3h"

// Multiplication
var d1 = Duration.parse("5m"),
    d2 = new Duration(d1 * 12);
console.log(d2.toString()) // => "1h"
```

### Working with Date
``` js
// Adding duration to date
var d     = Duration.parse("5h"),
    now   = new Date(),
    later = new Date(now + d.milliseconds());
console.log(later);

// Duration between two dates
var bday = Date.parse("March 3, 1991"),
    now  = new Date(),
    age  = new Duration((now - bday) * Duration.millisecond);
console.log(age.toString());
```

