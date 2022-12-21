import mongoose from "mongoose";

type Connection = {
  isConnected?: mongoose.ConnectionStates;
};

const connection = { isConnected: 0 };

async function connect() {
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Using existing connection");
      return;
    }
    await mongoose.disconnect();
  }
  if (mongoose.connections[0].readyState === 1) {
    console.log("Using existing connection");
    return mongoose.connection.asPromise();
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("New connection");
  connection.isConnected = mongoose.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = 0;
    } else {
      console.log("Not disconnected");
    }
  }
}

const exporting = { connect, disconnect };
export default exporting;
