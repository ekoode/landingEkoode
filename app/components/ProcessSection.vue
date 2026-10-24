<script setup lang="ts">
const steps = [
  { title: 'Conversamos', text: 'Nos cuentas cómo trabajas hoy y qué te quita tiempo. Por WhatsApp, llamada o en tu local.' },
  { title: 'Cotizamos', text: 'Te enviamos por escrito el alcance, el plazo y el precio. Sabes qué recibes antes de empezar.' },
  { title: 'Desarrollamos', text: 'Construimos por etapas y te mostramos avances para corregir a tiempo, no al final.' },
  { title: 'Entregamos y acompañamos', text: 'Instalamos, capacitamos a tu equipo y seguimos disponibles después de la entrega.' },
]

const heading = ref<HTMLElement>()
const list = ref<HTMLElement>()
const fill = ref<HTMLElement>()
useLineReveal(heading)

onMounted(() => {
  const { gsap, ScrollTrigger, reduced } = useNuxtApp().$motion
  if (reduced || !list.value || !fill.value) return

  // La línea se dibuja con el scroll; cada paso se enciende cuando la línea lo alcanza
  gsap.fromTo(fill.value, { scaleY: 0 }, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: list.value, start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
  })

  list.value.querySelectorAll<HTMLElement>('[data-step]').forEach((step) => {
    step.classList.remove('is-active')
    ScrollTrigger.create({
      trigger: step,
      start: 'top 60%',
      onEnter: () => step.classList.add('is-active'),
      onLeaveBack: () => step.classList.remove('is-active'),
    })
  })
})
</script>

<template>
  <section id="proceso" class="section bg-tinta" aria-labelledby="proceso-titulo">
    <div class="container-x grid gap-16 md:grid-cols-[5fr_7fr] md:gap-12">
      <div class="md:sticky md:top-32 md:self-start">
        <h2 id="proceso-titulo" ref="heading" class="display h-section max-w-[12ch]">Cómo trabajamos.</h2>
        <p class="lede mt-6 max-w-[36ch]">
          De la primera conversación a la entrega, sabes en qué etapa está tu proyecto.
        </p>
      </div>

      <ol ref="list" class="relative">
        <div class="absolute bottom-3 left-[7px] top-3 w-px bg-humo/10" aria-hidden="true">
          <div ref="fill" class="size-full origin-top bg-cian" />
        </div>

        <li
          v-for="(s, i) in steps"
          :key="s.title"
          data-step
          class="step is-active relative pb-16 pl-12 last:pb-0 md:pb-24 md:pl-16"
        >
          <span class="dot" aria-hidden="true" />
          <span class="num font-mono text-sm tracking-[0.1em]">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="step-title mt-3 text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
            {{ s.title }}
          </h3>
          <p class="mt-3 max-w-[46ch] text-niebla">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.dot {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 15px;
  height: 15px;
  border-radius: 999px;
  background: var(--color-tinta);
  box-shadow: inset 0 0 0 1.5px rgb(141 162 192 / 0.5);
}

/* El relleno cian aparece con escala, sin animar colores */
.dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--color-cian);
  box-shadow: 0 0 0 6px rgb(70 217 242 / 0.15);
  transform: scale(0);
  transition: transform 0.5s var(--ease-expo);
}

.num {
  color: var(--color-niebla);
  transition: color 0.4s;
}

.step-title {
  transition: opacity 0.5s;
}

.step.is-active .dot::after {
  transform: scale(1);
}

.step.is-active .num {
  color: var(--color-cian);
}

.step:not(.is-active) .step-title {
  opacity: 0.55;
}
</style>
