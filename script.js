var idsCollection = ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4",  "#5"];
var timeSlotCollection = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];
var shiftedTimeSlotCollection = ["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00",  "18:00:00"];
var todaywithTime = moment().format('MMMM Do YYYY, HH:mm:ss');
var todaywithouttime= moment().format('MMMM Do YYYY');
var  plannerContent = [];
var getLocalStorageData = JSON.parse(localStorage.getItem("planner-items"));
$("#currentDay").text(todaywithouttime)
if (getLocalStorageData !== null) {
 plannerContent = getLocalStorageData;
}

for (var i=0;i<idsCollection.length; i++) {
  var descriptionEl = $(idsCollection[i]);
  var buttonEl = descriptionEl.parent().parent().find("button");

  if ((todaywithTime) < (todaywithouttime +  ", " + timeSlotCollection[i])) { 
    descriptionEl.attr("class", "future");
    plannerContent.forEach(function(item) {
      if (idsCollection[i] === ("#" + (item["input-id"]))) {
        descriptionEl.val(item["input-value"]);
      }
    });
  }
  else if (((todaywithTime) >= (todaywithouttime +  ", " + timeSlotCollection[i])) &&  
          ((todaywithTime) < (todaywithouttime +  ", " + shiftedTimeSlotCollection[i])))
  {
    descriptionEl.attr("class", "present");
    plannerContent.forEach(function(item) {
      if (idsCollection[i] === ("#" + item["input-id"])) {
        descriptionEl.val(item["input-value"]);
      }
    });
  }
  else if ((todaywithTime) > (todaywithouttime +  ", " + timeSlotCollection[i])) {
    descriptionEl.attr("class", "past");
    $(".past").attr("disabled", "disabled");
    buttonEl.attr("disabled", true);
  }
}

$("button").on("click", function() {
  event.preventDefault();
  var container = $(this).parent().parent();  
  var inputValue = container.find("input").val();
  var inputId = container.find("input").attr("id");
  var textObj = {
    "input-id": inputId,
    "input-value": inputValue };
  
  if (textObj["input-value"] !== "") {
    plannerContent.push(textObj);
    localStorage.setItem("planner-items", JSON.stringify(plannerContent));
  }
});