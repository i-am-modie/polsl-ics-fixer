# POLSL-ICS-FIXER
Jako że po ściagnieciu planu ze strony plan.polsl.pl w icsie jest milion wydarzeń zrobionych rekurencyjnie. Powstała potrzeba na zrobienie programu, który przekonwertuje to na ładne wizytówki używające wydarzeń powtarzających się co tydzień co pozwoliło zrobić z 205 niezależnych pól w kalendarzu 28 (14zajęc * 2 wynikające z zastosowania w pliku wizytówkowym czasu w UTC automatycznie konwerowanego w kalendarzu na wybraną strefe czasowową)

## CEL
Przy 205 wydarzeniach zmiana każdego np o 5 min lub usunięćie nieaktualnego planu z kalendarza to katorga. Przy zredukowaniu mamy tych rekordów już tylko 28 wystarczy zrobić taką operacje na dwukrotnie na każdym interesującym nas wydarzeniu(dla czasu letniego i zimowego)
## WYMAGANIA
```
środowisko uruchmieniowe node.js
manager pakietów yarn lub npm
```
## HOW TO
1. W folderze z projektu z konsoli uruchomić polecenie doinstalowujący potrzene pakiety(zależnie od naszego managera pakietów)
```
npm install
yarn
```
2. W folderze z projektu z konsoli uruchomić polecenie
```
npm start <ścieżka do pliku ics(bezwzgledna lub wzgledna rozpoczęta './')>
yarn start <ścieżka do pliku ics(bezwzgledna lub wzgledna rozpoczęta './')>
```
3. W tym samym folderze otrzymamy plik result.ics, który jest przekonwertowanym plikiem wizytówkowym.
