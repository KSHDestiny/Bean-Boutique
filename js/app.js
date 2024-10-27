let discountModelBox = document.getElementById("discountModal");
let successModelBox = document.getElementById("successModal");
let successModalText = document.getElementById("successModalText");
let addToCartButtons = document.querySelectorAll("a[data-item]");
let orderList = JSON.parse(localStorage.getItem("orderList")) || [];

document.querySelector(
  ".badge"
).innerText = orderList.length != 0 ? `+${orderList.length}` : ``;
console.log(document.querySelector(".badge"));


// First Time Visitors' Discount
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("firstVisit")) {
    let discountModal = new bootstrap.Modal(discountModelBox);
    discountModal.show();

    localStorage.setItem("firstVisit", "true");
  }

  document
    .getElementById("signupForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      let email = document.getElementById("email").value;
      if (email) {
        let discountModal = bootstrap.Modal.getInstance(discountModelBox);
        discountModal.hide();

        successModalText.innerHTML = `<small>Thank you! Your discount code will be sent to</small> <b>${email}</b>`;
        let successModel = new bootstrap.Modal(successModelBox);
        successModel.show();
      }
    });
});

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll(".filter-group a").forEach(function (item) {
  item.addEventListener("click", function () {
    currentFilterValue = this.getAttribute("data-filter");
    localStorage.setItem("filter", currentFilterValue);
  });
});

addToCartButtons.forEach(function (addToCartButton) {
  addToCartButton.addEventListener('click', function (event) {
    event.preventDefault();
    const item = this.getAttribute('data-item');
    let newItem;

    switch (item) {
      case "arabica":
        newItem = {
          name: "Arabica",
          price: 5.49,
          image: "Arabica.jpg",
        };
        break;
      case "robusta":
        newItem = {
          name: "Robusta",
          price: 5.49,
          image: "Robusta.jpg",
        };
        break;
      case "excelsa":
        newItem = {
          name: "Excelsa",
          price: 5.49,
          image: "Excelsa.jpg",
        };
        break;
      case "liberica":
        newItem = {
          name: "Liberica",
          price: 5.49,
          image: "Libérica.jpg",
        };
        break;
      case "typica":
        newItem = {
          name: "Typica",
          price: 5.99,
          image: "Typica.png",
        };
        break;
      case "geisha":
        newItem = {
          name: "Geisha",
          price: 5.99,
          image: "Geisha.jpg",
        };
        break;
      case "bourbon":
        newItem = {
          name: "Bourbon",
          price: 5.99,
          image: "Bourbon.jpg",
        };
        break;
      case "pour-over":
        newItem = {
          name: "Pour Over",
          price: 25.0,
          image: "Pour_Over_Coffee.jpg",
        };
        break;
      case "auto-drip":
        newItem = {
          name: "Auto Drip Coffee Maker",
          price: 129.0,
          image: "Auto_Drip_Coffee_Makers.jpg",
        };
        break;
      case "press-pot":
        newItem = {
          name: "Press Pot Coffee",
          price: 40.0,
          image: "Press_Pot_Coffee.jpg",
        };
        break;
      case "aero-press":
        newItem = {
          name: "The AeroPress",
          price: 30.0,
          image: "The_AeroPress.png",
        };
        break;
      case "percolator":
        newItem = {
          name: "The Percolator",
          price: 25.0,
          image: "Percolator.png",
        };
        break;
      case "ibrik":
        newItem = {
          name: "The Ibrik",
          price: 15.0,
          image: "The_Ibrik.jpg",
        };
        break;
      case "siphon":
        newItem = {
          name: "The Siphon",
          price: 80.0,
          image: "Siphon.jpg",
        };
        break;
      case "moka-pot":
        newItem = {
          name: "The Moka Pot",
          price: 35.0,
          image: "The_Moka_Pot.jpg",
        };
        break;
      case "espresso-machine":
        newItem = {
          name: "The Espresso Machine",
          price: 199.0,
          image: "The_Espresso_Machine.jpg",
        };
        break;
      default:
        console.log("Item not found");
        return;
    }

    orderList.push(newItem);
    document.querySelector(".badge").innerText = `+${orderList.length}`;
    localStorage.setItem("orderList", JSON.stringify(orderList));
  });
});