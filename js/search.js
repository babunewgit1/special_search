const storedData = sessionStorage.getItem("one_way");
let way;
if (storedData) {
  const findWay = JSON.parse(storedData);
  const wayValue = findWay.way;
  way = wayValue;
} else {
  console.log("'one_way' data not found in sessionStorage.");
}

if (way === "one_way") {
  const oneWayData = sessionStorage.getItem("one_way");

  if (oneWayData) {
    const sessionData = JSON.parse(oneWayData);
    apiUrl = "https://jettly.com/api/1.1/wf/webflow_one_way_flight";
    data = {
      "from airport id": sessionData.fromId,
      "to airport id": sessionData.toId,
      date_as_text: sessionData.dateAsText,
      time_as_text: sessionData.timeAsText,
      App_Out_Date_As_Text: sessionData.appDate,
      pax: sessionData.pax,
      date: sessionData.timeStamp,
    };
  } else {
    console.error("No data found in sessionStorage under the key 'one_way'");
  }
}

// Select DOM elements
const mainWrapper = document.querySelector(".search_right");
const pagination = document.querySelector(".pagination");
const categoryCheckboxWrapper = document.querySelector(".sr_catagory_checkbox");
const descriptionCheckboxWrapper = document.querySelector(".dis_checkbox");
const sellerCheckboxWrapper = document.querySelector(".seller_checkbox");
const argusCheckboxWrapper = document.querySelector(".argus_checkbox");
const isBaoCheckboxWrapper = document.querySelector(".is_bao");
const wyvernCheckboxWrapper = document.querySelector(".wyvern");
const animalCheckboxWrapper = document.querySelector(".amenities");
const othersCheckboxWrapper = document.querySelector(".otherscheck");
const fuelCheckboxWrapper = document.querySelector(".fuel_stop");
const rangeSlider = document.getElementById("range");
const rangeValueDisplay = document.getElementById("range_value");
const departureReadyCheckbox = document.getElementById("departureReady");
const highTimeCrewCheckbox = document.getElementById("highTimeCrew");
const extSlider = document.getElementById("extslider");
const extValueDisplay = document.getElementById("exttextvalue");
const intSlider = document.getElementById("intslider");
const intValueDisplay = document.getElementById("inttextvalue");
const insSlider = document.getElementById("insslider");
const insValueDisplay = document.getElementById("instextvalue");
const searchInputBox = document.getElementById("searchBox");
const finalResultParagraph = document.getElementById("finalresult");
let sliderClass;
let operatorId;
let flightRequestId;

const departureReadyCountLabel = departureReadyCheckbox
  .closest("label")
  .querySelector("span");
const highTimeCrewCountLabel = highTimeCrewCheckbox
  .closest("label")
  .querySelector("span");

const loader = document.querySelector(".loading_animation");
const showLoader = () => {
  loader.style.display = "flex";
};
const hideLoader = () => {
  loader.style.display = "none";
};

showLoader();

// API Request
fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((apiData) => {
    const aircraftSets = [];
    const longestFlight = apiData.response.longest_flight_leg;
    flightRequestId = apiData.response.flightrequest;

    console.log(apiData.response);

    // date collection and formation for dropdown
    // const departureDates =
    //   apiData.response.flight_legs[0].departure_dates_as_texts_list_text[0];
    // const date = new Date(departureDates);
    // const options = { year: "numeric", month: "short", day: "numeric" };
    // const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    //   date
    // );

    if (apiData.response) {
      for (const key in apiData.response) {
        if (key.startsWith("aircraft_set_")) {
          aircraftSets.push(...apiData.response[key]);
        }
      }
    }

    finalResultParagraph.textContent = ` ${aircraftSets.length} `;

    hideLoader();

    // Pagination variables
    const itemsPerPage = 20;
    let currentPage = 1;

    // Filtered aircraft list
    let filteredByRangeSlider = [...aircraftSets];
    let selectedClasses = [];
    let selectedDescriptions = [];
    let selectedOperators = [];
    let selectedArgusFilters = [];
    let selectedIsBaoFilters = [];
    let selectedWyvernFilters = [];
    let selectedanimalFilters = [];
    let selectedOthersFilters = [];
    let fuelFilters = [];
    let minYear = Math.min(
      ...aircraftSets.map((item) => item.year_of_manufacture_number)
    );
    let maxYear = new Date().getFullYear();

    let minYearExt = Math.min(
      ...aircraftSets
        .map((item) => item.exterior_refurbished_year_number)
        .filter((year) => typeof year === "number" && !isNaN(year))
    );

    let minYearInt = Math.min(
      ...aircraftSets
        .map((item) => item.refurbished_year_number)
        .filter((year) => typeof year === "number" && !isNaN(year))
    );

    let minYearIns = Math.min(
      ...aircraftSets
        .map((item) => item.insured_amount_number)
        .filter((year) => typeof year === "number" && !isNaN(year))
    );

    let maxYearIns = Math.max(
      ...aircraftSets
        .map((item) => item.insured_amount_number)
        .filter((year) => typeof year === "number" && !isNaN(year))
    );

    // Initialize range slider
    rangeSlider.min = minYear;
    rangeSlider.max = maxYear;
    rangeSlider.value = minYear;
    rangeValueDisplay.textContent = `Newer than: ${minYear}`;

    rangeSlider.addEventListener("input", (e) => {
      const selectedYear = parseInt(e.target.value, 10);
      rangeValueDisplay.textContent = `Newer than: ${selectedYear}`;
      filterByYear(selectedYear);
    });

    // Initialize extrange slider
    extSlider.min = minYearExt;
    extSlider.max = maxYear;
    extSlider.value = minYearExt;
    extValueDisplay.textContent = `Greater than: ${minYearExt}`;

    extSlider.addEventListener("input", (e) => {
      const selectedYear = parseInt(e.target.value, 10);
      extValueDisplay.textContent = `Greater than: ${selectedYear}`;
      extFilterByYear(selectedYear);
    });

    // Initialize Intrange slider
    intSlider.min = minYearInt;
    intSlider.max = maxYear;
    intSlider.value = minYearInt;
    intValueDisplay.textContent = `Greater than: ${minYearInt}`;

    intSlider.addEventListener("input", (e) => {
      const selectedYear = parseInt(e.target.value, 10);
      intValueDisplay.textContent = `Greater than: ${selectedYear}`;
      intFilterByYear(selectedYear);
    });

    // Initialize Insrange slider
    insSlider.min = minYearIns;
    insSlider.max = maxYearIns;
    insSlider.step = 250000;
    insSlider.value = minYearIns;
    insValueDisplay.textContent = `Greater than: ${minYearIns}`;

    insSlider.addEventListener("input", (e) => {
      const selectedYear = parseInt(e.target.value, 10);
      insValueDisplay.textContent = `Greater than: ${selectedYear}`;
      insFilterByYear(selectedYear);
    });

    searchInputBox.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      filteredByRangeSlider = aircraftSets.filter((item) =>
        item.description_text.toLowerCase().includes(searchTerm)
      );

      // Reset pagination and re-render data
      currentPage = 1; // Reset to the first page
      renderPage(currentPage, filteredByRangeSlider);
      renderPagination(filteredByRangeSlider);
      updateCheckboxCounts(); // Update checkbox counts based on the filtered data
    });

    const generateCheckboxes = (wrapper, items, key, labelFormatter) => {
      wrapper.innerHTML = "";
      const counts = items.reduce((acc, item) => {
        const keyValue = item[key];
        acc[keyValue] = (acc[keyValue] || 0) + 1;
        return acc;
      }, {});

      Object.entries(counts).forEach(([value, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${value}" />
            ${labelFormatter(value)} <span>(${count})</span>
          </label>
        `;
        wrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = wrapper.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            if (wrapper === categoryCheckboxWrapper)
              selectedClasses.push(value);
            if (wrapper === descriptionCheckboxWrapper)
              selectedDescriptions.push(value);
            if (wrapper === sellerCheckboxWrapper)
              selectedOperators.push(value);
          } else {
            if (wrapper === categoryCheckboxWrapper)
              selectedClasses = selectedClasses.filter(
                (classText) => classText !== value
              );
            if (wrapper === descriptionCheckboxWrapper)
              selectedDescriptions = selectedDescriptions.filter(
                (descText) => descText !== value
              );
            if (wrapper === sellerCheckboxWrapper)
              selectedOperators = selectedOperators.filter(
                (operator) => operator !== value
              );
          }
          filterData();
        });
      });
    };

    const updateCheckboxCounts = () => {
      const recalculateFuelCounts = () => {
        const fuelCount = {
          Direct: 0,
          "1 Stop": 0,
          "2 Stop": 0,
        };

        filteredByRangeSlider.forEach((item) => {
          if (item.range_number < longestFlight) {
            // Categorize as Direct
            fuelCount["Direct"]++;
          } else if (item.range_number * 2 > longestFlight) {
            // Categorize as 1 Stop
            fuelCount["1 Stop"]++;
          } else if (item.range_number * 2 < longestFlight) {
            // Categorize as 2 Stop
            fuelCount["2 Stop"]++;
          }
        });

        return fuelCount;
      };

      // Get the updated fuel counts
      const fuelCount = recalculateFuelCounts();

      // Update the fuel stop checkbox counts in the UI
      fuelCheckboxWrapper.querySelectorAll(".checkbox_item").forEach((item) => {
        const checkbox = item.querySelector("input[type='checkbox']");
        const label = item.querySelector("label span");
        const filter = checkbox.value;

        // Check if fuelCount has a valid value for this filter
        if (fuelCount.hasOwnProperty(filter)) {
          label.textContent = `(${fuelCount[filter] || 0})`;
        } else {
          label.textContent = `(0)`;
        }
      });

      // Update departure ready counts
      const departureReadyCount = filteredByRangeSlider.filter(
        (item) => item.departure_ready__boolean === true
      ).length;
      departureReadyCountLabel.textContent = `(${departureReadyCount})`;

      // Update high-time crew counts
      const highTimeCrewCount = filteredByRangeSlider.filter(
        (item) => item.high_time_crew__boolean === true
      ).length;
      highTimeCrewCountLabel.textContent = `(${highTimeCrewCount})`;

      // Update class text counts
      const classCounts = filteredByRangeSlider.reduce((acc, item) => {
        acc[item.class_text] = (acc[item.class_text] || 0) + 1;
        return acc;
      }, {});

      categoryCheckboxWrapper
        .querySelectorAll(".checkbox_item")
        .forEach((item) => {
          const checkbox = item.querySelector("input[type='checkbox']");
          const label = item.querySelector("label span");
          const className = checkbox.value;

          label.textContent = `(${classCounts[className] || 0})`;
        });

      // Update description text counts
      const descriptionCounts = filteredByRangeSlider.reduce((acc, item) => {
        acc[item.description_text] = (acc[item.description_text] || 0) + 1;
        return acc;
      }, {});

      descriptionCheckboxWrapper
        .querySelectorAll(".checkbox_item")
        .forEach((item) => {
          const checkbox = item.querySelector("input[type='checkbox']");
          const label = item.querySelector("label span");
          const description = checkbox.value;

          label.textContent = `(${descriptionCounts[description] || 0})`;
        });

      // Update operator text counts
      const operatorCounts = filteredByRangeSlider.reduce((acc, item) => {
        acc[item.operator_txt_text] = (acc[item.operator_txt_text] || 0) + 1;
        return acc;
      }, {});

      sellerCheckboxWrapper
        .querySelectorAll(".checkbox_item")
        .forEach((item) => {
          const checkbox = item.querySelector("input[type='checkbox']");
          const label = item.querySelector("label span");
          const operator = checkbox.value;

          label.textContent = `(${operatorCounts[operator] || 0})`;
        });

      // Update Argus counts
      const argusCounts = {
        "Not Rated": filteredByRangeSlider.filter(
          (item) => item.argus_not_rated__boolean === true
        ).length,
        Gold: filteredByRangeSlider.filter(
          (item) => item.argus_gold__boolean === true
        ).length,
        "Gold +": filteredByRangeSlider.filter(
          (item) => item.argus_gold____boolean === true
        ).length,
        Platinum: filteredByRangeSlider.filter(
          (item) => item.argus_platinum__boolean === true
        ).length,
      };

      argusCheckboxWrapper
        .querySelectorAll(".checkbox_item")
        .forEach((item, index) => {
          const label = item.querySelector("label span");
          label.textContent = `(${Object.values(argusCounts)[index] || 0})`;
        });

      // Update IS-BAO counts
      const isBaoCounts = {
        "Not Rated": filteredByRangeSlider.filter(
          (item) => item.is_bao_not_rated__boolean === true
        ).length,
        Registered: filteredByRangeSlider.filter(
          (item) => item.is_bao_registered__boolean === true
        ).length,
      };

      isBaoCheckboxWrapper
        .querySelectorAll(".checkbox_item")
        .forEach((item, index) => {
          const label = item.querySelector("label span");
          label.textContent = `(${Object.values(isBaoCounts)[index] || 0})`;
        });

      // Update Wyvern counts
      const wyvernCounts = {
        "Not Rated": filteredByRangeSlider.filter(
          (item) => item.wyvern_not_rated__boolean === true
        ).length,
        "Wyvern Registered": filteredByRangeSlider.filter(
          (item) => item.wyvern_registered__boolean === true
        ).length,
        "Wyvern Wingman": filteredByRangeSlider.filter(
          (item) => item.wyvern_wingman__boolean === true
        ).length,
      };

      wyvernCheckboxWrapper
        .querySelectorAll(".checkbox_item")
        .forEach((item, index) => {
          const label = item.querySelector("label span");
          label.textContent = `(${Object.values(wyvernCounts)[index] || 0})`;
        });

      // Update animal counts
      const animalCounts = {
        "Enclosed Lavatory": filteredByRangeSlider.filter(
          (item) => item.enclosed_lavatory__boolean === true
        ).length,
        "Pets Allowed": filteredByRangeSlider.filter(
          (item) => item.pet_friendly__boolean === true
        ).length,
        "Smoking Allowed": filteredByRangeSlider.filter(
          (item) => item.smoking_allowed__boolean === true
        ).length,
        "Wi-Fi (Ground based)": filteredByRangeSlider.filter(
          (item) => item.wi_fi_ground_based__boolean === true
        ).length,
        "Wi-Fi (Satellite based)": filteredByRangeSlider.filter(
          (item) => item.wi_fi_satellite_based__boolean === true
        ).length,
      };

      animalCheckboxWrapper
        .querySelectorAll(".checkbox_item")
        .forEach((item, index) => {
          const label = item.querySelector("label span");
          label.textContent = `(${Object.values(animalCounts)[index] || 0})`;
        });

      // Update others counts
      const othersCounts = {
        "Exclude owner approval": filteredByRangeSlider.filter(
          (item) => item.oa_required__boolean === true
        ).length,
        Cargo: filteredByRangeSlider.filter(
          (item) => item.cargo_capable__boolean === true
        ).length,
        Ambulance: filteredByRangeSlider.filter(
          (item) => item.ambulance_capable__boolean === true
        ).length,
        "Exclude transient": filteredByRangeSlider.filter(
          (item) => item.transient_aircraft__boolean === true
        ).length,
        "Exclude at homebase": filteredByRangeSlider.filter(
          (item) => item.at_home_base__boolean === true
        ).length,
      };

      othersCheckboxWrapper
        .querySelectorAll(".checkbox_item")
        .forEach((item, index) => {
          const label = item.querySelector("label span");
          label.textContent = `(${Object.values(othersCounts)[index] || 0})`;
        });
    };

    const filterByYear = (year) => {
      filteredByRangeSlider = aircraftSets.filter(
        (item) => item.year_of_manufacture_number >= year
      );
      filterData();
    };

    const extFilterByYear = (year) => {
      filteredByRangeSlider = aircraftSets.filter(
        (item) => item.exterior_refurbished_year_number >= year
      );
      filterData();
    };

    const intFilterByYear = (year) => {
      filteredByRangeSlider = aircraftSets.filter(
        (item) => item.refurbished_year_number >= year
      );
      filterData();
    };

    const insFilterByYear = (year) => {
      filteredByRangeSlider = aircraftSets.filter(
        (item) => item.insured_amount_number >= year
      );
      filterData();
    };

    const filterData = () => {
      let filteredSets = filteredByRangeSlider;

      if (selectedClasses.length > 0) {
        filteredSets = filteredSets.filter((item) =>
          selectedClasses.includes(item.class_text)
        );
      }

      if (selectedDescriptions.length > 0) {
        filteredSets = filteredSets.filter((item) =>
          selectedDescriptions.includes(item.description_text)
        );
      }

      if (selectedOperators.length > 0) {
        filteredSets = filteredSets.filter((item) =>
          selectedOperators.includes(item.operator_txt_text)
        );
      }

      if (selectedArgusFilters.length > 0) {
        selectedArgusFilters.forEach((filter) => {
          if (filter === "Not Rated") {
            filteredSets = filteredSets.filter(
              (item) => item.argus_not_rated__boolean === true
            );
          } else if (filter === "Gold") {
            filteredSets = filteredSets.filter(
              (item) => item.argus_gold__boolean === true
            );
          } else if (filter === "Gold +") {
            filteredSets = filteredSets.filter(
              (item) => item.argus_gold____boolean === true
            );
          } else if (filter === "Platinum") {
            filteredSets = filteredSets.filter(
              (item) => item.argus_platinum__boolean === true
            );
          }
        });
      }

      if (selectedIsBaoFilters.length > 0) {
        selectedIsBaoFilters.forEach((filter) => {
          if (filter === "Not Rated") {
            filteredSets = filteredSets.filter(
              (item) => item.is_bao_not_rated__boolean === true
            );
          } else if (filter === "Registered") {
            filteredSets = filteredSets.filter(
              (item) => item.is_bao_registered__boolean === true
            );
          }
        });
      }

      if (selectedWyvernFilters.length > 0) {
        selectedWyvernFilters.forEach((filter) => {
          if (filter === "Not Rated") {
            filteredSets = filteredSets.filter(
              (item) => item.wyvern_not_rated__boolean === true
            );
          } else if (filter === "Wyvern Registered") {
            filteredSets = filteredSets.filter(
              (item) => item.wyvern_registered__boolean === true
            );
          } else if (filter === "Wyvern Wingman") {
            filteredSets = filteredSets.filter(
              (item) => item.wyvern_wingman__boolean === true
            );
          }
        });
      }

      if (selectedanimalFilters.length > 0) {
        selectedanimalFilters.forEach((filter) => {
          if (filter === "Enclosed Lavatory") {
            filteredSets = filteredSets.filter(
              (item) => item.enclosed_lavatory__boolean === true
            );
          } else if (filter === "Pets Allowed") {
            filteredSets = filteredSets.filter(
              (item) => item.pet_friendly__boolean === true
            );
          } else if (filter === "Smoking Allowed") {
            filteredSets = filteredSets.filter(
              (item) => item.smoking_allowed__boolean === true
            );
          } else if (filter === "Wi-Fi (Ground based)") {
            filteredSets = filteredSets.filter(
              (item) => item.wi_fi_ground_based__boolean === true
            );
          } else if (filter === "Wi-Fi (Satellite based)") {
            filteredSets = filteredSets.filter(
              (item) => item.wi_fi_satellite_based__boolean === true
            );
          }
        });
      }

      if (selectedOthersFilters.length > 0) {
        selectedOthersFilters.forEach((filter) => {
          if (filter === "Exclude owner approval") {
            filteredSets = filteredSets.filter(
              (item) => item.oa_required__boolean === true
            );
          } else if (filter === "Cargo") {
            filteredSets = filteredSets.filter(
              (item) => item.cargo_capable__boolean === true
            );
          } else if (filter === "Ambulance") {
            filteredSets = filteredSets.filter(
              (item) => item.ambulance_capable__boolean === true
            );
          } else if (filter === "Exclude transient") {
            filteredSets = filteredSets.filter(
              (item) => item.transient_aircraft__boolean === true
            );
          } else if (filter === "Exclude at homebase") {
            filteredSets = filteredSets.filter(
              (item) => item.at_home_base__boolean === true
            );
          }
        });
      }

      if (departureReadyCheckbox.checked) {
        filteredSets = filteredSets.filter(
          (item) => item.departure_ready__boolean === true
        );
      }

      if (highTimeCrewCheckbox.checked) {
        filteredSets = filteredSets.filter(
          (item) => item.high_time_crew__boolean === true
        );
      }

      if (fuelFilters.length > 0) {
        filteredSets = filteredSets.filter((item) => {
          let stopCategory;
          if (item.range_number < longestFlight) {
            stopCategory = "Direct";
          } else if (item.range_number * 2 > longestFlight) {
            stopCategory = "1 Stop";
          } else if (item.range_number * 2 < longestFlight) {
            stopCategory = "2 Stop";
          }

          // Check if the item's stop category matches any selected fuel filter
          return fuelFilters.includes(stopCategory);
        });
      }

      if (filteredSets.length === 0) {
        mainWrapper.innerHTML = `<p class="no-results">No results found for the selected filters.</p>`;
        pagination.innerHTML = ""; // Clear pagination
        return;
      }

      currentPage = 1;
      renderPage(currentPage, filteredSets);
      renderPagination(filteredSets);
      updateCheckboxCounts();
    };

    const renderPage = (page, filteredSets) => {
      // direct data not in aircarft (common data for a single search)
      const distance =
        apiData.response.flight_legs[0].total_distance__statute_m__number;

      const hotDeals = apiData.response.hot_deal_aircraft;
      mainWrapper.innerHTML = "";
      if (hotDeals) {
        if (page === 1) {
          hotDeals.forEach((item, index) => {
            sliderClass = index;
            // const stopInfo =
            //   item.range_number < longestFlight
            //     ? "Direct"
            //     : item.range_number * 2 > longestFlight
            //     ? "1 Stop"
            //     : "2 Stop";

            const totalDistance =
              distance / item.cruise_speed_avg_fixedrate_number;
            const totalHours = Math.floor(totalDistance);
            const totalMinutes = Math.round((totalDistance - totalHours) * 60);
            const calculateTotal = Math.round(
              (distance / item.cruise_speed_avg_fixedrate_number) *
                item.price_per_hour_fixedrate_number *
                0.8
            ).toLocaleString();

            const allImageExt = Array.isArray(item.exterior_images_list_image)
              ? item.exterior_images_list_image
                  .map(
                    (imageUrl) =>
                      `<div class="swiper-slide"><div class="dyslideItem"><img src="${imageUrl}" alt="Aircraft Image" /></div></div>`
                  )
                  .join("")
              : "";

            const allImageInt = Array.isArray(item.interior_images_list_image)
              ? item.interior_images_list_image
                  .map(
                    (imageUrl) =>
                      `<div class="swiper-slide"><div class="dyslideItem"><img src="${imageUrl}" alt="Aircraft Image" /></div></div>`
                  )
                  .join("")
              : "";

            const checkExtLength = Array.isArray(
              item.exterior_images_list_image
            )
              ? item.exterior_images_list_image.length
              : 0;

            const checkIntLength = Array.isArray(
              item.interior_images_list_image
            )
              ? item.interior_images_list_image.length
              : 0;

            const amenities = Array.isArray(item.amenities_txt_list_text)
              ? item.amenities_txt_list_text
              : null;

            const words = amenities
              ? amenities
                  .map((item) => {
                    const firstLetter = item.split(" ")[0][0];
                    const lastFirstLetter = item.split(" ").slice(-1)[0][0];

                    return `
                      <div class="detleft_item">
                        <span>${firstLetter}${lastFirstLetter}</span>
                        <p>${item}</p>                      
                      </div>
                    `;
                  })
                  .join("")
              : `<p class="Notfoundarray">Amenities Not Listed? Contact Us for the Latest Details!</p>`;

            const arrivedTime = apiData.response.flight_legs[0].date_date;
            const dateObject = new Date(arrivedTime * 1000);
            const formattedDateStart = dateObject.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formattedTimeStart = dateObject.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            const hours = Math.floor(totalDistance);
            const minutes = Math.round((totalDistance - hours) * 60);
            const totalSeconds = hours * 3600 + minutes * 60;
            const finalTime = arrivedTime + totalSeconds;

            const dateObjectAfter = new Date(finalTime * 1000);
            const formattedDateEnd = dateObjectAfter.toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );
            const formattedTimeEnd = dateObjectAfter.toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }
            );

            mainWrapper.innerHTML += `
              <div class="item_block_wrapper hotwrapper">
                <div class="item_wrapper">
                  <div class="hot_headls_logo">
                    <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6752921836657f93c6cd2590_hotlogo.png" alt="" />
                    <span>Hot <br /> Deal </span>
                  </div>
                  <div class="item_img">
                    <img src="${item.exterior_image1_image}" alt="" />
                  </div>
                  <div class="item_cnt">
                    <h4>${item.description_text}</h4>
                    <p> and ${
                      item.class_text
                    } <img class="seat_logo" src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/674f4ca8521e970e24495468_seat.png" alt="seat_icon" />
                      <span>${item.pax_number}</span> seats
                    </p>
                    <div class="hot_feature">
                      <p>
                        <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67528f529e24322ef8d71586_check.png" alt="" />INSTANT BOOKING
                      </p>
                      <p>
                        <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67528f529e24322ef8d71586_check.png" alt="" />GUARANTEED PRICE
                      </p>
                      <p>
                        <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67528f529e24322ef8d71586_check.png" alt="" />GUARANTEED AVAILABLE
                      </p>
                      <p>
                        <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67528f529e24322ef8d71586_check.png" alt="" />AVAILABLE TO JET CARD HOLDERS ONLY
                      </p>
                    </div>
                  </div>
                  <div class="item_book hot_book">
                    <div class="itemstop">
                      <div class="entire">
                        <p>${item.description_text}.Entire aircraft</p>
                      </div>
                    </div>
                    <div class="price">
                      <h3>$ ${calculateTotal}</h3>
                      <h5>$ ${Math.round(
                        item.price_per_hour_fixedrate_number
                      ).toLocaleString()}/hr</h5>
                      <p>Taxes calculated at checkout</p>
                    </div>
                    <div class="bookingbutton">
                      <a class="button fill_button" href="#">Request A Book</a>
                      <button class="details-button button fill_button grey_button" data-index="${index}">View Details <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67459d1f63b186d24efc3bbe_Jettly-Search-Results-Page-(List-View-Details-Tab).png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="item_tab_block" data-index="${index}">
                  <div class="overflow_wrapper">
                      <div class="item_tab_heading_block">
                    <ul>
                      <li class="activetabitem" data-item="tab${index}img">Images</li>
                      <li data-item="tab${index}det">details</li>
                      <li data-item="tab${index}it">itinerary</li>
                      <li data-item="tab${index}op">operators</li>
                      <li data-item="tab${index}pl">policies</li>
                      <li data-item="tab${index}py">payments</li>
                      <li data-item="tab${index}ask">ask us a question</li>
                    </ul>
                  </div>
                  <div class="tab_item_cnt_wrapper">
                    <div data-cnt="tab${index}img" class="item_tab_one">
                      <div class="tab_one_heading">
                        <h3>${item.class_text} Exteriors</h3>
                        <p>Note: The images depicted are examples of ${
                          item.class_text
                        } and may not represent the specific aircraft you will be flying on.</p>
                      </div>
                      <div class="tab_one_slider ${
                        checkExtLength <= 3 ? "sliderOn" : ""
                      }">
                        <div class="swiper slide${sliderClass}block">
                          <div class="swiper-wrapper"> ${allImageExt} </div>
                        </div>
                        <div class="swipper_ctrl">
                          <span class="nav${sliderClass}prev">
                            <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6731c63ca921fbf5867f7906_blackleft.avif" alt="" />
                          </span>
                          <span class="nav${sliderClass}next">
                            <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6731c6505bf5a2a3eb0d037b_blackright.avif" alt="" />
                          </span>
                        </div>
                      </div>
                      <div class="tab_one_heading tab_one_next_heading">
                        <h3>${item.class_text} Interiors</h3>
                        <p>Note: The images depicted are examples of ${
                          item.class_text
                        } and may not represent the specific aircraft you will be flying on.</p>
                      </div>
                      <div class="tab_one_slider  ${
                        checkIntLength <= 3 ? "sliderOn" : ""
                      }">
                        <div class="swiper slide${index}int">
                          <div class="swiper-wrapper"> ${allImageInt} </div>
                        </div>
                        <div class="swipper_ctrl">
                          <span class="int${index}prev">
                            <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6731c63ca921fbf5867f7906_blackleft.avif" alt="" />
                          </span>
                          <span class="int${index}next">
                            <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6731c6505bf5a2a3eb0d037b_blackright.avif" alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}det" class="item_tab_one">
                      <div class="detailstb_wrapper">
                        <div class="detailstb_left">
                          <h3>Details</h3>
                          <div class="detailstb_left_det">
                            <div class="detailstb_left_det_item">
                              <p>Class:</p>
                              <p>${item.class_text}</p>
                            </div>
                            <div class="detailstb_left_det_item">
                              <p>Max Passengers:</p>
                              <p>${item.pax_number}</p>
                            </div>
                            <div class="detailstb_left_det_item">
                              <p>Year of make:</p>
                              <p>${item.year_of_manufacture_number}</p>
                            </div>
                            <div class="detailstb_left_det_item">
                              <p>Wyvern Safety Rated:</p>
                              <p>${item.wyvern_rating_text}</p>
                            </div>
                            <div class="detailstb_left_det_item">
                              <p>ARG/US Safety Rating: </p>
                              <p>${item.argus_us_rating_text}</p>
                            </div>
                            ${
                              item.insured_amount_number > 0
                                ? `
                                  <div class="detailstb_left_det_item">
                                    <p>Liability insurance: </p>
                                    <p>${item.insured_amount_number}</p>
                                  </div>
                                `
                                : ""
                            }
                          </div>
                        </div>
                        <div class="detailstb_left detailstb_right">
                          <h3>Amenities</h3>
                          <div class="detailstb_left_det">
                            ${words}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}it" class="item_tab_one">
                      <div class="inttabDet">
                        <h3>Flight legs</h3>
                        <div class="intdet_wrapper">
                          <div class="intdet_left">
                            <img src="${item.operator_logo_image}" alt="" />
                          </div>
                          <div class="intdet_middle">
                            <div class="intdet_middle_date">
                              <p class="takeoffdate">${formattedDateStart}</p>
                              <p class="landdate"> - Lands ${formattedDateEnd}</p>
                            </div>
                            <div class="inted_middle_time">
                              <p>${formattedTimeStart} - ${formattedTimeEnd}</p>
                            </div>
                            <div class="airportformatname">
                              <p>${
                                apiData.response.flight_legs[0]
                                  .mobile_app_from_airport_name_short_text
                              } (${
              apiData.response.flight_legs[0]
                .mobile_app_from_airport_iata_code_text
                ? apiData.response.flight_legs[0]
                    .mobile_app_from_airport_iata_code_text
                : apiData.response.flight_legs[0]
                    .mobile_app_from_airport_icao_code_text
                ? apiData.response.flight_legs[0]
                    .mobile_app_from_airport_icao_code_text
                : apiData.response.flight_legs[0]
                    .mobile_app_from_airport_faa_code_text
            }) - ${
              apiData.response.flight_legs[0]
                .mobile_app_to_airport_name_short_text
            } (${
              apiData.response.flight_legs[0]
                .mobile_app_to_airport_iata_code_text
                ? apiData.response.flight_legs[0]
                    .mobile_app_to_airport_iata_code_text
                : apiData.response.flight_legs[0]
                    .mobile_app_to_airport_icao_code_text
                ? apiData.response.flight_legs[0]
                    .mobile_app_to_airport_icao_code_text
                : apiData.response.flight_legs[0]
                    .mobile_app_to_airport_faa_code_text
            })</p>

          
                            </div>
                            <div class="operator_textlist">
                              <p>${item.operator_txt_text} . ${
              item.class_text
            } . ${item.description_text}</p>
                            </div>   
                            ${
                              item.range_number >= longestFlight
                                ? `<div class="fuelstop"><p> <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6753e62479df68bd6de939cd_Jettly-Search-Results-Page-(List-View-Itinerary-Tab).png" alt="" /> Possible fuel stop enroute -  <span>+20 mins</span></p></div>`
                                : ""
                            }
                           
                          </div>
                          <div class="indetright_wrapper">
                            <div class="indet_right">
                              <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6753e928907492da22caf7fe_flighticon.png" alt="" />
                              <span>Flight time</span>
                              <p>${totalHours} H ${totalMinutes} M</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}op" class="item_tab_one">
                      <div class="opadetails">
                        <h3>Operator</h3>
                        <div class="opadet_wrapper">
                          <div class="opadet_top">
                            <div class="opadet_top_left">
                              <p>${item.operator_txt_text}</p>
                              <img src="${item.operator_logo_image}" alt="" />
                            </div>
                            <div class="opadet_top_middle">
                              <p><span>Response rate:</span> 100%</p>
                              <p><span>Avg. response time:</span> <1 Hrs.</p>
                              <p><span>Aircraft:</span> 2</p>
                              <p><span>Address:</span> ${
                                item
                                  .base_airport_fixed_address_geographic_address
                                  .address
                              }</p>
                              <p><span>Hours:</span> 24 Hours</p>
                              <p><span>Certificate ID:</span> Ask us</p>
                            </div>
                            <div class="opadet_top_right">
                              <iframe src="https://www.google.com/maps?q=${
                                item
                                  .base_airport_fixed_address_geographic_address
                                  .address
                              }&output=embed" frameborder="0"></iframe>
                            </div>
                          </div>
                          <div class="opadet_bottom">
                            <div class="opadet_bottom_heading">
                              <ul>
                                <li><img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754085d1d9a01ce66e3a259_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></li>
                                <li>0.00  |  0</li>
                                <li><span>Reviews</span></li>
                              </ul>
                            </div>
                            <div class="opadet_bottom_review">
                              <div class="opadet_bottom_review_left">
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>5 Stars</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>4 Stars</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>3 Stars</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>2 Stars</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>1 Star</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                              </div>
                              <div class="opadet_bottom_review_right">
                                <h3>Rating Breakdown</h3>
                                <div class="opadet_bottom_review_right_item">
                                  <p>Seller communication level <span>0.0 <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67540aa6fb2976ffafcecdf2_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></span></p>
                                  <p>Recommended to other passengers <span>0.0 <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67540aa6fb2976ffafcecdf2_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></span></p>
                                  <p>Service as described <span>0.0 <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67540aa6fb2976ffafcecdf2_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></span></p>
                                   <p>Flight cancellation rate <span>0% <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67540aa6fb2976ffafcecdf2_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}pl" class="item_tab_one">
                      <div class="poli_wrapper">
                        <h3>Available fare classes</h3>  
                        <div class="poli_box_wrapper">
                          <div class="polibox">
                            <div class="polibox_heading">
                              <h3>Value <span>+ $0</span></h3>                              
                            </div>
                            <div class="polibox_cnt">
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>$95 Change Fee:</span> Applies to all flight modifications.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>Non-Refundable:</span> Flight fare is non-refundable for client-initiated cancellations.</p>
                              </div>
                            </div>
                          </div>
                          <div class="polibox polibox_two">
                            <div class="polibox_heading">
                              <h3>Flex <span>+ 5%</span></h3>
                              <span class="recom">Recommended</span>                              
                            </div>
                            <div class="polibox_cnt">
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p class="capitalize"><span>No Change Fee</span></p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>No Fee:</span> Cancel more than 336 hours (14 days) before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>100% Fee:</span> Cancel within 24 hours of departure (no refund).</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>75% Fee:</span> Cancel 24 – 96 hours before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>50% Fee:</span> Cancel 96 – 336 hours before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p class="capitalize"><span>Cancellations refunded in Jettly flight credits only</span></p>
                              </div>
                            </div>
                          </div>
                          <div class="polibox">
                            <div class="polibox_heading">
                              <h3>Premium <span>+ 10%</span></h3>
                            </div>
                            <div class="polibox_cnt">
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p class="capitalize"><span>No Change Fee</span></p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>No Fee:</span> Cancel more than 168 hours (7 days) before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>100% Fee:</span> Cancel within 24 hours of departure (no refund).</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>75% Fee:</span> Cancel 24 – 96 hours before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>50% Fee:</span> Cancel 96 – 168 hours before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p class="capitalize"><span>Cancellations refunded to original payment method or in Jettly flight credits</span></p>
                              </div>
                            </div>
                          </div>
                        </div>  
                      </div>
                    </div>
                    <div data-cnt="tab${index}py" class="item_tab_one">
                      <div class="payment_tab">
                        <h3>Payments</h3>
                        <div class="payment_wrapper">
                          <div class="paymenttab_left">
                            <div class="paymenttab_left_item">
                              <div class="paymenttab_item_img">
                                <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                              </div>
                              <p>Pay in full upon aircraft availability confirmation by Alto Aerospace</p>
                            </div>
                            <div class="paymenttab_left_item">
                              <div class="paymenttab_item_img">
                                <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                              </div>
                              <p>Acceptable payment methods : Visa, MasterCard, American Express, Wire, ACH, Cryptocurrency</p>
                            </div>
                            <div class="paymenttab_left_item">
                              <div class="paymenttab_item_img">
                                <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                              </div>
                              <p>You will receive an invoice for the trip once the aircraft is confirmed</p>
                            </div>
                          </div>
                          <div class="paymenttab_right">
                            <p>Upon confirmation</p>
                            <div class="paymenttab_right_percent">
                              <div class="paybar">
                              </div>
                              <div class="paybar_text">
                                <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                <span>100%</span>
                              </div>
                            </div>
                            <p>Pay in full once the aircraft is confirmed available by Alto Aerospace.</p>
                            <div class="payment">
                              <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6755a86f952bce124bed0a9d_payment.png" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}ask" class="item_tab_one">
                      <div class="payment_tab">
                        <h3>Message Alto Aerospace</h3>
                        <div class="payment_wrapper askform">
                          <form>
                            <textarea required placeholder="Type your message here"></textarea>
                            <input type="hidden" value=${
                              item.managed_a_c_operator_custom_managed_air_operator
                            } />
                            <div class="submitbtn">
                              <button type="submit"><img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6755b3a876accbd14f83880f_plan.png" alt="" /></button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            `;
          });
        }
      }
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const itemsToRender = filteredSets.slice(start, end);

      if (itemsToRender) {
        itemsToRender.forEach((item, index) => {
          sliderClass = index;
          const stopInfo =
            item.range_number < longestFlight
              ? "Direct"
              : item.range_number * 2 > longestFlight
              ? "1 Stop"
              : "2 Stop";

          const totalDistance =
            distance / item.cruise_speed_avg_fixedrate_number;
          const totalHours = Math.floor(totalDistance);
          const totalMinutes = Math.round((totalDistance - totalHours) * 60);
          const calculateTotal = Math.round(
            (distance / item.cruise_speed_avg_fixedrate_number) *
              item.price_per_hour_fixedrate_number
          ).toLocaleString();

          const allImageExt = Array.isArray(item.exterior_images_list_image)
            ? item.exterior_images_list_image
                .map(
                  (imageUrl) =>
                    `<div class="swiper-slide"><div class="dyslideItem"><img src="${imageUrl}" alt="Aircraft Image" /></div></div>`
                )
                .join("")
            : "";

          const allImageInt = Array.isArray(item.interior_images_list_image)
            ? item.interior_images_list_image
                .map(
                  (imageUrl) =>
                    `<div class="swiper-slide"><div class="dyslideItem"><img src="${imageUrl}" alt="Aircraft Image" /></div></div>`
                )
                .join("")
            : "";

          const checkExtLength = Array.isArray(item.exterior_images_list_image)
            ? item.exterior_images_list_image.length
            : 0;

          const checkIntLength = Array.isArray(item.interior_images_list_image)
            ? item.interior_images_list_image.length
            : 0;

          const amenities = Array.isArray(item.amenities_txt_list_text)
            ? item.amenities_txt_list_text
            : null;

          const words = amenities
            ? amenities
                .map((item) => {
                  const firstLetter = item.split(" ")[0][0];
                  const lastFirstLetter = item.split(" ").slice(-1)[0][0];

                  return `
                    <div class="detleft_item">
                      <span>${firstLetter}${lastFirstLetter}</span>
                      <p>${item}</p>                      
                    </div>
                  `;
                })
                .join("")
            : `<p class="Notfoundarray">Amenities Not Listed? Contact Us for the Latest Details!</p>`;

          const arrivedTime = apiData.response.flight_legs[0].date_date;
          const dateObject = new Date(arrivedTime * 1000);
          const formattedDateStart = dateObject.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedTimeStart = dateObject.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          const hours = Math.floor(totalDistance);
          const minutes = Math.round((totalDistance - hours) * 60);
          const totalSeconds = hours * 3600 + minutes * 60;
          const finalTime = arrivedTime + totalSeconds;

          const dateObjectAfter = new Date(finalTime * 1000);
          const formattedDateEnd = dateObjectAfter.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedTimeEnd = dateObjectAfter.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          mainWrapper.innerHTML += `
            <div class="item_block_wrapper">
              <div class="item_wrapper">
                <div class="item_img">
                  <img src="${item.exterior_image1_image}" alt="" />
                </div>
                <div class="item_cnt">
                  <h4>${item.description_text}</h4>
                  <p>${
                    item.class_text
                  } <img class="seat_logo" src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/674f4ca8521e970e24495468_seat.png" alt="seat_icon" />
                    <span>${item.pax_number}</span> seats
                  </p>
                  <img src="${item.operator_logo_image}" alt="operator logo" />
                </div>
                <div class="item_book">
                  <div class="destination_flight">
                    <div class="portcodename">
                      <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/674f7273cb8e26b728b6fdd7_plan-road.png" alt="Plan road" />
                    </div>
                  </div>
                  <div class="itemstop">
                    <div class="itemstop_left">
                      <p>${apiData.response.departure_main_code}</p>
                    </div>
                    <div class="itemstop_middle">
                      <p>${stopInfo}</p>
                      <span>|</span>
                      <p>${totalHours} H ${totalMinutes} M</p>
                    </div>
                    <div class="itemstop_left">
                      <p>${apiData.response.arrival_main_code}</p>
                    </div>
                  </div>
                  <div class="price">
                    <h3>$ ${calculateTotal}</h3>
                    <h5>$ ${Math.round(
                      item.price_per_hour_fixedrate_number
                    ).toLocaleString()}/hr</h5>
                    <p>Taxes calculated at checkout</p>
                  </div>
                  <div class="bookingbutton">
                    <a class="button fill_button" href="#">Request A Book</a>
                    <button class="details-button button fill_button grey_button" data-index="${index}">View Details <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67459d1f63b186d24efc3bbe_Jettly-Search-Results-Page-(List-View-Details-Tab).png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="item_tab_block" data-index="${index}">
                <div class="overflow_wrapper">
                    <div class="item_tab_heading_block">
                  <ul>
                    <li class="activetabitem" data-item="tab${index}img">Images</li>
                    <li data-item="tab${index}det">details</li>
                    <li data-item="tab${index}it">itinerary</li>
                    <li data-item="tab${index}op">operators</li>
                    <li data-item="tab${index}pl">policies</li>
                    <li data-item="tab${index}py">payments</li>
                    <li data-item="tab${index}ask">ask us a question</li>
                  </ul>
                </div>
                <div class="tab_item_cnt_wrapper">
                  <div data-cnt="tab${index}img" class="item_tab_one">
                    <div class="tab_one_heading">
                      <h3>${item.class_text} Exteriors</h3>
                      <p>Note: The images depicted are examples of ${
                        item.class_text
                      } and may not represent the specific aircraft you will be flying on.</p>
                    </div>
                    <div class="tab_one_slider  ${
                      checkExtLength <= 3 ? "sliderOn" : ""
                    }">
                      <div class="swiper slide${sliderClass}block">
                        <div class="swiper-wrapper"> ${allImageExt} </div>
                      </div>
                      <div class="swipper_ctrl">
                        <span class="nav${sliderClass}prev">
                          <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6731c63ca921fbf5867f7906_blackleft.avif" alt="" />
                        </span>
                        <span class="nav${sliderClass}next">
                          <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6731c6505bf5a2a3eb0d037b_blackright.avif" alt="" />
                        </span>
                      </div>
                    </div>
                    <div class="tab_one_heading tab_one_next_heading">
                      <h3>${item.class_text} Interiors</h3>
                      <p>Note: The images depicted are examples of ${
                        item.class_text
                      } and may not represent the specific aircraft you will be flying on.</p>
                    </div>
                    <div class="tab_one_slider  ${
                      checkIntLength <= 3 ? "sliderOn" : ""
                    }">
                      <div class="swiper slide${sliderClass}int">
                        <div class="swiper-wrapper"> ${allImageInt} </div>
                      </div>
                      <div class="swipper_ctrl">
                        <span class="int${sliderClass}prev">
                          <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6731c63ca921fbf5867f7906_blackleft.avif" alt="" />
                        </span>
                        <span class="int${sliderClass}next">
                          <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6731c6505bf5a2a3eb0d037b_blackright.avif" alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div data-cnt="tab${index}det" class="item_tab_one">
                      <div class="detailstb_wrapper">
                        <div class="detailstb_left">
                          <h3>Details</h3>
                          <div class="detailstb_left_det">
                            <div class="detailstb_left_det_item">
                              <p>Class:</p>
                              <p>${item.class_text}</p>
                            </div>
                            <div class="detailstb_left_det_item">
                              <p>Max Passengers:</p>
                              <p>${item.pax_number}</p>
                            </div>
                            <div class="detailstb_left_det_item">
                              <p>Year of make:</p>
                              <p>${item.year_of_manufacture_number}</p>
                            </div>
                            <div class="detailstb_left_det_item">
                              <p>Wyvern Safety Rated:</p>
                              <p>${item.wyvern_rating_text}</p>
                            </div>
                            <div class="detailstb_left_det_item">
                              <p>ARG/US Safety Rating: </p>
                              <p>${item.argus_us_rating_text}</p>
                            </div>
                            ${
                              item.insured_amount_number > 0
                                ? `
                                  <div class="detailstb_left_det_item">
                                    <p>Liability insurance: </p>
                                    <p>${item.insured_amount_number}</p>
                                  </div>
                                `
                                : ""
                            }
                          </div>
                        </div>
                        <div class="detailstb_left detailstb_right">
                          <h3>Amenities</h3>
                          <div class="detailstb_left_det">
                            ${words}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}it" class="item_tab_one">
                      <div class="inttabDet">
                        <h3>Flight legs</h3>
                        <div class="intdet_wrapper">
                          <div class="intdet_left">
                            <img src="${item.operator_logo_image}" alt="" />
                          </div>
                          <div class="intdet_middle">
                            <div class="intdet_middle_date">
                              <p class="takeoffdate">${formattedDateStart}</p>
                              <p class="landdate"> - Lands ${formattedDateEnd}</p>
                            </div>
                            <div class="inted_middle_time">
                              <p>${formattedTimeStart} - ${formattedTimeEnd}</p>
                            </div>
                            <div class="airportformatname">
                              <p>${
                                apiData.response.flight_legs[0]
                                  .mobile_app_from_airport_name_short_text
                              } (${
            apiData.response.flight_legs[0]
              .mobile_app_from_airport_iata_code_text
              ? apiData.response.flight_legs[0]
                  .mobile_app_from_airport_iata_code_text
              : apiData.response.flight_legs[0]
                  .mobile_app_from_airport_icao_code_text
              ? apiData.response.flight_legs[0]
                  .mobile_app_from_airport_icao_code_text
              : apiData.response.flight_legs[0]
                  .mobile_app_from_airport_faa_code_text
          }) - ${
            apiData.response.flight_legs[0]
              .mobile_app_to_airport_name_short_text
          } (${
            apiData.response.flight_legs[0].mobile_app_to_airport_iata_code_text
              ? apiData.response.flight_legs[0]
                  .mobile_app_to_airport_iata_code_text
              : apiData.response.flight_legs[0]
                  .mobile_app_to_airport_icao_code_text
              ? apiData.response.flight_legs[0]
                  .mobile_app_to_airport_icao_code_text
              : apiData.response.flight_legs[0]
                  .mobile_app_to_airport_faa_code_text
          })</p>

          
                            </div>
                            <div class="operator_textlist">
                              <p>${item.operator_txt_text} . ${
            item.class_text
          } . ${item.description_text}</p>
                            </div>   
                            ${
                              item.range_number >= longestFlight
                                ? `<div class="fuelstop"><p> <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6753e62479df68bd6de939cd_Jettly-Search-Results-Page-(List-View-Itinerary-Tab).png" alt="" /> Possible fuel stop enroute -  <span>+20 mins</span></p></div>`
                                : ""
                            }
                           
                          </div>
                          <div class="indetright_wrapper">
                            <div class="indet_right">
                              <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6753e928907492da22caf7fe_flighticon.png" alt="" />
                              <span>Flight time</span>
                              <p>${totalHours} H ${totalMinutes} M</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}op" class="item_tab_one">
                      <div class="opadetails">
                        <h3>Operator</h3>
                        <div class="opadet_wrapper">
                          <div class="opadet_top">
                            <div class="opadet_top_left">
                              <p>${item.operator_txt_text}</p>
                              <img src="${item.operator_logo_image}" alt="" />
                            </div>
                            <div class="opadet_top_middle">
                              <p><span>Response rate:</span> 100%</p>
                              <p><span>Avg. response time:</span> <1 Hrs.</p>
                              <p><span>Aircraft:</span> 2</p>
                              <p><span>Address:</span> ${
                                item
                                  .base_airport_fixed_address_geographic_address
                                  .address
                              }</p>
                              <p><span>Hours:</span> 24 Hours</p>
                              <p><span>Certificate ID:</span> Ask us</p>
                            </div>
                            <div class="opadet_top_right">
                              <iframe src="https://www.google.com/maps?q=${
                                item
                                  .base_airport_fixed_address_geographic_address
                                  .address
                              }&output=embed" frameborder="0"></iframe>
                            </div>
                          </div>
                          <div class="opadet_bottom">
                            <div class="opadet_bottom_heading">
                              <ul>
                                <li><img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754085d1d9a01ce66e3a259_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></li>
                                <li>0.00  |  0</li>
                                <li><span>Reviews</span></li>
                              </ul>
                            </div>
                            <div class="opadet_bottom_review">
                              <div class="opadet_bottom_review_left">
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>5 Stars</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>4 Stars</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>3 Stars</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>2 Stars</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                                <div class="reviewitem_block">
                                  <div class="obarleft">
                                    <p>1 Star</p>
                                  </div>
                                  <div class="obarmiddle">
                                    <span></span>
                                  </div>
                                  <div class="obaright">
                                    <p>(0)</p>
                                  </div>
                                </div>
                              </div>
                              <div class="opadet_bottom_review_right">
                                <h3>Rating Breakdown</h3>
                                <div class="opadet_bottom_review_right_item">
                                  <p>Seller communication level <span>0.0 <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67540aa6fb2976ffafcecdf2_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></span></p>
                                  <p>Recommended to other passengers <span>0.0 <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67540aa6fb2976ffafcecdf2_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></span></p>
                                  <p>Service as described <span>0.0 <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67540aa6fb2976ffafcecdf2_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></span></p>
                                   <p>Flight cancellation rate <span>0% <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/67540aa6fb2976ffafcecdf2_Jettly-Search-Results-Page-(List-View-Operators-Tab)-Recovered.png" alt="" /></span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}pl" class="item_tab_one">
                      <div class="poli_wrapper">
                        <h3>Available fare classes</h3>  
                        <div class="poli_box_wrapper">
                          <div class="polibox">
                            <div class="polibox_heading">
                              <h3>Value <span>+ $0</span></h3>                              
                            </div>
                            <div class="polibox_cnt">
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>$95 Change Fee:</span> Applies to all flight modifications.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>Non-Refundable:</span> Flight fare is non-refundable for client-initiated cancellations.</p>
                              </div>
                            </div>
                          </div>
                          <div class="polibox polibox_two">
                            <div class="polibox_heading">
                              <h3>Flex <span>+ 5%</span></h3>
                              <span class="recom">Recommended</span>                              
                            </div>
                            <div class="polibox_cnt">
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p class="capitalize"><span>No Change Fee</span></p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>No Fee:</span> Cancel more than 336 hours (14 days) before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>100% Fee:</span> Cancel within 24 hours of departure (no refund).</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>75% Fee:</span> Cancel 24 – 96 hours before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>50% Fee:</span> Cancel 96 – 336 hours before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p class="capitalize"><span>Cancellations refunded in Jettly flight credits only</span></p>
                              </div>
                            </div>
                          </div>
                          <div class="polibox">
                            <div class="polibox_heading">
                              <h3>Premium <span>+ 10%</span></h3>
                            </div>
                            <div class="polibox_cnt">
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p class="capitalize"><span>No Change Fee</span></p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>No Fee:</span> Cancel more than 168 hours (7 days) before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>100% Fee:</span> Cancel within 24 hours of departure (no refund).</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>75% Fee:</span> Cancel 24 – 96 hours before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p><span>50% Fee:</span> Cancel 96 – 168 hours before departure.</p>
                              </div>
                              <div class="polibox_cnt_item">
                                <div class="checkicon">
                                  <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                </div>
                                <p class="capitalize"><span>Cancellations refunded to original payment method or in Jettly flight credits</span></p>
                              </div>
                            </div>
                          </div>
                        </div>  
                      </div>
                    </div>
                    <div data-cnt="tab${index}py" class="item_tab_one">
                      <div class="payment_tab">
                        <h3>Payments</h3>
                        <div class="payment_wrapper">
                          <div class="paymenttab_left">
                            <div class="paymenttab_left_item">
                              <div class="paymenttab_item_img">
                                <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                              </div>
                              <p>Pay in full upon aircraft availability confirmation by Alto Aerospace</p>
                            </div>
                            <div class="paymenttab_left_item">
                              <div class="paymenttab_item_img">
                                <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                              </div>
                              <p>Acceptable payment methods : Visa, MasterCard, American Express, Wire, ACH, Cryptocurrency</p>
                            </div>
                            <div class="paymenttab_left_item">
                              <div class="paymenttab_item_img">
                                <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                              </div>
                              <p>You will receive an invoice for the trip once the aircraft is confirmed</p>
                            </div>
                          </div>
                          <div class="paymenttab_right">
                            <p>Upon confirmation</p>
                            <div class="paymenttab_right_percent">
                              <div class="paybar">
                              </div>
                              <div class="paybar_text">
                                <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6754150613f571f3ecee0471_check.png" alt="" />
                                <span>100%</span>
                              </div>
                            </div>
                            <p>Pay in full once the aircraft is confirmed available by Alto Aerospace.</p>
                            <div class="payment">
                              <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6755a86f952bce124bed0a9d_payment.png" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-cnt="tab${index}ask" class="item_tab_one">
                      <div class="payment_tab">
                        <h3>Message Alto Aerospace</h3>
                        <div class="payment_wrapper askform">
                          <form>
                            <textarea required placeholder="Type your message here"></textarea>
                            <input type="hidden" value=${
                              item.managed_a_c_operator_custom_managed_air_operator
                            } />
                            <div class="submitbtn">
                              <button type="submit"><img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6755b3a876accbd14f83880f_plan.png" alt="" /></button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
          `;
        });
      } else {
        console.log("Data not found");
      }

      attachDetailsButtonListeners();
      tabControl();
      submitMessage();
    };

    const renderPagination = (filteredSets) => {
      pagination.innerHTML = "";

      const totalPages = Math.ceil(filteredSets.length / itemsPerPage);
      const maxButtonsToShow = 5;

      // Calculate the range of buttons to show
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxButtonsToShow / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

      // Adjust startPage if near the end
      const adjustedStartPage = Math.max(1, endPage - maxButtonsToShow + 1);

      // Add "Prev" button
      const prevButton = document.createElement("button");
      prevButton.classList.add("pagiprev");
      prevButton.textContent = "";
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage, filteredSets);
          renderPagination(filteredSets);
        }
      });
      pagination.appendChild(prevButton);

      // Add numbered buttons
      for (let i = adjustedStartPage; i <= endPage; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "pagination-btn";
        if (i === currentPage) button.classList.add("active");

        button.addEventListener("click", () => {
          currentPage = i;
          renderPage(currentPage, filteredSets);
          renderPagination(filteredSets);
        });

        pagination.appendChild(button);
      }

      // Add "Next" button
      const nextButton = document.createElement("button");
      nextButton.classList.add("paginext");
      nextButton.textContent = "";
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage, filteredSets);
          renderPagination(filteredSets);
        }
      });
      pagination.appendChild(nextButton);
    };

    const generateArgusCheckboxes = () => {
      const argusCounts = {
        "Not Rated": aircraftSets.filter(
          (item) => item.argus_not_rated__boolean === true
        ).length,
        Gold: aircraftSets.filter((item) => item.argus_gold__boolean === true)
          .length,
        "Gold +": aircraftSets.filter(
          (item) => item.argus_gold____boolean === true
        ).length,
        Platinum: aircraftSets.filter(
          (item) => item.argus_platinum__boolean === true
        ).length,
      };

      argusCheckboxWrapper.innerHTML = "";

      Object.entries(argusCounts).forEach(([filter, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${filter}" />
            ${filter} <span>(${count})</span>
          </label>
        `;
        argusCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = argusCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            selectedArgusFilters.push(value);
          } else {
            selectedArgusFilters = selectedArgusFilters.filter(
              (filter) => filter !== value
            );
          }
          filterData();
        });
      });
    };

    const generateIsBaoCheckboxes = () => {
      const isBaoCounts = {
        "Not Rated": aircraftSets.filter(
          (item) => item.is_bao_not_rated__boolean === true
        ).length,
        Registered: aircraftSets.filter(
          (item) => item.is_bao_registered__boolean === true
        ).length,
      };

      isBaoCheckboxWrapper.innerHTML = "";

      Object.entries(isBaoCounts).forEach(([filter, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${filter}" />
            ${filter} <span>(${count})</span>
          </label>
        `;
        isBaoCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = isBaoCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            selectedIsBaoFilters.push(value);
          } else {
            selectedIsBaoFilters = selectedIsBaoFilters.filter(
              (filter) => filter !== value
            );
          }
          filterData();
        });
      });
    };

    const generateWyvernCheckboxes = () => {
      const wyvernCounts = {
        "Not Rated": aircraftSets.filter(
          (item) => item.wyvern_not_rated__boolean === true
        ).length,
        "Wyvern Registered": aircraftSets.filter(
          (item) => item.wyvern_registered__boolean === true
        ).length,
        "Wyvern Wingman": aircraftSets.filter(
          (item) => item.wyvern_wingman__boolean === true
        ).length,
      };

      wyvernCheckboxWrapper.innerHTML = "";

      Object.entries(wyvernCounts).forEach(([filter, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${filter}" />
            ${filter} <span>(${count})</span>
          </label>
        `;
        wyvernCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = wyvernCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            selectedWyvernFilters.push(value);
          } else {
            selectedWyvernFilters = selectedWyvernFilters.filter(
              (filter) => filter !== value
            );
          }
          filterData();
        });
      });
    };

    const generateAnimalCheckboxes = () => {
      const animalCount = {
        "Enclosed Lavatory": aircraftSets.filter(
          (item) => item.enclosed_lavatory__boolean === true
        ).length,
        "Pets Allowed": aircraftSets.filter(
          (item) => item.pet_friendly__boolean === true
        ).length,
        "Smoking Allowed": aircraftSets.filter(
          (item) => item.smoking_allowed__boolean === true
        ).length,
        "Wi-Fi (Ground based)": aircraftSets.filter(
          (item) => item.wi_fi_ground_based__boolean === true
        ).length,
        "Wi-Fi (Satellite based)": aircraftSets.filter(
          (item) => item.wi_fi_satellite_based__boolean === true
        ).length,
      };

      animalCheckboxWrapper.innerHTML = "";

      Object.entries(animalCount).forEach(([filter, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${filter}" />
            ${filter} <span>(${count})</span>
          </label>
        `;
        animalCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = animalCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            selectedanimalFilters.push(value);
          } else {
            selectedanimalFilters = selectedanimalFilters.filter(
              (filter) => filter !== value
            );
          }
          filterData();
        });
      });
    };

    const generateFuelCheckboxes = () => {
      const fuelCount = {
        Direct: 0, // Flights with range_number less than longestFlight
        "1 Stop": 0, // Flights with range_number * 2 greater than longestFlight
        "2 Stop": 0, // Flights with range_number * 2 less than longestFlight
      };

      // Categorize each item into one fuel stop category
      aircraftSets.forEach((item) => {
        if (item.range_number < longestFlight) {
          fuelCount["Direct"]++;
        } else if (item.range_number * 2 > longestFlight) {
          fuelCount["1 Stop"]++;
        } else {
          fuelCount["2 Stop"]++;
        }
      });

      // Clear and generate checkbox UI
      fuelCheckboxWrapper.innerHTML = "";

      Object.entries(fuelCount).forEach(([filter, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${filter}" />
            ${filter} <span>(${count})</span>
          </label>
        `;
        fuelCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = fuelCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            fuelFilters.push(value);
          } else {
            fuelFilters = fuelFilters.filter((filter) => filter !== value);
          }
          filterData();
        });
      });
    };

    const generateOthersCheckboxes = () => {
      const othersCheckboxCount = {
        "Exclude owner approval": aircraftSets.filter(
          (item) => item.oa_required__boolean === true
        ).length,
        Cargo: aircraftSets.filter(
          (item) => item.cargo_capable__boolean === true
        ).length,
        Ambulance: aircraftSets.filter(
          (item) => item.ambulance_capable__boolean === true
        ).length,
        "Exclude transient": aircraftSets.filter(
          (item) => item.transient_aircraft__boolean === true
        ).length,
        "Exclude at homebase": aircraftSets.filter(
          (item) => item.at_home_base__boolean === true
        ).length,
      };

      othersCheckboxWrapper.innerHTML = "";

      Object.entries(othersCheckboxCount).forEach(([filter, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${filter}" />
            ${filter} <span>(${count})</span>
          </label>
        `;
        othersCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = othersCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            selectedOthersFilters.push(value);
          } else {
            selectedOthersFilters = selectedOthersFilters.filter(
              (filter) => filter !== value
            );
          }
          filterData();
        });
      });
    };

    // Generate the filters
    generateCheckboxes(
      categoryCheckboxWrapper,
      aircraftSets,
      "class_text",
      (value) => value
    );
    generateCheckboxes(
      descriptionCheckboxWrapper,
      aircraftSets,
      "description_text",
      (value) => value
    );
    generateCheckboxes(
      sellerCheckboxWrapper,
      aircraftSets,
      "operator_txt_text",
      (value) => value
    );
    generateArgusCheckboxes();
    generateIsBaoCheckboxes();
    generateWyvernCheckboxes();
    generateAnimalCheckboxes();
    generateOthersCheckboxes();
    generateFuelCheckboxes();

    departureReadyCheckbox.addEventListener("change", filterData);
    highTimeCrewCheckbox.addEventListener("change", filterData);

    // Initial update for counts and render
    updateCheckboxCounts();
    renderPage(currentPage, filteredByRangeSlider);
    renderPagination(filteredByRangeSlider);

    // dom manupulation
    //! code for main details dropdown
    function attachDetailsButtonListeners() {
      document.querySelectorAll(".details-button").forEach((button) => {
        button.addEventListener("click", function () {
          const btnDataIndex = button.getAttribute("data-index");

          document.querySelectorAll(".item_tab_block").forEach((block) => {
            const blockDataIndex = block.getAttribute("data-index");

            if (blockDataIndex === btnDataIndex) {
              block.parentElement.classList.toggle("activeBtn");
              block.classList.toggle("activeTabPanel");
            } else {
              block.classList.remove("activeTabPanel");
              block.parentElement.classList.remove("activeBtn");
            }
          });
        });
      });
    }

    //! code for tab in details dropwon
    function tabControl() {
      document
        .querySelectorAll(".item_block_wrapper")
        .forEach((itemWrapper) => {
          const tabItems = itemWrapper.querySelectorAll(
            ".item_tab_heading_block ul li"
          );
          const tabContents = itemWrapper.querySelectorAll(".item_tab_one");
          tabItems.forEach((tabItem) => {
            tabItem.addEventListener("click", function () {
              const tabItemAttr = tabItem.getAttribute("data-item");
              tabItems.forEach((acitem) => {
                acitem.classList.remove("activetabitem");
              });
              tabItem.classList.add("activetabitem");
              tabContents.forEach((tabCnt) => {
                const tabCntAttr = tabCnt.getAttribute("data-cnt");

                if (tabItemAttr === tabCntAttr) {
                  tabCnt.style.display = "block";
                } else {
                  tabCnt.style.display = "none";
                }
              });
            });
          });
        });
    }

    //! Message submit api
    function submitMessage() {
      const messageForms = document.querySelectorAll(".askform form");
      messageForms.forEach((formBox) => {
        formBox.addEventListener("submit", async (e) => {
          e.preventDefault();
          const message = e.target[0].value;
          const operatorId = e.target[1].value;

          const payload = {
            operator_id: operatorId,
            flight_request_id: flightRequestId,
            message_text: message,
          };
          try {
            const response = await fetch(
              "https://jettly.com/api/1.1/wf/send_message",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );
            if (response.ok) {
              alert("Message sent successfully:");
            } else {
              alert("Failed to send message:");
            }
          } catch (error) {
            alert("Error occurred while sending message:");
          }
        });
      });
    }

    var swiper = new Swiper(`.slide${sliderClass}block`, {
      slidesPerView: 3,
      loop: true,
      navigation: {
        nextEl: `.nav${sliderClass}next`,
        prevEl: `.nav${sliderClass}prev`,
      },
      spaceBetween: 10,
    });

    var swiper = new Swiper(`.slide${sliderClass}int`, {
      slidesPerView: 3,
      loop: true,
      navigation: {
        nextEl: `.int${sliderClass}next`,
        prevEl: `.int${sliderClass}prev`,
      },
      spaceBetween: 10,
    });
    // dom
  })
  .catch((error) => console.error("Error:", error));

function showTab() {
  this.closest(".item_tab_block").classList.toggle("active_tab");
}
