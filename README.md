# Landing Check-in Maker — Congreso 3D

Versión estática lista para GitHub y Netlify. No requiere instalación ni comando de compilación.

## Publicar en Netlify desde GitHub

1. Crear un repositorio vacío en GitHub.
2. Subir todos los archivos de esta carpeta a la raíz del repositorio.
3. En Netlify elegir **Add new site → Import an existing project → GitHub**.
4. Seleccionar el repositorio. Dejar **Build command** vacío y usar `.` como **Publish directory**.
5. Publicar y luego agregar el subdominio desde **Domain management**.

El formulario ya está vinculado al Google Sheets mediante Apps Script. También captura UTMs dentro de la columna `Origen` y emite el evento `generate_lead` en `dataLayer`, listo para Google Tag Manager.
