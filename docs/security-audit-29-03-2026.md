# Analiza bezpieczenstwa — Wyjazdy z Dziecmi

Audyt: 29.03.2026 | Kontekst: docs/poprawki/poprawki_29.03/*.md

## Ocena ogolna

Warstwa techniczna jest solidna — centralna walidacja (`validateRequest`), Zod server-side, Turnstile + honeypot + rate limit, security headers, CSV injection prevention, path traversal guard. Znacznie ponad standard dla landing page.

Glowne ryzyka to prawno-organizacyjne, nie techniczne.

---

## BLOK 1: Formularze (CSRF, XSS, Injection) — DOBRZE

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Tokeny CSRF | OK | `validateRequest()` sprawdza Origin header na kazdej trasie API |
| XSS protection | OK | CSP header, React auto-escaping, StructuredData z `replace(/</)` |
| SQL Injection | N/A | Brak SQL — Airtable REST API z parametrami |
| Walidacja server-side | OK | Zod `.safeParse()` na kazdym API route |
| Limity dlugosci pol | OK | `.max()` na wszystkich polach Zod |
| Whitelist approach | OK | Zod schema definiuje co jest dozwolone |
| Honeypot | OK | Pole `website` CSS hidden + fake 200 |

Uwaga: CSP zawiera `'unsafe-inline'` i `'unsafe-eval'` — wymagane przez Next.js/GA, ale zmniejsza ochrone XSS.

---

## BLOK 2: RODO — KRYTYCZNE BRAKI

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| SSL/TLS + HSTS | OK | HSTS z max-age 31536000, includeSubDomains |
| Minimalizacja danych | OK | Zbieramy minimum: imie, email, telefon |
| Checkboxy zgod | OK | `consentRodo` wymagany, `consentMarketing` osobny opcjonalny |
| Polityka prywatnosci | CRITICAL | Placeholder "w przygotowaniu"! Formularze linkuja do nieistniejacej polityki |
| Regulamin | CRITICAL | Placeholder "w przygotowaniu"! |
| Prawo do usuniecia | BRAK | Brak mechanizmu i procedury obslugi zadan Art. 17 |
| Okres retencji | BRAK | Nie zdefiniowany |
| DPA z dostawcami | CZESCIOWO | Airtable/Resend maja DPA, ale trzeba je podpisac |
| HSTS preload | CZESCIOWO | Brak dyrektywy `preload` |

---

## BLOK 3: Dane dzieci — CZESCIOWO

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Minimum danych dziecka | OK | Tylko: liczba dzieci (int) + opcjonalnie wiek (text) |
| Brak marketingu do dzieci | OK | Newsletter zbiera tylko email rodzica |
| Oswiadczenie rodzica | CZESCIOWO | Checkbox RODO ogolny — brak jawnej zgody na dane dzieci |
| Osobna sekcja w polityce | BRAK | Polityka nie istnieje |

---

## BLOK 4: Newsletter — ISTOTNE BRAKI

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Double opt-in | BRAK (HIGH) | Email potwierdzajacy wysylany, ale BEZ linku aktywacyjnego — subskrypcja natychmiastowa |
| Informacja co subskrybuje | OK | Tekst przy checkboxie |
| Link wypisania | BRAK | Brak `List-Unsubscribe` header i linku w emailach |
| SPF/DKIM/DMARC | CZESCIOWO | Wymaga weryfikacji DNS u Hostingera dla Resend |
| DPA z Resend | CZESCIOWO | Resend oferuje DPA — trzeba podpisac |

---

## BLOK 5: Hosting, SSL, infrastruktura — DOBRZE

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Security headers | OK | Pelny zestaw: HSTS, X-Frame-Options, CSP, nosniff, Referrer-Policy |
| WAF + DDoS | OK | Cloudflare Workers = wbudowany WAF + DDoS protection |
| Izolacja | OK | CF Workers = serverless, pelna izolacja |
| Env vars separation | OK | Secrets w env vars, nie w kodzie |
| KV rate limiting | CZESCIOWO | Zakomentowane w `wrangler.jsonc` — wymaga konfiguracji po deployu |

---

## BLOK 6: Boty i spam — BARDZO DOBRZE

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Cloudflare Turnstile | OK | Na KAZDYM formularzu, server-side verification |
| Honeypot | OK | Pole `website` CSS hidden, fake 200 |
| Rate limiting | OK | 5 req/15min per IP, eviction 10k IPs |
| Content-Length limit | OK | 50KB max |

3 linie obrony (Turnstile + honeypot + rate limit) — ponad standard.

---

## BLOK 7: CMS, wtyczki, supply chain — BARDZO DOBRZE

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Brak WordPressa | OK | Next.js static site + Keystatic — eliminuje typowe luki CMS |
| Minimalne dependencje | OK | 13 deps + 8 devDeps |
| Path traversal guard | OK | `isSafeSlug()` w blog reader |
| Admin zabezpieczony | OK | GitHub OAuth w produkcji |
| npm audit w CI | CZESCIOWO | Brak automatycznego sprawdzania CVE |

Podejscie static site eliminuje SQL Injection, XSS server-side i wiekszosc atakow na CMS.

---

## BLOK 8: Polityka prywatnosci, cookies — BRAKI

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Cookie banner 3 opcje | OK | Akceptuj / Odrzuc / Dostosuj — rownorzedne przyciski |
| GA warunkowy | OK | Ladowany TYLKO po zgodzie, `anonymize_ip: true` |
| Granularne kategorie | OK | Niezbedne / analityczne / marketingowe |
| Zmiana preferencji | OK | Link "Ustawienia cookies" w footer |
| Polityka prywatnosci | CRITICAL | Placeholder! |
| Microsoft Clarity consent | CZESCIOWO | Moze byc ladowany bez zgody — do sprawdzenia |
| Link do polityki w bannerze | CZESCIOWO | Brak "Dowiedz sie wiecej" |

---

## BLOK 9: Backupy, szyfrowanie — CZESCIOWO

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Szyfrowanie at rest | OK | Airtable zapewnia (SOC 2, ISO 27001) |
| Szyfrowanie in transit | OK | TLS wszedzie |
| Secrets nie w repo | OK | `.gitignore` poprawny |
| Backupy Airtable | BRAK | Brak automatycznych backupow |
| Dokumentacja dostepow | BRAK | Kto ma dostep do czego? |

---

## BLOK 10: Monitoring, incydenty — BRAKI

| Wymaganie | Status | Szczegoly |
|-----------|--------|-----------|
| Graceful degradation | OK | `Promise.allSettled` z wykrywaniem `allFailed` |
| Logger chroni PII | OK | Logi tylko w dev mode |
| Alerty na bledy | BRAK | Utracony lead = `console.error`, nikt nie jest powiadamiany |
| Plan reagowania na incydenty | BRAK | Brak dokumentu (RODO Art. 33 wymaga powiadomienia UODO w 72h) |
| Monitoring uptime | BRAK | Jesli strona padnie, nikt nie wie |

---

## PRIORYTETY

### CRITICAL — przed uruchomieniem produkcyjnym
1. Polityka prywatnosci — opublikowac pelna (Art. 13 RODO)
2. Regulamin — opublikowac (wymog polskiego prawa)

### HIGH — w ciagu 1-2 tygodni
3. Double opt-in na newsletter (PKE 2024)
4. Alerty na calkowita awarie dostarczania formularzy
5. Plan reagowania na incydenty (`docs/incident-response.md`)
6. Procedura usuwania danych (Art. 17 RODO)

### MEDIUM — w ciagu miesiaca
7. KV rate limiting na CF Workers (odkomentowac w wrangler.jsonc)
8. Unsubscribe w emailach newsletter (`List-Unsubscribe` header)
9. Clarity — sprawdzic consent (ClarityScript.tsx)
10. Backup Airtable (regularny eksport CSV)
11. Monitoring uptime (UptimeRobot/CF Health Checks)
12. SPF/DKIM/DMARC weryfikacja w Resend
13. HSTS preload
14. npm audit w CI/CD
15. Dokumentacja dostepow
16. Okres retencji danych
17. Link do polityki prywatnosci w cookie bannerze
18. Turnstile fail-hard w produkcji gdy brak env var
19. CF Workers observability.enabled: true
20. Jawne oswiadczenie rodzica o danych dziecka w BookingForm
