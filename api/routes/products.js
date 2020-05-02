const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Product = require('./../models/product');

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'Successful GET request to /products'
  });
});

router.post('/',(req, res, next) => {
  const product = {
    //_id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  };
  
  // product
  // .save()
  // .then(result => {
  //   console.log(result);
  // })
  // .catch((err) => console.log(err));
  
  res.status(201).json({
    message: 'Successful POST request to /products',
    createdProduct: product
  });
});

router.get('/:productId',(req, res, next) => {
  if(req.params.productId === 'special'){
    res.status(200).json({
      message: 'Successful GET request to /products/specialId',
      id: req.params.productId
    });
  } else {
    res.status(200).json({
      message: 'Successful GET request to /products/productId',
      id: req.params.productId
    });
  }
});

router.patch('/:productId',(req, res, next) => {
  res.status(200).json({
    message: 'Successful PATCH request to /products/id'
  });
});

router.delete('/:productId',(req, res, next) => {
  res.status(200).json({
    message: 'Successful DELETE request to /products/id'
  });
});

module.exports = router;