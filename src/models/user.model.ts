import {Schema,model,Model} from "mongoose";
const user=new Schema({
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true}
})

const content=new Schema({
    link:{type:String},
    type:{type:String,require:true},
    title:{type:String,require:true},
    tags:{type:[]},
    userId:{type:Schema.Types.ObjectId,ref:'user'}
})



const Users=model('user',user)
const Contents=model('content',content)

export {Users,Contents}