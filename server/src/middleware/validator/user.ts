const { body } = require("express-validator");

const updateUserValidator = [
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("비밀번호는 8자리 이상이어야 합니다."),
  body("phoneNumber")
    .optional()
    .notEmpty()
    .withMessage("전화번호를 입력해주세요."),
  body("postCode")
    .optional()
    .notEmpty()
    .withMessage("우편번호를 입력해주세요."),
  body("address").optional().notEmpty().withMessage("주소를 입력해주세요."),
  body("addressDetail").optional(),
];

export { updateUserValidator };
