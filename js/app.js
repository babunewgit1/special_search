var swiper = new Swiper(".feature_swipper", {
  slidesPerView: 9,
  spaceBetween: 30,
  navigation: {
    nextEl: ".fea_right",
    prevEl: ".fea_left",
  },
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    577: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 9,
      spaceBetween: 50,
    },
  },
});

var swiper = new Swiper(".myswiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".city_right",
    prevEl: ".city_left",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    577: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

var swiper = new Swiper(".rent_swipper", {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: ".rent_right",
    prevEl: ".rent_left",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    577: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

var swiper = new Swiper(".exp_swipper", {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: ".exp_right",
    prevEl: ".exp_left",
  },

  breakpoints: {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    577: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

var swiper = new Swiper(".blog_swipper", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".blg_right",
    prevEl: ".blg_left",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    577: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

var swiper = new Swiper(".ptswipper", {
  slidesPerView: 5,
  spaceBetween: 24,
  navigation: {
    nextEl: ".pt_right",
    prevEl: ".pt_left",
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    577: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

var swiper = new Swiper(".rv_slider_wrapper", {
  slidesPerView: 4,
  spaceBetween: 24,
  navigation: {
    nextEl: ".rbx_right",
    prevEl: ".rvxleft",
  },

  breakpoints: {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    577: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1760: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

var swiper = new Swiper(".lg_swipper", {
  slidesPerView: 6,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
  },

  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    577: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
});

// ===================================
//    tab one start
// ===================================

// const itemList = document.querySelector(".fmsugg");
// const fromInput = document.querySelector(".fm_input");
// const itemListTo = document.querySelector(".toolist");
// const toInput = document.querySelector(".tooinput");
// const oneFormId = document.querySelector(".oneformhidden");
// const oneToId = document.querySelector(".onetohidden");

// //! display item in from input (tab one)
// itemList.addEventListener("click", function (e) {
//   fromInput.value = "";
//   oneFormId.textContent = "";
//   if (e.target.classList.contains("form_item_para")) {
//     fromInput.value = e.target.textContent;
//     oneFormId.textContent = e.target.nextElementSibling.textContent;
//     itemList.style.display = "none";
//   }
// });

// //! display item on foucs in from input (tab one)
// fromInput.addEventListener("focus", function () {
//   itemList.style.display = "block";
//   itemListTo.style.display = "none";
// });

// // ================================================

// //! display item in to input (tab one)
// itemListTo.addEventListener("click", function (e) {
//   toInput.value = "";
//   oneToId.textContent = "";
//   if (e.target.classList.contains("form_item_para")) {
//     toInput.value = e.target.textContent;
//     oneToId.textContent = e.target.nextElementSibling.textContent;
//     itemListTo.style.display = "none";
//   }
// });

// //! display item on to in from input (tab one)
// toInput.addEventListener("focus", function () {
//   itemListTo.style.display = "block";
//   itemList.style.display = "none";
// });

// // ===================================
// //    tab two start
// // ===================================
// const fmtwlist = document.querySelector(".fmtwlist");
// const fmtwinput = document.querySelector(".fmtwinput");
// const totwlist = document.querySelector(".totwlist");
// const totwinput = document.querySelector(".totwinput");
// const roundFromId = document.querySelector(".roundfromid");
// const roundToId = document.querySelector(".roundtoid");

// //! display item in from input (tab two)
// fmtwlist.addEventListener("click", function (e) {
//   roundFromId.textContent = "";
//   fmtwinput.value = "";
//   if (e.target.classList.contains("form_item_para")) {
//     fmtwinput.value = e.target.textContent;
//     roundFromId.textContent = e.target.nextElementSibling.textContent;
//     fmtwlist.style.display = "none";
//   }
// });

// //! display item on foucs in from input (tab two)
// fmtwinput.addEventListener("focus", function () {
//   fmtwlist.style.display = "block";
//   totwlist.style.display = "none";
// });

// //! display item in to input (tab two)
// totwlist.addEventListener("click", function (e) {
//   roundToId.textContent = "";
//   totwinput.value = "";
//   if (e.target.classList.contains("form_item_para")) {
//     totwinput.value = e.target.textContent;
//     roundToId.textContent = e.target.nextElementSibling.textContent;
//     totwlist.style.display = "none";
//   }
// });

// //! display item on foucs in to input (tab two)
// totwinput.addEventListener("focus", function () {
//   totwlist.style.display = "block";
//   fmtwlist.style.display = "none";
// });

// // ===================================
// //    tab three start
// // ===================================
// const fmthlist = document.querySelector(".fmthlist");
// const fmthinput = document.querySelector(".fmthinput");
// const tothlist = document.querySelector(".tothlist");
// const tothinput = document.querySelector(".tothinput");

// //! display item in from input (tab three)
// fmthlist.addEventListener("click", function (e) {
//   fmthinput.value = "";
//   if (e.target.classList.contains("form_item_para")) {
//     fmthinput.value = e.target.textContent;
//     fmthlist.style.display = "none";
//   }
// });

// //! display item on foucs in from input (tab three)
// fmthinput.addEventListener("focus", function () {
//   fmthlist.style.display = "block";
//   tothlist.style.display = "none";
// });

// //! display item in to input (tab three)
// tothlist.addEventListener("click", function (e) {
//   tothinput.value = "";
//   if (e.target.classList.contains("form_item_para")) {
//     tothinput.value = e.target.textContent;
//     tothlist.style.display = "none";
//   }
// });

// //! display item on foucs in to input (tab three)
// tothinput.addEventListener("focus", function () {
//   tothlist.style.display = "block";
//   fmthlist.style.display = "none";
// });

// // =================================
// //    apply for all
// // ================================

// //! reset the input field in page reload
// const allInput = document.querySelectorAll('.hmtrip form input[type="text"]');
// window.addEventListener("load", function () {
//   allInput.forEach((item) => {
//     item.value = "";
//   });
// });

// //! hide the list box when click in tab link
// const tabLink = document.querySelectorAll(".tab_link_box");
// tabLink.forEach((item) => {
//   item.addEventListener("click", function () {
//     itemList.style.display = "none";
//     itemListTo.style.display = "none";
//     fmtwlist.style.display = "none";
//     totwlist.style.display = "none";
//     tothlist.style.display = "none";
//     fmthlist.style.display = "none";
//   });
// });

//! star rating
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".rv_slide_item");
  items.forEach((item) => {
    const rating = parseFloat(item.querySelector(".ratting").textContent);

    const starContainer = item.querySelector(".star-rating");
    starContainer.innerHTML = "";

    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      const star = document.createElement("span");
      star.classList.add("star");
      if (i <= Math.floor(rating)) {
        star.classList.add("filled");
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        star.classList.add("half-filled");
      } else {
        star.classList.add("empty");
      }

      starContainer.appendChild(star);
    }
  });
});

//! read more
const paragraphs = document.querySelectorAll(".rv_slide_item_parra");
const maxLength = 180;

paragraphs.forEach((paragraph) => {
  const fullText = paragraph.textContent;

  if (fullText.length > maxLength) {
    paragraph.textContent = fullText.slice(0, maxLength) + "...";

    const readMoreContainer = paragraph.nextElementSibling;
    if (readMoreContainer && readMoreContainer.classList.contains("readbtn")) {
      const readMoreButton = document.createElement("button");
      readMoreButton.textContent = "Read More";
      readMoreContainer.appendChild(readMoreButton);

      document.querySelector(".review_text_para").textContent = "";

      readMoreButton.addEventListener("click", () => {
        document.querySelector(".review_text_para").textContent = fullText;
      });
    }
  }
});

//! input value increament and dicrement

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

inputUpDown("ivone", "minone", "maxone");
inputUpDown("Pex-2", "mintwo", "maxtwo");
inputUpDown("ivthree", "minthree", "maxthree");

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

// !=====================================================
//!           Home page api submission
//! =====================================================

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

// code for round trip api submition
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

// create multi city search dom
const addCity = document.querySelector(".city_add");
const multicityWrapper = document.querySelector(".multi_city_wrapper");

addCity.addEventListener("click", function () {
  multicityWrapper.innerHTML += `<div id="w-node-c20f4cc4-828c-71d7-364e-89ea8ff77ac7-16dbaa26" class="city_one">
    <div id="w-node-_7c14a8a7-1562-03d8-af01-9a38cc848119-16dbaa26" class="hmf_left">
        <div id="w-node-_7c14a8a7-1562-03d8-af01-9a38cc84811a-16dbaa26" class="hmtbcnt_form_input_box">
            <label for="field" class="hmtbcnt_form_label">From</label>
            <div class="input_with_icon">
                <input class="hmtbcnt_form_input jetboost-list-search-input-r43d fmthinput w-input" maxlength="256" name="From-3" data-name="From 3" placeholder="" type="text" id="From-3" required="" />
                <img loading="lazy" src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6730586b420dae5eaf21e2eb_gps.png" alt="" class="input_icon" />
            </div>
        </div>
        <div id="w-node-_7c14a8a7-1562-03d8-af01-9a38cc848120-16dbaa26" class="hmtbcnt_form_input_box">
            <label for="field" class="hmtbcnt_form_label">TO</label>
            <div class="input_with_icon">
                <input class="hmtbcnt_form_input jetboost-list-search-input-r9zz tothinput w-input" maxlength="256" name="To-3" data-name="To 3" placeholder="" type="text" id="To-3" required="" />
                <img loading="lazy" src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6730586b420dae5eaf21e2eb_gps.png" alt="" class="input_icon" />
            </div>
        </div>
    </div>
    <div id="w-node-_7c14a8a7-1562-03d8-af01-9a38cc848126-16dbaa26" class="hmf_right">
        <div id="w-node-_7c14a8a7-1562-03d8-af01-9a38cc848127-16dbaa26" class="hmtbcnt_form_input_box">
            <label for="field" class="hmtbcnt_form_label">DATE</label>
            <div class="input_with_icon"><input type="date" class="hmtbcnt_form_input date_input" /></div>
        </div>
        <div id="w-node-_7c14a8a7-1562-03d8-af01-9a38cc84812c-16dbaa26" class="hmtbcnt_form_input_box time">
            <label for="field" class="hmtbcnt_form_label">Time</label>
            <div class="input_with_icon">
                <div class="w-embed">
                    <div class="time-picker">
                        <input type="text" class="time-input" placeholder="Time" readonly="" />
                        <div class="time_picker_float">
                            <div class="controls">
                                <div class="control">
                                    <span class="increase-hour"></span>
                                    <span class="hour-display">12</span>
                                    <span class="decrease-hour"></span>
                                </div>
                                <div class="control">
                                    <span class="increase-minute"></span>
                                    <span class="minute-display">00</span>
                                    <span class="decrease-minute"></span>
                                </div>
                            </div>
                            <div class="ampm-controls">
                                <span class="decrease-ampm"></span>
                                <span class="ampm-display">AM</span>
                                <span class="increase-ampm"></span>
                            </div>
                            <span class="set-time">Set Time</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="w-node-_7c14a8a7-1562-03d8-af01-9a38cc848131-16dbaa26" class="hmtbcnt_form_input_box">
            <label for="field" class="hmtbcnt_form_label">PAx</label>
            <div class="input_with_icon pex">
                <div id="minthree" class="inde_icon"><img loading="lazy" src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67305c2e11a05b71fc8a4a50_minus.png" alt="" class="iconin" /></div>
                <input class="hmtbcnt_form_input pex_input inputvalue w-input" maxlength="256" name="Pex-3" data-name="Pex 3" placeholder="" valu="1" type="text" id="ivthree" required="" />
                <div id="maxthree" class="inde_icon"><img loading="lazy" src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67305c54ac02ab42b82e2fca_plus.png" alt="" class="iconin" /></div>
            </div>
        </div>
        <div id="w-node-_4bdcc838-839a-8364-abc2-6e852de5852a-16dbaa26" class="remove"><a href="#" class="sch_submit padding remove_city w-button">Remove</a></div>
    </div>
</div>
`;
});

// remove city
multicityWrapper.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove_city")) {
    const cityBlock = e.target.closest(".city_one");
    if (cityBlock) {
      cityBlock.remove();
    }
  }
});
// code for multi city api submition
let requestId;
const multiCityFlightRequest = document.querySelector(".multicity");
const secondButton = document.querySelector(".second-button");
const preloader = document.querySelector(".loading_animation");

multiCityFlightRequest.addEventListener("click", async function () {
  preloader.style.display = "flex";

  try {
    const response = await fetch(
      "https://jettly.com/api/1.1/wf/webflow_multirequest_create",
      {
        method: "POST",
      }
    );
    const data = await response.json();
    requestId = data.response.flightrequestid;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    preloader.style.display = "none";
  }
});

// secondButton.addEventListener("click", async function () {
//   if (!requestId) {
//     console.error(
//       "Request ID is not available. Please complete the first request."
//     );
//     return;
//   }

//   preloader.style.display = "block"; // Show preloader

//   try {
//     const response = await fetch(
//       `https://example.com/api/another_endpoint?requestId=${requestId}`,
//       {
//         method: "GET",
//       }
//     );
//     const data = await response.json();
//     console.log("Second API response:", data);
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     preloader.style.display = "none"; // Hide preloader
//   }
// });
