//loading content
console.log("Content is Loaded");

//data related to scroll
data = 0;

// SCROLLING FUNCTION //
//checks the amount of time spent on a post in facebook
//if you spend more than 10 seconds on a post, data is sent to facebook
function scrollingTime(){
	//scrolling on a page beings at 0 (not really necessary though)
	var lastScroll = 0;
	//checks whether the user is scrolling or not, in this case the user is not scrolling
	var scrolling = false;
	//seconds counter is used to measure the seconds spend on facebook post
	var secondsCounter = 0; 
	//set a clock
	var clock = 0;
	//the set interval function adds to the counter up to 15 seconds
	setInterval(function(){ 
		//begin counting when user stops scrolling
		secondsCounter++; 
		//begin time in facebook
		clock++;
		//gets the scroll position y number in pixels
		window.addEventListener('scroll', function() {
			lastScroll = window.scrollY;
			//if user hasn't started or has stopped scrolling -> (if(false)) reset counter
			if (scrolling){
				window.requestAnimationFrame(function() {
					scrolling = false;
					secondsCounter = 0;
				});
			//if user begins scrolling print out statement -> if(!false) 
			} else if (!scrolling) {
				window.requestAnimationFrame(function() {
					scrolling = true;
					console.log("User is scrolling!");
				});
			}
		});
		//print out seconds counter
		console.log(secondsCounter);
		//check if seconds counter reaches 10
		if (secondsCounter == 10){
			//data is added a value for later use because secondsCounter must be reset everytime
			data++;
			//will be used in graphics
			pieData = (data*10/clock);
			console.log("Data: " + data + " Time: " + clock + " seconds");
			console.log("You have given " + pieData*100 + "% of data the time you have been scrolling!");
			//seconds are reset
			secondsCounter = 0;
			//whenever counter reaches 10 seconds, a message is sent to background.js to create a notification
			chrome.runtime.sendMessage({secondsCounter: true}, function(response){
				console.log(response.farewell);
			});
		}
	}, 1000);
};

scrollingTime();

// opening up the popup will stop the application from running
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
// 	if(request.message === "stop"){
// 		console.log("Stop Running");
// 	}
// });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
// 	if(request.message === "start"){
// 		scrollingTime();
// 	}
// });


