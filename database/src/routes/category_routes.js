import express from 'express';
import {
  createCategory,
  getCategorys,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category_controller.js';

const router = express.Router();

router.get('/', getCategorys);
router.get('/:id', getCategoryById);

router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
