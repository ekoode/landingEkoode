<script setup lang="ts">
const { waLink } = useContact()

const services = [
  {
    name: 'Sistemas web',
    desc: 'Paneles, inventarios, reservas y sistemas a la medida de tu operación.',
    detail: 'Para dejar el Excel compartido y las carpetas: un solo sistema con usuarios, permisos y reportes, desde cualquier navegador.',
  },
  {
    name: 'Apps móviles',
    desc: 'Aplicaciones Android e iOS con Flutter, listas para publicar.',
    detail: 'Para que tus clientes reserven, compren o sigan su pedido desde el celular. Te acompañamos en la publicación en Google Play y App Store.',
  },
  {
    name: 'Automatización',
    desc: 'Bots de WhatsApp y flujos que atienden y registran por ti.',
    detail: 'Respuestas automáticas, toma de pedidos y citas, y registro directo en tu sistema u hoja de cálculo. Menos mensajes copiados a mano.',
  },
  {
    name: 'Cámaras de seguridad',
    desc: 'Diseño, instalación y configuración con acceso remoto desde tu celular.',
    detail: 'Evaluamos tu local, proponemos dónde va cada cámara, instalamos y dejamos configurada la vista en tu celular.',
  },
]

const open = ref<number | null>(null)
const toggle = (i: number) => (open.value = open.value === i ? null : i)

const heading = ref<HTMLElement>()
useLineReveal(heading)
</script>

<template>
  <section id="servicios" class="section" aria-labelledby="servicios-titulo">
    <div class="container-x">
      <h2 id="servicios-titulo" ref="heading" class="display h-section max-w-[16ch]">Lo que construimos para tu empresa.</h2>
      <p class="lede mt-6">
        Si tu operación vive en Excel, carpetas o WhatsApp, empezamos por ahí.
      </p>

      <ul class="svc-list mt-16 md:mt-24">
        <li v-for="(s, i) in services" :key="s.name" class="svc" :class="{ 'is-open': open === i }">
          <h3 class="svc-name-col">
            <button
              type="button"
              class="svc-trigger"
              :aria-expanded="open === i"
              :aria-controls="`svc-${i}`"
              @click="toggle(i)"
            >
              <span class="svc-name display">{{ s.name }}</span>
              <span class="svc-icon" aria-hidden="true" />
            </button>
          </h3>
          <div class="svc-body">
            <p class="text-niebla">{{ s.desc }}</p>
            <div :id="`svc-${i}`" class="svc-detail">
              <p>{{ s.detail }}</p>
              <a
                :href="waLink(`Hola EKOODE, quiero cotizar: ${s.name}.`)"
                class="link mt-4 inline-flex items-center gap-2 font-semibold"
                target="_blank"
                rel="noopener"
              >
                Cotizar {{ s.name.toLowerCase() }}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.svc {
  position: relative;
  display: grid;
  gap: 0.75rem;
  padding-block: 2rem;
  border-top: 1px solid rgb(244 248 253 / 0.1);
  transition: opacity 0.4s;
}

.svc:last-child {
  border-bottom: 1px solid rgb(244 248 253 / 0.1);
}

/* Línea cian que recorre la fila activa */
.svc::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -1px;
  height: 1px;
  background: var(--color-cian);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--ease-expo);
}

.svc.is-open::after {
  transform: scaleX(1);
}

.svc-trigger {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
}

.svc-name {
  font-size: clamp(2rem, 1.1rem + 4vw, 4.5rem);
  line-height: 1;
  transition: transform 0.6s var(--ease-expo);
}

/* + que se convierte en − */
.svc-icon {
  position: relative;
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
}

.svc-icon::before,
.svc-icon::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  transition: transform 0.4s var(--ease-expo);
}

.svc-icon::after {
  transform: rotate(90deg);
}

.svc.is-open .svc-icon::after {
  transform: rotate(0deg);
}

.svc-detail {
  max-width: 52ch;
  padding-top: 1rem;
}

/* Móvil: acordeón */
@media (width < 48rem) {
  .svc:not(.is-open) .svc-detail {
    display: none;
  }
}

/* Escritorio: el detalle ocupa su lugar desde el inicio (sin saltos) y aparece al hover */
@media (width >= 48rem) {
  .svc {
    grid-template-columns: 7fr 5fr;
    gap: 3rem;
    align-items: start;
    padding-block: 2.75rem;
  }

  .svc-icon {
    display: none;
  }

  .svc-body {
    padding-top: 0.5rem;
  }

  .svc-detail {
    opacity: 0;
    transform: translateY(0.5rem);
    transition:
      opacity 0.4s,
      transform 0.6s var(--ease-expo);
  }

  .svc.is-open .svc-detail,
  .svc:focus-within .svc-detail {
    opacity: 1;
    transform: none;
  }

  .svc:focus-within::after {
    transform: scaleX(1);
  }
}

@media (width >= 48rem) and (hover: hover) {
  .svc:hover .svc-detail {
    opacity: 1;
    transform: none;
  }

  .svc:hover::after {
    transform: scaleX(1);
  }

  .svc:hover .svc-name {
    transform: translateX(0.4rem);
  }

  /* Las demás filas bajan de intensidad para que una sola idea mande */
  .svc-list:hover .svc:not(:hover) {
    opacity: 0.45;
  }
}
</style>
