const fs = require('fs');
const path = require('path');

// memory database
let urlDatabase = {};

// path to db
const dbPath = path.resolve(__dirname, 'db.json');

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
  const shortUrl = event.path.split('/').pop(); // extract the URL from path

  if (!shortUrl || !urlDatabase[shortUrl]) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'short url not found' }),
    };
  }

  const longUrl = urlDatabase[shortUrl];

  return {
    statusCode: 302,
    headers: {
      Location: longUrl, // redirect to the long URL
    },
  };
};
