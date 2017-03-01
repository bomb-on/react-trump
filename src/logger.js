'use strict';

const log = (message, error=undefined) => {
  const timestamp = new Date();
  const UTCDate = timestamp.toUTCString();

  console.log(`[${UTCDate}] ${message}`);
  if (error) console.log(error);
};

module.exports = { log };
