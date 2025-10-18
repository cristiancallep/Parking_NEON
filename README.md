# Parking_NEON

Sistema de gestión de estacionamiento desarrollado con tecnología NEON.

##  Índice
- [Configuración para Colaboradores](#configuración-para-colaboradores)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Solución de Problemas](#solución-de-problemas)
- [Contacto](#contacto)

---

##  Configuración para Colaboradores

### 1. Requisitos Previos
- Git instalado en tu sistema
- Cuenta de GitHub
- Acceso como colaborador al repositorio

### 2. Verificar Acceso al Repositorio
1. Ve a: `https://github.com/cristiancallep/Parking_NEON`
2. Si puedes ver el repositorio, tienes acceso ✅
3. Si aparece "404" o no puedes verlo, contacta al propietario para ser agregado como colaborador

### 3. Configurar Git (Primera vez)
```bash
# Configurar tu identidad en Git
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu-email@ejemplo.com"

# Verificar configuración
git config --global user.name
git config --global user.email
```

### 4. Configurar Autenticación

#### Opción A: Token de Acceso Personal (Recomendado)

1. **Crear Token Personal:**
   - Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click en "Generate new token (classic)"
   - Nombre: `Parking_NEON_Access`
   - Expiración: 90 days (o sin expiración)
   - Scopes: Selecciona `repo` (acceso completo a repositorios)
   - Click "Generate token"
   - ** COPIA EL TOKEN INMEDIATAMENTE** (solo se muestra una vez)

2. **Usar el Token:**
   ```bash
   # Al hacer push por primera vez, Git pedirá credenciales:
   Username: tu_usuario_github
   Password: ghp_xxxxxxxxxxxxxxxxxxxx (pega tu token aquí)
   ```

#### Opción B: SSH (Alternativa)

1. **Generar clave SSH:**
   ```bash
   ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
   # Presiona Enter para ubicación por defecto
   # Presiona Enter para sin contraseña (opcional)
   ```

2. **Agregar clave a GitHub:**
   ```bash
   # Copiar clave pública
   cat ~/.ssh/id_ed25519.pub
   # En Windows: type %USERPROFILE%\.ssh\id_ed25519.pub
   ```
   - Ve a GitHub → Settings → SSH and GPG keys → New SSH key
   - Pega la clave pública

3. **Configurar repositorio para SSH:**
   ```bash
   git remote set-url origin git@github.com:cristiancallep/Parking_NEON.git
   ```

---

##  Flujo de Trabajo

### 1. Clonar el Repositorio
```bash
# Con HTTPS (usando token)
git clone https://github.com/cristiancallep/Parking_NEON.git

# Con SSH (si configuraste SSH)
git clone git@github.com:cristiancallep/Parking_NEON.git

# Entrar al directorio
cd Parking_NEON
```

### 2. Trabajar con Ramas (Flujo Recomendado)
```bash
# 1. Actualizar repositorio local
git pull origin main

# 2. Crear nueva rama para tu feature
git checkout -b feature/nombre-de-tu-feature

# 3. Hacer cambios en el código
# ... editar archivos ...

# 4. Verificar cambios
git status
git diff

# 5. Agregar cambios al staging
git add .
# O agregar archivos específicos:
# git add archivo1.js archivo2.css

# 6. Hacer commit
git commit -m "feat: descripción clara del cambio"

# 7. Subir rama al repositorio
git push origin feature/nombre-de-tu-feature

# 8. Crear Pull Request en GitHub
# Ve a GitHub y crea el PR desde tu rama hacia main
```

### 3. Convenciones de Commits
Usa prefijos descriptivos en tus commits:
```bash
git commit -m "feat: agregar nueva funcionalidad de parking"
git commit -m "fix: corregir bug en cálculo de tarifas"
git commit -m "docs: actualizar documentación"
git commit -m "style: corregir formato de código"
git commit -m "refactor: reorganizar estructura de archivos"
git commit -m "test: agregar pruebas unitarias"
```

---

## 🔧 Solución de Problemas

### Error: "Permission denied" o "403 Forbidden"

1. **Verificar que eres colaborador:**
   - Contacta a `cristiancallep` para ser agregado al repositorio

2. **Verificar autenticación:**
   ```bash
   # Probar conexión
   git ls-remote origin
   
   # Si falla, reconfigura las credenciales
   git config --global --unset user.password
   ```

3. **Token expirado:**
   - Genera un nuevo token en GitHub
   - Usa el nuevo token en la próxima autenticación

### Error: "Could not resolve host"
```bash
# Verificar conexión a internet y DNS
ping github.com

# Verificar configuración del remoto
git remote -v
```

### Error: "Your branch is behind"
```bash
# Actualizar tu rama local
git pull origin main

# Si hay conflictos, resuélvelos y luego:
git add .
git commit -m "resolve: conflictos resueltos"
git push origin tu-rama
```

### Restablecer Configuración
```bash
# Verificar configuración actual
git config --list

# Reconfigurar remoto si es necesario
git remote set-url origin https://github.com/cristiancallep/Parking_NEON.git

# Verificar
git remote -v
```

---

##  Contacto

**Propietario del Repositorio:** cristiancallep  
**Email:** cristiancallepp@gmail.com

### ¿Necesitas ayuda?
1. Revisa esta guía completa
2. Busca en Issues del repositorio si tu problema ya fue reportado
3. Contacta al propietario del repositorio

---

##  Notas Importantes

-  **Nunca compartas tu token de acceso personal**
-  Siempre haz `git pull` antes de empezar a trabajar
-  Usa ramas para nuevas features (no trabajar directamente en `main`)
-  Escribe commits descriptivos y claros
-  Prueba tu código antes de hacer push

---

**¡Listo para contribuir! **