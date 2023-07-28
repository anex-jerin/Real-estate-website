import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

export const user_register = async (req, res) => {
  try {
    const data = req.body;

    // checking for existing user
    const isExistingEmail = await User.findOne({ email: data.email });
    const isExistingUsername = await User.findOne({ username: data.username });
    if (isExistingEmail || isExistingUsername)
      return res
        .status(409)
        .json('User already exist with same Email id or Username');

    // password hashing
    const hashed_password = await bcrypt.hash(data.password, 10);

    // storing data in database
    const newUser = await User.create({
      ...req.body,
      password: hashed_password,
    });

    // Removing password
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

export const user_login = async (req, res) => {
  try {
    console.log('login');
    const data = req.body;
    // console.log(data);

    // checking for existing user
    const isExistingEmail = await User.findOne({ email: data.username });
    const isExistingUsername = await User.findOne({
      username: data.username,
    });

    if (!isExistingEmail && !isExistingUsername)
      return res.status(409).json('username not found');

    // checking password
    const match = await bcrypt.compare(
      data.password,
      isExistingUsername
        ? isExistingUsername.password
        : isExistingEmail.password
    );

    // if password not match
    if (!match) return res.status(401).json('password error');

    const user_data = isExistingEmail || isExistingUsername;

    // Removing password
    const { password, ...new_data } = user_data._doc;

    // creating web token
    const token = jwt.sign({ id: new_data._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(201).json({ user_data: new_data, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
