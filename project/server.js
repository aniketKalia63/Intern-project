const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("uncaught Exception");

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: false,
  })
  .then((con) => {
    console.log(con.connection);
    console.log("DB connection successfull");
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled Rejection");
  server.close(() => {
    process.exit(1);
  });
});
