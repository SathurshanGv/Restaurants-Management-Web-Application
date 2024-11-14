document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('restaurantForm');
    const foodItemsContainer = document.getElementById("foodItemsContainer");

    // Handle restaurant image upload
    const restaurantImageInput = document.getElementById('restaurantImage');
    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const imagePreviewContainer = document.querySelector('.image-preview-container');

    uploadImageBtn.addEventListener('click', () => {
        restaurantImageInput.click();
    });

    restaurantImageInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(e.target.files[0]);
            img.classList.add('uploaded-image');
            imagePreviewContainer.innerHTML = ''; // Clear previous image if any

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-btn');
            removeBtn.innerHTML = '&times;'; // X symbol
            removeBtn.addEventListener('click', () => {
                imagePreviewContainer.innerHTML = ''; // Remove image
                restaurantImageInput.value = ''; // Clear file input
                uploadImageBtn.style.display = 'block'; // Show upload button again
            });

            imagePreviewContainer.appendChild(img);
            imagePreviewContainer.appendChild(removeBtn);
            uploadImageBtn.style.display = 'none'; // Hide upload button after image is added
        }
    });

    // Function to handle image upload for menu items
    function handleImageUpload(imageInput, imagePreviewContainer, placeImageBtn) {
        imageInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(e.target.files[0]);
                img.classList.add('uploaded-image');
                imagePreviewContainer.innerHTML = '';

                const removeBtn = document.createElement('button');
                removeBtn.classList.add('remove-btn');
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', () => {
                    imagePreviewContainer.innerHTML = ''; // Remove image
                    imageInput.value = ''; // Clear file input
                    placeImageBtn.style.display = 'block'; // Show "+" button again
                });

                imagePreviewContainer.appendChild(img);
                imagePreviewContainer.appendChild(removeBtn);
                placeImageBtn.style.display = 'none'; // Hide the "+" button after image is uploaded
            }
        });
    }

    // Create a new food item
    function createFoodItem() {
        const foodItemDiv = document.createElement("div");
        foodItemDiv.classList.add("food-item");
        foodItemDiv.style.position = 'relative'; // Ensure positioning for remove button

        const newFoodItemName = document.createElement("input");
        newFoodItemName.type = "text";
        newFoodItemName.name = "foodName[]";
        newFoodItemName.placeholder = "Menu Item Name (e.g. Caesar Salad)";
        newFoodItemName.required = true;

        foodItemDiv.appendChild(newFoodItemName);

        const imageUploadsDiv = document.createElement('div');
        imageUploadsDiv.classList.add('image-uploads');

        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.name = 'foodImage[]';
        imageInput.accept = 'image/*';
        imageInput.classList.add('image-input');
        imageInput.hidden = true;

        const placeImageBtn = document.createElement('button');
        placeImageBtn.type = 'button';
        placeImageBtn.classList.add('place-image-btn');
        placeImageBtn.textContent = '+';

        const imagePreviewContainer = document.createElement('div');
        imagePreviewContainer.classList.add('image-preview-container');

        placeImageBtn.addEventListener('click', () => {
            imageInput.click();
        });

        imageUploadsDiv.appendChild(imagePreviewContainer);
        imageUploadsDiv.appendChild(imageInput);
        imageUploadsDiv.appendChild(placeImageBtn);
        foodItemDiv.appendChild(imageUploadsDiv);

        // Handle image upload functionality for menu items
        handleImageUpload(imageInput, imagePreviewContainer, placeImageBtn);

        // Add the remove button for the entire food item
        const removeFoodItemBtn = document.createElement('button');
        removeFoodItemBtn.classList.add('remove-food-item-btn');
        removeFoodItemBtn.innerHTML = '&times;'; // "X" symbol for removing the food item
        removeFoodItemBtn.style.position = 'absolute';
        removeFoodItemBtn.style.top = '0';
        removeFoodItemBtn.style.right = '0';
        removeFoodItemBtn.style.backgroundColor = '#ff5f5f';
        removeFoodItemBtn.style.color = 'white';
        removeFoodItemBtn.style.border = 'none';
        removeFoodItemBtn.style.borderRadius = '50%';
        removeFoodItemBtn.style.width = '20px';
        removeFoodItemBtn.style.height = '20px';
        removeFoodItemBtn.style.cursor = 'pointer';

        removeFoodItemBtn.addEventListener('click', () => {
            foodItemDiv.remove(); // Remove the entire food item section
        });

        // Add activation/deactivation toggle button
        const toggleActiveBtn = document.createElement('button');
        toggleActiveBtn.classList.add('toggle-active-btn');
        toggleActiveBtn.textContent = 'Deactivate';
        toggleActiveBtn.style.marginLeft = '10px';
        toggleActiveBtn.addEventListener('click', () => {
            if (toggleActiveBtn.textContent === 'Deactivate') {
                toggleActiveBtn.textContent = 'Activate';
                foodItemDiv.classList.add('inactive');
            } else {
                toggleActiveBtn.textContent = 'Deactivate';
                foodItemDiv.classList.remove('inactive');
            }
        });

        foodItemDiv.appendChild(removeFoodItemBtn);
        foodItemDiv.appendChild(toggleActiveBtn);

        foodItemsContainer.appendChild(foodItemDiv);
    }

    // Add the first food item on page load
    createFoodItem();

    // Add a new food item when the "Add New Item" button is clicked
    document.getElementById('addFoodItemBtn').addEventListener('click', createFoodItem);

    // Validate phone number to allow only numbers
    const phoneInput = document.getElementById('restaurantPhone');
    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ''); // Remove non-digit characters
    });

    // Validate restaurant name to allow only letters
    const restaurantNameInput = document.getElementById('restaurantName');
    restaurantNameInput.addEventListener('input', () => {
        restaurantNameInput.value = restaurantNameInput.value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-letter characters
    });

    // Function to show a bubble notification
    function showBubbleNotification(message, element) {
        const bubbleNotification = document.createElement('div');
        bubbleNotification.classList.add('bubble-notification');
        bubbleNotification.textContent = message;

        // Position the bubble near the element
        element.parentElement.appendChild(bubbleNotification);

        // Automatically hide notification after 3 seconds
        setTimeout(() => {
            bubbleNotification.remove();
        }, 3000);
    }

    // Validate opening and closing hours and show a bubble notification if invalid
    function validateOpeningHours() {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        let validOpeningHours = true;

        days.forEach(day => {
            const toggleButton = document.getElementById(`${day}-toggle`);
            const openingTime = document.getElementById(`${day}-opening`);
            const closingTime = document.getElementById(`${day}-closing`);

            // Reset styles
            openingTime.classList.remove('error');
            closingTime.classList.remove('error');

            if (toggleButton.checked) {
                const openingTimeValue = openingTime.value;
                const closingTimeValue = closingTime.value;

                if (openingTimeValue && closingTimeValue) {
                    const openingDateTime = new Date(`1970-01-01T${openingTimeValue}:00`);
                    const closingDateTime = new Date(`1970-01-01T${closingTimeValue}:00`);

                    if (closingDateTime <= openingDateTime) {
                        validOpeningHours = false;
                        // Show bubble notification near the closing time input
                        showBubbleNotification("Closing time must be later than opening time.", closingTime);

                        // Apply error styles
                        openingTime.classList.add('error');
                        closingTime.classList.add('error');
                    }
                }
            }
        });

        return validOpeningHours;
    }

    // Validate at least one menu item with a name and image
    function validateMenuItems() {
        const foodItems = document.querySelectorAll('.food-item');
        let hasValidMenuItem = false;

        foodItems.forEach(item => {
            const foodNameInput = item.querySelector('input[name="foodName[]"]');
            const foodImageInput = item.querySelector('input[name="foodImage[]"]');

            if (foodNameInput && foodNameInput.value.trim() !== "" && foodImageInput && foodImageInput.value !== "") {
                hasValidMenuItem = true;
            }
        });

        if (!hasValidMenuItem) {
            showBubbleNotification("Please add at least one valid menu item with a name and image.", foodItemsContainer);
        }

        return hasValidMenuItem;
    }

    // Form submission validation
    form.addEventListener('submit', function (event) {
        let isValid = true;

        const restaurantName = document.getElementById('restaurantName');
        if (restaurantName.value.trim() === "") {
            isValid = false;
            showBubbleNotification("Restaurant Name is required.", restaurantName);
        }

        const restaurantAddress = document.getElementById('restaurantAddress');
        if (restaurantAddress.value.trim() === "") {
            isValid = false;
            showBubbleNotification("Restaurant Address is required.", restaurantAddress);
        }

        const phoneNumber = phoneInput.value.trim();
        if (!/^\d{10}$/.test(phoneNumber)) {
            isValid = false;
            showBubbleNotification("Phone Number must be a valid 10-digit number.", phoneInput);
        }

        const restaurantDescription = document.getElementById('restaurantDescription');
        if (restaurantDescription.value.trim() === "") {
            isValid = false;
            showBubbleNotification("Restaurant Description is required.", restaurantDescription);
        }

        // Validate opening hours
        const validOpeningHours = validateOpeningHours();
        if (!validOpeningHours) {
            isValid = false;
        }

        // Validate menu items
        const validMenuItems = validateMenuItems();
        if (!validMenuItems) {
            isValid = false;
        }

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });

    // Handle toggle buttons for opening hours with status change
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    days.forEach(day => {
        const toggleButton = document.getElementById(`${day}-toggle`);
        const openingTime = document.getElementById(`${day}-opening`);
        const closingTime = document.getElementById(`${day}-closing`);
        const toggleStatus = document.getElementById(`${day}-status`);

        toggleButton.addEventListener('change', () => {
            if (toggleButton.checked) {
                openingTime.parentElement.style.display = 'flex';
                toggleStatus.textContent = 'OPEN';
                toggleStatus.style.color = 'green';
            } else {
                openingTime.parentElement.style.display = 'none';
                openingTime.value = '';
                closingTime.value = '';
                toggleStatus.textContent = 'CLOSED';
                toggleStatus.style.color = 'red';
            }
        });

        // Initialize visibility based on the default state
        if (!toggleButton.checked) {
            openingTime.parentElement.style.display = 'none';
            toggleStatus.textContent = 'CLOSED';
            toggleStatus.style.color = 'red';
        }
    });
});
