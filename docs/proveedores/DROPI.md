# Dropi

Proveedor colombiano con bodega nacional. Es la ruta más rápida para **contra entrega** y
entregas en 1–3 días hábiles.

## 1. Instalación

1. Instala la app oficial de Dropi desde el Shopify App Store.
2. Conecta la tienda y autoriza el acceso al catálogo y a los pedidos.
3. Importa los productos que quieras vender o sincroniza los existentes.

> Los nombres exactos de los menús pueden cambiar cuando Dropi actualice su app. Si no
> encuentras una opción, usa el buscador de la app o su soporte.

## 2. Catálogo y SKU

- Conserva el **SKU de Dropi** en la variante de Shopify siempre que sea posible.
- Si tu SKU interno es distinto, completa el metafield `mio.supplier_product_id` con el ID
  de Dropi y `mio.supplier_variant_id` con la variante exacta.
- Etiqueta cada producto con `proveedor:dropi`. Aunque el metafield ya lo diga, el tag sirve
  como respaldo para enrutar pedidos y para apps que solo leen tags.

## 3. Metafields recomendados

| Metafield | Valor |
| --- | --- |
| `mio.supplier` | `dropi` |
| `mio.ships_from` | `Colombia` |
| `mio.shipping_min_days` | `1` |
| `mio.shipping_max_days` | `3` |
| `mio.cod_available` | `true` |
| `mio.supplier_product_id` | ID del producto en Dropi |
| `mio.supplier_variant_id` | ID de la variante en Dropi |

Con esto la ficha muestra automáticamente "Paga contra entrega" y una fecha de entrega real.

## 4. Pedidos y fulfillment

1. En Shopify, el pedido queda con la propiedad `_proveedor = Dropi` en el artículo.
2. La app de Dropi recoge los pedidos (por SKU, por producto importado o por tag).
3. Confirma el pedido con el cliente por WhatsApp si tu operación lo requiere.
4. Dropi genera la guía; la app sincroniza el tracking a Shopify.
5. No marques el pedido como enviado a mano si la app ya lo hace: se duplican notificaciones.

Si la app no recoge un pedido:

- Verifica que el SKU de la variante coincida exactamente.
- Revisa que el producto esté marcado como activo en Dropi.
- Agrega el tag `dropi` al pedido y vuelve a sincronizar.

## 5. Contra entrega

- Activa el método de pago manual **"Contra entrega"** en Shopify o el flujo COD de Dropi.
- Mantén `mio.cod_available = true` solo en productos que realmente lo aceptan.
- Define por escrito qué pasa si el cliente rechaza el pedido (costo de devolución).
- Confirma dirección y teléfono antes de despachar: es la principal causa de pedidos
  rechazados en Colombia.

## 6. Devoluciones y garantía

- Publica una política de 30 días coherente con la de Dropi.
- Centraliza la garantía en Mio Store: el cliente te escribe a ti, no a Dropi.
- Guarda evidencia (fotos/video) del producto defectuoso antes de abrir el reclamo.

## 7. Prueba antes de escalar

- [ ] Pedido de prueba a tu propia dirección.
- [ ] Ficha con fechas y contra entrega correctas.
- [ ] Pedido con `_proveedor` visible en el Admin.
- [ ] Guía y tracking sincronizados.
- [ ] Correo/WhatsApp de confirmación con los tiempos reales.
