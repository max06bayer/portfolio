<script lang="ts">
  import LegalPage from '$lib/LegalPage.svelte';
  import { links } from '$lib/links';
</script>
<LegalPage title="Cookies" subtitle="Cookies und lokale Speicherung">
  <h2>Keine Tracking-Cookies</h2>
  <p>Diese persönliche Website setzt selbst keine Cookies. Sie verwendet keine Analysewerkzeuge, Werbe-Pixel oder Dienste zur Wiedererkennung von Besuchern. Auch im Local Storage oder Session Storage werden durch die Website keine Besucherprofile oder Einstellungen gespeichert.</p>
  <h2>Technisch notwendige Vorgänge</h2>
  <p>Dein Browser lädt die Seiten, Bilder und lokal bereitgestellten Schriftarten und kann diese nach seinen eigenen Einstellungen zwischenspeichern. Dies dient der Anzeige der Website. Es werden keine optionalen Dienste verwendet, für die auf dieser Website eine Cookie-Einwilligung eingeholt werden müsste.</p>
  <h2>Hosting und externe Links</h2>
  <p>Die technische Protokollierung von IP-Adressen durch GitHub Pages ist keine Cookie-Funktion. Näheres hierzu steht in der <a href={links.privacy}>Datenschutzerklärung</a>. Wenn du einem externen Link folgst, kann die Zielwebsite eigene Cookies einsetzen; dafür gelten deren Hinweise und Einstellungen.</p>
  <h2>Fragen</h2>
  <p>Bei Fragen erreichst du mich unter <a href={links.contact}>max06.bayer@gmail.com</a>.</p>
</LegalPage>
