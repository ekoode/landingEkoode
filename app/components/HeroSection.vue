<script setup lang="ts">
const { waLink } = useContact()

const overlay = ref<HTMLElement>()
const title = ref<HTMLElement>()
const sub = ref<HTMLElement>()
const ctas = ref<HTMLElement>()

onMounted(async () => {
  const html = document.documentElement
  // La intro solo corre si el script de <head> la activó (hay JS, sin reduced-motion)
  if (!html.classList.contains('intro')) return
  ;(window as unknown as { __ekIntro: boolean }).__ekIntro = true

  const { gsap, SplitText, lenis } = useNuxtApp().$motion
  lenis?.stop()
  window.scrollTo(0, 0)

  // El titular se parte en líneas con la fuente real, no con la de reserva
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 800))])

  const svg = overlay.value!.querySelector('svg')!
  const clips = svg.querySelectorAll<SVGRectElement>('[data-clip]')
  const k = (name: string) => svg.querySelector(`[data-k="${name}"]`)
  const slot = document.querySelector<HTMLElement>('[data-logo-slot]')!
  const slotSvg = slot.querySelector('svg')!
  const headerFades = document.querySelectorAll('.header-fade')

  const split = SplitText.create(title.value!, { type: 'lines', mask: 'lines' })

  gsap.set(k('node'), { svgOrigin: '48 50' })
  gsap.set(overlay.value!, { x: 0, y: 0, xPercent: -50, yPercent: -50 })
  gsap.set(title.value!, { autoAlpha: 1 })
  gsap.set(split.lines, { yPercent: 110 })
  gsap.set([sub.value!, ctas.value!], { autoAlpha: 0, y: 16 })

  // Distancia y escala para que el logotipo grande caiga exacto sobre el del header
  let dock: { x: number; y: number; s: number } | undefined
  const measure = () => {
    if (dock) return dock
    const from = overlay.value!.getBoundingClientRect()
    const to = slotSvg.getBoundingClientRect()
    return (dock = {
      x: to.left + to.width / 2 - (from.left + from.width / 2),
      y: to.top + to.height / 2 - (from.top + from.height / 2),
      s: to.width / from.width,
    })
  }

  const finish = () => {
    split.revert()
    gsap.set([title.value!, sub.value!, ctas.value!], { clearProps: 'transform' })
    html.classList.remove('intro')
    lenis?.start()
    try { sessionStorage.setItem('ek-intro', '1') } catch {}
    removeSkip()
  }

  const tl = gsap.timeline({ delay: 0.1, onComplete: finish })

  // 1. E O O D E: máscara de izquierda a derecha, una a una
  tl.to(clips, {
    attr: { width: (_: number, rect: SVGRectElement) => Number(rect.dataset.w) },
    duration: 0.5,
    ease: 'power3.inOut',
    stagger: 0.1,
  }, 0)

  // 2. La K: el asta sube, las bandas entran a 45° y el nodo late
    .fromTo(k('stem'), { y: 104, visibility: 'visible' }, { y: 0, duration: 0.55, ease: 'expo.out' }, 0.7)
    .fromTo(k('arm'), { x: 72, y: -72, visibility: 'visible' }, { x: 0, y: 0, duration: 0.6, ease: 'power4.out' }, 0.9)
    .fromTo(k('leg'), { x: 72, y: 72, visibility: 'visible' }, { x: 0, y: 0, duration: 0.6, ease: 'power4.out' }, 0.9)
    .fromTo(k('node'), { scale: 0, visibility: 'visible' }, { scale: 1.3, duration: 0.16, ease: 'power2.out' }, 1.38)
    .to(k('node'), { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' })

  // 3. Se reduce y se ancla en el header, en un solo movimiento
    .to(overlay.value!, {
      x: () => measure().x,
      y: () => measure().y,
      scale: () => measure().s,
      duration: 0.85,
      ease: 'expo.inOut',
    }, 1.95)
    .to(headerFades, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 2.5)
    .add(() => {
      gsap.set(slot, { autoAlpha: 1 })
      gsap.set(overlay.value!, { display: 'none' })
    }, 2.8)

  // 4. Titular por líneas, luego subtítulo y botones
    .to(split.lines, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, 2.45)
    .to(sub.value!, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 2.7)
    .to(ctas.value!, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 2.82)

  // Si la persona intenta hacer scroll o usa el teclado, la intro se acelera
  const skip = () => tl.timeScale(4)
  const events = ['wheel', 'touchstart', 'keydown'] as const
  const removeSkip = () => events.forEach((e) => window.removeEventListener(e, skip))
  events.forEach((e) => window.addEventListener(e, skip, { passive: true }))
})
</script>

<template>
  <section id="inicio" class="relative grid min-h-svh place-items-center overflow-hidden pt-16 md:pt-20">
    <div class="container-x flex flex-col items-center py-16 text-center">
      <h1
        ref="title"
        data-hero-reveal
        class="display max-w-[14ch] text-[clamp(2.75rem,1rem+8vw,7.5rem)] leading-[0.98]"
      >
        Tu idea, nuestro código.
      </h1>
      <p ref="sub" data-hero-reveal class="lede mt-7 max-w-[44ch] md:mt-9">
        Software, automatización y seguridad electrónica para empresas de Lambayeque.
      </p>
      <div ref="ctas" data-hero-reveal class="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a :href="waLink()" class="btn btn-primary" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" />
          </svg>
          Cotizar por WhatsApp
        </a>
        <a href="#servicios" class="btn btn-ghost">Ver servicios</a>
      </div>
    </div>

    <!-- Logotipo de la intro: fijo, grande y centrado. Termina exactamente sobre el del header. -->
    <div ref="overlay" class="intro-logo" aria-hidden="true">
      <EkoodeLogo animated class="h-auto w-full" />
    </div>
  </section>
</template>
