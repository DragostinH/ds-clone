import { MongoClient, ServerApiVersion } from "mongodb";
const process = require('process');

if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found in environment variables");

const uri = process.env.MONGO_URI as string;
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    appName: "discord-clone",
}

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & { _mongoClient: MongoClient };

    if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(uri, options);
    }

    client = globalWithMongo._mongoClient;
} else {
    client = new MongoClient(uri, options);
}

