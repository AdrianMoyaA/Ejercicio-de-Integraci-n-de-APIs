const { ClientCredentials } = require('simple-oauth2');
const dotenv = require('dotenv');
dotenv.config();

let accessToken = null;

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

async function getAccessToken() {
  try {
    if (accessToken && !accessToken.expired()) {
      return accessToken;
    }
    const tokenParams = { scope: process.env.SCOPE };
    accessToken = await client.getToken(tokenParams);
    return accessToken;
  } catch (error) {
    console.error('Error obteniendo el token de acceso:', error.message);
    throw error;
  }
}

module.exports = {
  getAccessToken,
};