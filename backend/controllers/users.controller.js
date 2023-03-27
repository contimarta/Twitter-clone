import usersService from '../services/usersService.js';
import { validationResult } from 'express-validator';


export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const newUser = await usersService.createUser(req.body);
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {

    res.status(500).json({ message: 'Server error', error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await usersService.authenticateUser(email, password);
    res.status(200).json({ message: 'User logged in', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
