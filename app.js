import { displayPasswords, showDetails, deletePassword, editPassword } from './storage.js';
import { setupUI } from './ui.js';

const passwords = JSON.parse(localStorage.getItem('passwords')) || [];

window.showDetails = showDetails;
window.deletePassword = deletePassword;
window.editPassword = editPassword;

document.getElementById('sifreFormu').addEventListener('submit', function(e) {
  e.preventDefault();

  const appName = document.getElementById('uygulamaAdi').value.trim();
  const username = document.getElementById('kullaniciAdi').value.trim();
  const password = document.getElementById('sifre').value.trim();

  if (appName === "" || username === "" || password === "") {
    alert('Lütfen tüm alanları doldurun.');
    return;
  }

  addPassword(appName, username, password);
  document.getElementById('sifreFormu').reset();
});

export function addPassword(appName, username, password) {
  passwords.push({ appName, username, password });
  localStorage.setItem('passwords', JSON.stringify(passwords));
  displayPasswords(passwords);
}

window.addEventListener('load', () => {
  setupUI();
  displayPasswords(passwords);
});
