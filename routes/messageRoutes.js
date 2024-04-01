import {Router} from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { sendMessage,allMessages } from '../controllers/messageControllers.js';

const router=Router();

router.post('/',protect,sendMessage);
router.get('/:chatId',protect,allMessages);
export default router;