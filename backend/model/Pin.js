const mongoose = require("mongoose")

const pinSchema = new mongoose.Schema({
    username: {
        type :String,
        require : true
    },

    title : {
        type: String,
        require : true,
        min: 4
    },

    desc:{
        type : String,
        require : true
    },

    rating: {
        type : Number,
        require :true,
        min : 0
    },

    lat : {
        type : Number,
        require : true
    },
    long : {
        type: Number,
        require: true
    }

}, {timestamps : true})

const Pin = mongoose.model("Pin", pinSchema)
module.exports = Pin