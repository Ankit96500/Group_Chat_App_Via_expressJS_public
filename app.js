import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import { join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";
//----
dotenv.config()
const app = express();

const PORT = process.env.PORT || 4000

app.get('/',(req,res)=>{
  res.redirect('/client/account/login.html')
})


// middelware setup
app.use(express.static(join(process.cwd(),"public")));
app.use(bodyParser.json());
app.use(cors({
  origin:"*"
}))

// loads routes
import adminRoutes from "./routes/adminR.js";
import chatRoutes from "./routes/chatR.js";

app.use("/admin",adminRoutes);
app.use("/chat",chatRoutes);

// import models:
import User from "./models/userM.js";
import Chat from "./models/chatsM.js";
import Group from "./models/groupM.js";


// USER <---> GROUP
User.hasMany(Group,{foreignKey:"UserID",as:"grouptb",onDelete:"CASCADE"})
Group.belongsTo(User,{foreignKey:"UserID" ,as:"usertb"})

// GROUP<---> CHATS
Group.hasMany(Chat,{foreignKey:"GroupID",as:"chattb",onDelete:"CASCADE"});
Chat.belongsTo(Group,{foreignKey:"GroupID",as:"grouptb"});



// port listening
sequelize
.sync()
// Chat.sync({force:true})
// .sync({alter:true})
.then(()=>{
  console.log(`connected db at PORT: ${PORT}`);
  app.listen(PORT);
})
.catch((error)=>{
  console.log(error);
});








