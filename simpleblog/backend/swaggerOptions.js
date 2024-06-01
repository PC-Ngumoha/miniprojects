const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Blog API',
      version: '1.0.0',
      description: 'A simple blogging application without authentication',
    },
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
