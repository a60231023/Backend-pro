const app = require('./app');
const connectToDb = require('./config/db');

connectToDb();

app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
});