# Arquitectura del Sistema

## Nombre del proyecto

Rosita Finanzas / Rosita ERP

## Objetivo técnico

Construir una aplicación web moderna, segura y escalable para administrar ventas, clientes, servicios, gastos, inventario y libro financiero mensual de una peluquera independiente.

---

# Arquitectura general

El sistema utiliza una arquitectura web moderna basada en:

- React + Vite para la interfaz.
- Supabase para base de datos, autenticación y API.
- GitHub para control de versiones.
- Netlify para publicación automática.

---

# Flujo general

Usuario
↓
Aplicación React
↓
Supabase API
↓
Base de datos PostgreSQL
↓
Dashboard financiero

---

# Componentes principales

## Frontend

Ubicación actual:

/rosita_finanzas_v2/src/main.jsx

Responsabilidades:

- Mostrar interfaz.
- Gestionar navegación.
- Registrar datos.
- Consultar Supabase.
- Mostrar dashboard.
- Calcular indicadores financieros.

---

## Backend

Actualmente el backend es Supabase.

Responsabilidades:

- Guardar ventas.
- Guardar clientes.
- Guardar servicios.
- Guardar gastos.
- Guardar inventario.
- Gestionar autenticación.
- Exponer API automática.

---

## Base de datos

Tablas actuales:

- ventas
- clientes
- servicios
- gastos
- inventario
- configuracion_financiera

Tablas futuras:

- cierres_mensuales
- usuarios_roles
- agenda
- reportes
- historial_cambios

---

# Módulos del sistema

## Dashboard

Muestra la información financiera del mes seleccionado:

- Total vendido.
- 50% peluquería.
- 50% Rosita.
- IVA Rosita.
- Gastos.
- Cash disponible.
- Métodos de pago.
- Ventas del mes.

---

## Ventas

Permite:

- Crear venta.
- Editar venta.
- Eliminar venta.
- Exportar ventas a Excel.

---

## Clientes

Permite:

- Crear cliente.
- Editar cliente.
- Eliminar cliente.
- Consultar historial futuro.

---

## Servicios

Permite:

- Crear servicio.
- Editar servicio.
- Eliminar servicio.
- Definir precio base.

---

## Gastos

Permite:

- Registrar gastos.
- Clasificar gastos.
- Marcar si tiene factura.
- Calcular impacto en cash disponible.

---

## Inventario

Permite:

- Registrar productos.
- Controlar stock.
- Definir stock mínimo.
- Registrar proveedor.
- Controlar costo.

---

## Libro financiero

Responsabilidad futura:

- Cierre mensual.
- Historial por mes.
- Reportes PDF.
- Reportes Excel.
- Resumen anual.
- Información para contador.

---

# Regla financiera principal

El sistema está diseñado para el modelo:

Total vendido mensual
↓
50% peluquería
↓
50% Rosita
↓
IVA sobre el 50% de Rosita
↓
Gastos
↓
Cash disponible

---

# Despliegue

El despliegue se realiza mediante:

GitHub
↓
Netlify
↓
Producción

Cada commit en la rama main genera un deploy automático.

---

# Seguridad

La autenticación se gestiona con Supabase Auth.

Estado actual:

- Login con email y contraseña.
- Usuarios registrados en Supabase.

Mejoras futuras:

- Roles.
- Administrador.
- Usuario solo lectura.
- Permisos por módulo.
- Auditoría de cambios.

---

# Estructura actual del repositorio

rosita-finanzas
│
├── docs
│   ├── 00-Vision.md
│   ├── 01-Roadmap.md
│   ├── 02-ReglasNegocio.md
│   └── 03-Arquitectura.md
│
└── rosita_finanzas_v2
    ├── public
    ├── src
    │   ├── main.jsx
    │   └── style.css
    ├── index.html
    ├── package.json
    └── netlify.toml

---

# Estructura futura recomendada

src
│
├── components
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── Card.jsx
│   ├── Table.jsx
│   └── ChartCard.jsx
│
├── pages
│   ├── Dashboard.jsx
│   ├── Ventas.jsx
│   ├── Clientes.jsx
│   ├── Servicios.jsx
│   ├── Gastos.jsx
│   ├── Inventario.jsx
│   └── LibroFinanciero.jsx
│
├── services
│   └── supabaseClient.js
│
├── utils
│   ├── money.js
│   ├── dates.js
│   └── taxes.js
│
└── styles
    └── global.css

---

# Principio de arquitectura

El sistema debe crecer de forma ordenada.

Cada módulo debe ser independiente, reutilizable y fácil de mantener.

El objetivo es que Rosita Finanzas pueda evolucionar desde una aplicación interna hacia un producto comercial para peluqueras independientes.
