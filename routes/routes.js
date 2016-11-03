'use strict'

let express = require('express');
let router = express.Router();
let rh = require('../routes/requestHandlers');

// Routing

router.get('/',rh.home)
router.get('/cats/new', rh.newCat)
router.get('/cats', rh.listCat)
router.get('/cats/bycolor/:color',rh.bycolorCat)
router.delete('/cats/delete/old', rh.deleteCat)
router.get('/cats/price/:pricerange', rh.priceRangeCat)

module.exports = router;
