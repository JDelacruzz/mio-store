# Sistema de diseño y movimiento — Mio Store

## Identidad

Mio Store es un homenaje moderno a Colombia: **blanco y amarillo** como base, con azul y
rojo usados solo en detalles pequeños (insignias, calificaciones, CTA principal).

| Token | Valor | Uso |
| --- | --- | --- |
| `--mio-yellow` | `#FFD400` | Identidad, fondos destacados, iconos |
| `--mio-yellow-soft` | `#FFF2B8` | Insignias y fondos suaves |
| `--mio-ink` | `#101014` | Texto y botones sobre amarillo |
| `--mio-blue` | `#0B3DA8` | Enlaces, foco, esquema azul suave |
| `--mio-red` | `#D62828` | CTA principal, precio de oferta |
| `--mio-green` | `#12855B` | WhatsApp y confirmaciones |

### Esquemas de color del tema

| Esquema | Fondo | Uso |
| --- | --- | --- |
| `scheme-1` | Blanco | Base de la tienda, fichas, grids |
| `scheme-2` | Amarillo | Hero, contra entrega, bloques de energía |
| `scheme-3` | Crema | FAQ y secciones de respiro |
| `scheme-4` | Azul muy suave | Variante de confianza (opcional) |
| `scheme-5` | Negro | Cinta de valor, footer oscuro |
| `scheme-6` | Transparente | Overlays sobre imagen |

El CTA principal es **rojo bandera** (`#D62828`). Sobre fondo amarillo el CTA pasa a negro
para mantener contraste. Esto se controla por esquema, no por sección.

## Tipografía

- **Inter** en toda la tienda (peso 400 cuerpo, 700 títulos).
- H1 56 px, H2 48 px, H3 32 px, cuerpo 16 px con altura de línea amplia.
- Tracking negativo en títulos grandes (`-0.035em`), sin mayúsculas forzadas.
- El hero usa `clamp()` para escalar de 40 px a 72 px según viewport.

## Dirección editorial

El home sigue un ritmo editorial inspirado en tiendas de marca como Taylor Stitch: fotografía
grande, titulares amplios, mucho aire y bloques de historia entre los grids de producto. La
adaptación es propia: conserva el amarillo, el blanco y los acentos colombianos de Mio Store, y
no reutiliza imágenes, textos ni elementos de la marca de referencia.

## Estructura del home

1. `mio-hero` — propuesta de valor + CTA + prueba social.
2. `mio-marquee` — cinta de beneficios en movimiento constante.
3. `mio-trust-bar` — 4 garantías con iconos.
4. `mio-collections` — 3 categorías editoriales.
5. `mio-story` — manifiesto de curaduría con imagen grande.
6. `product-list` — más vendidos con carrusel en móvil.
7. `mio-duo` — dos tarjetas editoriales (esenciales / ofertas).
8. `mio-offer` — oferta con contador y código.
9. `mio-reviews` — reseñas con foto y compra verificada.
10. `mio-cod` — explicación del pago contra entrega en 3 pasos.
11. `mio-journal` — últimos 3 artículos del blog (se oculta si el blog está vacío).
12. `mio-faq` — dudas frecuentes + WhatsApp.

Todas las secciones se pueden reordenar, ocultar o duplicar desde **Personalizar tema**.

### Diario

`mio-journal` usa un blog real de Shopify. Crea un blog con el handle `diario` (Contenido →
Blog posts → Administrar blogs) y publica al menos 3 artículos con imagen destacada 4:3. Si el
blog no existe o está vacío, la sección no se muestra en la tienda; en el editor se ven tarjetas
de ejemplo.

## Movimiento

Archivos:

- `assets/mio-motion.css` — tokens y estados.
- `assets/mio-motion.js` — reveal, parallax, contador.
- `assets/mio-brand.css` — pulido global.

### Reglas

- Solo se animan `transform` y `opacity`. El `clip-path` se usa únicamente para máscaras de
  imagen.
- Entradas con `--mio-ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`).
- UI entre 140 y 250 ms. Reveals de 560 ms, una sola vez.
- Sin `transition: all`. Sin `scale(0)`. Sin animar ancho, alto ni márgenes.
- Hover solo en `@media (hover: hover) and (pointer: fine)`.
- Cada animación respeta `prefers-reduced-motion`.
- El contador de la oferta no anima dígitos: cambia el número y listo.

### Cómo aplicar reveal a un elemento nuevo

```html
<div data-mio-reveal>...</div>
<div data-mio-reveal="fade">...</div>
<div data-mio-reveal="scale">...</div>
<div data-mio-reveal="clip">...</div>

<!-- Grupo con stagger automático de 70 ms -->
<ul data-mio-stagger="70">
  <li data-mio-reveal>...</li>
  <li data-mio-reveal>...</li>
</ul>
```

El observer revela una sola vez y se reinicia en el editor de temas. Si el JS no carga, un
failsafe a los 3 s retira el estado oculto: el contenido nunca queda invisible.

### Hero

La entrada del hero es CSS puro (`animation`), con índices `--mio-hero-index` para escalonar
los elementos. El parallax se activa solo en desktop con puntero fino y se desactiva con
movimiento reducido.

### Cinta

La cinta usa animación lineal infinita, tiene un botón de pausa accesible y queda estática
con movimiento reducido.

## Rendimiento

- CSS y JS propios pesan pocos KB y se cargan una sola vez.
- Las secciones usan `{% stylesheet %}`: Shopify agrupa el CSS por sección.
- Las imágenes usan `image_url` + `srcset` y lazy loading salvo el hero.
- No se agregaron librerías de animación ni fuentes externas.

## Dónde editar

- **Colores, tipografía, radios:** Personalizar tema → Configuración del tema.
- **Home:** Personalizar tema → Inicio. Ten en cuenta que `templates/index.json` es
  autogenerado: si editas el archivo a mano y luego guardas en el editor, el editor gana.
- **Ficha de producto:** bloque "Confianza del proveedor" dentro de la información del
  producto.
- **Proveedores:** ver [`proveedores/ARQUITECTURA.md`](./proveedores/ARQUITECTURA.md).
