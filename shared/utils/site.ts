// NUXT_PUBLIC_SITE_URL vacía en .env pisa el valor por defecto: se normaliza aquí
export function normalizeSiteUrl(value: unknown) {
  return (String(value ?? '').trim() || 'http://localhost:3000').replace(/\/$/, '')
}
