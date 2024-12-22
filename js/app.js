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

// !=====================================================
//!           Home page api submission
//! =====================================================

const oneWaySubmit = document.querySelector(".onewaysubmit");
const roundTripSubmit = document.querySelector(".roundtrip");
const multiCitySubmit = document.querySelector(".multicity_submit");

oneWaySubmit.addEventListener("click", function () {
  const formIdInput = document.querySelector("input.onewayform").value;
  const toIdInput = document.querySelector("input.onewayto").value;
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

// code for multi city api submition

// Submission logic for multi-city
multiCitySubmit.addEventListener("click", function () {
  const multiFormPort = document.querySelectorAll(".multicityform");
  const multiToPort = document.querySelectorAll(".multicityto");
  const multiFormId = document.querySelectorAll(".multicityformid");
  const multiToId = document.querySelectorAll(".multicitytoid");
  const multiDateAsText = document.querySelectorAll(".multicitydate");
  const multiPax = document.querySelectorAll(".multicitypax");
  const timeAsText = "12:00 AM";
  let multiUnixTime = [];

  multiDateAsText.forEach((item) => {
    if (item.value) {
      const combinedDateTime = `${item.value} ${timeAsText}`;
      const dateObject = new Date(combinedDateTime);
      const timeStamp = Math.floor(dateObject.getTime() / 1000);
      multiUnixTime.push(timeStamp);
    }
  });

  let checkFormPort = true;
  let storeFormPort = [];
  multiFormPort.forEach((item) => {
    if (item.value) {
      storeFormPort.push(item.value);
    } else {
      checkFormPort = false;
    }
  });

  let checkToPort = true;
  let storeToPort = [];
  multiToPort.forEach((item) => {
    if (item.value) {
      storeToPort.push(item.value);
    } else {
      checkToPort = false;
    }
  });

  let checkFormId = true;
  let storeFormId = [];
  multiFormId.forEach((item) => {
    if (item.textContent) {
      storeFormId.push(item.textContent);
    } else {
      checkFormId = false;
    }
  });

  let checkToId = true;
  let storeToId = [];
  multiToId.forEach((item) => {
    if (item.textContent) {
      storeToId.push(item.textContent);
    } else {
      checkToId = false;
    }
  });

  let checkDate = true;
  let storeDate = [];
  let storeAppDate = [];
  let storeTime = [];
  multiDateAsText.forEach((item) => {
    if (item.value) {
      storeDate.push(item.value);
      storeAppDate.push(item.value);
      storeTime.push("12:00 AM");
    } else {
      checkDate = false;
    }
  });

  let checkPax = true;
  let storePax = [];
  multiPax.forEach((item) => {
    if (item.value) {
      storePax.push(item.value);
    } else {
      checkPax = false;
    }
  });

  if (
    checkFormPort &&
    checkToPort &&
    checkFormId &&
    checkToId &&
    checkDate &&
    checkPax
  ) {
    const storeData = {
      way: "multi-city",
      fromId: storeFormId,
      toId: storeToId,
      dateAsText: storeDate,
      timeAsText: storeTime,
      pax: storePax,
      appDate: storeAppDate,
      timeStamp: multiUnixTime,
      formIdInput: storeFormPort,
      toIdInput: storeToPort,
    };

    sessionStorage.setItem("storeData", JSON.stringify(storeData));
    console.log("Stored Data:", storeData);
    window.location.href = `/search-result`;
  } else {
    alert("Please fill up the form properly.");
  }
});
