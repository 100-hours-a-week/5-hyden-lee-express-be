import express from 'express';
import memberController from '../controllers/memberController.js';

const app = express()

import multer from "multer";

const upload = multer({
    dest: 'files/',
})
const uploadMiddleware = upload.single("profileImg");

app.use(uploadMiddleware);
const router = express.Router();

router.post('/login',memberController.validateMember);
router.post('/signup',upload.single("profileImg"), memberController.createMember);
router.get('/email', memberController.validateDuplicateEmail);
router.get('/nickname', memberController.validateDuplicateNickname);
router.post('/update/member', memberController.updateMember);
router.post('/update/password', memberController.updatePassword);
router.post('/delete/member', memberController.deleteMember);
router.get('/:userid',memberController.getMember)


export default router;
