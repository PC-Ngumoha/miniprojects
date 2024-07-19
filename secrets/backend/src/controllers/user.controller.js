import User from '../models/user.model';

export default class UserController {
  static async register(req, res) {
    try {
      await User.create(req.body);
      res.status(201).json({ message: 'Registered user successfully' });
    } catch (err) {
      if (err.message === 'User not found') {
        res.status(404).json({ message: err.message });
      } else if (err.message === 'Incorrect password') {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();
      res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async refresh(req, res) {
    try {
      const { token } = req.body;
      const user = await User.hydrateFromRefreshToken(token);
      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();
      res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      if (err.message === 'User not found') {
        res.status(404).json({ message: err.message });
      } else if (err.message === 'Invalid token') {
        res.status(400).json({ message: err.message });
      } else if (err.message === 'Unauthorized!!!') {
        res.status(401).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }

  static async retrieveUser(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const found = await User.findOneAndUpdate({ _id: req.userId }, req.body);
      if (!found) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User updated successfully!!!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const found = await User.findOneAndDelete({ _id: req.userId });
      if (!found) return res.status(404).json({ message: 'User not found' });
      res.status(204).json();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
