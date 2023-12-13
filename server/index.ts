// npx ts-node index.ts

import mongoose from "mongoose";
import Express from "express";
import router from './routes';
import bodyParser from "body-parser";
import { useNavigate } from "react-router-dom";
require('dotenv').config({ path: '../.env' });

const app = Express();
const port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const navigate = useNavigate();

const mongoURI: string = process.env.MONGODB || '';

// 몽고DB 서버 연결
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => navigate("/404")); // 서버연결 실패시 404페이지 연결

//api 호출
app.use("/api", router);


app.listen(port, () => {
    console.log(`localhost:${port} connected`)
})