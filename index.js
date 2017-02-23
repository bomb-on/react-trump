var allAnswers = require('./answers.js');

var answer = function (question) {
  const answer = allAnswers[Math.floor(Math.random() * allAnswers.length)].toUpperCase() + '!';

  if (question === undefined) {
    return answer;
  } else {
    if (!question.endsWith('?')) {
      question = question + '?';
    }
  }

  return question + '\n' + answer;
};

module.exports = {
  answer: answer
};
