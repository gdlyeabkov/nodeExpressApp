const keys=require('../keys')
module.exports=function(email){
    return {
        
        to:email,
        from:keys.EMAIL_FROM,
        subject:'регистрация прошла успешно',
        html:`
            <h1>Добро пожаловать в наш магазин</h1>
            <h1>вы успешно создали аккаунт с email - ${email}</h1>
            <hr/>
            <a href=""></a>
        `,

    
        
    }
}