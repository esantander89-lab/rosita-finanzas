# API del Sistema

## Plataforma

La API principal del sistema es generada automáticamente por Supabase sobre PostgreSQL.

---

# Cliente API

El cliente se configura en:

rosita_finanzas_v2/src/main.jsx

Variables utilizadas:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

---

# Operaciones principales

## Ventas

Tabla:

ventas

Operaciones:

- select
- insert
- update
- delete

Uso:

Registrar, consultar, modificar y eliminar ventas.

---

## Clientes

Tabla:

clientes

Operaciones:

- select
- insert
- update
- delete

Uso:

Administrar clientas registradas.

---

## Servicios

Tabla:

servicios

Operaciones:

- select
- insert
- update
- delete

Uso:

Administrar servicios de peluquería.

---

## Gastos

Tabla:

gastos

Operaciones:

- select
- insert
- update
- delete

Uso:

Registrar gastos mensuales.

---

## Inventario

Tabla:

inventario

Operaciones:

- select
- insert
- update
- delete

Uso:

Control de productos, stock y proveedores.

---

# Autenticación

La autenticación utiliza Supabase Auth.

Métodos actuales:

- Email
- Contraseña

Funciones actuales:

- Login
- Crear usuario
- Cerrar sesión

---

# Seguridad

Actualmente el acceso está protegido por sesión de usuario.

Mejoras futuras:

- Roles
- Permisos por módulo
- Auditoría de cambios
- Políticas RLS más específicas
