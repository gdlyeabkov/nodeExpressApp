const {body}=require('express-validator/check')
const User=require('../models/user')
exports.registerValidators=[
    body('email').isEmail().withMessage('Введите корректный email').custom(async(value,{req})=>{
        try{
            const user=await User.findOne({
                email:value
            })
            if(user){
                return Promise.reject('Такой email уже занят')
            }
        }catch(e){

        }
    }).normalizeEmail(),
    body('password','пароль должен быть минимум 6 символов').isLength({min:6,max:56}).isAlphanumeric().trim(),
    body('confirm').custom((value,{req})=>{
        if(value!==req.body.password){
            throw new Error('пароли должны совпадать')
        }
        return true
    }).trim(),
    body('name').isLength({min:3}).withMessage('имя должно быть минимум 3 символа').trim()
]
expors.courseValidators=[
    body('title').isLength({min:3}).withMessage('минимальная длинна названия 3 символа').trim(),
    body('price').isNumeric().withMessage('введите корректную цену'),
    body('img','введите корректный url картинки').isURL()
]