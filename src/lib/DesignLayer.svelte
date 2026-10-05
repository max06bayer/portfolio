<script lang="ts">
  import { base } from '$app/paths';
  import { links } from './links';
  type Layer = {
    id: string; x: number; y: number; w: number; h: number;
    asset?: string; border?: string; shadow?: string; background?: string;
    fit?: string; position?: string; opacity?: number;
    crop?: { x: string | number; y: string | number; w: string | number; h: string | number };
  };
  let { layer }: { layer: Layer } = $props();
  const unit = (n: number) => `calc(${n} * var(--unit))`;
  const href = $derived(layer.id === '9:2076' ? links.docuflex : layer.id === '9:2075' ? links.docuflexRepository : '');
  const geometry = $derived(`left:${unit(layer.x)};top:${unit(layer.y)};width:${unit(layer.w)};height:${unit(layer.h)};opacity:${layer.opacity ?? 1};background:${layer.background ?? 'transparent'};${layer.shadow ? 'box-shadow:' + layer.shadow.replace(/([\d.]+)px/g, (_, n) => unit(Number(n))) + ';' : ''}`);
</script>

{#snippet content()}
  {#if layer.asset && layer.crop}
    <img
      src={`${base}/figma/${layer.asset}`}
      alt={layer.w > 100 ? 'Project screenshot' : ''}
      loading="lazy"
      decoding="async"
      style={`left:${layer.crop.x}%;top:${layer.crop.y}%;width:${layer.crop.w}%;height:${layer.crop.h}%;object-fit:${layer.fit};object-position:${layer.position};`}
    />
  {/if}
  {#if layer.border}
    <span class="border" style={`border-color:${layer.border};`}></span>
  {/if}
{/snippet}

{#if href}
  <a class="layer" data-node-id={layer.id} style={geometry} {href} aria-label={layer.id === '9:2076' ? 'Visit Docuflex' : 'Docuflex on GitHub'}>
    {@render content()}
  </a>
{:else}
  <div class="layer" data-node-id={layer.id} style={geometry}>
    {@render content()}
  </div>
{/if}

<style>
  .layer { position: absolute; overflow: hidden; }
  img { position: absolute; display: block; max-width: none; }
  .border { position: absolute; inset: 0; border: calc(1 * var(--unit)) solid; pointer-events: none; }
  a { transition: filter 160ms ease; }
  a:hover { filter: brightness(1.3); }
</style>
