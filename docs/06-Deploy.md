# Deploy del Sistema

## Plataforma de despliegue

El sistema se publica en Netlify.

URL actual de producción:

https://rosita-finanzas.netlify.app

---

# Flujo de despliegue

El flujo actual es:

GitHub
↓
Netlify
↓
Producción

Cada cambio confirmado en GitHub genera un despliegue automático en Netlify.

---

# Repositorio

Repositorio:

rosita-finanzas

Rama principal:

main

---

# Carpeta base

La aplicación React se encuentra en:

rosita_finanzas_v2

---

# Configuración Netlify

Base directory:

rosita_finanzas_v2

Build command:

npm run build

Publish directory:

dist

---

# Variables de entorno

El proyecto utiliza las siguientes variables en Netlify:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Estas variables permiten conectar la aplicación con Supabase.

---

# Archivo netlify.toml

Ubicación:

rosita_finanzas_v2/netlify.toml

Configuración actual:

[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

---

# Proceso normal de actualización

1. Editar código en GitHub.
2. Hacer commit.
3. Netlify detecta el cambio.
4. Netlify ejecuta npm run build.
5. Si el build es correcto, publica la nueva versión.
6. Validar en la URL de producción.

---

# Recomendaciones

Durante desarrollo:

- Evitar commits innecesarios.
- Agrupar cambios pequeños antes de publicar.
- Revisar logs de Netlify si falla el deploy.
- Validar la aplicación después de cada cambio.

---

# Estados comunes de Netlify

Building:

El sitio se está compilando.

Published:

El sitio fue publicado correctamente.

Failed:

El despliegue falló y se debe revisar el log.

---

# Consideración sobre créditos

Netlify usa créditos mensuales para builds y funciones.

Durante el desarrollo se pueden consumir más créditos por la cantidad de commits.

Cuando el sistema esté estable, el consumo será mucho menor.
