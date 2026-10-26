/**
 * Simple Signup Form Validation & Password Strength
 * Pure Vanilla JavaScript
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Form & Card elements
  const form = document.getElementById('signup-form');
  const formCard = document.getElementById('form-card');
  const successCard = document.getElementById('success-card');
  const submitBtn = document.getElementById('submit-btn');

  // Input fields
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Password UI elements
  const toggleBtn = document.getElementById('toggle-password');
  const eyeOpen = toggleBtn.querySelector('.eye-open');
  const eyeClosed = toggleBtn.querySelector('.eye-closed');
  const strengthMeter = document.getElementById('password-strength');
  const strengthText = document.getElementById('strength-text');

  // Regex patterns
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const NAME_REGEX = /^[a-zA-Z\s'-]{2,}$/;

  // --- Inline Field State Helper ---
  // Sets error or success directly via the input's parent container
  function setFieldStatus(input, errorMessage) {
    const parent = input.closest('.form-group');
    const errorEl = document.getElementById(`${input.id}-error`);

    if (errorMessage) {
      parent.classList.add('has-error');
      parent.classList.remove('has-success');
      errorEl.textContent = errorMessage;
      return false;
    }

    parent.classList.remove('has-error');
    parent.classList.add('has-success');
    errorEl.textContent = '';
    return true;
  }

  // --- Validation Logic ---
  function validateName() {
    const value = nameInput.value.trim();
    if (!value) return setFieldStatus(nameInput, 'Full name is required.');
    if (value.length < 2) return setFieldStatus(nameInput, 'Name must be at least 2 characters.');
    if (!NAME_REGEX.test(value)) return setFieldStatus(nameInput, 'Name should only contain letters.');
    return setFieldStatus(nameInput, '');
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) return setFieldStatus(emailInput, 'Email address is required.');
    if (!EMAIL_REGEX.test(value)) return setFieldStatus(emailInput, 'Please enter a valid email address.');
    return setFieldStatus(emailInput, '');
  }

  function validatePassword() {
    const value = passwordInput.value;
    const isStrong = updatePasswordStrength(value);
    if (!value) return setFieldStatus(passwordInput, 'Password is required.');
    if (!isStrong) return setFieldStatus(passwordInput, 'Please meet all password requirements below.');
    return setFieldStatus(passwordInput, '');
  }

  // --- Password Strength & Checklist ---
  function updatePasswordStrength(value) {
    const checks = {
      length: value.length >= 8,
      lower: /[a-z]/.test(value),
      upper: /[A-Z]/.test(value),
      numSpec: /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)
    };

    // Update checklist criteria icons
    toggleCheck('rule-length', checks.length);
    toggleCheck('rule-lowercase', checks.lower);
    toggleCheck('rule-uppercase', checks.upper);
    toggleCheck('rule-number-special', checks.numSpec);

    // Calculate score (0 to 4)
    const score = Object.values(checks).filter(Boolean).length;
    const levels = ['', 'weak', 'fair', 'good', 'strong'];
    const texts = ['None', 'Weak', 'Fair', 'Good', 'Strong'];

    strengthMeter.className = 'strength-container' + (score > 0 ? ` strength-${levels[score]}` : '');
    strengthText.textContent = value ? texts[score] : 'None';

    return score === 4;
  }

  function toggleCheck(elementId, isValid) {
    const el = document.getElementById(elementId);
    el.classList.toggle('valid', isValid);
    el.querySelector('.check-icon').textContent = isValid ? '✓' : '✕';
  }

  // --- Events ---
  // Real-time validation on blur and input
  nameInput.addEventListener('blur', validateName);
  nameInput.addEventListener('input', () => {
    if (nameInput.closest('.form-group').classList.contains('has-error')) validateName();
  });

  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.closest('.form-group').classList.contains('has-error')) validateEmail();
  });

  passwordInput.addEventListener('input', () => {
    updatePasswordStrength(passwordInput.value);
    if (passwordInput.closest('.form-group').classList.contains('has-error')) validatePassword();
  });
  passwordInput.addEventListener('blur', validatePassword);

  // Show / Hide Password toggle
  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeOpen.style.display = isPassword ? 'none' : 'block';
    eyeClosed.style.display = isPassword ? 'block' : 'none';
  });

  // Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    // Prevent submission if invalid
    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      if (!isNameValid) nameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else passwordInput.focus();
      return;
    }

    // Success flow
    document.getElementById('success-name').textContent = nameInput.value.trim();
    document.getElementById('success-email').textContent = emailInput.value.trim();
    formCard.style.display = 'none';
    successCard.style.display = 'block';
  });

  // Reset / Register another
  document.getElementById('reset-btn').addEventListener('click', () => {
    form.reset();
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('has-error', 'has-success');
      const errorMsg = group.querySelector('.error-message');
      if (errorMsg) errorMsg.textContent = '';
    });
    updatePasswordStrength('');
    passwordInput.type = 'password';
    eyeOpen.style.display = 'block';
    eyeClosed.style.display = 'none';
    successCard.style.display = 'none';
    formCard.style.display = 'block';
    nameInput.focus();
  });
});
