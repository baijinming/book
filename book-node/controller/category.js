const {Router} = require('express')
const router = Router()
const categoryModel = require('../model/category')
const auth = require('./auth')

// 添加分类
router.post('/', auth, (req, res, next) => {
    const {title, icon} = req.body
    console.log(req.body)
    categoryModel.create({title, icon}).then(data => {
        res.json({
            code: 200,
            msg: '分类添加成功',
            data
        })
    }).catch(err => {
        next(err)
    })
})

// 修改分类
router.put('/', auth, async (req, res, next) => {
    try {
        const {_id, title, icon, index = 1} = req.body
        if (_id === '' || title === '' || icon === '') {
            res.json({
                code: 400,
                msg: '修改信息不完整'
            })
            return
        }
        console.log(index)
        const data = await categoryModel.updateOne({_id: _id}, {$set: {title: title, icon: icon, index: index}})

        res.json({
            code: 200,
            msg: '分类修改成功',
            data
        })

    } catch(err) {
        next(err)
    }
})

// 获取分类
router.get('/', async (req, res, next) => {
    try {
        let {pn = 1, size = 10} = req.body
        pn = parseInt(pn)
        size = parseInt(size)
        const data = await categoryModel
            .find()
            .skip((pn - 1) * size)
            .limit(size)
            .sort({
                index: '-1'
            })
        const count = await categoryModel.count()
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



// 获取一条分类
router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const data = await categoryModel
            .findOne({_id:id})
            .populate({
                path: 'books'
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

// 删除分类
router.delete('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const data = await categoryModel.findOne({_id:id})
        if(data){
            if(data.books.length == 0){
                const isDel = await categoryModel.deleteOne({_id: id})
                res.json({
                    code: 200,
                    msg: '删除成功',
                    data: isDel
                })
            } else {
                res.json({
                    code: 400,
                    msg: '该分类不为空'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '该分类不存在'
            })
        }

    } catch (err) {
        next(err)
    }
})

module.exports = router