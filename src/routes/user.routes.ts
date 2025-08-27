import { Router, Request, Response } from 'express'

import { Users } from '../models/user.model'
import { zodSignUp, SignUpRequest } from '../validators/auth.validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { error } from 'console'
import { string } from 'zod'
const userRouter = Router()
console.log('router file')

userRouter.get('/', (req: any, res: any) => {
  console.log('fajfja')
  return res.json({
    msg: 'hello word',
  })
})

userRouter.post(
  '/signup',
  zodSignUp,
  async (req: SignUpRequest, res: Response) => {
    const { username, password } = req.validateData || req.body

    try {
      const u = await Users.findOne({ username })
      console.log(u)
      if (u) {
        return res.status(403).json({
          msg: 'User already exists with this username...Please login!',
        })
      }
      const Hashedpass = await bcrypt.hash(password, 5)
      const isCreated = await Users.create({
        username: username,
        password: Hashedpass,
      })
      if (isCreated) {
        return res.status(200).json({
          msg: 'SignUp sucessfull.',
        })
      } else {
        return res.status(500).json({
          msg: 'SignUp failed... Please try again',
        })
      }
    } catch (error) {
      console.log(error)
      return res.status(403).json({
        error: error,
      })
    }
  }
)

userRouter.post('/signin', async (req: any, res: any) => {
  const { username, password } = req.body

  try {
    const user = await Users.findOne({ username })
    if (!user) {
      return res.status(403).json({
        msg: 'Wrong email password',
      })
    }
    // console.log(user)
    const validPass = await bcrypt.compare(password, user.password)
    console.log(validPass)
    if (!validPass) {
      res.status(403).json({
        msg:'Invalid email password'
      })


    }
    res.json({
      msg: 'boss',
    })
  } catch (e) {
    res.json({ error: e })
  }
})

export default userRouter
