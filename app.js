const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const { Stack } = require('./contentstack.config');
const app = express();

// Logger to log the api request from this node application
// const requestLogger = (httpModule) =>{
//   const original = httpModule.request
//   httpModule.request = function(options, callback){
//     console.log(options.href||options.proto+"://"+options.host+options.path, options.method, JSON.stringify(options,null,2))
//     return original(options, callback)
//   }
// }
// requestLogger(require('http'))
// requestLogger(require('https'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Live preview middleware
app.use((req,res,next) => {
  // added live preview query function to catch live preview related query parameters in URL
  Stack.livePreviewQuery(req.query);
  next();
})



app.use('/', indexRouter);

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
