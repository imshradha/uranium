const express = require('express');

const router = express.Router();
const logger = require('./logger')

router.get('/test-me', function (req, res) {
    console.log("I am In");
    console.log('The endpoint value is',logger.url)
    console.log('calling log fuction')
    logger.logging()
    
    res.send('My first ever api!')
});

// Problem 1
router.get('/movies', function (req, res) {

    let movies = ['The Shining', 'Incidious', 'Lord of the Rings', 'Finding Nemo']
    
    res.send(movies)
});

// Problem 2  and  3

router.get('/movies/:indexNumber', function (req, res) {

    let movies = ['The Shining', 'Incidious', 'Lord of the Rings', 'Finding Memo']
    let id = req.params.indexNumber
    if(id < movies.length){
        res.send(movies[id])
    }else {
        res.send("Use Valid Index")
    }
    
});

// Problem 4

router.get('/films', function (req, res) {

    const films = [ {
                       'id': 1,
                        'name': 'The Shining'
                     }, {
                        'id': 2,
                        'name': 'Incidious'
                     }, {
                        'id': 3,
                        'name': 'Lord of the Rings'
                     },{
                        'id': 4,
                        'name': 'The Shining'
                    }]
     res.send(films)       
});

// Problem 5

router.get('/films/:filmId', function (req, res) {

    const films = [ {
                       'id': 1,
                        'name': 'The Shining'
                     }, {
                        'id': 2,
                        'name': 'Incidious'
                     }, {
                        'id': 3,
                        'name': 'Lord of the Rings'
                     },{
                        'id': 4,
                        'name': 'The Shining'
                    }]


            for(let i = 0; i <= films.length; i++){
                if(i <= req.params.filmId){
                    res.send(films[i])
                }
                else if(id > films.length){
                    res.send("No such film")
                }
            }
});

// -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7]
  
    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }
  
    let lastDigit= arr.pop()
    let consecutiveSum= lastDigit * (lastDigit+1) / 2
    let missingNumber= consecutiveSum - total
  
    res.send(  { data: missingNumber  }  );
  });
  
  
    // -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 38]: 36 is missing
  router.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 37, 38]
    let len= arr.length
  
    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }
  
    let firstDigit= arr[0]
    let lastDigit= arr.pop()
    let consecutiveSum= (len + 1) * (firstDigit+ lastDigit ) / 2
    let missingNumber= consecutiveSum - total
   
    res.send(  { data: missingNumber  }  );
  });
  
 

module.exports = router;
// adding this comment for no reason