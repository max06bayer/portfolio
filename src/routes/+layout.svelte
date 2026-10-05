<script lang="ts">
  import { base } from '$app/paths';
  let { children } = $props();
</script>
<svelte:head>
  <link rel="preload" href={`${base}/fonts/Geist-Variable.ttf`} as="font" type="font/ttf" crossorigin="anonymous" />
  <link rel="stylesheet" href={`${base}/fonts.css`} />
</svelte:head>
{@render children()}
<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { background: #000; }
  :global(body) { margin: 0; background: #000; color: #fff; font-family: Geist, sans-serif; }
  :global(a:focus-visible) { outline: 2px solid #9bd9eb; outline-offset: 5px; }
</style>
