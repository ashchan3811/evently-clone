import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const cached = (global as any).mongoose || { conn: null, promise: null };

export const connet = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI Missing");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
};
