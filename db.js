const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("Error connecting to DB", error));

mongoose.connection.on("error", (error) =>
  console.log("lost connection", error)
);
