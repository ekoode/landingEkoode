<script setup lang="ts">
const { waLink, hasWhatsapp, igProfile, igHandle } = useContact()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-humo/10 bg-noche">
    <div class="container-x flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-col gap-3">
        <img src="/brand/ekoode-logotipo-color-oscuro.svg" alt="EKOODE" width="148" height="24" class="h-6 w-auto" loading="lazy" />
        <p class="text-sm text-niebla">Chiclayo, Perú</p>
      </div>

      <ul class="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
        <li v-if="igProfile">
          <a :href="igProfile" class="link" target="_blank" rel="noopener">Instagram @{{ igHandle }}</a>
        </li>
        <li>
          <a v-if="hasWhatsapp" :href="waLink()" class="link" target="_blank" rel="noopener">WhatsApp</a>
          <span v-else class="todo">TODO: NUXT_PUBLIC_WHATSAPP</span>
        </li>
        <li class="text-niebla">© {{ year }} EKOODE</li>
      </ul>
    </div>
  </footer>
</template>
