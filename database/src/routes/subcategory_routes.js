import express from 'express';
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
} from '../controllers/subcategories_controller.js';

const router = express.Router();

router.get('/', createSubcategory);
router.get('/:id', getAllSubcategories);

router.post('/', getSubcategoryById);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
