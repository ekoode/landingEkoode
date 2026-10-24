<script setup lang="ts">
const { waLink, hasWhatsapp, igDm, igHandle } = useContact()

const heading = ref<HTMLElement>()
useLineReveal(heading)
</script>

<template>
  <section id="contacto" class="section bg-tinta" aria-labelledby="contacto-titulo">
    <div class="container-x flex flex-col items-start">
      <h2
        id="contacto-titulo"
        ref="heading"
        class="display max-w-[15ch] text-[clamp(2.5rem,1rem+6.5vw,6.5rem)] leading-[0.98]"
      >
        Cuéntanos qué quieres dejar de hacer a mano.
      </h2>
      <p class="lede mt-8">
        Escríbenos por WhatsApp o Instagram con lo que necesitas y te enviamos una cotización.
      </p>

      <div class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
        <a :href="waLink()" class="btn btn-primary min-h-14 px-8 text-base" target="_blank" rel="noopener">
          Escribir por WhatsApp
        </a>
        <a v-if="igDm" :href="igDm" class="link font-semibold" target="_blank" rel="noopener">
          Enviar DM a @{{ igHandle }}
        </a>
      </div>
      <p v-if="!hasWhatsapp" class="mt-6">
        <span class="todo">TODO: configura NUXT_PUBLIC_WHATSAPP en .env para activar los botones de WhatsApp</span>
      </p>
    </div>
  </section>
</template>
