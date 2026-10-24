import type { Ref } from 'vue'

// Revelado por línea al entrar en pantalla. Con reduced-motion no hace nada.
export function useLineReveal(target: Ref<HTMLElement | undefined>) {
  let split: { revert: () => void } | undefined

  onMounted(() => {
    const { gsap, SplitText, reduced } = useNuxtApp().$motion
    const el = target.value
    if (reduced || !el) return

    split = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
    })
  })

  onBeforeUnmount(() => split?.revert())
}
