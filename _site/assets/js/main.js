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
})();
