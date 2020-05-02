const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'Successful GET request to /products'
  });
});

router.post('/',(req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
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