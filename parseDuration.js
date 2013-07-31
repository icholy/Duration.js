var nanosecond  = 1,
    microsecond = 1000 * nanosecond,
    millisecond = 1000 * microsecond,
    second      = 1000 * millisecond,
    minute      = 60   * second,
    hour        = 60   * minute;

var parseDurationTests = [

  // simple
  ["0", true, 0],
  ["5s", true, 5 * second],
  ["30s", true, 30 * second],
  ["1478s", true, 1478 * second],
  
  // sign
  ["-5s", true, -5 * second],
  ["+5s", true, 5 * second],
  ["-0", true, 0],
  ["+0", true, 0],
  
  // decimal
  ["5.0s", true, 5 * second],
  ["5.6s", true, 5*second + 600*millisecond],
  ["5.s", true, 5 * second],
  [".5s", true, 500 * millisecond],
  ["1.0s", true, 1 * second],
  ["1.00s", true, 1 * second],
  ["1.004s", true, 1*second + 4*millisecond],
  ["1.0040s", true, 1*second + 4*millisecond],
  ["100.00100s", true, 100*second + 1*millisecond],
  
  // different units
  ["10ns", true, 10 * nanosecond],
  ["11us", true, 11 * microsecond],
  ["12µs", true, 12 * microsecond}, // U+00]5
  ["12μs", true, 12 * microsecond}, // U+03]C
  ["13ms", true, 13 * millisecond],
  ["14s", true, 14 * second],
  ["15m", true, 15 * minute],
  ["16h", true, 16 * hour],
  
  // composite durations
  ["3h30m", true, 3*hour + 30*minute],
  ["10.5s4m", true, 4*minute + 10*second + 500*millisecond],
  ["-2m3.4s", true, -(2*minute + 3*second + 400*millisecond)],
  ["1h2m3s4ms5us6ns", true, 1*hour + 2*minute + 3*second + 4*millisecond + 5*microsecond + 6*nanosecond],
  ["39h9m14.425s", true, 39*hour + 9*minute + 14*second + 425*millisecond],
  
  // large value
  ["52763797000ns", true, 52763797000 * nanosecond],
  
  // errors
  ["", false, 0],
  ["3", false, 0],
  ["-", false, 0],
  ["s", false, 0],
  [".", false, 0],
  ["-.", false, 0],
  [".s", false, 0],
  ["+.s", false, 0]

];

var parseDuration = function (duration) {

    var regex = /([\+\-\d\.]+)(\w+)/g,
        total = 0,
        unit, value, match;

    while (match = regex.exec(duration)) {

        unit  = match[2];
        value = parseFloat(match[1]);

        switch (unit) {

        case "ns": total += value * nanosecond;  break;
        case "us": total += value * microsecond; break;
        case "µs": total += value * microsecond; break;
        case "ms": total += value * millisecond; break;
        case "s":  total += value * second;      break;
        case "m":  total += value * minute;      break;
        case "h":  total += value * hour;        break;

        default: throw new Error("invalid unit " + unit);

        }
    }

    return total;
};
