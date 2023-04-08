// Normally there are different ways to send data from frontend to backend , in the body, in the header, in the url so while using react, angular, postman normally the data comes in the body even for the url-encoded one also therefore you need to handle by req.body but if using templating engine like ejs then the url-encoded(form method = get ) it comes in the url only so you need to handle by req.query.  to send file retrun to the frontend after taking you need to do something else just doing res.send(req.body) will not work. normally all the files comes in req.files

require("dotenv").config();
const express = require("express");
const fileupload = require("express-fileupload");
const app = express();

const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

//middleware

//view engine middleware so app.set
app.set("view engine", "ejs");

//for parsing json data coming
app.use(express.json());

//for parsing url encoded data note- in express the url encode data also comes in the body not in the query
// you have written url encoded that will work for 1 nested case. when you have 2 or 3 level nested data coming it will not get parse so you use extended as true
app.use(express.urlencoded({ extended: true }));

//when any file is coming so to handle we need another middleware just like json. now just writing app.use(fileupload()) won't work as the files needs to be handled differently. normally the guy at the frontend should do the handling then send it accordingly -- in the form the enctype is by defult x-www-urlen but for file we need to make it multipart/form-data - yes it is frontend guy job  --  we can pass config like useTempfiles.. the tempfile dir that is tmp is created for every file for handling and after handling is deleted . this will be useful when we need to move the file to our directory or to upload on cloud
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/getform", (req, res) => {
  // it(express) will automatically look in the views folder
  res.render("getForm");
});

app.get("/postform", (req, res) => {
  // it(express) will automatically look in the views folder
  res.render("postForm");
});

app.get("/myget", (req, res) => {
  //from where the data is coming result in how you handle it . for postman and react angula it normally comes in the body.but for ejs, for the get form the data comes in the url so you need handle it by .query
  console.log(req.query);
  //it doesn't work for get request
  console.log(req.files);
  res.send(req.query);
});

//here it is post as this is for the form method = post
app.post("/mypost", async (req, res) => {
  // if the method is post the data does not come in req.query even for ejs
  console.log(req.body);
  console.log(req.files);

  let imageArray = [];
  let file = req.files.samplefile; // samplefile is the name of the file in the frontend by whcih it comes -- for multiple files samplefile becomes an array

  if (req.files) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      let result = await cloudinary.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        {
          folder: "users",
        }
      );
      imageArray.push(result);
    }
  }

  /**
   * single file
   * first argument is the file(path of the file), next is the option which can be folder name where you want to upload in the clodinary folder

   * result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "users",
  });
  console.log(result);

*/

  const details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    imageArray,
  };
  res.send(details);
});

app.listen(8000, () => {
  console.log(`server is running at port 8000`);
});
