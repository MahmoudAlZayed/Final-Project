import express from 'express';

import {
  createColor,
  getColors,
  getColorById,
  updateColor,
  deleteColor,
} from '../controllers/colors_controller.js';

const router = express.Router();

router.get('/', getColors);
router.get('/:id', getColorById);
router.post('/', createColor);
router.put('/:id', updateColor);
router.delete('/:id', deleteColor);

export default router;
