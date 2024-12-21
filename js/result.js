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

// inputUpDown("ivone", "minone", "maxone");
// inputUpDown("Pex-2", "mintwo", "maxtwo");
// inputUpDown("ivthree", "minthree", "maxthree");
