import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.durationToSeconds;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('durationToSeconds', function() {
	it('should return proper amount of seconds', function() {
		testEqual( { minutes: 3 }, 180 );
		testEqual( { seconds: 33 }, 33 );
		testEqual( { minutes: 7, seconds: 10 }, 430 );
		testEqual( { hours: 2, minutes: 10 }, 7800 );
	});
});
