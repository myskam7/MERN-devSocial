const env = process.env; 


export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = (message) => {
  console.info('**********');
  console.info(message);
  console.info('**********');
};

export const port = env.PORT || 5000
export const host = env.HOST || '0.0.0.0'

export default {
  mongodbUri: 'mongodb://dbUser:myskam7@ds247569.mlab.com:47569/heroku_kzxgt5j1',
  // port: env.PORT || 5000,
  // host: env.HOST || '0.0.0.0', // binds to all IPs on machine
  get serverUrl() {
    return `http://${host}:${port}`;
  }

};