/**
 * Created by shykulkarni on 12/11/14.
 */

var Twit = require('twit');

var T = new Twit({
    consumer_key: 'IZE9lQfLkQ3hwekK58DRY01h9',
    consumer_secret: 'zbeW2sLQssXaXVlTdkdnJ64LM1HiKSzoAVOn98wP0bJY0HB2N6',
    access_token: '2848854163-bUkywbrwhYtati1ZWIRfb8yaAHjo7L6wL4DLixw',
    access_token_secret: 'diwsJ26GwkxclczJ7Wd0geL1eXeJFzcn38gsek6eaWnGb'
});

/*function findCharityTwitter(twitter_screen_name, all_charity_tags, callback) {
    T.get('statuses/user_timeline', { screen_name: 'madhanrt', count: 10 }, function(err, data, response) {
        if (err) {
            callback(err);
        }
        console.log(JSON.stringify(data));
        var matching_tags = [];
        for(var j=0 ; j < all_charity_tags.length ; j++) {
            for(var i=0 ; i < data.length ; i++) {
                console.log("TWEET:'" + data[i].text);
                if(data[i].text && all_charity_tags[j] && (data[i].text.toLowerCase().indexOf(all_charity_tags[j].toLowerCase()) != -1)) {
                    matching_tags.push(all_charity_tags[j]);
                    break;
                }
            }
        }
        callback(undefined, matching_tags);
    });
}

findCharityTwitter('madhanrt', ['animal', 'beggar', 'cricket'], function(err, matching_tags){
   console.log("MATCHING TAGS:" + JSON.stringify(matching_tags));
});*/



var Twitter = function () {

    this.findTwitterFeeds = function (twitter_screen_name, callback) {
        var cat;
        T.get('statuses/user_timeline', { screen_name: 'madhanrt', count: 10 }, function(err, data, response) {
            if (err) {
                callback(err);
            }
            else if (data) {
                console.log(data[0].text);

                if(data[0].text.indexOf("yoga") > -1) {
                    cat = "1";
                }
                if(data[0].text.indexOf("garden") > -1) {
                    cat = "2";
                }
                if(data[0].text.indexOf("hiking") > -1) {
                    cat = "3";
                }
                if(data[0].text.indexOf("mma") > -1) {
                    cat = "4";
                }
                callback(null, cat);
            }
        });

    }

};

module.exports = Twitter;
