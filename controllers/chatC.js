
import { CreateResponse } from "../utils/customFun.js";
import User from "../models/userM.js";
import Chat from "../models/chatsM.js";
import Group from "../models/groupM.js";


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
            GroupID:req.body.group_id,
            username:userId.name
        })
        
        const chat_found = await Chat.findByPk(chat_obj.id)

        if (!chat_found) {
            res.status(404).json(CreateResponse("failed", "request failed", null, "chat not found"));
            return;
        }
    
        res.status(201).json(CreateResponse("success","chat saved in DB"));
        return;
    } catch (error) {
        // console.log('err-->',error);
        
        res.status(404).json(CreateResponse("failed","request failed",null,"chat not saved"));
    }

}



export const getUserChat = async(req,res)=>{
    if (!req.user) {
        res.status(404).json(CreateResponse("failed","request failed",null,"user not found"));
        return
    }
    // console.log('re.user',req.query);
    
    try {
        //step1: fetch the user making the request
        // const userId = req.user;
        // console.log('i am get request...',userId.name);
        const chat_data = await Chat.findAll({
            where:{GroupID:req.query.groupid},
            order:[["createdAt","ASC"]]
        })
        
        // console.log('caht data',chat_data);
        
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


export const createGroupNm = async (req,res)=>{
    if (!req.user) {
        res.status(404).json(CreateResponse("failed","request failed",null,"user not found"));
        return;
    }
        
    try {
        const groupname = req.body.groupName
        // console.log('frooouname',groupname);
        
        //step1: fetch the user making the request
        const userId = req.user;
    
        //step2: craeta the chat
        const group_obj = await Group.create({
            gpName:req.body.groupName,
            UserID:userId.id,
        })
        
        const group_found = await Group.findAll({order:[["createdAt","ASC"]]})
        // console.log('group found',group_found);
        
        res.status(201).json(CreateResponse("success","chat saved in DB",group_found));
        return;
    } catch (error) {
        console.log('err-->',error);
        
        res.status(404).json(CreateResponse("failed","request failed",null,"chat not saved"));
    }

}


export const getGroups = async (req,res)=>{
    if (!req.user) {
        res.status(404).json(CreateResponse("failed","request failed",null,"user not found"));
        return
    }        
    try {
        const group_found = await Group.findAll({order:[["createdAt","ASC"]]})
        // console.log('group found',group_found);
        const username = req.user.name
        res.status(201).json(CreateResponse("success","groups name fetched",{group_found,username}));
        return;
    } catch (error) {
        console.log('err-->',error);
        res.status(404).json(CreateResponse("failed","request failed",null,"chat not saved"));
    }

}


export const deleteGroup = async (req,res)=>{
    if (!req.user) {
        res.status(404).json(CreateResponse("failed","request failed",null,"user not found"));
        return
    }   
    // console.log('=====>',req.query);
    try {
        const groupObj = await Group.destroy({
            where:{id:req.query.groupid}
        })
        // console.log('group found====>',groupObj);
        res.status(201).json(CreateResponse("success","groups deleted",));
        return;
    } catch (error) {
        console.log('err-->',error);
        res.status(404).json(CreateResponse("failed","request failed",null,"group not deleted"));
    }


}

