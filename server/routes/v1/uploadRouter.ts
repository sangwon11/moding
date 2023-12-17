import multer, { StorageEngine } from "multer";
import path from "path";
import { Request, Response } from "express";
import { Router } from "express";

const uploadRouter = Router();

const storage: StorageEngine = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    // 이미지 파일을 저장할 디렉토리 경로 설정
    cb(null, "../public/images");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    // 업로드된 이미지 파일의 원래 파일명 그대로 저장
    const fileExt = path.extname(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드를 처리할 라우트
uploadRouter.post(
  "/",
  upload.single("image"),
  function (req: Request, res: Response) {
    if (req.file) {
      const fileName = req.file.filename;
      const imgUrl = "/img/" + fileName;
      res.json({
        error: null,
        data: imgUrl,
      });
    } else {
      res.status(400).json({
        error: "No file uploaded",
        data: null,
      });
    }
  }
);

export default uploadRouter;
