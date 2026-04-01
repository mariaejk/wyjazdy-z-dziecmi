import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin uczestnictwa w warsztatach organizowanych przez Wyjazdy z Dziećmi.",
};

export default function TermsPage() {
  return (
    <SectionWrapper>
      <Container>
        <article className="prose prose-graphite mx-auto max-w-3xl [&_h1]:font-heading [&_h1]:text-graphite [&_h2]:font-heading [&_h2]:text-graphite [&_h3]:font-heading [&_h3]:text-graphite [&_a]:text-moss [&_a]:underline hover:[&_a]:text-moss-light">
          <h1 className="text-3xl font-bold sm:text-4xl">Regulamin uczestnictwa w warsztatach</h1>
          <p className="text-sm text-graphite-light">Ostatnia aktualizacja: 1 kwietnia 2026 r.</p>

          <h2>§1. Postanowienia ogólne</h2>
          <ol>
            <li>
              Niniejszy Regulamin określa warunki uczestnictwa w warsztatach i wyjazdach
              organizowanych przez <strong>Marię Kordalewską</strong>, prowadzącą działalność
              pod nazwą „Wyjazdy z Dziećmi" (dalej: „Organizator").
            </li>
            <li>
              Kontakt z Organizatorem:
              <ul>
                <li>E-mail: <a href="mailto:wyjazdyzdziecmi@gmail.com">wyjazdyzdziecmi@gmail.com</a></li>
                <li>Telefon: <a href="tel:+48503098906">+48 503 098 906</a></li>
                <li>Strona: <a href="https://wyjazdyzdziecmi.pl">wyjazdyzdziecmi.pl</a></li>
              </ul>
            </li>
            <li>
              Dokonanie rezerwacji warsztatu oznacza akceptację niniejszego Regulaminu.
            </li>
            <li>
              Warsztaty odbywają się w terminach i miejscach wskazanych na stronie
              internetowej Organizatora.
            </li>
          </ol>

          <h2>§2. Definicje</h2>
          <ul>
            <li><strong>Warsztat</strong> — zajęcia, warsztaty lub wyjazd warsztatowy organizowany przez Organizatora, w tym warsztaty rodzinne, dla dorosłych, matka-córka i inne.</li>
            <li><strong>Uczestnik</strong> — osoba, która dokonała rezerwacji i została potwierdzona przez Organizatora.</li>
            <li><strong>Opiekun</strong> — rodzic lub opiekun prawny dziecka uczestniczącego w warsztacie.</li>
            <li><strong>Rezerwacja</strong> — zgłoszenie uczestnictwa za pośrednictwem formularza na stronie, e-maila lub telefonicznie.</li>
          </ul>

          <h2>§3. Rezerwacja i potwierdzenie</h2>
          <ol>
            <li>
              Rezerwacji można dokonać za pośrednictwem:
              <ul>
                <li>formularza rezerwacji na stronie wyjazdyzdziecmi.pl,</li>
                <li>wiadomości e-mail na adres wyjazdyzdziecmi@gmail.com,</li>
                <li>kontaktu telefonicznego.</li>
              </ul>
            </li>
            <li>
              Po otrzymaniu zgłoszenia Organizator potwierdzi rezerwację drogą e-mailową
              w ciągu 24 godzin roboczych, informując o dostępności miejsc i szczegółach płatności.
            </li>
            <li>
              Rezerwacja jest wiążąca po otrzymaniu potwierdzenia od Organizatora
              i dokonaniu wpłaty zaliczki (jeśli jest wymagana).
            </li>
            <li>
              Liczba miejsc na każdym warsztacie jest ograniczona. O przyjęciu decyduje
              kolejność zgłoszeń i wpłat.
            </li>
            <li>
              W przypadku braku miejsc Uczestnik może zapisać się na listę oczekujących.
              Organizator powiadomi go o zwolnieniu miejsca.
            </li>
          </ol>

          <h2>§4. Płatności</h2>
          <ol>
            <li>
              Ceny warsztatów podane są na stronie internetowej Organizatora
              i obejmują zakres opisany w programie danego warsztatu.
            </li>
            <li>
              Organizator może wymagać wpłaty zaliczki w wysokości określonej
              na stronie warsztatu (zazwyczaj 30–50% ceny) w ciągu 7 dni od potwierdzenia rezerwacji.
            </li>
            <li>
              Pozostała część ceny powinna zostać wpłacona nie później niż 14 dni
              przed planowanym terminem warsztatu, chyba że Organizator ustali inny termin.
            </li>
            <li>
              Płatności dokonuje się przelewem bankowym na rachunek wskazany
              w potwierdzeniu rezerwacji.
            </li>
            <li>
              Cena warsztatu obejmuje: program warsztatowy, materiały, wyżywienie
              i zakwaterowanie — o ile jest to wyraźnie wskazane w opisie warsztatu.
              Dojazd na miejsce Uczestnik organizuje we własnym zakresie,
              chyba że opis warsztatu stanowi inaczej.
            </li>
          </ol>

          <h2>§5. Rezygnacja uczestnika</h2>
          <ol>
            <li>
              Zgodnie z art. 38 pkt 12 Ustawy z dnia 30 maja 2014 r. o prawach konsumenta,
              ze względu na to, że warsztaty mają ściśle oznaczony termin świadczenia usługi
              związanej z wypoczynkiem, konsumentowi <strong>nie przysługuje ustawowe prawo
              do odstąpienia od umowy</strong> zawartej na odległość w terminie 14 dni.
            </li>
            <li>
              Uczestnik może zrezygnować z udziału w warsztacie, informując Organizatora
              drogą e-mailową lub telefonicznie.
            </li>
            <li>
              Wpłata podlega zwrotowi jedynie w przypadku:
              <ul>
                <li><strong>odwołania warsztatu przez Organizatora</strong> — zwrot 100% wpłaconej kwoty,</li>
                <li><strong>znalezienia przez Uczestnika osoby zastępczej</strong> na swoje miejsce,
                  zaakceptowanej przez Organizatora — zwrot 100% wpłaconej kwoty.</li>
              </ul>
            </li>
            <li>
              W pozostałych przypadkach rezygnacji wpłata nie podlega zwrotowi.
            </li>
            <li>
              Zwroty (gdy przysługują) realizowane są w ciągu 14 dni
              na rachunek bankowy, z którego dokonano wpłaty.
            </li>
          </ol>

          <h2>§6. Odwołanie warsztatu przez Organizatora</h2>
          <ol>
            <li>
              Organizator zastrzega sobie prawo do odwołania warsztatu z powodu:
              <ul>
                <li>niewystarczającej liczby uczestników,</li>
                <li>siły wyższej (np. warunki pogodowe, pandemia, niedostępność obiektu),</li>
                <li>innych okoliczności niezależnych od Organizatora.</li>
              </ul>
            </li>
            <li>
              W przypadku odwołania warsztatu przez Organizatora, Uczestnikowi przysługuje
              <strong> zwrot 100% wpłaconej kwoty</strong> w ciągu 14 dni.
            </li>
            <li>
              Organizator dołoży starań, aby zaproponować alternatywny termin warsztatu.
              Uczestnik nie jest zobowiązany do przyjęcia alternatywnego terminu.
            </li>
            <li>
              Organizator poinformuje uczestników o odwołaniu warsztatu niezwłocznie
              — nie później niż 7 dni przed planowanym terminem, chyba że odwołanie
              wynika z nagłych okoliczności.
            </li>
          </ol>

          <h2>§7. Uczestnictwo — prawa i obowiązki</h2>
          <ol>
            <li>
              Uczestnik zobowiązany jest do przestrzegania zasad bezpieczeństwa
              i regulaminu miejsca, w którym odbywa się warsztat.
            </li>
            <li>
              <strong>Warsztaty z dziećmi:</strong> Opiekun ponosi pełną odpowiedzialność
              za dziecko przez cały czas trwania warsztatu, chyba że program wyraźnie
              przewiduje opiekę ze strony Organizatora. Opiekun potwierdza, że dziecko
              nie ma przeciwwskazań zdrowotnych do udziału w zaplanowanych aktywnościach.
            </li>
            <li>
              Uczestnik informuje Organizatora przed warsztatem o:
              <ul>
                <li>alergiach pokarmowych i wymaganiach dietetycznych,</li>
                <li>schorzeniach lub ograniczeniach zdrowotnych mogących mieć wpływ na udział w zajęciach,</li>
                <li>specjalnych potrzebach dziecka (jeśli dotyczy).</li>
              </ul>
            </li>
            <li>
              Organizator zastrzega sobie prawo do wykluczenia z warsztatu osoby,
              która swoim zachowaniem zagraża bezpieczeństwu lub komfortowi
              innych uczestników. W takim przypadku zwrot opłaty nie przysługuje.
            </li>
            <li>
              Podczas warsztatów mogą być wykonywane zdjęcia i nagrania wideo
              w celach dokumentacyjnych i promocyjnych. Uczestnik, który nie wyraża
              na to zgody, powinien poinformować Organizatora przed rozpoczęciem warsztatu.
            </li>
          </ol>

          <h2>§8. Odpowiedzialność Organizatora</h2>
          <ol>
            <li>
              Organizator odpowiada za należytą realizację programu warsztatu
              zgodnie z opisem na stronie internetowej.
            </li>
            <li>
              Organizator nie ponosi odpowiedzialności za:
              <ul>
                <li>wypadki i kontuzje wynikające z nieprzestrzegania zasad bezpieczeństwa przez Uczestnika,</li>
                <li>rzeczy osobiste Uczestnika (w tym ich zgubienie lub uszkodzenie),</li>
                <li>szkody wynikające z siły wyższej.</li>
              </ul>
            </li>
            <li>
              Organizator zaleca Uczestnikom posiadanie ubezpieczenia NNW
              na czas trwania warsztatu.
            </li>
          </ol>

          <h2>§9. Reklamacje</h2>
          <ol>
            <li>
              Uczestnik ma prawo złożyć reklamację dotyczącą realizacji warsztatu
              w terminie 14 dni od zakończenia warsztatu.
            </li>
            <li>
              Reklamację należy złożyć drogą e-mailową na adres:
              {" "}<a href="mailto:wyjazdyzdziecmi@gmail.com">wyjazdyzdziecmi@gmail.com</a>.
            </li>
            <li>
              Reklamacja powinna zawierać: imię i nazwisko Uczestnika, datę i nazwę
              warsztatu, opis zastrzeżeń oraz oczekiwany sposób rozwiązania.
            </li>
            <li>
              Organizator rozpatrzy reklamację w ciągu 14 dni od jej otrzymania
              i poinformuje Uczestnika o decyzji drogą e-mailową.
            </li>
            <li>
              W przypadku sporów konsumenckich Uczestnik może skorzystać z platformy
              ODR (Online Dispute Resolution):{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                ec.europa.eu/consumers/odr
              </a>.
            </li>
          </ol>

          <h2>§10. Ochrona danych osobowych</h2>
          <ol>
            <li>
              Administratorem danych osobowych Uczestników jest Maria Kordalewska.
            </li>
            <li>
              Dane osobowe przetwarzane są w celu realizacji rezerwacji i warsztatu
              na podstawie art. 6 ust. 1 lit. b RODO (wykonanie umowy).
            </li>
            <li>
              Szczegółowe informacje o przetwarzaniu danych osobowych zawiera{" "}
              <a href="/polityka-prywatnosci">Polityka prywatności</a>.
            </li>
          </ol>

          <h2>§11. Postanowienia końcowe</h2>
          <ol>
            <li>
              W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają
              przepisy prawa polskiego, w szczególności Kodeksu cywilnego
              oraz ustawy o prawach konsumenta.
            </li>
            <li>
              Organizator zastrzega sobie prawo do zmiany Regulaminu.
              Zmiany nie dotyczą rezerwacji dokonanych przed ich wprowadzeniem.
            </li>
            <li>
              Niniejszy Regulamin obowiązuje od dnia 1 kwietnia 2026 r.
            </li>
          </ol>
        </article>
      </Container>
    </SectionWrapper>
  );
}
