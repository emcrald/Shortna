const { MongoClient } = require('mongodb')
const shortid = require('shortid')

const uri = process.env.mongoDBURL

const client = new MongoClient(uri)

let db // store the db connection

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
  if (event.httpMethod === 'POST') {
    const body = JSON.parse(event.body)
    const longUrl = body.url

    if (!longUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'URL is required' })
      };
    }

    const shortUrl = shortid.generate()

    try {
      const db = await connectDB()
      const collection = db.collection('urls')
      
      await collection.insertOne({ shortUrl, longUrl })

      return {
        statusCode: 200,
        body: JSON.stringify({ shortUrl: `/${shortUrl}` })
      }
    } catch (error) {
      console.error('Error saving URL to MongoDB:', error)
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' })
      }
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' })
  };
};
