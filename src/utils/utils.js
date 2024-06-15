const axios = require("axios");
const { getAccessToken } = require('./tokenManager');

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