document.addEventListener("DOMContentLoaded", function () {
  // Function to initialize each PAX input block
  function initializePaxBlock(empaxWrapper) {
    const minusBtn = empaxWrapper.querySelector(".empax_minus");
    const plusBtn = empaxWrapper.querySelector(".empax_plus");
    const input = empaxWrapper.querySelector(".expaxinput");

    // Ensure the input has a default value of 1 if empty or invalid
    if (
      !input.value ||
      isNaN(parseInt(input.value, 10)) ||
      parseInt(input.value, 10) < 1
    ) {
      input.value = "1";
    }

    // Disable the minus button if the value is 1
    if (parseInt(input.value, 10) <= 1) {
      minusBtn.classList.add("disabled");
    } else {
      minusBtn.classList.remove("disabled");
    }

    // Event listener for the plus button
    plusBtn.addEventListener("click", function () {
      let currentValue = parseInt(input.value, 10) || 1;
      currentValue += 1;
      input.value = currentValue;

      // Enable the minus button since value is now greater than 1
      if (currentValue > 1) {
        minusBtn.classList.remove("disabled");
      }
    });

    // Event listener for the minus button
    minusBtn.addEventListener("click", function () {
      let currentValue = parseInt(input.value, 10) || 1;

      // Only decrement if currentValue is greater than 1
      if (currentValue > 1) {
        currentValue -= 1;
        input.value = currentValue;

        // Disable the minus button if value reaches 1
        if (currentValue <= 1) {
          minusBtn.classList.add("disabled");
        }
      }
    });
  }

  // Select all existing empax_wrapper elements on the page
  const empaxWrappers = document.querySelectorAll(".empax_wrapper");

  // Initialize each PAX input block
  empaxWrappers.forEach(function (wrapper) {
    initializePaxBlock(wrapper);
  });

  // Optional: If you plan to add empax_wrapper elements dynamically in the future,
  // you can use MutationObserver to automatically initialize them.
  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            // Ensure it's an Element node
            const newWrappers = node.querySelectorAll(".empax_wrapper");
            newWrappers.forEach(function (newWrapper) {
              initializePaxBlock(newWrapper);
            });

            // If the added node itself is an empax_wrapper
            if (node.classList.contains("empax_wrapper")) {
              initializePaxBlock(node);
            }
          }
        });
      }
    }
  });

  // Start observing the document body for added nodes
  observer.observe(document.body, { childList: true, subtree: true });
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Algolia search client
  const searchClient = algoliasearch(
    "ZSPO7HB4MN",
    "2a3621a18dca4f1fb757e9ddaea72440"
  );
  const index = searchClient.initIndex("Airports");

  // Debounce function to limit the rate at which a function can fire
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Function to sanitize HTML to prevent XSS attacks
  function escapeHTML(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Handle input events for Algolia search
  const handleInput = debounce(function (event) {
    const input = event.target;

    // Ensure the event is triggered by an input with the .algolio_input class
    if (!input.classList.contains("algolio_input")) return;

    const query = input.value.trim();
    const eminputBlock = input.closest(".eminputblock");
    const resultsContainer = eminputBlock.querySelector(".search-results");

    if (!resultsContainer) {
      console.warn("No .search-results container found for the input.");
      return;
    }

    if (query.length === 0) {
      resultsContainer.innerHTML = ""; // Clear results if query is empty
      resultsContainer.style.display = "none";
      return;
    }

    // Perform Algolia search
    index
      .search(query)
      .then(({ hits }) => {
        if (hits.length > 0) {
          resultsContainer.innerHTML = hits
            .map(
              (hit) =>
                `<div class="port" tabindex="0">
                <div class="emfieldnamewrapper">
                  <img
                    src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6739f54808efbe5ead7a23c1_Screenshot_1-removebg-preview.avif"
                    alt="Location Icon"
                  />
                  <p class="emfieldname">${escapeHTML(hit["All Fields"])}</p>
                  <p class="uniqueid">${escapeHTML(hit["unique id"])}</p>
                </div>
              </div>`
            )
            .join("");
          resultsContainer.style.display = "block";
        } else {
          resultsContainer.innerHTML = "<p>No results found.</p>";
          resultsContainer.style.display = "block";
        }
      })
      .catch((err) => {
        console.error("Algolia search error:", err);
        resultsContainer.innerHTML = "<p>Error fetching results.</p>";
        resultsContainer.style.display = "block";
      });
  }, 300); // 300ms debounce delay

  // Function to handle click events on search results
  function handleClick(event) {
    const portElement = event.target.closest(".port");
    if (portElement) {
      const emfieldname = portElement.querySelector(".emfieldname").textContent;
      const uniqueid = portElement.querySelector(".uniqueid").textContent;

      // Find the corresponding input and .portid
      const eminputBlock = portElement.closest(".eminputblock");
      const input = eminputBlock.querySelector(".algolio_input");
      const portidElement = eminputBlock.querySelector(".portid");

      // Populate the input with the selected value
      input.value = emfieldname;

      // Set the uniqueid in .portid paragraph
      portidElement.textContent = uniqueid;

      // Optionally, store the unique ID if needed
      // input.dataset.uniqueId = uniqueid;

      // Clear the search results
      const resultsContainer = eminputBlock.querySelector(".search-results");
      resultsContainer.innerHTML = "";
      resultsContainer.style.display = "none";
    }
  }

  // Function to attach event listeners to a given .algolio_wrapper
  function attachListeners(algolioWrapper) {
    algolioWrapper.addEventListener("input", handleInput);
    algolioWrapper.addEventListener("click", handleClick);

    algolioWrapper.addEventListener("focusout", function (event) {
      setTimeout(() => {
        const relatedTarget = event.relatedTarget;

        if (!relatedTarget || !algolioWrapper.contains(relatedTarget)) {
          const allResults = algolioWrapper.querySelectorAll(".search-results");
          allResults.forEach((resultsContainer) => {
            resultsContainer.innerHTML = "";
            resultsContainer.style.display = "none";
          });
        }
      }, 100);
    });
  }

  // Select all existing .algolio_wrapper elements and attach listeners
  const algolioWrappers = document.querySelectorAll(".algolio_wrapper");
  algolioWrappers.forEach(attachListeners);

  // Handle adding new forms dynamically
  document
    .querySelector(".emsubmit.add-search-input")
    .addEventListener("click", function () {
      const algolioWrapper = document.querySelector(".algolio_wrapper");
      const numForms =
        algolioWrapper.querySelectorAll(".algolio_length").length;
      const newFormNumber = numForms + 1; // Determine the new form number

      // Create the new form element
      const newForm = document.createElement("form");
      newForm.className = "algolio_length";
      newForm.setAttribute("autocomplete", "off");
      newForm.innerHTML = `<div class="emform">
          <div class="eminputblock">
            <label>From</label>
            <div class="eminput_field">
              <input
                class="algolio_input"
                type="text"
                placeholder="Enter departure location"
              />
              <p class="portid"></p>
              <img
                src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6730586b420dae5eaf21e2eb_gps.png"
                alt="GPS Icon"
                style="cursor: pointer;"
              />
            </div>
            <div class="search-results"></div>
          </div>
          <div class="eminputblock">
            <label>To</label>
            <div class="eminput_field">
              <input
                class="algolio_input"
                type="text"
                placeholder="Enter destination location"
              />
              <p class="portid"></p>
              <img
                src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6730586b420dae5eaf21e2eb_gps.png"
                alt="GPS Icon"
                style="cursor: pointer;"
              />
            </div>
            <div class="search-results"></div>
          </div>
          <div class="eminputblock">
            <label>Date</label>
            <div class="eminput_field">
              <input type="date" />
            </div>
          </div>
          <div class="eminputblock">
            <label>PAX</label>
            <div class="eminput_field">
              <div class="empax_wrapper">
                <div class="empax_minus">-</div>
                <input class="expaxinput" type="text" value="1" readonly />
                <div class="empax_plus">+</div>
              </div>
            </div>
          </div>
          <div class="remove">Remove</div>
        </div>`;
      algolioWrapper.appendChild(newForm);

      console.log(`Added new form number ${newFormNumber}`);

      // Attach listeners to the new form's wrapper
      attachListeners(newForm.closest(".algolio_wrapper"));
    });

  // Hide search results when clicking outside any .algolio_wrapper
  document.addEventListener("click", function (event) {
    algolioWrappers.forEach((algolioWrapper) => {
      const isClickInside = algolioWrapper.contains(event.target);

      if (!isClickInside) {
        const allResults = algolioWrapper.querySelectorAll(".search-results");
        allResults.forEach((resultsContainer) => {
          resultsContainer.innerHTML = "";
          resultsContainer.style.display = "none";
        });
      }
    });
  });

  // Observe DOM for dynamically added .algolio_wrapper elements and attach listeners
  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const newWrappers = node.querySelectorAll(".algolio_wrapper");
            newWrappers.forEach((wrapper) => {
              attachListeners(wrapper);
            });
            if (node.classList.contains("algolio_wrapper")) {
              attachListeners(node);
            }
          }
        });
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
