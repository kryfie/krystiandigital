# krystian.digital · v2.0 · GitHub Pages

Osobista strona/portfolio wykonana w czystym HTML, CSS i JS. Bez Reacta, kompilowania, abonamentów i zależności od Netlify. Bardziej redakcyjny, ludzki styl: jasne tło, wyraźna typografia, autentyczny portret, bez fikcyjnych statystyk i sztucznych opinii.

## Wdrażanie na GitHub Pages

1. Rozpakuj ten ZIP. W środku jest folder `krystian-digital-v2-github-pages`. Wgraj **jego zawartość** do głównego katalogu nowego publicznego repozytorium GitHub (tak, aby `index.html` był na poziomie głównym).
2. Na GitHub wejdź w repozytorium → **Settings → Pages**.
3. W sekcji **Build and deployment** wybierz **Deploy from a branch**, `main` i `/(root)`, potem **Save**.
4. Strona będzie pod adresem w stylu `https://twoj-login.github.io/nazwa-repo/`. Wszystkie linki są względne, więc podstrony powinny działać bez osobnej domeny.
5. Przyszłe zmiany: podmień pliki lokalnie, zrób commit i push przez GitHub Desktop. GitHub Pages opublikuje aktualizację.
6. Domena `krystian.digital` **nie została kupiona ani podłączona**. Gdy ją kupisz, ustaw ją w **Settings → Pages → Custom domain** i skonfiguruj DNS zgodnie z instrukcją GitHub. Dopiero po konfiguracji domeny możesz dodać do repo `CNAME` z samą nazwą `krystian.digital`. Nie dodaję go teraz, aby nie psuć domyślnego adresu GitHub Pages.

Na darmowym planie GitHub Pages publiczne repozytorium jest wspierane, ale usługa ma limity. Nie ma kredytów wdrożeniowych Netlify.

## WAŻNE: Formularz nie wysyła jeszcze danych

GitHub Pages hostuje tylko statyczne pliki. Nie obsługuje Netlify Forms ani kodu serwerowego. Projekt zawiera gotowy formularz i jego obsługę JS, ale trzeba podłączyć usługę **Formspree**:

1. Załóż formularz na https://formspree.io/ (sprawdź aktualne limity darmowego planu).
2. Skopiuj **identyfikator formularza** z linku typu `https://formspree.io/f/abcdefgh`.
3. Otwórz `assets/js/config.js` i wpisz go między apostrofy:

   `window.KRYSTIAN_CONFIG = { formspreeId: 'abcdefgh' };`

4. Zapisz, wykonaj commit/push i zrób test wysłania z działającej strony. Zanim ruszysz z reklamą czy udostępnianiem linku, sprawdź czy wiadomość dotarła.
5. **Uzupełnij `prywatnosc/index.html`** o prawidłowe dane administratora i realne informacje dotyczące formularza, aby nie opublikować niedokończonego dokumentu.

Do czasu skonfigurowania, formularz **nie udaje**, że wysłał dane. Wyświetla jasny komunikat, że odbiór wiadomości nie został podłączony. Awaryjną ścieżką kontaktu jest link do TikToka w stopce i obok formularza.

## Zdjęcie i projektowe okładki

- `assets/images/krystian.webp` — zdjęcie profilowe ze zdjęcia przesłanego w rozmowie, skompresowane do WebP.
- `assets/images/projects/*.webp` — **graficzne okładki zastępcze, nie zdjęcia rzeczywistych projektów**. Każda ma nazwę zgodną z adresem podstrony. Jeśli zapiszesz screen na przykład jako `churreria-mundo.webp` i podmienisz oryginalny plik, pojawi się automatycznie na stronie głównej oraz na podstronie.
- Aby po wstawieniu prawdziwego zrzutu uniknąć mylącej informacji: w `index.html` i odpowiedniej podstronie zaktualizuj atrybut `alt`, a na podstronie usuń tekst „Widoczna grafika to okładka projektowa”.

## Zawartość

- strona główna z ofertą i zdjęciem, sekcja usług, portfolio z 8 projektami, filtrowanie, proces współpracy, „O mnie”, formularz wyceny i link TikTok
- 8 podstron projektowych, z uczciwie opisanymi statusami (demo, koncepcja, prototyp, gotowy projekt)
- mobilna nawigacja, czytelne pola kontaktowe, brak zewnętrznych fontów i skryptów analitycznych
- `404.html`, `.nojekyll`, `robots.txt` i szkic strony prywatności

## Przyszłe zmiany

Edytujesz pliki w folderze lokalnie; nic nie trzeba budować w terminalu. Nowe projekty najprościej dodać, modyfikując `index.html` i tworząc nową podstronę na wzór istniejącej. W razie potrzeby mogę później dołożyć prosty system oparty na danych JSON, aby unikać ręcznego edytowania HTML.

## Przed publikacją

- skonfiguruj i przetestuj formularz; uzupełnij stronę prywatności
- sprawdź opisy i aktualne statusy projektów oraz zgodę na ich prezentację
- podmień wybrane okładki na realne screenshoty
- sprawdź telefon, komputer i poprawność podłączenia domeny
