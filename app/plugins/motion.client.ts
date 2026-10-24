import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText)

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  let lenis: Lenis | null = null

  if (!reduced) {
    document.documentElement.classList.add('motion')
    lenis = new Lenis({ autoRaf: false, anchors: { offset: -88 } })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis!.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  return {
    provide: {
      motion: { gsap, ScrollTrigger, SplitText, lenis, reduced, finePointer },
    },
  }
})
