const csrf=require("csurf")
const flash=require("connect-flash")
const express=require("express")
const app=express()
const exphbs=require("express-handlebars")
const session=require("express-session")
const MongoStore=require("connect-mongodb-session")(session)
const path=require("path")
const mongoose=require("mongoose")
const helmet=require("helmet")
const compression=require("compression")
const homeRoutes=require("./routes/home")
const cardRoutes=require("./routes/card")
const addRoutes=require("./routes/add")
const coursesRoutes=require("./routes/courses")
const authRoutes=require("./routes/auth")
const ordersRoutes=require("./routes/orders")
//const User=require("./models/user")
const varMiddleware=require('./middleware/variables')
const userMiddleware=require('./middleware/user')
const fileMiddleware=require('./middleware/file')
const keys=require('./keys')

const errorHandler=require('./middleware/error')
const profileRoutes=require('./routes/profile')

// const MONGODB_URI=`mongodb+srv://gleb:${password}@cluster0.hby7a.mongodb.net/shop`//<dbname>?retryWrites=true&w=majority

const password="IScD8TvD1ctKJZh8"

const hbs=exphbs.create({
    defaultLayout:'main',
    extname:'hbs',
    helpers:require('../utils/hbs-helpers')
})
const store=new MongoStore({
    collection:'sessions',
    uri:keys.MONGODB_URI,
    

})


app.use(express.static(path.join(__dirname,'public')))
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(express.urlencoded({extended:true}))
app.use(session({secret:keys.SESSION_SECRET, resave:false, saveUninitialized:false,store:store}))
app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())


app.use(varMiddleware)
app.use(userMiddleware)

app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/add',addRoutes)
app.use('/card',cardRoutes)
app.use('/orders',ordersRoutes)
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)
app.use(errorHandler)
const PORT=process.env.PORT || 3000
async function start(){
    try{
        //const url=`mongodb+srv://gleb:${password}@cluster0.hby7a.mongodb.net/shop`//<dbname>?retryWrites=true&w=majority
        await mongoose.connect(keys.MONGODB_URI,{useNewUrlParser:true, useFindModify:false})
        // const candidate=await User.findOne()
        // if(!candidate){
        //     const user=new User({
        //         email:'gleb@mail.ru',
        //         name:'gleb',
        //         cart:{items:[]}
        //     })
        //     await user.save()
        // }
        app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
        })
    }catch(e){
        
    }
    
}

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')

// app.use((req,res,next)=>{
//     try{
//         const user=await User.findById('')
//         req.user=user
//         next()
//     }catch(e){

//     }
    
// })

//app.get('/',(req,res)=>{
    //res.status(200)
    //res.sendFile(path.join(__dirname,'views','index.html'))
    
//})


//app.get('/add',(req,res)=>{
    //res.status(200)
    //res.sendFile(path.join(__dirname,'views','about.html'))

//})

/*
app.get('/courses',(req,res)=>{
    
})
*/
