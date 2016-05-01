import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.secondsToDuration;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('secondsToDuration', function() {
	it('should return proper duration object', function() {
		testEqual( 33, { seconds: 33 } );
		testEqual( 63, { minutes: 1, seconds: 3 } );
		testEqual( 60, { minutes: 1 } );
		testEqual( 430, { minutes: 7, seconds: 10 } );
		testEqual( 7800, { hours: 2, minutes: 10 } );
		testEqual( 259263, { days: 3, minutes: 1, seconds: 3 });
		testEqual( 259200, { days: 3 });
	});

	it('should return an empyy object when passed 0');
});
