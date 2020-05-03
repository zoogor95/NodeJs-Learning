const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

mongoose.connect(
    "mongodb+srv://cluster0-nzmnv.mongodb.net/test",
    {
      auth: {
        user: 'admin',
        password: 'admin123'
      },
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then((r) => console.log('Connected'));

mongoose.Promise = global.Promise;

// Using morgan middleware to log requests
app.use(morgan('dev'));

//  parse url encoded simple data
//  extended true would mean it will support rich data as well
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//  allowing CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if( req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT,, POST, GET, PATCH, DELETE');
    return res.status(200).json({});
  }
  
  next();

});

//  Routes to handle request
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

//  error handling where request url route does not
//  matches any route.
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status(404);
  next(error);
});

//  error handling where the above error request handle does not
//   work instead error is sent by some proper request
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

module.exports = app;