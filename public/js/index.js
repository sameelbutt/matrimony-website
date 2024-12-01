import '@babel/polyfill';
import { login, logout } from './login';

// DOM Values
let loginform = document.querySelector('#loginForm');
let logoutLink = document.getElementById('logoutLink');

// Event Listeners
if (loginform) {
  loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.getElementById('emailInput').value;
    let password = document.getElementById('passwordInput').value;
    login(email, password);
  });
}

if (logoutLink) {
  logoutLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (err) {
      alert(err.response.data.message);
    }
  });
}
