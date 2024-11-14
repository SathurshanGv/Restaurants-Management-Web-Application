const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    const signUpForm = document.querySelector('.sign-up-container form');
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateSignUpForm()) {
            alert('Sign up successful!');
            // Optionally, submit the form data to the server here
        }
    });

    function validateSignUpForm() {
        const nameInput = signUpForm.querySelector('input[placeholder="Name"]');
        const emailInput = signUpForm.querySelector('input[placeholder="Email"]');
        const phoneInput = signUpForm.querySelector('input[placeholder="Phone Number"]');
        const passwordInput = signUpForm.querySelector('input[placeholder="Password"]');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();

        // Name validation (only alphabets and spaces, minimum 2 characters)
        if (!/^[a-zA-Z ]{2,}$/.test(name)) {
            alert('Please enter a valid name (at least 2 characters, only alphabets and spaces).');
            return false;
        }

        // Email validation (basic email format)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Phone number validation (10 digits, only numbers)
        if (!/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return false;
        }

        // Password validation (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
            alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return false;
        }

        return true;
    }

    // Phone number input restriction (only numbers allowed)
    const phoneInput = signUpForm.querySelector('input[placeholder="Phone Number"]');
    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
    });
});
