const addWay = document.querySelector(".sa_way_name");
const flightWay = document.querySelectorAll(".sa_way_name_list");
const formIdInput = document.querySelector(".onewayform");
const toIdInput = document.querySelector(".onewayto");
const fromId = document.querySelector(".onewayformid");
const toId = document.querySelector(".onewaytoid");
const dateAsText = document.querySelector(".onewaydate");
const timeAsText = document.querySelector(".oneWayTime");
const pax = document.querySelector(".onewaypax");
const searchBox = document.querySelectorAll(".sa_way_search");
const jetInput = document.querySelectorAll(".jetinput");
const sugg = document.querySelector(".searchsugg");
const drpDownCollection = document.querySelectorAll(".from_cl_wrapper");

//var for round trip
const roundFrom = document.querySelector(".rfrom");
const roundTo = document.querySelector(".rto");
const roundDepDate = document.querySelector(".rdepdate");
const roundRetDate = document.querySelector(".rretdate");
const roundPax = document.querySelector(".rpax");
const roundFromId = document.querySelector(".roundfromid");
const roundToTd = document.querySelector(".roundtoid");

// getting data form session storage
const getsessionDate = sessionStorage.getItem("storeData");
const getstoredData = JSON.parse(getsessionDate);

if (!getstoredData) {
  window.location.href = `/`;
}

// show which way had selected by user
function dropdownList() {
  document.querySelector(".sa_way").addEventListener("click", () => {
    const dropdown = document.querySelector(".sa_way_dropdown");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  });
  addWay.textContent = getstoredData.way;
  flightWay.forEach((flightList) => {
    flightList.addEventListener("click", () => {
      addWay.textContent = flightList.textContent;
      flightList.parentElement.style.display = "none";
    });
  });
}

dropdownList();

// making tab
flightWay.forEach((item) => {
  item.addEventListener("click", () => {
    drpDownCollection.forEach((clItem) => {
      clItem.style.display = "none";
    });

    const wayFlightAttr = item.getAttribute("way");
    searchBox.forEach((search) => {
      const searchAttr = search.getAttribute("id");

      if (wayFlightAttr === searchAttr) {
        search.classList.add("active_way");
      } else {
        search.classList.remove("active_way");
      }
    });
  });
});

// active tab with session storage
if (getstoredData.way === "one way") {
  searchBox.forEach((item) => {
    item.classList.remove("active_way");
    document.getElementById("oneway").classList.add("active_way");
  });
} else if (getstoredData.way === "round trip") {
  searchBox.forEach((item) => {
    item.classList.remove("active_way");
    document.getElementById("twoway").classList.add("active_way");
  });
} else if (getstoredData.way === "multi city") {
  searchBox.forEach((item) => {
    item.classList.remove("active_way");
    document.getElementById("threeway").classList.add("active_way");
  });
} else {
  console.log("something error");
}

//fill input with session storage data for one way
function fillInputOneWay() {
  if (getstoredData.formIdInput) {
    formIdInput.value = getstoredData.formIdInput;
  }
  if (getstoredData.toIdInput) {
    toIdInput.value = getstoredData.toIdInput;
  }

  if (getstoredData.fromId) {
    fromId.textContent = getstoredData.fromId;
  }

  if (getstoredData.toId) {
    toId.textContent = getstoredData.toId;
  }
  if (getstoredData.dateAsText) {
    dateAsText.value = getstoredData.dateAsText;
  }

  if (getstoredData.pax) {
    pax.value = getstoredData.pax;
  }
}

//fill input with session storage data for roundTrip
function fillInputRound() {
  if (getstoredData.formIdInput) {
    roundFrom.value = getstoredData.formIdInput;
  }
  if (getstoredData.toIdInput) {
    roundTo.value = getstoredData.toIdInput;
  }

  if (getstoredData.fromId) {
    roundFromId.textContent = getstoredData.fromId;
  }

  if (getstoredData.toId) {
    roundToTd.textContent = getstoredData.toId;
  }
  if (getstoredData.dateAsText) {
    roundDepDate.value = getstoredData.dateAsText;
  }
  if (getstoredData.returnDateAsText) {
    roundRetDate.value = getstoredData.returnDateAsText;
  }
  if (getstoredData.pax) {
    roundPax.value = getstoredData.pax;
  }
}

if (getstoredData.way === "one way") {
  fillInputOneWay();
} else if (getstoredData.way === "round trip") {
  fillInputRound();
} else {
  console.log("Something Error");
}

// show jet input
jetInput.forEach((jetInput) => {
  jetInput.addEventListener("focus", () => {
    sugg.style.display = "block";
    const inputTarget = jetInput.getAttribute("target");
    drpDownCollection.forEach((dropitem) => {
      const dropAttr = dropitem.getAttribute("id");

      if (inputTarget === dropAttr) {
        dropitem.style.display = "block";
      } else {
        dropitem.style.display = "none";
      }
    });
  });
});

// ===================================
//    tab one start
// ===================================

const itemList = document.querySelector(".fmsugg");
const fromInput = document.querySelector(".fm_input");
const itemListTo = document.querySelector(".toolist");
const toInput = document.querySelector(".tooinput");
const oneFormId = document.querySelector(".oneformhidden");
const oneToId = document.querySelector(".onetohidden");

//! display item in from input (tab one)
itemList.addEventListener("click", function (e) {
  fromInput.value = "";
  oneFormId.textContent = "";
  if (e.target.classList.contains("form_item_para")) {
    fromInput.value = e.target.textContent;
    oneFormId.textContent = e.target.nextElementSibling.textContent;
    itemList.style.display = "none";
  }
});

//! display item on foucs in from input (tab one)
fromInput.addEventListener("focus", function () {
  itemList.style.display = "block";
  itemListTo.style.display = "none";
});

// ================================================

//! display item in to input (tab one)
itemListTo.addEventListener("click", function (e) {
  toInput.value = "";
  oneToId.textContent = "";
  if (e.target.classList.contains("form_item_para")) {
    toInput.value = e.target.textContent;
    oneToId.textContent = e.target.nextElementSibling.textContent;
    itemListTo.style.display = "none";
  }
});

//! display item on to in from input (tab one)
toInput.addEventListener("focus", function () {
  itemListTo.style.display = "block";
  itemList.style.display = "none";
});

// ===================================
//    tab two start
// ===================================
const fmtwlist = document.querySelector(".fmtwlist");
const fmtwinput = document.querySelector(".fmtwinput");
const totwlist = document.querySelector(".totwlist");
const totwinput = document.querySelector(".totwinput");
const roundFromIdNumber = document.querySelector(".roundfromid");
const roundToIdNumber = document.querySelector(".roundtoid");

//! display item in from input (tab two)
fmtwlist.addEventListener("click", function (e) {
  roundFromIdNumber.value = "";
  fmtwinput.value = "";
  if (e.target.classList.contains("form_item_para")) {
    fmtwinput.value = e.target.textContent;
    roundFromIdNumber.textContent = e.target.nextElementSibling.textContent;
    fmtwlist.style.display = "none";
  }
});

//! display item on foucs in from input (tab two)
fmtwinput.addEventListener("focus", function () {
  fmtwlist.style.display = "block";
  totwlist.style.display = "none";
});

//! display item in to input (tab two)
totwlist.addEventListener("click", function (e) {
  roundToIdNumber.value = "";
  totwinput.value = "";
  if (e.target.classList.contains("form_item_para")) {
    totwinput.value = e.target.textContent;
    roundToIdNumber.textContent = e.target.nextElementSibling.textContent;
    totwlist.style.display = "none";
  }
});

//! display item on foucs in to input (tab two)
totwinput.addEventListener("focus", function () {
  totwlist.style.display = "block";
  fmtwlist.style.display = "none";
});

// ===================================
//    tab three start
// ===================================
const fmthlist = document.querySelector(".fmthlist");
const fmthinput = document.querySelector(".fmthinput");
const tothlist = document.querySelector(".tothlist");
const tothinput = document.querySelector(".tothinput");

//! display item in from input (tab three)
fmthlist.addEventListener("click", function (e) {
  fmthinput.value = "";
  if (e.target.classList.contains("form_item_para")) {
    fmthinput.value = e.target.textContent;
    fmthlist.style.display = "none";
  }
});

//! display item on foucs in from input (tab three)
fmthinput.addEventListener("focus", function () {
  fmthlist.style.display = "block";
  tothlist.style.display = "none";
});

//! display item in to input (tab three)
tothlist.addEventListener("click", function (e) {
  tothinput.value = "";
  if (e.target.classList.contains("form_item_para")) {
    tothinput.value = e.target.textContent;
    tothlist.style.display = "none";
  }
});

//! display item on foucs in to input (tab three)
tothinput.addEventListener("focus", function () {
  tothlist.style.display = "block";
  fmthlist.style.display = "none";
});

class TimePicker {
  constructor(element) {
    this.element = element;
    this.timeInput = this.element.querySelector(".time-input");
    this.hourDisplay = this.element.querySelector(".hour-display");
    this.minuteDisplay = this.element.querySelector(".minute-display");
    this.ampmDisplay = this.element.querySelector(".ampm-display");
    this.timePickerFloat = this.element.querySelector(".time_picker_float");

    this.hours = 12;
    this.minutes = 0;
    this.isAM = true; // Default to AM

    this.init();
  }

  init() {
    this.updateDisplay();

    this.element
      .querySelector(".increase-hour")
      .addEventListener("click", () => {
        this.hours = (this.hours + 1) % 24;
        this.updateDisplay();
      });

    this.element
      .querySelector(".decrease-hour")
      .addEventListener("click", () => {
        this.hours = (this.hours - 1 + 24) % 24;
        this.updateDisplay();
      });

    this.element
      .querySelector(".increase-minute")
      .addEventListener("click", () => {
        this.minutes = (this.minutes + 15) % 60;
        if (this.minutes === 0) {
          this.hours = (this.hours + 1) % 24;
        }
        this.updateDisplay();
      });

    this.element
      .querySelector(".decrease-minute")
      .addEventListener("click", () => {
        this.minutes = (this.minutes - 15 + 60) % 60;
        if (this.minutes === 45) {
          this.hours = (this.hours - 1 + 24) % 24;
        }
        this.updateDisplay();
      });

    // Set AM
    this.element
      .querySelector(".decrease-ampm")
      .addEventListener("click", () => {
        if (!this.isAM) {
          // Change to AM only if currently PM
          this.isAM = true;
          this.ampmDisplay.textContent = "AM";
        }
      });

    // Set PM
    this.element
      .querySelector(".increase-ampm")
      .addEventListener("click", () => {
        if (this.isAM) {
          // Change to PM only if currently AM
          this.isAM = false;
          this.ampmDisplay.textContent = "PM";
        }
      });

    // Set time on button click
    this.element.querySelector(".set-time").addEventListener("click", () => {
      let displayHour;

      if (!this.isAM && this.hours === 12) {
        displayHour = 12; // Keep it as is for PM
      } else if (!this.isAM && this.hours < 12) {
        displayHour = this.hours + 12; // Convert PM hours to military time
      } else if (this.isAM && this.hours === 12) {
        displayHour = "00"; // Midnight case
      } else {
        displayHour = this.hours; // For AM hours
      }

      const formattedTime = `${(displayHour % 12 || 12)
        .toString()
        .padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")} ${
        this.isAM ? "AM" : "PM"
      }`;
      this.timeInput.value = formattedTime;

      // Hide controls after setting time
      this.hideControls();
    });

    // Show controls when input is clicked directly
    this.timeInput.addEventListener("click", () => {
      if (this.timePickerFloat.style.display === "block") {
        this.hideControls(); // Hide if already visible
      } else {
        this.showControls(); // Show if hidden
      }
    });

    // Hide controls when clicking outside of the picker area
    document.addEventListener("click", (event) => {
      const isClickInsidePicker =
        this.timeInput.contains(event.target) ||
        this.timePickerFloat.contains(event.target);

      if (!isClickInsidePicker) {
        this.hideControls();
      }
    });
  }

  updateDisplay() {
    // Update hour and minute displays
    const displayHour = this.hours % 12 || 12; // Wrap around for display
    this.hourDisplay.textContent = displayHour.toString().padStart(2, "0");
    this.minuteDisplay.textContent = this.minutes.toString().padStart(2, "0");
  }

  showControls() {
    // Show the control panel
    this.timePickerFloat.style.display = "grid";
  }

  hideControls() {
    // Hide the control panel
    this.timePickerFloat.style.display = "none";
  }
}

// Initialize all time pickers on the page
document
  .querySelectorAll(".time-picker")
  .forEach((picker) => new TimePicker(picker));

// pex increase decireas
function inputUpDown(fninput, fnminusButton, fnplusButton) {
  const input = document.getElementById(fninput);
  const minusButton = document.getElementById(fnminusButton);
  const plusButton = document.getElementById(fnplusButton);

  plusButton.addEventListener("click", () => {
    const currentValue = parseInt(input.value) || 0;
    input.value = currentValue + 1;
    checkMinusButton();
  });

  minusButton.addEventListener("click", () => {
    const currentValue = parseInt(input.value) || 1;
    if (currentValue > 0) {
      input.value = currentValue - 1;
    }
    checkMinusButton();
  });

  function checkMinusButton() {
    if (parseInt(input.value) <= 1) {
      minusButton.classList.add("disabled");
    } else {
      minusButton.classList.remove("disabled");
    }
  }

  checkMinusButton();
}

// send data to session storage
const oneWaySubmit = document.querySelector(".onewaysubmit");
const roundTripSubmit = document.querySelector(".roundtrip");
const multiCitySubmit = document.querySelector(".multicity");

oneWaySubmit.addEventListener("click", function () {
  const formIdInput = document.querySelector(".onewayform").value;
  const toIdInput = document.querySelector(".onewayto").value;
  const fromId = document.querySelector(".onewayformid").textContent;
  const toId = document.querySelector(".onewaytoid").textContent;
  const dateAsText = document.querySelector(".onewaydate").value;
  const timeAsText = "12:00 AM";
  const pax = document.querySelector(".onewaypax").value;
  const appDate = dateAsText;

  const combinedDateTime = `${dateAsText} ${timeAsText}`;
  const dateObject = new Date(combinedDateTime);

  const timeStamp = Math.floor(dateObject.getTime() / 1000);

  if (fromId && toId && dateAsText && pax && formIdInput && toIdInput) {
    const storeData = {
      way: "one way",
      fromId,
      toId,
      dateAsText,
      timeAsText,
      pax,
      appDate,
      timeStamp,
      formIdInput,
      toIdInput,
    };

    sessionStorage.setItem("storeData", JSON.stringify(storeData));
    window.location.href = `/search-result`;
  } else {
    alert("Please fill up the form properly");
  }
});

roundTripSubmit.addEventListener("click", function () {
  const formIdInput = document.querySelector(".rfrom").value;
  const toIdInput = document.querySelector(".rto").value;

  const fromInputReturn = document.querySelector(".rto").value;
  const toInputReturn = document.querySelector(".rfrom").value;

  const fromId = document.querySelector(".roundfromid").textContent;
  const toId = document.querySelector(".roundtoid").textContent;

  const returnFromId = document.querySelector(".roundtoid").textContent;
  const returnToId = document.querySelector(".roundfromid").textContent;

  const dateAsText = document.querySelector(".rdepdate").value;
  const returnDateAsText = document.querySelector(".rretdate").value;

  const timeAsText = "12:00 AM";
  const timeAsTextReturn = "12:00 AM";

  const pax = document.querySelector(".rpax").value;
  const paxReturn = pax;

  const appDate = dateAsText;
  const appDateReturn = returnDateAsText;

  const combinedDateTime = `${dateAsText} ${timeAsText}`;
  const dateObject = new Date(combinedDateTime);
  const timeStamp = Math.floor(dateObject.getTime() / 1000);

  const combinedDateTimeReturn = `${returnDateAsText} ${timeAsTextReturn}`;
  const dateObjectReturn = new Date(combinedDateTimeReturn);
  const timeStampReturn = Math.floor(dateObjectReturn.getTime() / 1000);

  if (formIdInput && toIdInput && dateAsText && returnDateAsText && pax) {
    const storeData = {
      way: "round trip",
      formIdInput,
      toIdInput,
      fromInputReturn,
      toInputReturn,
      fromId,
      toId,
      returnFromId,
      returnToId,
      dateAsText,
      returnDateAsText,
      timeAsText,
      timeAsTextReturn,
      pax,
      paxReturn,
      appDate,
      appDateReturn,
      timeStamp,
      timeStampReturn,
    };

    sessionStorage.setItem("storeData", JSON.stringify(storeData));
    window.location.href = `/search-result`;
  } else {
    alert("Please fill up the form properly");
  }
});

inputUpDown("ivone", "minone", "maxone");
inputUpDown("Pex-2", "mintwo", "maxtwo");
inputUpDown("ivthree", "minthree", "maxthree");
