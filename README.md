# EKOODE · Landing

Nuxt 4 + TypeScript + Tailwind CSS 4, GSAP + ScrollTrigger + SplitText, Lenis.
Se genera como sitio estático: no necesita Node en el servidor.

## Configuración

Copia `.env.example` a `.env` y completa:

| Variable | Ejemplo | Uso |
| --- | --- | --- |
| `NUXT_PUBLIC_WHATSAPP` | `51987654321` | Botones de WhatsApp (código de país, solo dígitos) |
| `NUXT_PUBLIC_INSTAGRAM` | `ekoode.pe` | Perfil y DM de Instagram |
| `NUXT_PUBLIC_SITE_URL` | `https://ekoode.pe` | Canonical, Open Graph, JSON-LD, sitemap y robots |

Los valores se escriben en el HTML durante el build: si cambias `.env`, vuelve a generar el sitio.

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
```

## Contenido

- **Proyectos:** `content/projects.ts`. Si el arreglo queda vacío, la sección no se muestra. Las imágenes van en `public/projects/` (ideal 1600×1200, WebP).
- **Marca:** `public/brand/` son los archivos oficiales del kit, sin modificar. La intro del hero usa la misma geometría separada en piezas (`app/utils/logo.ts`).
- Los textos con `TODO:` se ven en la página a propósito: reemplázalos antes de publicar.

## Build

```bash
npm run generate     # genera .output/public
npx serve .output/public   # vista previa local
```

## Despliegue en un VPS con Nginx

1. Genera el sitio con el dominio real en `.env` y súbelo:

   ```bash
   npm ci && npm run generate
   rsync -avz --delete .output/public/ usuario@tu-vps:/var/www/ekoode/
   ```

2. Crea `/etc/nginx/sites-available/ekoode`:

   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name ekoode.pe www.ekoode.pe;

       root /var/www/ekoode;
       index index.html;

       gzip on;
       gzip_types text/css application/javascript application/json image/svg+xml application/xml text/plain;

       # Archivos con hash en el nombre: caché de un año
       location /_nuxt/ {
           add_header Cache-Control "public, max-age=31536000, immutable";
           try_files $uri =404;
       }

       location /brand/ {
           add_header Cache-Control "public, max-age=2592000";
           try_files $uri =404;
       }

       # El HTML siempre se revalida para que los cambios se vean al instante
       location / {
           add_header Cache-Control "no-cache";
           try_files $uri $uri/ /index.html;
       }

       error_page 404 /404.html;
   }
   ```

3. Actívalo y agrega HTTPS:

   ```bash
   sudo ln -s /etc/nginx/sites-available/ekoode /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d ekoode.pe -d www.ekoode.pe
   ```

Para actualizar el sitio basta con repetir el paso 1; no hace falta reiniciar Nginx.
