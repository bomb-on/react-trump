'use strict';

import Twitter from 'twitter'
import trump from './index'

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.stream('statuses/filter', {track: '@say_trump'}, stream => {
  stream.on('data', (tweet) => {
    console.log(`[${new Date()}] @${tweet.user.screen_name} asked...`);
    postReply({ tweet });
  });

  stream.on('error', (error) => {
    console.log(`[${new Date()}] *** STREAM ERROR :( ***'`);
    console.log(error);
    throw error;
  });
});


const postReply = ({ tweet }) => {
  const question = tweet.text;
  const userMention = `@${tweet.user.screen_name}`;
  const status = `${userMention} ${trump.answer({ question })}`;

  client.post(
    'statuses/update',
    {status, in_reply_to_status_id: tweet.id_str},
    (error, tweet, response) => {
      if(error) {
        console.log(`[${new Date()}] *** ANSWERING ERROR :( ***'`);
        console.log(error);
        throw error;
      }
      console.log(`[${new Date()}] Replied to ${userMention}.`);
    }
  );
};

module.exports = { client };
