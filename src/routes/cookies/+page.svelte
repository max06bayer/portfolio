<script lang="ts">
  import LegalPage from '$lib/LegalPage.svelte';
  import { links } from '$lib/links';
</script>
<LegalPage title="Cookies" subtitle="Cookies und lokale Speicherung">
  <h2>Keine Cookies</h2>
  <p>Diese persönliche Website setzt keine Cookies und verwendet keine Werbe-Pixel. Auch im Local Storage oder Session Storage werden keine Besucherprofile oder Einstellungen gespeichert.</p>
  <h2>Cookielose Besucherstatistik</h2>
  <p>Für eine anonyme Besucherstatistik nutze ich GoatCounter. GoatCounter arbeitet ohne Cookies und speichert nichts auf deinem Gerät, deshalb ist dafür kein Cookie-Banner nötig. Welche Daten dabei verarbeitet werden, steht in der <a href={links.privacy}>Datenschutzerklärung</a>.</p>
  <h2>Technisch notwendige Vorgänge</h2>
  <p>Dein Browser lädt die Seiten, Bilder und lokal bereitgestellten Schriftarten und kann diese nach seinen eigenen Einstellungen zwischenspeichern. Dies dient der Anzeige der Website. Es werden keine Dienste verwendet, die Cookies setzen.</p>
  <h2>Hosting und externe Links</h2>
  <p>Die technische Protokollierung von IP-Adressen durch GitHub Pages ist keine Cookie-Funktion. Näheres hierzu steht in der <a href={links.privacy}>Datenschutzerklärung</a>. Wenn du einem externen Link folgst, kann die Zielwebsite eigene Cookies einsetzen; dafür gelten deren Hinweise und Einstellungen.</p>
  <h2>Fragen</h2>
  <p>Bei Fragen erreichst du mich unter <a href={links.contact}>max06.bayer@gmail.com</a>.</p>
</LegalPage>
