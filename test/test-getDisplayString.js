import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.getDisplayString;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };

describe('durationToDisplayString', function() {
	it('should accept a duration object and return a nicely formatted display string', function() {
		testEqual( {minutes: 3}, '3m' );
		testEqual( {minutes: 3, seconds:10}, '3m:10s' );
		testEqual( {hours: 3, seconds:10}, '3h:10s' );
		testEqual( {hours: 3, minutes:20, seconds:10}, '3h:20m:10s' );
		testEqual( {seconds: 30}, '30s');
	});
	it('should not handle units other than minutes, hours, and seconds.', function() {
		testThrows( {days: 10}, /invalid duration unit/ );
		testThrows( {minuts: 10}, /invalid duration unit/ );
		testThrows( {nonsenses: 10}, /invalid duration unit/ );
	});

	it('should also accept a number of seconds as first parameter and return a nicely formatted display string', function() {
		testEqual( 13, '13s');
		testEqual( 90, '1m:30s');
		testEqual( 190, '3m:10s');
	});

	/* write a isValidDurationObject method and call it from various methods to check this? */
	it('should throw error when not passed a valid duration object');
});
