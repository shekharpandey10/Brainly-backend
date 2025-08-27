import { Router, Request, Response } from 'express'
import { Users } from '../models/user.model'

const userRouter = Router()
console.log('router file')

userRouter.get('/', (req: Request, res: Response) => {
    console.log('fajfja')
  return res.json({
    msg: 'hello word',
  })
})


userRouter.post('/signup', (req: Request, res: Response) => {
  const { username, password } = req.body
  if (username.trim() === '' || password.trim() === '')
    return res.status(403).json({
      msg: 'Wrong username password',
    })

  return res.json({
    msg: 'hello',
  })
})

export default userRouter
