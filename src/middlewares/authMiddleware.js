
// Middleware para validar el API key
const authMiddleware =(req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({
            error: 'API key no válida o no informada'
        });
    }
    next();
};


module.exports = authMiddleware;