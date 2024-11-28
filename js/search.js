// Select DOM elements
const mainWrapper = document.querySelector(".search_right");
const pagination = document.querySelector(".pagination");
const categoryCheckboxWrapper = document.querySelector(".sr_catagory_checkbox");
const descriptionCheckboxWrapper = document.querySelector(".dis_checkbox");
const sellerCheckboxWrapper = document.querySelector(".seller_checkbox"); // Added seller_checkbox wrapper
const rangeSlider = document.getElementById("range");
const rangeValueDisplay = document.getElementById("range_value");
const departureReadyCheckbox = document.getElementById("departureReady");
const highTimeCrewCheckbox = document.getElementById("highTimeCrew");
const departureReadyCountLabel = departureReadyCheckbox
  .closest("label")
  .querySelector("span");
const highTimeCrewCountLabel = highTimeCrewCheckbox
  .closest("label")
  .querySelector("span");

// Data payload for the API request
const data = {
  "from airport id": "1498592405823x491126318927854300",
  "to airport id": "1498583419008x958192316116765200",
  date_as_text: "2024-11-29",
  time_as_text: "11:45 AM",
  App_Out_Date_As_Text: "2024-11-29",
  pax: "2",
  date: "1732924800",
};

// API Request
fetch("https://jettly.com/api/1.1/wf/webflow_one_way_flight", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((apiData) => {
    const aircraftSets = [];
    if (apiData.response) {
      for (const key in apiData.response) {
        if (key.startsWith("aircraft_set_")) {
          aircraftSets.push(...apiData.response[key]);
        }
      }
    }

    // Pagination variables
    const itemsPerPage = 10;
    let currentPage = 1;

    // Filtered aircraft list
    let filteredByRangeSlider = [...aircraftSets];
    let selectedClasses = [];
    let selectedDescriptions = [];
    let selectedOperators = []; // Store selected operators
    let minYear = Math.min(
      ...aircraftSets.map((item) => item.year_of_manufacture_number)
    );
    let maxYear = new Date().getFullYear();

    // Initialize range slider
    rangeSlider.min = minYear;
    rangeSlider.max = maxYear;
    rangeSlider.value = minYear;
    rangeValueDisplay.textContent = `Filter by year: ${minYear}`;

    rangeSlider.addEventListener("input", (e) => {
      const selectedYear = parseInt(e.target.value, 10);
      rangeValueDisplay.textContent = `Filter by year: ${selectedYear}`;
      filterByYear(selectedYear);
    });

    const updateCheckboxCounts = () => {
      // Update counts for "Departure Ready"
      const departureReadyCount = filteredByRangeSlider.filter(
        (item) => item.departure_ready__boolean === true
      ).length;
      departureReadyCountLabel.textContent = `(${departureReadyCount})`;

      // Update counts for "High Time Crew"
      const highTimeCrewCount = filteredByRangeSlider.filter(
        (item) => item.high_time_crew__boolean === true
      ).length;
      highTimeCrewCountLabel.textContent = `(${highTimeCrewCount})`;

      // Update counts for class_text checkboxes
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

          const count = classCounts[className] || 0; // Default to 0 if no matches
          label.textContent = `(${count})`;
        });

      // Update counts for description_text checkboxes
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

          const count = descriptionCounts[description] || 0; // Default to 0 if no matches
          label.textContent = `(${count})`;
        });

      // Update counts for operator_txt_text checkboxes
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

          const count = operatorCounts[operator] || 0; // Default to 0 if no matches
          label.textContent = `(${count})`;
        });
    };

    const filterByYear = (year) => {
      filteredByRangeSlider = aircraftSets.filter(
        (item) => item.year_of_manufacture_number >= year
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

      currentPage = 1;
      renderPage(currentPage, filteredSets);
      renderPagination(filteredSets);
      updateCheckboxCounts();
    };

    const generateClassCheckboxes = () => {
      const classCounts = aircraftSets.reduce((acc, item) => {
        acc[item.class_text] = (acc[item.class_text] || 0) + 1;
        return acc;
      }, {});

      categoryCheckboxWrapper.innerHTML = "";

      Object.entries(classCounts).forEach(([className, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${className}" />
            ${className} <span>(${count})</span>
          </label>
        `;
        categoryCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = categoryCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            selectedClasses.push(value);
          } else {
            selectedClasses = selectedClasses.filter(
              (classText) => classText !== value
            );
          }
          filterData();
        });
      });
    };

    const generateDescriptionCheckboxes = () => {
      const descriptionCounts = aircraftSets.reduce((acc, item) => {
        acc[item.description_text] = (acc[item.description_text] || 0) + 1;
        return acc;
      }, {});

      descriptionCheckboxWrapper.innerHTML = "";

      Object.entries(descriptionCounts).forEach(([description, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${description}" />
            ${description} <span>(${count})</span>
          </label>
        `;
        descriptionCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = descriptionCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            selectedDescriptions.push(value);
          } else {
            selectedDescriptions = selectedDescriptions.filter(
              (descText) => descText !== value
            );
          }
          filterData();
        });
      });
    };

    // Function to generate operator checkboxes for ".seller_checkbox"
    const generateSellerCheckboxes = () => {
      const operatorCounts = aircraftSets.reduce((acc, item) => {
        acc[item.operator_txt_text] = (acc[item.operator_txt_text] || 0) + 1;
        return acc;
      }, {});

      sellerCheckboxWrapper.innerHTML = ""; // Clear existing checkboxes

      Object.entries(operatorCounts).forEach(([operator, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${operator}" />
            ${operator} <span>(${count})</span>
          </label>
        `;
        sellerCheckboxWrapper.appendChild(checkboxWrapper);
      });

      const checkboxes = sellerCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;
          if (checkbox.checked) {
            selectedOperators.push(value);
          } else {
            selectedOperators = selectedOperators.filter(
              (operator) => operator !== value
            );
          }
          filterData();
        });
      });
    };

    const renderPage = (page, filteredSets) => {
      mainWrapper.innerHTML = "";
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const itemsToRender = filteredSets.slice(start, end);

      itemsToRender.forEach((item) => {
        mainWrapper.innerHTML += `<div class="item_wrapper">
          <div class="item_img">
            <img src="${item.exterior_image1_image}" alt="" />
          </div>
          <div class="item_cnt">
            <p>${item.description_text}</p>
            <p>Year: ${item.year_of_manufacture_number}</p>
            <p>Class: ${item.class_text}</p>
          </div>
        </div>`;
      });
    };

    const renderPagination = (filteredSets) => {
      pagination.innerHTML = "";
      const totalPages = Math.ceil(filteredSets.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
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
    };

    // Initialize the checkboxes
    generateClassCheckboxes();
    generateDescriptionCheckboxes();
    generateSellerCheckboxes(); // Added to generate operator checkboxes

    departureReadyCheckbox.addEventListener("change", filterData);
    highTimeCrewCheckbox.addEventListener("change", filterData);

    // Initial update for counts and render
    updateCheckboxCounts();
    renderPage(currentPage, filteredByRangeSlider);
    renderPagination(filteredByRangeSlider);
  })
  .catch((error) => console.error("Error:", error));
