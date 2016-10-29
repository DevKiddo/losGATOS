'use strict'

// generate random number specifying range
let getRandomNum = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// turn all string elements in an array to lowercase
let toLowerCaseArray = function(arr) {
    return arr.join('~').toLowerCase().split('~');
}

module.exports = {
    getRandomNum: getRandomNum,
    toLowerCaseArray: toLowerCaseArray  
} 