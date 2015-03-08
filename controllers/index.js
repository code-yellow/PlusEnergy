'use strict';




var IndexModel = require('../models/index');

var Client = require('node-rest-client').Client;
var client = new Client();
var async = require('async');

module.exports = function (router) {

    router.get('/', function (req, res) {

        var model = new IndexModel();

        var resp;

        var accessToken = "NqVe8G1Nc5bmnfTD0GWmKpdkG6nv";

        var wtURL = "https://gateway.api.pcftest.com:9004/v1/fhir_rest/Observation?subject._id=a104&name=3141-9&date=>2014-01-01T12:00:000-08:00&date=<=2015-03-07T18:00:000-08:00&_sort:desc=date&_count=30";
        var stepURL = "https://gateway.api.pcftest.com:9004/v1/fhir_rest/Observation?subject._id=a104&name=41950-7&date=>2014-01-01T12:00:000-08:00&date=<=2015-03-07T18:00:000-08:00&_sort:desc=date&_count=30";
        var sleepURL = "https://gateway.api.pcftest.com:9004/v1/fhir_rest/Observation?subject._id=a104&name=8455148&date=>2014-01-01T12:00:000-08:00&date=<=2015-03-07T18:00:000-08:00&_sort:desc=date&_count=30";
        var moodURL = "https://gateway.api.pcftest.com:9004/v1/fhir_rest/Observation?subject._id=a104&name=52497-5&date=>2014-01-01T12:00:000-08:00&date=<=2015-03-07T18:00:000-08:00&_sort:desc=date&_count=30&_format=json";

        var args = {
            headers:{"Accept": "application/json","Authorization" : "Bearer "+accessToken}
        };
        //async parallel to get all patient data

        async.parallel({
                weight : function(callback){
                    //fetch all weight data
                    client.get(wtURL, args, function(data,response) {

                        var wtData = JSON.parse(data);
                        console.log('WT DATA '+wtData.entry.length);
                        callback(null, wtData);
                    });
                },
                steps : function(callback){
                    //fetch all weight data
                    client.get(stepURL, args, function(data,response) {

                        var stepData = JSON.parse(data);
                        console.log('STEP DATA '+stepData.entry.length);
                        callback(null, stepData);
                    });
                },
                sleep : function(callback){
                    //fetch all weight data
                    client.get(sleepURL, args, function(data,response) {

                        var sleepData = JSON.parse(data);
                        console.log('SLEEP DATA '+sleepData.entry.length);
                        callback(null, sleepData);
                    });
                },
                mood : function(callback){
                    //fetch all weight data
                    client.get(moodURL, args, function(data,response) {

                        var moodData = JSON.parse(data);
                        console.log('MOOD DATA '+moodData.entry.length);
                        callback(null, moodData);
                    });
                }
            },function(err, result) {



                function aggregate(param) {

                    var total = 0;
                    var current = 0;
                    var previous = 0;

                    var entryArray = param.entry;
                    for(var i=0; i< entryArray.length; i++) {

                        //console.log(entryArray[i].content.valueQuantity.value);

                        if(i < entryArray.length/2)
                            current += entryArray[i].content.valueQuantity.value;
                        else
                            previous += entryArray[i].content.valueQuantity.value;
                    }

                    console.log("CURRENT "+current);
                    console.log("PREV "+previous);

                    var trend = {
                        current : current / entryArray.length/2,
                        previous : previous / entryArray.length/2,
                        trend : "POS"
                    };

                    param.trend = trend;

                }

                var weightData = result.weight;
                console.log("WT DATA"+ weightData.id);
                var stepsData = result.steps;
                aggregate(weightData);
                aggregate(stepsData);

                resp = {
                    weightData : weightData,
                    stepsData : stepsData
                };

                res.render('index', resp);
            }
        );

    });

    /*router.get('/', function (req, res) {

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
            res.render('index', model);

        });


    });*/

};
