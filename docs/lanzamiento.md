# Lanzamiento de Mio Store — checklist

## 1. Contenido mínimo antes de abrir

- [ ] Logo (SVG o PNG transparente) y favicon.
- [ ] Nombre de tienda: **Mio Store** (Configuración → General).
- [ ] Hero con imagen propia (1200 × 1500 px) o video vertical.
- [ ] 3 colecciones con imagen 3:4 y al menos 6 productos cada una.
- [ ] Reseñas reales con foto (reemplaza las de ejemplo del home).
- [ ] Página **Envíos y entregas** (tiempos nacionales e importados).
- [ ] Página **Cambios y devoluciones** (30 días).
- [ ] Página **Política de privacidad** (Ley 1581 de 2012).
- [ ] Página **Términos y condiciones**.
- [ ] Página **Contacto** con WhatsApp y correo.
- [ ] Menú principal y menú del footer creados en Shopify.
- [ ] Idioma de la tienda: **Español (Colombia)** como predeterminado.
- [ ] Moneda: **COP** y formato de precio sin decimales.
- [ ] Enlace de WhatsApp configurado en la sección de preguntas frecuentes.

## 2. Pagos

- [ ] Método **Contra entrega** (pago manual o app de COD).
- [ ] Pasarela con tarjetas, PSE y Nequi (Wompi, Mercado Pago, PayU, ePayco u otra).
- [ ] Pedido de prueba aprobado y reembolsado.
- [ ] Moneda COP y precios sin decimales innecesarios.
- [ ] Correo de confirmación con instrucciones de pago claras.

> El tema muestra "Paga contra entrega" solo cuando `mio.cod_available` es `true`.
> Si activas el método de pago COD en Shopify, desactívalo en los productos importados
> que no lo permiten.

## 3. Envíos

- [ ] Zonas de envío: Colombia (departamentos) y resto del mundo si aplica.
- [ ] Tarifas: gratis desde $150.000 o la estrategia que elijas.
- [ ] Tiempos de preparación realistas (1–2 días hábiles).
- [ ] Apps de proveedores conectadas y probadas.
- [ ] Correo con número de guía automático.

## 4. Legal Colombia

- [ ] Política de tratamiento de datos y autorización expresa en el checkout.
- [ ] Aviso de cookies y consentimiento de analítica.
- [ ] Derecho de retracto informado (Estatuto del Consumidor, Ley 1480 de 2011).
- [ ] Impuestos de importación explicados si vendes productos de AliExpress.
- [ ] Datos del vendedor: razón social, NIT, dirección y canales de contacto.

> Revisa los textos legales con tu abogado. Esta lista es operativa, no asesoría jurídica.

## 5. Marketing y medición

- [ ] GA4 con comercio electrónico.
- [ ] Meta Pixel + API de conversiones (si pautas en Instagram/Facebook).
- [ ] TikTok Pixel (si aplica).
- [ ] Eventos: `view_item`, `add_to_cart`, `begin_checkout`, `purchase`.
- [ ] WhatsApp Business con mensaje de bienvenida y catálogo.
- [ ] Email de bienvenida con el descuento de la sección de oferta.
- [ ] Reseñas con foto activadas después de la entrega.

## 6. Rendimiento

- [ ] Imágenes en WebP/AVIF, máximo 1600 px de ancho.
- [ ] Hero con `loading="eager"` y el resto con lazy (el tema ya lo hace).
- [ ] Menos de 6 apps activas; cada app suma JS.
- [ ] PageSpeed móvil ≥ 80 (ideal ≥ 90).
- [ ] LCP < 2,5 s y CLS < 0,1 en móvil.
- [ ] Prueba en 3G simulada y en un teléfono real.

## 7. Pruebas finales

- [ ] Home en 375 px, 768 px y 1440 px.
- [ ] Menú, buscador y carrito en móvil.
- [ ] Variantes y stock correctos.
- [ ] Ficha de producto: fechas, contra entrega y garantía visibles.
- [ ] Pedido de prueba completo (nacional y, si aplica, importado).
- [ ] El pedido muestra `_proveedor` en el Admin.
- [ ] Correos: confirmación, guía y carrito abandonado.
- [ ] Redirecciones y enlaces del footer.
- [ ] `sitemap.xml` y `robots.txt` correctos.

## 8. Después del lanzamiento

- [ ] Revisar pedidos rechazados y tiempos reales de entrega.
- [ ] Ajustar `shipping_min_days` / `shipping_max_days` por proveedor.
- [ ] Medir conversión por colección y por producto.
- [ ] Reemplazar las reseñas de ejemplo por reseñas verificadas.
- [ ] Revisar el costo real (producto + envío + devoluciones) cada semana.
