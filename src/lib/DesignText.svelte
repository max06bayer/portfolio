<script lang="ts">
  import DesignContent from './DesignContent.svelte';
  type Segment = { text: string; color?: { r: number; g: number; b: number }; underline: boolean; link?: { type: string; value: string } | null };
  type Text = { id: string; x: number; y: number; w: number; h: number; align: string; size: number; weight: string; line: number; spacing: number; segments: Segment[] };
  let { text }: { text: Text } = $props();
  const unit = (n: number) => `calc(${n} * var(--unit))`;
  const title = $derived(text.size === 44);
  const footer = $derived(text.y >= 12624);
  const label = $derived(text.segments.map(s => s.text).join(''));
  const style = $derived(`left:${unit(text.x)};top:${unit(text.y)};width:${unit(text.w)};height:${unit(text.h)};font-size:${unit(text.size)};font-weight:${text.weight === 'Medium' ? 500 : 350};line-height:${text.line};letter-spacing:${unit(text.spacing)};text-align:${text.align.toLowerCase()};`);
</script>

{#if title}
  <h2 data-node-id={text.id} {style}><DesignContent segments={text.segments} /></h2>
{:else if footer}
  <div class="text footer-link" data-node-id={text.id} {style} aria-label={label}><DesignContent segments={text.segments} /></div>
{:else}
  <p class="text" data-node-id={text.id} id={text.id === '12:2183' ? 'socials' : undefined} {style}><DesignContent segments={text.segments} /></p>
{/if}

<style>
  .text, h2 { position: absolute; margin: 0; padding: 0; white-space: pre-wrap; overflow-wrap: break-word; }
</style>
