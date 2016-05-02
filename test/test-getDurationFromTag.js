import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.getDurationFromTag;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('getDurationFromTag', function() {
	it('should return duration object when valid tag present', function() {
		testEqual( '<2m> some step.', {minutes: 2});
		testEqual( '<3m:10s> some step.', {minutes: 3, seconds: 10});
		testEqual( '<3d:12h> some step.', {days: 3, hours: 12});
	});
	it('should not attempt to simplify values over 60.', function() {
		testEqual( '<90s>some step.', {seconds:90});
	});
	it('should ignore duration tags that are not at beginning of string', function() {
		testEqual( 'some step<3m>.', undefined);
	});
	it('should throw when : separator is missing from tag', function() {
		testThrows('<3m10s>some step.', /missing : separator/ );
	});
	it('should throw when passed tag with missing duration unit', function() {
		testThrows('<10>some step.', /missing duration unit/ );
	});
	it('should throw when passed tag with unrecognized duration unit', function() {
		testThrows('<10z>some step.', /unrecognized duration unit/ );
	});

	it('should handle days');
});
