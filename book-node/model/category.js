const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true
    },
    icon: {
        type: String
    },
    index: {
        type: Number,
        default: 1
    },
    books: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'books',
            unique: true
        }
    ],
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('category', categorySchema)
