const {Router} = require('express')
const router = Router()
const swiper = require('../model/swiper')
const bookModel = require('../model/book')
const auth = require('./auth')

// 添加轮播图
router.post('/', auth, async (req, res, next) => {
    try {
       const {img, book, index, title} = req.body
        const data = await swiper.create({
            img,
            book,
            index,
            title
        })
        res.json({
            code: 200,
            data,
            msg: '轮播图添加成功'
        })
    } catch (err) {
       next(err)
    }
})

// 查询轮播图
router.get('/', async (req, res, next) => {
    try {
       let {pn=1, size=10} = req.query
        pn = parseInt(pn)
        size = parseInt(size)
        const data = await swiper
            .find()
            .skip((pn - 1) * size)
            .limit(size)
            .populate({
                path: 'book'
            })
            .sort({
                index: '-1'
            })
        const count = await swiper.count()
        res.json({
            code: 200,
            data,
            count,
            msg: 'succes'
        })
    } catch (err) {
      next(err)
    }
})

// 查询单张轮播图
router.get('/:id', async (req, res, next) => {
    try {
       let {id} = req.params
        console.log(id)
        const data = await swiper
            .findOne({_id: id})
            .populate({
                path: 'book',
                select: 'title _id'
            })
        res.json({
            code: 200,
            data,
            msg: 'succes'
        })
    } catch (err) {
      next(err)
    }
})

// 修改轮播图
router.put('/:id',auth ,async (req, res, next) => {
    try {
        const {id} = req.params
        const {img, book, title, index} = req.body
        const swipe = await swiper.findOne({_id: id})
        if (swipe) {
            const bookData = await bookModel.findOne({_id: book})
            console.log(bookData)
            if(bookData) {
                const data = await swiper
                    .updateOne({_id: id},{$set: {img, book, title, index}})
                res.json({
                    code: 200,
                    msg: '修改成功',
                    data
                })
            } else {
                res.json({
                    code: 400,
                    msg: '该轮播图不存在'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '该轮播图不存在'
            })
        }
    } catch (err) {
      next(err)
    }

})

// 删除轮播图
router.delete('/:id', auth, async (req, res, next) => {
    try {
      const {id} = req.params
        const hasSwiper = await swiper.findOne({_id: id})
        if(hasSwiper){
          const isDel = await swiper.deleteOne({_id: id})
            res.json({
                code: 200,
                msg: '删除成功',
                data: isDel
            })
        } else {
          res.json({
              code: 400,
              msg: '该轮播图不存在'
          })
        }
    } catch (err) {
      next(err)
    }
})

module.exports = router

