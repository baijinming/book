const mongoose =  require('mongoose')

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    header: { //头像
      type: String,
      default: "http://pbl.yaojunrong.com/icon_default.png" //默认设置一个头像
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String
        // required: true
    },
    sex: Number,
    phone: Number,
    desc: String,
    age: Number,
    email: String
}, {versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}}) // 自动生成添加日期和修改日期

module.exports = mongoose.model('adminUser', adminSchema)