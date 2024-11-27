const fs = require('fs');
const path = require('path');

// path to db
const dbPath = path.resolve(__dirname, '../db.json');

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    try {
      const shortUrl = event.path.split('/').pop();

      if (!shortUrl) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Short URL parameter is missing' })
        };
      }

      // read db
      const urlDatabase = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

      const longUrl = urlDatabase[shortUrl];

      if (!longUrl) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Short URL not found' })
        };
      }

      // redirect to the long URL
      return {
        statusCode: 302,
        headers: {
          Location: longUrl
        }
      };
    } catch (err) {
      console.error('Error handling GET:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' })
  };
};
