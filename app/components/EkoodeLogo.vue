<script setup lang="ts">
// Logotipo inline. Con `animated`, cada letra lleva su máscara y la K su recuadro
// de recorte, para la intro del hero. Formas y colores idénticos al SVG oficial.
defineProps<{ animated?: boolean }>()

const uid = useId()
const id = (name: string) => `${uid}-${name}`
</script>

<template>
  <svg
    :viewBox="LOGO_VIEWBOX"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    class="block"
    :style="{ aspectRatio: `${LOGO_RATIO}` }"
  >
    <defs>
      <linearGradient :id="id('stem')" x1="0" y1="0" x2="28" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#3C6DFF" /><stop offset="1" stop-color="#1537C9" />
      </linearGradient>
      <linearGradient :id="id('arm')" x1="28" y1="50" x2="98" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#2B5BFF" /><stop offset="1" stop-color="#5FE0F5" />
      </linearGradient>
      <linearGradient :id="id('leg')" x1="28" y1="50" x2="98" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#3C6DFF" /><stop offset="1" stop-color="#1537C9" />
      </linearGradient>
      <template v-if="animated">
        <clipPath v-for="l in LOGO_LETTERS" :id="id(`c-${l.id}`)" :key="l.id">
          <rect :x="l.x" y="-2" width="0" height="104" data-clip :data-w="l.w" />
        </clipPath>
        <clipPath :id="id('k-box')">
          <rect x="0" y="0" width="98" height="100" />
        </clipPath>
      </template>
    </defs>

    <g fill="#F4F8FD" fill-rule="evenodd">
      <path
        v-for="l in LOGO_LETTERS"
        :key="l.id"
        :d="l.d"
        :clip-path="animated ? `url(#${id(`c-${l.id}`)})` : undefined"
      />
    </g>

    <g :transform="`translate(${K_OFFSET_X} 0)`" :clip-path="animated ? `url(#${id('k-box')})` : undefined">
      <polygon data-k="stem" :points="K_PLANES.stem" :fill="`url(#${id('stem')})`" />
      <polygon data-k="arm" :points="K_PLANES.arm" :fill="`url(#${id('arm')})`" />
      <polygon data-k="leg" :points="K_PLANES.leg" :fill="`url(#${id('leg')})`" />
      <polygon data-k="node" :points="K_PLANES.node" fill="#0B132B" opacity="0.42" />
    </g>
  </svg>
</template>
