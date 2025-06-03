import express from 'express';
import {
  createProducts_listcategory,
  getAllProducts_lists,
  getProducts_listById,
  updateProducts_list,
  deleteProducts_list,
} from '../controllers/product_list_controller.js';

const router = express.Router();

router.get('/', getAllProducts_lists);
router.get('/:id', getProducts_listById);
router.post('/', createProducts_listcategory);
router.put('/:id', updateProducts_list);
router.delete('/:id', deleteProducts_list);

export default router;
