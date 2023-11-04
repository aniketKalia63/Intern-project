/* eslint-disable */
/* import axios from 'axios'; */
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const userDataForm = document.querySelector('.form-user-data');
const userPassForm = document.querySelector('.form-user-password');
// type is either 'password' or 'data'
export const updateDate = async (name, email) => {
  try {
    /*   const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe'; */

    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: {
        name,
        email
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const updatePass = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updatePassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', `updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err);
  }
};

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    console.log('NNNNNNNNNNNNNNNNNNNNNNNNNn', email);
    updateDate(name, email);
  });
if (userPassForm)
  userPassForm.addEventListener('submit', e => {
    e.preventDefault();
  
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    updatePass(passwordCurrent, password, passwordConfirm);
  });
