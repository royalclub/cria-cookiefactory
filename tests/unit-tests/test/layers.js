/*global before, describe, process, it */
// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json');

var should = require('should'),
    supertest = require('supertest');

describe('API Routing for CRUD operations on layers', function () {

    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    var tmpLayerId = null;
    var tmpLayerResponse;

    before(function (done) {
        done();
    });

    describe('CREATE layer', function () {
        it('Should POST /layers', function (done) {
            request
                .post('/layers')
                .send({
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
                    .be.exactly('deeg');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('options')
                    .with.lengthOf(2);

                tmpLayerId = JSON.parse(res.text).doc._id;

                done();
            });
        });
    });

    describe('RETRIEVE all layers', function () {

        it('Should GET /layers', function (done) {
            request
                .get('/layers')
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

                tmpLayerResponse = res.text;

                done();
            });
        });
    });

    describe('RETRIEVE 1 layer', function () {
        it('Should GET /layers/{_id}', function (done) {
            request
                .get('/layers/' + tmpLayerId)
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
                    .be.exactly('deeg');
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('UPDATE 1 layer', function () {
        it('Should PUT /layers/{_id}', function (done) {
            request
                .put('/layers/' + tmpLayerId)
                .send({
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
                    .be.exactly("vormen");
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('options')
                    .with.lengthOf(2);
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('DELETE 1 layer', function () {
        it('Should DELETE /layers/{_id}', function (done) {
            request
                .del('/layers/' + tmpLayerId)
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

    describe('RETRIEVE all layers to verify that the original collection is restored.', function () {
        it('Should GET /layers', function (done) {
            request
                .get('/layers')
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