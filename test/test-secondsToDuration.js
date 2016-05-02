import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.secondsToDuration;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('secondsToDuration', function() {
	it('should accept an integer and return a duration object', function() {
		testEqual( 33, { seconds: 33 } );
		testEqual( 63, { minutes: 1, seconds: 3 } );
		testEqual( 60, { minutes: 1 } );
		testEqual( 430, { minutes: 7, seconds: 10 } );
		testEqual( 7800, { hours: 2, minutes: 10 } );
		testEqual( 259263, { days: 3, minutes: 1, seconds: 3 });
		testEqual( 259200, { days: 3 });
	});

	it('should throw if passed negative integers as input', function() {
		testThrows( -33, /secondsToDuration only accepts positive integers/);
	});

	it('should throw when not passed an integer', function() {
		testThrows( undefined, /secondsToDuration must be passed an integer/);
		testThrows( {}, /secondsToDuration must be passed an integer/);
		testThrows( null, /secondsToDuration must be passed an integer/);
		testThrows( '123', /secondsToDuration must be passed an integer/);
		testThrows( [123], /secondsToDuration must be passed an integer/);
	});

	it('should return an empty object when passed 0', function() {
		testEqual( 0, {});
	});
});
