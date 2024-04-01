import {Router} from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { accessChat,
            fetchChat,
            createGroupChat,
            renameGroup,
            addToGroup,
            removeFromGroup
        } from '../controllers/chatControllers.js';
const router=Router();

router.post('/',protect,accessChat);
router.get('/',protect,fetchChat);
router.post('/group',protect,createGroupChat);
router.put('/rename',protect,renameGroup);
router.put('/groupadd',protect,addToGroup);
router.put('/groupremove',protect,removeFromGroup);


export default router;