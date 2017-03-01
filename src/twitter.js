'use strict';

import Twitter from 'twitter'
import trump from './index'
import logger from './logger'

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const start = (callback) => {
  client.stream('statuses/filter', {track: '@say_trump'}, stream => {
    stream.on('data', (tweet) => {
      logger.log(`@${tweet.user.screen_name} just asked something!`);
      postReply({ tweet });
    });

    stream.on('error', (error) => {
      logger.log(`*** STREAM ERROR :( ***'`, error);
      callback(error);
    });

    callback(undefined);
  });
};

const postReply = ({ tweet }) => {
  const question = tweet.text;
  const userMention = `@${tweet.user.screen_name}`;
  const status = `${userMention} ${trump.answer({ question })}`;

  client.post(
    'statuses/update',
    {status, in_reply_to_status_id: tweet.id_str},
    (error, tweet, response) => {
      if(error) {
        logger.log(` *** ANSWERING ERROR :( ***'`, error);
        throw error;
      }
      logger.log(`Successfully replied to ${userMention}!`);
    }
  );
};

module.exports = { start };
