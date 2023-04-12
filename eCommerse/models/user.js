const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email:{
        type: String,
        required: [true, 'Please provide a name'],
        validate: [validator.isEmail, 'Please enter email in correct format'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'password should be atleast 6 characters'],
        select: false,
    },
    role: {
        type: String,
        default: 'user',
    },
    photo: {
        id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

//encrypt password before save
//using pre hooks -- cannot use arrow function inside it
// we are using next as after this process is done pass it on the next item
//but it will run all the time where there is updating but we want to run it for first time so we use 
userSchema.pre('save', async function(next){
    //only run this function if password was modified (not on toher modification or upate function)
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
})



module.exports = mongoose.model('User', userSchema);