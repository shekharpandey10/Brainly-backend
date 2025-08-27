import { Router } from "express";
import { contentValid } from "../validators/auth.validator";
import { userAuth } from "../validators/userAuth";

const contentRouter=Router()


contentRouter.get('/',(req,res)=>{
    res.json({
        msg:'hello'
    })
})

contentRouter.post('/add',contentValid,userAuth,(req:any,res:any)=>{
  return res.json({
    msg:'hello boss when you here'
   })
})

export default contentRouter