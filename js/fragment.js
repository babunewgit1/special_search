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

        const totalDistance = distance / item.cruise_speed_avg_fixedrate_number;
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
           <div class="babu">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum veniam dicta recusandae dolores deserunt numquam iste vitae architecto. Reiciendis, tempore nostrum aliquam nesciunt officiis earum modi maxime delectus consequatur magni!
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

      const totalDistance = distance / item.cruise_speed_avg_fixedrate_number;
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
         <div class="item_img">
               <img src="${item.exterior_image1_image}" alt="" />
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
