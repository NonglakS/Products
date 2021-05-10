const express = require('express');
let router = express.Router();
const db = require('./../../db/controllers.js');

router
  .route('/')
  .get((req, res) => {
    var count = req.query.count || 5; //default
    res.send(`server is sending back ${count} products`);

    //might not need to do this, leave it for later
  });


router
  .route('/:id')
  .get((req, res) => {
    db.getProductById(req.params.id)
      .then((data) => {
        console.log(data)
        res.send(data)
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  });

router
  .route('/:id/styles')
  .get((req, res) => {
    db.getStyles(req.params.id)
    .then (data => {
      res.send(data)
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  }),

router
  .route('/:id/related')
  .get((req, res) => {
    db.getRelated(req.params.id)
    .then (data => {
      res.send(data)
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  });




module.exports = router;