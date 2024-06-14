const moment = require('moment');
const {
  getFacturas
} = require('../utils/utils');
const {
  transformData
} = require('../utils/utils');


exports.bills = async (req, res) => {

  const {
    start_date,
    end_date
  } = req.query;
  if (!start_date || !end_date) {
    return res.status(400).json({
      error: 'start_date o end_date no han sido proporcionadas'
    });
  }

  // Si el formato no es válido, retornar error
  if (!moment(start_date, 'YYYY-MM-DD', true).isValid() || !moment(end_date, 'YYYY-MM-DD', true).isValid()) {
    return res.status(400).json({
      error: 'fechas en formato incorrecto, se pide YYYY-MM-DD'
    });
  }
  //hacemos la petición y la transformación
  const returnData = null;
  try {
    const facturas = await getFacturas(start_date, end_date);
    if (facturas) {
      res.status(200).json(transformData(facturas));
    } else {
      console.error("No se han recibido facturas", error.message);
      throw new Error("No se han recibido facturas");
    }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      error: 'Error obteniendo las facturas'
    });
  }
};