import { Router } from 'express'
import { contentValid } from '../validators/auth.validator'
import { Contents, Tags } from '../models/user.model'
import { userAuth } from '../validators/userAuth'
import mongoose from 'mongoose'
import { success } from 'zod'

const contentRouter = Router()

contentRouter.get('/', (req, res) => {
  res.json({
    msg: 'hello',
  })
})

contentRouter.post(
  '/add',
  contentValid,
  userAuth,
  async (req: any, res: any) => {
    const { type, title, link, tags } = req.body

    console.log(typeof req.userId, '  the boss alyaws')
    console.log(req.userId, '  the boss alyaws')
    let userId
    if (mongoose.Types.ObjectId.isValid(req.userId)) {
      userId = new mongoose.Types.ObjectId(req.userId)
    } else {
      throw new Error('Invalid userId')
    }
    try {
      console.log('helllofa')
      const result = await Contents.create({
        link,
        type,
        title,
        tags,
        userId,
      })
      console.log(result, 'fjakfjaj')
      return res.status(201).json({
        success: true,
        message: 'Content Added',
        autherId: userId,
      })
    } catch (e) {
      console.log(e)
    }
  }
)

contentRouter.post(
  '/tags/add',
  userAuth,
  async (req: any, res: any, next: any) => {
    console.log('hello')
    const { tag } = req.body
    console.log('jflajlkajfklaj', tag)
    try {
      const result = await Tags.findOne({ tag })
      console.log(result)
      if (result) {
        return res.json({
          msg: 'Tags is already present ',
        })
      }
      const isCreated = await Tags.create({
        title: tag,
      })
      console.log(isCreated)

      return res.status(200).json({
        tagId: isCreated._id,
        msg: 'Tag added',
      })
    } catch (e) {
      return res.status(500).json({
        msg: 'Invalid tag',
        error: e,
      })
    }
  }
)

contentRouter.get('/list',userAuth,async(req:any,res:any)=>{
  const userId=req.userId
  
  try{
   const data= await Contents.find({userId:userId}).select('-userId')
   console.log(data)
   if(data.length<1){
    return res.status(403).json({
      msg:"no docs found",
      userId:userId
    })
   }
   res.status(200).json({
    data:data
   })
  }catch(e){
  res.status(400).json({
    error:e
  })
  }
})
export default contentRouter
