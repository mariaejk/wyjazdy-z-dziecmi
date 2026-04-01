import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Polityka prywatności serwisu Wyjazdy z Dziećmi — informacje o przetwarzaniu danych osobowych zgodnie z RODO.",
};

export default function PrivacyPage() {
  return (
    <SectionWrapper>
      <Container>
        <article className="prose prose-graphite mx-auto max-w-3xl [&_h1]:font-heading [&_h1]:text-graphite [&_h2]:font-heading [&_h2]:text-graphite [&_h3]:font-heading [&_h3]:text-graphite [&_a]:text-moss [&_a]:underline hover:[&_a]:text-moss-light [&_table]:text-sm [&_th]:bg-parchment-dark [&_th]:p-3 [&_td]:p-3 [&_td]:border [&_td]:border-parchment-dark [&_th]:border [&_th]:border-parchment-dark [&_th]:text-left">
          <h1 className="text-3xl font-bold sm:text-4xl">Polityka prywatności</h1>
          <p className="text-sm text-graphite-light">Ostatnia aktualizacja: 1 kwietnia 2026 r.</p>

          <p>
            Niniejsza Polityka prywatności określa zasady przetwarzania i ochrony danych osobowych
            przekazanych przez użytkowników serwisu <strong>wyjazdyzdziecmi.pl</strong> (dalej: „Serwis").
          </p>

          <h2>1. Administrator danych osobowych</h2>
          <p>
            Administratorem Twoich danych osobowych jest <strong>Maria Kordalewska</strong>,
            prowadząca działalność pod nazwą „Wyjazdy z Dziećmi".
          </p>
          <ul>
            <li>Adres: ul. Bartłomieja 7 lok. 29, 02-683 Warszawa</li>
            <li>NIP: 9512199541</li>
            <li>E-mail: <a href="mailto:wyjazdyzdziecmi@gmail.com">wyjazdyzdziecmi@gmail.com</a></li>
            <li>Telefon: <a href="tel:+48503098906">+48 503 098 906</a></li>
          </ul>
          <p>
            W sprawach związanych z ochroną danych osobowych możesz skontaktować się
            z Administratorem pod powyższym adresem e-mail.
          </p>

          <h2>2. Cele i podstawy prawne przetwarzania danych</h2>
          <p>Twoje dane osobowe przetwarzamy w następujących celach:</p>

          <h3>2.1. Rezerwacja warsztatu</h3>
          <table>
            <thead>
              <tr><th>Kategoria</th><th>Szczegóły</th></tr>
            </thead>
            <tbody>
              <tr><td>Dane</td><td>Imię i nazwisko, e-mail, telefon, liczba dorosłych i dzieci, wiek dzieci, wymagania dietetyczne, uwagi</td></tr>
              <tr><td>Cel</td><td>Realizacja rezerwacji, kontakt w sprawie warsztatu, organizacja wyżywienia i zakwaterowania</td></tr>
              <tr><td>Podstawa prawna</td><td>Art. 6 ust. 1 lit. b RODO — wykonanie umowy (rezerwacja warsztatu)</td></tr>
              <tr><td>Okres przechowywania</td><td>Przez czas realizacji warsztatu + 3 lata (okres przedawnienia roszczeń konsumenckich)</td></tr>
            </tbody>
          </table>

          <h3>2.2. Formularz kontaktowy</h3>
          <table>
            <thead>
              <tr><th>Kategoria</th><th>Szczegóły</th></tr>
            </thead>
            <tbody>
              <tr><td>Dane</td><td>Imię i nazwisko, e-mail, treść wiadomości</td></tr>
              <tr><td>Cel</td><td>Odpowiedź na zapytanie</td></tr>
              <tr><td>Podstawa prawna</td><td>Art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes Administratora (obsługa zapytań)</td></tr>
              <tr><td>Okres przechowywania</td><td>Do zakończenia korespondencji, maksymalnie 2 lata</td></tr>
            </tbody>
          </table>

          <h3>2.3. Newsletter</h3>
          <table>
            <thead>
              <tr><th>Kategoria</th><th>Szczegóły</th></tr>
            </thead>
            <tbody>
              <tr><td>Dane</td><td>Adres e-mail</td></tr>
              <tr><td>Cel</td><td>Wysyłanie informacji o nowych warsztatach i wydarzeniach</td></tr>
              <tr><td>Podstawa prawna</td><td>Art. 6 ust. 1 lit. a RODO — Twoja dobrowolna zgoda</td></tr>
              <tr><td>Okres przechowywania</td><td>Do momentu wycofania zgody (rezygnacji z newslettera)</td></tr>
            </tbody>
          </table>

          <h3>2.4. Lista oczekujących</h3>
          <table>
            <thead>
              <tr><th>Kategoria</th><th>Szczegóły</th></tr>
            </thead>
            <tbody>
              <tr><td>Dane</td><td>Imię i nazwisko, e-mail, telefon</td></tr>
              <tr><td>Cel</td><td>Powiadomienie o dostępności miejsca na warsztacie</td></tr>
              <tr><td>Podstawa prawna</td><td>Art. 6 ust. 1 lit. a RODO — Twoja dobrowolna zgoda</td></tr>
              <tr><td>Okres przechowywania</td><td>Do momentu powiadomienia lub wycofania zgody, maksymalnie 1 rok</td></tr>
            </tbody>
          </table>

          <h3>2.5. Zgoda marketingowa</h3>
          <table>
            <thead>
              <tr><th>Kategoria</th><th>Szczegóły</th></tr>
            </thead>
            <tbody>
              <tr><td>Dane</td><td>Adres e-mail (przekazany przy rezerwacji)</td></tr>
              <tr><td>Cel</td><td>Przesyłanie informacji marketingowych o warsztatach i wydarzeniach</td></tr>
              <tr><td>Podstawa prawna</td><td>Art. 6 ust. 1 lit. a RODO — Twoja dobrowolna zgoda (osobna od rezerwacji)</td></tr>
              <tr><td>Okres przechowywania</td><td>Do momentu wycofania zgody</td></tr>
            </tbody>
          </table>

          <h3>2.6. Analityka i statystyki</h3>
          <table>
            <thead>
              <tr><th>Kategoria</th><th>Szczegóły</th></tr>
            </thead>
            <tbody>
              <tr><td>Dane</td><td>Adres IP (zanonimizowany), dane o urządzeniu, zachowanie na stronie</td></tr>
              <tr><td>Cel</td><td>Analiza ruchu na stronie, poprawa jakości usług</td></tr>
              <tr><td>Podstawa prawna</td><td>Art. 6 ust. 1 lit. a RODO — Twoja zgoda (wyrażona przez baner cookies)</td></tr>
              <tr><td>Okres przechowywania</td><td>Zgodnie z polityką dostawców narzędzi analitycznych (Google, Microsoft)</td></tr>
            </tbody>
          </table>

          <h2>3. Odbiorcy danych</h2>
          <p>Twoje dane osobowe mogą być przekazywane następującym kategoriom odbiorców:</p>
          <table>
            <thead>
              <tr><th>Odbiorca</th><th>Cel</th><th>Lokalizacja</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Airtable</strong> (Formagrid Inc.)</td><td>Przechowywanie danych z formularzy</td><td>USA</td></tr>
              <tr><td><strong>Resend</strong> (Resend Inc.)</td><td>Wysyłka wiadomości e-mail (potwierdzenia, powiadomienia)</td><td>UE (Irlandia)</td></tr>
              <tr><td><strong>Cloudflare</strong> (Cloudflare Inc.)</td><td>Hosting strony, ochrona przed spamem (Turnstile), CDN</td><td>Globalnie (UE + USA)</td></tr>
              <tr><td><strong>Google Analytics</strong> (Google LLC)</td><td>Analiza ruchu na stronie (po wyrażeniu zgody)</td><td>USA</td></tr>
              <tr><td><strong>Microsoft Clarity</strong> (Microsoft Corp.)</td><td>Analiza zachowań użytkowników (po wyrażeniu zgody)</td><td>USA</td></tr>
            </tbody>
          </table>
          <p>
            Dane nie są udostępniane innym podmiotom trzecim w celach marketingowych.
          </p>

          <h2>4. Przekazywanie danych do państw trzecich</h2>
          <p>
            Część naszych dostawców usług ma siedzibę w Stanach Zjednoczonych (Airtable, Google, Microsoft).
            Przekazywanie danych odbywa się na podstawie:
          </p>
          <ul>
            <li><strong>EU-US Data Privacy Framework</strong> — certyfikowany program ochrony danych</li>
            <li><strong>Standardowe klauzule umowne (SCC)</strong> przyjęte przez Komisję Europejską</li>
          </ul>

          <h2>5. Twoje prawa</h2>
          <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
          <ul>
            <li><strong>Prawo dostępu</strong> do swoich danych (art. 15 RODO)</li>
            <li><strong>Prawo do sprostowania</strong> nieprawidłowych danych (art. 16 RODO)</li>
            <li><strong>Prawo do usunięcia</strong> danych — „prawo do bycia zapomnianym" (art. 17 RODO)</li>
            <li><strong>Prawo do ograniczenia przetwarzania</strong> (art. 18 RODO)</li>
            <li><strong>Prawo do przenoszenia danych</strong> (art. 20 RODO)</li>
            <li><strong>Prawo do sprzeciwu</strong> wobec przetwarzania opartego na prawnie uzasadnionym interesie (art. 21 RODO)</li>
            <li><strong>Prawo do cofnięcia zgody</strong> w dowolnym momencie — bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem</li>
          </ul>
          <p>
            Aby skorzystać ze swoich praw, napisz na adres: <a href="mailto:wyjazdyzdziecmi@gmail.com">wyjazdyzdziecmi@gmail.com</a>.
            Odpowiemy w ciągu 30 dni.
          </p>
          <p>
            Masz również prawo wniesienia skargi do <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong> (PUODO),
            ul. Stawki 2, 00-193 Warszawa, <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer">uodo.gov.pl</a>.
          </p>

          <h2>6. Dobrowolność podania danych</h2>
          <ul>
            <li><strong>Rezerwacja warsztatu</strong> — podanie danych jest dobrowolne, lecz niezbędne do realizacji rezerwacji. Bez nich nie możemy przyjąć zgłoszenia.</li>
            <li><strong>Formularz kontaktowy</strong> — podanie danych jest dobrowolne, lecz konieczne do udzielenia odpowiedzi.</li>
            <li><strong>Newsletter</strong> — podanie adresu e-mail jest całkowicie dobrowolne.</li>
            <li><strong>Zgoda marketingowa</strong> — całkowicie dobrowolna, nie wpływa na realizację rezerwacji.</li>
          </ul>

          <h2 id="cookies">7. Pliki cookies</h2>
          <p>
            Serwis wykorzystuje pliki cookies (ciasteczka) — małe pliki tekstowe zapisywane
            na Twoim urządzeniu przez przeglądarkę internetową.
          </p>

          <h3>7.1. Rodzaje cookies</h3>
          <table>
            <thead>
              <tr><th>Kategoria</th><th>Cookies</th><th>Cel</th><th>Zgoda</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Niezbędne</strong></td>
                <td>Preferencje cookies (localStorage)</td>
                <td>Zapamiętanie Twoich wyborów dotyczących cookies</td>
                <td>Nie wymagana</td>
              </tr>
              <tr>
                <td><strong>Bezpieczeństwo</strong></td>
                <td>Cloudflare Turnstile</td>
                <td>Ochrona formularzy przed spamem i botami</td>
                <td>Nie wymagana (ochrona bezpieczeństwa)</td>
              </tr>
              <tr>
                <td><strong>Analityczne</strong></td>
                <td>Google Analytics (_ga, _gid, _gat)</td>
                <td>Analiza ruchu na stronie, anonimizacja IP</td>
                <td>Wymagana</td>
              </tr>
              <tr>
                <td><strong>Analityczne</strong></td>
                <td>Microsoft Clarity</td>
                <td>Analiza zachowań użytkowników</td>
                <td>Wymagana</td>
              </tr>
            </tbody>
          </table>

          <h3>7.2. Zarządzanie cookies</h3>
          <p>
            Przy pierwszej wizycie na stronie wyświetlamy baner z wyborem kategorii cookies.
            Możesz w każdej chwili zmienić swoje preferencje klikając „Ustawienia cookies" w stopce strony.
          </p>
          <p>
            Możesz również zarządzać cookies w ustawieniach przeglądarki — instrukcje znajdziesz
            w dokumentacji swojej przeglądarki (Chrome, Firefox, Safari, Edge).
          </p>

          <h2>8. Zautomatyzowane podejmowanie decyzji</h2>
          <p>
            Twoje dane osobowe <strong>nie podlegają zautomatyzowanemu podejmowaniu decyzji,
            w tym profilowaniu</strong>, w rozumieniu art. 22 RODO.
          </p>

          <h2>9. Bezpieczeństwo danych</h2>
          <p>
            Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych, w tym:
          </p>
          <ul>
            <li>Szyfrowanie transmisji danych (HTTPS/TLS)</li>
            <li>Ochrona formularzy przed spamem (Cloudflare Turnstile)</li>
            <li>Ograniczenie częstotliwości wysyłania formularzy (rate limiting)</li>
            <li>Ochrona przed atakami CSV injection w eksportowanych danych</li>
            <li>Weryfikacja Origin (CSRF) na wszystkich endpointach API</li>
          </ul>

          <h2>10. Zmiany polityki prywatności</h2>
          <p>
            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce prywatności.
            O istotnych zmianach poinformujemy poprzez umieszczenie zaktualizowanej wersji na tej stronie
            wraz z datą ostatniej aktualizacji.
          </p>

          <h2>11. Kontakt</h2>
          <p>
            W razie pytań dotyczących niniejszej Polityki prywatności lub przetwarzania Twoich danych
            osobowych, skontaktuj się z nami:
          </p>
          <ul>
            <li>E-mail: <a href="mailto:wyjazdyzdziecmi@gmail.com">wyjazdyzdziecmi@gmail.com</a></li>
            <li>Telefon: <a href="tel:+48503098906">+48 503 098 906</a></li>
          </ul>
        </article>
      </Container>
    </SectionWrapper>
  );
}
