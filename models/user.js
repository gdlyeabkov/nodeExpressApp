const {Schema,model}=require("mongoose")
const userShema=new Schema({
    email:{
        type:String,
        required:true
    },
    name:String,
    password:{
        type:String,
        required:true
    },
    avatarUrl:String,
    resetToken:String,
    resetTokenExp:Date,
    cart:{
        items:[
            {
                count:{
                    type:Number,
                    required:true,
                    default:1
                },
                courseId:{
                    type:Schema.Types.ObjectId,
                    required:true,
                    ref:'Course'
                }
            }
    ]
    }
})

userShema.methods.addToCart = function(course){
    const items=[...this.cart.items.concat()]
    const idx=items.findIndex(c=>{
        return c.courseId.toString()===course._id.toString()
    })
    if(idx>=0){
        items[idx].count=items[idx].count+1
    }else{
        items.push({
            clonedItems:course._id,
            count:1
        })
    }
    this.cart={items}
    return this.save()
}
userShema.methods.removeFromCart=function(id){
    let items=[...this.cart.items]
    const idx=items.findIndex(c=>{
        return c.courseId.toString()===id.toString()
    })
    if(items[idx].count===1){

    }else{
        //items[idx].count--
        items=items.filter(c=>c.courseId.toString()!==id.toString())
    }
    this.cart={items}
    return this.save
}
userShema.methods.clearCart=function(){
    this.cart={items:[]}
    return this.save()
}
module.exports=model('User',userShema)