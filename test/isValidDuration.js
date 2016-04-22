import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.isValidDurationValue;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('isValidDurationValue', function() {
	it('should return true when passed valid duration value', function() {
		testEqual( '60', true );
		testEqual( 60, true );
		testEqual( 50, true );
		testEqual( 0, true );
		testEqual( 1, true );
		testEqual( 12, true );
		testEqual( '12', true );
		testEqual( '0', true );
		testEqual( '1', true );
		testEqual( '001', true );
		testEqual( '0000001', true );
		testEqual( '00000010', true );
	});
	it('should return false when passed invalid duration value', function() {
		testEqual( '90', false );
		testEqual( 90, false );
		testEqual( 61, false );
		testEqual( '12asd', false );
		testEqual( 'asd12', false );
		testEqual( '12 13', false );
		testEqual( [12], false );
	});
	it('should return false for invalid values', function() {
		testEqual( '123', false );
		testEqual( '0asdasd', false );
		testEqual( '61', false );
		testEqual( '-1', false );
		testEqual( 'sd1', false );
		testEqual( 61, false );
		testEqual( ['23'], false );
		testEqual( [23,'34'], false );
		testEqual( {age: 34}, false );
		testEqual( null, false );
	});
});