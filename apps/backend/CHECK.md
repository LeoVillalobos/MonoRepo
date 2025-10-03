# Backend Checklist - NestJS

## 1. Arquitectura y estructura

- [x] CQRS (Commands / Queries / Handlers)
- [x] Inyección de dependencias (DI)
- [x] Modularización por funcionalidades

---

## 2. Seguridad

- [x] Autenticación con JWT
- [x] Autorización por roles (guards)
- [x] Protección de rutas sensibles
- [ ] Cifrado adicional de datos sensibles (ej. campos específicos en DB)
- [x] Refresh tokens y expiración de sesiones
- [x] Límite de intentos de login (prevención brute force)

---

## 3. Modelos y catálogos base

- [x] Usuarios
- [x] Roles
- [x] Permisos
- [x] Empleados
- [ ] Relaciones entre catálogos con integridad referencial (DB constraints)

---

## 4. DTOs y validaciones

- [x] DTOs para requests y responses
- [x] Validaciones con `class-validator`
- [x] Transformación de datos con `class-transformer`

---

## 5. Documentación

- [x] Swagger con endpoints documentados
- [x] Modelos y parámetros documentados con `ApiProperty`
- [ ] Versionado de API

---

## 6. Manejo de errores y logging

- [ ] ExceptionFilter global para respuestas consistentes
- [ ] Logging centralizado (NestJS Logger o Winston)

---

## 7. Paginación y filtros

- [x] Paginación genérica con `ResponsePagination`
- [ ] Filtros avanzados aplicados en endpoints de listados grandes

---

## 8. Testing

- [ ] Pruebas unitarias (handlers, services, guards)
- [ ] Pruebas de integración (endpoints y flujo de autenticación)

---

## Resumen

✅ **Listo y cubierto:** CQRS, DI, módulos, auth JWT, roles/permiso, DTOs, validaciones, Swagger, catálogos base.  
⚠️ **Por agregar/revisar:** logging centralizado, manejo global de errores, cifrado extra, refresh tokens, limitación de login, integridad de relaciones, filtros avanzados, versionado API, pruebas unitarias e integración.
