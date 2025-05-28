import express from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from '../controllers/costumers_controller.js';

const router = express.Router();

router.get('/', createCustomer);
router.get('/:id', getAllCustomers);

router.post('/', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
