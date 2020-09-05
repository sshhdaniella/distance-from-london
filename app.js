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

//404
app.use((err, req, res, next) => {
    next(createError(404));
});

//error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`🚀 App launched at http://localhost:${port}`);
})