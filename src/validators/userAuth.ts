import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { any } from 'zod'
export const userAuth = async (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }
  // Extract token
  const token = authHeader.split(' ')[1]
  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) return res.status(403).json({ msg: 'Invalid token' })
        console.log(user, ' token')
        req.userId = user.id
        next()
      }
    )
  } catch (e) {
    console.log(e)
    return res.status(401).json({ error: 'Invalid token', status: 401 })
  }
}
