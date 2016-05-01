import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.getDisplayHTML;
const testEqual = (input, config, output) => { expect(method( input, config )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('getDisplayHTML', function() {
	it('should return a nicely formatted string of HTML');

	it('should use "class" by default, but "className" when passed config.formatForJSX=true');

	it('should allow costomization of class names via a config property');

	it('should ignore missing properties');

});
