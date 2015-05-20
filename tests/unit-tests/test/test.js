/*global before, describe, process, it */
// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json')
    ;

var should = require('should'),
    supertest = require('supertest');

describe('API Routing for CRUD operations on orders', function () {

    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    var tmpOrderId = null;
    var tmpOrderResponse;

    before(function (done) {
        done();
    });

    describe('CREATE order', function () {
        it('Should POST /orders', function (done) {
            request
                .post('/orders')
                .send({
                    "number": "b624",
                    status: {
                                name: "in de oven",
                                description: "Het koekje zit in de over.",
                                creationDate: "2012-04-23T18:25:43.511Z",
                                modificationDate: "2012-04-23T18:25:43.511Z",
                                },
                    user: "John Doe",
                    rules: "John Doe",
                    invoiceAddress: "John Doe",
                    shipmentAddress: "John Doe",
                    vatPercentage: "John Doe",
                    creationDate: "2012-04-23T18:25:43.511Z",
                    modificationDate: "Johen Doe"
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
                        .and.have.property('author')
                        .be.exactly('John Doe');

                    tmpOrderId = JSON.parse(res.text).doc._id;

                    done();
                });
        });
    });

    describe('RETRIEVE all orders', function () {

        it('Should GET /orders', function (done) {
            request
                .get('/orders')
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

                    tmpOrderResponse = res.text;

                    done();
                });
        });
    });

    describe('RETRIEVE 1 order', function () {
        it('Should GET /orders/{id}', function (done) {
            request
                .get('/orders/' + tmpOrderId)
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
                        .and.have.property('author')
                        .be.exactly('John Doe');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 order', function () {
        it('Should PUT /orders/{id}', function (done) {
            request
                .put('/orders/' + tmpOrderId)
                .send({
                    "doc": {
                        "title": "Good order " + Date.now(),
                        "author": "Ghostwriter",
                        "description": "order is updated."
                    }
                })
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
                        .and.have.property('author')
                        .be.exactly('Ghostwriter');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 order', function () {
        it('Should DELETE /orders/{id}', function (done) {
            request
                .del('/orders/' + tmpOrderId)
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

    describe('RETRIEVE all orders to verify that the original collection is restored.', function () {
        it('Should GET /orders', function (done) {
            request
                .get('/orders')
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