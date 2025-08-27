import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
import app from './app'




const main = async () => {
  try {
    const con = await mongoose.connect(process.env.URL! ,{
        dbName:process.env.DB_NAME!
    })
    if (con.connection) {
      console.log(' database Connected...',con.connection.name)
      app.listen(process.env.PORT || 4000, () => {
        console.log('Port is listening on: ', process.env.PORT || 4000)
      })
    }
  } catch (err) {
    console.log(err)
  }
}
main()






