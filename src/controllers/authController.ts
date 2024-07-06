// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { statusCodes } from '../utils/statusCodes';


export const register = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      is_active: true,
      last_login: new Date(),
    });
    await newUser.save();

    res.status(statusCodes.CREATED).json(newUser);
  } catch (error: any) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });


    res.status(statusCodes.OK).json({ token });
  } catch (error : any) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

