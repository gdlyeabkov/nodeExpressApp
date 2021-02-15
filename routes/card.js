const {Router}=require("express")
const router=Router()
//const Card=require("../models/card")
const Course=require("../models/course")
const auth=require('../middleware/auth')


function mapCartItems(cart){
    cart.items.map(c=>({
        ...c.courseId._doc,
        id:c.course.id,
        count:c.count
    })
    )
}
function computePrice(courses){
    return courses.reduce((total,course)=>{
        return total+=course.price * course.count
    },0,)
}

router.post('/add',auth,async (req,res)=>{
    const course=await Course.findById(req.body.id)
    await req.user.addToCart(course)
    //await Card.add(course)
    res.redirect('/card')
})

router.delete('/remove/:id',auth,async(req,res)=>{
    //const card=await Card.remove(req.params.id)
    await req.user.removeFromCart(req.params.id)
    const user=await req.user.populate('cart.items.courseId').execPopulate()
    const courses=mapCartItems(user.cart)
    const cart={
        courses,
        price:computePrice(courses)
    }
    res.status(200).json(cart)
})

router.get('/',auth,async (req,res)=>{
    //const card=await Card.fetch()
    const user=await req.user.populate('cart.items.courseId').execPopulate()
    //const courses=user.cart.items.map()
    const courses=mapCartItems(user.cart)
    res.render('card',{
        title:'Корзина',
        isCard:true,
        courses:courses,
        price:computePrice(courses)
    })
})

module.exports=router