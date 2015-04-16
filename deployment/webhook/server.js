/*jslint node:true*/

"use strict";

var express = require('express'),
    bodyParser = require('body-parser'),
    bodyParser = require('body-parser'),
    sys = require('sys'),
    exec = require('child_process').exec,
    app = express(),
    child,
    config = require('../../server/config/config.js')['deployment'];


// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));     // Notice because option default will flip in next major; http://goo.gl/bXjyyz

app.post('/webhook', function (req, res) {

    var i, stages = [
        {name: "development"},
        {name: "test-static-analyzer-passed"},
        {name: "test-unit-tests-passed"},
        {name: "acceptance"},
        {name: "production"}
    ];

    var cb = function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        ;

        var nodemailer = require('nodemailer');

        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.user,
                pass: config.password
            }
        });

        var subject = "Test results";
        if (error === "" || error === null) {
            subject += " ✔";
        } else {
            subject += " ✘";
        }

        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: config.userName + " <" + config.user + ">", // sender address
            to: config.to, // list of receivers
            subject: subject, // Subject line
            text: '<b>stdout</b><br>' + stdout + "<br><b>stderr</b><br>" + stderr + "<br><span style='color:red'><b>error</b><br>" + error, // plaintext body 'Hello world ✔'
            html: '<pre><b>stdout</b><br>' + stdout + "<br><br><b>stderr</b><br>" + stderr + "<br><br><span style='color:red'><b>error</b><br></span>" + error + "</pre>"// html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    };

    if (req.body.repository.url === config.repoUrl) {
        console.log('>>>>>req', req.body, '<<<<<<');
        console.log('Now do a git pull for the current branch');

        // executes `git pull`
        child = exec("git pull", cb);


        child = exec("./pullingAndTesting.sh", cb);

    }
    res.send({});
});


app.all('*', function (req, res) {
    console.log('!!!!!', req, '-----');
    res.send(404, {msg: 'Nothing here. This is the webhook for github'});
});

app.listen(config.port);

