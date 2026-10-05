<script lang="ts">
  import { textLink } from './links';
  import { scrollToSocials } from './scroll';
  type Segment = { text: string; color?: { r: number; g: number; b: number }; underline: boolean; link?: { type: string; value: string } | null };
  let { segments, readable = false }: { segments: Segment[]; readable?: boolean } = $props();
  const color = (s: Segment) => s.color ? `rgb(${Math.max(readable ? 138 : 0, s.color.r * 255)} ${Math.max(readable ? 138 : 0, s.color.g * 255)} ${Math.max(readable ? 138 : 0, s.color.b * 255)})` : 'white';
</script>
{#each segments as segment}
  {@const href = segment.link?.type === 'URL' ? segment.link.value : textLink(segment.text)}
  {#if href}
    <a {href} onclick={href === '#socials' ? scrollToSocials : undefined} style={`color:${color(segment)};text-decoration:${segment.underline ? 'underline' : 'none'};`}>{segment.text.replaceAll('\u2028', '\n')}</a>
  {:else}
    <span style={`color:${color(segment)};text-decoration:${segment.underline ? 'underline' : 'none'};`}>{segment.text.replaceAll('\u2028', '\n')}</span>
  {/if}
{/each}
<style>
  a { text-underline-position: from-font; transition: opacity 160ms ease; }
  a:hover { opacity: .75; }
</style>
