const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    loginMessage.textContent = "Please fill in all fields.";
    loginMessage.style.color = "red";
    return;
  }

  loginMessage.textContent =
    "Login UI is working! Backend authentication will be added later.";

  loginMessage.style.color = "green";
});

document
  .getElementById("forgotPassword")
  .addEventListener("click", function (event) {
    event.preventDefault();

    alert("Password recovery will be implemented with the backend.");
  });
