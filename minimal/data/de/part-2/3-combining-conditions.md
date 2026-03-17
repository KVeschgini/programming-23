---
path: '/part-2/3-combining-conditions'
title: 'Kombinieren von Bedingungen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- wissen Sie, wie Sie die Operatoren `and`, `or` und `not` in Bedingungen verwenden
- sind Sie in der Lage, verschachtelte bedingte Anweisungen zu schreiben

</text-box>

## Logische Operatoren

Sie können Bedingungen mit den logischen Operatoren `and` (und) sowie `or` (oder) kombinieren. Der Operator `and` legt fest, dass alle angegebenen Bedingungen gleichzeitig wahr sein müssen. Der Operator `or` besagt, dass mindestens eine der angegebenen Bedingungen wahr sein muss.

Beispielsweise bestimmt die Bedingung `zahl >= 5 and zahl <= 8`, dass `zahl` gleichzeitig mindestens 5 und höchstens 8 sein muss. Das heißt, die Zahl muss zwischen 5 und 8 liegen.

```python
zahl = int(input("Bitte geben Sie eine Zahl ein: "))
if zahl >= 5 and zahl <= 8:
    print("Die Zahl liegt zwischen 5 und 8")
```

Demgegenüber legt die Bedingung `zahl < 5 or zahl > 8` fest, dass `zahl` entweder kleiner als 5 oder größer als 8 sein muss. Das bedeutet, sie darf nicht im Bereich von 5 bis 8 liegen.

```python
zahl = int(input("Bitte geben Sie eine Zahl ein: "))
if zahl < 5 or zahl > 8:
    print("Die Zahl liegt nicht im Bereich von 5 bis 8")
```

Die folgende Wahrheitstabelle zeigt das Verhalten dieser Operatoren in verschiedenen Situationen:

| a | b | a and b | a or b |
|:---:|:---:|:---:|:---:|
| False | False | False | False |
| True | False | False | True |
| False | True | False | True |
| True | True | True | True |

Manchmal ist es notwendig zu wissen, ob etwas _nicht_ wahr ist. Der Operator `not` negiert eine Bedingung:

| a | not a |
|:---:|:---:|
| True | False |
| False | True |

Das obige Beispiel, bei dem der Bereich von 5 bis 8 _ausgeschlossen_ wurde, könnte auch wie folgt programmiert werden:

```python
zahl = int(input("Bitte geben Sie eine Zahl ein: "))
if not (zahl >= 5 and zahl <= 8):
    print("Die Zahl liegt nicht im Bereich von 5 bis 8")
```

Insbesondere in der Programmierung werden logische Operatoren oft als _Boolesche Operatoren_ bezeichnet.

<text-box variant='hint' name="Vereinfachte kombinierte Bedingungen">

Die Bedingung `x >= a and x <= b` ist ein sehr verbreiteter Weg, um zu prüfen, ob die Zahl `x` in den Bereich von `a` bis `b` fällt. Ein Ausdruck mit dieser Struktur funktioniert in den meisten Programmiersprachen auf die gleiche Weise.

Python erlaubt zudem eine vereinfachte Notation für das Kombinieren von Bedingungen: `a <= x <= b` erzielt das gleiche Ergebnis wie die längere Version mit `and`. Diese kürzere Schreibweise mag aus der Mathematik vertrauter sein, wird in der Python-Programmierung jedoch nicht sehr häufig verwendet – möglicherweise, weil nur sehr wenige andere Programmiersprachen eine ähnliche Kurzschreibweise besitzen.

</text-box>

## Kombinieren und Verketten von Bedingungen

Das folgende Programm fordert den Benutzer auf, vier Zahlen einzugeben. Mithilfe einiger Bedingungen ermittelt es anschließend, welche der vier Zahlen die größte ist:

```python
n1 = int(input("Zahl 1: "))
n2 = int(input("Zahl 2: "))
n3 = int(input("Zahl 3: "))
n4 = int(input("Zahl 4: "))

if n1 > n2 and n1 > n3 and n1 > n4:
    groesste = n1
elif n2 > n3 and n2 > n4:
    groesste = n2
elif n3 > n4:
    groesste = n3
else:
    groesste = n4

print(f"{groesste} ist die größte der Zahlen.")
```

<sample-output>

Zahl 1: **2**
Zahl 2: **4**
Zahl 3: **1**
Zahl 4: **1**
4 ist die größte der Zahlen.

</sample-output>

Im obigen Beispiel ist die erste Bedingung `n1 > n2 and n1 > n3 and n1 > n4` nur dann wahr, wenn alle drei darin enthaltenen Bedingungen wahr sind.

<in-browser-programming-exercise name="Altersprüfung" tmcname="part02-08_age_check">

Bitte schreiben Sie ein Programm, das nach dem Alter des Benutzers fragt. Wenn das Alter nicht plausibel ist – also unter 5 liegt oder einen Wert hat, der kein tatsächliches menschliches Alter sein kann –, soll das Programm einen Kommentar ausgeben.

Sehen Sie sich die untenstehenden Beispiele für das erwartete Verhalten an, um herauszufinden, welcher Kommentar in welchem Fall angemessen ist.

<sample-output>

Wie alt bist du? **13**
Ok, du bist 13 Jahre alt

</sample-output>

<sample-output>

Wie alt bist du? **2**
Ich vermute, du kannst noch nicht ganz schreiben...

</sample-output>

<sample-output>

Wie alt bist du? **-4**
Das muss ein Fehler sein

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Neffen" tmcname="part02-09_nephews">

Bitte schreiben Sie ein Programm, das nach dem Namen des Benutzers fragt. Wenn der Name Huey, Dewey oder Louie lautet, soll das Programm den Benutzer als einen von Donald Ducks Neffen erkennen.

In ähnlicher Weise soll das Programm, wenn der Name Morty oder Ferdie lautet, den Benutzer als einen von Micky Maus' Neffen erkennen.

Einige Beispiele:

<sample-output>

Bitte geben Sie Ihren Namen ein: **Morty**
Ich glaube, du könntest einer der Neffen von Micky Maus sein.

</sample-output>

<sample-output>

Bitte geben Sie Ihren Namen ein: **Huey**
Ich glaube, du könntest einer der Neffen von Donald Duck sein.

</sample-output>

<sample-output>

Bitte geben Sie Ihren Namen ein: **Ken**
Du bist kein Neffe eines Charakters, den ich kenne.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Noten und Punkte" tmcname="part02-10_grades_and_points">

Die folgende Tabelle skizziert die Notengrenzen in einem bestimmten Universitätskurs. Bitte schreiben Sie ein Programm, das nach der Anzahl der erreichten Punkte fragt und dann die gemäß der Tabelle erreichte Note ausgibt.

| Punkte | Note |
|:---:|:---:|
| < 0 | unmöglich! |
| 0-49 | nicht bestanden |
| 50-59 | 1 |
| 60-69 | 2 |
| 70-79 | 3 |
| 80-89 | 4 |
| 90-100 | 5 |
| > 100 | unmöglich! |

Einige Beispiele:

<sample-output>

Wie viele Punkte [0-100]: **37**
Note: nicht bestanden

</sample-output>

<sample-output>

Wie viele Punkte [0-100]: **76**
Note: 3

</sample-output>

<sample-output>

Wie viele Punkte [0-100]: **-3**
Note: unmöglich!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="FizzBuzz" tmcname="part02-11_fizzbuzz">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Ganzzahl fragt. Wenn die Zahl durch drei teilbar ist, soll das Programm Fizz ausgeben. Wenn die Zahl durch fünf teilbar ist, soll das Programm Buzz ausgeben. Wenn die Zahl sowohl durch drei als auch durch fünf teilbar ist, soll das Programm FizzBuzz ausgeben.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Zahl: **9**
Fizz

</sample-output>

<sample-output>

Zahl: **7**

</sample-output>

<sample-output>

Zahl: **20**
Buzz

</sample-output>

<sample-output>

Zahl: **45**
FizzBuzz

</sample-output>

</in-browser-programming-exercise>

## Verschachtelte bedingte Anweisungen

Bedingte Anweisungen können auch innerhalb anderer bedingter Anweisungen verschachtelt werden. Beispielsweise prüft das folgende Programm, ob eine Zahl größer als Null ist, und anschließend, ob sie ungerade oder gerade ist:

```python
zahl = int(input("Bitte geben Sie eine Zahl ein: "))

if zahl > 0:
    if zahl % 2 == 0:
        print("Die Zahl ist gerade")
    else:
        print("Die Zahl ist ungerade")
else:
    print("Die Zahl ist negativ oder Null")
```

Einige Beispiele für das Verhalten dieses Programms:

<sample-output>

Bitte geben Sie eine Zahl ein: **3**
Die Zahl ist ungerade

Bitte geben Sie eine Zahl ein: **18**
Die Zahl ist gerade

Bitte geben Sie eine Zahl ein: **-4**
Die Zahl ist negativ oder Null

</sample-output>

Bei verschachtelten bedingten Anweisungen ist es entscheidend, die Einrückungen korrekt vorzunehmen. Einrückungen bestimmen, welche Verzweigungen miteinander verknüpft sind. Beispielsweise werden ein `if`-Zweig und ein `else`-Zweig mit der gleichen Menge an Leerzeichen als Zweige derselben bedingten Anweisung gewertet.

Dasselbe Ergebnis lässt sich oft entweder durch verschachtelte bedingte Anweisungen oder durch mit logischen Operatoren kombinierte Bedingungen erzielen. Das folgende Beispiel unterscheidet sich funktional nicht vom obigen Beispiel, in dem Sinne, dass es bei gleichen Eingaben genau die gleichen Ausgaben liefert:

```python
zahl = int(input("Bitte geben Sie eine Zahl ein: "))

if zahl > 0 and zahl % 2 == 0:
    print("Die Zahl ist gerade")
elif zahl > 0 and zahl % 2 != 0:
    print("Die Zahl ist ungerade")
else:
    print("Die Zahl ist negativ oder Null")
```

Keiner der beiden Ansätze ist an sich besser als der andere, aber in verschiedenen Situationen kann der eine oder der andere logischer erscheinen. In diesem speziellen Beispiel empfinden die meisten Menschen die erste Version mit Verschachtelung als intuitiver.

<in-browser-programming-exercise name="Schaltjahr" tmcname="part02-12_leap_year">

Im Allgemeinen ist jedes Jahr, das durch vier teilbar ist, ein Schaltjahr. Wenn das Jahr jedoch zusätzlich durch 100 teilbar ist, ist es nur dann ein Schaltjahr, wenn es auch durch 400 teilbar ist.

Bitte schreiben Sie ein Programm, das den Benutzer nach einem Jahr fragt und dann ausgibt, ob dieses Jahr ein Schaltjahr ist oder nicht.

Einige Beispiele:

<sample-output>

Bitte geben Sie ein Jahr ein: **2011**
Dieses Jahr ist kein Schaltjahr.

</sample-output>

<sample-output>

Bitte geben Sie ein Jahr ein: **2020**
Dieses Jahr ist ein Schaltjahr.

</sample-output>

<sample-output>

Bitte geben Sie ein Jahr ein: **1800**
Dieses Jahr ist kein Schaltjahr.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Alphabetisch in der Mitte" tmcname="part02-13_alphabetically_in_the_middle">

Bitte schreiben Sie ein Programm, das den Benutzer nach drei Buchstaben fragt. Das Programm soll dann denjenigen der drei Buchstaben ausgeben, der in der Mitte stünde, wenn die Buchstaben in alphabetischer Reihenfolge sortiert wären.

Sie können davon ausgehen, dass die Buchstaben entweder alle groß oder alle klein geschrieben werden.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

1. Buchstabe: x
2. Buchstabe: c
3. Buchstabe: p
Der Buchstabe in der Mitte ist p

</sample-output>

<sample-output>

1. Buchstabe: C
2. Buchstabe: B
3. Buchstabe: A
Der Buchstabe in der Mitte ist B

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Schenkungssteuer-Rechner" tmcname="part02-14_gift_tax_calculator" height="500px">

Manche sagen, Steuern zu zahlen mache Finnen glücklich. Schauen wir also mal, ob das Geheimnis des Glücks in einer der Steuern des finnischen Steuerrechts liegt.

[Nach Angaben der finnischen Steuerverwaltung](https://www.vero.fi/en/individuals/property/gifts/) ist eine Schenkung eine Übertragung von Eigentum an eine andere Person ohne Gegenleistung oder Zahlung. Wenn der Gesamtwert der Schenkungen, die Sie im Laufe von 3 Jahren von demselben Schenker erhalten, 5.000 € oder mehr beträgt, müssen Sie Schenkungssteuer zahlen.

Wenn die Schenkung von einem nahen Verwandten oder einem Familienmitglied stammt, wird die Höhe der zu zahlenden Steuer nach der folgenden Tabelle bestimmt, die auch auf [dieser Website](https://www.vero.fi/en/individuals/property/gifts/gift-tax-calculator/) verfügbar ist:

| Wert der Schenkung | Steuer an der Untergrenze | Steuersatz für den übersteigenden Teil (%) |
|:---:|:---:|:---:|
| 5 000 — 25 000 | 100 | 8 |
| 25 000 — 55 000 | 1 700 | 10 |
| 55 000 — 200 000 | 4 700 | 12 |
| 200 000 — 1 000 000 | 22 100 | 15 |
| 1 000 000 — | 142 100 | 17 |

Bei einer Schenkung von 6.000 Euro zahlt der Empfänger also eine Steuer von 180 Euro (100 + (6.000 - 5.000) * 0,08). Entsprechend zahlt der Empfänger bei einer Schenkung von 75.000 Euro eine Steuer von 7.100 Euro (4.700 + (75.000 - 55.000) * 0,12).

Bitte schreiben Sie ein Programm, das den korrekten Steuerbetrag für eine Schenkung von einem nahen Verwandten berechnet. Sehen Sie sich die folgenden Beispiele an, um zu verstehen, was erwartet wird. Beachten Sie das Fehlen von Tausendertrennzeichen bei den Eingabewerten – Sie können davon ausgehen, dass die Zahlen in der Eingabe keine Leerzeichen oder andere Tausendertrennzeichen enthalten, da wir die Behandlung solcher Fälle noch nicht behandelt haben.

<sample-output>

Wert der Schenkung: **3500**
Keine Steuer!

</sample-output>

<sample-output>

Wert der Schenkung: **5000**
Steuerbetrag: 100.0 Euro

</sample-output>

<sample-output>

Wert der Schenkung: **27500**
Steuerbetrag: 1950.0 Euro

</sample-output>

</in-browser-programming-exercise>
