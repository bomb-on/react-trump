'use strict';

import allAnswers from './answers';

const constructAnswer = function (...args) {
  /*
  This will check how many question marks were in the question
  and will add the same amount of exclamation points in
  the randomly-picked answer from the answers list.
  */
  const question = args[0][0].question || '';
  const exclamationPoints = args[0][0].exclamationPoints;
  const qMarks = (question.match(/\?/g) || []).length;
  const exclamations = '!'.repeat(qMarks || exclamationPoints);

  return allAnswers[Math.floor(Math.random() * allAnswers.length)].toUpperCase() + exclamations;
};

const answer = function ({ question, exclamationPoints=0, includeQuestion }) {
  /*
  Returns a constructed answer based on passed parameters.
  */
  if (!question || !includeQuestion) {
    return constructAnswer(arguments);
  } else {
    if (typeof question === 'string' || question instanceof String) {
      if (!question.endsWith('?')) {
        question = question + '?';
      }
      return question + '\n' + constructAnswer(arguments);
    } else {
      return 'TRUMP DOESN\'T UNDERSTAND THE QUESTION!';
    }
  }
};

module.exports = { answer };
