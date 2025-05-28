import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orders_controller.js';

const router = express.Router();

router.get('/', createOrder);
router.get('/:id', getAllOrders);

router.post('/', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
