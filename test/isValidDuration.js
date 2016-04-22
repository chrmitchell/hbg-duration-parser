import expect from 'expect';
var durationParser = require('../durationParser');

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