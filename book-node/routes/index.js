const express = require('express');
const router = express.Router();
const adminUser = require('../controller/adminUser')
const category = require('../controller/category')
const book = require('../controller/book')
const swiper = require('../controller/swiper')

const bookModel = require('../model/book')
const categoryModel = require('../model/category')

/* GET Admin */
router.use('/', adminUser);
router.use('/admin/category', category)
router.use('/admin/book', book)
router.use('/admin/swiper', swiper)

// 获取全部分类信息
router.use('/all', async (req, res, next) => {
    try {
        const data = await categoryModel.find()
        console.log(data)
        const categoryCount = await categoryModel.count()
        const bookCount = await bookModel.count()
        res.json({
            code: 200,
            data,
            categoryCount,
            bookCount,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router;
