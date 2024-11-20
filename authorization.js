
// Simulamos una base de datos en memoria para las claves de API.
const apiKeys = {
    keys: [process.env.REACT_APP_MASTER_API_KEY], // Claves predefinidas.
};

function verifyApiKey(req, res, next) {
    const apiKeyFromHeader = req.headers['api-key'];
    const apiKeyFromAuthHeader = req.headers['authorization'] 
        ? req.headers['authorization'].split(' ')[1] 
        : null; // Extrae la clave del formato "Api-Key <clave>"

    const apiKey = apiKeyFromHeader || apiKeyFromAuthHeader; // Prioriza 'api-key'

    if (!apiKey) {
        return res.status(401).json({ error: 'API Key is missing' });
    }

    if (!apiKeys.keys.includes(apiKey)) {
        return res.status(403).json({ error: 'Invalid API Key' });
    }

    next();
}



module.exports = {
    verifyApiKey,
};
