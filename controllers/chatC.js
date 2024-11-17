
import { CreateResponse } from "../utils/customFun.js";
import User from "../models/userM.js";
import Chat from "../models/chatsM.js";


export const createChat = async(req,res) =>{
    if (!req.user) {
        res.status(404).json(CreateResponse("failed","request failed",null,"user not found"));
        return
    }

    try {
        //step1: fetch the user making the request
        const userId = req.user;
    
        //step2: craeta the chat
        const chat_obj = await Chat.create({
            usChat:req.body.messageText,
            UserID:userId.id,
            username:userId.name
        })
        
        const chat_found = await Chat.findByPk(chat_obj.id)

        if (!chat_found) {
            res.status(404).json(CreateResponse("failed", "request failed", null, "chat not found"));
            return;
        }
        //step3: associtae the chat with user
        // await userId.createChattb(chat_found);
        
    
        res.status(201).json(CreateResponse("success","chat saved in DB"));
        return;
    } catch (error) {
        console.log('err-->',error);
        
        res.status(404).json(CreateResponse("failed","request failed",null,"chat not saved"));
    }

}



export const getUserChat = async(req,res)=>{
    if (!req.user) {
        res.status(404).json(CreateResponse("failed","request failed",null,"user not found"));
        return
    }
   
    try {
        //step1: fetch the user making the request
        const userId = req.user;
        // console.log('i am get request...',userId.name);
        const chat_data = await Chat.findAll({
            order:[["createdAt","ASC"]]
        })
        
        
        // const chat_data = await User.findAll({
        //     include:[{
        //         model:Chat,
        //         as:"chattb",
        //         attributes:['usChat',"createdAt"],
        //         order:[["createdAt","ASC"]]

        //     }],
        //     attributes:['name'],
        //     // order:[["createdAt","ASC"]]
          
        // })

        // // formattting the resposne:
        // const formattedData = chat_data.map(user =>{
        //     return{
        //         // username:user.name,
        //         chats:user.chattb.map(chat=>({
        //             username:user.name,
        //             message:chat.usChat,
        //             createdat:chat.createdAt,
        //         })),
        //     }      
        // })

        // console.log('formatted data',chat_data);
        
        res.status(201).json(CreateResponse("success","chat fetched from DB",chat_data));
        return;
   } catch (error) {
        console.log('err-->',error);
            
        res.status(404).json(CreateResponse("failed","request failed",null,"chat not fetched"));
   } 
}


