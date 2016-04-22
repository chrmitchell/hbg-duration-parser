import expect from 'expect';
var durationParser = require('../durationParser');

describe('durationParser', function() {
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

	// describe('durationToTag', function() {
	// 	it('needs tests', function() {

	// 	});
	// });

	describe('isValidDurationValue', function() {
		it('should return true when passed valid duration value', function() {
			expect(durationParser.isValidDurationValue('60')).toEqual(true);
			expect(durationParser.isValidDurationValue(60)).toEqual(true);
			expect(durationParser.isValidDurationValue(50)).toEqual(true);
			expect(durationParser.isValidDurationValue(0)).toEqual(true);
			expect(durationParser.isValidDurationValue(1)).toEqual(true);
			expect(durationParser.isValidDurationValue(12)).toEqual(true);
			expect(durationParser.isValidDurationValue('12')).toEqual(true);
			expect(durationParser.isValidDurationValue('0')).toEqual(true);
			expect(durationParser.isValidDurationValue('1')).toEqual(true);
			expect(durationParser.isValidDurationValue('001')).toEqual(true);
			expect(durationParser.isValidDurationValue('0000001')).toEqual(true);
			expect(durationParser.isValidDurationValue('00000010')).toEqual(true);
		});
		it('should return false when passed invalid duration value', function() {
			expect(durationParser.isValidDurationValue('90')).toEqual(false);
			expect(durationParser.isValidDurationValue(90)).toEqual(false);
			expect(durationParser.isValidDurationValue(61)).toEqual(false);
			expect(durationParser.isValidDurationValue('12asd')).toEqual(false);
			expect(durationParser.isValidDurationValue('asd12')).toEqual(false);
			expect(durationParser.isValidDurationValue('12 13')).toEqual(false);
			expect(durationParser.isValidDurationValue([12])).toEqual(false);
		});
		it('should return false for invalid values', function() {
			expect(durationParser.isValidDurationValue('123')).toEqual(false);
			expect(durationParser.isValidDurationValue('0asdasd')).toEqual(false);
			expect(durationParser.isValidDurationValue('61')).toEqual(false);
			expect(durationParser.isValidDurationValue('-1')).toEqual(false);
			expect(durationParser.isValidDurationValue('sd1')).toEqual(false);
			expect(durationParser.isValidDurationValue(61)).toEqual(false);
			expect(durationParser.isValidDurationValue(['23'])).toEqual(false);
			expect(durationParser.isValidDurationValue([23,'34'])).toEqual(false);
		});
	});

	describe('durationToDisplayString', function() {
		it('should return nicely formatted display strings from duration objects', function() {
			expect(durationParser.durationToDisplayString({minutes: 3})).toEqual('3m');
			expect(durationParser.durationToDisplayString({minutes: 3, seconds:10})).toEqual('3m:10s');
			expect(durationParser.durationToDisplayString({hours: 3, seconds:10})).toEqual('3h:10s');
			expect(durationParser.durationToDisplayString({hours: 3, minutes:20, seconds:10})).toEqual('3h:20m:10s');
			expect(durationParser.durationToDisplayString({seconds: 30})).toEqual('30s');
		});
		it('should not handle units other than minutes, hours, and seconds.', function() {
			expect(function() { durationParser.durationToDisplayString({days: 10})}).toThrow(/invalid duration unit/);
			expect(function() { durationParser.durationToDisplayString({minuts: 10})}).toThrow(/invalid duration unit/);
		});
	});

	// describe('estimateDurationsFromString', function() {
	// 	it('needs tests', function() {

	// 	});
	// });
})

