import { param } from 'express-validator';
// 주문정보 validation
const objectIdValidator = [param('id').isLength({ min: 28, max: 28 })];

export { objectIdValidator };
