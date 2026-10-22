# Mastershop

Proveedor colombiano con catálogo nacional y operación de dropshipping. Buena opción para
**contra entrega**, confirmación telefónica y productos con bodega en Colombia.

## 1. Instalación

1. Instala la app de Mastershop desde el Shopify App Store o usa su integración por API.
2. Conecta la tienda y autoriza catálogo + pedidos.
3. Importa los productos o vincula los que ya tienes.

> La app puede cambiar nombres de menús. Si una opción no coincide, usa el buscador interno
> o el soporte de Mastershop.

## 2. Catálogo y SKU

- Mantén el SKU de Mastershop en la variante de Shopify.
- Si usas un SKU propio, guarda el ID del proveedor en `mio.supplier_product_id` y la
  variante en `mio.supplier_variant_id`.
- Etiqueta los productos con `proveedor:mastershop` (respaldo para enrutamiento por tag).

## 3. Metafields recomendados

| Metafield | Valor |
| --- | --- |
| `mio.supplier` | `mastershop` |
| `mio.ships_from` | `Colombia` |
| `mio.shipping_min_days` | `1` |
| `mio.shipping_max_days` | `4` |
| `mio.cod_available` | `true` |
| `mio.supplier_product_id` | ID del producto en Mastershop |
| `mio.supplier_variant_id` | ID de la variante |

Ajusta los días según tu ciudad y la bodega del proveedor: el tema los muestra tal cual en
la ficha, así que no prometas tiempos que no puedas cumplir.

## 4. Pedidos y confirmación

Mastershop suele trabajar con confirmación previa del pedido. Recomendación operativa:

1. El pedido llega a Shopify con `_proveedor = Mastershop` en el artículo.
2. La app lo recoge por SKU/producto o por tag.
3. Confirma por WhatsApp: nombre, dirección, teléfono y producto.
4. Si el cliente no responde en 24–48 h, cancela o pausa el despacho para evitar rechazos.
5. Sincroniza la guía a Shopify cuando el pedido salga.

Buenas prácticas:

- Usa una plantilla de WhatsApp corta y con el nombre del cliente.
- No confirmes dos veces el mismo pedido si ya lo hizo la app.
- Etiqueta los pedidos confirmados (`confirmado`) para medir tu tasa de aceptación.

## 5. Contra entrega

- Habilita el método de pago manual **"Contra entrega"** o el flujo COD del proveedor.
- `mio.cod_available = true` solo en productos elegibles.
- Define el costo de devolución por rechazo y quién lo asume.
- Bloquea contra entrega en pedidos con dirección incompleta o teléfono inválido.

## 6. Devoluciones y garantía

- Unifica la política de devoluciones con la de Mastershop.
- Atiende al cliente desde Mio Store y traslada el caso al proveedor.
- Documenta cada reclamo con fotos, número de guía y fecha de entrega.

## 7. Prueba antes de escalar

- [ ] Pedido de prueba completo.
- [ ] Confirmación por WhatsApp funcionando.
- [ ] Pedido con `_proveedor` visible en el Admin.
- [ ] Guía y tracking sincronizados.
- [ ] Política de rechazos y devoluciones escrita.
