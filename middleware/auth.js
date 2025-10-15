const API_KEY = process.env.API_KEY || 'my-secret-api-key';

module.exports = (req, res, next) => {
  const key = req.headers['x-api-key'] || req.headers['authorization'];
  if (!key) return res.status(401).json({ error: 'Missing API key' });

  const token = key.startsWith('Bearer ') ? key.split(' ')[1] : key;
  if (token !== API_KEY) return res.status(403).json({ error: 'Invalid API key' });

  next();
};
