const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

//encrypt password before save -- HOOKS
//using pre hooks -- cannot use arrow function inside it
// we are using next as after this process is done pass it on the next item
//but it will run all the time where there is updating but we want to run it for first time so we use 
userSchema.pre('save', async function(next){
    //only run this function if password was modified (not on toher modification or upate function)
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

//adding method to userSchema object . this method will be available to all the object of userSchema
// validate the password with passed on user password
userSchema.methods.isVaildatePassword = async function(sendPassword){
    // boolean value compare function returns
    return await bcrypt.compare(sendPassword, this.password);
};

//create and return jwt token
userSchema.methods.getJwtToken = function(){
    jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
};

//generate forgot password token(string)
userSchema.methods.getForgotPasswordToken = function(){
    //generate a long random string- multiple methods 
    const forgotToken = crypto.randomBytes(20).toString('hex');
    //the above thing generates it and you can use it directly but we are adding one extra layer of security-- it can be ignored

    // getting a hash - make sure to get a hash on backend
    //we are saving the hash in the db but sending the forgottoken without the hash so when the user sends -- hash it then compare
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex');

    //time of token
    this.forgotPasswordExpiry = Date.now() + 20*60*1000;

    return forgotToken;
};

module.exports = mongoose.model('User', userSchema);