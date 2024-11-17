import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import { join } from "path";



dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000


app.get('/',(req,res)=>{
  res.redirect('/client/account/login.html')
})


// middelware setup
app.use(express.static(join(process.cwd(),"public")));
app.use(bodyParser.json());
app.use(cors())

// loads routes
import adminRoutes from "./routes/adminR.js";
import chatRoutes from "./routes/chatR.js";

app.use("/admin",adminRoutes);
app.use("/chat",chatRoutes);

// import models:
import User from "./models/userM.js";
import Chat from "./models/chatsM.js";

// established association:
// USER <--> CHATS
User.hasMany(Chat,{foreignKey:"UserID",as:"chattb",onDelete:"CASCADE"});
Chat.belongsTo(User,{foreignKey:"UserID",as:"usertb"});


// port listening
sequelize
.sync()
// .sync({force:true})
.then(()=>{
  console.log(`connected db at PORT: ${PORT}`);
  app.listen(PORT);
})
.catch((error)=>{
  console.log(error);
});







