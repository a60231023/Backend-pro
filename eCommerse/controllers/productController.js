const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");
const WhereClause = require("../utils/whereClause");




exports.addProduct = BigPromise(async (req, res, next) => {
    let imageArray = [];

    if(!req.files){
        return next(new CustomError('Images are required', 401));
    }

    if(req.files){
        for(let index = 0; index<req.files.photos.length; index++){
            let result = await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath, {
                folder: "Products"
            });

            imageArray.push({
                id: result.public_id,
                secure_url: result.secure_url,
            });
        }
    }

    req.body.photos = imageArray;
    //the user is already logged so it will req.user property
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product,
    });


});

exports.getAllProduct = BigPromise(async (req, res) => {
    
    const resultPerPage = 6;    
    const countProduct = await Product.countDocuments();
    
    // const products = await Product.find({});

    const productsObj = new WhereClause(Product.find(), req.query).search().filter();
    let products = productsObj.base;
    const filteredProductLength = products.length;

    productsObj.pager(resultPerPage);
    products = await productsObj.base;



    res.status(200).json({
        success: true,
        products,
        countProduct,
        filteredProductLength,
    })


});


exports.testProduct = (req, res) => {
    res.status(200).json({
        success: true,
        greetings: "Hello from API"
    });
};


