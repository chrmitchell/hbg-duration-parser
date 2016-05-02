import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.isValidDurationValue;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('isValidDurationValue', function() {
	it('should return true when passed valid duration value', function() {
		testEqual( 60, true );
		testEqual( 50, true );
		testEqual( 0, true );
		testEqual( 1, true );
		testEqual( 12, true );
		testEqual( '60', true );
		testEqual( '12', true );
		testEqual( '0', true );
		testEqual( '1', true );
		testEqual( '001', true );
		testEqual( '0000001', true );
		testEqual( '00000010', true );
	});

	it('should return true when passed value above 60', function() {
		testEqual( '90', true );
		testEqual( '123', true );
		testEqual( 90, true );
		testEqual( 61, true );
	});

	// it('should return false when passed a string, even if it can be parsed as a number');

	it('should return false when passed negative integers', function() {
		testEqual( -20, false);
	});


	it('should return false when passed invalid duration value', function() {
		testEqual( '12asd', false );
		testEqual( '0asdasd', false );
		testEqual( 'asd12', false );
		testEqual( '12 13', false );
		testEqual( [12], false );
		testEqual( '-1', false );
		testEqual( 'sd1', false );
		testEqual( ['23'], false );
		testEqual( [23,'34'], false );
		testEqual( {age: 34}, false );
		testEqual( null, false );
	});
});