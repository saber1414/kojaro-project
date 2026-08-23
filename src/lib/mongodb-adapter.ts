import { MongoClient } from "mongodb";

declare global {
    var __mongoClientPromise: Promise<MongoClient>
};

if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not defined")
};

const uri = process.env.MONGODB_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global.__mongoClientPromise) {
        client = new MongoClient(uri, options);
        global.__mongoClientPromise = client.connect();
    };

    clientPromise = global.__mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
};

export default clientPromise;