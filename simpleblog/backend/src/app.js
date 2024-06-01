require('dotenv').config();
require('../config/mongoose');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerOptions');
const PostRouter = require('../routes/post');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/posts', PostRouter);

const server = app.listen(PORT, () => {
  console.log(`Server up @ port ${PORT}`);
});

module.exports = {
  app,
  server,
};
