import express from 'express';
import {
  createProducts_type,
  getAllProducts_type,
  getProducts_typeById,
  updateProducts_type,
  deleteProducts_type,
} from '../controllers/product_type_controller.js';

const router = express.Router();

router.get('/', createProducts_type);
router.get('/:id', getAllProducts_type);

router.post('/', getProducts_typeById);
router.put('/:id', updateProducts_type);
router.delete('/:id', deleteProducts_type);

export default router;
