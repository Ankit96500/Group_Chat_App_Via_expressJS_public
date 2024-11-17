
import { Router } from 'express';

import { createChat,getUserChat} from '../controllers/chatC.js';

import { UserAuthorized } from '../middleware/authorize.js';

const router = Router();

// /admin/create user => POST
router.post('/create-chat',UserAuthorized,createChat);

// get all_chat;
router.get("/get-chat",UserAuthorized,getUserChat);




export default router;
