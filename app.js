// express 모듈을 불러옵니다.
import express from 'express';
// express 애플리케이션을 생성합니다.
const app = express();
// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 8080;

// environment load
import "./utils/env.js"


//cookie set on
// const cookieParser = require('cookie-parser');
import cookieParser from "cookie-parser";
const Cookie_Secret = process.env.COOKIE_SECRET ? process.env.COOKIE_SECRET :"SECRET_FOR_COOKIE_OR_SESSION";
app.use(cookieParser(Cookie_Secret));

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



// cors policy 설정
import cors from 'cors'
app.use(cors());

// 작성된 컨트롤러 모듈 호출
import memberRouter from "./routes/memberRouter.js";
import articleRouter from "./routes/articleRouter.js";
import commentRouter from "./routes/commentRouter.js";

// set middleware
app.use(express.urlencoded({extended : true}));

app.use(express.json());
app.use(express.text())
import path from "path";
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'files')));

app.use('/users',memberRouter);
app.use('/articles',articleRouter);
app.use('/comments',commentRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});