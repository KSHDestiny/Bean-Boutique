// ! Declare Variables
var hotMenuElem = document.querySelector("#coffee-hot-menu");
var coldMenuElem = document.querySelector("#coffee-cold-menu");
var currentFilterValue = "*";

var hotMenuIso = new Isotope(hotMenuElem, {
  itemSelector: ".hot-menu",
  layoutMode: "fitRows",
});

var coldMenuIso = new Isotope(coldMenuElem, {
  itemSelector: ".cold-menu",
  layoutMode: "fitRows",
});

var $grid = $(".menu-container").isotope({
  itemSelector: ".menu-item",
  layoutMode: "fitRows",
  filter: function () {
    var $this = $(this);
    var text = $this.text().toLowerCase();
    var matchesSearch = text.includes($("#search-coffee").val().toLowerCase());
    var matchesCategory = $this.is(currentFilterValue);

    return matchesSearch && matchesCategory;
  },
});

var $hotGrid = $("#coffee-hot-menu").isotope({
  itemSelector: ".menu-item.hot-menu",
  layoutMode: "fitRows",
});

var $coldGrid = $("#coffee-cold-menu").isotope({
  itemSelector: ".menu-item.cold-menu",
  layoutMode: "fitRows",
});

// ! Use Typing Animation
new TypeIt("#hot-menu-header", {
  waitUntilVisible: true,
  speed: 150,
  loop: true,
}).go();

new TypeIt("#cold-menu-header", {
  waitUntilVisible: true,
  speed: 150,
  loop: true,
}).go();

// ! Use EventListener
$(".filter-group").on("click", "button", function () {
  currentFilterValue = $(this).attr("data-filter");

  $grid.isotope();
  checkForResults();

  if (currentFilterValue === ".cold-menu") {
    document.querySelector("#hot-menu-header").classList.add("d-none");
    document.querySelector("#cold-menu-header").classList.remove("d-none");
  } else if (currentFilterValue === ".hot-menu") {
    document.querySelector("#cold-menu-header").classList.add("d-none");
    document.querySelector("#hot-menu-header").classList.remove("d-none");
  } else {
    document.querySelector("#hot-menu-header").classList.remove("d-none");
    document.querySelector("#cold-menu-header").classList.remove("d-none");
  }
});

document.querySelector("#search-coffee").addEventListener("input", function () {
  $grid.isotope();
  checkForResults();
});

// ! Create Functions
function checkForResults() {
  var hotItemsVisible = $hotGrid.data("isotope").filteredItems.length;
  var coldItemsVisible = $coldGrid.data("isotope").filteredItems.length;

  if (hotItemsVisible === 0 && coldItemsVisible === 0) {
    $("#no-hot-results").removeClass("d-none");
    $("#no-cold-results").removeClass("d-none");
  } else if (hotItemsVisible === 0) {
    $("#no-hot-results").removeClass("d-none");
    $("#no-cold-results").addClass("d-none");
  } else if (coldItemsVisible === 0) {
    $("#no-hot-results").addClass("d-none");
    $("#no-cold-results").removeClass("d-none");
  } else {
    $("#no-hot-results").addClass("d-none");
    $("#no-cold-results").addClass("d-none");
  }

  if (currentFilterValue === ".hot-menu") {
    $("#no-cold-results").addClass("d-none");
  } else if (currentFilterValue === ".cold-menu") {
    $("#no-hot-results").addClass("d-none");
  }
}
