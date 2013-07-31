var nanosecond  = 1,
    microsecond = 1000 * nanosecond,
    millisecond = 1000 * microsecond,
    second      = 1000 * millisecond,
    minute      = 60   * second,
    hour        = 60   * minute;

var parseDuration = function (duration) {

    if (duration === "0" || duration === "+0" || duration === "-0") {
      return 0;
    }

    var regex = /([\-\+\d\.]+)([a-zµμ]+)/g,
        total = 0,
        count = 0,
        sign  = duration[0] === '-' ? -1 : 1,
        unit, value, match;

    while (match = regex.exec(duration)) {

        unit  = match[2];
        value = Math.abs(parseFloat(match[1]));
        count++;

        if (isNaN(value)) {
          throw new Error("invalid duration");
        }

        switch (unit) {

        case "ns" : total += value * nanosecond;  break;
        case "us" : total += value * microsecond; break;
        case "µs" : total += value * microsecond; break;
        case "μs" : total += value * microsecond; break;
        case "ms" : total += value * millisecond; break;
        case "s"  : total += value * second;      break;
        case "m"  : total += value * minute;      break;
        case "h"  : total += value * hour;        break;

        default: throw new Error("invalid unit " + unit);

        }
    }

    if (count === 0) {
      throw new Error("invalid duration");
    }

    return total * sign;
};

if (typeof module !== "undefined") {
   module.exports = parseDuration;
}
