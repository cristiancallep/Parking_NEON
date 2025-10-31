// Elementos del DOM
const form = document.getElementById('registerForm');
const nombreInput = document.getElementById('nombre');
const apellidosInput = document.getElementById('apellidos');
const telefonoInput = document.getElementById('telefono');
const direccionInput = document.getElementById('direccion');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

// Requisitos de contraseña
const requirements = {
    length: document.getElementById('req-length'),
    lowercase: document.getElementById('req-lowercase'),
    uppercase: document.getElementById('req-uppercase'),
    number: document.getElementById('req-number'),
    special: document.getElementById('req-special')
};

// Toggle mostrar/ocultar contraseña (con guards y fallback si no hay <img>)
if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;

        // Cambiar el ícono SVG si existe, si no usar texto/emoji como fallback
        const imgIcon = togglePasswordBtn.querySelector('img');
        if (imgIcon) {
            imgIcon.src = type === 'password' ? '../assets/eye-icon.svg' : '../assets/eye-closed.svg';
            imgIcon.alt = type === 'password' ? 'Ver contraseña' : 'Ocultar contraseña';
        } else {
            togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
        }
    });
}

if (toggleConfirmPasswordBtn) {
    toggleConfirmPasswordBtn.addEventListener('click', () => {
        const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
        confirmPasswordInput.type = type;

        const imgIcon = toggleConfirmPasswordBtn.querySelector('img');
        if (imgIcon) {
            imgIcon.src = type === 'password' ? '../assets/eye-icon.svg' : '../assets/eye-closed.svg';
            imgIcon.alt = type === 'password' ? 'Ver contraseña' : 'Ocultar contraseña';
        } else {
            toggleConfirmPasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
        }
    });
}

// Validación en tiempo real de la contraseña
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    
    // Validar longitud
    if (password.length >= 5) {
        requirements.length.classList.add('met');
    } else {
        requirements.length.classList.remove('met');
    }
    
    // Validar minúscula
    if (/[a-z]/.test(password)) {
        requirements.lowercase.classList.add('met');
    } else {
        requirements.lowercase.classList.remove('met');
    }
    
    // Validar mayúscula
    if (/[A-Z]/.test(password)) {
        requirements.uppercase.classList.add('met');
    } else {
        requirements.uppercase.classList.remove('met');
    }
    
    // Validar número
    if (/[0-9]/.test(password)) {
        requirements.number.classList.add('met');
    } else {
        requirements.number.classList.remove('met');
    }
    
    // Validar carácter especial
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        requirements.special.classList.add('met');
    } else {
        requirements.special.classList.remove('met');
    }
});

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

function validateNombre() {
    const nombre = nombreInput.value.trim();
    if (nombre === '') {
        showError(nombreInput, 'El nombre es obligatorio');
        return false;
    }
    if (nombre.length < 2) {
        showError(nombreInput, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        showError(nombreInput, 'El nombre solo puede contener letras');
        return false;
    }
    clearError(nombreInput);
    return true;
}

function validateApellidos() {
    const apellidos = apellidosInput.value.trim();
    if (apellidos === '') {
        showError(apellidosInput, 'Los apellidos son obligatorios');
        return false;
    }
    if (apellidos.length < 2) {
        showError(apellidosInput, 'Los apellidos deben tener al menos 2 caracteres');
        return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidos)) {
        showError(apellidosInput, 'Los apellidos solo pueden contener letras');
        return false;
    }
    clearError(apellidosInput);
    return true;
}

function validateTelefono() {
    const telefono = telefonoInput.value.trim();
    if (telefono === '') {
        showError(telefonoInput, 'El teléfono es obligatorio');
        return false;
    }
    if (!/^[0-9]{10}$/.test(telefono)) {
        showError(telefonoInput, 'El teléfono debe tener 10 dígitos');
        return false;
    }
    clearError(telefonoInput);
    return true;
}

function validateDireccion() {
    const direccion = direccionInput.value.trim();
    if (direccion === '') {
        showError(direccionInput, 'La dirección es obligatoria');
        return false;
    }
    if (direccion.length < 5) {
        showError(direccionInput, 'La dirección debe ser más específica');
        return false;
    }
    clearError(direccionInput);
    return true;
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
        showError(passwordInput, 'La contraseña debe tener al menos 5 caracteres');
        return false;
    }
    
    if (!/[a-z]/.test(password)) {
        showError(passwordInput, 'La contraseña debe incluir al menos una minúscula');
        return false;
    }
    
    if (!/[A-Z]/.test(password)) {
        showError(passwordInput, 'La contraseña debe incluir al menos una mayúscula');
        return false;
    }
    
    if (!/[0-9]/.test(password)) {
        showError(passwordInput, 'La contraseña debe incluir al menos un número');
        return false;
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        showError(passwordInput, 'La contraseña debe incluir al menos un carácter especial');
        return false;
    }
    
    clearError(passwordInput);
    return true;
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === '') {
        showError(confirmPasswordInput, 'Debes confirmar tu contraseña');
        return false;
    }
     
    if (password !== confirmPassword) {
        showError(confirmPasswordInput, 'Las contraseñas no coinciden');
        return false;
    }
    
    clearError(confirmPasswordInput);
    return true;
}

function validateTerms() {
    // Si el checkbox no existe en el DOM (está comentado en el HTML), considerar válido
    if (!termsCheckbox) return true;
    if (!termsCheckbox.checked) {
        showError(termsCheckbox, 'Debes aceptar los términos y condiciones');
        return false;
    }
    clearError(termsCheckbox);
    return true;
}

// Validación en tiempo real (blur events)
nombreInput.addEventListener('blur', validateNombre);
apellidosInput.addEventListener('blur', validateApellidos);
telefonoInput.addEventListener('blur', validateTelefono);
direccionInput.addEventListener('blur', validateDireccion);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
if (termsCheckbox) {
    termsCheckbox.addEventListener('change', validateTerms);
}
direccionInput.addEventListener('blur', validateDireccion);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

// Limpiar errores al escribir
nombreInput.addEventListener('input', () => {
    if (nombreInput.classList.contains('error')) {
        clearError(nombreInput);
    }
});

apellidosInput.addEventListener('input', () => {
    if (apellidosInput.classList.contains('error')) {
        clearError(apellidosInput);
    }
});

telefonoInput.addEventListener('input', () => {
    if (telefonoInput.classList.contains('error')) {
        clearError(telefonoInput);
    }
});

direccionInput.addEventListener('input', () => {
    if (direccionInput.classList.contains('error')) {
        clearError(direccionInput);
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        clearError(emailInput);
    }
});

confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.classList.contains('error')) {
        clearError(confirmPasswordInput);
    }
});

if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => {
        if (termsCheckbox.checked) {
            clearError(termsCheckbox);
        }
    });
}

// Manejo del envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Ejecutar todas las validaciones
    const isNombreValid = validateNombre();
    const isApellidosValid = validateApellidos();
    const isTelefonoValid = validateTelefono();
    const isDireccionValid = validateDireccion();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();
    
    // Si todas las validaciones pasan
    if (
        isNombreValid &&
        isApellidosValid &&
        isTelefonoValid &&
        isDireccionValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isTermsValid
    ) {
        // Recopilar datos del formulario
        const formData = {
            nombre: nombreInput.value.trim(),
            apellidos: apellidosInput.value.trim(),
            telefono: telefonoInput.value.trim(),
            direccion: direccionInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };
        
        console.log('Formulario válido. Datos:', formData);
        
        // Aquí harías la petición al servidor
        // Ejemplo simulado:
        submitForm(formData);
    } else {
        // Scroll al primer error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Función simulada de envío
function submitForm(data) {
    const submitBtn = form.querySelector('.btn-submit');
    
    // Deshabilitar botón y mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Creando cuenta...</span>';
    
    // // Simular petición al servidor
    // setTimeout(() => {
    // // Simulación de registro exitoso
    // alert('¡Cuenta creada exitosamente! Bienvenido a Parking Neon');

    // Redirigir al login (solo si el formulario fue válido y el registro simulado fue exitoso)
    window.location.href = 'login.html';
        
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Crear Cuenta</span>';
        
        // Limpiar formulario
        form.reset();
        
        // Limpiar clases de validación
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('valid', 'error');
        });
        
        // Resetear requisitos de contraseña
        Object.values(requirements).forEach(req => {
            req.classList.remove('met');
        });
        
    // }, 2000);
}

// Prevenir pegado en el campo de confirmar contraseña
confirmPasswordInput.addEventListener('paste', (e) => {
    e.preventDefault();
    showError(confirmPasswordInput, 'Por seguridad, escribe tu contraseña nuevamente');
});

// Formateo automático del teléfono
telefonoInput.addEventListener('input', (e) => {
    // Solo permitir números
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    
    // Limitar a 10 dígitos
    if (e.target.value.length > 10) {
        e.target.value = e.target.value.slice(0, 10);
    }
});

// Capitalizar primera letra de nombre y apellidos
function capitalizeInput(input) {
    input.addEventListener('input', (e) => {
        const words = e.target.value.split(' ');
        const capitalizedWords = words.map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            return word;
        });
        e.target.value = capitalizedWords.join(' ');
    });
}

capitalizeInput(nombreInput);
capitalizeInput(apellidosInput);

// Prevenir espacios al inicio de los inputs
const allInputs = [nombreInput, apellidosInput, telefonoInput, direccionInput, emailInput];
allInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        if (e.target.value.startsWith(' ')) {
            e.target.value = e.target.value.trimStart();
        }
    });
});

// Validación de seguridad adicional para el email
emailInput.addEventListener('input', () => {
    emailInput.value = emailInput.value.toLowerCase().trim();
});