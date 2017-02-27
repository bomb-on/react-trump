'use strict';

const trump = require('./index');
const answers = require('./answers');

const question = 'sup';
const exclamationPoints = 1;
const includeQuestion = true ;

test('Answer really is in list of all answers', () => {
  // check if we really did return something from the array of questions
  expect(answers).toContain(trump.answer({}).toLowerCase());
});

test('Answer is a string', () => {
  // regex must match that returned value is a word
  expect(trump.answer({})).toMatch(/\w/);
});

test('Adding question to response', () => {
  // regex must match at least two words separated by newline
  expect(trump.answer({ question, includeQuestion })).toMatch(/\w[\s\S]\w/);
});

test('Adding question mark in question if missing', () => {
  // regex must match that a question mark is appended to the question
  expect(trump.answer({ question, includeQuestion })).toMatch(/sup\?/);
});

test('Adding exclamation points', () => {
  // regex must match that last character in answer is an exclamation point
  expect(trump.answer({
    question, exclamationPoints, includeQuestion
  })).toMatch(/[\s\S]\!$/);
});

test('Counting punctuation', () => {
  // amount of question marks in question must equal
  // the amount of exclamation points in answer

  // get answer first
  const answer = trump.answer({ question, exclamationPoints, includeQuestion });

  // split all lines and get last two lines of the output
  const regex = answer.match(/^\w.*[\s\S]$/gm);

  const lastQuestionLine = regex[regex.length - 2];
  const answerLine = regex[regex.length - 1];

  // calculate number of question marks and exclamation points
  const qMarks = (lastQuestionLine.match(/\?/g) || []).length;
  const exlPoints = (answerLine.match(/\!/g) || []).length;

  expect(qMarks).toBe(exlPoints);
});

test('Counting punctuation excluding the question', () => {
  // amount of question marks in question must equal
  // the amount of exclamation points in answer
  // even if we don't include the question itself

  // get answers first
  const answer = trump.answer({ question, exclamationPoints });

  // split all lines and get last two lines of the output
  const regex = answer.match(/^\w.*[\s\S]$/gm);

  const lastQuestionLine = question + '?';  // @TODO WAT?
  const answerLine = regex[regex.length - 1];

  // calculate number of question marks and exclamation points
  const qMarks = (lastQuestionLine.match(/\?/g) || []).length;
  const exlPoints = (answerLine.match(/\!/g) || []).length;

  expect(qMarks).toBe(exlPoints);
});

test('Overriding exclamation points', () => {
  // amount of question marks in question must equal
  // the amount of exclamation points in multi line answer too

  const question = 'sup\nbrah????????????????';
  // get answers first
  const answer = trump.answer({
    question,
    exclamationPoints,  // should be overridden
    includeQuestion: true
  });

  // split all lines and get last two lines of the output
  const regex = answer.match(/^\w.*[\s\S]$/gm);

  const lastQuestionLine = regex[regex.length - 2];
  const answerLine = regex[regex.length - 1];

  const qMarks = (lastQuestionLine.match(/\?/g) || []).length;
  const exlPoints = (answerLine.match(/\!/g) || []).length;

  expect(qMarks).toBe(exlPoints);
});

test('Overriding exclamation points and excluding the question', () => {
  // amount of question marks in question must equal
  // the amount of exclamation points in multi line answer too
  // even if we don't include the question itself

  const question = 'sup\nbrah????????????????';
  // get answers first
  const answer = trump.answer({
    question,
    exclamationPoints,  // should be overridden
    includeQuestion: false
  });

  // split all lines and get last two lines of the output
  const regex = answer.match(/^\w.*[\s\S]$/gm);

  const answerLine = regex[regex.length - 1];

  const qMarks = (question.match(/\?/g) || []).length;
  const exlPoints = (answerLine.match(/\!/g) || []).length;

  expect(qMarks).toBe(exlPoints);
});
