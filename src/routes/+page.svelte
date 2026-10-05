<script lang="ts">
  import { base } from '$app/paths';
  import MobilePortfolio from '$lib/MobilePortfolio.svelte';
  import DesignLayer from '$lib/DesignLayer.svelte';
  import DesignText from '$lib/DesignText.svelte';
  import layers from '$lib/design/layers.json';
  import texts from '$lib/design/text.json';
</script>

<svelte:head>
  <title>Maximilian Bayer — Portfolio</title>
  <meta name="description" content="Engineering, robotics, autonomous aircraft, and software projects by Maximilian Bayer." />
  <link rel="preload" href={`${base}/figma/hero-artwork.png`} as="image" />
</svelte:head>

<main class="portfolio" aria-label="Maximilian Bayer’s portfolio">
  <h1 class="sr-only">Maximilian Bayer</h1>
  <div class="canvas">
    <img class="hero" src={`${base}/figma/hero-artwork.png`} alt="" width="1920" height="1088" fetchpriority="high" />
    {#each layers as layer (layer.id)}
      <DesignLayer {layer} />
    {/each}
    <img class="footer-artwork" src={`${base}/figma/footer-artwork.png`} alt="" width="1920" height="766" loading="lazy" />
    {#each texts as text (text.id)}
      <DesignText {text} />
    {/each}
  </div>
  <MobilePortfolio />
</main>

<style>
  .portfolio { width: 100%; max-width: 1920px; margin-inline: auto; padding-top: 1cm; container-type: inline-size; }
  .canvas { --unit: calc(100cqw / 1920); position: relative; width: 100%; height: calc(13390 * var(--unit)); overflow: clip; isolation: isolate; }
  .hero { display: block; position: absolute; left: 0; top: 0; width: 100%; height: calc(1088 * var(--unit)); }
  .footer-artwork { display: block; position: absolute; left: 0; top: calc(12624 * var(--unit)); width: 100%; height: calc(766 * var(--unit)); }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
  @media (max-width: 1080px) {
    .portfolio { padding-top: 24px; }
    .canvas { display: none; }
  }
</style>
