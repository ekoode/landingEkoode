export interface Project {
  title: string
  /** Rubro del cliente, ej. "Ferretería" o "Clínica dental" */
  sector: string
  description: string
  /** Ruta en /public, ej. "/projects/inventario.webp". Ideal 1600×1200. */
  image?: string
  /** Marca el proyecto como ejemplo pendiente de reemplazo */
  todo?: boolean
}

// Si este arreglo queda vacío, la sección Proyectos no se muestra.
export const projects: Project[] = [
  {
    title: 'TODO: Proyecto de ejemplo 1',
    sector: 'TODO: rubro del cliente',
    description: 'TODO: reemplaza este ejemplo por un proyecto real: qué problema tenía el cliente y qué construimos.',
    todo: true,
  },
  {
    title: 'TODO: Proyecto de ejemplo 2',
    sector: 'TODO: rubro del cliente',
    description: 'TODO: reemplaza este ejemplo por un proyecto real o elimínalo.',
    todo: true,
  },
]
