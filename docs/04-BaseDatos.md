# Base de Datos

## Motor

PostgreSQL (Supabase)

---

# Tabla clientes

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | uuid | Identificador |
| nombre | text | Nombre cliente |
| telefono | text | Teléfono |
| instagram | text | Instagram |

---

# Tabla servicios

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | uuid | Identificador |
| nombre | text | Servicio |
| precio_base | numeric | Precio |
| duracion_minutos | integer | Duración |

---

# Tabla ventas

| Campo | Tipo |
|--------|------|
| id | uuid |
| fecha | date |
| cliente_id | uuid |
| servicio_id | uuid |
| precio | numeric |
| adicional | numeric |
| total | numeric |
| forma_pago | text |
| documento | text |
| afecta_iva | boolean |
| iva | numeric |
| neto | numeric |

---

# Tabla gastos

| Campo | Tipo |
|--------|------|
| id | uuid |
| fecha | date |
| descripcion | text |
| categoria | text |
| monto | numeric |
| forma_pago | text |

---

# Tabla inventario

| Campo | Tipo |
|--------|------|
| id | uuid |
| producto | text |
| stock | numeric |
| costo | numeric |
| proveedor | text |

---

# Relaciones

Clientes

1 cliente
↓

Muchas ventas

---

Servicios

1 servicio
↓

Muchas ventas

---

Dashboard

Ventas
↓

Libro Financiero
↓

Indicadores

---

# Futuras tablas

agenda

usuarios

cierres_mensuales

historial

configuracion

reportes
