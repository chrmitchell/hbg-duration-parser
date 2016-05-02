import _ from 'underscore';

let unitCodes = {
	'ms': 'milliseconds',
	'm': 'minutes',
	's': 'seconds',
	'h': 'hours',
	'd': 'days',
	'w': 'weeks',
	'mo': 'months',
	'y': 'years'
};

/* takes a string and returns a boolean of whether it can be parsed as
 * a positive number. currently allows numbers over 60 */
const isValidDurationValue = (str) => {
	/* reject anything other than string or number */
	if (typeof str !== "string" && typeof str !== "number") return false;

	/* if there are any non-digits, reject it */
	if (typeof str === "string" && str.match(/[^\d]/)) return false;

	var val = parseInt(str, 10);
	if ( isNaN(val) ) return false;
	if ( val < 0) return false;
	return true;
};

const normalizeDuration = (duration) => {
	if ( !isValidDurationObject(duration) ) throw new Error('normalizeDuration must be passed a valid duration object');

	Object.keys(duration).forEach( (key) => {
		duration[key] = parseInt(duration[key], 10);
	});

	let seconds = durationToSeconds(duration);
	return secondsToDuration(seconds);
};

const isValidDurationObject = (duration) => {
	if (typeof duration !== 'object' || duration === null) return false;
	return Object.keys(duration).every( (unit) => {
		if (!(unit === 'minutes' || unit === 'hours' || unit === 'seconds' || unit ==='days')) return false;
		if (!isValidDurationValue(duration[unit])) return false;
		return true;
	});
};

const secondsToDuration = (s) => {
	// if ( s === undefined) throw new Error('secondsToDuration must be passed an integer');
	if (typeof s !== 'number') throw new Error('secondsToDuration must be passed an integer');
	if (s<0) throw new Error('secondsToDuration only accepts positive integers');

	let duration = {};

	let seconds, minutes, hours, days;

	seconds = s % 60;

	s /= 60;
	minutes = Math.floor(s) % 60;

	s /= 60;
	hours = Math.floor(s) % 24;

	s /= 24;
	days = Math.floor(s);

	if (seconds) duration.seconds = seconds;
	if (minutes) duration.minutes = minutes;
	if (hours) duration.hours = hours;
	if (days) duration.days = days;

	return duration;
};

const durationToSeconds = (duration) => {
	if ( !isValidDurationObject(duration) ) throw new Error('durationToSeconds must be passed a valid duration object');
	let seconds = 0;
	if (duration.days) seconds += (60 * 60 * 24 * duration.days);
	if (duration.hours) seconds += (60 * 60 * duration.hours);
	if (duration.minutes) seconds += (60 * duration.minutes);
	if (duration.seconds) seconds += duration.seconds;
	return seconds;
};

const getDurationFromTag = (line) => {
	var tag = findDurationTagInString(line);
	if (tag) return parseDurationTag(tag);
};

const getTagFromDuration = (durationObj) => {
	var params = [];

	_.each(durationObj, function(val, key) {
		params.push(val + (_.invert(unitCodes))[key]);
	});

	return '<' + params.join(':') + '>';
};



const getDisplayString = (durationOrSeconds) => {
	let duration;
	if (typeof durationOrSeconds === 'number') duration = secondsToDuration(durationOrSeconds);
	else duration = durationOrSeconds;

	var bits = []
	var validUnits = ['days', 'hours', 'minutes', 'seconds'];

	_.each(duration, function(value, unit) {
		if ( !_.contains(validUnits, unit)) throw new Error('invalid duration unit');
	});

	if (duration.days) { bits.push(duration.days + 'd'); }
	if (duration.hours) { bits.push(duration.hours + 'h'); }
	if (duration.minutes) { bits.push(duration.minutes + 'm'); }
	if (duration.seconds) { bits.push(duration.seconds + 's'); }
	return bits.join(':');
};

const estimateDurationsFromString = ( str ) => {
	var that = this;

	var words = str.split(' ');
	words = _.map(words, function(word) { return word.replace(/[\.\,\(\)]/g, ''); });

	var durationWords = {
		"seconds": ['second', 'seconds'],
		"minutes": ['minute', 'minutes'],
		"hours": ['hour', 'hours'],
		"days": ['day', 'days']
	};

	var estimates = [];

	_.each(words, function(word, i) {
		if (word.match(/[0-9]+/g) || word==="a" || word==="an") {
			var estimate = {};

			_.each(durationWords, function(durationWordSynonyms, durationWord) {
				if ( _.indexOf(durationWordSynonyms, words[i+1]) > -1 ) {
					estimate[durationWord] = parseInt(word,10) || 1;
				} else if ( _.indexOf(durationWordSynonyms, words[i+2]) > -1) {
					estimate[durationWord] = parseInt(word,10) || 1;
				} else if ( _.indexOf(durationWordSynonyms, words[i+3]) > -1) {
					estimate[durationWord] = parseInt(word,10) || 1;
				}
			});

			if (Object.keys(estimate).length) estimates.push( normalizeDuration(estimate) );
		}
	});

	return estimates;
};

export default {
	isValidDurationValue,
	isValidDurationObject,
	getDurationFromTag,
	getTagFromDuration,
	getDisplayString,
	estimateDurationsFromString,
	durationToSeconds,
	secondsToDuration,
	normalizeDuration
};

function findDurationTagInString(str) {
	if (str === undefined) return;

	var durationMatches = str.match(/^<[^>]*>/) || [];

	if (!durationMatches.length) return false;
	if (durationMatches.length > 1) throw Error('multiple durations in a single str.', str);

	var match = durationMatches[0];
	return match.substr(1, match.length - 2);
}

function parseDurationTag(durationStr) {

	var durationObj = {};

	_.each(durationStr.split(':'), function(duration) {
		var unit = duration.match(/[^0-9]+/ig);

		if (!unit) throw new Error('missing duration unit for ' + duration + ' in ' + durationStr);
		if (unit.length > 1 ) throw Error('invalid duration unit for ' + duration + '. missing : separator?');

		unit = unit[0];
		// console.log(duration, ' / ' , unit);

		var unitFull = unitCodes[unit];
		if (!unitFull) throw new Error('unrecognized duration unit in: ' + duration + ' - ' + durationStr);

		durationObj[unitFull] = parseInt(duration.replace(unit, ''));
	});

	return durationObj;
}
