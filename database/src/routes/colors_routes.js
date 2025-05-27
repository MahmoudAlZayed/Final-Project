import express from 'express';

import {
  createColor,
  getColors,
  getColorById,
  updateColor,
  deleteColor,
} from '../controllers/colors_controller.js';

const router = express.Router();

router.get('/', createColor);
router.get('/:id', getColors);

router.post('/', getColorById);
router.put('/:id', updateColor);
router.delete('/:id', deleteColor);

export default router;
