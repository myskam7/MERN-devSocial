const env = process.env; 


export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = (message) => {
  console.info('**********');
  console.info(message);
  console.info('**********');
};

export default {
  mongodbUri: 'mongodb://heroku_pszpt1jr:heroku1@ds249269.mlab.com:49269/heroku_pszpt1jr',
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0', // binds to all IPs on machine
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }

};