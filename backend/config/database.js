const mongoose = require("mongoose");

mongoose.set("bufferCommands", false);

const connectOptions = {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
};

async function connectDatabase() {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = process.env.MONGO_URI_FALLBACK;

  if (!primaryUri) {
    throw new Error("MONGO_URI is missing");
  }

  const uris = [primaryUri];
  if (fallbackUri && fallbackUri !== primaryUri) {
    uris.push(fallbackUri);
  }

  for (const uri of uris) {
    try {
      await mongoose.connect(uri, connectOptions);
      console.log("✅ MongoDB Connected");
      return;
    } catch (err) {
      const safeUri = uri.replace(/:([^:@/]+)@/, ":****@");
      console.error(`❌ MongoDB connection failed (${safeUri}): ${err.message}`);
    }
  }

  throw new Error("Could not connect to MongoDB. Check MONGO_URI and Atlas Network Access.");
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  mongoose,
  connectDatabase,
  isDatabaseConnected,
};
