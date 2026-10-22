# Mio Store — documentación del tema

Tienda Shopify (Horizon OS 2.0) para dropshipping en Colombia, con identidad amarilla,
animaciones suaves y arquitectura lista para **Dropi**, **Mastershop** y **AliExpress**.

## Empieza aquí

1. **Previsualizar:** `shopify theme dev --store tu-tienda.myshopify.com`
   (requiere Shopify CLI y sesión iniciada).
2. **Personalizar:** editor de temas → colores, tipografía y secciones ya están configurados.
3. **Cargar contenido:** imágenes del hero y colecciones, productos y reseñas reales.
4. **Conectar proveedores:** completa metafields y tags de producto.
5. **Revisar el checklist:** [`lanzamiento.md`](./lanzamiento.md).

## Mapa de documentación

| Documento | Contenido |
| --- | --- |
| [`diseno.md`](./diseno.md) | Paleta, tipografía, secciones y sistema de movimiento |
| [`proveedores/ARQUITECTURA.md`](./proveedores/ARQUITECTURA.md) | Modelo de datos, pedidos y enrutamiento |
| [`proveedores/DROPI.md`](./proveedores/DROPI.md) | Puesta en marcha con Dropi |
| [`proveedores/MASTERSHOP.md`](./proveedores/MASTERSHOP.md) | Puesta en marcha con Mastershop |
| [`proveedores/ALIEXPRESS.md`](./proveedores/ALIEXPRESS.md) | Importación, aduana y apps |
| [`proveedores/metafields.graphql`](./proveedores/metafields.graphql) | Definiciones listas para la Admin API |
| [`proveedores/plantilla-productos.csv`](./proveedores/plantilla-productos.csv) | Importación masiva con metafields |
| [`lanzamiento.md`](./lanzamiento.md) | Checklist de contenido, pagos, legal y performance |

## Archivos clave del tema

```
assets/
  mio-motion.css      Sistema de animaciones (tokens, reveal, marquee)
  mio-motion.js       IntersectionObserver, parallax, contador
  mio-brand.css       Pulido global (botones, precios, formularios)
  mio-supplier.css    Bloque de confianza del proveedor
  mio-supplier.js     Refuerzo de propiedades de línea en formularios dinámicos
blocks/
  mio-supplier-info.liquid   Bloque de ficha de producto
snippets/
  mio-icons.liquid           Iconos SVG
  mio-supplier.liquid        Resolución de proveedor y render
sections/
  mio-hero.liquid
  mio-marquee.liquid
  mio-trust-bar.liquid
  mio-collections.liquid
  mio-story.liquid
  mio-duo.liquid
  mio-offer.liquid
  mio-reviews.liquid
  mio-cod.liquid
  mio-journal.liquid
  mio-faq.liquid
```

## Notas importantes

- **Los JSON de plantillas son autogenerados.** `templates/index.json`, `templates/product.json`,
  `sections/header-group.json` y `sections/footer-group.json` pueden ser reescritos por el
  editor de temas. Si editas a mano, hazlo antes de tocar el editor y vuelve a revisar.
- **Faltan assets reales.** El hero, `mio-story`, `mio-duo` y las colecciones usan marcadores
  hasta que subas imágenes. Formatos recomendados: hero 1200 × 1500 px, historia 1200 × 1500 px,
  duo 1400 × 1050 px, colecciones 3:4, reseñas avatar 96 × 96 px.
- **Diario.** Crea un blog con handle `diario` y publica al menos 3 artículos para que
  `mio-journal` aparezca en la tienda.
- **Los textos legales no están incluidos.** Crea las páginas de privacidad, términos, envíos
  y devoluciones antes de publicar.
- **Las apps no están instaladas.** El tema está preparado para ellas, pero la conexión con
  Dropi, Mastershop o AliExpress se hace desde el Admin.
- **Menús del footer.** El footer referencia los menús `main-menu` y `footer`. Crea el menú
  `footer` en Shopify o cambia el handle desde el editor.
