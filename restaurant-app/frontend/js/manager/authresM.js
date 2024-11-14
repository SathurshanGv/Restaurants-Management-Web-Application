let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

// Function to prevent default submission
let getButtons = (e) => e.preventDefault();

// Function to toggle forms
let changeForm = (e) => {
    switchCtn.classList.add("is-gx");
    setTimeout(function () {
        switchCtn.classList.remove("is-gx");
    }, 1500);

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
};

// Function to validate email format
let validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Function to display error message
let displayError = (input, message) => {
    input.style.borderColor = "red";
    input.setAttribute("title", message);
};

// Function to clear error
let clearError = (input) => {
    input.style.borderColor = "";
    input.removeAttribute("title");
};

// Function to validate password strength
let validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isValidLength = password.length >= 6;
    return hasUpperCase && hasLowerCase && hasNumber && isValidLength;
};

// Function to validate form inputs
let validateInputs = (form) => {
    let isValid = true;

    const nameInput = form.querySelector("input[placeholder='Name']");
    const emailInput = form.querySelector("input[placeholder='Email']");
    const passwordInput = form.querySelector("input[placeholder='Password']");

    // Validate Name
    if (nameInput && nameInput.value.trim() === "") {
        isValid = false;
        displayError(nameInput, "Name is required");
    } else {
        clearError(nameInput);
    }

    // Validate Email
    if (emailInput && (emailInput.value.trim() === "" || !validateEmail(emailInput.value.trim()))) {
        isValid = false;
        displayError(emailInput, "Valid email is required");
    } else {
        clearError(emailInput);
    }

    // Validate Password
    if (passwordInput && !validatePassword(passwordInput.value.trim())) {
        isValid = false;
        displayError(passwordInput, "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, and a number");
    } else {
        clearError(passwordInput);
    }

    return isValid;
};

// Function to initialize main form
let mainF = (e) => {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", (e) => {
            e.preventDefault();
            let form = e.target.closest("form");

            if (validateInputs(form)) {
                alert("Form submitted successfully!");
                // Form submission logic can be placed here
            }
        });
    }

    for (let i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener("click", changeForm);
    }
};

window.addEventListener("load", mainF);
