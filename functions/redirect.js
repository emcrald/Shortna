const { MongoClient } = require('mongodb')
const uri = process.env.mongoDBURL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

let db

async function connectDB() {
  if (!db) {
    try {
      await client.connect()
      db = client.db('urlShortener')
    } catch (err) {
      console.error('Error connecting to MongoDB:', err)
      throw new Error('MongoDB connection failed')
    }
  }
  return db
}

exports.handler = async (event) => {
  const shortUrl = event.path.split('/')[1]

  console.log('Extracted shortUrl:', shortUrl)

  if (!shortUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Short URL parameter is missing' })
    };
  }

  try {
    const db = await connectDB()
    const collection = db.collection('urls')

    const result = await collection.findOne({ shortUrl })

    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Short URL not found' })
      }
    }

    return {
      statusCode: 302,
      headers: {
        Location: result.longUrl
      }
    }
  } catch (error) {
    console.error('Error fetching URL from MongoDB:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    }
  }
}
