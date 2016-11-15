//loading popup
console.log("Popup is Loaded");

//restart chrome extension
var restart = false;

//data variables from background.js
var scrolling = chrome.extension.getBackgroundPage().scrollingFunction();
var websites = chrome.extension.getBackgroundPage().webFunction();
var time = chrome.extension.getBackgroundPage().timeFunction();

console.log(scrolling);
console.log(websites);
console.log(time);

//connection between background.js and popup.js begins to check notifications
var port = chrome.extension.connect({
	name: "Notification Communication"
});
port.postMessage("Check my notifications!");
port.onMessage.addListener(function(request, sender, sendResponse){
	if(request == "Notifications are checked!"){
		console.log(":)");
	}
});

//connection between popup.js and scrollingContent.js to stop program from running when opened
chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
	console.log("Stop the scroll function!");
	var activeTab = tabs[0];
	chrome.tabs.sendMessage(activeTab.id, {"message": "stop"});
});

//pie chart
window.onload = function() {
	var chart = new CanvasJS.Chart("scrollingContainer",{
		title:{
			text: "Scrolling Time", 
			fontColor: "white"
		},
		backgroundColor: "rgba(11,30,71,.7)",
		legend:{maxWidth: 350, itemWidth: 120},
		data:[{
			type: "pie",
			fontColor: "white",
			dataPoints: [{ y: (scrolling*5/time)*100, indexLabel: "Data Given" }, { y: ((time-scrolling*5)/time)*100, indexLabel: "No Data Given" },]
		}]
	});
	chart.render();

	var chartTwo = new CanvasJS.Chart("externalContainer",{
		title:{
			text: "External Data",
			fontColor: "white"
		},
		axisX: {valueFormatString: " "},
		backgroundColor: "rgba(11,30,71,.7)",
		data: [{
			dataPoints: [{y: websites, indexLabel:"{y}"},]
		}]
	});
	chartTwo.render();
}

