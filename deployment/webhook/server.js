/*jslint node:true*/

"use strict";

var express = require('express'),
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
    };



    if (req.body.repository.url === config.repoUrl) {
        console.log('>>>>>req', req.body, '<<<<<<');
        console.log('Now do a git pull for the current branch');





        // executes `git pull`
        child = exec("git pull", cb);


        for(i=0; i<stages.length; i+=1) {
            console.log(">>>>> checking out " + + stages[i].name, "<<<<<");
            exec("git checkout " + stages[i].name, cb);
        }

        // restore branch
        exec("git checkout " + stages[0].name, cb);
    }
    res.send({});
});


app.all('*', function (req, res) {
    console.log('!!!!!', req, '-----');
    res.send(404, {msg: 'Nothing here. This is the webhook for github'});
});

app.listen(config.port);


