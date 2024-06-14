const axios = require("axios");
const {
  accessToken,
  client
} = require('../app');



// Función para integrar las dos API
function transformData(receivedData) {
  const transformedData = {
    invoices: receivedData.facturas.map(factura => ({
      invoice_id: factura.id,
      customer: factura.cliente,
      amount_due: factura.monto,
      date_issued: factura.fecha_emision,
      status: factura.estado === 'pagada' ? 'paid' : 'unpaid'
    }))
  };
  return transformedData;
}
exports.transformData = transformData;


// Función para obtener el token de acceso

async function getAccessToken() {
  try {

    // Verificar si ya tenemos un token y si está válido
    if (accessToken && !accessToken.expired()) {
      return;
    }
    // se pide el token
    const tokenParams = {
      scope: process.env.scope
    };
    accessToken = await client.getToken(tokenParams);
    return;
  } catch (error) {
    console.error('Error obteniendo el token de acceso:', error.message);
    throw error;
  }
}
exports.getAccessToken = getAccessToken;
// Función para realizar la petición a la API de facturas



async function getFacturas(start_date, end_date) {
  try {
    await getAccessToken();

    const response = await axios.get(process.env.APIA, {
      params: {
        fecha_inicio: start_date,
        fecha_fin: end_date,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error en la petición a la API de facturas:', error.message);
    throw error;
  }
}
exports.getFacturas = getFacturas;