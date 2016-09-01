[![Build Status](https://travis-ci.org/chrmitchell/hbg-duration-parser.svg?branch=master)](https://travis-ci.org/chrmitchell/hbg-duration-parser)


HBG Duration Parser
=========


A Collection of methods for converting between strings and duration objects.

## Examples

```
durationParser.estimateDurationsFromString('Blend the mixture for 90 seconds.'); 
// returns { minutes: 1, seconds: 30 }
```

```
durationParser.getDisplayString({ days: 2, hours: 3, minutes: 23, seconds: 15});
// returns '2d:3h:23m:15s'

```

## Installation

  `npm install @chris_mitchell_hbg/duration-parser`

## Usage

    var durationParser = require('@chris_mitchell_hbg/duration-parser');
    var duration = durationParser.durationToDisplayString({hours: 3, minutes: 10}) // '3h:10m'

## Tests

  `npm test` or `npm run test:watch`
