// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definir las opciones para la documentación Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI
    info: {
      title: 'API de TODOS', // Título de la documentación
      version: '1.0.0', // Versión de la API
      description: 'API de Registro de Actividades Diarias',
      contact:{
        name:"Camilo"
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: "Servidor local"
      },
    ]
  },
  apis: ['./api/routes/*.cjs'], // Archivos donde están definidas las rutas
};

// Generar la documentación Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
