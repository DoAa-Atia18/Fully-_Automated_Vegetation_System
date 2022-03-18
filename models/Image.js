//Model to store the images porcessed by the deep learning algorithim
const mongoose = require("mongoose")
const Schema = mongoose.Schema;


var ImageSchema = new Schema({
    img: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model('Image', ImageSchema);