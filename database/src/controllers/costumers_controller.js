import { Customer } from '../models/index.js';

export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customers = await Customer.findByPk(req.params.id);
    if (!customers) return res.status(404).json({ error: 'Customer id not found' });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customers = await Customer.findByPk(req.params.id);
    if (!customers) return res.status(404).json({ error: 'Customer id not found' });

    await customers.update(req.body);
    res.json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customers = await Customer.findByPk(req.params.id);
    if (!customers) return res.status(404).json({ error: 'Category id not found' });

    await customers.destroy();
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
