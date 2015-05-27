/*global before, describe, process, it */
// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json');

var should = require('should'),
    supertest = require('supertest');

describe('API Routing for CRUD operations on cookies', function () {

    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    var tmpCookieId = null;
    var tmpCookieResponse;

    before(function (done) {
        done();
    });

    describe('CREATE cookie', function () {
        it('Should POST /cookies', function (done) {
            request
                .post('/cookies')
                .send({
                        name: "koekje nummer 3",
                        creator: "henkdesteen",
                        layers: [{
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
                                            }]
                                }, {
                                    name: "vormen",
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
                    .and.have.property('name')
                    .be.exactly('koekje nummer 3');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('layers')
                    .and.have.property('0')
                    .and.have.property('options')
                    .and.have.property('1')
                    .and.have.property('name')
                    .be.exactly('Cakebeslag');
                    
                tmpCookieId = JSON.parse(res.text).doc._id;

                done();
            });
        });
    });

    describe('RETRIEVE all cookies', function () {

        it('Should GET /cookies', function (done) {
            request
                .get('/cookies')
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

                tmpCookieResponse = res.text;

                done();
            });
        });
    });

    describe('RETRIEVE 1 cookie', function () {
        it('Should GET /cookies/{_id}', function (done) {
            request
                .get('/cookies/' + tmpCookieId)
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
                    .and.have.property('name')
                    .be.exactly('koekje nummer 3');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('layers')
                    .and.have.property('0')
                    .and.have.property('options')
                    .and.have.property('1')
                    .and.have.property('name')
                    .be.exactly('Cakebeslag');
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('UPDATE 1 cookie', function () {
        it('Should PUT /cookies/{_id}', function (done) {
            request
                .put('/cookies/' + tmpCookieId)
                .send({
                        name: "koekje 5",
                        creator: "henkdesteen",
                        layers: [{
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
                                            }]
                                }, {
                                    name: "vormen",
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
                    .and.have.property('name')
                    .be.exactly('koekje 5');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('layers')
                    .and.have.property('0')
                    .and.have.property('options')
                    .and.have.property('1')
                    .and.have.property('name')
                    .be.exactly('Cakebeslag');
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('DELETE 1 cookie', function () {
        it('Should DELETE /cookies/{_id}', function (done) {
            request
                .del('/cookies/' + tmpCookieId)
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

    describe('RETRIEVE all cookies to verify that the original collection is restored.', function () {
        it('Should GET /cookies', function (done) {
            request
                .get('/cookies')
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