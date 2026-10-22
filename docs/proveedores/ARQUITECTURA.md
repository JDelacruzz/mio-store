# Arquitectura de proveedores — Dropi, Mastershop y AliExpress

Mio Store está preparado para trabajar con varios proveedores **sin depender de una app
específica**. La tienda sigue funcionando si una app se cae, se cambia de proveedor o se
migra de dropshipping a inventario propio.

La arquitectura tiene cuatro capas:

| Capa | Dónde vive | Qué hace |
| --- | --- | --- |
| 1. Datos | Metafields y tags del producto | Guardan proveedor, SKU, costo, tiempos y origen |
| 2. Presentación | `snippets/mio-supplier.liquid` + `blocks/mio-supplier-info.liquid` | Muestra entrega real, contra entrega y garantía en la ficha |
| 3. Pedido | `snippets/mio-supplier.liquid` + `assets/mio-supplier.js` | Adjunta el proveedor al artículo del carrito |
| 4. Operación | Apps + Shopify Flow | Enruta el pedido al proveedor correcto |

---

## 1. Datos: un solo modelo para los tres proveedores

Los datos se leen en este orden de prioridad:

1. `mio.supplier` (metafield de producto).
2. `custom.supplier` (respaldo para apps que ya usan ese namespace).
3. Tags del producto: `proveedor:dropi`, `supplier:mastershop`, `aliexpress`, etc.
4. Valor por defecto: `manual` → se presenta como **Mio Store**.

### Metafields

Namespace: **`mio`**. Todos son opcionales: si faltan, el tema usa valores razonables.

| Key | Tipo | Ejemplo | Para qué |
| --- | --- | --- | --- |
| `supplier` | `single_line_text_field` | `dropi` | Proveedor: `dropi`, `mastershop`, `aliexpress`, `manual` |
| `supplier_product_id` | `single_line_text_field` | `DR-10293` | SKU/ID en el proveedor. Se adjunta al pedido |
| `supplier_variant_id` | `single_line_text_field` | `10293-RED-M` | Variante exacta en el proveedor |
| `supplier_url` | `url` | `https://...` | Enlace directo al producto en el proveedor |
| `supplier_cost` | `number_decimal` | `18500` | Costo de compra (solo admin, nunca se muestra) |
| `shipping_min_days` | `number_integer` | `1` | Días mínimos de entrega |
| `shipping_max_days` | `number_integer` | `3` | Días máximos de entrega |
| `ships_from` | `single_line_text_field` | `Colombia` | Origen que ve el cliente |
| `cod_available` | `boolean` | `true` | Habilita el mensaje de pago contra entrega |
| `supplier_status` | `single_line_text_field` | `active` | Uso operativo (`active`, `paused`, `out_of_stock`) |

Puedes crearlos a mano en **Configuración → Datos personalizados → Productos** o con el
archivo [`metafields.graphql`](./metafields.graphql) usando la Admin API.

> El tema **no** necesita que los metafields existan para renderizar. Si no están, usa los
> valores por defecto de cada proveedor.

### Valores por defecto por proveedor

| Proveedor | Origen | Entrega | Contra entrega | Nota que muestra el tema |
| --- | --- | --- | --- | --- |
| Dropi | Colombia | 1–3 días | Sí | Envío nacional con Dropi |
| Mastershop | Colombia | 1–4 días | Sí | Envío nacional con Mastershop |
| AliExpress | China | 10–20 días | No | Importado · seguimiento internacional |
| Manual / Mio Store | Colombia | 2–5 días | Sí | Envío nacional |

Cualquier valor se puede sobrescribir por producto con los metafields de la tabla anterior.

### Convención de SKU recomendada

Usa el SKU de la variante como identificador interno y deja el ID del proveedor en el
metafield. Ejemplo:

```
SKU Shopify:        MIO-TECH-001
supplier:           dropi
supplier_product_id: DR-10293
supplier_variant_id: 10293-NEGRO
```

Así puedes cambiar de proveedor sin romper el catálogo ni el historial de ventas.

---

## 2. Presentación: confianza automática en la ficha

La capa visual vive en:

- `snippets/mio-supplier.liquid` — resuelve el proveedor y renderiza.
- `blocks/mio-supplier-info.liquid` — bloque arrastrable en la ficha de producto.
- `assets/mio-supplier.css` — estilos.

Modos del snippet:

```liquid
{% render 'mio-supplier', product: product %}                    {%- comment -%} bloque completo {%- endcomment -%}
{% render 'mio-supplier', product: product, mode: 'badge' %}     {%- comment -%} solo insignia {%- endcomment -%}
{% render 'mio-supplier', product: product, mode: 'json' %}      {%- comment -%} datos para el JS {%- endcomment -%}
{% render 'mio-supplier', product: product, mode: 'fields' %}    {%- comment -%} inputs ocultos (fallback sin JS) {%- endcomment -%}
```

Qué muestra:

- Fechas estimadas calculadas con la fecha actual + `shipping_min_days` / `shipping_max_days`.
- Origen real (`Colombia` o `China`).
- **Pago contra entrega** si `cod_available` es `true`; si es `false`, cambia automáticamente
  a **Pago 100% seguro** (tarjetas, PSE, billeteras). Esto evita prometer contra entrega en
  productos de AliExpress.
- Garantía de 30 días.
- Referencia interna del proveedor (visible solo si existe el metafield).

El bloque ya está insertado en `templates/product.json`, debajo del botón de compra. Puedes
moverlo, ocultarlo o cambiar sus textos desde el editor de temas.

---

## 3. Pedido: trazabilidad sin apps

El snippet imprime las propiedades de línea ocultas directamente en el formulario de compra
(`blocks/buy-buttons.liquid`) y `assets/mio-supplier.js` las refuerza en formularios que se
generan después:

| Propiedad | Ejemplo | Visible al cliente |
| --- | --- | --- |
| `_proveedor` | `Dropi` | No |
| `_proveedor_codigo` | `DR-10293` | No |
| `_proveedor_url` | `https://...` | No |
| `_proveedor_origen` | `Colombia` | No |

Las propiedades que empiezan con `_` no se muestran en el carrito, pero quedan en el pedido
y en la API de Admin (`customAttributes`). Con eso puedes:

- Exportar pedidos desde la API de Admin y filtrar por proveedor (o usar Flow).
- Enrutar con Shopify Flow usando el tag del producto o el SKU del artículo.
- Alimentar apps de logística que leen propiedades del artículo.

> **Cobertura:** las propiedades se imprimen directamente dentro del formulario de compra
> (`blocks/buy-buttons.liquid`), así que también viajan en la compra rápida y en cualquier
> formulario que use ese bloque. El JS solo las refuerza en formularios generados después
> (por ejemplo, la barra de compra fija). Aun así, mantén el tag del producto como respaldo
> para enrutar por tag.

### Recomendación operativa

1. Etiqueta cada producto con `proveedor:dropi`, `proveedor:mastershop` o
   `proveedor:aliexpress` (aunque ya uses metafields).
2. En la app del proveedor, importa/sincroniza el catálogo y mapea por SKU.
3. Configura el enrutamiento por tag del producto o por la propiedad `_proveedor`
   (según lo que lea tu app).
4. Prueba un pedido real de bajo valor antes de escalar.

No se admiten **variantes de un mismo producto con proveedores distintos**. Si un producto
tiene tallas de Dropi y otras de Mastershop, sepáralo en dos productos. Es la única forma
de mantener trazabilidad y tiempos de entrega honestos.

---

## 4. Operación: compatibilidad con apps

El tema no asume ninguna app. Estas son las rutas soportadas:

| Proveedor | Apps típicas | Cómo leen el pedido |
| --- | --- | --- |
| Dropi | App oficial Dropi | SKU / producto importado / tag de pedido |
| Mastershop | App Mastershop | SKU / producto importado / confirmación manual |
| AliExpress | DSers, AutoDS, CJdropshipping, Zendrop | SKU, URL del proveedor, variante |
| Cualquiera | Shopify Flow + Admin API | Tag de pedido, SKU, metafield |

### Flujo sugerido (independiente de la app)

```
Pedido creado
   └─ artículo pertenece a un producto con tag "proveedor:dropi"
        ├─ Flow agrega el tag "dropi" al pedido
        ├─ la app de Dropi recoge pedidos con tag "dropi"
        └─ si falla, el equipo lo ve en Admin → pedido → artículo
```

### Contra entrega (COD)

El tema **presenta** el contra entrega, pero el cobro real lo habilita una app o el método
de pago manual de Shopify:

- Shopify Admin → Configuración → Pagos → **Pago manual** → "Contra entrega".
- O la app de COD que uses (Dropi/Mastershop suelen traer su propio flujo).
- El tema solo muestra el mensaje cuando `mio.cod_available` es `true`.

Nunca actives "Contra entrega" como método de pago para productos de AliExpress: el snippet
ya oculta el mensaje, pero el checkout seguiría ofreciendo el método si está activo.

---

## 5. Puesta en marcha en 20 minutos

1. Crea los metafields (manual o con `metafields.graphql`).
2. Etiqueta los productos con `proveedor:dropi` / `proveedor:mastershop` /
   `proveedor:aliexpress`.
3. Completa `supplier_product_id` y los tiempos de entrega de los productos principales.
4. Revisa una ficha de producto: debe aparecer "Envío y garantía" con fechas reales.
5. Haz un pedido de prueba y confirma que el artículo muestra `_proveedor` en el Admin.
6. Configura el enrutamiento en tu app o en Flow.
7. Revisa la guía del proveedor que corresponda:
   [Dropi](./DROPI.md) · [Mastershop](./MASTERSHOP.md) · [AliExpress](./ALIEXPRESS.md).

## 6. Checklist de validación

- [ ] Un producto Dropi muestra "Paga contra entrega" y 1–3 días.
- [ ] Un producto AliExpress muestra "Pago 100% seguro" y 10–20 días.
- [ ] Un producto sin metafields muestra los valores por defecto de Mio Store.
- [ ] El pedido de prueba incluye la propiedad `_proveedor`.
- [ ] El tag del producto coincide con el proveedor real.
- [ ] La app del proveedor ve el pedido (o Flow lo etiqueta).
- [ ] El correo de confirmación no promete tiempos distintos a los de la ficha.
