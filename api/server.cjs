// Importaciones necesarias
const express = require("express");
const passport = require("passport");
const http = require("http");
const productsRoutes = require('./routes/productsRoutes.cjs');
const corsConfig = require("./infrastructure/middlewares/server/corsConfig.cjs");
const sessionConfig = require("./infrastructure/middlewares/server/sessionConfig.cjs");
const usuariosRoutes = require("./routes/usuariosRoutes.cjs");
const requestsRoutes = require('./routes/requestsRoutes.cjs');
const paymentsRoutes = require('./routes/paymentsRoutes.cjs');
const { authenticateToken } = require("./infrastructure/middlewares/authMiddleware.cjs");
const { jsonParseErrorHandler } = require("./infrastructure/middlewares/errorHandling.cjs");
const ConnectToDatabase = require('./infrastructure/database/mongodb.cjs');
process.loadEnvFile();

// Función para crear y configurar el servidor Express
const createServer = () => {
  const app = express();

  // Middlewares
  app.use(corsConfig);
  app.use(express.json());
  app.use(sessionConfig);
  app.use(jsonParseErrorHandler);
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/usuarios", usuariosRoutes);
  app.use('/products', authenticateToken, productsRoutes);
  app.use('/requests', authenticateToken, requestsRoutes);
  app.use('/payments', authenticateToken, paymentsRoutes);

  const server = http.createServer(app);

  return server;
};

// Función principal que inicia la aplicación
const startApp = async () => {
  let connectToDatabase = new ConnectToDatabase();
  await connectToDatabase.connectOpen();
  const app = createServer();
  
  app.listen({ port: process.env.VITE_PORT_BACKEND, host: process.env.VITE_HOST }, () => {
    console.log(`Server running at http://${process.env.VITE_HOST}:${process.env.VITE_PORT_BACKEND}`);
  });
};

// Llama a la función para iniciar la aplicación
startApp();