import { param } from 'express-validator';
// 주문정보 validation
const objectIdValidator = [param('orderId').isLength({ min: 12, max: 12 })];

export { objectIdValidator };
