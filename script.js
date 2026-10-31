document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const regNumberInput = document.getElementById('regNumber');
    const passwordInput = document.getElementById('password');
    const rememberMeInput = document.getElementById('rememberMe');
    const togglePasswordButton = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeOffIcon = document.getElementById('eyeOffIcon');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const formMessage = document.getElementById('formMessage');
    const currentYear = document.getElementById('currentYear');
    const savedRegNumberKey = 'bm-tech-saved-registration-number';
    let storageAvailable = true;

    currentYear.textContent = String(new Date().getFullYear());

    try {
        const savedRegNumber = localStorage.getItem(savedRegNumberKey);
        if (savedRegNumber) {
            regNumberInput.value = savedRegNumber;
            rememberMeInput.checked = true;
        }
    } catch (error) {
        storageAvailable = false;
        formMessage.textContent = 'Your browser has disabled saved preferences. You can still use the form.';
    }

    togglePasswordButton.addEventListener('click', () => {
        const showPassword = passwordInput.type === 'password';
        passwordInput.type = showPassword ? 'text' : 'password';
        eyeIcon.hidden = showPassword;
        eyeOffIcon.hidden = !showPassword;
        togglePasswordButton.setAttribute('aria-label', showPassword ? 'Hide password' : 'Show password');
        togglePasswordButton.setAttribute('aria-pressed', String(showPassword));
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        formMessage.classList.remove('form-message--error');

        const regNumber = regNumberInput.value.trim();
        if (!regNumber || !passwordInput.value) {
            formMessage.textContent = 'Enter your registration number and password to continue.';
            formMessage.classList.add('form-message--error');
            return;
        }

        if (storageAvailable) {
            try {
                if (rememberMeInput.checked) {
                    localStorage.setItem(savedRegNumberKey, regNumber);
                } else {
                    localStorage.removeItem(savedRegNumberKey);
                }
            } catch (error) {
                storageAvailable = false;
                formMessage.textContent = 'Your browser could not save your preference. Sign-in is not connected yet.';
                formMessage.classList.add('form-message--error');
                return;
            }
        }

        formMessage.textContent = 'Online sign-in is not connected yet. Please contact your academy administrator.';
    });

    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault();
        formMessage.classList.remove('form-message--error');
        formMessage.textContent = 'For a password reset, please contact your academy administrator.';
    });
});
