/* eslint-disable */
//import { showAlert } from './alerts';
const logOutBtn = document.querySelector(".nav__el--logout");

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};

async function login(email, password) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/register/newRegister",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully");
      alert("dswfdf fdsfw");
      window.setTimeout(() => {
        location.assign("/register");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
}

const logout = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/logout",
    });
    if (res.data.status === "success") location.reload(true);
  } catch (err) {
    console.log(err.response);
  }
};
const a = document.querySelector(".form--login");
if (a) {
  a.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
