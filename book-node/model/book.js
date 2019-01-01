const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
      type: String,
      required: true
    },
    img: {
        type: String,
        required: true
    },
    author: {
        type: String,
        isRequired: true
    },
    typeId: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        isRequired: true
    },
    desc: {
        type: String
    }
},{versionKey: false,timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

const newsModel = mongoose.model('books', newsSchema)
module.exports = newsModel