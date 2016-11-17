//loading content
console.log("External Content is Loaded");

///////////////////////////////////////////
///////// EXTERNAL DATA FUNCTION //////////
///////////////////////////////////////////

//create variable for notifications
var externalData = false;

//create an array
var arrayLength = 0;

//var for data
var webData = 0;

//checking for plugin
function init() {

//Create an array of scripts
var fbArray = document.getElementsByTagName('script');

//Go through array to see if it contains the facebook script
function searchArr(array) {
	for (var i = 0; i < array.length; i++){
		if (checkFB(array[i])){
			clearInterval(init);
			return true; 

		}
	}
	return false;
}

console.log(searchArr(fbArray));
console.log(fbArray.length); 
//check for iterations (global var), increments everytime 

	if (searchArr(fbArray) && fbArray.length != arrayLength){
		webData++;
		chrome.runtime.sendMessage({externalData: true}, function(response){
			console.log(response.farewell);
		});
		arrayLength = fbArray.length;
		console.log("Data: " + webData);
	}
}

//A function to check various different places where the facebook plugin might by
function checkFB(element) {
	if (element.src.toLowerCase().indexOf("connect.facebook.net") > -1)
		return true;
	else
		return false;
}


setInterval(init, 2000);
