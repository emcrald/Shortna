const urlDatabase = {};

exports.handler = async (event, context) => {
  const shortUrl = event.pathParameters?.shortUrl || event.rawPath.split('/')[1];

  if (!shortUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Short URL parameter is missing' })
    };
  }

  const longUrl = urlDatabase[shortUrl];

  if (longUrl) {
    return {
      statusCode: 301,
      headers: {
        Location: longUrl
      },
      body: ''
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'URL not found' })
  };
};
