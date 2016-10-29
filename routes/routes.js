'use strict'

let express = require('express');
let router = express.Router();
let rh = require('../routes/requestHandlers');

// Routing

router.get('/cats/new', rh.newCat)
router.get('/cats', rh.listCat)
router.get('/cats/bycolor/:color',rh.bycolorCat)
router.get('/cats/delete/old', rh.deleteCat)

module.exports = router;
