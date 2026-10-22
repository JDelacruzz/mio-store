# AliExpress

Ruta de importación. Permite un catálogo amplio y precios bajos, pero **no admite contra
entrega** y los tiempos son de 10 a 20 días. El tema ya adapta el mensaje automáticamente.

## 1. Elegir la app de sincronización

Opciones habituales: **DSers**, **AutoDS**, **CJdropshipping** o **Zendrop**. Elige una y no
mezcles dos apps sobre el mismo producto: duplican pedidos y tracking.

Criterios:

- Mapeo de variantes (color/talla) sin errores.
- Sincronización automática de stock y precio.
- Tracking hacia Shopify.
- Soporte en español o portugués, si tu equipo lo necesita.
- Costo mensual acorde a tu volumen.

## 2. Catálogo y variantes

- Importa el producto y revisa que **cada variante de Shopify** apunte a la variante correcta
  de AliExpress. Es el error más caro del dropshipping.
- Guarda el ID del producto en `mio.supplier_product_id` y el de la variante en
  `mio.supplier_variant_id`.
- Guarda el enlace directo en `mio.supplier_url` (útil para reposición y reclamos).
- Etiqueta con `proveedor:aliexpress`.

## 3. Metafields recomendados

| Metafield | Valor |
| --- | --- |
| `mio.supplier` | `aliexpress` |
| `mio.ships_from` | `China` |
| `mio.shipping_min_days` | `10` |
| `mio.shipping_max_days` | `20` |
| `mio.cod_available` | `false` |
| `mio.supplier_product_id` | ID del producto |
| `mio.supplier_variant_id` | ID de la variante |
| `mio.supplier_url` | URL del producto |

Con `cod_available = false`, la ficha muestra **"Pago 100% seguro"** en lugar de contra
entrega. Es automático: no tienes que editar el tema por producto.

## 4. Tiempos y expectativas

- Muestra 10–20 días desde el inicio, no desde que "sale de China".
- Suma 1–2 días de procesamiento del proveedor.
- Advierte que fechas cercanas a campañas (Black Friday, Navidad, Año Nuevo chino) se
  alargan.
- Envía el tracking en cuanto exista; la incertidumbre genera más reclamos que la demora.

El snippet calcula la fecha estimada con la fecha del visitante y los días configurados en
los metafields.

## 5. Impuestos y aduana

- Los envíos internacionales pueden generar **IVA y aranceles** en Colombia. Verifica la
  normativa vigente con tu agente aduanero o courier antes de fijar precios.
- Prefiere couriers con despacho puerta a puerta y trámite incluido, para que el cliente no
  tenga que pagar en la aduana.
- Si el cliente debe pagar impuestos, dilo antes de la compra. Un cobro sorpresa en la
  entrega destruye la confianza y genera contracargos.

## 6. Pagos

- AliExpress no permite contra entrega.
- Habilita tarjetas, PSE y billeteras (Mercado Pago, Wompi u otro gateway colombiano).
- Revisa el flujo de checkout en móvil: es donde más se abandona.
- No mezcles en el mismo checkout productos nacionales con COD y productos importados sin
  COD sin explicarlo: el cliente puede elegir contra entrega y luego no aplica.

Recomendación: separa colecciones "Envío nacional" y "Importados", o usa el bloque de
confianza del proveedor para dejar claro el origen en cada ficha.

## 7. Calidad y reclamos

- Pide una muestra antes de escalar un producto.
- Revisa fotos y reseñas reales del proveedor; no confíes solo en el título.
- Guarda el enlace y el ID: los productos de AliExpress desaparecen con frecuencia.
- Ten un proveedor alterno para tus 3 productos más vendidos.
- Reclama dentro de la ventana de disputa del proveedor y guarda evidencia.

## 8. Prueba antes de escalar

- [ ] Variante correcta verificada (color/talla).
- [ ] Ficha con "Pago 100% seguro" y 10–20 días.
- [ ] Pedido de prueba con tracking.
- [ ] Costo real (producto + envío + impuestos) vs. precio de venta.
- [ ] Política de devoluciones y aduana publicada.
- [ ] Proveedor alterno identificado.
