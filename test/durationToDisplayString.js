import expect from 'expect';
var durationParser = require('../dist/durationParser');

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
