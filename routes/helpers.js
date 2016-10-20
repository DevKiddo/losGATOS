'use strict'

// generate random number specifying range
let getRandomNum = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// sort array containing objects with age property
let sortAscendingByAge = function(arr){
    return arr.sort(function(a, b){
        return a.age - b.age;
    })
}

// turn all string elements in an array to lowercase
let toLowerCaseArray = function(arr) {
    return arr.join('~').toLowerCase().split('~');
}

module.exports = {
    getRandomNum: getRandomNum,
    sortAscendingByAge: sortAscendingByAge,
    toLowerCaseArray: toLowerCaseArray  
} 