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
    const decoded = await jwt.verify(token, process.env.JWT_SECRET as string)
    console.log(decoded," decoded")
    req.userId = decoded.id
    console.log(req.userId," after decoded")
    next()
  } catch (e) {
    console.log(e)
    return res.status(401).json({ error: 'Invalid token' })
  }
}
