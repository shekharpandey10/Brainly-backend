import  express from "express"
import  userRouter  from "./routes/user.routes"
import contentRouter from "./routes/content.route"
import cors from 'cors'


const app=express()
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())

console.log('app file')

app.use('/app/v1/user',userRouter)
app.use('/app/v1/content',contentRouter)




export default app;


