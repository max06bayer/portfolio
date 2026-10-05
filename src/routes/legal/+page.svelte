<script lang="ts">
  import LegalPage from '$lib/LegalPage.svelte';
  import { links } from '$lib/links';
</script>
<LegalPage title="Legal" subtitle="Impressum">
  <h2>Angaben zum Betreiber</h2>
  <address><p>Maximilian Bayer<br />Nürnberger Str. 40<br />85055 Ingolstadt<br />Deutschland</p></address>
  <p>E-Mail: <a href={links.contact}>max06.bayer@gmail.com</a></p>
  <h2>Über diese Website</h2>
  <p>Dies ist eine persönliche, nicht kommerzielle Website. Sie stellt meine eigenen Projekte und Interessen vor. Über diese Website werden keine Waren oder Dienstleistungen verkauft.</p>
  <h2>Inhalte und Urheberrecht</h2>
  <p>Die vorgestellten Projekte, Texte und Gestaltungen dienen der persönlichen Präsentation. Rechte an verwendeten Materialien und Marken bleiben bei den jeweiligen Rechteinhabern. Für eine Nutzung meiner Inhalte außerhalb der gesetzlichen Erlaubnisse kontaktiere mich bitte per E-Mail.</p>
  <h2>Externe Links</h2>
  <p>Diese Website verlinkt auf andere Websites. Für deren Inhalte sind die jeweiligen Betreiber verantwortlich. Wenn dir ein rechtswidriger Inhalt auffällt, kannst du mich über die oben genannte E-Mail-Adresse informieren.</p>
</LegalPage>
