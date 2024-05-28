const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/posts/', (req, res) => {
  res.send({message: 'GET request received'});
});

app.post('/api/posts/', (req, res) => {
  res.send({message: 'POST request received'});
});

app.get('/api/posts/post/:postId', (req, res) => {
  res.send({message: `GET request received for ${req.params.postId}`});
});

app.put('/api/posts/post/:postId', (req, res) => {
  res.send({message: `PUT request received for ${req.params.postId}`});
});

app.delete('/api/posts/post/:postId', (req, res) => {
  res.send({message: `DELETE request received for ${req.params.postId}`});
});

app.listen(PORT, () => {
  console.log(`Server up @ port ${PORT}`);
});
