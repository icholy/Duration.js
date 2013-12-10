
var Duration = require("./duration.js"),
    expect   = require("chai").expect;

var millisecond = 1,
    second      = 1000 * millisecond,
    minute      = 60   * second,
    hour        = 60   * minute,
    day         = 24   * hour,
    week        = 7    * day;

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
  ["13ms", true, 13 * millisecond],
  ["14s", true, 14 * second],
  ["15m", true, 15 * minute],
  ["16h", true, 16 * hour],
  ["11d", true, 11 * day],
  ["10w", true, 10 * week],
  
  // composite durations
  ["3h30m", true, 3*hour + 30*minute],
  ["10.5s4m", true, 4*minute + 10*second + 500*millisecond],
  ["-2m3.4s", true, -(2*minute + 3*second + 400*millisecond)],
  ["1h2m3s4ms", true, 1*hour + 2*minute + 3*second + 4*millisecond],
  ["10w5d39h9m14.425s", true, 10*week + 5*day + 39*hour + 9*minute + 14*second + 425*millisecond],
  
  // large value
  ["52763797000ms", true, 52763797000 * millisecond],
  
  // errors
  ["", false, 0],
  ["3", false, 0],
  ["-", false, 0],
  ["s", false, 0],
  [".", false, 0],
  ["-.", false, 0],
  [".s", false, 0],
  ["+.s", false, 0]

].map(function (test) {
  return {
    input  : test[0],
    passed : test[1],
    output : test[2]
  };
});

describe('Duration', function () {
  parseDurationTests.forEach(function (test) {
    if (test.passed) {
      it('should parse ' + test.input, function () {
        expect(Duration.parse(test.input).valueOf()).to.equal(test.output);
      });
      it('should produce the correct string value ' + test.input, function () {
        var d      = Duration.parse(test.input),
            before = d.valueOf(),
            after  = Duration.parse(d.toString()).valueOf();
        expect(before).to.equal(after);
      });
      it('should take accept ' + test.input + ' in the constructor', function () {
        expect(new Duration(test.input).valueOf()).to.equal(test.output);
      });
      it('should return any Duration object passed to constructor', function () {
        var d = new Duration(test.input);
        expect(new Duration(d)).to.equal(new Duration(d));
      });
    } else {
      it('should not parse ' + test.input, function () {
        expect(Duration.parse.bind(null, test.input)).to.throw(Error);
      });
    }
  });
  it('should default to 0 duration when constructed with undefined', function () {
    expect(new Duration().valueOf()).to.equal(0);
  });
});
