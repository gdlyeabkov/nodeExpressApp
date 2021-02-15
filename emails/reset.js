const keys=require('../keys')
module.exports=function(email,token){
    return {
        to:email,
        from:keys.EMAIL_FROM,
        subject:'восстановление доступа',
        html:`
            <h1>вы забыли пароль</h1>
            <h1>если нет то проигнорируйте данное письмо</h1>
            <p>иначе нажмите на ссылку ниже:</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}"> восстановить доступ</a></p>
            <hr/>
            <a href=""></a>
        `
    }
}