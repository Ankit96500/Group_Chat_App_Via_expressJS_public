
import { Router } from 'express';

import { postSignupUser ,postLoginUser} from '../controllers/accountC.js';

const router = Router();

// /admin/create user => POST
router.post('/signup-user', postSignupUser);


// /admin/loginuser => POST
router.post('/login-user', postLoginUser);

// // admin update income => post
// router.post('/update-income/',UserAuthorized,updateUserIncome);



export default router;
