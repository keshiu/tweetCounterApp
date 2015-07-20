var main = function() {
	"use strict";
	var insertCountsIntoDOM = function(counts) {
		$(".cool").text(counts.cool);
		$(".lol").text(counts.lol);
		$(".hey").text(counts.hey);
	};
	setInterval(function () {
		$.getJSON("/setUpTweetCounter.json", insertCountsIntoDOM);
	}, 5000);
	console.log("counts[cool] =");
	$.getJSON("/setUpTweetCounter.json", insertCountsIntoDOM);
};
$(document).ready(main);