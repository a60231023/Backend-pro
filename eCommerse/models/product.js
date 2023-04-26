const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
        maxlength: [120, 'Product name should not be more than 120 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        maxlength: [6, 'Product price should not be more than 6 digits']
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
    },
    photos: [
        {
            id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select catregory from - short-sleeves, long-sleeves, sweat-shirts, hoodies'],// if somebody doesn't sends the category then this error message
        enum: {
            values: [
                'shortsleeves',
                'longsleeves',
                'sweatshirts',
                'hoodies'
            ],
            // if somebody sends the category other than the values then this message
            message: 'Please Please select catregory from - short-sleeves, long-sleeves, sweat-shirts, hoodies',

        },
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand for clothing'],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "EUser",
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "EUser",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});



module.exports = mongoose.model('Product', productSchema);