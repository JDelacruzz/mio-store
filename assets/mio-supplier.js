/**
 * Mio Store — Trazabilidad de proveedor en pedidos
 * ------------------------------------------------
 * Inyecta propiedades de línea ocultas en el formulario de compra:
 *
 *   _proveedor        → Dropi | Mastershop | AliExpress | Mio Store
 *   _proveedor_codigo → ID del producto en el proveedor
 *   _proveedor_url    → URL del producto en el proveedor
 *   _proveedor_origen → Colombia | China
 *
 * Las propiedades que empiezan con "_" no se muestran al cliente, pero
 * quedan visibles en el pedido y en la API de Admin (customAttributes).
 * Así cualquier app de logística (Dropi, Mastershop, DSers, etc.) o un
 * flujo de Shopify Flow puede enrutar el pedido sin tocar el tema.
 */

(() => {
  const SELECTOR_FORM = 'form[action*="/cart/add"]';
  const SELECTOR_DATA = 'script[data-mio-supplier-json]';

  const getSupplierMap = () => {
    const map = new Map();

    document.querySelectorAll(SELECTOR_DATA).forEach((script) => {
      try {
        const data = JSON.parse(script.textContent);
        const productId = script.dataset.productId;
        if (productId && data?.supplier) map.set(String(productId), data);
      } catch (error) {
        // Un JSON inválido nunca debe romper el carrito.
      }
    });

    return map;
  };

  const fieldName = (key) => `properties[${key}]`;

  const upsertField = (form, key, value) => {
    if (!value) return;

    const name = fieldName(key);
    let input = form.querySelector(`input[name="${CSS.escape(name)}"]`);

    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.dataset.mioSupplierField = 'true';
      form.appendChild(input);
    }

    input.value = value;
  };

  const hydrate = (scope = document) => {
    const suppliers = getSupplierMap();
    if (!suppliers.size) return;

    scope.querySelectorAll(SELECTOR_FORM).forEach((form) => {
      if (!(form instanceof HTMLFormElement)) return;

      const productId =
        form.closest('product-form-component')?.dataset.productId ||
        form.dataset.productId ||
        form.querySelector('input[name="product-id"]')?.value;

      const data = suppliers.get(String(productId || ''));
      if (!data) return;

      upsertField(form, '_proveedor', data.supplierName || data.supplier);
      upsertField(form, '_proveedor_codigo', data.supplierProductId);
      upsertField(form, '_proveedor_url', data.supplierUrl);
      upsertField(form, '_proveedor_origen', data.origin);

      form.dataset.mioSupplierReady = 'true';
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => hydrate(), { once: true });
  } else {
    hydrate();
  }

  document.addEventListener('shopify:section:load', (event) => hydrate(event.target));

  // Algunos temas clonan el formulario para el sticky add-to-cart.
  document.addEventListener('cart:updated', () => hydrate());
})();
