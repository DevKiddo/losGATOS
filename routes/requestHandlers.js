'use strict'

let catData = require('../data/catData');
let helper = require('../routes/helpers');
let models = require('../models/models.js');

// Data

let catNames = catData.names;
let catColors = catData.colors;

// models

let Cat = models.Cat;

let home = function (req, res) {
    res.render('home');
}

// Creates new Cat in the db

let newCatHandler = function (req, res) {
    let name = catNames[helper.getRandomNum(0, catNames.length - 1)];
    let age = helper.getRandomNum(0, 25); // cats can live till their early 20s
    let colorArr = [];
    let price = helper.getRandomNum(50, 1200);

    /* generates 3 random colors and inserts them into colorArr 
    making sure the generated color is not already in the array */
    while (colorArr.length < 3) {
        let color = catColors[helper.getRandomNum(0, catColors.length - 1)];
        if (colorArr.indexOf(color.toLocaleLowerCase()) == -1) colorArr.push(color.toLowerCase());
    }

    let newCat = new Cat({
        name: name,
        age: age,
        colors: colorArr,
        price: price
    });

    newCat.save(function (err, cat) {
        if (err) return console.error(err);
        res.render('newCat', { cat: newCat })
    });
}

// Lists all cats in the db sorted ascending by age

let listCatHandler = function (req, res) {
    Cat
        .find({})
        .sort({ age: 1 })
        .exec(function (err, result) {
            if (result.length !== 0) {
                res.render('sortCat', { cats: result });
            } else {
                res.send('<h3>No cats left!</h3>')
            }
        });
}

// Lists all cats in the db sorted ascending by age that match a specific color passed by the user

let bycolorCatHandler = function (req, res) {
    Cat
        .find({ colors: { $in: [(req.params.color).toLowerCase()] } })
        .sort({ age: 1 })
        .exec(function (err, result) {
            if (result.length !== 0) {
                res.render('sortCat', { cats: result });
            } else {
                res.send('<h3>No cats left!</h3>')
            }
        })
}

// Deletes oldest aged cat in the db

let deleteCatHandler = function (req, res) {
    Cat
        .find({})
        .sort({ age: 1 })
        .exec(function (err, result) {
            if (result.length !== 0) {
                Cat
                    .remove({ _id: result[result.length - 1]._id })
                    .exec(function (err) {
                        res.render('killCat', {
                            cat: result[result.length - 1],
                            cats: result.slice(0, result.length - 1)
                        });
                    })
            } else {
                res.send('<h3>No cats left!</h3>')
            }
        })
}

// Lists cats by price range passed by user

let priceRangeCatHandler = function (req, res) {
    let rangeArr = req.params.pricerange.split(',');
    Cat
        .find({ price: { $gte: rangeArr[0], $lte: rangeArr[1] } })
        .sort({ age: 1 })
        .exec(function (err, result) {
             if (result.length !== 0) {
                res.render('sortCat', { cats: result });
            } else {
                res.send('<h3>No cats left!</h3>')
            }
        })
}

let requestHandlers = {
    home: home,
    newCat: newCatHandler,
    listCat: listCatHandler,
    bycolorCat: bycolorCatHandler,
    deleteCat: deleteCatHandler,
    priceRangeCat: priceRangeCatHandler
}

module.exports = requestHandlers;