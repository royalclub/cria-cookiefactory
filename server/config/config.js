/*jslint node:true*/
module.exports = {
    development: {
        db: 'mongodb://localhost/books-dev',    // change books with your database
        port: 3000,                             // change with your port number
        debug: true                             // set debug to true|false
    },
    test1: {
        db: 'mongodb://localhost/books-tst1',   // change books with your database
        port: 3001,                             // change with your port number
        debug: true                             // set debug to true|false
    },
    test2: {
        db: 'mongodb://localhost/books-tst2',   // change books with your database
        port: 3002,                             // change with your port number
        debug: true                             // set debug to true|false
    },
    acceptance: {
        db: 'mongodb://localhost/books-acc',    // change books with your database
        port: 3003,                             // change with your port number
        debug: true                             // set debug to true|false
    },
    production: {}
};
