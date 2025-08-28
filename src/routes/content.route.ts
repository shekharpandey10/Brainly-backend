import { Router } from 'express'
import { contentValid } from '../validators/auth.validator'
import { Contents, Tags } from '../models/user.model'
import { userAuth } from '../validators/userAuth'
import mongoose from 'mongoose'
import { success } from 'zod'
import { error } from 'console'

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

contentRouter.get('/list', userAuth, async (req: any, res: any) => {
  const userId = req.userId

  try {
    const data = await Contents.find({ userId: userId }).select('-userId')
    console.log(data)
    if (data.length < 1) {
      return res.status(403).json({
        msg: 'no docs found',
        userId: userId,
      })
    }
    res.status(200).json({
      data: data,
    })
  } catch (e) {
    res.status(400).json({
      error: e,
    })
  }
})

contentRouter.delete('/delete', userAuth, async (req: any, res: any) => {
  const { docId } = req.body

  try {
    const result = await Contents.deleteOne({ _id: docId })
    if (!result.acknowledged || !result.deletedCount) {
     return res.status(403).json({
        msg: 'Trying to delete a doc you don’t own or Document is not present',
      })
    }
    res.json({
      msg: 'deleted sucessfully',
      deletedDocs: result.deletedCount,
    })
  } catch (e) {
    res.status(403).json({
      msg: "Couldn't delete the docs..... something invalid ",
      error: e,
    })
  }
})

contentRouter.put('/shareLink', userAuth, async (req: any, res: any) => {
  const { docId } = req.body
  const userId = req.userId
  try {
    const x = await Contents.findOneAndUpdate(
      { _id: docId, userId: userId },
      { $set: { share: true } }
    )
    if (!x) {
      return res.status(404).json({
        msg: 'data not found!',
      })
    }
    res.status(200).json({
      msg: 'Link is public now',
      url: `/app/v1/content/brainly/${docId}`,
    })
  } catch (e) {
    res.status(403).json({
      msg: 'Invalid Operation',
    })
  }
})

contentRouter.get(
  '/brainly/:id',
  userAuth,
  async (req: any, res: any, next: any) => {
    const urlId = req.params.id
    console.log(urlId)
    if (!mongoose.Types.ObjectId.isValid(urlId)) {
      return res.status(400).json({ error: 'Invalid content ID' })
    }

    try {
      const data = await Contents.findById(urlId).select('title type tags ')
      console.log(data)
      res.json({
        msg: 'thankyou',
        data: data,
      })
    } catch (e) {
      return res.json({
        msg: 'Link is private',
      })
    }
  }
)

export default contentRouter
