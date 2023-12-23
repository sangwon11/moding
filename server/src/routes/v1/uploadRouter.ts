import express, { Response, Request } from "express";
import multer from "multer";
import path from "path";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "client/public/images");
    },
    filename: (req, file, cb) => {
      // 업로드된 이미지 파일의 이름을 현재 시간 기반으로 생성
      const fileExt = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + fileExt);
    },
  });
  
  const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
  
  uploadRouter.post("/", upload.single("image"), (req:Request, res:Response) => {
    const fileName = req.file?.filename;
    const imgUrl = "/images/"+ fileName;
    res.json({
      error: null,
      data: imgUrl,
   });
  });


export default uploadRouter