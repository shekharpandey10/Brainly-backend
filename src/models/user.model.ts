import mongoose, {Schema,model,Model} from "mongoose";
const user=new Schema({
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true}
})
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const content=new Schema({
    link:{type:String},
    type:{type:String,enum:contentTypes,require:true},
    title:{type:String,require:true},
    tags:{type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tags'
    }]},
    userId:{type:Schema.Types.ObjectId,ref:'user'}
})

const tag =new Schema({
    title:{type:String}
})

const link=new Schema({
    hash:{type:String,require:true},
    userId:{type:Schema.Types.ObjectId,ref:'user',require:true}
})

const Users=model('user',user)
const Contents=model('content',content)
const Tags=model('tag',tag)
const Links=model('link',link)

export {Users,Contents}