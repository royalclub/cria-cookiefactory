/*global before, describe, process, it */
// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json');

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
                        "number": "dsf400",
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
                                    cookie: [{
                                            name: "koekje 5",
                                            creator: "henkdesteen",
                                            layers: [{
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
                                                    }, {
                                                        name: "vormen",
                                                        required: true,
                                                        sequence: 1,
                                                        imageSrc: "path to image",
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
                                    ],
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
                /*JSON.parse(res.text)
                    .should.have.property('err').be.exactly(null);*/
                res.statusCode.should.be.exactly(200);
                res.type.should.be.exactly('application/json');
                res.charset.should.be.exactly('utf-8');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('number')
                    .be.exactly('dsf400');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('status')
                    .with.lengthOf(1);

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
        it('Should GET /orders/{_id}', function (done) {
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
                    .should.have.property('doc')/*
                    .and.have.property('number')
                    .be.exactly('dsf400');*/
                JSON.parse(res.text)
                    .should.have.property('doc')/*
                    .and.have.property('status')
                    .with.lengthOf(1);*/
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('UPDATE 1 order', function () {
        it('Should PUT /orders/{_id}', function (done) {
            request
                .put('/orders/' + tmpOrderId)
                .send({
                        "number": "hoas569",
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
                                    cookie: [{
                                            name: "koekje 5",
                                            creator: "henkdesteen",
                                            layers: [{
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
                                                    }, {
                                                        name: "vormen",
                                                        required: true,
                                                        sequence: 1,
                                                        imageSrc: "path to image",
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
                                    ],
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
                    .and.have.property('number')
                    .be.exactly('hoas569');
                JSON.parse(res.text)
                    .should.have.property('doc')
                    .and.have.property('status')
                    .with.lengthOf(1);
                res.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('DELETE 1 order', function () {
        it('Should DELETE /orders/{_id}', function (done) {
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
                    .should.have.property('doc')/*
                    .and.have.property('n')
                    .be.exactly(1);*/
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