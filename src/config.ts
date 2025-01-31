interface Config {
    herokuApiBaseUrl: string;
    herokuApiVersion: string;
  }
  
  const config: Config = {
    herokuApiBaseUrl: "https://api.heroku.com", // Heroku API Base URL
    herokuApiVersion: "application/vnd.heroku+json; version=3", // API Version Header
  };
  
  export default config;
  