let cancelScroll: (() => void) | undefined;

export function scrollToSocials(event: MouseEvent) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const mobile = window.matchMedia('(max-width: 900px)').matches;
  const target = document.getElementById(mobile ? 'mobile-socials' : 'socials');
  if (!target) return;
  event.preventDefault();
  cancelScroll?.();
  const start = window.scrollY;
  const end = Math.max(0, start + target.getBoundingClientRect().top - 48);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: end, behavior: 'instant' });
    return;
  }
  const duration = 1800;
  const started = performance.now();
  let frame = 0;
  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
    cancelScroll = undefined;
  };
  cancelScroll = stop;
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('keydown', stop);
  const tick = (now: number) => {
    const t = Math.min(1, (now - started) / duration);
    const eased = t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
    window.scrollTo({ top: start + (end - start) * eased, behavior: 'instant' });
    if (t < 1) frame = requestAnimationFrame(tick);
    else stop();
  };
  frame = requestAnimationFrame(tick);
}
