import multer, { StorageEngine } from "multer"; // DiskStorage 대신 StorageEngine을 가져옵니다
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
    // 업로드된 이미지 파일의 이름을 현재 시간 기반으로 생성
    const fileExt = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + fileExt);
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
