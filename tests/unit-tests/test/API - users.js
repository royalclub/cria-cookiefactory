/*global before, describe, process, it */
// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json');

var should = require('should'),
    supertest = require('supertest');

describe('API Routing for CRUD operations on users', function () {

    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    var tmpUserId = null;
    var tmpUserResponse;

    before(function (done) {
        done();
    });

    describe('CREATE user', function () {
        it('Should POST /users', function (done) {
            request
                .post('/users')
                .send({
                        username: "henkdesteen",
                        salt: "DitIsEenSalt",
                        password: "RipWAchtwoord",
                        firstName: "henk",
                        inserts: "de",
                        lastName: "Steen",
                        dateOfBirth: Date.now(),
                        emailAddress: "henk@desteen.nl",
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
                    }
                )
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                JSON.parse(res.text)
                    .should.have.property('meta')
                    .and.have.property('action').be.exactly('create');
                JSON.parse(res.text)
                    .should.have.property('err').be.exactly(null);
                res.statusCode.should.be.exactly(200);
                res.type.should.be.exactly('application/json');
                res.charset.should.be.exactly('utf-8');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('username')
                    .be.exactly('henkdesteen');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('addresses')
                    .with.lengthOf(2);

                tmpUserId = JSON.parse(res.text).doc._id;

                done();
            });
        });
    });

    describe('RETRIEVE all users', function () {

        it('Should GET /users', function (done) {
            request
                .get('/users')
                .expect(200)                                                // supertest 
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                if (err) {
                    throw err;
                }

                JSON.parse(res.text)
                    .should.have.property('meta')
                    .and.have.property('action').be.exactly('list');
                res.statusCode.should.be.exactly(200);

                tmpUserResponse = res.text;

                done();
            });
        });
    });

    describe('RETRIEVE 1 user', function () {
        it('Should GET /users/{_id}', function (done) {
            request
                .get('/users/' + tmpUserId)
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                JSON.parse(res.text)
                    .should.have.property('meta')
                    .and.have.property('action')
                    .be.exactly('detail');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('username')
                    .be.exactly('henkdesteen');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('addresses')
                    .with.lengthOf(2);
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('UPDATE 1 user', function () {
        it('Should PUT /users/{_id}', function (done) {
            request
                .put('/users/' + tmpUserId)
                .send({
                        username: "kareldegrote",
                        salt: "DitIsEenSalt",
                        password: "RipWAchtwoord",
                        firstName: "Karel",
                        inserts: "de",
                        lastName: "Grote",
                        dateOfBirth: Date.now(),
                        emailAddress: "karel@degrote.nl",
                        addresses: [{
                                    street: "Steenbakkersveld",
                                    streetNumber: 56,
                                    zipCode: "5632GF",
                                    city: "doesburg"
                                }, {
                                    street: "grotelaanstraat",
                                    streetNumber: 820,
                                    zipCode: "9614TO",
                                    city: "Arnhem"
                                }]
                    }
            )
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                if (err) {
                    throw err;
                }

                JSON.parse(res.text)
                    .should.have.property('meta')
                    .and.have.property('action')
                    .be.exactly('update');
                JSON.parse(res.text)
                    .should.have.property('err')
                    .be.exactly(null);
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('username')
                    .be.exactly('kareldegrote');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('addresses')
                    .with.lengthOf(2);
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('DELETE 1 user', function () {
        it('Should DELETE /users/{_id}', function (done) {
            request
                .del('/users/' + tmpUserId)
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                JSON.parse(res.text)
                    .should.have.property('meta')
                    .and.have.property('action').be.exactly('delete');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('ok')
                    .be.exactly(1);
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('n')
                    .be.exactly(1);
                JSON.parse(res.text).should.have.property('err').be.exactly(null);
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('RETRIEVE all users to verify that the original collection is restored.', function () {
        it('Should GET /users', function (done) {
            request
                .get('/users')
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                if (err) {
                    throw err;
                }

                JSON.parse(res.text)
                    .should.have.property('meta')
                    .and.have.property('action').be.exactly('list');
                res.statusCode.should.be.exactly(200);

                done();
            });
        });
    });
});