import { Router } from 'express';
import User from "../models/user.model";
import Secret from "../models/secret.model";
import handleAuthSession from "../middleware/auth.middleware";

const router = new Router();

router.get('/api/secrets', handleAuthSession, async (req, res) => {
  try {
    const secrets = await Secret.find({ author: req.userId }).exec();
    res.status(200).json(secrets);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.post('/api/secrets', handleAuthSession, async (req, res) => {
  try {
    const author = await User.findById(req.userId).exec();
    const data = {...req.body, author };
    const secret = await Secret.create(data);
    res.status(201).json(secret);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/api/secrets/:id', handleAuthSession, async (req, res) => {
  try {
    const { id } = req.params;
    const secret = await Secret.findOne({ _id: id, author: req.userId})
    .exec();

    if (!secret) {
      return res.status(404).json({message: 'You have no such secret 😏'});
    }

    res.status(200).json(secret);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.put('/api/secrets/:id', handleAuthSession, async (req, res) => {
  try {
    const { id } = req.params;
    const secret = await Secret.findOneAndUpdate(
      { _id: id, author: req.userId }, req.body, { new: true })
      .exec();

    if (!secret) {
      return res.status(404).json({message: 'You have no such secret 😏'});
    }

    await secret.save();
    res.status(200).json(secret);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.delete('/api/secrets/:id', handleAuthSession, async (req, res) => {
  try {
    const { id } = req.params;
    const secret = await Secret.findOneAndDelete(
      { _id: id, author: req.userId }).exec();

    if (!secret) {
      return res.status(404).json({message: 'You have no such secret 😏'});
    }

    res.status(204).json();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

export default router;