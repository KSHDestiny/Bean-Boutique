// ! Declare Variables
var hotMenuElem = document.querySelector("#coffee-popular-menu");
var coldMenuElem = document.querySelector("#coffee-new-menu");
var currentFilterValue = localStorage.getItem("filter") || "*";

var hotMenuIso = new Isotope(hotMenuElem, {
  itemSelector: ".popular-menu",
  layoutMode: "fitRows",
});

var coldMenuIso = new Isotope(coldMenuElem, {
  itemSelector: ".new-menu",
  layoutMode: "fitRows",
});

var $grid = $(".menu-container").isotope({
  itemSelector: ".menu-item",
  layoutMode: "fitRows",
  filter: function () {
    var $this = $(this);
    var titleText = $this.find(".card-title").text().toLowerCase();
    var matchesSearch = titleText.includes($("#search-coffee").val().toLowerCase());
    var matchesCategory = $this.is(currentFilterValue);

    return matchesSearch && matchesCategory;
  },
});

var $hotGrid = $("#coffee-popular-menu").isotope({
  itemSelector: ".menu-item.popular-menu",
  layoutMode: "fitRows",
});

var $coldGrid = $("#coffee-new-menu").isotope({
  itemSelector: ".menu-item.new-menu",
  layoutMode: "fitRows",
});

// ! Use Typing Animation
new TypeIt("#popular-menu-header", {
  waitUntilVisible: true,
  speed: 150,
  loop: true,
}).go();

new TypeIt("#new-menu-header", {
  waitUntilVisible: true,
  speed: 150,
  loop: true,
}).go();

// ! Use EventListener
$(".filter-group").on("click", "a", function () {
  currentFilterValue = $(this).attr("data-filter");
  $grid.isotope();
  checkForResults();
  filter(currentFilterValue);
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

  if (currentFilterValue === ".popular-menu") {
    $("#no-cold-results").addClass("d-none");
  } else if (currentFilterValue === ".new-menu") {
    $("#no-hot-results").addClass("d-none");
  }
}

function filter($currentFilterValue) {
  if (currentFilterValue === ".new-menu") {
    document.querySelector("#popular-menu-header").classList.add("d-none");
    document.querySelector("#new-menu-header").classList.remove("d-none");
  } else if (currentFilterValue === ".popular-menu") {
    document.querySelector("#new-menu-header").classList.add("d-none");
    document.querySelector("#popular-menu-header").classList.remove("d-none");
  } else {
    document.querySelector("#popular-menu-header").classList.remove("d-none");
    document.querySelector("#new-menu-header").classList.remove("d-none");
  }

  localStorage.removeItem("filter");
}

filter();