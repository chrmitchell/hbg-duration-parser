import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.durationToSeconds;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('durationToSeconds', function() {
	it('should accept a duration object and return proper amount of seconds', function() {
		testEqual( { minutes: 3 }, 180 );
		testEqual( { seconds: 33 }, 33 );
		testEqual( { minutes: 7, seconds: 10 }, 430 );
		testEqual( { hours: 2, minutes: 10 }, 7800 );
		testEqual( { days: 3}, 259200 );
		testEqual( { days: 3, hours: 21, minutes: 39}, 337140 );
	});

	it('should return 0 when passed an empty object', function() {
		testEqual( {}, 0);
	});

	it('should throw when not passed a valid duration object', function() {
		testThrows( undefined, /durationToSeconds must be passed a valid duration object/);
		testThrows( null, /durationToSeconds must be passed a valid duration object/);
		testThrows( '123', /durationToSeconds must be passed a valid duration object/);
		testThrows( [123], /durationToSeconds must be passed a valid duration object/);
	});
});
