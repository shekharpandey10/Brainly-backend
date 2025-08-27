import  express from "express"
import  userRouter  from "./routes/user.routes"

const app=express()
app.use(express.json())

console.log('app file')

app.use('/app/v1/user',userRouter)




export default app;


