<script setup lang="ts">
const { waLink } = useContact()

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

const scrolled = ref(false)
const menuOpen = ref(false)
const logo = ref<HTMLElement>()

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

// Paralaje sutil de los planos de la K, en unidades del logotipo (caja de 100 u).
// Solo escritorio, sin reduced-motion, y mientras el hero está en pantalla.
function startParallax() {
  const { gsap, reduced, finePointer } = useNuxtApp().$motion
  const svg = logo.value?.querySelector('svg')
  if (reduced || !finePointer || !svg) return () => {}

  const depth = { stem: 2, arm: 4, leg: 4, node: 6 } as const
  const movers = (Object.keys(depth) as (keyof typeof depth)[]).map((k) => {
    const el = svg.querySelector(`[data-k="${k}"]`)
    return {
      d: depth[k],
      x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
    }
  })

  const move = (nx: number, ny: number) => movers.forEach((m) => (m.x(nx * m.d), m.y(ny * m.d)))
  const onMove = (e: PointerEvent) => {
    if (window.scrollY > window.innerHeight) return move(0, 0)
    move((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2)
  }
  const onLeave = () => move(0, 0)

  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  return () => {
    window.removeEventListener('pointermove', onMove)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  }
}

let stopParallax = () => {}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  stopParallax = startParallax()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  stopParallax()
})
</script>

<template>
  <header class="site-header fixed inset-x-0 top-0 z-50" :class="{ 'is-scrolled': scrolled || menuOpen }">
    <div class="container-x relative flex h-16 items-center justify-between gap-6 md:h-20">
      <a ref="logo" href="#inicio" class="header-logo -m-2 p-2" data-logo-slot aria-label="EKOODE, ir al inicio">
        <EkoodeLogo class="h-6 w-auto md:h-7" />
      </a>

      <nav aria-label="Principal" class="header-fade hidden md:block">
        <ul class="flex items-center gap-9 text-[0.95rem] text-niebla">
          <li v-for="l in links" :key="l.href">
            <a :href="l.href" class="nav-link transition-colors hover:text-humo">{{ l.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="header-fade flex items-center gap-2">
        <a :href="waLink()" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Cotizar</a>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full text-humo md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="menu-movil"
          @click="menuOpen = !menuOpen"
        >
          <span class="sr-only">{{ menuOpen ? 'Cerrar menú' : 'Abrir menú' }}</span>
          <svg viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path v-if="!menuOpen" d="M4 8h16M4 16h16" />
            <path v-else d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-show="menuOpen" id="menu-movil" aria-label="Menú móvil" class="relative md:hidden">
      <ul class="container-x flex flex-col pb-6">
        <li v-for="l in links" :key="l.href">
          <a :href="l.href" class="block border-t border-humo/10 py-4 text-lg font-semibold" @click="menuOpen = false">
            {{ l.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Fondo borroso como capa aparte: solo cambia su opacidad */
.site-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgb(11 19 43 / 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: inset 0 -1px 0 rgb(244 248 253 / 0.06);
  opacity: 0;
  transition: opacity 0.35s;
}

.site-header.is-scrolled::before {
  opacity: 1;
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.35rem;
  height: 1px;
  background: var(--color-cian);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-expo);
}

.nav-link:hover::after {
  transform: scaleX(1);
}
</style>
