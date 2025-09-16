document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const goRegister = document.getElementById('goRegister');
  const loginBtn = document.querySelector('.login-btn');

  // Botones sociales
  const googleBtn = document.querySelector('.google');
  const facebookBtn = document.querySelector('.facebook');
  const githubBtn = document.querySelector('.github');

  // Mostrar/Ocultar contraseña
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
  });

  // Validación en vivo
  function checkFields() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    loginBtn.disabled = !(username && password.length >= 6);
    loginBtn.style.opacity = loginBtn.disabled ? '0.6' : '1';
  }

  usernameInput.addEventListener('input', checkFields);
  passwordInput.addEventListener('input', checkFields);
  checkFields();

  // Envío del formulario normal
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (password.length < 6) {
      showError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    alert(`¡Bienvenido ${username}! Has iniciado sesión correctamente.`);
    window.location.href = 'index.html';
  });

  // Redirección a registro
  goRegister.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'registro.html';
  });

  // Función para mostrar error
  function showError(message) {
    const existing = document.querySelector('.error-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = 'error-message';
    msg.textContent = message;
    loginForm.insertBefore(msg, loginBtn);
  }

  // -------- Funciones de login social (simuladas) --------
  googleBtn.addEventListener('click', () => {
    alert("Has iniciado sesión con Google ✅");
    window.location.href = 'index.html';
  });

  facebookBtn.addEventListener('click', () => {
    alert("Has iniciado sesión con Facebook ✅");
    window.location.href = 'index.html';
  });

  githubBtn.addEventListener('click', () => {
    alert("Has iniciado sesión con GitHub ✅");
    window.location.href = 'index.html';
  });
});
