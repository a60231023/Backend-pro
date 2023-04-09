const express = require("express");
const Razorpay = require('razorpay');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi");
});

app.post('/order', async (req, res) => {
  const amount = req.body.amount;
  
  //razorpay setup
  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
  const options = {
    amount: amount*100, //amount in the smallest currency unit(paise)
    currency: "INR",
    receipt: "order_rcptid_11", // unique id
  };
  // instance.orders.create(options, function(err, order) {
  //   console.log(order);
  // });
  
  const myOrder = await instance.orders.create(options);

  res.status(201).json({
    success: true,
    amount,
    order: myOrder
  });


})


app.listen(8000, () => {
  console.log(`server is running at port 8000`);
});
