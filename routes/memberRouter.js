import express from 'express';
import memberController from '../controllers/memberController.js';

const app = express()

import multer from "multer";

const upload = multer({
    dest: 'files/',
})
const uploadMiddleware = upload.single("profileImg");

app.use(uploadMiddleware);

//cookie set on
// const cookieParser = require('cookie-parser');
import cookieParser from "cookie-parser";
app.use(cookieParser(process.env.COOKIE_SECRET));

// session middleware set on
// const session = require('express-session');
import session from 'express-session';
import MemoryStore from 'memorystore';
const memoryStore = MemoryStore(session);
app.use(
    session({
        // secret: "secret key",
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new memoryStore({checkPeriod:86400000}),
        cookie: { maxAge: 86400000 },
    })
);
// console.log(process.env.SESSION_SECRET);

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
