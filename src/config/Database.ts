import { connect } from 'mongoose';

// connection to db
(async () => {
  try {
    const db = await connect(process.env.MONGODB_URI as string)
    console.log('Db connectect to', db.connection.name)
  } catch (error) {
    console.error(error)
  }
})()
