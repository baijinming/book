const {Router} = require('express')
const router = Router()
const bookModel = require('../model/book')
const auth = require('./auth')
const categoryModel = require('../model/category')
//添加书籍
router.post('/', auth, async (req, res, next) => {
    try {
        const {
            url,
            img,
            author,
            typeId,
            title
        } = req.body
        console.log(req.body)
        const isCatagory = await categoryModel.findOne({_id: typeId})
        if (isCatagory) {
            const data = await bookModel.create({
                url,
                img,
                author,
                typeId,
                title
            })
            await categoryModel.updateOne({_id: typeId},{$push: {books: data._id}})
            res.json({
                code: 200,
                msg: '书籍添加成功',
                data
            })
        } else {
            res.json({
                code: 400,
                msg: '分类不存在'
            })
        }
    } catch (err) {
      next(err)
    }
})

// 修改书籍
router.put('/', auth, async(req, res, next) => {
    try {
        const {
            _id,
            img,
            author,
            index,
            title,
            typeId,
            desc,
        } = req.body
        console.log(req.body)
        // 判断数据是否存在空值
        if (_id === '' ||
            author === '' ||
            title === '' ||
            img === '' ||
            index === '' ||
            typeId === '') {
            res.json({
                code: 400,
                msg: '信息不完整'
            })
        }
        let book = await bookModel.findOne({_id})
        let categoryId = book.typeId
        // 删除原分类表中的数据

        const catagory = await categoryModel.findOne({_id: categoryId})
        if (catagory) {
            const ifDelete = await categoryModel.updateOne({_id: categoryId}, {$pull: {books: _id}})
        }
        const data = await bookModel.updateOne({_id},{$set: {
                img,
                title,
                author,
                typeId,
                desc,
                index
            }})
        // 在新分类表中添加此书籍
        await categoryModel.updateOne({_id: typeId}, {$push: {books: _id}})
        res.json({
            code: 200,
            msg: '书籍修改成功',
            data
        })
    } catch (err) {
      next(err)
    }
})


// 获取书籍
router.get('/', async (req, res, next) => {
    try {
        let {pn=1, size=10} = req.body
        pn = parseInt(pn)
        size = parseInt(size)
        const data = await bookModel
            .find()
            .skip((pn - 1) * size)
            .limit(size)
            .populate({
                path: 'typeId',
                select: 'title icon'
            })
        const count = await bookModel.count()
        res.json({
            code: 200,
            data,
            count,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
})

// 获取单本书籍
router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const data = await bookModel
            .findOne({_id: id})
            .populate({
                path: 'typeId',
                select: 'title _id'
            })
        res.json({
            code: 200,
            data,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
})

// 删除书籍
router.delete('/:id', auth, async(req, res, next) => {
    try {
        const { id } = req.params
        // 查询是否存在此分类
        const book = await bookModel.findOne({_id : id})
        const typeId = book.typeId
        const catagory = await categoryModel.findOne({_id: typeId})
        if (catagory) {
            // 删除原分类表中的数据
            await categoryModel.updateOne({_id: typeId}, {$pull: {books: id}})
            await bookModel.deleteOne({_id: id})
            let data = await categoryModel.findOne({_id: typeId})
            res.json({
                code: 200,
                msg: '书籍删除成功',
                data
            })
        } else {
            res.json({
                code: 400,
                msg: '分类不存在'
            })
        }
    } catch (err) {
        next(err)
    }
})



module.exports = router