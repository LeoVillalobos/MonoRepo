-- ================================================
-- Script de creación de la base de datos
-- Sistema de usuarios, roles, permisos y empleados
-- ================================================

-- ================================================
-- Tabla: employees
-- ================================================
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    position VARCHAR(50),
    department VARCHAR(50),
    au_terminal VARCHAR(100),
    au_usuario VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

COMMENT ON TABLE employees IS 'Tabla que almacena la información de los empleados';
COMMENT ON COLUMN employees.id IS 'Identificador único del empleado (UUIDv4)';
COMMENT ON COLUMN employees.first_name IS 'Nombre(s) del empleado';
COMMENT ON COLUMN employees.last_name IS 'Apellido(s) del empleado';
COMMENT ON COLUMN employees.email IS 'Correo electrónico del empleado (único)';
COMMENT ON COLUMN employees.phone IS 'Número de teléfono del empleado';
COMMENT ON COLUMN employees.position IS 'Puesto o cargo que desempeña el empleado';
COMMENT ON COLUMN employees.department IS 'Departamento o área del empleado';
COMMENT ON COLUMN employees.au_terminal IS 'Terminal donde se creó o modificó el registro';
COMMENT ON COLUMN employees.au_usuario IS 'Usuario que creó o modificó el registro';
COMMENT ON COLUMN employees.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN employees.updated_at IS 'Fecha y hora de la última actualización';
COMMENT ON COLUMN employees.deleted_at IS 'Fecha de eliminación lógica (soft delete)';


-- ================================================
-- Tabla: roles
-- ================================================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    au_terminal VARCHAR(100),
    au_usuario VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

COMMENT ON TABLE roles IS 'Tabla que define los roles del sistema';
COMMENT ON COLUMN roles.id IS 'Identificador único del rol (UUIDv4)';
COMMENT ON COLUMN roles.name IS 'Nombre único del rol (ej: admin, editor, viewer)';
COMMENT ON COLUMN roles.description IS 'Descripción del rol';
COMMENT ON COLUMN roles.au_terminal IS 'Terminal donde se creó o modificó el registro';
COMMENT ON COLUMN roles.au_usuario IS 'Usuario que creó o modificó el registro';
COMMENT ON COLUMN roles.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN roles.updated_at IS 'Fecha y hora de la última actualización';
COMMENT ON COLUMN roles.deleted_at IS 'Fecha de eliminación lógica (soft delete)';


-- ================================================
-- Tabla: permissions
-- ================================================
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    au_terminal VARCHAR(100),
    au_usuario VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

COMMENT ON TABLE permissions IS 'Tabla que define los permisos del sistema';
COMMENT ON COLUMN permissions.id IS 'Identificador único del permiso (UUIDv4)';
COMMENT ON COLUMN permissions.name IS 'Nombre único del permiso (ej: create_user, delete_post)';
COMMENT ON COLUMN permissions.description IS 'Descripción del permiso';
COMMENT ON COLUMN permissions.au_terminal IS 'Terminal donde se creó o modificó el registro';
COMMENT ON COLUMN permissions.au_usuario IS 'Usuario que creó o modificó el registro';
COMMENT ON COLUMN permissions.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN permissions.updated_at IS 'Fecha y hora de la última actualización';
COMMENT ON COLUMN permissions.deleted_at IS 'Fecha de eliminación lógica (soft delete)';

-- ================================================
-- Tabla: role_permissions (relación muchos a muchos)
-- ================================================
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    au_terminal VARCHAR(100),
    au_usuario VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    UNIQUE (role_id, permission_id)
);

COMMENT ON TABLE role_permissions IS 'Relación muchos a muchos entre roles y permisos';
COMMENT ON COLUMN role_permissions.id IS 'Identificador único de la relación (UUIDv4)';
COMMENT ON COLUMN role_permissions.role_id IS 'FK al rol asociado';
COMMENT ON COLUMN role_permissions.permission_id IS 'FK al permiso asociado';
COMMENT ON COLUMN role_permissions.au_terminal IS 'Terminal donde se creó o modificó el registro';
COMMENT ON COLUMN role_permissions.au_usuario IS 'Usuario que creó o modificó el registro';
COMMENT ON COLUMN role_permissions.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN role_permissions.updated_at IS 'Fecha y hora de la última actualización';
COMMENT ON COLUMN role_permissions.deleted_at IS 'Fecha de eliminación lógica (soft delete)';

-- ================================================
-- Tabla: users
-- ================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    au_terminal VARCHAR(100),
    au_usuario VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

COMMENT ON TABLE users IS 'Tabla que almacena los usuarios del sistema y su relación con empleados y roles';
COMMENT ON COLUMN users.id IS 'Identificador único del usuario (UUIDv4)';
COMMENT ON COLUMN users.username IS 'Nombre único del usuario para login';
COMMENT ON COLUMN users.email IS 'Correo electrónico único del usuario';
COMMENT ON COLUMN users.password IS 'Contraseña del usuario en formato hasheado';
COMMENT ON COLUMN users.employee_id IS 'FK al empleado asociado (puede ser NULL)';
COMMENT ON COLUMN users.role_id IS 'FK al rol del usuario (puede ser NULL)';
COMMENT ON COLUMN users.au_terminal IS 'Terminal donde se creó o modificó el registro';
COMMENT ON COLUMN users.au_usuario IS 'Usuario que creó o modificó el registro';
COMMENT ON COLUMN users.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN users.updated_at IS 'Fecha y hora de la última actualización';
COMMENT ON COLUMN users.deleted_at IS 'Fecha de eliminación lógica (soft delete)';

