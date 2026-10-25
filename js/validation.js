
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const github = document.getElementById("github").value.trim();
    const avatar = document.getElementById("avatar").files[0];
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = "";

    if (fullName === "" || email === "" || github === "") {
        errorMessage.textContent = "Please complete all fields.";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    if (!/^@[A-Za-z0-9-]+$/.test(github) ||
        github.length > 40 ||
        github === "@") {
        errorMessage.textContent = "Please enter a valid GitHub username beginning with @.";
        return;
    }

    if (!avatar) {
        errorMessage.textContent = "Please upload an avatar.";
        return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(avatar.type)) {
        errorMessage.textContent = "Only JPG and PNG images are allowed.";
        return;
    }

    if (avatar.size > 500 * 1024) {
        errorMessage.textContent = "Your image must be smaller than 500 KB.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        const registration = {
            fullName: fullName,
            email: email,
            github: github,
            avatar: reader.result
        };

        localStorage.setItem("registration", JSON.stringify(registration));

        window.location.href = "ticket.html";
    };

    reader.onerror = function() {
        errorMessage.textContent = "Unable to read the uploaded image. Please try another image.";
    };

    reader.readAsDataURL(avatar);
});
