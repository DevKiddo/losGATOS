'use strict'

let db = require('../db/fakeDatabase');
let catData = require('../db/catData');
let helper = require('../routes/helper');

// Data

let catNames = catData.names;
let catColors = catData.colors;

// Object Constructor

function Cat(name, age, colors) {
    this.name = name;
    this.age = age;
    this.colors = colors; //colors is an array of colors
}


let newCatHandler = function(req, res) {
    let name = catNames[helper.getRandomNum(0, catNames.length-1)]
    let age = helper.getRandomNum(0, 18);
    let colorArr = [];
    while (colorArr.length < 4) {
        let color = catColors[helper.getRandomNum(0, catColors.length-1)];
        if (colorArr.indexOf(color) == -1) colorArr.push(color);
    }

    db.add(new Cat(name, age, colorArr ));
    res.send(db.getAll())
    //res.render('home');
}

let listCatHandler = function(req, res) {
    let sortedCats = helper.sortAscendingByAge(db.getAll());
    res.send(sortedCats)
    //res.render('home');
}

let bycolorCatHandler = function(req, res) {
    let catsByColor = helper.sortAscendingByAge(db.getAll()).filter(function(cat){
        return helper.toLowerCaseArray(cat.colors).indexOf(req.params.color) != -1;
    })
    res.send(catsByColor);
    //res.render('home');
}

let deleteCatHandler = function(req, res) {
    let oldestCat = helper.sortAscendingByAge(db.getAll()).pop();
    let oldestCatindex = db.getAll().indexOf(oldestCat)
    db.remove(oldestCatindex)
    res.send(oldestCat)
    //res.render('home');
}

let requestHandlers = {
    newCat: newCatHandler,
    listCat: listCatHandler,
    deleteCat: deleteCatHandler,
    bycolorCat: bycolorCatHandler
}

module.exports = requestHandlers;