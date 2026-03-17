---
path: "/part-1/4-arithmetic-operations"
title: "Arithmetische Operationen"
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie in der Lage sein, Variablen in verschiedenen arithmetischen Operationen zu verwenden
- werden Sie wissen, wie man mit Zahlen in Benutzereingaben umgeht
- werden Sie wissen, wie man Werte in andere grundlegende Datentypen umwandelt (Casting)

</text-box>

In den vorangegangenen Abschnitten haben Sie Beispiele für grundlegende Arithmetik gesehen. In der folgenden Tabelle sehen Sie die gängigsten arithmetischen Operatoren in Python mit Beispielen:

| Operator      | Zweck          | Beispiel     | Ergebnis |
|:-------------:|----------------|--------------|-------|
| `+`           | Addition       | `2 + 4`      |`6`    |
| `-`           | Subtraktion    | `10 - 2.5`   |`7.5`  |
| `*`           | Multiplikation | `-2 * 123`  |`-246` |
| `/`           | Division (Fließkomma-Ergebnis) | `9 / 2`     | `4.5` |
| `//`          | Division (Ganzzahl-Ergebnis)              | `9 // 2`    | `4`   |
| `%`           | Modulo         | `9 % 2`      |`1`    |
| `**`          | Potenzierung   | `2 ** 3`    |`8`    |

Die Reihenfolge der Operationen ist aus der Mathematik bekannt: Zuerst werden die Potenzen berechnet, dann Multiplikation und Division und schließlich Addition und Subtraktion. Die Reihenfolge kann mit Klammern geändert werden.

Dieses Stück Code zum Beispiel:

```python
print(2 + 3 * 3)
print((2 + 3) * 3)
```

gibt Folgendes aus:

<sample-output>

11
15

</sample-output>

## Operanden, Operatoren und Datentypen

Eine Berechnung besteht normalerweise aus *Operanden* und *Operatoren*:

<img src="1_4_1.png">

Der Datentyp eines Operanden bestimmt in der Regel den Datentyp des Ergebnisses: Wenn zwei Ganzzahlen addiert werden, ist das Ergebnis ebenfalls eine Ganzzahl. Wenn eine Fließkommazahl von einer anderen Fließkommazahl subtrahiert wird, ist das Ergebnis eine Fließkommazahl. Tatsächlich ist das Ergebnis auch dann eine Fließkommazahl, wenn nur ein einziger Operand in einem Ausdruck eine Fließkommazahl ist, unabhängig von den anderen Operanden.

Die Division `/` ist eine Ausnahme von dieser Regel. Ihr Ergebnis ist eine Fließkommazahl, auch wenn die Operanden Ganzzahlen sind. Zum Beispiel ergibt `1 / 5` die Fließkommazahl `0.2`.

Beispiel:

```python
height = 172.5
weight = 68.55

# der Body-Mass-Index (BMI) wird berechnet, indem die Körpermasse durch das Quadrat der Körpergröße geteilt wird
# die Körpergröße wird in der Formel in Meter umgerechnet
bmi = weight / (height / 100) ** 2

print(f"Der BMI ist {bmi}")
```

Dieses Programm gibt Folgendes aus:

<sample-output>

Der BMI ist 23.037177063642087

</sample-output>

Beachten Sie, dass Python auch einen Ganzzahl-Divisionsoperator `//` hat. Wenn die Operanden Ganzzahlen sind, wird eine Ganzzahl erzeugt. Das Ergebnis wird auf die nächste Ganzzahl abgerundet. Dieses Programm zum Beispiel:

```python
x = 3
y = 2

print(f"/ Operator {x/y}")
print(f"// Operator {x//y}")
```

gibt Folgendes aus:

<sample-output>

/ Operator 1.5
// Operator 1

</sample-output>

## Zahlen als Eingabe

Wir haben bereits den Befehl `input` verwendet, um Strings vom Benutzer einzulesen. Dieselbe Funktion kann verwendet werden, um Zahlen einzulesen, aber der von der Funktion erzeugte String muss dann im Programmcode in einen numerischen Datentyp umgewandelt werden. Im vorigen Abschnitt haben wir Ganzzahlen mit der Funktion `str` in Strings umgewandelt. Das gleiche Grundprinzip gilt hier, aber der Name der Umwandlungsfunktion ist anders.

Ein String kann mit der Funktion `int` in eine Ganzzahl umgewandelt werden. Das folgende Programm fragt den Benutzer nach seinem Geburtsjahr und speichert es in der Variable `input_str`. Das Programm erstellt dann eine weitere Variable `year`, die das in eine Ganzzahl umgewandelte Jahr enthält. Danach ist die Berechnung `2021-year` unter Verwendung des vom Benutzer angegebenen Wertes möglich.

```python
input_str = input("In welchem Jahr wurden Sie geboren? ")
year = int(input_str)
print(f"Ihr Alter am Ende des Jahres 2021: {2021 - year}" )
```
<sample-output>

In welchem Jahr wurden Sie geboren? **1995**
Ihr Alter am Ende des Jahres 2021: 26

</sample-output>

Normalerweise müssen Sie nicht zwei separate Variablen (wie `input_str` und `year` oben) erstellen, um einen Zahlenwert vom Benutzer einzulesen. Stattdessen kann das Einlesen der Eingabe mit der Funktion `input` und das Umwandeln mit der Funktion `int` in einem Rutsch erledigt werden:

```python
year = int(input("In welchem Jahr wurden Sie geboren? "))
print(f"Ihr Alter am Ende des Jahres 2021: {2021 - year}" )
```

Ebenso kann ein String mit der Funktion `float` in eine Fließkommazahl umgewandelt werden. Dieses Programm fragt den Benutzer nach seiner Größe und seinem Gewicht und verwendet diese, um seinen BMI zu berechnen:

```python
height = float(input("Wie groß sind Sie? "))
weight = float(input("Wie viel wiegen Sie? "))

height = height / 100
bmi = weight / height ** 2

print(f"Der BMI ist {bmi}")
```

Eine beispielhafte Ausgabe des Programms:

<sample-output>

Wie groß sind Sie? **163**
Wie viel wiegen Sie? **74.45**
Der BMI ist 28.02137829801649

</sample-output>

<in-browser-programming-exercise name="Mal fünf" tmcname="part01-13_times_five">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Zahl fragt. Das Programm gibt dann die mit fünf multiplizierte Zahl aus.

Das Programm sollte wie folgt funktionieren:

<sample-output>

Bitte geben Sie eine Zahl ein: **3**
3 mal 5 ist 15

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Name und Alter" tmcname="part01-14_name_and_age">

Bitte schreiben Sie ein Programm, das den Benutzer nach seinem Namen und seinem Geburtsjahr fragt. Das Programm gibt dann eine Nachricht wie folgt aus:

<sample-output>

Wie ist Ihr Name? **Frances Fictitious**
In welchem Jahr wurden Sie geboren? **1990**
Hallo Frances Fictitious, Sie werden am Ende des Jahres 2021 31 Jahre alt sein

</sample-output>

</in-browser-programming-exercise>

## Verwendung von Variablen

Schauen wir uns ein Programm an, das die Summe von drei vom Benutzer eingegebenen Zahlen berechnet:

```python
number1 = int(input("Erste Zahl: "))
number2 = int(input("Zweite Zahl: "))
number3 = int(input("Dritte Zahl: "))

sum = number1 + number2 + number3
print(f"Die Summe der Zahlen: {sum}")
```

Eine beispielhafte Ausführung des Programms:

<sample-output>

Erste Zahl: **5**
Zweite Zahl: **21**
Dritte Zahl: **7**
Die Summe der Zahlen: 33

</sample-output>

Das Programm verwendet vier verschiedene Variablen, aber zwei würden in diesem Fall leicht ausreichen:

```python
sum = 0

number = int(input("Erste Zahl: "))
sum = sum + number

number = int(input("Zweite Zahl: "))
sum = sum + number

number = int(input("Dritte Zahl: "))
sum = sum + number

print(f"Die Summe der Zahlen: {sum}")
```

Jetzt werden alle Eingaben des Benutzers in ein und dieselbe Variable `number` eingelesen. Der Wert der Variable `sum` wird jedes Mal, wenn der Benutzer eine neue Zahl eingibt, um den Wert der Variable `number` _erhöht_.

Schauen wir uns diesen Befehl genauer an:

```python
sum = sum + number
```

Hier werden der Wert der Variable `sum` und der Wert der Variable `number` addiert und das Ergebnis wird wieder in der Variable `sum` gespeichert. Wenn zum Beispiel vor dem Befehl der Wert von `sum` 3 und der Wert von `number` 2 ist, beträgt der Wert von `sum` nach der Ausführung des Befehls 5.

Das Erhöhen des Wertes einer Variable ist eine sehr häufige Operation. Daher gibt es eine häufig verwendete Kurzschreibweise, die das gleiche Ergebnis wie das explizite Aufsummieren oben erzielt:

```python
sum += number
```

Dies erlaubt uns, das obige Programm etwas prägnanter zu schreiben:

```python
sum = 0

number = int(input("Erste Zahl: "))
sum += number

number = int(input("Zweite Zahl: "))
sum += number

number = int(input("Dritte Zahl: "))
sum += number

print(f"Die Summe der Zahlen: {sum}")
```

Tatsächlich brauchen wir die Variable `number` gar nicht unbedingt. Die Eingaben des Benutzers können auch so verarbeitet werden:

```python
sum = 0

sum += int(input("Erste Zahl: "))
sum += int(input("Zweite Zahl: "))
sum += int(input("Dritte Zahl: "))

print(f"Die Summe der Zahlen: {sum}")
```

Natürlich hängt es vom Kontext ab, wie viele Variablen benötigt werden. Wenn es erforderlich ist, sich an jeden vom Benutzer eingegebenen Wert zu erinnern, wird es nicht möglich sein, dieselbe Variable "wiederzuverwenden", um verschiedene Werte vom Benutzer einzulesen. Betrachten Sie Folgendes:

```python
number1 = int(input("Erste Zahl: "))
number2 = int(input("Zweite Zahl: "))

print(f"{number1} + {number2} = {number1+number2}")
```

<sample-output>

Erste Zahl: **2**
Zweite Zahl: **3**
2 + 3 = 5

</sample-output>

Andererseits hat das obige Programm keine benannte Variable zum Speichern der Summe der beiden Werte.

Das "Wiederverwenden" einer Variable ist nur dann sinnvoll, wenn Dinge eines ähnlichen Typs und Zwecks vorübergehend gespeichert werden müssen, zum Beispiel beim Summieren von Zahlen.

Im folgenden Beispiel wird die Variable `data` verwendet, um zuerst den Namen des Benutzers und dann sein Alter zu speichern. Das ist überhaupt nicht sinnvoll.

```python
data = input("Wie ist Ihr Name? ")
print("Hallo " + data + "!")

data = int(input("Wie alt sind Sie? "))
# Programm wird fortgesetzt...
```

Eine bessere Idee ist es, separate Variablen mit _beschreibenden_ Namen zu verwenden:

```python
name = input("Wie ist Ihr Name? ")
print("Hallo " + name + "!")

age = int(input("Wie alt sind Sie? "))
# Programm wird fortgesetzt...
```

<in-browser-programming-exercise name="Sekunden an einem Tag" tmcname="part01-15_seconds_in_a_day">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Anzahl von Tagen fragt. Das Programm gibt dann die Anzahl der Sekunden in der angegebenen Anzahl von Tagen aus.

Das Programm sollte wie folgt funktionieren:

<sample-output>

Wie viele Tage? **1**
Sekunden in so vielen Tagen: 86400

</sample-output>

Ein weiteres Beispiel:

<sample-output>

Wie viele Tage? **7**
Sekunden in so vielen Tagen: 604800

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Code korrigieren: Produkt" tmcname="part01-16_product">

Dieses Programm fragt den Benutzer nach drei Zahlen. Das Programm gibt dann ihr Produkt aus, also die miteinander multiplizierten Zahlen. Es stimmt jedoch etwas nicht mit dem Programm - es funktioniert nicht ganz richtig, wie Sie sehen können, wenn Sie es ausführen. Bitte korrigieren Sie es.

Ein Beispiel für die erwartete Ausführung des Programms:

<sample-output>

Bitte geben Sie die erste Zahl ein: **2**
Bitte geben Sie die zweite Zahl ein: **3**
Bitte geben Sie die dritte Zahl ein: **5**
Das Produkt ist 30

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Summe und Produkt" tmcname="part01-17_sum_and_product">

Bitte schreiben Sie ein Programm, das den Benutzer nach zwei Zahlen fragt. Das Programm gibt dann die Summe und das Produkt der beiden Zahlen aus.

Das Programm sollte wie folgt funktionieren:

<sample-output>

Zahl 1: **3**
Zahl 2: **7**
Die Summe der Zahlen: 10
Das Produkt der Zahlen: 21

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Summe und Mittelwert" tmcname="part01-18_sum_and_mean">

Bitte schreiben Sie ein Programm, das den Benutzer nach vier Zahlen fragt. Das Programm gibt dann die Summe und den Mittelwert der Zahlen aus.

Das Programm sollte wie folgt funktionieren:

<sample-output>

Zahl 1: **2**
Zahl 2: **1**
Zahl 3: **6**
Zahl 4: **7**
Die Summe der Zahlen ist 16 und der Mittelwert ist 4.0

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Lebensmittelausgaben" tmcname="part01-19_food_expenditure">

Bitte schreiben Sie ein Programm, das die typischen Lebensmittelausgaben eines Benutzers schätzt.

Das Programm fragt den Benutzer, wie oft pro Woche er in der studentischen Cafeteria isst. Dann fragt es nach dem Preis für ein typisches studentisches Mittagessen und nach dem Geld, das während der Woche für Lebensmittel ausgegeben wurde.

Basierend auf diesen Informationen berechnet das Programm die typischen Lebensmittelausgaben des Benutzers sowohl wöchentlich als auch täglich.

Das Programm sollte wie folgt funktionieren:

<sample-output>

Wie oft pro Woche essen Sie in der studentischen Cafeteria? **4**
Der Preis für ein typisches studentisches Mittagessen? **2.5**
Wie viel Geld geben Sie in einer Woche für Lebensmittel aus? **28.5**

Durchschnittliche Lebensmittelausgaben:
Täglich: 5.5 Euro
Wöchentlich: 38.5 Euro

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Studenten in Gruppen" tmcname="part01-20_students_in_groups">

Bitte schreiben Sie ein Programm, das nach der Anzahl der Studenten in einem Kurs und der gewünschten Gruppengröße fragt. Das Programm gibt dann die Anzahl der Gruppen aus, die aus den Studenten des Kurses gebildet werden. Wenn die Aufteilung nicht gleichmäßig ist, kann eine der Gruppen weniger Mitglieder haben als angegeben.

Wenn Sie Ihren Code nicht wie erwartet zum Laufen bringen, ist es absolut in Ordnung, fortzufahren und später zu dieser Übung zurückzukehren. Das Thema des nächsten Abschnitts sind [bedingte Anweisungen](/part-1/5-conditional-statements). Diese Übung kann auch mit einer bedingten Konstruktion gelöst werden.

<sample-output>

Wie viele Studenten sind im Kurs? **8**
Gewünschte Gruppengröße? **4**
Anzahl der gebildeten Gruppen: 2

</sample-output>

<sample-output>

Wie viele Studenten sind im Kurs? **11**
Gewünschte Gruppengröße? **3**
Anzahl der gebildeten Gruppen: 4

</sample-output>

Hinweis: Der Ganzzahl-Divisionsoperator `//` könnte hier nützlich sein.

</in-browser-programming-exercise>
