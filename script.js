$(document).ready(function () {
  // JS VARIABLES
  // Setting up local storage
  myStorage = window.localStorage;
  // check if use24hr is null if so set to false
  if (myStorage.getItem("use24hr") == null) {
    myStorage.setItem("use24hr", false);
  }

  // FUNCTION DEFINITIONS
  // Changing 24 hour time to 12 hour time
  function twelveHr(hour) {
    if (hour > 12) {
      return hour - 12 + "PM";
    } else {
      return hour + "AM";
    }
  }
  // Main page date and time
  function renderDate() {
    if (myStorage.getItem("use24hr") == "true") {
      $("#currentDay").text(moment().format("MMMM Do YYYY, H:mm:"));
    } else {
      $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:"));
    }
  }
  // Dynamically creating the forms for scheduling
  function renderPlanner() {
    var currentTime = moment().format("H");
    var currentClass = "";
    var isDisabled = "";
    for (i = 0; i < 9; i++) {
      var time = "";
      if (myStorage.getItem("use24hr") == "true") {
        time = 9 + i;
      } else {
        time = twelveHr(9 + i);
      }
      if (currentTime > 9 + i) {
        currentClass = "past";
        isDisabled = "";
      } else if (currentTime == 9 + i) {
        currentClass = "present";
        isDisabled = "";
      } else {
        currentClass = "future";
        isDisabled = "";
      }
      if (myStorage.getItem(twelveHr(9 + i)) == null) {
        myStorage.setItem(twelveHr(9 + i), " ");
      }
      var content = '<form class="row">';
      content += '<div class="col-md-1 hour">' + time + "</div>";
      content +=
        '<div class="col-md-10 description p-0"><textarea ' +
        isDisabled +
        ' class="' +
        currentClass +
        '" id="' +
        twelveHr(9 + i) +
        '">' +
        myStorage.getItem(twelveHr(9 + i)) +
        "</textarea></div>";
      content +=
        '<button class="col-md-1 saveBtn"><i class="far fa-save fa-lg"></i></button>';
      content += "</form>";
      $(".container").append(content);
    }

    renderCalander();
  }

  function renderCalander() {
    myStorage.setItem("theme", "light");
  }

  // Switches planner to 12 hour time system
  function renderAmPm() {
    $("#24hrs").removeClass("active");
    $("#12hour").addClass("active");
    myStorage.setItem("use24hr", false);
    $(".container").empty();
    renderPlanner();
  }
  // Switches the planner to 24 hour time system
  function render24hrs() {
    $("#12hour").removeClass("active");
    $("#24hrs").addClass("active");
    myStorage.setItem("use24hr", true);
    $(".container").empty();
    renderPlanner();
  }
  // FUNCTION CALLS
  // Begins the date display and update every second
  setInterval(renderDate, 1000);
  // creates the planner
  renderPlanner();
  // checks for toggle in local storage
  if (myStorage.getItem("use24hr") == "true") {
    render24hrs();
  } else {
    renderAmPm();
  }

  // EVENT LISTENERS
  // When a save button is clicked - save to local storage
  $(".saveBtn").click(function () {
    for (i = 0; i < 9; i++) {
      var time = twelveHr(9 + i);
      myStorage.setItem(time, $("#" + time).val());
    }
  });

  // Changes page to 12 hour clock
  $("#12hour").click(function () {
    renderAmPm();
  });
  // Changes page to 24 hour time
  $("#24hrs").click(function () {
    render24hrs();
  });
});
