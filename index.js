require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { log } = require('./logger');
const auth = require('./session/auth');

//routes
const paintingRouter = require('./painting');
const userRouter = require('./user');

//creates an express application
const app = express();

//sets the path for static files
app.use(express.static('public'));

//create regex for later use
var isMultipart = /^multipart\//i;

//configure bodyparser middleware
var urlencodedMiddleware = bodyParser.urlencoded({ extended: false });

//set middleware by checking if req contains multipart/form-data
app.use(function (req, res, next) {
  var type = req.get('Content-Type');
  if (isMultipart.test(type)) return next();
  return urlencodedMiddleware(req, res, next);
});

auth(app);

app.get('/', (request, response) => response.redirect('/painting'));

//set morgan middleware (logging)
app.use(morgan('common', { immediate: true }));

//routes
app.use('/painting', paintingRouter);
app.use('/user', userRouter);

//start listening for connections
app.listen(8080, () => {
  log("Server", "Listening to http://localhost:8080", "info");
});