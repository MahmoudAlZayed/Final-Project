import express from 'express';
import {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
} from '../controllers/sizes_controller.js';

const router = express.Router();

router.get('/', createSize);
router.get('/:id', getAllSizes);

router.post('/', getSizeById);
router.put('/:id', updateSize);
router.delete('/:id', deleteSize);

export default router;
