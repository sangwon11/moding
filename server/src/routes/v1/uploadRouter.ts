import express, { Response, Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads/");
    },
    filename: (req, file, cb) => {
        // 업로드된 이미지 파일의 이름을 현재 시간 기반으로 생성
        const fileExt = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + fileExt);
    },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

uploadRouter.post("/", upload.single("image"), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: "이미지 업로드 실패" });
    }

    const fileName = req.file?.filename;
    const imgUrl = "/uploads/" + fileName;

    res.json({
        error: null,
        data: imgUrl,
    });
});

uploadRouter.delete('/:imageName', (req: Request, res: Response) => {
  const imageName: string = req.params.imageName;
  const imagePath: string = path.join(__dirname, '..', 'client', 'public', 'uploads', imageName); 

  fs.unlink(imagePath, (err: NodeJS.ErrnoException | null) => {
      if (err) {
          console.error("이미지 삭제 에러:", err);
          return res.status(500).json({ error: "이미지 삭제 실패" });
      }
      res.json({
        error: null,
        data: req.params.imageName,
    });
  });
});

export default uploadRouter;
