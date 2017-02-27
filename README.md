react-trump
===========

> An `npm` module which might help you with getting a proper answer to almost any question you have. In all caps. Now 
turned into  Twitter bot :robot: to help to the rest of the world, not only nerds!  
> [changelog](CHANGELOG.md)

## Twitter Bot Usage

Just tweet to [@say_trump](https://twitter.com/say_trump) (including the handle) to get an answer. Answers are in 
all-caps and can include as many exclamation points as question had question marks ;)

## npm Module Installation

`npm install react-trump`

## npm Module Usage

Asking for an answer without any parameters will result in all-caps string.
```javascript
var trump = require('react-trump');

var answer = trump.answer({});

// the `answer` will result in all-caps reaction, e.g.:
// FAKE NEWS
```

It is also possible to slightly modify the answer by including the question itself and even exclaiming the answer even 
more!

```javascript
var trump = require('react-trump');

var question = 'Howdy?';  // omitting the question mark will add it anyways
var exclamationPoints = 3;  // how serious the answer is
var includeQuestion = true;  // if you want to include the question in response

var answer = trump.answer({ question, exclamationPoints, includeQuestion });

// the `answer` will result in VERY serious reaction, including the question, e.g.:
// Howdy?
// AMERICA!!!
```

## Contributing

All contributions are more than welcome although I might be very picky about adding additional answers to the list ;)

## Copyright

NO!  
Also, use at your own risk!
