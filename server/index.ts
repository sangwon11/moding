// npx ts-node index.ts

import mongoose from "mongoose";
import Express from "express";
import router from './routes';
import bodyParser from "body-parser";
require('dotenv').config({ path: '../.env' });

const app = Express();
const port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const mongoURI: string = process.env.MONGODB || '';

// 몽고DB 서버 연결
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err)); // 이후 서버연결 실패시 404페이지로 연결되도록 설계

//api 호출
app.use("/api", router);


app.listen(port, () => {
    console.log(`localhost:${port} connected`)
})