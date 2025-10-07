import  express from "express"
import  userRouter  from "./routes/user.routes"
import contentRouter from "./routes/content.route"
import cors from 'cors'

const domains=[ "http://localhost:5173",
  "https://www.brainly-front-end-rtjd.vercel.app","http://localhost:5173"]
const app=express()
app.use(cors({
  origin: domains,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true
}));

app.use(express.json())

console.log('app file')

app.use('/app/v1/user',userRouter)
app.use('/app/v1/content',contentRouter)




export default app;


