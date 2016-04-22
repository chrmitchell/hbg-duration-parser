import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.getTagFromDuration;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('getTagFromDuration', function() {
	it('needs tests (or to be removed)');
});
