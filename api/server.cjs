// Importaciones necesarias
const express = require("express");
const passport = require("passport");
const http = require("http");

const sessionConfig = require("./infrastructure/middlewares/server/sessionConfig.cjs");
const { swaggerUi, swaggerDocs } = require("./infrastructure/middlewares/server/swagger.cjs");
const usuariosRoutes = require("./routes/usuariosRoutes.cjs");

const { authenticateToken } = require("./infrastructure/middlewares/authMiddleware.cjs");
const { jsonParseErrorHandler } = require("./infrastructure/middlewares/errorHandling.cjs");
const ConnectToDatabase = require('./infrastructure/database/mongodb.cjs');
process.loadEnvFile();

// Función para crear y configurar el servidor Express
const createServer = () => {
  const app = express();
  
  // Middlewares
  app.use(express.json());
  app.use(sessionConfig);
  app.use(jsonParseErrorHandler);
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.use("/usuarios", usuariosRoutes);

  const server = http.createServer(app);

  return server;
};

// Función principal que inicia la aplicación
const startApp = async () => {
  const port= process.env.VITE_PORT_BACKEND;
  const host= process.env.VITE_HOST;
  let connectToDatabase = new ConnectToDatabase();
  await connectToDatabase.connectOpen();
  const app = createServer();
  
  app.listen({ port, host }, () => {
    console.log(`Server corriendo en http://${host}:${port}`);
    console.log(`Documentación Swagger en http://${host}:${port}/api`);
  });
};

// Llama a la función para iniciar la aplicación
startApp();