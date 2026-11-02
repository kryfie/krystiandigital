# krystian.digital v3 — Pages CMS + GitHub Pages

**Render nie jest potrzebny.** Panel CMS działa pod https://app.pagescms.org/ i zapisuje projekty jako pliki Markdown do Twojego repozytorium GitHub. Wbudowany w GitHub Pages Jekyll automatycznie tworzy publiczne podstrony projektu i aktualizuje listy na stronie głównej. Nie musisz płacić za hosting panelu ani uruchamiać własnego serwera. Dostęp do panelu wymaga autoryzacji GitHub.

## 1. Jednorazowe wdrożenie

1. Zrób kopię obecnego repozytorium.
2. **Usuń stary katalog `projekty/` oraz stary plik `.nojekyll` bezpośrednio z lokalnego repozytorium** (to pozostałości poprzedniej wersji). Nowy system utworzy te strony automatycznie z folderu `_projects/`. Usunięcie jest ważne, aby stare strony nie przykrywały nowych.
3. Skopiuj **całą zawartość** tego ZIP-a do katalogu repozytorium na komputerze, zachowując pliki zaczynające się od kropki (szczególnie `.pages.yml`).
4. Zrób commit i Push w GitHub Desktop.
5. W GitHub → Settings → Pages wybierz Source: **Deploy from a branch**, Branch: `main`, Folder: `/(root)`. Jekyll powinien zbudować stronę. Jeśli publikacja już tak działa — nie zmieniaj ustawień.
6. Uwaga: ZIP nie zawiera `.nojekyll`, ale rozpakowanie ZIP-a NAD starymi plikami go nie skasuje. **Usuń go ręcznie ze starego repozytorium**, a potem zrób commit usunięcia. Bez tego Jekyll nie przetworzy projektów.
7. Odczekaj do zakończenia zielonego przebiegu Pages w zakładce Actions i sprawdź portfolio i wybraną podstronę, np. `/projekty/churreria-mundo/`.

## 2. Aktywacja CMS

1. Otwórz https://app.pagescms.org/.
2. Zaloguj się za pomocą GitHub i zaakceptuj autoryzację aplikacji.
3. Daj aplikacji dostęp do repozytorium krystian.digital (najlepiej **tylko do tego repozytorium**, zamiast całego konta).
4. Otwórz repozytorium i gałąź `main` w Pages CMS.
5. Otwórz sekcję **Projekty / realizacje**. Początkowo zobaczysz 8 projektów.
6. Otwórz Churreria Mundo, popraw opis lub wrzuć prawdziwy screenshot i zapisz. CMS sam zrobi commit; GitHub Pages przebuduje witrynę.

## 3. Dodanie nowego projektu

1. Pages CMS → `Projekty / realizacje` → `New` / `Dodaj`.
2. Wypełnij: nazwa projektu, krótki opis, kategoria, status (zgodny z prawdą), typ pracy, tekst pełnego opisu, zdjęcie główne i opcjonalna galeria.
3. Ustaw `Pokaż publicznie` = TAK, aby projekt pojawił się w portfolio.
4. Wpisz `Kolejność` (np. 9, 10...) dla sortowania.
5. Zapisz. Zostanie utworzony plik `_projects/nazwa-projektu.md`, a Jekyll opublikuje np. `/projekty/nazwa-projektu/`.

## 4. Wybór dwóch wyróżnionych projektów

W edycji projektu jest przełącznik **Wyróżnij na stronie głównej**. Zaznacz go w DWÓCH projektach i wyłącz w pozostałych. Domyślnie wyróżnione są Churreria Mundo i SkądKlikasz.

> Pages CMS nie ma wbudowanej walidacji „maksymalnie dwa zaznaczone projekty w całej kolekcji”. Strona celowo pokaże TYLKO dwa pierwsze z oznaczonych projektów wg `Kolejność`. To zabezpieczenie nie blokuje zapisania trzeciego przełącznika. Pilnuj więc, żeby były zaznaczone dokładnie dwa.

Pozostałe opublikowane projekty wciąż pozostają w sekcji `Wszystkie projekty`.

## 5. Ważne uwagi

- **Hosting:** GitHub Pages. **CMS:** Pages CMS (bezpłatny, open source). **Render:** NIE.
- Projektowe zdjęcia trafiają do `assets/images/projects/`. Nie wrzucaj tam zdjęć poufnych — publiczne repozytorium i strona udostępniają je publicznie.
- Samo ustawienie `Pokaż publicznie = NIE` usuwa projekt z list na stronie głównej, ale nie traktuj go jak bezpiecznej ochrony poufnych treści — wszystkie pliki źródłowe publicznego repozytorium mogą być dostępne.
- Zachowane są dotychczasowe ścieżki wszystkich 8 projektów.
- **Zmiana nazwy projektu** nie musi zmieniać jego adresu URL. Adres zależy od nazwy pliku Markdown, który utworzono podczas dodawania projektu. Zmiana nazwy pliku zmienia też URL.
- `Pages CMS` to panel administracyjny, nie generator i nie hosting strony. GitHub Pages używa Jekyll do budowania HTML-i; deployment wykonuje GitHub automatycznie.
- **Formularz kontaktowy nadal wymaga własnego Formspree ID** w `assets/js/config.js`; CMS nie obsługuje wiadomości z formularza.
- W historii GitHuba pozostanie każda zmiana, więc można wrócić do wcześniejszego commita.
- Powyższy workflow nie zużywa żadnych kredytów Netlify. GitHub Pages / Actions mają własne zasady i limity.

## 6. Który plik za co odpowiada?

- `.pages.yml` — definicja pól CMS.
- `_config.yml` — ustawienia Jekyll dla GitHub Pages.
- `_projects/*.md` — opis i parametry każdego projektu.
- `_layouts/project.html` — szablon każdej podstrony projektu.
- `index.html` — strona główna, automatycznie pobiera zawartość z `site.projects` podczas budowania.
- `assets/images/projects/` — okładki i galerie.
- `assets/css/style.css` — wygląd.
