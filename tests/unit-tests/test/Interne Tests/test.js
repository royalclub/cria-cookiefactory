/*global describe, process, it, __dirname, beforeEach, afterEach*/

/**
 * Module dependencies.
 */
var fs = require('fs')
    , path = require('path');

// Load configuration
var env = process.env.NODE_ENV || 'development'
    , config = require('../../../server/config/config.js')[env];

// Bootstrap db connection
var mongoose = require('../../../server/node_modules/mongoose')
mongoose.connect(config.db);

/*
// Debugging
mongoose.connection.on('error', function (err) {
    console.error('MongoDB error: %s', err);
});
mongoose.set('debug', config.debug);
*/

// Bootstrap models
var models_path = __dirname + '/../../../server/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file);
});

var Layer = mongoose.model('Layer');

/**
 * Let's start with the tests
 */

describe('Layer', function () {
    describe('CRUD operations with start up and tear down', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Layer({name: "deeg",
                        required: true,
                        sequence: 1,
                        options: [{
                                    name: "Zanddeeg",
                                    sequence: 1,
                                    description: "Zanddeeg heeft een kruimelige structuur en breekt makkelijk.",
                                    price: 2.3,
                                    imageSrc: "path to image"
                                }, {
                                    name: "Cakebeslag",
                                    sequence: 2,
                                    description: "Cakebeslag is een semi-vloeibaar deeg voornamelijk gebruikt voor het bakken van cakes. Het geeft een zacht en luchtig gebak.",
                                    price: 2.5,
                                    imageSrc: "path to image"
                                }]});
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Layer
                .remove({name: 'deeg'}, done);
        });

        // Tests

        // GET all Layers
        it("GET all Layers", function (done) {
            Layer
                .find({}, function (err, result) {
                    if (err || result.length === 0) {
                        throw err;
                    }
                    done();
                })
        });
/*
        // GET all Layers
        it("GET 1 Layer", function (done) {
            Layer
                .find({_id: doc._id}, function (err, result) {
                    if (err || result.length !== 1) {
                        throw err;
                    }
                    done();
                })
        });

        // Update Layer
        it("UPDATE Layer", function (done) {
            Layer
                .update({_id: doc._id}, {description: 'Updated description'}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });
    });


    describe('Simple CRUD operations', function () {
        var doc = null;

        // CREATE Layer
        it("CREATE Layer", function (done) {
            doc = new Layer({title: 'Nin-me-sara',
                author: 'Enheduanna',
                description: "First female writer"});
            doc.save(done);
        });

        // GET all Layers
        it("GET all Layers", function (done) {
            Layer
                .find({}, function (err, result) {
                    if (result.length === 0) {
                        throw err;
                    }
                    done();
                })
        });

        // GET all Layers
        it("GET 1 Layer", function (done) {
            Layer
                .find({_id: doc._id}, function (err, result) {
                    if (result.length !== 1) {
                        throw err;
                    }
                    done();
                })
        });

        // Update Layer
        it("UPDATE Layer", function (done) {
            Layer
                .update({_id: doc._id}, {description: 'Updated description'}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });

        // DELETE Layer
        it("DELETE Layer", function (done) {
            Layer
                .remove({_id: doc._id}, done);
        });*/

    });
});