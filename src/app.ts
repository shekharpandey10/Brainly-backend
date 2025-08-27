import  express from "express"
import  userRouter  from "./routes/user.routes"
import contentRouter from "./routes/content.route"


const app=express()
app.use(express.json())

console.log('app file')

app.use('/app/v1/user',userRouter)
app.use('/app/v1/content',contentRouter)




export default app;


