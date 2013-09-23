# ParseDuration [![Build Status](https://travis-ci.org/icholy/ParseDuration.png?branch=master)](https://travis-ci.org/icholy/ParseDuration) 

This is a port of Go's [Time/ParseDuration](http://golang.org/pkg/time/#ParseDuration) function.

It passes the same [test cases](http://golang.org/src/pkg/time/time_test.go#L1194)

``` js

var ParseDuration = require("./ParseDuration.js");

var d = ParseDuration("4h3m2s");

console.log(
    "nanoseconds",  d.nanoseconds(),  "\n",
    "microseconds", d.microseconds(), "\n",
    "milliseconds", d.milliseconds(), "\n",
    "seconds",      d.seconds(),      "\n",
    "minutes",      d.minutes(),      "\n",
    "hours",        d.hours(),        "\n"
);

```



