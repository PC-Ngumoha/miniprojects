require('../config/mongoose');
const express = require('express');
const PostRouter = require('../routes/post');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/posts', PostRouter);

const server = app.listen(PORT, () => {
  console.log(`Server up @ port ${PORT}`);
});

module.exports = {
  app,
  server,
};
