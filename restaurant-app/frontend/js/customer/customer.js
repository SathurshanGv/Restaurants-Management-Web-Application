document.addEventListener("DOMContentLoaded", () => {
    const restaurantGrid = document.getElementById("restaurant-grid");
    const searchBar = document.getElementById("searchBar");
    const searchBtn = document.getElementById("searchBtn");
    const restaurantDetailsModal = document.getElementById("restaurant-details");
    const restaurantNameEl = document.getElementById("restaurant-name");
    const foodItemsEl = document.getElementById("Menu");
    const cartEl = document.getElementById("cartContainer");
    const checkoutBtn = document.getElementById("fixedCheckoutBtn");
    const checkoutModal = document.getElementById("checkout-modal");
    const checkoutDetailsEl = document.getElementById("checkout-details");
    const closeModalBtn = document.querySelector(".close-btn");
    const closeCheckoutBtn = document.querySelector(".close-checkout-btn");
    const cartCountEl = document.getElementById("cartCount");
    let cart = [];
    
    let isLoggedIn = false; // Simulate the user's login status (replace with real login check)

    // Function to check if the user is logged in
    function checkIfLoggedIn() {
        if (!isLoggedIn) {
            alert("Please log in to complete the purchase.");
            window.location.href = "authcustomer.html"; // Redirect to login page
            return false;
        }
        return true;
    }

    // Sample restaurant data with Overview and Menu details
    let restaurantData = [
        {
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
            foodItems: [
                { name: "Grilled Salmon", description: "Delicious wood-fired salmon.", price: 15, imageUrl: "..//assets/images/grilledsalmom01.webp" },
                { name: "Caesar Salad", description: "Crisp romaine lettuce and Parmesan.", price: 10, imageUrl: "..//assets/images/caesarsalad.webp" },
                { name: "Truffle Pasta", description: "Rich and creamy pasta.", price: 18, imageUrl: "..//assets/images/tofupasta.webp" }
            ]
        },
        {
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
            foodItems: [
                { name: "Espresso", description: "Strong and rich espresso made from premium Arabica beans.", price: 3, imageUrl: "..//assets/images/espresso.webp" },
                { name: "Blueberry Muffin", description: "Soft and moist muffin bursting with fresh blueberries.", price: 5, imageUrl: "..//assets/images/blueberrymuffin.webp" },
                { name: "Avocado Toast", description: "Toasted sourdough topped with smashed avocado.", price: 8, imageUrl: "..//assets/images/avacardotoast.webp" }
            ]
        }
    ];

    // Function to display restaurants from the sample data
    function displayRestaurants(restaurants) {
        restaurantGrid.innerHTML = "";
        restaurants.forEach((restaurant) => {
            const restaurantCard = document.createElement("div");
            restaurantCard.classList.add("restaurant-card");
            restaurantCard.innerHTML = `
                <img src="${restaurant.imageUrl}" alt="${restaurant.name}">
                <h3>${restaurant.name}</h3>
                <p class="rating">Rating: ${restaurant.rating}</p>
            `;
            restaurantCard.addEventListener("click", () => {
                openRestaurantDetails(restaurant);
            });
            restaurantGrid.appendChild(restaurantCard);
        });
    }

    // Function to open restaurant details in a modal with Overview and Menu
    function openRestaurantDetails(restaurant) {
        restaurantNameEl.textContent = restaurant.name;

        // Populate Overview Tab
        const overviewTab = document.getElementById('Overview');
        overviewTab.innerHTML = `
            <p>${restaurant.overview.description}</p>
            <p>📍 ${restaurant.overview.address}</p>
            <p>🕒 ${restaurant.overview.hours}</p>
            <p><a href="${restaurant.overview.website}" target="_blank">${restaurant.overview.website}</a></p>
            <p>📞 ${restaurant.overview.phone}</p>
            <p>📍 ${restaurant.overview.mapLocation}</p>
        `;

        // Populate Menu Tab
        foodItemsEl.innerHTML = "";
        restaurant.foodItems.forEach((item) => {
            const foodItemEl = document.createElement("div");
            foodItemEl.classList.add("food-item");
            foodItemEl.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <p><strong>${item.name}</strong><br>${item.description}<br>Price: $${item.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart('${restaurant.name}', '${item.name}', ${item.price}, this)">Add to Cart</button>
            `;
            foodItemsEl.appendChild(foodItemEl);
        });

        restaurantDetailsModal.style.display = "block";
    }

    // Add to cart function with throw effect
    window.addToCart = function (restaurant, item, price, buttonEl) {
        const flyingItem = document.createElement('div');
        flyingItem.classList.add('flying-item');
        flyingItem.innerHTML = `<img src="${buttonEl.parentElement.querySelector('img').src}" alt="${item}" width="50" height="50">`;
        document.body.appendChild(flyingItem);

        const rect = buttonEl.getBoundingClientRect();
        flyingItem.style.left = `${rect.left}px`;
        flyingItem.style.top = `${rect.top}px`;

        const checkoutRect = checkoutBtn.getBoundingClientRect();

        setTimeout(() => {
            flyingItem.style.transform = `translate(${checkoutRect.left - rect.left}px, ${checkoutRect.top - rect.top}px) scale(0.2)`;
            flyingItem.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            document.body.removeChild(flyingItem);
        }, 750);

        const existingCartItem = cart.find(
            (cartItem) => cartItem.restaurant === restaurant && cartItem.item === item
        );
        if (existingCartItem) {
            existingCartItem.quantity++;
            existingCartItem.price += price;
        } else {
            cart.push({ restaurant, item, price, quantity: 1 });
        }
        updateCart();
    };

    // Update cart function
    function updateCart() {
        cartCountEl.textContent = cart.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
        checkoutDetailsEl.innerHTML = "";
        let total = 0;

        const groupedCart = cart.reduce((acc, item) => {
            if (!acc[item.restaurant]) {
                acc[item.restaurant] = [];
            }
            acc[item.restaurant].push(item);
            return acc;
        }, {});

        for (const restaurant in groupedCart) {
            const restaurantHeader = document.createElement("h3");
            restaurantHeader.textContent = restaurant;
            checkoutDetailsEl.appendChild(restaurantHeader);

            groupedCart[restaurant].forEach((cartItem, index) => {
                const checkoutItemEl = document.createElement("div");
                checkoutItemEl.classList.add("cart-item");
                checkoutItemEl.innerHTML = `
                    <span>${cartItem.quantity} x ${cartItem.item} - $${cartItem.price.toFixed(2)}</span>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;
                checkoutDetailsEl.appendChild(checkoutItemEl);
                total += cartItem.price;
            });
        }

        checkoutDetailsEl.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;
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

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        if (checkIfLoggedIn()) {
            checkoutModal.style.display = "block";
        }
    });

    document.getElementById("payBtn").addEventListener("click", () => {
        if (checkIfLoggedIn()) {
            alert("Payment successful!");
            cart = [];
            updateCart();
            checkoutModal.style.display = "none";
            restaurantDetailsModal.style.display = "none";
        }
    });

    closeModalBtn.addEventListener("click", () => {
        restaurantDetailsModal.style.display = "none";
    });

    closeCheckoutBtn.addEventListener("click", () => {
        checkoutModal.style.display = "none";
    });

    searchBtn.addEventListener("click", () => {
        const query = searchBar.value.toLowerCase().trim();
        if (query) {
            searchRestaurantsAndFood(query);
        } else {
            displayRestaurants(restaurantData);
        }
    });

    function searchRestaurantsAndFood(query) {
        const results = [];
        restaurantData.forEach((restaurant) => {
            if (restaurant.name.toLowerCase().includes(query)) {
                results.push(restaurant);
            } else {
                const matchingItems = restaurant.foodItems.filter((item) =>
                    item.name.toLowerCase().includes(query)
                );
                if (matchingItems.length > 0) {
                    results.push({ ...restaurant, foodItems: matchingItems });
                }
            }
        });
        displaySearchResults(results);
    }

    function displaySearchResults(restaurants) {
        restaurantGrid.innerHTML = "";
        restaurants.forEach((restaurant) => {
            const restaurantCard = document.createElement("div");
            restaurantCard.classList.add("restaurant-card");
            restaurantCard.innerHTML = `
                <img src="${restaurant.imageUrl}" alt="${restaurant.name}">
                <h3>${restaurant.name}</h3>
                <p class="rating">Rating: ${restaurant.rating}</p>
            `;

            restaurant.foodItems.forEach((item) => {
                const foodItemEl = document.createElement("div");
                foodItemEl.classList.add("food-item");
                foodItemEl.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <p>${item.name} - $${item.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart('${restaurant.name}', '${item.name}', ${item.price}, this)">Add to Cart</button>
                `;
                restaurantCard.appendChild(foodItemEl);
            });

            restaurantGrid.appendChild(restaurantCard);
        });
    }

    // Initial call to display the sample restaurants
    displayRestaurants(restaurantData);

    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function() {
        var mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('show');
    });

    // Dropdown toggle in mobile view
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    });
});

// Tab switching functionality
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
}

// Set default tab to open when modal is shown
document.addEventListener("DOMContentLoaded", () => {
    const tabLinks = document.querySelectorAll(".tablinks");
    tabLinks[0].click();
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
