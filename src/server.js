import client from './twitter';
import logger from './logger';

client.start((err) => {
  if (err) throw err.error;
  logger.log('Server running...');
});
