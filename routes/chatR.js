
import { Router } from 'express';

import { createChat,getUserChat,createGroupNm,getGroups,deleteGroup} from '../controllers/chatC.js';

import { UserAuthorized } from '../middleware/authorize.js';

const router = Router();

// /admin/create user => POST
router.post('/create-chat',UserAuthorized,createChat);

// get all_chat;
router.get("/get-chat",UserAuthorized,getUserChat);

// crate group name;
router.post('/create-group',UserAuthorized,createGroupNm);

//get all groups:
router.get('/get-groups',UserAuthorized,getGroups);

// delete group:
router.get('/del-group',UserAuthorized,deleteGroup);




export default router;
