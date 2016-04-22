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

module.exports = {
	
	/* takes a string and returns a boolean of whether it can be parsed as
	 * a number between 0 and 60 */
	isValidDurationValue: (str) => {

		/* reject anything other than string or number */
		if (typeof str !== "string" && typeof str !== "number") return false;

		/* if there are any non-digits, reject it */
		if (typeof str === "string" && str.match(/[^\d]/)) return false;

		var val = parseInt(str, 10);
		if ( isNaN(val) ) return false;
		if ( val < 0 || val > 60) return false;
		return true;
	},

	getDurationFromTag: (line) => {
		var tag = findDurationTagInString(line);
		if (tag) return parseDurationTag(tag);
	},

	getTagFromDuration: (durationObj) => {
		var params = [];

		_.each(durationObj, function(val, key) {
			params.push(val + (_.invert(unitCodes))[key]);
		});

		return '<' + params.join(':') + '>';
	},

	

	durationToDisplayString: (duration) => {
		var bits = []
		var validUnits = ['hours', 'minutes', 'seconds'];

		_.each(duration, function(value, unit) { 
			if ( !_.contains(validUnits, unit)) throw new Error('invalid duration unit');
		});

		if (duration.hours) { bits.push(duration.hours + 'h'); }
		if (duration.minutes) { bits.push(duration.minutes + 'm'); }
		if (duration.seconds) { bits.push(duration.seconds + 's'); }
		return bits.join(':');
	},

	estimateDurationsFromString: (str) => {
		var that = this;

		var words = str.split(' ');
		words = _.map(words, function(word) { return word.replace(/[\.\,\(\)]/g, ''); });

		var durationWords = ['minutes', 'minute', 'seconds'];
		var estimate;

		var estimates = [];

		_.each(words, function(word, i) {
			if (word.match(/[0-9]+/g)) {
				if ( _.indexOf(durationWords, words[i+1]) > -1 ) {
					estimates.push('<' + word + words[i+1].charAt(0) + '>');
				} else if ( _.indexOf(durationWords, words[i+2]) > -1) {
					estimates.push('<' + word + words[i+2].charAt(0) + '>');
				} else if ( _.indexOf(durationWords, words[i+3]) > -1) {
					estimates.push('<' + word + words[i+3].charAt(0) + '>');
				}
			}

			/* "a minute" becomes <1m> */
			else if (word === 'minute' && words[i-1]=== 'a') estimates.push('<1m>');
		});

		estimates = _.map(estimates, function(estimate) { return that.tagToDuration(estimate); });

		console.log(estimates);

		return estimates;
		// var estimate = estimates[0];
		// return estimate;
		// return {
		// 	estimate: this.tagToDuration(estimate)
		// };
	}
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
