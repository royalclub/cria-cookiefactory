/*global describe, process, it, __dirname, beforeEach, afterEach*/

/**
 * Module dependencies.
 */
var fs = require('fs'),
    path = require('path'),
    should = require('should');
    

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
    describe('Simple CRUD operations', function () {
        var doc = null;

        // CREATE Layer
        it("CREATE Layer", function (done) {
            doc = new Layer({
                        name: "deeg",
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

        // GET all Layers
        it("GET all Layers", function (done) {
            Layer
                .find({}, function (err, result) {
                    if (result.length === 0) {
                        throw err;
                    }
                    done();
                });
        });

        // GET 1 Layers
        it("GET 1 Layer", function (done) {
            Layer
                .find({_id: doc._id}, function (err, result) {
                    if (result.length !== 1) {
                        throw err;
                    }
                    done();
                });
        });

        // Update Layer
        it("UPDATE Layer", function (done) {
            Layer
                .update({_id: doc._id}, {name: 'deeg soort'}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        // DELETE Layer
        it("DELETE Layer", function (done) {
            Layer
                .remove({_id: doc._id}, done);
        });
    });


    describe('Model validation create Layer', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Layer({
                        name: "deeg",
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
                .remove({_id: doc._id}, done);
        });

        // Tests

        // Create 1 Layer
        it("Create 1 Layer", function (done) {
            doc.save(done);
        });
        

        // Create 1 Layer with a empty name
        it("Create 1 Layer empty name", function (done) {
            doc.name = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });

        // Create 1 Layer with a empty required
        it("Create 1 Layer empty required", function (done) {
            doc.required = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });

        // Create 1 Layer with a empty sequence
        it("Create 1 Layer empty sequence", function (done) {
            doc.sequence = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });

        // Create 1 Layer with a empty sequence
        /*it("Create 1 Layer empty sequence", function (done) {
            doc.options = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });*/
        
        // Create 1 Layer with a empty options[0].name
        it("Create 1 Layer empty options[0].name", function (done) {
            doc.options[0].name = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });

        // Create 1 Layer with a empty options[0].sequence
        it("Create 1 Layer empty options[0].sequence", function (done) {
            doc.options[0].sequence = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });

        // Create 1 Layer with a empty options[0].price
        it("Create 1 Layer empty options[0].price", function (done) {
            doc.options[0].price = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });

        // Create 1 Layer with a empty options[0].imageSrc
        it("Create 1 Layer empty options[0].price", function (done) {
            doc.options[0].price = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });

        // Create 1 Layer with a empty creationDate
        it("Create 1 Layer empty creationDate", function (done) {
            doc.creationDate = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });

        // Create 1 Layer with a empty modificationDate
        it("Create 1 Layer empty modificationDate", function (done) {
            doc.modificationDate = null;
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        });
    });


    describe('CRUD operations with start up and tear down', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Layer({
                        name: "deeg",
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
                .remove({_id: doc._id}, done);
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
                });
        });

        // GET 1 Layer
        it("GET 1 Layer", function (done) {
            Layer
                .find({_id: doc._id}, function (err, result) {
                    if (err || result.length !== 1) {
                        throw err;
                    }
                    done();
                });
        });

        // Update Layer
        it("UPDATE Layer", function (done) {
            Layer
                .update({_id: doc._id}, {name: 'deeg soort'}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});