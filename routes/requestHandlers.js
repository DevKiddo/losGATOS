'use strict'

let db = require('../db/fakeDatabase');
let catData = require('../db/catData');
let helper = require('../routes/helpers');

// Data

let catNames = catData.names;
let catColors = catData.colors;

// Object Constructor

function Cat(name, age, colors) {
    this.name = name;
    this.age = age;
    this.colors = colors; //colors is an array of colors
}

// Creates new Cat object in the db

let newCatHandler = function(req, res) {
    let name = catNames[helper.getRandomNum(0, catNames.length - 1)]
    let age = helper.getRandomNum(0, 25); // cats can live till their early 20s
    let colorArr = [];
    
    /* generates 3 random colors and inserts them into colorArr 
    making sure the generated color is not already in the array */
    while (colorArr.length < 3) {
        let color = catColors[helper.getRandomNum(0, catColors.length - 1)];
        if (colorArr.indexOf(color) == -1) colorArr.push(color);
    }

    let newCat = new Cat(name, age, colorArr)
    db.add(newCat);
    res.render('newCat', { cat: newCat });
}

// Lists all cats in the db sorted ascending by age

let listCatHandler = function(req, res) {
    let sortedCats = helper.sortAscendingByAge(db.getAll());
    res.render('sortCat', { cats: sortedCats });
}

// Lists all cats in the db sorted ascending by age that match a specific color passed by the user

let bycolorCatHandler = function(req, res) {
    let catsByColor = helper.sortAscendingByAge(db.getAll()).filter(function(cat) {
        return helper.toLowerCaseArray(cat.colors).indexOf(req.params.color) != -1;
    })
    res.render('sortCat', { cats: catsByColor });
}

// Deletes oldest aged cat in the db

let deleteCatHandler = function(req, res) {
    let oldestCat = helper.sortAscendingByAge(db.getAll()).pop();
    let oldestCatindex = db.getAll().indexOf(oldestCat)
    db.remove(oldestCatindex)
    res.render('killCat', { cat: oldestCat });
}

let requestHandlers = {
    newCat: newCatHandler,
    listCat: listCatHandler,
    deleteCat: deleteCatHandler,
    bycolorCat: bycolorCatHandler
}

module.exports = requestHandlers;