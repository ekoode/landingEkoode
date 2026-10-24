<script setup lang="ts">
const { siteUrl: rawSiteUrl } = useRuntimeConfig().public
const siteUrl = normalizeSiteUrl(rawSiteUrl)
const { phone, igProfile } = useContact()

const title = 'EKOODE · Software, automatización y cámaras de seguridad en Chiclayo'
const description =
  'Sistemas web, apps móviles, bots de WhatsApp e instalación de cámaras de seguridad para empresas de Chiclayo y Lambayeque. Cotiza por WhatsApp.'
const ogImage = `${siteUrl}/brand/ekoode-og-image.png`

useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogLocale: 'es_PE',
  ogSiteName: 'EKOODE',
  ogTitle: title,
  ogDescription: description,
  ogUrl: `${siteUrl}/`,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'EKOODE · Tu idea, nuestro código',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
})

// Sin dirección exacta ni horario: no se publican datos que no tenemos
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'EKOODE',
  slogan: 'Tu idea, nuestro código',
  description,
  url: `${siteUrl}/`,
  image: ogImage,
  logo: `${siteUrl}/brand/ekoode-og-image.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chiclayo',
    addressRegion: 'Lambayeque',
    addressCountry: 'PE',
  },
  areaServed: { '@type': 'AdministrativeArea', name: 'Lambayeque' },
  ...(phone && { telephone: phone }),
  ...(igProfile && { sameAs: [igProfile] }),
}

// Activa la intro antes del primer pintado. Si el JS no arranca en 3 s,
// se quita la clase y el contenido queda visible igual.
const introScript = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches||location.hash||sessionStorage.getItem('ek-intro'))return;d.classList.add('intro');setTimeout(function(){if(!window.__ekIntro)d.classList.remove('intro')},3000)}catch(e){}})()`

useHead({
  htmlAttrs: { lang: 'es-PE' },
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
    { rel: 'icon', href: '/brand/ekoode-favicon.svg', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'canonical', href: `${siteUrl}/` },
  ],
  meta: [{ name: 'theme-color', content: '#0B132B' }],
  script: [
    { key: 'intro', innerHTML: introScript, tagPosition: 'head' },
    { key: 'ld', type: 'application/ld+json', innerHTML: JSON.stringify(localBusiness) },
  ],
})
</script>

<template>
  <div>
    <a href="#contenido" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-cian focus:px-4 focus:py-2 focus:text-noche">
      Saltar al contenido
    </a>
    <SiteHeader />
    <main id="contenido">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <SiteFooter />
    <CustomCursor />
  </div>
</template>
