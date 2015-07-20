var express = require("express"),
http = require("http"),
tweetCounter = require("./tweet_counter.js"),
counts,
app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
var words = ["cool", "lol", "hey"],
counts = tweetCounter(words);
app.get("/setUpTweetCounter.json", function(req, res) {
	res.json(counts);
});