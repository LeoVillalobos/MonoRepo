# Backend Security Checklist - NestJS

## 1️⃣ Autenticación y sesiones

- [x] **JWT Access Tokens** para proteger endpoints.
- [x] **Refresh Tokens**:
  - Implementar flujo de refresh tokens (guardados en DB o Redis).
  - Rotación de tokens: invalidar refresh token anterior al generar uno nuevo.
  - Logout invalida refresh token.
- [x] **Validación de credenciales** con bcrypt.
- [x] **Opcional**: Expiración corta para access token, larga para refresh token.

---

## 2️⃣ Autorización

- [x] **Roles y permisos básicos** implementados con Guards.
- [ ] **Policies granulares**:
  - Ejemplo: un usuario solo puede editar su propio perfil.
  - Uso de Policy Guards o librerías como Casbin / AccessControl.
- [x] **Guardias por endpoint** para rutas sensibles.

---

## 3️⃣ Protección contra ataques comunes

- [x] **Rate limiting / Throttling**:
  - Prevenir fuerza bruta en `/auth/login` y `/auth/refresh` con `@nestjs/throttler`.
- [x] **Helmet**:
  - Cabeceras de seguridad HTTP (`X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `X-XSS-Protection`, etc.).
  - Opcional: Content Security Policy (CSP) si el frontend carga HTML/JS.
- [x] **CORS**:
  - Configurado con dominios permitidos y métodos.
  - `credentials: true` si se envían cookies.
- [x] **Body Parsing**:
  - JSON y URL-encoded con límites personalizados (ej. 10MB).
- [ ] **CSRF**:
  - Solo necesario si se usan cookies de sesión.
  - Con JWT en headers, no es necesario.

---

## 4️⃣ Datos sensibles

- [x] **Hashing de contraseñas** con bcrypt (o argon2).
- [ ] **Cifrado de datos críticos** en DB (información sensible adicional a contraseñas).
- [x] **Manejo de secrets** con variables de entorno; nada hardcodeado en el código.

---

## 5️⃣ Logging y auditoría

- [ ] **Registro de intentos de login fallidos**.
- [ ] **Auditoría de acciones críticas** (crear, editar, eliminar recursos).
- [ ] **Logs estructurados** para análisis y monitoreo.

---

## 6️⃣ Buenas prácticas adicionales

- [x] Configurar **TLS/HTTPS** obligatorio en producción.
- [ ] Monitoreo de endpoints y alertas de seguridad.
- [ ] Revisar dependencias para vulnerabilidades (ej. `npm audit` o `pnpm audit`).

---

✅ Con este checklist tienes una **visión completa de la seguridad de tu backend NestJS**, indicando lo que ya implementaste y lo opcional que podrías agregar según tu arquitectura.
