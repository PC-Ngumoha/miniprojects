import express from "express";
import mongoose from "mongoose";
import Secret from "./models/secret.model";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

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