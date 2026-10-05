# Mi Patrimonio

App web personal para seguir el patrimonio y los gastos mes a mes. Funciona como una app instalable (PWA) en iPhone, iPad y navegador.

**Tus datos no están aquí.** Esta web es solo el código: cada persona inicia sesión con su cuenta de Microsoft y la app lee y guarda un archivo `datos.json` en **su propio OneDrive**. No hay servidor ni base de datos intermedios.

## Instalar en el iPhone

1. Abre la dirección de la web en **Safari**.
2. Pulsa **Compartir** → **Añadir a pantalla de inicio**.
3. Abre la app desde el nuevo icono e inicia sesión con Microsoft.

## Privacidad

- La app pide el permiso *Files.ReadWrite* de OneDrive (para leer y escribir tu `datos.json`).
- Los datos viajan solo entre tu dispositivo y tu OneDrive. Nada pasa por otros servidores.
- El «ID de aplicación» de Microsoft Entra que usa es público por diseño (no es una clave secreta).
