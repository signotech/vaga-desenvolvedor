const express = require('express');

const route = require('./routes');

const app = express();

app.use(express.json());
app.use(route);

const port = 3003;
app.listen(port, () => console.log(`🚀 Server is running at http://localhost:${port}`));
