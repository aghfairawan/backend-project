const {MongoClient} = require('mongodb')

const databaseMidleware = async (req, res, next)=>{
    const mongoClient = await new MongoClient(process.env.MONGO_URI).connect();
    db = mongoClient.db(process.env.MONGO_DB)
    req.db = db

    next()
};




module.exports = databaseMidleware