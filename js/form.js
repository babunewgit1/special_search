// code for input number increase and decrease
const plusButtons = document.querySelectorAll(".empax_plus");
const minusButtons = document.querySelectorAll(".empax_minus");

plusButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const input = this.previousElementSibling;
    let currentValue = parseInt(input.value);
    if (isNaN(currentValue)) {
      currentValue = 0;
    }
    input.value = currentValue + 1;
    this.parentElement
      .querySelector(".empax_minus")
      .classList.remove("disabled");
  });
});

minusButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const input = this.nextElementSibling;

    let currentValue = parseInt(input.value);
    if (isNaN(currentValue)) {
      currentValue = 0;
    }
    if (currentValue > 1) {
      input.value = currentValue - 1;
    } else {
      input.value = 1;
      this.classList.add("disabled");
    }
  });
});
// code for algolio api
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Algolia search client
  const searchClient = algoliasearch(
    "ZSPO7HB4MN",
    "2a3621a18dca4f1fb757e9ddaea72440"
  );
  const index = searchClient.initIndex("Airports");

  /**
   * Debounce function to limit the rate at which a function can fire.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - The delay in milliseconds.
   * @returns {Function} - The debounced function.
   */
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  /**
   * Handles the input event for any .algolio_input within .algolio_wrapper.
   * @param {Event} event - The input event.
   */
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
      return;
    }

    // Perform Algolia search
    index
      .search(query)
      .then(({ hits }) => {
        if (hits.length > 0) {
          resultsContainer.innerHTML = hits
            .map(
              (hit) => `
               <div class="port">
                 <div class="emfieldnamewrapper">
                   <img src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6739f54808efbe5ead7a23c1_Screenshot_1-removebg-preview.avif" alt="Location Icon" />
                   <p class="emfieldname">${hit["All Fields"]}</p>
                   <p class="uniqueid">${hit["unique id"]}</p>
                 </div>
               </div>
             `
            )
            .join("");
        } else {
          resultsContainer.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch((err) => {
        console.error("Algolia search error:", err);
      });
  }, 300); // 300ms debounce delay

  // Attach event listener using event delegation
  document
    .querySelector(".algolio_wrapper")
    .addEventListener("input", handleInput);

  /**
   * Handles adding a new form dynamically.
   */
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
      newForm.innerHTML = `
       <div class="emform">
         <div class="eminputblock">
           <label>From</label>
           <div class="eminput_field">
             <input class="algolio_input" type="text" />
             <p class="portid"></p>
             <img
               src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6730586b420dae5eaf21e2eb_gps.png"
               alt="GPS Icon"
             />
           </div>
           <div class="search-results"></div>
         </div>
         <div class="eminputblock">
           <label>To</label>
           <div class="eminput_field">
             <input class="algolio_input" type="text" />
             <p class="portid"></p>
             <img
               src="https://cdn.prod.website-files.com/6713759f858863c516dbaa19/6730586b420dae5eaf21e2eb_gps.png"
               alt="GPS Icon"
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
               <input class="expaxinput" type="text" value="1" />
               <div class="empax_plus">+</div>
             </div>
           </div>
         </div>
       </div>
     `;

      // Append the new form to the wrapper
      algolioWrapper.appendChild(newForm);

      console.log(`Added new form number ${newFormNumber}`);
      // No need to initialize search for new inputs as event delegation handles it
    });
});

// handel algolio search reslt
document.querySelectorAll(".algolio_input").forEach((input) => {
  input.addEventListener("focus", function () {
    const resultsDiv =
      this.closest(".eminputblock").querySelector(".search-results");
    resultsDiv.style.display = "";
  });
});

// Setup click event listeners for .search-results
document.querySelectorAll(".search-results").forEach((resultsBlock) => {
  resultsBlock.addEventListener("click", function (event) {
    const port = event.target.closest(".port");
    if (port) {
      const fieldNameText = port.querySelector(".emfieldname").textContent;
      const uniqueIdText = port.querySelector(".uniqueid").textContent;
      const inputField =
        this.closest(".eminputblock").querySelector(".algolio_input");
      inputField.value = fieldNameText;
      const portIdField =
        this.closest(".eminputblock").querySelector(".portid");
      portIdField.textContent = uniqueIdText;
      this.style.display = "none";
    }
  });
});

// Hide .search-results when clicking outside
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(".search-results") &&
    !event.target.classList.contains("algolio_input")
  ) {
    document.querySelectorAll(".search-results").forEach((resultsDiv) => {
      resultsDiv.style.display = "none";
    });
  }
});
