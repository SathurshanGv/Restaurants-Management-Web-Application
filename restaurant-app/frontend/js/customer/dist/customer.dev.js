"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener("DOMContentLoaded", function () {
  var restaurantGrid = document.getElementById("restaurant-grid");
  var searchBar = document.getElementById("searchBar");
  var searchBtn = document.getElementById("searchBtn");
  var restaurantDetailsModal = document.getElementById("restaurant-details");
  var restaurantNameEl = document.getElementById("restaurant-name");
  var foodItemsEl = document.getElementById("Menu");
  var cartEl = document.getElementById("cartContainer");
  var checkoutBtn = document.getElementById("fixedCheckoutBtn");
  var checkoutModal = document.getElementById("checkout-modal");
  var checkoutDetailsEl = document.getElementById("checkout-details");
  var closeModalBtn = document.querySelector(".close-btn");
  var closeCheckoutBtn = document.querySelector(".close-checkout-btn");
  var cartCountEl = document.getElementById("cartCount");
  var cart = [];
  var isLoggedIn = false; // Simulate the user's login status (replace with real login check)
  // Function to check if the user is logged in

  function checkIfLoggedIn() {
    if (!isLoggedIn) {
      alert("Please log in to complete the purchase.");
      window.location.href = "authcustomer.html"; // Redirect to login page

      return false;
    }

    return true;
  } // Sample restaurant data with Overview and Menu details


  var restaurantData = [{
    name: "The Gourmet Kitchen",
    imageUrl: "..//assets/images/img05.webp",
    rating: 4.8,
    overview: {
      address: "45 Gourmet St, Colombo 00500",
      hours: "Open ⋅ Closes 10 PM",
      website: "https://www.thegourmetkitchen.com",
      phone: "077 555 9001",
      mapLocation: "WV85+YA Colombo",
      description: "The Gourmet Kitchen offers an exquisite fine dining experience with a focus on international cuisine."
    },
    foodItems: [{
      name: "Grilled Salmon",
      description: "Delicious wood-fired salmon.",
      price: 15,
      imageUrl: "..//assets/images/grilledsalmom01.webp"
    }, {
      name: "Caesar Salad",
      description: "Crisp romaine lettuce and Parmesan.",
      price: 10,
      imageUrl: "..//assets/images/caesarsalad.webp"
    }, {
      name: "Truffle Pasta",
      description: "Rich and creamy pasta.",
      price: 18,
      imageUrl: "..//assets/images/tofupasta.webp"
    }]
  }, {
    name: "Cafe Delights",
    imageUrl: "..//assets/images/img06.webp",
    rating: 4.5,
    overview: {
      address: "22 Delight Rd, Colombo 00400",
      hours: "Open ⋅ Closes 9 PM",
      website: "https://www.cafedelights.com",
      phone: "077 888 8002",
      mapLocation: "WV85+XZ Colombo",
      description: "Cafe Delights is your go-to place for a cozy atmosphere, great coffee, and freshly baked goods."
    },
    foodItems: [{
      name: "Espresso",
      description: "Strong and rich espresso made from premium Arabica beans.",
      price: 3,
      imageUrl: "..//assets/images/espresso.webp"
    }, {
      name: "Blueberry Muffin",
      description: "Soft and moist muffin bursting with fresh blueberries.",
      price: 5,
      imageUrl: "..//assets/images/blueberrymuffin.webp"
    }, {
      name: "Avocado Toast",
      description: "Toasted sourdough topped with smashed avocado.",
      price: 8,
      imageUrl: "..//assets/images/avacardotoast.webp"
    }]
  }]; // Function to display restaurants from the sample data

  function displayRestaurants(restaurants) {
    restaurantGrid.innerHTML = "";
    restaurants.forEach(function (restaurant) {
      var restaurantCard = document.createElement("div");
      restaurantCard.classList.add("restaurant-card");
      restaurantCard.innerHTML = "\n                <img src=\"".concat(restaurant.imageUrl, "\" alt=\"").concat(restaurant.name, "\">\n                <h3>").concat(restaurant.name, "</h3>\n                <p class=\"rating\">Rating: ").concat(restaurant.rating, "</p>\n            ");
      restaurantCard.addEventListener("click", function () {
        openRestaurantDetails(restaurant);
      });
      restaurantGrid.appendChild(restaurantCard);
    });
  } // Function to open restaurant details in a modal with Overview and Menu


  function openRestaurantDetails(restaurant) {
    restaurantNameEl.textContent = restaurant.name; // Populate Overview Tab

    var overviewTab = document.getElementById('Overview');
    overviewTab.innerHTML = "\n            <p>".concat(restaurant.overview.description, "</p>\n            <p>\uD83D\uDCCD ").concat(restaurant.overview.address, "</p>\n            <p>\uD83D\uDD52 ").concat(restaurant.overview.hours, "</p>\n            <p><a href=\"").concat(restaurant.overview.website, "\" target=\"_blank\">").concat(restaurant.overview.website, "</a></p>\n            <p>\uD83D\uDCDE ").concat(restaurant.overview.phone, "</p>\n            <p>\uD83D\uDCCD ").concat(restaurant.overview.mapLocation, "</p>\n        "); // Populate Menu Tab

    foodItemsEl.innerHTML = "";
    restaurant.foodItems.forEach(function (item) {
      var foodItemEl = document.createElement("div");
      foodItemEl.classList.add("food-item");
      foodItemEl.innerHTML = "\n                <img src=\"".concat(item.imageUrl, "\" alt=\"").concat(item.name, "\">\n                <p><strong>").concat(item.name, "</strong><br>").concat(item.description, "<br>Price: $").concat(item.price, "</p>\n                <button class=\"add-to-cart-btn\" onclick=\"addToCart('").concat(restaurant.name, "', '").concat(item.name, "', ").concat(item.price, ", this)\">Add to Cart</button>\n            ");
      foodItemsEl.appendChild(foodItemEl);
    });
    restaurantDetailsModal.style.display = "block";
  } // Add to cart function with throw effect


  window.addToCart = function (restaurant, item, price, buttonEl) {
    var flyingItem = document.createElement('div');
    flyingItem.classList.add('flying-item');
    flyingItem.innerHTML = "<img src=\"".concat(buttonEl.parentElement.querySelector('img').src, "\" alt=\"").concat(item, "\" width=\"50\" height=\"50\">");
    document.body.appendChild(flyingItem);
    var rect = buttonEl.getBoundingClientRect();
    flyingItem.style.left = "".concat(rect.left, "px");
    flyingItem.style.top = "".concat(rect.top, "px");
    var checkoutRect = checkoutBtn.getBoundingClientRect();
    setTimeout(function () {
      flyingItem.style.transform = "translate(".concat(checkoutRect.left - rect.left, "px, ").concat(checkoutRect.top - rect.top, "px) scale(0.2)");
      flyingItem.style.opacity = '0';
    }, 50);
    setTimeout(function () {
      document.body.removeChild(flyingItem);
    }, 750);
    var existingCartItem = cart.find(function (cartItem) {
      return cartItem.restaurant === restaurant && cartItem.item === item;
    });

    if (existingCartItem) {
      existingCartItem.quantity++;
      existingCartItem.price += price;
    } else {
      cart.push({
        restaurant: restaurant,
        item: item,
        price: price,
        quantity: 1
      });
    }

    updateCart();
  }; // Update cart function


  function updateCart() {
    cartCountEl.textContent = cart.reduce(function (acc, item) {
      return acc + item.quantity;
    }, 0);
    checkoutDetailsEl.innerHTML = "";
    var total = 0;
    var groupedCart = cart.reduce(function (acc, item) {
      if (!acc[item.restaurant]) {
        acc[item.restaurant] = [];
      }

      acc[item.restaurant].push(item);
      return acc;
    }, {});

    for (var restaurant in groupedCart) {
      var restaurantHeader = document.createElement("h3");
      restaurantHeader.textContent = restaurant;
      checkoutDetailsEl.appendChild(restaurantHeader);
      groupedCart[restaurant].forEach(function (cartItem, index) {
        var checkoutItemEl = document.createElement("div");
        checkoutItemEl.classList.add("cart-item");
        checkoutItemEl.innerHTML = "\n                    <span>".concat(cartItem.quantity, " x ").concat(cartItem.item, " - $").concat(cartItem.price.toFixed(2), "</span>\n                    <div class=\"quantity-controls\">\n                        <button onclick=\"decreaseQuantity(").concat(index, ")\">-</button>\n                        <button onclick=\"increaseQuantity(").concat(index, ")\">+</button>\n                    </div>\n                    <button onclick=\"removeFromCart(").concat(index, ")\">Remove</button>\n                ");
        checkoutDetailsEl.appendChild(checkoutItemEl);
        total += cartItem.price;
      });
    }

    checkoutDetailsEl.innerHTML += "<p>Total: $".concat(total.toFixed(2), "</p>");
  }

  window.increaseQuantity = function (index) {
    cart[index].quantity++;
    cart[index].price += cart[index].price / (cart[index].quantity - 1);
    updateCart();
  };

  window.decreaseQuantity = function (index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      cart[index].price -= cart[index].price / (cart[index].quantity + 1);
    } else {
      cart.splice(index, 1);
    }

    updateCart();
  };

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (checkIfLoggedIn()) {
      checkoutModal.style.display = "block";
    }
  });
  document.getElementById("payBtn").addEventListener("click", function () {
    if (checkIfLoggedIn()) {
      alert("Payment successful!");
      cart = [];
      updateCart();
      checkoutModal.style.display = "none";
      restaurantDetailsModal.style.display = "none";
    }
  });
  closeModalBtn.addEventListener("click", function () {
    restaurantDetailsModal.style.display = "none";
  });
  closeCheckoutBtn.addEventListener("click", function () {
    checkoutModal.style.display = "none";
  });
  searchBtn.addEventListener("click", function () {
    var query = searchBar.value.toLowerCase().trim();

    if (query) {
      searchRestaurantsAndFood(query);
    } else {
      displayRestaurants(restaurantData);
    }
  });

  function searchRestaurantsAndFood(query) {
    var results = [];
    restaurantData.forEach(function (restaurant) {
      if (restaurant.name.toLowerCase().includes(query)) {
        results.push(restaurant);
      } else {
        var matchingItems = restaurant.foodItems.filter(function (item) {
          return item.name.toLowerCase().includes(query);
        });

        if (matchingItems.length > 0) {
          results.push(_objectSpread({}, restaurant, {
            foodItems: matchingItems
          }));
        }
      }
    });
    displaySearchResults(results);
  }

  function displaySearchResults(restaurants) {
    restaurantGrid.innerHTML = "";
    restaurants.forEach(function (restaurant) {
      var restaurantCard = document.createElement("div");
      restaurantCard.classList.add("restaurant-card");
      restaurantCard.innerHTML = "\n                <img src=\"".concat(restaurant.imageUrl, "\" alt=\"").concat(restaurant.name, "\">\n                <h3>").concat(restaurant.name, "</h3>\n                <p class=\"rating\">Rating: ").concat(restaurant.rating, "</p>\n            ");
      restaurant.foodItems.forEach(function (item) {
        var foodItemEl = document.createElement("div");
        foodItemEl.classList.add("food-item");
        foodItemEl.innerHTML = "\n                    <img src=\"".concat(item.imageUrl, "\" alt=\"").concat(item.name, "\">\n                    <p>").concat(item.name, " - $").concat(item.price, "</p>\n                    <button class=\"add-to-cart-btn\" onclick=\"addToCart('").concat(restaurant.name, "', '").concat(item.name, "', ").concat(item.price, ", this)\">Add to Cart</button>\n                ");
        restaurantCard.appendChild(foodItemEl);
      });
      restaurantGrid.appendChild(restaurantCard);
    });
  } // Initial call to display the sample restaurants


  displayRestaurants(restaurantData); // Mobile menu toggle

  document.getElementById('menu-toggle').addEventListener('click', function () {
    var mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('show');
  }); // Dropdown toggle in mobile view

  var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var dropdownMenu = this.nextElementSibling;
      dropdownMenu.classList.toggle('show');
    });
  });
}); // Tab switching functionality

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
} // Set default tab to open when modal is shown


document.addEventListener("DOMContentLoaded", function () {
  var tabLinks = document.querySelectorAll(".tablinks");
  tabLinks[0].click();
});

function toggleMenu() {
  var navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}
//# sourceMappingURL=customer.dev.js.map
