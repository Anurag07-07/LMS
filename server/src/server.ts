import dotenv from  'dotenv'
dotenv.config()
import { app } from "./app.js";

//Create Server
app.listen(process.env.PORT,()=>{
  console.log(`Server is connected with PORT ${process.env.PORT}`);
})