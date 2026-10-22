/**
 * Mio Store — movimiento e interacciones
 *
 * 1. Reveal al scroll con IntersectionObserver (una sola vez, con stagger).
 * 2. Parallax sutil en imágenes del hero (solo desktop, solo transform).
 * 3. Cuenta regresiva de la sección de oferta.
 * 4. Sincronización con el editor de temas.
 *
 * Sin dependencias. ~1 KB comprimido de lógica útil.
 */

(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = window.matchMedia('(min-width: 750px)');

  window.__mioMotionReady = true;

  /* ------------------------------------------------------------------
     Reveal
  ------------------------------------------------------------------ */

  let observer = null;

  const showAll = (elements) => {
    elements.forEach((element) => element.setAttribute('data-mio-visible', ''));
  };

  const getObserver = () => {
    if (observer) return observer;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-mio-visible', '');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    return observer;
  };

  const applyStagger = (scope) => {
    scope.querySelectorAll('[data-mio-stagger]').forEach((group) => {
      const step = Number(group.dataset.mioStagger) || 70;
      const max = Number(group.dataset.mioStaggerMax) || 420;

      [...group.children].forEach((child, index) => {
        if (!child.hasAttribute('data-mio-reveal')) child.setAttribute('data-mio-reveal', '');
        child.style.setProperty('--mio-delay', `${Math.min(index * step, max)}ms`);
      });
    });
  };

  const initReveals = (scope = document) => {
    applyStagger(scope);

    const elements = scope.querySelectorAll('[data-mio-reveal]:not([data-mio-visible])');
    if (!elements.length) return;

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      showAll(elements);
      return;
    }

    const io = getObserver();
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      // Lo que ya está en pantalla se muestra de inmediato (sin esperar scroll).
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        requestAnimationFrame(() => element.setAttribute('data-mio-visible', ''));
      } else {
        io.observe(element);
      }
    });
  };

  /* ------------------------------------------------------------------
     Parallax (sutil, opcional, solo transform)
  ------------------------------------------------------------------ */

  const parallaxItems = () => [...document.querySelectorAll('[data-mio-parallax]')];

  let ticking = false;

  const updateParallax = () => {
    const viewport = window.innerHeight;

    for (const element of parallaxItems()) {
      const holder = element.parentElement;
      if (!holder) continue;

      const rect = holder.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > viewport + 120) continue;

      const speed = Number(element.dataset.mioParallax) || 0.08;
      const shift = (rect.top + rect.height / 2 - viewport / 2) * -speed;
      const offset = Math.max(-24, Math.min(24, shift));

      element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.08)`;
    }

    ticking = false;
  };

  const initParallax = () => {
    if (reduceMotion.matches || !desktop.matches || !finePointer.matches) {
      parallaxItems().forEach((element) => {
        element.style.transform = '';
      });
      return;
    }

    if (!parallaxItems().length) return;

    updateParallax();

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(updateParallax);
      },
      { passive: true }
    );

    window.addEventListener('resize', updateParallax, { passive: true });
  };

  /* ------------------------------------------------------------------
     Cuenta regresiva
  ------------------------------------------------------------------ */

  const format = (value) => String(Math.max(0, value)).padStart(2, '0');

  const initCountdowns = (scope = document) => {
    scope.querySelectorAll('[data-mio-countdown]').forEach((element) => {
      if (element.dataset.mioCountdownReady === 'true') return;
      element.dataset.mioCountdownReady = 'true';

      const raw = element.dataset.mioCountdown;
      if (!raw) return;

      // "2026-11-30" → fin de ese día, hora local del visitante.
      const deadline = new Date(`${raw}T23:59:59`).getTime();
      if (Number.isNaN(deadline)) return;

      const output = {
        days: element.querySelector('[data-mio-unit="days"]'),
        hours: element.querySelector('[data-mio-unit="hours"]'),
        minutes: element.querySelector('[data-mio-unit="minutes"]'),
        seconds: element.querySelector('[data-mio-unit="seconds"]'),
      };

      const tick = () => {
        const remaining = Math.max(0, deadline - Date.now());
        const totalSeconds = Math.floor(remaining / 1000);

        if (output.days) output.days.textContent = format(Math.floor(totalSeconds / 86400));
        if (output.hours) output.hours.textContent = format(Math.floor((totalSeconds % 86400) / 3600));
        if (output.minutes) output.minutes.textContent = format(Math.floor((totalSeconds % 3600) / 60));
        if (output.seconds) output.seconds.textContent = format(totalSeconds % 60);

        element.toggleAttribute('data-mio-countdown-finished', remaining === 0);
      };

      tick();
      window.setInterval(tick, 1000);
    });
  };

  /* ------------------------------------------------------------------
     Cinta: pausa accesible
  ------------------------------------------------------------------ */

  const initMarquees = (scope = document) => {
    scope.querySelectorAll('[data-mio-marquee-pause]').forEach((button) => {
      if (button.dataset.mioMarqueeReady === 'true') return;
      button.dataset.mioMarqueeReady = 'true';

      button.addEventListener('click', () => {
        const marquee = button.closest('.mio-marquee');
        if (!marquee) return;

        const paused = marquee.toggleAttribute('data-mio-marquee-paused');
        button.setAttribute('aria-pressed', String(paused));
        button.setAttribute('aria-label', paused ? 'Reanudar movimiento' : 'Pausar movimiento');
      });
    });
  };

  /* ------------------------------------------------------------------
     Arranque
  ------------------------------------------------------------------ */

  const start = () => {
    initReveals(document);
    initParallax();
    initCountdowns(document);
    initMarquees(document);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  // Editor de temas: reinicializa lo que Shopify vuelve a renderizar.
  document.addEventListener('shopify:section:load', (event) => {
    initReveals(event.target);
    initCountdowns(event.target);
    initMarquees(event.target);
  });

  document.addEventListener('shopify:section:select', (event) => {
    event.target.querySelectorAll('[data-mio-reveal]').forEach((element) => {
      element.setAttribute('data-mio-visible', '');
    });
  });

  // Si el usuario cambia la preferencia de movimiento en caliente.
  const onMotionPreferenceChange = () => {
    root.classList.remove('mio-reduce-motion');
    if (reduceMotion.matches) {
      showAll([...document.querySelectorAll('[data-mio-reveal]')]);
    }
  };

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', onMotionPreferenceChange);
  } else if (typeof reduceMotion.addListener === 'function') {
    reduceMotion.addListener(onMotionPreferenceChange);
  }
})();
