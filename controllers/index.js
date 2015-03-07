'use strict';




var IndexModel = require('../models/index');

var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = function (router) {

    var model = new IndexModel();





    router.get('/', function (req, res) {

        var loginBody = {
            username : "mark.taylor",
            password : "Going4ther$"
        };

        var loginRequest = JSON.stringify(loginBody);

        var options = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer AmgRdwoxjKzvkhPsxDEvFsmLnmd0'
            }
        };

        var LOGIN_URL = "https://gateway.api.pcftest.com:9004/v1/oauth2/authorize/login";

        var args = {
            data: loginBody,
            headers:{"Content-Type": "application/json","Authorization" : "Bearer lKIiSdfhJOnPuogcyh7L8O99szSb"}
        };

        client.post(LOGIN_URL, args, function(data,response) {
            console.log('DATA '+JSON.stringify(data));
            res.render('test', model);

        });


    });

};
