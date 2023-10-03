// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const dayJsObject = dayjs();

  //function that listen for save button click and store to local storage
  function saveToLocalStorage() {
    console.log("click");
    let timeBlock = $(this).closest(".time-block");
    let blockId = timeBlock.attr("id");

    let value = timeBlock.find(".description").val().trim();
    localStorage.setItem(blockId, value);
  }

  //function that check current time and change for proper background color
  function setUpTimeBackground() {
    const formattedCurrentHour = dayJsObject.format("HH");
    let currentHour = parseInt(formattedCurrentHour);
    console.log(typeof currentHour);

    $(".time-block").each(function () {
      const timeBlock = $(this);
      const timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);

      //Remove existing class
      $(timeBlock).removeClass("past", "present", "future");

      //compare currentHour with time block's id
      if (timeBlockHour < currentHour) {
        $(timeBlock).addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(timeBlock).addClass("present");
      } else {
        $(timeBlock).addClass("future");
      }
    });
  }

//function to load saved info from local storage
  function loadFromLocalStorage() {
    $(".time-block").each(function () {
      let blockId = $(this).attr("id");
      let value = localStorage.getItem(blockId);

      if (value !== null) {
        $(this).find(".description").val(value);
      }
    });
  }

  //function that display current date
  const currentDate = () => {
    const formattedDate = dayJsObject.format("dddd, MMMM D");
    $("#currentDay").text(formattedDate);
  };
  currentDate();
  setUpTimeBackground();
  loadFromLocalStorage()

  $(".saveBtn").on("click", saveToLocalStorage);
});