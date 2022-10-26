const Mongoose  = require("mongoose");

const signupTemplate = new Mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        default: Date.now
    }

})


module.exports = Mongoose.model('mytabel',signupTemplate)