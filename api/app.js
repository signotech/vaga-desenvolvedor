require('./database/index.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const customerRouter = require('./routes/customerRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(customerRouter);
app.use(productRouter);
app.use(orderRouter);

app.listen(port, () => console.log(`Listening at ${port}`));