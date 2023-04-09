const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
});