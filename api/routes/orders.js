const express = require('express');
const router = express.Router();


router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'Successful GET request to /orders'
  });
});

router.post('/',(req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };

  res.status(201).json({
    message: 'Successful POST request to /orders',
    createdOrder: order
  });
});

router.get('/:orderId',(req, res, next) => {
  res.status(200).json({
    message: 'Successful GET request to details of /orders',
    someDetails: 'jjsjsjss'
  });
});

module.exports = router;