import {Router} from 'express';
import { authUser,registerUser,allUsers } from '../controllers/userControllers.js';
import {protect} from '../middlewares/authMiddleware.js';

const router=Router();

router.post("/login",authUser);
router.post("/signup",registerUser);
router.get('/',protect,allUsers);
export default router;