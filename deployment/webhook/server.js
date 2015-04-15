/*jslint node:true*/

"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var sys = require('sys');
var exec = require('child_process').exec;
var app = express();
var child;

// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));     // Notice because option default will flip in next major; http://goo.gl/bXjyyz

app.post('/webhook', function (req, res) {
    if (req.body.repository.url === 'https://github.com/theotheu/hook-test') {
        console.log('>>>>>req', req.body, '<<<<<<');
        console.log('Now do a git pull');

        // executes `git pull`
        child = exec("git pull", function (error, stdout, stderr) {
            sys.print('stdout: ' + stdout);
            sys.print('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    }
    res.send({});
});

app.all('*', function (req, res) {
    console.log('!!!!!', req, '-----');
    res.send({msg: 'Nothing here. This is the webhook for github'});
});

app.listen(3333);


