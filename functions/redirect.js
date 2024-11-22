const urlDatabase = {};

exports.handler = async (event, context) => {
  const { shortUrl } = event.pathParameters;
  
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
