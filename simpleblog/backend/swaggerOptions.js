const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Blog API',
      version: '1.0.0',
      description: 'A simple blogging application',
    },
    servers: [
      {
        url: 'http://localhost:3000'
      },
      {
        url: 'http://127.0.0.1:3000'
      }
    ]
  },
  apis: ['./routes/post.js'],
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
