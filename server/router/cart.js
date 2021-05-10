const express = require('express');
let router = express.Router();
const db = require('./../../db/controllers.js');


router
  .route('/')
  .post((req, res) => {
    if(req.body.sku_id!== undefined) {
      res.status(201).send('CREATED');
    } else {
      res.status(422).send('Unprocessable Entity');
    }
  });

  module.exports = router;
