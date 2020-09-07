const createError = require('http-errors');
const express = require('express');
const routes = require('./routes/index');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({status: err.status, message: err.message})
});

app.use('/', routes);

module.exports = app;
