
var eventList = document.getElementById('event-list');
var evtSource = new EventSource("/events");

evtSource.onmessage = function(e) {
  var newElement = document.createElement("li");
  newElement.innerHTML = e.data;
  eventList.appendChild(newElement);
}
evtSource.addEventListener("date", function(e) {
  var newElement = document.createElement("li");
  newElement.innerHTML = "Date Event: " + e.data;
  eventList.appendChild(newElement);
}, false);
