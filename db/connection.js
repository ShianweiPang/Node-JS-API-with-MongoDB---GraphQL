const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ATLAS_MONGO;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let dbs = {}; // Store different database connections

const connectMongo = async (dbName = "admin") => {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });

    dbs[dbName] = client.db(dbName);
    console.log(`Pinged your deployment - ${dbName}. ✅ Connected to MongoDB!`);
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error);
  }
};

const getDB = (dbName = "admin") => {
  if (!dbs[dbName]) throw new Error("❌ Database not connected");
  return dbs[dbName];
};

module.exports = { connectMongo, getDB };
