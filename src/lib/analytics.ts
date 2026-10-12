import { dev } from '$app/environment';

// GoatCounter: cookieless visitor statistics. Dashboard: https://maxi06.goatcounter.com
const endpoint = 'https://maxi06.goatcounter.com/count';
const script = 'https://gc.zgo.at/count.js';

type Hit = { path?: string; title?: string; event?: boolean };
type GoatCounter = { no_onload?: boolean; count?: (hit: Hit) => void };
declare global {
  interface Window { goatcounter?: GoatCounter }
}

let queue: Hit[] = [];
let siteSeconds = 0;

// Attention milestones, so time spent is recorded without relying on unload events.
const projectMilestones: [string, number][] = [['seen', 3], ['read', 15], ['studied', 45]];
const siteMilestones = [10, 30, 60, 180, 600];

function send(hit: Hit) {
  const count = window.goatcounter?.count;
  if (count) count(hit);
  else queue.push(hit);
}

function event(path: string, title: string) {
  send({ path, title, event: true });
}

function duration(seconds: number) {
  return seconds < 60 ? `${seconds}s` : `${seconds / 60}m`;
}

function trackClick(e: MouseEvent) {
  const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.protocol === 'mailto:') event('click/email', 'Email link clicked');
  else if (url.origin !== location.origin) {
    const target = (url.hostname.replace(/^www\./, '') + url.pathname).replace(/\/$/, '');
    event(`click/${target}`, `Opened ${target}`);
  }
}

export function startAnalytics() {
  if (dev || window.goatcounter) return;
  window.goatcounter = { no_onload: true };
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = script;
  tag.dataset.goatcounter = endpoint;
  tag.onload = () => {
    const pending = queue;
    queue = [];
    pending.forEach(send);
  };
  document.head.append(tag);
  document.addEventListener('click', trackClick);
  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    siteSeconds += 1;
    if (siteMilestones.includes(siteSeconds)) event(`time-on-site/${duration(siteSeconds)}+`, `Stayed ${duration(siteSeconds)} or longer`);
  }, 1000);
}

export function trackPageView() {
  if (!dev) send({});
}

// Counts how long each [data-project] element sits in the middle of the viewport.
export function trackProjects() {
  if (dev) return;
  const focused = new Set<string>();
  const seconds = new Map<string, number>();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const slug = (entry.target as HTMLElement).dataset.project!;
      if (entry.isIntersecting) focused.add(slug);
      else focused.delete(slug);
    }
  }, { rootMargin: '-45% 0px -45% 0px' });
  document.querySelectorAll('[data-project]').forEach(element => observer.observe(element));
  const timer = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    for (const slug of focused) {
      const total = (seconds.get(slug) ?? 0) + 1;
      seconds.set(slug, total);
      for (const [label, after] of projectMilestones) {
        if (total === after) event(`project-${label}/${slug}`, `${slug} ${label} (${after}s+)`);
      }
    }
  }, 1000);
  return () => {
    observer.disconnect();
    clearInterval(timer);
  };
}
