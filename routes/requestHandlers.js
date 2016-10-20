let db = require('../db/fakeDatabase');

let newCatHandler = function (req, res) {
    res.render('home');
}

let listCatHandler = function (req, res) {
    res.render('home');
}

let deleteCatHandler = function (req, res) {
    res.render('home');
}

let requestHandlers = {
    newCat: newCatHandler,
    listCat: listCatHandler,
    deleteCat: deleteCatHandler
}

module.exports = requestHandlers;