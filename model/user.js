const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type: string,
        default: null
    },
    lastname:{
        type: string,
        default: null
    },
    email:{
        type: string,
        unique: true,
    },
    password:{
        type: string,
    },
    token:{
        type: string,
    }
});

// mongoose will save the name as lower case only as you have put it as User
module.exports = mongoose.model('User', userSchema);