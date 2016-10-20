'use strict'

let getRandomNum = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let sortAscendingByAge = function(arr){
    return arr.sort(function(a, b){
        return a.age - b.age;
    })
}

let toLowerCaseArray = function(arr) {
    return arr.join('~').toLowerCase().split('~');
}

module.exports = {
    getRandomNum: getRandomNum,
    sortAscendingByAge: sortAscendingByAge,
    toLowerCaseArray: toLowerCaseArray  
} 