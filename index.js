const express = require('express');
const shortid = require('shortid');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// store urls in mem
let urlDatabase = {};

app.use(express.static(path.join(__dirname, 'public')));

app.post('/shorten', (req, res) => {
  const longUrl = req.body.url;
  const shortUrl = shortid.generate();

  urlDatabase[shortUrl] = longUrl;

  res.send(`<h3>Your shortened URL: <a href="/${shortUrl}">/${shortUrl}</a></h3>`);
});

// redirect to original url
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = urlDatabase[shortUrl];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.send('Short URL not found!');
  }
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
