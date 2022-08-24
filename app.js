var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models')
const cors = require('cors')

var usersRouter = require('./routes/users');
var filesRouter = require('./routes/files')
var categoriesRouter = require('./routes/categories')
var tagsRouter = require('./routes/tags')
var likesRouter = require('./routes/likes')
var saveRouter = require('./routes/save')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('/files', filesRouter);
app.use('/categories', categoriesRouter);
app.use('/tags', tagsRouter);
app.use('/likes', likesRouter);
app.use('/save', saveRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

models.sequelize.sync().then(() => {console.log('DB✅✅')})

module.exports = app;
