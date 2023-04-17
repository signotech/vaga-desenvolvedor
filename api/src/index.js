const express = require('express');

const cors = require('cors');
const route = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

const port = 3001;
app.listen(port, () => console.log(`🚀 Server is running at http://localhost:${port}`));
