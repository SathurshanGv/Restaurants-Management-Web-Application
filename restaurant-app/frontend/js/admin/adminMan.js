// JavaScript code for managing restaurant and menu items (scriptadminman.js)

// Sample data for demonstration
const restaurantRequests = [
    { id: 1, name: "The Gourmet House", owner: "Alice", status: "Pending" },
    { id: 2, name: "Ocean Breeze Diner", owner: "Bob", status: "Pending" }
];

const menuItems = [
    { id: 1, name: "Grilled Salmon", restaurant: "The Gourmet House", price: "$15.99", status: "Active" },
    { id: 2, name: "Lobster Bisque", restaurant: "Ocean Breeze Diner", price: "$12.99", status: "Active" }
];

// Load restaurant requests into the table
function loadRequests(requests = restaurantRequests) {
    const requestList = document.getElementById("request-list");
    requestList.innerHTML = "";
    requests.forEach((req) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${req.name}</td>
            <td>${req.owner}</td>
            <td>${req.status}</td>
            <td>
                <button class="accept" onclick="acceptRequest(${req.id})">Accept</button>
                <button class="decline" onclick="declineRequest(${req.id})">Decline</button>
            </td>
        `;
        requestList.appendChild(row);
    });
}

// Load food menu items into the table
function loadMenuItems(items = menuItems) {
    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = "";
    items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.restaurant}</td>
            <td>${item.price}</td>
            <td>${item.status}</td>
            <td>
                <button class="deactivate" onclick="deactivateItem(${item.id})">Deactivate</button>
                <button class="update" onclick="updateItem(${item.id})">Update</button>
            </td>
        `;
        menuList.appendChild(row);
    });
}

// Search and filter restaurants by name
function searchRestaurants() {
    const query = document.getElementById("restaurant-search").value.toLowerCase();
    const filteredRestaurants = restaurantRequests.filter(req => req.name.toLowerCase().includes(query));
    loadRequests(filteredRestaurants);
}

// Search and filter food items by name
function searchFoodItems() {
    const query = document.getElementById("menu-search").value.toLowerCase();
    const filteredMenu = menuItems.filter(item => item.name.toLowerCase().includes(query));
    loadMenuItems(filteredMenu);
}

// Primary Search across all data
function primarySearch() {
    const query = document.getElementById("primary-search-input").value.toLowerCase();

    const restaurantMatches = restaurantRequests.filter(req => req.name.toLowerCase().includes(query));
    const foodMatches = menuItems.filter(item => item.name.toLowerCase().includes(query));

    loadRequests(restaurantMatches);
    loadMenuItems(foodMatches);
}

// Function to view all restaurants
function viewAllRestaurants() {
    loadRequests(restaurantRequests); // Load all restaurant requests without filtering
    document.getElementById("primary-search-input").value = ""; // Clear the search input
}

// Load initial data
window.onload = () => {
    loadRequests();
    loadMenuItems();
};
