import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model";
import handleAuthSession from "../middleware/auth.middleware";

const router = new Router();

router.post('/register', async (req, res) => {
  try {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ ...req.body, password: hash });
    res.status(201).json({ message: 'Registered user successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message} );
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({message: 'Password incorrect'});
    }
    const token = jwt.sign({ id: user._id, email: user.email},
      'thisisnotthesecretkeyshouldbereplacedinproduction', {
      expiresIn: '1h'
    });
    res.status(200).json({token});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', handleAuthSession, async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({message: 'User not found'});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.put('/me', handleAuthSession, async (req, res) => {
  try {
    const { userId } = req;
    let { password } = req.body;
    if (password) {
      password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    const done = await User.findByIdAndUpdate(userId,
      { ...req.body, password });
    if (!done) return res.status(404).json({message: 'User not found'});
    res.status(200).json({message: 'User updated successfully!!!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.delete('/me', handleAuthSession, async (req, res) => {
  try {
    const { userId } = req;

    const done = await User.findByIdAndDelete(userId);
    if (!done) return res.status(404).json({message: 'User not found'});
    res.status(200).json({message: 'User deleted successfully!!!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

export default router;