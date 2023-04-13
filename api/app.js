require('./database/index.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const customerRouter = require('./routes/customerRoutes.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(customerRouter);

app.listen(port, () => console.log(`Listening at ${port}`));