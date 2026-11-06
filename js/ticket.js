const savedRegistration = localStorage.getItem("registration");

if (savedRegistration === null) {
    window.location.href = "index.html";
} else {
    const registration = JSON.parse(savedRegistration);

    document.getElementById("ticketName").textContent = registration.fullName;

    document.getElementById("ticketFullName").textContent = registration.fullName;

    const githubUsername = registration.github.replace(/^@/, "");

    const githubLink = document.getElementById("ticketGithub");
    githubLink.textContent = "@" + githubUsername;
    githubLink.href = "https://github.com/" + githubUsername;

    document.getElementById("ticketEmail").textContent = registration.email;

    const ticketAvatar = document.getElementById("ticketAvatar");
    ticketAvatar.src = registration.avatar;
}
