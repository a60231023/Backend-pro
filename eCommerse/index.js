const app = require('./app');
const connectToDb = require('./config/db');
const cloudinary = require("cloudinary");


connectToDb();


// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});



app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
});