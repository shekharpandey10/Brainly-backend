import mongoose, {Schema,model,Model} from "mongoose";
import { boolean } from "zod";
const user=new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const content=new Schema({
    link:{type:String},
    type:{type:String,enum:contentTypes,required:true},
    title:{type:String,required:true},
    tags:{type:[String]},
    share:{type:boolean,default:false},
    userId:{type:Schema.Types.ObjectId,ref:'user'}
})

const tag =new Schema({
    title:{type:String,unique:true}
})

const link=new Schema({
    hash:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,ref:'user',required:true}
})

const Users=model('user',user)
const Contents=model('content',content)
const Tags=model('tag',tag)
const Links=model('link',link)

export {Users,Contents,Tags}