const shortid = require('shortid');
const fs = require('fs');
const path = require('path');

// path to db
const dbPath = path.resolve(__dirname, '../db.json');

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const longUrl = body.url;

    if (!longUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'URL is required' })
      };
    }

    const shortUrl = shortid.generate();

    // read db
    const urlDatabase = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    urlDatabase[shortUrl] = longUrl;

    // save db
    fs.writeFileSync(dbPath, JSON.stringify(urlDatabase, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ shortUrl: `/${shortUrl}` })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' })
  };
};
