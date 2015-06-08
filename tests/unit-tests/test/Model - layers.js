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
var mongoose = require('../../../server/node_modules/mongoose');
if (mongoose.host === undefined) {
    mongoose.connect(config.db);
    mongoose.connection.on('error', function (err) {
        console.error('MongoDB error: %s', err);
    });
}

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

var Layer = mongoose.model('Layer'),
    testLayer = {
                    name: "deeg",
                    required: true,
                    sequence: 1,
                    imageSrc: "path to image",
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
                            }]
                        };

/**
 * Let's start with the tests
 */

describe('Layer', function () {
    describe('Simple CRUD operations', function () {
        var doc = null;

        // CREATE Layer
        it("CREATE Layer", function (done) {
            doc = new Layer(testLayer);
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
                .findOneAndUpdate({_id: doc._id}, {name: 'deeg  soort'}, {multi: false, runValidators: true}, function (err, result) {
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
            doc = new Layer(testLayer);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Layer
                .remove({_id: doc._id}, done);
        });

        // Tests

        function errorExist(done){
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        }

        // Create 1 Layer with a empty name
        it("Create 1 Layer empty name", function (done) {
            doc.name = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty required
        it("Create 1 Layer empty required", function (done) {
            doc.required = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty sequence
        it("Create 1 Layer empty sequence", function (done) {
            doc.sequence = null;
            errorExist(done);
        });
        
        // Create 1 Layer with a empty options[0].name
        it("Create 1 Layer empty options[0].name", function (done) {
            doc.options[0].name = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty options[0].sequence
        it("Create 1 Layer empty options[0].sequence", function (done) {
            doc.options[0].sequence = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty options[0].price
        it("Create 1 Layer empty options[0].price", function (done) {
            doc.options[0].price = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty options[0].imageSrc
        it("Create 1 Layer empty options[0].imageSrc", function (done) {
            doc.options[0].imageSrc = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty options[0].creationDate
        it("Create 1 Layer empty options[0].creationDate", function (done) {
            doc.options[0].creationDate = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty options[0].modificationDate
        it("Create 1 Layer empty options[0].modificationDate", function (done) {
            doc.options[0].modificationDate = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty creationDate
        it("Create 1 Layer empty creationDate", function (done) {
            doc.creationDate = null;
            errorExist(done);
        });

        // Create 1 Layer with a empty modificationDate
        it("Create 1 Layer empty modificationDate", function (done) {
            doc.modificationDate = null;
            errorExist(done);
        });
    });


    describe('Model validation update Layer', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Layer(testLayer);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Layer
                .remove({_id: doc._id}, done);
        });

        // Tests

        // Update Layer with a empty name
        it("Update Layer with a empty name", function (done) {
            Layer
                .findOneAndUpdate({_id: doc._id}, {name: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De name mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Layer with a empty required
        it("Update Layer with a empty required", function (done) {
            Layer
                .findOneAndUpdate({_id: doc._id}, {required: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De required mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Layer with a empty sequence
        it("Update Layer with a empty sequence", function (done) {
            Layer
                .findOneAndUpdate({_id: doc._id}, {sequence: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De sequence mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Layer with a empty creationDate
        it("Update Layer with a empty creationDate", function (done) {
            Layer
                .findOneAndUpdate({_id: doc._id}, {creationDate: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De creationDate mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Layer with a empty modificationDate
        it("Update Layer with a empty modificationDate", function (done) {
            Layer
                .findOneAndUpdate({_id: doc._id}, {modificationDate: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De modificationDate mag niet null zijn!";
                    }
                    done();
                });
        });
    });


    describe('CRUD operations with start up and tear down', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Layer(testLayer);
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
                .findOneAndUpdate({_id: doc._id}, {name: 'deeg  soort'}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});