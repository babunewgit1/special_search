// Select DOM elements
const mainWrapper = document.querySelector(".search_right");
const pagination = document.querySelector(".pagination");
const categoryCheckboxWrapper = document.querySelector(".sr_catagory_checkbox");
const rangeSlider = document.getElementById("range");
const rangeValueDisplay = document.getElementById("range_value");

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

    console.log(aircraftSets);

    // Pagination variables
    const itemsPerPage = 10;
    let currentPage = 1;

    // Filtered aircraft list
    let filteredByRangeSlider = [...aircraftSets]; // The array filtered by range slider
    let selectedClasses = [];
    let minYear = Math.min(
      ...aircraftSets.map((item) => item.year_of_manufacture_number)
    );
    let maxYear = new Date().getFullYear(); // Current year as the max year

    // Initialize range slider
    rangeSlider.min = minYear;
    rangeSlider.max = maxYear;
    rangeSlider.value = minYear; // Default value is the minimum year

    // Display the initial range value
    rangeValueDisplay.textContent = `Filter by year: ${minYear}`;

    // Event listener for the range slider to filter aircraft by year
    rangeSlider.addEventListener("input", (e) => {
      const selectedYear = parseInt(e.target.value, 10);
      rangeValueDisplay.textContent = `Filter by year: ${selectedYear}`;
      filterByYear(selectedYear);
    });

    // Function to filter aircraft based on the selected year from the range slider
    const filterByYear = (year) => {
      filteredByRangeSlider = aircraftSets.filter(
        (item) => item.year_of_manufacture_number >= year
      );
      filterByClass(); // Re-apply class filtering after year filtering
    };

    // Generate category checkboxes for all unique "class_text" values
    const generateCheckboxes = () => {
      // Count occurrences of each unique class_text value
      const classCounts = aircraftSets.reduce((acc, item) => {
        acc[item.class_text] = (acc[item.class_text] || 0) + 1;
        return acc;
      }, {});

      categoryCheckboxWrapper.innerHTML = "";

      // Create a checkbox for each unique class_text
      Object.entries(classCounts).forEach(([className, count]) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkbox_item");

        // Add checkbox and label
        checkboxWrapper.innerHTML = `
          <label>
            <input type="checkbox" value="${className}" />
            ${className}
          </label>
          <p class="count-text">${count} available</p>
        `;

        categoryCheckboxWrapper.appendChild(checkboxWrapper);
      });

      // Attach event listeners to checkboxes (but don't change count on click)
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
          filterByClass();
        });
      });
    };

    // Filter function for class_text (applies after range slider filtering)
    const filterByClass = () => {
      let tempFilteredSets = filteredByRangeSlider; // Use the filtered array by range slider
      if (selectedClasses.length > 0) {
        tempFilteredSets = tempFilteredSets.filter((item) =>
          selectedClasses.includes(item.class_text)
        );
      }

      // Render the filtered items and pagination
      renderPage(currentPage, tempFilteredSets);
      renderPagination(tempFilteredSets);
      updateCheckboxCounts(); // Re-update the checkbox counts after filtering
    };

    // Function to update the checkbox counts based on the filtered data
    const updateCheckboxCounts = () => {
      // Get all checkboxes and their corresponding count elements
      const checkboxes = categoryCheckboxWrapper.querySelectorAll(
        "input[type='checkbox']"
      );
      checkboxes.forEach((checkbox) => {
        const className = checkbox.value;
        const countElement = checkbox
          .closest(".checkbox_item")
          .querySelector(".count-text");

        // Calculate how many items of the same class exist in the filtered list
        const countInFilteredSets = filteredByRangeSlider.filter(
          (item) => item.class_text === className
        ).length;

        // Update the text in the <p> tag
        countElement.textContent = `${countInFilteredSets} available`;
      });
    };

    // Function to render items for the current page
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

    // Function to render pagination controls
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

    // Generate and attach category checkboxes
    generateCheckboxes();

    // Initial render
    renderPage(currentPage, filteredByRangeSlider);
    renderPagination(filteredByRangeSlider);
  })
  .catch((error) => console.error("Error:", error));
