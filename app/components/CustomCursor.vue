<script setup lang="ts">
// Anillo que sigue al puntero y crece sobre lo clickeable. Solo escritorio.
const ring = ref<HTMLElement>()
const active = ref(false)

onMounted(() => {
  const { gsap, reduced, finePointer } = useNuxtApp().$motion
  if (reduced || !finePointer || !ring.value) return

  active.value = true
  const html = document.documentElement
  html.classList.add('has-cursor')

  const el = ring.value
  gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.3, opacity: 0 })
  const toX = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
  const toY = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })

  window.addEventListener('pointermove', (e) => {
    toX(e.clientX)
    toY(e.clientY)
    gsap.to(el, { opacity: 1, duration: 0.2, overwrite: 'auto' })
  }, { passive: true })

  document.addEventListener('pointerover', (e) => {
    const hit = (e.target as Element).closest('a, button, [data-cursor]')
    gsap.to(el, { scale: hit ? 1 : 0.3, duration: 0.35, ease: 'power3.out' })
  })

  html.addEventListener('pointerleave', () => gsap.to(el, { opacity: 0, duration: 0.2 }))
})
</script>

<template>
  <div v-show="active" ref="ring" class="cursor" aria-hidden="true" />
</template>

<style scoped>
.cursor {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1.5px solid rgb(70 217 242 / 0.7);
  background: rgb(70 217 242 / 0.08);
  pointer-events: none;
  will-change: transform;
}
</style>
