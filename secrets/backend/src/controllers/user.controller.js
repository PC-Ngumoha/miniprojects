import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

export default class UserController {
  static async register (req, res) {
    try {
      const { password } = req.body;
      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      await User.create({ ...req.body, password: hash });
      res.status(201).json({ message: 'Registered user successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message} );
    }
  }

  static async login (req, res) {
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
  }

  static async retrieveUser (req, res) {
    try {
      const { userId } = req;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({message: 'User not found'});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }

  static async updateUser (req, res) {
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
  }

  static async deleteUser (req, res) {
    try {
      const { userId } = req;

      const done = await User.findByIdAndDelete(userId);
      if (!done) return res.status(404).json({message: 'User not found'});
      res.status(204).json();
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }
}