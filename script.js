// script.js

const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let checkBox = false;
let email = "";
let passWord = "";
const modal = document.getElementById("myModal");
const checkBoxField = document.getElementById("check-box");
const passWordField = document.getElementById("password");
const emailField = document.getElementById("email");
const checkBoxError = document.getElementById("check-box-error-field");
const passWordError = document.getElementById("password-error-field");
const emailError = document.getElementById("email-error-field");

let isMobile = window.innerWidth < 450;
window.addEventListener("resize", () => {
  isMobile = window.innerWidth < 400;
});

const decodedCookie = decodeURIComponent(document.cookie);
const cookieMap = decodedCookie
  .split(";")
  .reduce(
    (acc, curr) => ({
      ...acc,
      [curr.split("=")[0] ?? "IsLoggedIn"]: JSON.parse(
        curr.split("=")[1] ?? "false"
      ),
    }),
    {}
  );
hideModal();

if (isMobile) {
  modal.style.display = "none";
  setTimeout(() => {
    hideModal();
  }, 5000);
}
checkBoxField.addEventListener("change", (event) => {
  checkBoxError.style.display = "none";
  checkBox = event.target.checked;
});
emailField.addEventListener("change", (event) => {
  emailError.style.display = "none";
  email = event.target.value;
});

passWordField.addEventListener("change", (event) => {
  passWordError.style.display = "none";
  passWord = event.target.value;
});

var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  closeModal();
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

function closeModal() {
  const IsLoggedIn =
    email.length > 0 && REGEX.test(email) && checkBox && passWord.length > 6;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  const cookieString =
    "IsLoggedIn" +
    "=" +
    IsLoggedIn +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";

  document.cookie = cookieString;
  modal.style.display = "none";
}

function login() {
  if (
    email.length === 0 ||
    !REGEX.test(email) ||
    !checkBox ||
    passWord.length === 0 ||
    passWord.length < 6
  ) {
    if (email.length === 0) {
      emailError.style.display = "block";
      emailError.innerHTML = "Email is be empty";
    }
    if (email.length > 0 && !REGEX.test(email)) {
      emailError.style.display = "block";
      emailError.innerHTML = "Please enter a valid email";
    }
    if (passWord.length === 0) {
      passWordError.style.display = "block";
      passWordError.innerHTML = "Password cant be empty";
    }

    if (passWord.length < 6) {
      passWordError.style.display = "block";
      passWordError.innerHTML = "Password must be longer than 6 characters";
    }
    if (!checkBox) {
      checkBoxError.style.display = "block";
    }
    return;
  }

  closeModal();
}

function hideModal() {
  if (cookieMap?.IsLoggedIn) {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}
