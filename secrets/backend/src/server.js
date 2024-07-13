import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Secret from "./models/secret.model";
import User from "./models/user.model";
import handleAuthSession from "./middleware/auth.middleware";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


// Secrets CRUD API

app.get('/api/secrets', async (req, res) => {
  try {
    const secrets = await Secret.find();
    res.status(200).json(secrets);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.post('/api/secrets', async (req, res) => {
  try {
    const secret = await Secret.create(req.body);
    res.status(201).json(secret);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.get('/api/secrets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const secret = await Secret.findById(id).exec();

    if (!secret) {
      return res.status(404).json({message: 'You have no such secret 😏'});
    }

    res.status(200).json(secret);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.put('/api/secrets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const acknowledgement = await Secret.findByIdAndUpdate(id, req.body).exec();

    if (!acknowledgement) {
      return res.status(404).json({message: 'You have no such secret 😏'});
    }

    const secret = await Secret.findById(id).exec();
    res.status(200).json(secret);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.delete('/api/secrets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const acknowledgement = await Secret.findByIdAndDelete(id);

    if (!acknowledgement) {
      return res.status(404).json({message: 'You have no such secret 😏'});
    }

    res.status(204).json();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});


// USER API section

app.post('/register', async (req, res) => {
  try {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ ...req.body, password: hash });
    res.status(201).json({ message: 'Registered user successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message} );
  }
});

app.post('/login', async (req, res) => {
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

app.get('/me', handleAuthSession, async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({message: 'User not found'});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.put('/me', handleAuthSession, async (req, res) => {
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

app.delete('/me', handleAuthSession, async (req, res) => {
  try {
    const { userId } = req;

    const done = await User.findByIdAndDelete(userId);
    if (!done) return res.status(404).json({message: 'User not found'});
    res.status(200).json({message: 'User deleted successfully!!!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

mongoose.connect('mongodb://127.0.0.1:27017/secretsDB')
.then(() => {
  console.log('Success: Connected to DB !!!');
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
})
.catch(() => {
  console.log('Failed: Not connected to DB !!!');
});