// Elementos del DOM
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberCheckbox = document.getElementById('remember');

// // Toggle mostrar/ocultar contraseña
// togglePasswordBtn.addEventListener('click', () => {
//     const type = passwordInput.type === 'password' ? 'text' : 'password';
//     passwordInput.type = type;
//     togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
// });

// Funciones de validación
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    input.classList.add('error');
    input.classList.remove('valid');
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    input.classList.remove('error');
    if (input.value.trim() !== '') {
        input.classList.add('valid');
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    
    if (email === '') {
        showError(emailInput, 'El correo electrónico es obligatorio');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(emailInput, 'Ingresa un correo electrónico válido');
        return false;
    }
    
    clearError(emailInput);
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    
    if (password === '') {
        showError(passwordInput, 'La contraseña es obligatoria');
        return false;
    }
    
    if (password.length < 5) {
        showError(passwordInput, 'La contraseña es incorrecta');
        return false;
    }
    
    clearError(passwordInput);
    return true;
}

// Validación en tiempo real (blur events)
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);

// Limpiar errores al escribir
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        clearError(emailInput);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('error')) {
        clearError(passwordInput);
    }
});

// Formatear email automáticamente
emailInput.addEventListener('input', () => {
    emailInput.value = emailInput.value.toLowerCase().trim();
});

// Prevenir espacios en el email
emailInput.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
    }
});

// Manejo del envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Ejecutar todas las validaciones
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    // Si todas las validaciones pasan
    if (isEmailValid && isPasswordValid) {
        // Recopilar datos del formulario
        const formData = {
            email: emailInput.value.trim(),
            password: passwordInput.value,
            remember: rememberCheckbox.checked
        };
        
        console.log('Formulario válido. Datos:', formData);
        
        // Aquí harías la petición al servidor
        loginUser(formData);
    } else {
        // Scroll al primer error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
    }
});

// Función simulada de login
function loginUser(data) {
    const submitBtn = form.querySelector('.btn-submit');
    
    // Deshabilitar botón y mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Iniciando sesión...</span>';
    
    // Simular petición al servidor
    setTimeout(() => {
        // Simulación de login exitoso
        console.log('Login exitoso con:', data);
        
        // Guardar sesión si "recordarme" está activado
        if (data.remember) {
            localStorage.setItem('rememberUser', data.email);
        }
        
        alert('¡Inicio de sesión exitoso! Redirigiendo al dashboard...');
        
        // Aquí rediriges al dashboard
        // window.location.href = 'dashboard.html';
        
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Iniciar Sesión</span>';
        
    }, 1500);
}

// Cargar email guardado si existe
window.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('rememberUser');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});

// Manejo de tecla Enter
form.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});