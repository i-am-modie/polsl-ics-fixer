# POLSL-ICS-FIXER
Jako że po ściagnieciu planu ze strony plan.polsl.pl w icsie jest ok 250(liczba zajęć w tygodniu x liczba tygodni) wynika to z braku użycia powtarzalności wydarzenia. Rozwiązaniem na to jest ten drobny program, który przekonwertuje to na ładne wizytówki używające wydarzeń powtarzających się co tydzień lub dwa. Pozwoliło to zrobić z 205 niezależnych pól w kalendarzu 14(lub 28 jesli chcemy zachowac format UTC(zmiana czasu))

## CEL
Przy 205 wydarzeniach zmiana któregoś o 5 min lub usunięcie nieaktualnego planu z kalendarza to katorga. Przy zredukowaniu mamy tych rekordów już tylko 14 lub 28(w trybie utc), więc wystarczy to zrobić jedno lub dwukrotnie na danym wydarzeniu.
## WYMAGANIA
```
Środowisko uruchmieniowe node.js
Manager pakietów yarn lub npm
```
## HOW TO
1. W folderze z projektu z konsoli uruchomić polecenie doinstalowujący potrzene pakiety(zależnie od naszego managera pakietów)
```
npm install
yarn
```
2. W folderze z projektu z konsoli uruchomić polecenie
```
npm start <ścieżka do pliku ics(bezwzgledna lub wzgledna rozpoczęta './')> <ścieżka pliku wyjścia(bezwzgledna lub wzgledna)>(opcjonalne) utc(opcjonalne)
yarn start <ścieżka do pliku ics(bezwzgledna lub wzgledna rozpoczęta './')>  <ścieżka pliku wyjścia(bezwzgledna lub wzgledna)>(opcjonalne) utc(opcjonalne)
```
3. W tym samym folderze otrzymamy plik result.ics, który jest przekonwertowanym plikiem wizytówkowym.
