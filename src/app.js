'use strict';

const path = require('path');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const env = require('./config/env');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const formatters = require('./helpers/formatters');
const { queryString } = require('./helpers/url');
const { pageRange, PER_PAGE_OPTIONS } = require('./helpers/pagination');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
    },
  }),
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.appName = env.appName;
  res.locals.currentPath = req.path;
  res.locals.query = req.query;
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };

  res.locals.formatMoney = formatters.formatMoney;
  res.locals.formatDate = formatters.formatDate;
  res.locals.formatDateTime = formatters.formatDateTime;
  res.locals.formatCpf = formatters.formatCpf;
  res.locals.statusLabel = formatters.statusLabel;
  res.locals.statusClass = formatters.statusClass;
  res.locals.discountLabel = formatters.discountLabel;

  res.locals.queryString = queryString;
  res.locals.pageRange = pageRange;
  res.locals.perPageOptions = PER_PAGE_OPTIONS;

  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: env.appName });
});

app.use('/', webRoutes);
app.use('/api/v1', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
