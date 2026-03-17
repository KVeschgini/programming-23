---
path: '/part-7/3-times-and-dates'
title: 'Zeiten und Daten'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man Daten und Zeiten in Python-Code verarbeitet
- werden Sie in der Lage sein, `datetime`-Objekte zu erstellen und zu verwenden
- werden Sie wissen, wie man zwei Daten oder Zeiten vergleicht und Differenzen zwischen ihnen berechnet

</text-box>

## Das datetime-Objekt

Das Python-Modul [datetime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime) enthält die Funktion [now](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now), die ein datetime-Objekt mit dem aktuellen Datum und der aktuellen Uhrzeit zurückgibt. Die Standardausgabe eines datetime-Objekts sieht so aus:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time)
```

<sample-output>

2021-10-19 08:46:49.311393

</sample-output>

Sie können das Objekt auch selbst definieren:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print(my_time)
```

<sample-output>

1952-12-24 00:00:00

</sample-output>

Standardmäßig ist die Zeit auf Mitternacht eingestellt, da wir im obigen Beispiel keine Tageszeit angegeben haben.

Auf verschiedene Elemente des datetime-Objekts kann auf folgende Weise zugegriffen werden:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print("Tag:", my_time.day)
print("Monat:", my_time.month)
print("Jahr:", my_time.year)
```

<sample-output>

Tag: 24
Monat: 12
Jahr: 1952

</sample-output>

Es kann auch eine Tageszeit angegeben werden. Die Genauigkeit kann variieren, wie Sie unten sehen können:

```python
from datetime import datetime

pv1 = datetime(2021, 6, 30, 13)     # 30.6.2021 um 13 Uhr
pv2 = datetime(2021, 6, 30, 18, 45) # 30.6.2021 um 18:45 Uhr
```

## Zeiten vergleichen und Differenzen berechnen

Die vertrauten Vergleichsoperatoren funktionieren auch mit datetime-Objekten:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

if time_now < midsummer:
    print("Es ist noch nicht Mittsommer")
elif time_now == midsummer:
    print("Frohen Mittsommer!")
elif time_now > midsummer:
    print("Mittsommer ist bereits vorbei")
```

<sample-output>

Mittsommer ist bereits vorbei

</sample-output>

Die Differenz zwischen zwei datetime-Objekten kann einfach mit dem Subtraktionsoperator berechnet werden:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

difference = midsummer - time_now
print("Mittsommer ist noch", difference.days, "Tage entfernt")
```

<sample-output>

Mittsommer ist noch -116 Tage entfernt

</sample-output>

Hinweis: Das Ergebnis der datetime-Subtraktion ist ein [timedelta](https://docs.python.org/3/library/datetime.html?highlight=datetime#timedelta-objects)-Objekt. Es ist weniger vielseitig als das `datetime`-Objekt. Beispielsweise können Sie auf die Anzahl der Tage in einem `timedelta`-Objekt zugreifen, aber nicht auf die Anzahl der Jahre, da die Länge eines Jahres variiert. Ein `timedelta`-Objekt enthält die Attribute `days`, `seconds` und `microseconds`. Andere Maße können als Argumente übergeben werden, werden aber intern umgerechnet.

Ebenso ist die Addition zwischen `datetime`- und `timedelta`-Objekten möglich. Das Ergebnis ist das `datetime`, das entsteht, wenn die angegebene Anzahl von Tagen (oder Wochen, Sekunden usw.) zu einem `datetime`-Objekt hinzugefügt wird:

```python
from datetime import datetime, timedelta
midsummer = datetime(2021, 6, 26)

one_week = timedelta(days=7)
week_from_date = midsummer + one_week

print("Eine Woche nach Mittsommer wird es der", week_from_date, "sein")

long_time = timedelta(weeks=32, days=15)

print("32 Wochen und 15 Tage nach Mittsommer wird es der", midsummer + long_time, "sein")
```

<sample-output>

Eine Woche nach Mittsommer wird es der 2021-07-03 00:00:00 sein
32 Wochen und 15 Tage nach Mittsommer wird es der 2022-02-20 00:00:00 sein

</sample-output>

Sehen wir uns an, wie eine höhere Genauigkeit funktioniert:

```python
time_now = datetime.now()
midnight = datetime(2021, 6, 30)
difference = midnight - time_now
print(f"Bis Mitternacht sind es noch {difference.seconds} Sekunden")
```

<sample-output>

Bis Mitternacht sind es noch 8188 Sekunden

</sample-output>

<programming-exercise name='Wie alt' tmcname='part07-09_how_old'>

Bitte schreiben Sie ein Programm, das den Benutzer nach seinem Geburtsdatum fragt und dann ausgibt, wie alt der Benutzer am Vorabend des neuen Jahrtausends war. Das Programm soll Tag, Monat und Jahr separat abfragen und das Alter in Tagen ausgeben. Bitte sehen Sie sich die folgenden Beispiele an:

<sample-output>

Tag: **10**
Monat: **9**
Jahr: **1979**
Am Vorabend des neuen Jahrtausends waren Sie 7417 Tage alt.

</sample-output>

<sample-output>

Tag: **28**
Monat: **3**
Jahr: **2005**
Am Vorabend des neuen Jahrtausends waren Sie noch nicht geboren.

</sample-output>

Sie können davon ausgehen, dass alle als Argument übergebenen Tag-Monat-Jahr-Kombinationen gültige Daten sind. Das heißt, es wird kein Datum wie der 31. Februar vorkommen. 

</programming-exercise>

<programming-exercise name='Gültige PIC?' tmcname='part07-10_valid_pic'>

In dieser Übung validieren Sie finnische Personenkennzeichen (Personal Identity Codes, PIC). 

Bitte schreiben Sie eine Funktion namens `is_it_valid(pic: str)`, die `True` oder `False` zurückgibt, je nachdem, ob das als Argument übergebene PIC gültig ist oder nicht. Finnische PICs folgen dem Format `ddmmyyXyyyz`, wobei `ddmmyy` das Geburtsdatum enthält, `X` das Jahrhundertkennzeichen ist, `yyy` die persönliche Kennung und `z` ein Prüfzeichen.

Das Programm soll die Gültigkeit anhand dieser drei Kriterien prüfen:

* Die erste Hälfte des Codes ist ein gültiges, existierendes Datum im Format `ddmmyy`.
* Das Jahrhundertkennzeichen ist entweder `+` (1800er), `-` (1900er) oder `A` (2000er).
* Das Prüfzeichen ist gültig.

Das Prüfzeichen wird berechnet, indem die neunstellige Zahl aus Geburtsdatum und persönlicher Kennung durch 31 geteilt wird und das Zeichen an dem durch den Rest angegebenen Index aus der Zeichenkette `0123456789ABCDEFHJKLMNPRSTUVWXY` ausgewählt wird. Wäre der Rest beispielsweise 12, wäre das Prüfzeichen `C`.

Weitere Beispiele und Erklärungen zur Verwendung des PIC finden Sie bei der [Digital and Population Data Services Agency](https://dvv.fi/en/personal-identity-code).

**WICHTIG!** Bitte achten Sie darauf, Ihr eigenes PIC nicht preiszugeben, zum Beispiel in dem Code, den Sie zum Testen verwenden, oder über die Support-Kanäle des Kurses.

Hier sind einige gültige PICs, die Sie zum Testen verwenden können:

* 230827-906F
* 120488+246L
* 310823A9877

</programming-exercise>

## Zeiten und Daten formatieren

Das `datetime`-Modul enthält eine praktische Methode [strftime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.date.strftime) zur Formatierung der String-Repräsentation eines datetime-Objekts. Der folgende Code gibt beispielsweise das aktuelle Datum im Format `dd.mm.yyyy` und dann Datum und Uhrzeit in einem anderen Format aus:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time.strftime("%d.%m.%Y"))
print(my_time.strftime("%d/%m/%Y %H:%M"))
```

<sample-output>

19.10.2021
19/10/2021 09:31

</sample-output>

Die Zeitformatierung verwendet spezifische Zeichen, um bestimmte Formate zu kennzeichnen. Das Folgende ist eine Liste einiger davon (eine vollständige Liste finden Sie in der Python-[Dokumentation](https://docs.python.org/3/library/time.html#time.strftime)):

Notation | Bedeutung
:--------|:--------
`%d` | Tag (01–31)
`%m` | Monat (01–12)
`%Y` | Jahr im 4-stelligen Format
`%H` | Stunden im 24-Stunden-Format
`%M` | Minuten (00–59)
`%S` | Sekunden (00–59)

Sie können auch das Trennzeichen zwischen den verschiedenen Elementen angeben, wie in den obigen Beispielen zu sehen ist.

Die Datetime-Formatierung funktioniert auch in umgekehrter Richtung, falls Sie ein datetime-Objekt aus einem vom Benutzer angegebenen String parsen müssen. Die Methode [strptime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.strptime) erledigt genau das:

```python
from datetime import datetime

birthday = input("Bitte geben Sie Ihren Geburtstag im Format tt.mm.jjjj ein: ")
my_time = datetime.strptime(birthday, "%d.%m.%Y")

if my_time < datetime(2000, 1, 1):
    print("Sie wurden im vorigen Jahrtausend geboren")
else:
    print("Sie wurden in diesem Jahrtausend geboren")
```

<sample-output>

Bitte geben Sie Ihren Geburtstag im Format tt.mm.jjjj ein: **5.11.1986**
Sie wurden im vorigen Jahrtausend geboren

</sample-output>

<programming-exercise name='Bildschirmzeit' tmcname='part07-11_screen_time'>

Bitte schreiben Sie ein Programm zur Aufzeichnung der Zeit, die der Benutzer über einen bestimmten Zeitraum vor einem Fernseher, Computer oder Mobilgerät verbracht hat. 

Das Programm soll wie folgt funktionieren:

<sample-output>

Dateiname: **late_june.txt**
Startdatum: **24.6.2020**
Wie viele Tage: **5**
Bitte geben Sie die Bildschirmzeit in Minuten für jeden Tag ein (TV Computer Mobil):
Bildschirmzeit 24.06.2020: **60 120 0**
Bildschirmzeit 25.06.2020: **0 0 0**
Bildschirmzeit 26.06.2020: **180 0 0**
Bildschirmzeit 27.06.2020: **25 240 15**
Bildschirmzeit 28.06.2020: **45 90 5**
Daten in Datei late_june.txt gespeichert

</sample-output>

Der Benutzer gibt jeden Tag in einer separaten Zeile ein, und die Einträge enthalten drei durch Leerzeichen getrennte Zahlen, die Minuten darstellen.

Mit der obigen Eingabe soll das Programm die Daten in einer Datei namens `late_june.txt` speichern. Der Inhalt soll so aussehen:

<sample-data>

Time period: 24.06.2020-28.06.2020
Total minutes: 780
Average minutes: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5

</sample-data>

</programming-exercise>
