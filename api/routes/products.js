const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Product = require('./../models/product');

router.get('/',(req, res, next) => {
  Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map( doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'localhost:3000/products/' + doc._id
            }
          }
        })
      };

      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
});

router.post('/',(req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  
  product
  .save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Successful POST request to /products',
      createdProduct: product,
      request: {
        type: 'GET',
        url: 'localhost:3000/products/' + result._id
      }
    });
  })
  .catch((err) => console.log(err));
  
});

router.get('/:productId',(req, res, next) => {

  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((result) => {
      if(result){
        res.status(200).json({
          message: 'Successful GET request to /products',
          createdProduct: result
        });
      } else {
        res.status(404).json({message: 'invalid Id for the product'});
      }

      console.log(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
      console.log(err)
    });
});

router.patch('/:productId',(req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({
    _id: id
  },
  {
    $set: updateOps
  })
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: err
    });
  });

});

router.delete('/:productId',(req, res, next) => {
  const id = req.params.productId;
  Product.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({result});
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  res.status(200).json({
    message: 'Successful DELETE request to /products/id'
  });
});

module.exports = router;