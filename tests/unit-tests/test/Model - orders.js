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
mongoose.createConnection(config.db);

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

var Order = mongoose.model('Order'),
    testOrder = {
                    "number": "kk200",
                    status: [{
                                name: "bakken",
                                description: "de koekjes zitten nu in de oven"
                            }],
                    user: [{
                                username: "henkdesteen",
                                emailAddress: "henk@desteen.nl",
                                firstName: "henk",
                                inserts: "de",
                                lastName: "Steen"
                            }],
                    rules: [{
                                cookie: null,
                                box: null,
                                amountOfBoxes: 4
                            }],
                    invoiceAddress: [{
                                street: "Rietdekkersveld",
                                streetNumber: 40,
                                zipCode: "7031DL",
                                city: "Wehl"
                            }],
                    shipmentAddress: [{
                                street: "Weversveld",
                                streetNumber: 23,
                                zipCode: "5862GL",
                                city: "Doetinchem"
                            }],
                    vatPercentage: 21
                };

/**
 * Let's start with the tests
 */

describe('Order', function () {
    describe('Simple CRUD operations', function () {
        var doc = null;

        // CREATE Order
        it("CREATE Order", function (done) {
            doc = new Order(testOrder);
            doc.save(done);
        });

        // GET all Orders
        it("GET all Orders", function (done) {
            Order
                .find({}, function (err, result) {
                    if (result.length === 0) {
                        throw err;
                    }
                    done();
                });
        });

        // GET 1 Orders
        it("GET 1 Order", function (done) {
            Order
                .find({_id: doc._id}, function (err, result) {
                    if (result.length !== 1) {
                        throw err;
                    }
                    done();
                });
        });

        // Update Order
        it("UPDATE Order", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {'number': 'kk200'}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        // DELETE Order
        it("DELETE Order", function (done) {
            Order
                .remove({_id: doc._id}, done);
        });
    });


    describe('Model validation create Order', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Order(testOrder);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Order
                .remove({_id: doc._id}, done);
        });

        // Tests

        function errorExist(done){
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        }
        
        function createString(lenght){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
            for( var i=0; i < lenght; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
        
            return text;
        }

        // Create 1 Order with a empty number
        it("Create 1 Order empty number", function (done) {
            doc.number = null;
            errorExist(done);
        });

        // Create 1 Order with a empty status[0].name
        it("Create 1 Order empty status[0].name", function (done) {
            doc.status[0].name = null;
            errorExist(done);
        });

        // Create 1 Order with status[0].name length of 2
        it("Create 1 Order with status[0].name length of 2", function (done) {
            doc.status[0].name = "ok";
            errorExist(done);
        });

        // Create 1 Order with status[0].name length of 3
        it("Create 1 Order with status[0].name length of 3", function (done) {
            doc.status[0].name = "get";
            doc.save(done);
        });

        // Create 1 Order with status[0].name length of 20
        it("Create 1 Order with status[0].name length of 20", function (done) {
            doc.status[0].name = createString(20);
            doc.save(done);
        });

        // Create 1 Order with tatus[0].description length of 21
        it("Create 1 Order status[0].description length of 21", function (done) {
            doc.status[0].name = createString(21);
            errorExist(done);
        });

        // Create 1 Order with status[0].description length of 512
        it("Create 1 Order status[0].description length of 512", function (done) {
            doc.status[0].description = createString(512);
            doc.save(done);
        });

        // Create 1 Order with status[0].description length of 513
        it("Create 1 Order status[0].description length of 513", function (done) {
            doc.status[0].description = createString(513);
            errorExist(done);
        });

        // Create 1 Order with a empty status[0].creationDate
        it("Create 1 Order empty status[0].creationDate", function (done) {
            doc.status[0].creationDate = null;
            errorExist(done);
        });

        // Create 1 Order with a empty status[0].modificationDate
        it("Create 1 Order empty status[0].modificationDate", function (done) {
            doc.status[0].modificationDate = null;
            errorExist(done);
        });

        // Create 1 Order with a empty vatPercentage
        it("Create 1 Order empty vatPercentage", function (done) {
            doc.vatPercentage = null;
            errorExist(done);
        });

        // Create 1 Order with vatPercentage as string
        it("Create 1 Order vatPercentage as string", function (done) {
            doc.vatPercentage = "string";
            errorExist(done);
        });

        // Create 1 Order with vatPercentage length of -1
        it("Create 1 Order vatPercentage length of -1", function (done) {
            doc.vatPercentage = -1;
            errorExist(done);
        });

        // Create 1 Order with vatPercentage length of 0
        it("Create 1 Order vatPercentage length of 0", function (done) {
            doc.vatPercentage = 0;
            doc.save(done);
        });

        // Create 1 Order with vatPercentage length of 100
        it("Create 1 Order vatPercentage length of 100", function (done) {
            doc.vatPercentage = 100;
            doc.save(done);
        });

        // Create 1 Order with vatPercentage length of 101
        it("Create 1 Order vatPercentage length of 101", function (done) {
            doc.vatPercentage = 101;
            errorExist(done);
        });

        // Create 1 Order with a empty creationDate
        it("Create 1 Order empty creationDate", function (done) {
            doc.creationDate = null;
            errorExist(done);
        });

        // Create 1 Order with a empty modificationDate
        it("Create 1 Order empty modificationDate", function (done) {
            doc.modificationDate = null;
            errorExist(done);
        });
    });


    describe('Model validation update Order', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new Order(testOrder);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Order
                .remove({_id: doc._id}, done);
        });

        // Tests

        // Update Order with a empty number
        it("Update Order with a empty number", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {'number': null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De number mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Order with a empty vatPercentage
        it("Update Order with a empty vatPercentage", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {vatPercentage: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De vatPercentage mag niet null zijn!";
                    }
                    done();
                });
        });

        // Create 1 Order with vatPercentage as string
        it("Update Order with vatPercentage as string", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {vatPercentage: 'string'}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De vatPercentage mag geen string zijn!";
                    }
                    done();
                });
        });

        // Create 1 Order with vatPercentage length of -1
        it("Update Order with a empty vatPercentage", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {vatPercentage: -1}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De vatPercentage mag niet minder dan 0 zijn!";
                    }
                    done();
                });
        });

        // Create 1 Order with vatPercentage length of 0
        it("Update Order vatPercentage length of 0", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {vatPercentage: 0}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        // Create 1 Order with vatPercentage length of 100
        it("Update Order vatPercentage length of 100", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {vatPercentage: 100}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        // Create 1 Order with vatPercentage length of 101
        it("Update Order vatPercentage length of 101", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {vatPercentage: 101}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De vatPercentage mag niet meer dan 100 zijn!";
                    }
                    done();
                });
        });

        // Update Order with a empty creationDate
        it("Update Order with a empty creationDate", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {creationDate: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De creationDate mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update Order with a empty modificationDate
        it("Update Order with a empty modificationDate", function (done) {
            Order
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
            doc = new Order(testOrder);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            Order
                .remove({_id: doc._id}, done);
        });

        // Tests

        // GET all Orders
        it("GET all Orders", function (done) {
            Order
                .find({}, function (err, result) {
                    if (err || result.length === 0) {
                        throw err;
                    }
                    done();
                });
        });

        // GET 1 Order
        it("GET 1 Order", function (done) {
            Order
                .find({_id: doc._id}, function (err, result) {
                    if (err || result.length !== 1) {
                        throw err;
                    }
                    done();
                });
        });

        // Update Order
        it("UPDATE Order", function (done) {
            Order
                .findOneAndUpdate({_id: doc._id}, {name: 'deeg soort'}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});