import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { error } from 'console'

// Password rules
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(20, 'Password must not exceed 20 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const signUpSchema = z.object({
  username: z.string().email('Invalid email').min(5).max(25),
  password: passwordSchema,
})

// Type from schema
export type SignUpInput = z.infer<typeof signUpSchema>

// Extend Request just for this middleware
export type SignUpRequest = Request & { validateData?: SignUpInput }

// Middleware
export const zodSignUp = (
  req: SignUpRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    req.validateData = signUpSchema.parse(req.body) // ✅ typed
    console.log(req.validateData)
    next()
  } catch (e: any) {
    return res.status(411).json({ error: e.errors ?? e })
  }
}


const linkSchema = z.string().url("Must be a valid URL").min(11);
const typeSchema = z.string().min(2)
const titleSchema = z.string().min(1)
const tagsSchema = z.array(z.string().optional())

const validContent = z.object({
  link: linkSchema,
  type: typeSchema,
  title: titleSchema,
  tags: tagsSchema
})

export const contentValid=(req:any,res:any,next:any)=>{
 try{
   req.body=validContent.parse(req.body)
  console.log(req.body)
  next()
 }catch(e:any){
  res.status(403).json({
    msg:'Invalid Input',
    error:e
  })
 }
}