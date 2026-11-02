/* krystian.digital v3.1 - lekka galeria zdjęć bez bibliotek i serwera. */
(() => {
  'use strict';
  const items = [...document.querySelectorAll('.js-gallery-item')];
  const box = document.getElementById('project-lightbox');
  if (!box || items.length === 0) return;

  const img = document.getElementById('project-lightbox-image');
  const count = document.getElementById('project-lightbox-count');
  const caption = document.getElementById('project-lightbox-caption');
  const prev = box.querySelector('[data-gallery-prev]');
  const next = box.querySelector('[data-gallery-next]');
  const close = box.querySelector('[data-gallery-close]:not(.project-lightbox-backdrop)');
  let index = 0;
  let opener = null;
  let touchX = null;

  function update() {
    const a = items[index];
    const thumb = a.querySelector('img');
    const src = a.getAttribute('href');
    // Accept only local image URLs already configured in the CMS.
    img.src = src;
    img.alt = thumb?.alt || `Zdjęcie ${index + 1} projektu`;
    caption.textContent = img.alt;
    count.textContent = `${index + 1} / ${items.length}`;
    prev.hidden = next.hidden = items.length < 2;
  }

  function openAt(i, target) {
    index = i;
    opener = target;
    update();
    box.hidden = false;
    document.body.classList.add('project-lightbox-open');
    close.focus();
  }

  function hide() {
    if (box.hidden) return;
    box.hidden = true;
    img.removeAttribute('src');
    document.body.classList.remove('project-lightbox-open');
    if (opener?.isConnected) opener.focus();
    opener = null;
  }

  function move(delta) {
    index = (index + delta + items.length) % items.length;
    update();
  }

  items.forEach((item, i) => {
    item.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openAt(i, item);
    });
  });
  box.querySelectorAll('[data-gallery-close]').forEach(button => button.addEventListener('click', hide));
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));

  document.addEventListener('keydown', event => {
    if (box.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); hide(); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    else if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    else if (event.key === 'Tab') {
      const controls = [close, prev, next].filter(el => !el.hidden);
      const current = controls.indexOf(document.activeElement);
      if (event.shiftKey && (current <= 0)) { event.preventDefault(); controls.at(-1).focus(); }
      else if (!event.shiftKey && current === controls.length - 1) { event.preventDefault(); controls[0].focus(); }
    }
  });
  box.addEventListener('touchstart', event => {
    touchX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });
  box.addEventListener('touchend', event => {
    if (touchX === null || items.length < 2) return;
    const diff = (event.changedTouches[0]?.clientX ?? touchX) - touchX;
    if (Math.abs(diff) > 55) move(diff < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });
})();
