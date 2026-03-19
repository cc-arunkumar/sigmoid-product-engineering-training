// testConnection.js
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function testConnection() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
        const dbs = await client.db().admin().listDatabases();
        console.log("Databases:", dbs.databases.map(db => db.name));
        await client.close();
    } catch (err) {
        console.error("❌ Connection failed:", err);
    }
}

testConnection();