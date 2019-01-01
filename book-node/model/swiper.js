const mongoose = require('mongoose')
const Schema = mongoose.Schema

const swipeSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'books'
    },
    title: {
        type: String,
        required:true
    },
    index: {
        type: Number,
        default: 1
    }
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

const swipeModel = mongoose.model('swiper', swipeSchema)
module.exports = swipeModel
