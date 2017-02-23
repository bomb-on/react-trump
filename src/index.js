'use strict';

import allAnswers from './answers';

const answer = function ({ question, exclamationPoints=0, includeQuestion }) {

  const exclamations = '!'.repeat(exclamationPoints);
  const answer = allAnswers[Math.floor(Math.random() * allAnswers.length)].toUpperCase() + exclamations;

  if (!question || !includeQuestion) {
    return answer;
  } else {
    if (typeof question === 'string' || question instanceof String) {
      if (!question.endsWith('?')) {
        question = question + '?';
      }
      return question + '\n' + answer;
    } else {
      return 'TRUMP DOESN\'T UNDERSTAND THE QUESTION!';
    }
  }

};

module.exports = { answer };
