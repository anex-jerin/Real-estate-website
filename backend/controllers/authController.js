import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

export const user_register = async (req, res) => {
  try {
    const data = req.body;

    // checking for existing user
    const isExisting = await User.findOne({ email: data.email });
    if (isExisting)
      return res.status(409).json('User already exist with same Email');

    // password hashing
    const hashed_password = await bcrypt.hash(data.password, 10);

    // storing data in database
    const newUser = await User.create({
      ...req.body,
      password: hashed_password,
    });

    const { password, ...new_data } = newUser._doc;

    // creating web token
    const token = jwt.sign({ id: new_data._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ user_data: new_data, token });
    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
