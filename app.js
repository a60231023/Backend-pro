const express = require("express");
require("dotenv").config();
const connectToDb = require("./config/database");
const router = require('./router/routes');
const cookieParesr = require('cookie-parser');
const app = express();

//express directly cannot handle json data format so we use middleware for it express.json()
app.use(express.json());
// use of cookei parser- when you log in then you are setting the cookie in the header but when you are going for dashboard route, it cannot read token value(cookie name) it comes as undefined so you need cookie paresr.
// The cookie-parser middleware in Node.js helps in parsing the cookies attached to the client request object. It converts the cookie header string into a JavaScript object, which can then be accessed in the request object's cookies property. The middleware also helps in setting cookies in the response object.
// Overall, cookie-parser makes working with cookies in Node.js easier and more efficient.kind of like file parser- express did't know how deal with files similarly with cookies
app.use(cookieParesr());
app.use('/', router);
module.exports = app;
