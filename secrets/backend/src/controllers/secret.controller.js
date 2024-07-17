import User from "../models/user.model";
import Secret from "../models/secret.model";

export default class SecretController {
  static async all(req, res) {
    try {
      const secrets = await Secret.find({ author: req.userId }).exec();
      res.status(200).json(secrets);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }

  static async create(req, res) {
    try {
      const author = await User.findById(req.userId).exec();
      const data = {...req.body, author };
      const secret = await Secret.create(data);
      res.status(201).json(secret);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }

  static async read(req, res) {
    try {
      const { id } = req.params;
      const secret = await Secret.findOne({ _id: id, author: req.userId})
      .populate('author').exec();

      if (!secret) {
        return res.status(404).json({message: 'You have no such secret 😏'});
      }

      res.status(200).json(secret);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }

  static async update(req, res) {
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
  }

  static async delete(req, res) {
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
  }
}