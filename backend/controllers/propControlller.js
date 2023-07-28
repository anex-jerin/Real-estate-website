import { Property } from '../models/property.js';


export const prop_register = async (req, res) => {
  try {
    const prop_data = req.body;
    res.status(200).json('ok')

  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const prop_edit = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const prop_search = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const prop_delete = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
