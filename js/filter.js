// filter in mobile design
document.querySelector(".new_filter").addEventListener("click", function () {
  document
    .querySelector(".sr_filter_block")
    .classList.add("active_mobile_filter");
  document.querySelector("body").classList.add("overflowfilter");
});

document.querySelector(".cross_img").addEventListener("click", function () {
  document
    .querySelector(".sr_filter_block")
    .classList.remove("active_mobile_filter");
  document.querySelector("body").classList.remove("overflowfilter");
});
