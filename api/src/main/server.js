const app = require('./app');

const PORT = process.env.API_PORT || 3001;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
