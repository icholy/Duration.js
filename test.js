
var { Duration} = require("./dist/duration.js"),
    { expect }  = require("chai");

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

    // small values
    ["5us", true, 0 * millisecond],
    ["1001us", true, 1 * millisecond],
    ["1001µs", true, 1 * millisecond],
    ["1001μs", true, 1 * millisecond],
    ["345ns", true, 0 * millisecond],

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
                expect(new Duration(d).isEqualTo(new Duration(d)));
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
    it('should throw an exception when constructed using non-finite numbers', function () {
        expect(function () { new Duration(Infinity); }).to.throw();
        expect(function () { new Duration(NaN); }).to.throw();
    });
    it('should correctly round to the nearest minute', function () {
        var d = new Duration("5m3s").truncate(Duration.minute);
        expect(d.toString()).to.equal("5m");
    });
    it('should correctly round to the nearest hour', function () {
        var d = new Duration("4h20m").truncate("1h");
        expect(d.toString()).to.equal("4h");
    })
    it('should correctly implement basic arithmatic', function () {
        var a = new Duration("5m"),
            b = new Duration("1m");
        expect(Duration.add(a, b).toString()).to.equal("6m");
        expect(Duration.subtract(a, b).toString()).to.equal("4m");
        expect(Duration.multiply(a, 2).toString()).to.equal("10m");
        expect(Duration.divide(a, b)).to.equal(5);
    });
    it('should compare correctly', function () {
        var d = new Duration("6h");
        expect(d.isGreaterThan("4h")).to.be.true;
        expect(d.isGreaterThan("7h")).to.be.false;
        expect(d.isLessThan("3h")).to.be.false;
        expect(d.isLessThan("9h")).to.be.true;
        expect(d.isEqualTo("6h")).to.be.true;
        expect(d.isEqualTo("2m")).to.be.false;
    });
    it('should correctly use the factory functions', function () {
        expect(Duration.milliseconds(2).toString()).to.equal("2ms");
        expect(Duration.seconds(60).toString()).to.equal("1m");
        expect(Duration.minutes(0.5).toString()).to.equal("30s");
        expect(Duration.hours(2).toString()).to.equal("2h");
    });
    it('should get the absolute value', function () {
        expect(new Duration("-10m").abs().toString()).to.equal("10m");
        expect(new Duration("6h").abs().toString()).to.equal("6h");
    });
});
