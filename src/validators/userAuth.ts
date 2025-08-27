
import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export const userAuth = async (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  // Extract token
  const token = authHeader.split(' ')[1]

  try {
    //    const s=jwt.decode(token,process.env.JWT_SECRET as any)

    const decoded = await jwt.verify(token, process.env.JWT_SECRET as string)
    console.log(decoded)
    next()
  } catch (e) {
    console.log(e)
    return res.status(401).json({ error: 'Invalid token' })
  }
}
