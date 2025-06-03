import express from 'express';
import {
  createProducts_type,
  getAllProducts_type,
  getProducts_typeById,
  updateProducts_type,
  deleteProducts_type,
} from '../controllers/product_type_controller.js';

const router = express.Router();

router.get('/', getAllProducts_type);
router.get('/:id', getProducts_typeById);
router.post('/', createProducts_type);
router.put('/:id', updateProducts_type);
router.delete('/:id', deleteProducts_type);

export default router;
