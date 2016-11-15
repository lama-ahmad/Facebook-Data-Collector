//loading extension
console.log("Chrome Extension is Loaded");

//chrome notifications begin at 0
var notificationsScroll = 0;
var notificationsWeb = 0;
var logoNotifications = 0;

//time for graph
var time = 0;
var stop = false;
function timer(){
	setTimeout(counter, 1000);
};
function counter(){
	time++; 
	if (stop == false){
		setTimeout(counter, 1000);
	}
	timeFunction(time);
}

//omnibox for facebook input
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
      {content: text + "photos", description: "Facebook is watching you."},
      {content: text + "location", description: "Facebook is watching you."},
      {content: text + "messages", description: "Facebook is watching you."},
      {content: text + "likes", description: "Facebook is watching you."},
      {content: text + "posts", description: "Facebook is watching you."},
    ]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
    alert('Facebook is watching you.');
});

//recieves scrolling seconds counter message (from scrollingContent.js to background.js)
//recieves external data boolean (from externalContent.js to background.js)
//onMessage acts everytime a message is sent
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log("Scrolling Communication Completed. Recieved: " + request.secondsCounter);
	if (request.secondsCounter){
		sendResponse({farewell: "You just gave Facebook private information based on scrolling!"});
		notificationsScroll++;
		console.log("Your scroll data is: " + notificationsScroll);
		logoNotifications = notificationsScroll + notificationsWeb; 
		chrome.browserAction.setBadgeText({text: logoNotifications.toString()});
		scrollingFunction(notificationsScroll);
	}
	else if (request.externalData){
		sendResponse({farewell: "You just gave Facebook private information based on pages visited!"});
		notificationsWeb++;
		console.log("Your website data is: " + notificationsWeb);
		logoNotifications = notificationsScroll + notificationsWeb;
		chrome.browserAction.setBadgeText({text: logoNotifications.toString()});
		webFunction(notificationsWeb);
	}
});

//notifications are restarted everytime the user opens the popup window (from popup.js to background.js)
//onConnect acts everytime popup window is opened
chrome.extension.onConnect.addListener(function(port){
	console.log("Notifications Communication Completed.");
	console.log("Total time on Facebook: " + time);
	port.onMessage.addListener(function(request, sender, sendResponse){
		if (request == "Check my notifications!"){
			stop = true;
			clearInterval(counter);
			port.postMessage("Notifications are checked!");
			chrome.browserAction.setBadgeText({text: '✔'});

		}
	});
});

//clock
if (!stop){
	timer();
}

function scrollingFunction(){
	return notificationsScroll;
}
function webFunction(){
	return notificationsWeb;
}
function timeFunction(){
	return time;
}

scrollingFunction();
webFunction();
timeFunction();



