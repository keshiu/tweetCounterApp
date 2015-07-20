var setUpTweetCounter = function(words) {
    var ntwitter = require("ntwitter"),
    redis = require("redis"),
    credentials = require("./credentials.json"),
    twitter,
    redisClient,
    counts = {};
	
    twitter = ntwitter(credentials);
    redisClient = redis.createClient();
    redisClient.mget(words, function(err, results) {
        if (err !== null) {
    	    console.log("ERROR: " + err);
    	    return;
   	    }
   	    var i = 0;
   	    words.forEach(function(word) {
    	    counts[word] = parseInt(results[i],10) || 0;
    	    i++;
    	});
    });
    twitter.stream(
        "statuses/filter",
        {track: words},
        function(stream) {
            stream.on("data", function(tweet) {
                words.forEach(function(word) {
                    if(tweet.text.indexOf(word) > -1) {
                    	redisClient.incr(word);
                        counts[word] = counts[word] + 1;
                    }
                });		
            });
            stream.on('error', function(error, code) {
                console.log("My error: " + error + ": " + code);
            });
        }
    );

    setInterval(function() {
        for (var i = 0; i < words.length; i++) {
            console.log(words[i] + ": " + counts[words[i]]);
        };
    }, 3000);
    return counts;
}
module.exports = setUpTweetCounter;