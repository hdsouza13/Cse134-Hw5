document.getElementById("contact-form").addEventListener("submit", function(event) {
    let errors = [];
    let form_errors = []; // Store error details

    // Clear previous outputs
    document.getElementById("error-output").textContent = "";
    document.getElementById("info-output").textContent = "";

    // Name validation
    const name = document.getElementById("name");
    if (name.value.trim().length < 2) {
        errors.push("Name must be at least 2 characters.");
        form_errors.push({ field: "name", message: "Name must be at least 2 characters." });
    }

    // Email validation
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        errors.push("Enter a valid email address.");
        form_errors.push({ field: "email", message: "Enter a valid email address." });
    }

    // Comments validation
    const comments = document.getElementById("comments");
    if (comments.value.trim().length < 2) {
        errors.push("Comment should be at least 2 characters.");
        form_errors.push({ field: "comments", message: "Comment should be at least 2 characters." });
    }

    // Display errors if any
    if (errors.length > 0) {
        event.preventDefault(); // Prevent default submission
        document.getElementById("error-output").textContent = errors.join(" ");
        document.getElementById("info-output").textContent = "Please fix the errors before submitting.";
    }

    // Continue submission (even if errors exist) to httpbin
    const formData = new FormData(document.getElementById("contact-form"));
    formData.append("form-errors", JSON.stringify(form_errors));

    fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Form submission successful:", data);
        document.getElementById("info-output").textContent = "Form submitted successfully!";
    })
    .catch(error => {
        console.error("Error submitting form:", error);
        document.getElementById("info-output").textContent = "Error submitting form. Please try again later.";
    });
});

// Input validation for name field (allows only letters and spaces)
const nameInput = document.getElementById("name");
const namePattern = /^[A-Za-z\s]+$/;
nameInput.addEventListener("input", function() {
    if (!namePattern.test(this.value)) {
        this.classList.add("error-flash");
        document.getElementById("error-output").textContent = "Invalid character entered in name field.";
        setTimeout(() => {
            this.classList.remove("error-flash");
            document.getElementById("error-output").textContent = "";
        }, 2000);
        this.setCustomValidity("Invalid character entered.");
    } else {
        this.setCustomValidity("");
    }
});

// Character countdown for comments textarea
const commentsTextarea = document.getElementById("comments");
const maxChars = commentsTextarea.getAttribute("maxlength") ? parseInt(commentsTextarea.getAttribute("maxlength"), 10) : 200;
commentsTextarea.addEventListener("input", function() {
    const remainingChars = maxChars - this.value.length;
    if (remainingChars < 10) {
        document.getElementById("info-output").textContent = `Warning: ${remainingChars} characters remaining.`;
        if (remainingChars < 0) {
            document.getElementById("info-output").textContent = `Error: ${Math.abs(remainingChars)} characters over limit!`;
        }
    } else {
        document.getElementById("info-output").textContent = "";
    }
});

// Dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeToggle.textContent = currentTheme === "dark" ? "Dark" : "Light";

    themeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "Dark" : "Light";
    });
});