document.addEventListener("DOMContentLoaded", function () {
  let orders = document.getElementById("your-orders");
  let prices = document.getElementById("order-price");
  let total = document.getElementById("total-price");
  let confirm = document.getElementById("confirm-order");
  let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
  let totalPrice = 0;

  orders.innerHTML = "";
  prices.innerHTML = "";

  if (orderList.length === 0) {
    orders.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orderList.forEach((order, index) => {
    let orderItemHtml = `
            <figure class="col-2">
                <img src="./images/${order.image}" class="w-100" alt="${
      order.name
    }">
            </figure>
            <div class="col-4">
                <span><small>Name: </small> ${order.name}</span><br>
                <span><small>Price: </small> $${order.price.toFixed(
                  2
                )}</span><br>
                <a href="javascript:;" class="remove-order" data-name="${
                  order.name
                }">Remove</a>
            </div>
        `;
    orders.innerHTML += orderItemHtml;

    let orderPriceHtml = `
            <tr>
                <td>${index + 1}</td>
                <td>${order.name}</td>
                <td>${
                  order.quantity || 1
                }</td> <!-- Assume quantity is 1 if not defined -->
                <td>$${order.price.toFixed(2)}</td>
                <td>$${(order.price * (order.quantity || 1)).toFixed(2)}</td>
            </tr>
        `;

    prices.innerHTML += orderPriceHtml;
    totalPrice += order.price * (order.quantity || 1);
  });

    total.innerHTML = `
        <tr>
            <td colspan="4">Total</td>
            <td>$${totalPrice.toFixed(2)}</td>
        </tr>
    `;

    orders.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-order")) {
        const itemName = event.target.getAttribute("data-name");
        removeOrder(itemName);
        }
    });

    confirm.addEventListener("click", function () {
        alert("Your order is successfully completed.");

        localStorage.removeItem("orderList");
        location.reload();
    });
});

function removeOrder(itemName) {
    let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const itemIndex = orderList.findIndex((order) => order.name === itemName);
    if (itemIndex !== -1) {
        orderList.splice(itemIndex, 1);
        localStorage.setItem("orderList", JSON.stringify(orderList));
    }

    location.reload();
}
    
        
