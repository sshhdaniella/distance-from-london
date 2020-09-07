const createError = require('http-errors');
const express = require('express');
const routes = require('./routes/index');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', routes);

app.listen(port, () => {
    console.log(`🚀 App launched at http://localhost:${port}`);
})