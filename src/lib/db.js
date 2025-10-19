import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

// Helper to read the URI at call time
function getMongoUri() {
  return process.env.MONGODB_URI;
}

// Mongoose connect on demand only
export async function dbConnect() {
  const uri = getMongoUri();
  if (!uri || !uri.startsWith("mongodb")) {
    throw new Error(
      "MONGODB_URI is missing or invalid. It must start with mongodb:// or mongodb+srv://"
    );
  }

  try {
    await mongoose.connect(uri, { bufferCommands: false });
    console.log("Db connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Lazy, singleton native client. Do NOT instantiate at module import time.
let _nativeClient = null;
export function getNativeClient() {
  if (_nativeClient) return _nativeClient;
  const uri = getMongoUri();
  if (!uri || !uri.startsWith("mongodb")) {
    // Return null so callers can decide how to handle missing/invalid URI without crashing at build time
    return null;
  }
  _nativeClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return _nativeClient;
}

// Optional helper to quickly check DB availability with a short timeout
export async function pingDatabase(timeoutMs = 2000) {
  const client = getNativeClient();
  if (!client) return false;
  try {
    const admin = client.db().admin();
    await Promise.race([
      admin.ping(),
      new Promise((_, rej) =>
        setTimeout(() => rej(new Error("db timeout")), timeoutMs)
      ),
    ]);
    return true;
  } catch {
    return false;
  }
}
