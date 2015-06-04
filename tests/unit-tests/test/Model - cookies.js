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

mongoose.set('debug', config.debug);
*/

// Bootstrap models
var models_path = __dirname + '/../../../server/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file);
});

var Cookie = mongoose.model('Cookie'),
    testCookie = {
                    name: "koekje nummer 2",
                    creator: "henkdesteen",
                    layers: [{
                                name: "deeg ",
                                required: true,
                                sequence: 1,
                                options: [{
                                            name: "Zand deeg",
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
                            }, {
                                name: "vormen ",
                                required: true,
                                sequence: 1,
                                options: [{
                                            name: "Rond",
                                            sequence: 1,
                                            description: null,
                                            price: 2.3,
                                            imageSrc: "path to image"
                                        }, {
                                            name: "vierkant",
                                            sequence: 2,
                                            description: null,
                                            price: 2.5,
                                            imageSrc: "path to image"
                                        }]
                            }]
                    };

/**
 * Let's start with the tests
 */

describe('Cookie', function () {
    describe('Simple CRUD operations', function () {
        var doc = null;

        // CREATE Cookie
        it("CREATE Cookie", function (done) {
            doc = new Cookie(testCookie);
            doc.save(done);
        });

        // GET all Cookies
        it("GET all Cookies", function (done) {
            Cookie
                .find({}, function (err, result) {
                    if (result.length === 0) {
                        throw err;
                    }
                    done();
                });
        });

        // GET 1 Cookies
        it("GET 1 Cookie", function (done) {
            Cookie
                .find({_id: doc._id}, function (err, result) {
                    if (result.length !== 1) {
                        throw err;
                    }
                    done();
                });
        });

        // Update Cookie
        it("UPDATE Cookie", function (done) {
            Cookie
                .findOneAndUpdate({_id: doc._id}, {name: 'koekje nummer 3'}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        // DELETE Cookie
        it("DELETE Cookie", function (done) {
            Cookie
                .remove({_id: doc._id}, done);
        });
    });


    describe('Model validation create Cookie', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Cookie(testCookie);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Cookie
                .remove({_id: doc._id}, done);
        });

        // Tests

        function errorExist(done){
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        }

        // Create 1 Cookie with a empty name
        it("Create 1 Cookie empty name", function (done) {
            doc.name = null;
            errorExist(done);
        });

        // Create 1 Cookie with a empty creator
        it("Create 1 Cookie empty creator", function (done) {
            doc.creator = null;
            errorExist(done);
        });

        // Create 1 Cookie with a empty creationDate
        it("Create 1 Cookie empty creationDate", function (done) {
            doc.creationDate = null;
            errorExist(done);
        });

        // Create 1 Cookie with a empty modificationDate
        it("Create 1 Cookie empty modificationDate", function (done) {
            doc.modificationDate = null;
            errorExist(done);
        });
    });


    describe('Model validation update Cookie', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Cookie(testCookie);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Cookie
                .remove({_id: doc._id}, done);
        });

        // Tests

        // Update Cookie with a empty name
        it("Update Cookie with a empty name", function (done) {
            Cookie
                .findOneAndUpdate({_id: doc._id}, {name: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De name mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Cookie with a empty creator
        it("Update Cookie with a empty creator", function (done) {
            Cookie
                .findOneAndUpdate({_id: doc._id}, {creator: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De creator mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Cookie with a empty creationDate
        it("Update Cookie with a empty creationDate", function (done) {
            Cookie
                .findOneAndUpdate({_id: doc._id}, {creationDate: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De creationDate mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Cookie with a empty modificationDate
        it("Update Cookie with a empty modificationDate", function (done) {
            Cookie
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
            doc = new Cookie(testCookie);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Cookie
                .remove({_id: doc._id}, done);
        });

        // Tests

        // GET all Cookies
        it("GET all Cookies", function (done) {
            Cookie
                .find({}, function (err, result) {
                    if (err || result.length === 0) {
                        throw err;
                    }
                    done();
                });
        });

        // GET 1 Cookie
        it("GET 1 Cookie", function (done) {
            Cookie
                .find({_id: doc._id}, function (err, result) {
                    if (err || result.length !== 1) {
                        throw err;
                    }
                    done();
                });
        });

        // Update Cookie
        it("UPDATE Cookie", function (done) {
            Cookie
                .findOneAndUpdate({_id: doc._id}, {name: 'koekje nummer 3'}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});