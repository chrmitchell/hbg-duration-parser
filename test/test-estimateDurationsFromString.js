import expect from 'expect';
import durationParser from '../dist/durationParser';

let method = durationParser.estimateDurationsFromString;
const testEqual = (input, output) => { expect(method( input )).toEqual(output); };
const testThrows = (input, errorRegExp) => { expect( () => { method(input); }).toThrow( errorRegExp ); };


describe('estimateDurationsFromString', function() {
	it('should handle minutes, hours, seconds, days (singular and plural)', function() {
			testEqual("for 1 minute, or", [{minutes: 1}]);
			testEqual("for 22 minutes, or", [{minutes: 22}]);
			testEqual("for 1 second, or", [{seconds: 1}]);
			testEqual("for 30 seconds, or", [{seconds: 30}]);
			testEqual("for 1 hour, or", [{hours: 1}]);
			testEqual("for 3 hours, or", [{hours: 3}]);
			testEqual("for 3 or more hours, or", [{hours: 3}]);
			testEqual("for 10 days, or", [{days: 10}]);
		});

		/* should process 90 minutes as 1 hour and 30 minutes? */

		it('for now, should return multiple estimates on compound durations', function() {
			testEqual("for 1 minute and 45 seconds", [{minutes: 1}, {seconds: 45}]);
		});

		it('for now, should return multiple estimates when passed a range, so we can warn user', function() {
			testEqual("for 2 to 3 minutes",[{"minutes": 2}, {"minutes": 3}]);
			testEqual("for at least 10 minutes or up to 1 day.", [{minutes: 10},{days: 1}]);
		});

		it('should return a blank array when passed a string not containing a time duration', function() {
			testEqual('nothing', []);
			testEqual('nothing 3 at all', []);
			testEqual('i can pass the words a and an without time units and it is fine', []);
			testEqual('here are some number 30 15 25 and 10. none are durations. and then the word minutes.', []);
			testEqual('add 13 cups of something', []);
		});

		/* should only handle one duration per string, ignore or throw when passed multiples? */

		// it('should return the lower value of a range, when passed a string containing a range of time.', function() {

		it('should handle "a minute" as 1 minute, etc', function() {
			testEqual('a minute', [{minutes: 1}]);
			testEqual('a second', [{seconds: 1}]);
			testEqual('an hour', [{hours: 1}]);
			testEqual('a hour', [{hours: 1}]);
		});


		/* 'for 30 seconds or a minute' */
		/* destinguish between multiple units and a range:
			"put it in the oven for 1 hour and 20 minutes"
			[{hours: 1, minutes: 20}]
				vs.
			"Stir well, cover, and refrigerate for at least 2 hours or up to 2 days."
			[{hours: 2}] (because range)
			(if contains "or" or "to" it's a range, otherwise it's a single estimate?)
		*/
});

