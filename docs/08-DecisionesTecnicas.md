# Decisiones Técnicas

Este documento registra las decisiones importantes del proyecto y las razones por las cuales fueron tomadas.

---

# DT-001

Fecha

Junio 2026

Decisión

Utilizar React para el Frontend.

Motivo

- Desarrollo rápido.
- Gran comunidad.
- Fácil mantenimiento.
- Excelente integración con Supabase.

Estado

Implementado.

---

# DT-002

Decisión

Utilizar Supabase como Backend.

Motivo

- Base de datos PostgreSQL.
- API REST automática.
- Autenticación integrada.
- Hosting gratuito suficiente para comenzar.
- Escalabilidad futura.

Estado

Implementado.

---

# DT-003

Decisión

Utilizar Netlify para producción.

Motivo

- Deploy automático desde GitHub.
- HTTPS gratuito.
- Muy sencillo de administrar.
- Excelente integración con React.

Estado

Implementado.

---

# DT-004

Decisión

Utilizar GitHub como repositorio oficial.

Motivo

- Control de versiones.
- Historial de cambios.
- Trabajo colaborativo.
- Integración continua.

Estado

Implementado.

---

# DT-005

Decisión

Separar la lógica financiera de la lógica visual.

Motivo

Toda regla financiera debe mantenerse independiente del diseño para facilitar futuras modificaciones legales.

Estado

Implementado.

---

# DT-006

Decisión

Calcular automáticamente el reparto económico.

Regla

Venta realizada

↓

50% Peluquería

↓

50% Rosita

↓

Calcular IVA

↓

Obtener utilidad real.

Motivo

Evitar errores manuales.

Estado

Implementado.

---

# DT-007

Decisión

Dashboard mensual.

Motivo

Cada mes debe analizarse de forma independiente para evitar mezclar información financiera.

Estado

Implementado.

---

# DT-008

Decisión

Mantener historial permanente.

Motivo

Nunca eliminar información histórica.

Toda la información queda almacenada para consultas futuras.

Estado

Implementado.

---

# DT-009

Decisión

Todas las entidades serán editables.

Aplica para:

- Clientes
- Servicios
- Ventas
- Gastos
- Inventario

Motivo

No obligar al usuario a eliminar registros por errores pequeños.

Estado

Pendiente.

---

# DT-010

Decisión

Construir el proyecto con arquitectura escalable.

Objetivo

Que Rosita Finanzas pueda evolucionar desde un libro financiero personal hasta un ERP completo para peluquerías.

Estado

En desarrollo.
