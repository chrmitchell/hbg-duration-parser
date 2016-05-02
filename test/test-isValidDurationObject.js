import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.isValidDurationObject;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('isValidDurationObject', function() {
	it('should accept a valid duration object and return true', function() {
		testEqual( {minutes: 3}, true );
		testEqual( {minutes: 13, seconds: 5}, true );
	});

	it('should allow values as strings', function() {
		testEqual( {seconds: '30'}, true);
	});

	it('should return true when passed an empty object', function() {
		testEqual( {}, true);
	});

	it('should allow objects with values over 60', function() {
		testEqual( {hours: 3, seconds: 90}, true );
	});

	it('should not allow objects with negative values', function() {
		testEqual( {minutes: -3}, false);
	});

	it('should return false when there are unrecognized keys in the object', function() {
		testEqual( {mnitues: 3}, false);
		testEqual( {minutes: 3, nanosecondsorsomething: false}, false);
	})

	it('should return false on anything else', function() {
		testEqual( [{minutes:3}, {minutes: 1}], false);
		testEqual( undefined, false);
		testEqual( null, false);
		testEqual( '123', false);
		testEqual( [123], false);
	});
});
