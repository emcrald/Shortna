const shortid = require('shortid');

// store urls in mem
let urlDatabase = {};

exports.handler = async (event, context) => {
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
    urlDatabase[shortUrl] = longUrl;

    return {
      statusCode: 200,
      body: JSON.stringify({ shortUrl: `https://shortna.netlify.app/${shortUrl}` })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' })
  };
};
