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

var User = mongoose.model('User'),
    testUser = {
                    username: "henkdesteen1",
                    salt: "DitIsEenSalt",
                    password: "RipWAchtwoord",
                    firstName: "henk",
                    inserts: "de",
                    lastName: "Steen",
                    dateOfBirth: Date.now(),
                    emailAddress: "henk1@desteen.nl",
                    addresses: [{
                                street: "Rietdekkersveld",
                                streetNumber: 40,
                                zipCode: "7031DL",
                                city: "Wehl"
                            }, {
                                street: "Weversveld",
                                streetNumber: 23,
                                zipCode: "5862GL",
                                city: "Doetinchem"
                            }]
                    };

/**
 * Let's start with the tests
 */

describe('User', function () {
    describe('Simple CRUD operations', function () {
        var doc = null;

        // CREATE User
        it("CREATE User", function (done) {
            doc = new User(testUser);
            doc.save(done);
        });

        // GET all Users
        it("GET all Users", function (done) {
            User
                .find({}, function (err, result) {
                    if (result.length === 0) {
                        throw err;
                    }
                    done();
                });
        });

        // GET 1 Users
        it("GET 1 User", function (done) {
            User
                .find({_id: doc._id}, function (err, result) {
                    if (result.length !== 1) {
                        throw err;
                    }
                    done();
                });
        });

        // Update User
        it("UPDATE User", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {name: 'deeg soort'}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        // DELETE User
        it("DELETE User", function (done) {
            User
                .remove({_id: doc._id}, done);
        });
    });


    describe('Model validation create User', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new User(testUser);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            User
                .remove({_id: doc._id}, done);
        });

        // Tests

        function errorExist(done){
            doc.save(doc, function(err){
                should.exist(err);
                done();
            });
        }

        // Create 1 User with a empty username
        it("Create 1 User empty username", function (done) {
            doc.username = null;
            errorExist(done);
        });

        // Create 1 User with a empty salt
        it("Create 1 User empty salt", function (done) {
            doc.salt = null;
            errorExist(done);
        });

        // Create 1 User with a empty password
        it("Create 1 User empty password", function (done) {
            doc.password = null;
            errorExist(done);
        });
        
        // Create 1 User with a empty firstName
        it("Create 1 User empty firstName", function (done) {
            doc.firstName = null;
            errorExist(done);
        });

        // Create 1 User with a inserts length of 10
        it("Create 1 User inserts length of 10", function (done) {
            doc.inserts = "van der de";
            doc.save(done);
        });

        // Create 1 User with a inserts length of 11
        it("Create 1 User inserts length of 11", function (done) {
            doc.inserts = "van der der";
            errorExist(done);
        });

        // Create 1 User with a empty lastName
        it("Create 1 User empty lastName", function (done) {
            doc.lastName = null;
            errorExist(done);
        });

        // Create 1 User with a dateOfBirth string
        it("Create 1 User dateOfBirth string", function (done) {
            doc.dateOfBirth = "string";
            errorExist(done);
        });

        // Create 1 User with a empty emailAddress
        it("Create 1 User empty emailAddress", function (done) {
            doc.emailAddress = null;
            errorExist(done);
        });

        // Create 1 User not legit emailAddress
        it("Create 1 User not legit emailAddress", function (done) {
            doc.emailAddress = "henk@desteen";
            errorExist(done);
        });

        // Create 1 User not legit emailAddress
        it("Create 1 User not legit emailAddress", function (done) {
            doc.emailAddress = "henkdesteen.nl";
            errorExist(done);
        });

        // Create 1 User with a empty addresses[0].street
        it("Create 1 User empty addresses[0].street", function (done) {
            doc.addresses[0].street = null;
            errorExist(done);
        });

        // Create 1 User with a empty addresses[0].streetNumber
        it("Create 1 User empty addresses[0].streetNumber", function (done) {
            doc.addresses[0].streetNumber = null;
            errorExist(done);
        });

        // Create 1 User with a empty addresses[0].zipCode
        it("Create 1 User empty addresses[0].zipCode", function (done) {
            doc.addresses[0].zipCode = null;
            errorExist(done);
        });

        // Create 1 User with a empty addresses[0].city
        it("Create 1 User empty addresses[0].city", function (done) {
            doc.addresses[0].city = null;
            errorExist(done);
        });

        // Create 1 User with a empty creationDate
        it("Create 1 User empty creationDate", function (done) {
            doc.creationDate = null;
            errorExist(done);
        });

        // Create 1 User with a empty modificationDate
        it("Create 1 User empty modificationDate", function (done) {
            doc.modificationDate = null;
            errorExist(done);
        });
    });


    describe('Model validation update User', function () {
        var doc = null;

        // Start up
        beforeEach(function (done) {
            doc = new User(testUser);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            User
                .remove({_id: doc._id}, done);
        });

        // Tests

        // Update User with a empty username
        it("Update User with a empty username", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {username: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De username mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User with a empty salt
        it("Update User with a empty salt", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {salt: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De salt mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User with a empty password
        it("Update User with a empty password", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {password: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De password mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User with a empty firstName
        it("Update User with a empty firstName", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {firstName: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De firstName mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User with a inserts length of 10
        it("Update User inserts length of 10", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {inserts: "van der de"}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        // Update User with a inserts length of 11
        it("Update User inserts length of 11", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {inserts: "van der der"}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "Inserts has a length of 11, that cannot be allowed!";
                    }
                    done();
                });
        });

        // Update User with a empty lastName
        it("Update User with a empty lastName", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {lastName: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De lastName mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User with a empty emailAddress
        it("Update User with a empty emailAddress", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {emailAddress: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De emailAddress mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User not legit emailAddress
        it("Update User not legit emailAddress", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {emailAddress: "henk@desteen"}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De emailAddress mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User not legit emailAddress
        it("Update User not legit emailAddress", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {emailAddress: "henkdesteen.nl"}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De emailAddress mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User with a empty creationDate
        it("Update User with a empty creationDate", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {creationDate: null}, {multi: false, runValidators: true}, function (err, result) {
                    if (!err) {
                        throw "De creationDate mag niet null zijn!";
                    }
                    done();
                });
        });

        // Update User with a empty modificationDate
        it("Update User with a empty modificationDate", function (done) {
            User
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
            doc = new User(testUser);
            doc.save(done);
        });

        // Tear down
        afterEach(function (done) {
            User
                .remove({_id: doc._id}, done);
        });

        // Tests

        // GET all Users
        it("GET all Users", function (done) {
            User
                .find({}, function (err, result) {
                    if (err || result.length === 0) {
                        throw err;
                    }
                    done();
                });
        });

        // GET 1 User
        it("GET 1 User", function (done) {
            User
                .find({_id: doc._id}, function (err, result) {
                    if (err || result.length !== 1) {
                        throw err;
                    }
                    done();
                });
        });

        // Update User
        it("UPDATE User", function (done) {
            User
                .findOneAndUpdate({_id: doc._id}, {name: 'deeg soort'}, {multi: false, runValidators: true}, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});