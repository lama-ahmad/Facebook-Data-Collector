//loading content
console.log("Scrolling content is Loaded");

///////////////////////////////////////
///////// SCROLLING FUNCTION //////////
///////////////////////////////////////

//checks the amount of time spent on a post in facebook
//if you spend more than 5 seconds on a post, data is sent to facebook

//stop function for popup
var stop = false;
//data related to scroll
var scrollData = 0;
//scrolling on a page beings at 0 
var scroll = 0;
//create a lastScroll to check change
var lastScroll = 0;
//checks whether the user is scrolling or not, in this case the user is not scrolling
var scrolling = false;
//seconds counter is used to measure the seconds spend on facebook post
var secondsCounter = 0; 
//set a clock
var clock = 0;

//this function checks how much you have scrolled on facebook every second
function scrollingTime(){
	setTimeout(counter, 1000);
};

//counter starts
function counter(){
	//begin counting when user stops scrolling
	secondsCounter++; 
	//begin time in facebook
	clock++;
	//gets the scroll position y number in pixels
	window.addEventListener('scroll', function() {
		scroll = window.scrollY;
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
	//check if seconds counter reaches 5
	if (secondsCounter == 5 && scroll != lastScroll){
		//data is added a value for later use because secondsCounter must be reset everytime
		scrollData++;
		//change last scroll value to scroll every ten seconds
		lastScroll = scroll;
		//output data in console
		pieData = (scrollData*5/clock);
		console.log("Data: " + scrollData + " Time: " + clock/60 + " minutes");
		//seconds are reset
		secondsCounter = 0;
		//whenever counter reaches 5 seconds, a message is sent to background.js to create a notification
		chrome.runtime.sendMessage({secondsCounter: true}, function(response){
			console.log(response.farewell);
		});
	} if (stop == false){
		setTimeout(counter, 1000);
	}
} 

//opening up the popup will stop the application from running
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.message === "stop"){
		stop = true;
		clearInterval(counter);
		console.log("The scrolling function has stopped.");
	}
});

//if statement that tells the function whether to begin or to stop
if (stop){
	console.log("The scrolling function has stopped.");
} else {
	scrollingTime();
}
