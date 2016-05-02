import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.normalizeDuration;

const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('normalizeDuration', function() {
	it('should convert string values into numbers', function() {
		testEqual( {minutes: "3"}, {minutes: 3});
		testEqual( {minutes: "3", seconds:'23'}, {minutes: 3, seconds:23});
		testEqual( {hours: "5", "minutes": 21, seconds:'23'}, {hours:5, minutes: 21, seconds:23 });
	});

	it('should turn 90s into 1m30s, etc', function() {
		testEqual( {seconds: 90}, {minutes: 1, seconds: 30});
		testEqual( {seconds: "90"}, {minutes: 1, seconds: 30});
	});

	it('should throw error when passed invalid duration obj', function() {
		testThrows( {"somethingCrazy": 123}, /normalizeDuration must be passed a valid duration object/);
	});
});
