<script setup lang="ts">
import { projects } from '~~/content/projects'

// Cuadrícula irregular: los anchos se alternan 7/5 y 5/7 por fila
const layout = (i: number) => {
  const wide = (i + Math.floor(i / 2)) % 2 === 0
  return wide
    ? { cell: 'md:col-span-7', media: 'aspect-[4/3]' }
    : { cell: 'md:col-span-5 md:mt-24', media: 'aspect-[4/3] md:aspect-[4/5]' }
}

const heading = ref<HTMLElement>()
useLineReveal(heading)
</script>

<template>
  <section v-if="projects.length" id="proyectos" class="section" aria-labelledby="proyectos-titulo">
    <div class="container-x">
      <h2 id="proyectos-titulo" ref="heading" class="display h-section max-w-[14ch]">Proyectos.</h2>
      <p class="lede mt-6">
        <span class="todo">TODO: una línea sobre los proyectos, cuando estén los reales</span>
      </p>

      <ul class="mt-16 grid gap-x-8 gap-y-14 md:mt-24 md:grid-cols-12 md:items-start">
        <li v-for="(p, i) in projects" :key="p.title" :class="layout(i).cell">
          <article class="project">
            <div class="project-media" :class="layout(i).media">
              <img
                v-if="p.image"
                :src="p.image"
                :alt="`${p.title}, ${p.sector}`"
                width="1600"
                height="1200"
                loading="lazy"
                decoding="async"
                class="size-full object-cover"
              >
              <div v-else class="grid size-full place-items-center p-6">
                <span class="todo">TODO: imagen del proyecto</span>
              </div>
            </div>
            <p class="mt-5 font-mono text-xs tracking-[0.1em] text-niebla">{{ p.sector }}</p>
            <h3 class="mt-2 text-2xl font-semibold">{{ p.title }}</h3>
            <p class="mt-2 max-w-[52ch] text-niebla">{{ p.description }}</p>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.project-media {
  overflow: hidden;
  border-radius: 0.75rem;
  background: var(--color-tinta);
  box-shadow: inset 0 0 0 1px rgb(244 248 253 / 0.06);
}

.project-media img {
  transition: transform 1.1s var(--ease-expo);
}

@media (hover: hover) {
  .project:hover .project-media img {
    transform: scale(1.04);
  }
}
</style>
