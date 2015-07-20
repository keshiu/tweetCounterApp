var setUpTweetCounter = function(words) {
	var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	twitter,
	counts = {};
	console.log("words are: " + words);
	words.forEach(function(word) {
		counts[word] = 0;
		console.log("counts[" + word + "]" + counts[word]);
	});
	
	twitter = ntwitter(credentials);
	twitter.stream(
		"statuses/filter",
		{track: words},
		function(stream) {
			stream.on("data", function(tweet) {
				words.forEach(function(word) {
					if(tweet.text.indexOf(word) > -1) {
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