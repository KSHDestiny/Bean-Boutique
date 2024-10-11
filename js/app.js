let discountModelBox = document.getElementById("discountModal");
let successModelBox = document.getElementById("successModal");
let successModalText = document.getElementById("successModalText");

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