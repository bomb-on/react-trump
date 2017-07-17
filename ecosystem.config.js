module.exports = {
  apps: [
    {
      name: 'react-trump',
      script: 'src/server.js',
      watch: ['src/*.js'],
      ignore_watch: [
        '.git',
        '.idea',
        '.vscode',
        'coverage',
        'dist',
        'lib',
        'node_modules',
        '*.log',
      ],
      interpreter: './node_modules/.bin/babel-node',
      env_production: {
        NODE_ENV: 'production',
        TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
        TWITTER_ACCESS_TOKEN_KEY: process.env.TWITTER_ACCESS_TOKEN_KEY,
        TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET
      },
    },
  ],
};
