import { randompass } from './utils.js';


export function changepass() {
  const rndpass = randompass();
  document.getElementById('sifre').value = rndpass;
}

export function togglePassword() {
  const passwordInput = document.getElementById('sifre');
  const toggleButton = document.getElementById('sifreGosterBtn');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}


export function setupUI() {
  const generateBtn = document.getElementById('gucluSifreBtn');
  if (generateBtn) {
    generateBtn.addEventListener("click", changepass);
  }

  const toggleBtn = document.getElementById('sifreGosterBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener("click", togglePassword);
  }
}
