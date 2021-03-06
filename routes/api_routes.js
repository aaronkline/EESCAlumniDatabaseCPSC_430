let express = require('express');
let router = express.Router();
let path = require('path');

let { body, validationResult } = require('express-validator');
let Alumni = require('../models/alumni');


// Returns all approved alumni entries
router.get('/alumnis', (req, res, next) => {
    Alumni.find({'status': 'approved'}).exec(function(err, results) {
        if (err) {return next(err);}
        res.setHeader('content-type', 'application/json')
        res.json(results);
    });
});

// Returns all pending alumni entries
router.get('/alumnis/pending', (req, res, next) => {
    Alumni.find({'status': 'pending'}).exec(function(err, results) {
        if (err) {return next(err);}
        res.send(results);
    });
});

// Returns alumni entry 
router.get('/alumni/:id', (req, res, next) => {
    Alumni.findById(req.params.id).exec((err, result) => {
        if (err) {return next(err);}
        res.status(200).send(result);
    });
})

//Returns all featured alumni entries
//unused as of now
router.get('/alumnis/featured', (req, res, next) => {
    Alumni.find({'isFeatured': 'true'}).exec(function(err, results) {
        if (err) {return next(err);}
        res.send(results);
    })
});

module.exports = router;