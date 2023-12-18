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
    // 파일명을 고유하게 생성하기 위해 현재 시간을 기반으로 파일명을 생성
    const uniqueFilename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueFilename);
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
