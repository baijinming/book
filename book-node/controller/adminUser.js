const {Router} = require("express")
const router = Router();
const adminUser = require("../model/adminUser")
const auth = require("./auth")

// 创建用户
router.post("/user", (req, res, next) => {
    let {
        username,
        header,
        password,
        desc,
        nickname,
        sex,
        phone,
        email,
        age
    } = req.body
    console.log(req.body)
    adminUser.create({
        username,
        header,
        password,
        desc,
        nickname,
        phone,
        sex,
        email,
        age
    }).then(data => {
        res.json({
            code: 200,
            msg: '添加成功'
        })
    }).catch(err => {
        next(err)
    })
})

// 用户登录
router.post("/login", (req, res, next) => {
    let {username, password} = req.body
    console.log(req.body)
    adminUser.findOne({username}).then(data => {
        console.log(data)
        if (data === null) {
            res.json({
                code: 400,
                msg: '用户不存在'
            })
        } else if (data.username === username) {
            req.session.user = data
            data.password = ''
            res.json({
                code: 200,
                msg: '登录成功',
                data: data
            })
        } else {
            res.json({
                code: 401,
                msg: '密码错误'
            })
        }
    }).catch(err => {
        next(err)
    })
})

// 管理员列表
router.get("/admin/user", async (req, res, next) => {
    try {
        let {pn= 1, size= 10} = req.query
        pn = parseInt(pn)
        size = parseInt(size)
        const data = await adminUser
            .find()
            .skip(( pn - 1 ) * size)
            .limit(size)
            .sort({ '_id': -1 })
        const count = await adminUser.count()
        res.json(
            {
                code: 200,
                data,
                count,
                msg: '获取管理员列表成功'
            })
    } catch (err) {
        next(err)
    }
})

// 获取个人信息
router.get("/admin/user/:id", async (req, res, next) => {
    try {
        let {id} = req.params
        const data = await adminUser.findOne({_id: id})
        console.log(data)
        data.password = ''
        res.json(
            {
                code: 200,
                data,
                msg: '获取个人信息成功'
            })
    } catch (err) {
        next(err)
    }
})

// 修改密码
router.put('/admin/password',auth , (req, res, next) => {
    const {password, new_password} = req.body
    const username = req.session.user.username
    adminUser.findOne({username}).then(data => {
        if(data.password === password) {
            adminUser.update({
                username
            },{
                password:new_password
            }).then(data => {
                res.json({
                    code: 200,
                    msg: '密码更改成功，请重新登录'
                })
            }).catch(err => {
                next(err)
            })
        } else {
            res.json({
                code: 401,
                msg: '密码错误'
            })
        }
    }).catch(err => {
        next(err)
    })

})

// 修改个人信息
router.put('/admin/user',auth ,async (req, res, next) => {
    try {
        const {
            header,
            desc,
            nickname,
            sex,
            phone,
            email,
            age
        } = req.body
        const _id = req.session.user._id
        const state = await adminUser.updateOne({_id},{$set: {
                header,
                desc,
                nickname,
                sex,
                phone,
                age,
                email}})
        const data = await adminUser.findOne({_id})
        data.password = ''
        res.json({
            code: 200,
            msg: '个人信息修改成功',
            data,
            state
        })
    } catch (err) {
      next(err)
    }
})

// 退出登录
router.get('/admin/logout', (req, res, next) => {
    if(req.session && req.session.user) {
        req.session.user = ''
        res.json({
            code: 200,
            msg: '退出成功'
        })
    } else {
        res.json({
            code: 400,
            msg: '当前尚未登录'
        })
    }
})

module.exports = router