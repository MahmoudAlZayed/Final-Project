import express from 'express';
import {
  createProducts_listcategory,
  getAllProducts_lists,
  getProducts_listById,
  updateProducts_list,
  deleteProducts_list,
} from '../controllers/product_list_controller.js';

const router = express.Router();

router.get('/', createProducts_listcategory);
router.get('/:id', getAllProducts_lists);

router.post('/', getProducts_listById);
router.put('/:id', updateProducts_list);
router.delete('/:id', deleteProducts_list);

export default router;
