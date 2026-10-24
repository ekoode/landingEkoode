const DEFAULT_MESSAGE = 'Hola EKOODE, quiero cotizar un proyecto.'

export function useContact() {
  const { whatsapp, instagram } = useRuntimeConfig().public
  // Nuxt puede leer el número del .env como number: se normaliza a dígitos
  const number = String(whatsapp ?? '').replace(/\D/g, '')
  const handle = String(instagram ?? '').trim().replace(/^@/, '')

  return {
    hasWhatsapp: number.length > 0,
    hasInstagram: handle.length > 0,
    phone: number ? `+${number}` : '',
    waLink: (text = DEFAULT_MESSAGE) =>
      number ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : '#contacto',
    igProfile: handle ? `https://www.instagram.com/${handle}/` : '',
    igDm: handle ? `https://ig.me/m/${handle}` : '',
    igHandle: handle,
  }
}
