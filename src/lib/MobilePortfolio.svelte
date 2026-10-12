<script lang="ts">
  import { base } from '$app/paths';
  import DesignContent from './DesignContent.svelte';
  import texts from './design/text.json';
  import layers from './design/layers.json';
  import { links } from './links';
  import { scrollToSocials } from './scroll';
  import { projects } from './projects';

  const text = (id: string) => texts.find(t => t.id === id)!;
  const image = (id: string) => layers.find(l => l.id === id)!;
</script>

<div class="mobile">
  <header>
    <img class="artwork" src={`${base}/figma/hero-artwork.png`} alt="Maximilian Bayer — portfolio, with an experimental drone" width="1920" height="1088" fetchpriority="high" />
    <p class="intro" id="mobile-socials"><DesignContent segments={text('12:2183').segments} readable /></p>
  </header>
  {#each projects as project}
    {@const title = text(project.title)}
    {@const name = title.segments.map(s => s.text).join('')}
    <section aria-label={name} data-project={project.slug}>
      <div class="description">
        <h2><DesignContent segments={title.segments} /></h2>
        <p><DesignContent segments={text(project.body).segments} /></p>
        <p class="date"><DesignContent segments={text(project.date).segments} /></p>
        {#if project.title === '9:2072'}
          <nav class="project-links" aria-label="Docuflex links"><a href={links.docuflex}>Website ↗</a><a href={links.docuflexRepository}>GitHub ↗</a></nav>
        {/if}
      </div>
      <div class="gallery">
        {#each project.images as id, index}
          {@const layer = image(id)}
          <figure class:portrait={layer.h > layer.w} style={`aspect-ratio:${layer.w}/${layer.h};`}>
            <img src={`${base}/figma/${layer.asset}`} alt={`${name} — project image ${index + 1}`} width={layer.w} height={layer.h} loading="lazy" decoding="async" style={`object-fit:${layer.fit};object-position:${layer.position};opacity:${layer.opacity ?? 1};`} />
          </figure>
        {/each}
      </div>
    </section>
  {/each}
  <footer>
    <img class="artwork" src={`${base}/figma/footer-artwork.png`} alt="" width="1920" height="766" loading="lazy" />
    <nav aria-label="Footer navigation">
      <a href={links.contact}>Contact</a><a href="#mobile-socials" onclick={scrollToSocials}>Socials</a>
      <a href={links.legal}>Legal</a><a href={links.privacy}>Privacy</a><a href={links.cookies}>Cookies</a>
    </nav>
    <p>© 2026 Maximilian Bayer</p>
  </footer>
</div>

<style>
  .mobile { display: none; }
  @media (max-width: 1080px) {
    .mobile { display: block; }
    .artwork { display: block; width: 100%; height: auto; }
    .intro { margin: 24px 24px 48px; font-size: 18px; white-space: pre-wrap; scroll-margin-top: 48px; }
    p { font-weight: 350; font-size: 17px; line-height: 1.6; letter-spacing: -.03em; margin: 0 0 20px; color: #8a8a8a; overflow-wrap: break-word; }
    section { border-top: 1px solid #232323; padding: 40px 24px; }
    h2 { font-size: 32px; line-height: 1.2; letter-spacing: -.05em; font-weight: 500; margin: 0 0 20px; }
    .date { font-size: 15px; margin-bottom: 28px; }
    .gallery { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; }
    figure { margin: 0; overflow: hidden; background: #080808; min-width: 0; }
    figure.portrait { max-width: 280px; width: 100%; justify-self: center; }
    figure img { display: block; width: 100%; height: 100%; }
    nav { display: flex; flex-wrap: wrap; column-gap: 24px; row-gap: 4px; font-size: 17px; font-weight: 350; }
    nav a { color: #b6b6b6; text-underline-position: from-font; min-height: 44px; display: inline-flex; align-items: center; }
    .project-links { margin: -12px 0 24px; }
    footer { border-top: 1px solid #232323; }
    footer nav { padding: 12px 24px 24px; }
    footer p { padding: 0 24px 32px; margin: 0; color: #4d4d4d; font-size: 15px; }
  }
  @media (min-width: 600px) and (max-width: 1080px) {
    .intro, .description { max-width: 660px; }
    .gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }
    figure:first-child { grid-column: 1 / -1; }
  }
</style>
