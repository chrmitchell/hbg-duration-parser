import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.estimateDurationsFromString;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('estimateDurationsFromString', function() {
	it('needs tests');
});

