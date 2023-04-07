const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;
const connectToDb = mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`DB CONNECTED SUCCESSFULLY`))
  .catch((error) => {
    console.log(`DB CONNECTION FAILED`);
    console.log(error);
    process.exit(1);
  });

module.exports = connectToDb;
