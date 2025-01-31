/**
 * Checks if the Heroku API key is set. If not, it triggers the Heroku login process.
 * @returns {Promise<boolean>} Returns true if authentication is successful, false otherwise.
 */
export declare function checkHerokuApiKey(): Promise<boolean>;
