<script lang="ts">
  import { base } from '$app/paths';
  import { links } from './links';
  let { title, subtitle, children } = $props();
</script>
<svelte:head>
  <title>{title} — Maximilian Bayer</title>
  <meta name="description" content={`${subtitle} für das persönliche Portfolio von Maximilian Bayer.`} />
</svelte:head>
<main class="document" lang="de">
  <nav aria-label="Navigation"><a href={`${base}/`}>← Portfolio</a><a href={links.contact}>Contact</a></nav>
  <header><p class="eyebrow">Maximilian Bayer</p><h1>{title}</h1><p>{subtitle}</p></header>
  <article>{@render children()}</article>
  <footer><nav aria-label="Rechtliche Informationen"><a href={links.legal}>Legal</a><a href={links.privacy}>Privacy</a><a href={links.cookies}>Cookies</a></nav><p>© 2026 Maximilian Bayer</p></footer>
</main>
<style>
  .document { --unit: min(calc(100vw / 1920), 1px); width: 100%; max-width: 1920px; margin: auto; padding: max(38px, calc(80 * var(--unit))) max(24px, calc(109 * var(--unit))); }
  nav { display: flex; justify-content: space-between; gap: 24px; font-size: max(16px, calc(26 * var(--unit))); font-weight: 350; }
  a, :global(.document article a) { color: #b6b6b6; text-underline-position: from-font; transition: opacity 160ms ease; }
  a:hover, :global(.document article a:hover) { opacity: .75; }
  header { margin: 100px 0 80px; }
  h1 { margin: 12px 0 24px; font-size: max(44px, calc(88 * var(--unit))); font-weight: 500; letter-spacing: -.05em; line-height: 1.1; }
  p, :global(.document article p) { color: #8a8a8a; font-size: max(18px, calc(26 * var(--unit))); font-weight: 350; line-height: 1.49; letter-spacing: -.03em; }
  .eyebrow { color: #b6b6b6; }
  article { max-width: 1100px; }
  :global(.document article h2) { margin: 56px 0 20px; color: white; font-size: max(30px, calc(44 * var(--unit))); font-weight: 500; letter-spacing: -.05em; line-height: 1.2; }
  :global(.document article p) { margin: 0 0 24px; }
  :global(.document article address) { font-style: normal; }
  footer { margin-top: 100px; padding-top: 32px; border-top: 1px solid #232323; }
  footer nav { justify-content: flex-start; }
  footer p { color: #4d4d4d; margin-top: 48px; }
  @media (max-width: 600px) { header { margin: 64px 0 48px; } }
</style>
