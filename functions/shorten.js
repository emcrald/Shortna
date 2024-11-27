const shortid = require('shortid');
const fs = require('fs');
const path = require('path');

// memory database
let urlDatabase = {};

// path to db.json
const dbPath = path.resolve(__dirname, 'db.json');

// load db into memory at startup
try {
  if (fs.existsSync(dbPath)) {
    urlDatabase = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } else {
    console.warn('db.json file not found. starting with an empty database.');
  }
} catch (err) {
  console.error('error loading db.json:', err);
}

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

    // add to memory database
    urlDatabase[shortUrl] = longUrl;

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
