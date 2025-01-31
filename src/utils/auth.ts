// src/utils/auth.ts
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env file if it exists
dotenv.config();

/**
 * Checks if the Heroku API key is set. If not, it triggers the Heroku login process.
 * @returns {Promise<boolean>} Returns true if authentication is successful, false otherwise.
 */
export async function checkHerokuApiKey(): Promise<boolean> {
  // Check if HEROKU_API_KEY is already set from environment variables or .env file
  const herokuApiKey = process.env.HEROKU_API_KEY;

  if (!herokuApiKey) {
    console.log('Heroku API key not found. Please log in to Heroku.');

    try {
      // Automatically trigger the Heroku login process using the CLI
      execSync('heroku login', { stdio: 'inherit' });

      // After login, retrieve the API key using 'heroku auth:token'
      const apiKey = execSync('heroku auth:token').toString().trim();

      if (apiKey) {
        // Save the API key to the .env file and process.env for future use
        const envFilePath = path.resolve(__dirname, '../../.env');
        
        // Check if .env exists; if not, create it
        if (!fs.existsSync(envFilePath)) {
          fs.writeFileSync(envFilePath, '');
        }

        // Append or update the API key in the .env file
        fs.appendFileSync(envFilePath, `\nHEROKU_API_KEY=${apiKey}\n`);

        // Store API key in process.env
        process.env.HEROKU_API_KEY = apiKey;
        console.log('Login successful! API key has been stored for future use.');
        return true;
      } else {
        console.error('Could not retrieve Heroku API key after login.');
        return false;
      }
    } catch (error) {
      console.error('Login failed. Please try again.');
      return false;
    }
  } else {
    console.log('Heroku API key is already set.');
    return true;
  }
}
