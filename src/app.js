const express = require('express');
const app = express();
const helmet = require('helmet');
const dotenv = require('dotenv');
const authMiddleware = require('./middlewares/authMiddleware');
const indexRouter = require('./routes/index');
const {
  ClientCredentials
} = require('simple-oauth2');

dotenv.config();
app.use(helmet());
app.use(express.json());
app.use(authMiddleware);
app.use('/', indexRouter);

// Configuración de las credenciales OAuth2 desde .env
const config = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST,
    tokenPath: process.env.TOKEN_PATH,
  },
};
const client = new ClientCredentials(config);


// Variable para almacenar el token
let accessToken = null;


app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));

module.exports = {
  accessToken,
  client
};