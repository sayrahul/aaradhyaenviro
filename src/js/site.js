/* Aaradhya Enviro – site behaviour (no dependencies). */
(function () {
  'use strict';

  var doc = document;
  var $ = function (sel, root) { return (root || doc).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); };
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };

  // ── Analytics (only when a GA4 id is configured on <html data-ga4="G-…">) ──
  var gaId = doc.documentElement.getAttribute('data-ga4');
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }
  if (gaId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { anonymize_ip: true });
    var s = doc.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    doc.head.appendChild(s);
  }
  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.indexOf('tel:') === 0) track('click_call', { link_url: href });
    else if (href.indexOf('wa.me') !== -1) track('click_whatsapp', { link_url: location.pathname });
    else if (href.indexOf('mailto:') === 0) track('click_email');
  });

  // ── Focus trap helper ──
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])';
  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    var items = $$(FOCUSABLE, container).filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && doc.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && doc.activeElement === last) { first.focus(); e.preventDefault(); }
  }

  // ── Mobile menu ──
  var menu = $('[data-menu]');
  var menuBtn = $('[data-menu-open]');
  function openMenu() {
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('is-open'); });
    menuBtn.setAttribute('aria-expanded', 'true');
    doc.documentElement.classList.add('overflow-hidden');
    var first = $('.mobile-menu__panel a, .mobile-menu__panel button', menu);
    if (first) first.focus();
  }
  function closeMenu() {
    menu.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    doc.documentElement.classList.remove('overflow-hidden');
    setTimeout(function () { menu.hidden = true; }, 250);
    menuBtn.focus();
  }
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', openMenu);
    $$('[data-menu-close]', menu).forEach(function (b) { b.addEventListener('click', closeMenu); });
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
      trapFocus(menu, e);
    });
  }

  // ── Desktop mega menu (hover/focus handled in CSS; this adds click + Escape) ──
  $$('[data-mega]').forEach(function (item) {
    var btn = $('[data-mega-toggle]', item);
    var setOpen = function (open) {
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    btn.addEventListener('click', function () { setOpen(!item.classList.contains('is-open')); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); btn.focus(); }
    });
    doc.addEventListener('click', function (e) { if (!item.contains(e.target)) setOpen(false); });
    item.addEventListener('mouseleave', function () { setOpen(false); });
  });

  // ── Lead forms (contact page + call-back dialog) ──
  function digits(v) { return (v || '').replace(/\D/g, ''); }
  function validate(form) {
    var errors = [];
    $$('[required]', form).forEach(function (f) {
      var ok = f.value.trim() !== '';
      if (ok && f.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value.trim());
      if (ok && f.type === 'tel') { var d = digits(f.value); ok = d.length >= 10 && d.length <= 13; }
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok) errors.push(f);
    });
    $$('input[type="email"]:not([required])', form).forEach(function (f) {
      var ok = !f.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value.trim());
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok) errors.push(f);
    });
    return errors;
  }
  function whatsappFallback(form) {
    var lines = [];
    $$('input, select, textarea', form).forEach(function (f) {
      if (f.name && f.name !== 'website' && f.value.trim()) lines.push(f.name + ': ' + f.value.trim());
    });
    return 'https://wa.me/__WHATSAPP__?text=' + encodeURIComponent('Enquiry from website\n' + lines.join('\n'));
  }
  $$('[data-lead-form]').forEach(function (form) {
    var wrap = form.closest('[data-form-body]').parentNode;
    var errorBox = $('[data-form-error]', form);
    var submit = $('button[type="submit"]', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorBox.hidden = true;
      var errs = validate(form);
      if (errs.length) {
        errorBox.textContent = 'Please check the highlighted fields (valid name, 10-digit mobile number and email where required).';
        errorBox.hidden = false;
        errs[0].focus();
        return;
      }
      var showSuccess = function () {
        $('[data-form-body]', wrap).classList.add('hidden');
        var ok = $('[data-form-success]', wrap);
        ok.classList.remove('hidden');
        ok.focus();
        store.set('callbackShown', String(Date.now()));
        track('generate_lead', { form: form.getAttribute('data-lead-form') });
      };
      // Honeypot: bots fill the hidden "website" field. Pretend success, send nothing.
      var hp = form.elements.website;
      if (hp && hp.value) { showSuccess(); return; }

      var data = new FormData(form);
      data.delete('website');
      var original = submit.innerHTML;
      submit.disabled = true;
      submit.textContent = 'Sending…';
      var controller = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (controller) controller.abort(); }, 15000);
      // Apps Script web apps do not return CORS headers, so the response is opaque.
      // A resolved request means it reached Google; network errors and timeouts are reported.
      fetch(form.getAttribute('data-endpoint'), { method: 'POST', mode: 'no-cors', body: data, signal: controller ? controller.signal : undefined })
        .then(function () { showSuccess(); })
        .catch(function () {
          errorBox.innerHTML = 'Sorry, your message could not be sent (network problem). Please <a class="underline font-semibold" target="_blank" rel="noopener" href="' + whatsappFallback(form) + '">send it on WhatsApp</a> or call __PHONE_DISPLAY__.';
          errorBox.hidden = false;
        })
        .then(function () { clearTimeout(timer); submit.disabled = false; submit.innerHTML = original; });
    });
  });

  // Contact page: pre-select the service passed as ?service=…
  var serviceSelect = $('#serviceType');
  if (serviceSelect) {
    var wanted = new URLSearchParams(location.search).get('service');
    if (wanted) $$('option', serviceSelect).forEach(function (o) { if (o.value === wanted) serviceSelect.value = wanted; });
  }

  // ── Call-back dialog ──
  var dialog = $('#callback-dialog');
  function openCallback(source) {
    if (!dialog || dialog.open || typeof dialog.showModal !== 'function') return false;
    dialog.showModal();
    track('callback_open', { source: source });
    return true;
  }
  if (dialog) {
    $$('[data-callback-open]').forEach(function (b) {
      b.addEventListener('click', function () { if (!openCallback('button')) location.href = '/contact'; });
    });
    $$('[data-callback-close]', dialog).forEach(function (b) { b.addEventListener('click', function () { dialog.close(); }); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { store.set('callbackShown', String(Date.now())); });

    // Gentle auto-prompt: desktop only, once a week, after 30 s or 60% scroll, never on the contact page.
    var last = parseInt(store.get('callbackShown') || '0', 10);
    var week = 7 * 24 * 3600 * 1000;
    var eligible = window.matchMedia('(min-width: 1024px)').matches && !$('[data-lead-form="contact"]') && Date.now() - last > week;
    if (eligible) {
      var fired = false;
      var fire = function () {
        if (fired) return;
        fired = true;
        window.removeEventListener('scroll', onScroll);
        if (!doc.querySelector('dialog[open]')) openCallback('auto');
      };
      var onScroll = function () {
        var h = doc.documentElement;
        if ((h.scrollTop + window.innerHeight) / h.scrollHeight > 0.6) fire();
      };
      setTimeout(fire, 30000);
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  // ── Blog category filter ──
  var filter = $('[data-filter]');
  if (filter) {
    var cards = $$('[data-category]');
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter-value]');
      if (!btn) return;
      var val = btn.getAttribute('data-filter-value');
      $$('[data-filter-value]', filter).forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      cards.forEach(function (c) { c.hidden = val !== 'all' && c.getAttribute('data-category') !== val; });
    });
  }

  // ── Gallery lightbox ──
  var lb = $('[data-lightbox-dialog]');
  if (lb && typeof lb.showModal === 'function') {
    var triggers = $$('[data-lightbox]');
    var img = $('[data-lightbox-img]', lb);
    var cap = $('[data-lightbox-caption]', lb);
    var index = 0;
    var show = function (i) {
      index = (i + triggers.length) % triggers.length;
      var t = triggers[index];
      img.src = t.getAttribute('data-lightbox');
      img.alt = t.querySelector('img').alt;
      cap.textContent = t.getAttribute('data-caption');
    };
    triggers.forEach(function (t, i) { t.addEventListener('click', function () { show(i); lb.showModal(); }); });
    $('[data-lightbox-close]', lb).addEventListener('click', function () { lb.close(); });
    $('[data-lightbox-prev]', lb).addEventListener('click', function () { show(index - 1); });
    $('[data-lightbox-next]', lb).addEventListener('click', function () { show(index + 1); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') lb.close(); });
  }

  // ── Brochure: Save as PDF ──
  $$('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });
})();
