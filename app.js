var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

const authRoutes = require('././app/routes/authRoutes');
const indexRouter = require('./app/routes/index');
const uphRoutes = require('././app/routes/uphRoutes');
const mcInfoRoutes = require('./app/routes/mcInfoRoutes');
const monitorRoute = require('././app/routes/monitorRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/', indexRouter);
app.use('/api/uph/download/mc',uphRoutes.routerMcUPHDownload)
app.use('/api/uph/download/bom',uphRoutes.routerUPHByBomDownload)
app.use('/api/uph/download/pkg',uphRoutes.routerUPHByPkgDownload)

app.use('/api/uph/mc',uphRoutes.routerMcUPH);
app.use('/api/uph/bom',uphRoutes.routerUPHByBom);
app.use('/api/uph/pkg',uphRoutes.routerUPHByPkg);

app.use('/api/mcinfo',mcInfoRoutes);

app.use('/api/monitor',monitorRoute);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
