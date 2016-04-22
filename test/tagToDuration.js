import expect from 'expect';
var durationParser = require('../durationParser');

describe('tagToDuration', function() {
	it('should return duration object when valid tag present', function() {
		expect(durationParser.tagToDuration('<2m> some step.')).toEqual({minutes: 2});
		expect(durationParser.tagToDuration('<3m:10s> some step.')).toEqual({minutes: 3, seconds: 10});
		expect(durationParser.tagToDuration('<3d:12h> some step.')).toEqual({days: 3, hours: 12});
	});
	it('should not attempt to simplify values over 60.', function() {
		expect(durationParser.tagToDuration('<90s>some step.')).toEqual({seconds:90});
	});
	it('should ignore duration tags that are not at beginning of string', function() {
		expect(durationParser.tagToDuration('some step<3m>.')).toEqual(undefined);
	});
	it('should throw when : separator is missing from tag', function() {
		expect(function() {durationParser.tagToDuration('<3m10s>some step.')}).toThrow(/missing : separator/);
	});
	it('should throw when passed tag with missing duration unit', function() {
		expect(function() {durationParser.tagToDuration('<10>some step.')}).toThrow(/missing duration unit/);
	});
	it('should throw when passed tag with unrecognized duration unit', function() {
		expect(function() {durationParser.tagToDuration('<10z>some step.')}).toThrow(/unrecognized duration unit/);
	});
});