(function () {
  "use strict";

  function toggleMenu() {
    var menu = document.getElementById("navMenu");
    var toggle = document.querySelector(".menu-toggle");
    if (!menu || !toggle) return;
    menu.classList.toggle("active");
    toggle.classList.toggle("active");
  }

  window.toggleMenu = toggleMenu;

  document.addEventListener("click", function (event) {
    var menu = document.getElementById("navMenu");
    var toggle = document.querySelector(".menu-toggle");
    if (!menu || !toggle) return;
    if (toggle.contains(event.target)) return;
    if (!menu.contains(event.target) && menu.classList.contains("active")) {
      menu.classList.remove("active");
      toggle.classList.remove("active");
    }
  });

  // Portfolio filter
  document.addEventListener("DOMContentLoaded", function () {
    var filterBtns = document.querySelectorAll(".filter-btn");
    var portfolioItems = document.querySelectorAll(".portfolio-item");
    if (!filterBtns.length || !portfolioItems.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");

        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");

        portfolioItems.forEach(function (item) {
          var categories = item.getAttribute("data-category") || "";
          if (filter === "all" || categories.split(" ").indexOf(filter) !== -1) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  });
})();
