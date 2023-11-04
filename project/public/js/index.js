/* eslint-disable */
//import '@babel/polyfill';
/* import '@babel/polyfill'; */
import { login, logout } from './login';
/* const logOutBtn = document.querySelector('nav__el--logout'); */

const a = document.querySelector('.form--login');
if (a) {
  a.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
    alert('Done');
  });
}
const logOutBtn = document.querySelector('.nav__el--logout');
logOutBtn.addEventListener('click', e => {
  e.preventDefault();
  logout();
});

/* if (logOutBtn) logOutBtn.addEventListener('click', logout); */
