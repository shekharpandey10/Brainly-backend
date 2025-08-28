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

    await Tags.findOne(tags)

    const userId = new mongoose.Types.ObjectId(req.UserId)
    console.log(type, 'type')
    console.log(title, 'title')
    console.log(link, 'link')
    console.log(tags, 'tags')
    console.log(userId, 'userId')
    try {
      console.log('helllofa')
      const result = await Contents.create({
        link,
        type,
        title,
        //@ts-ignore
        tags,
        userId,
      })
      console.log(result, 'fjakfjaj')
      return res.status(201).json({
        success: true,
        message: 'Content Added',
        contentId: userId,
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
    console.log('jflajlkajfklaj',tag)
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

export default contentRouter
