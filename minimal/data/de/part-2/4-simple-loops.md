---
path: '/part-2/4-simple-loops'
title: 'Einfache Schleifen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- wissen Sie, was eine Schleife in der Programmierung bedeutet
- sind Sie in der Lage, eine `while True`-Schleife in Ihren Programmen zu verwenden
- wissen Sie, wie Sie den Befehl `break` verwenden, um eine Schleife abzubrechen

</text-box>

Wir haben uns nun ausführlich mit bedingten Strukturen befasst. Eine weitere zentrale Technik in der Programmierung ist die Wiederholung oder _Iteration_. Zusammen bilden diese die grundlegenden Kontrollstrukturen, die jeder Programmierer beherrschen muss. Sie werden Kontrollstrukturen genannt, weil sie es Ihnen im Wesentlichen ermöglichen zu steuern, welche Codezeilen wann ausgeführt werden. Während bedingte Strukturen es Ihnen ermöglichen, _zwischen_ Codeabschnitten zu wählen, erlauben Iterationsstrukturen es Ihnen, Codeabschnitte zu _wiederholen_. Sie werden oft als _Schleifen_ (Loops) bezeichnet, da sie es dem Programm ermöglichen, zu einer Zeile "zurückzuspringen", die bereits zuvor ausgeführt wurde. Der Prozess der Ausführung einer Wiederholung einer Schleife wird auch als Iteration der Schleife bezeichnet.

Dieser Abschnitt führt eine einfache `while`-Schleife ein. Ihre Struktur ähnelt den bereits behandelten bedingten Anweisungen. Im nächsten Teil werden wir uns mit anspruchsvolleren Beispielen befassen.

Betrachten wir ein Programm, das den Benutzer auffordert, eine Zahl einzugeben, und dann das Quadrat der Zahl ausgibt. Dies wird so lange fortgesetzt, bis der Benutzer -1 eingibt.

```python
while True:
    zahl = int(input("Bitte geben Sie eine Zahl ein, -1 zum Beenden: "))

    if zahl == -1:
        break

    print(zahl ** 2)

print("Vielen Dank und auf Wiedersehen!")
```

Das Ausführen des Programms könnte wie folgt aussehen:

<sample-output>

Bitte geben Sie eine Zahl ein, -1 zum Beenden: **2**
4
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **4**
16
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **10**
100
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **-1**
Vielen Dank und auf Wiedersehen!

</sample-output>

Wie Sie oben sehen können, fragt das Programm dank der `while`-Anweisung nach mehreren Zahlen. Wenn der Benutzer -1 eingibt, wird der Befehl `break` ausgeführt, der die Schleife verlässt, und die Ausführung wird mit der ersten Zeile nach dem `while`-Block fortgesetzt.

Bei Schleifen ist es entscheidend, dass es immer eine Möglichkeit gibt, die Schleife an einem bestimmten Punkt im Code zu verlassen, da die Wiederholung sonst ewig weitergehen könnte. Um dies zu veranschaulichen, ändern wir das obige Beispiel ein wenig:

```python
zahl = int(input("Bitte geben Sie eine Zahl ein, -1 zum Beenden: "))
while True:
    if zahl == -1:
        break

    print(zahl ** 2)

print("Vielen Dank und auf Wiedersehen!")
```

In dieser Version bittet das Programm den Benutzer _außerhalb der Schleife_, eine Zahl einzugeben. Wenn der Benutzer eine andere Zahl als -1 eingibt, wird die Schleife niemals verlassen. Dies bildet eine _Endlosschleife_ (Infinite Loop), was bedeutet, dass der Codeblock innerhalb der Schleife endlos wiederholt wird:

<sample-output>

Bitte geben Sie eine Zahl ein, -1 zum Beenden: **2**
4
4
4
4
4
4
4
4
(ad infinitum fortgesetzt...)

</sample-output>

Das folgende Programm hat eine ähnliche Struktur wie das Beispiel vor der Endlosschleife, aber die Benutzererfahrung ist ganz anders. Dieses Programm erlaubt es dem Benutzer nur dann fortzufahren, wenn er die korrekte PIN _1234_ eingibt:

```python
while True:
    code = input("Bitte geben Sie Ihre PIN ein: ")
    if code == "1234":
        break
    print("Falsch... versuchen Sie es erneut")

print("Korrekte PIN eingegeben!")
```

<sample-output>

Bitte geben Sie Ihre PIN ein: **0000**
Falsch... versuchen Sie es erneut
Bitte geben Sie Ihre PIN ein: **9999**
Falsch... versuchen Sie es erneut
Bitte geben Sie Ihre PIN ein: **1234**
Korrekte PIN eingegeben!

</sample-output>

<in-browser-programming-exercise name="Sollen wir weitermachen?" tmcname="part02-15_shall_we_continue">

Erstellen wir ein Programm nach dem Vorbild des obigen Beispiels. Dieses Programm soll die Nachricht "hi" ausgeben und dann fragen "Sollen wir weitermachen?", bis der Benutzer "nein" eingibt. Dann soll das Programm "okay dann" ausgeben und beendet werden. Bitte sehen Sie sich das folgende Beispiel an.

<sample-output>

hi
Sollen wir weitermachen? **ja**
hi
Sollen wir weitermachen? **oui**
hi
Sollen we weitermachen? **jawohl**
hi
Sollen wir weitermachen? **nein**
okay dann

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Eingabevalidierung" tmcname="part02-16_input_validation">

Bitte schreiben Sie ein Programm, das den Benutzer nach Ganzzahlen fragt.

Wenn die Zahl kleiner als Null ist, soll das Programm die Nachricht "Ungültige Zahl" ausgeben.

Wenn die Zahl größer als Null ist, soll das Programm die Quadratwurzel der Zahl mithilfe der Python-Funktion `sqrt` ausgeben.

In beiden Fällen soll das Programm anschließend nach einer weiteren Zahl fragen.

Wenn der Benutzer die Zahl Null eingibt, soll das Programm aufhören, nach Zahlen zu fragen, und die Schleife verlassen.

Unten finden Sie eine Erinnerung daran, wie die Funktion `sqrt` verwendet wird. Denken Sie daran, sie am Anfang des Programms zu importieren (`import`).

```python
# Die Funktion sqrt funktioniert nicht ohne diese Zeile am Anfang des Programms
from math import sqrt

print(sqrt(9))
```

<sample-output>

3.0

</sample-output>

Ein Beispiel für das erwartete Verhalten Ihres Programms:

<sample-output>

Bitte geben Sie eine Zahl ein: **16**
4.0
Bitte geben Sie eine Zahl ein: **4**
2.0
Bitte geben Sie eine Zahl ein: **-3**
Ungültige Zahl
Bitte geben Sie eine Zahl ein: **1**
1.0
Bitte geben Sie eine Zahl ein: **0**
Beende...

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Code korrigieren: Countdown" tmcname="part02-17_countdown">

Dieses Programm soll einen Countdown ausgeben. Der Code lautet wie folgt:

```python
zahl = 5
print("Countdown!")
while True:
  print(zahl)
  zahl = zahl - 1
  if zahl > 0:
    break

print("Jetzt!")
```

Dies sollte Folgendes ausgeben:

<sample-output>

Countdown!
5
4
3
2
1
Jetzt!

</sample-output>

Das Programm funktioniert jedoch nicht ganz richtig. Bitte korrigieren Sie es.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Passwort wiederholen" tmcname="part02-18_repeat_password">

Bitte schreiben Sie ein Programm, das den Benutzer nach einem Passwort fragt. Das Programm soll den Benutzer dann auffordern, das Passwort erneut einzugeben. Wenn der Benutzer etwas anderes als das erste Passwort eingibt, soll das Programm so lange weiterfragen, bis der Benutzer das erste Passwort erneut korrekt eingibt.

Sehen Sie sich das erwartete Verhalten unten an:

<sample-output>

Passwort: **geheim**
Passwort wiederholen: **geheimnis**
Stimmen nicht überein!
Passwort wiederholen: **vergessen**
Stimmen nicht überein!
Passwort wiederholen: **geheim**
Benutzerkonto erstellt!

</sample-output>

</in-browser-programming-exercise>

## Schleifen und Hilfsvariablen

Machen wir das Beispiel mit der PIN-Prüfung etwas realistischer. Diese Version gibt dem Benutzer nur drei Versuche, eine PIN einzugeben.

Das Programm verwendet zwei Hilfsvariablen. Die Variable `versuche` verfolgt, wie oft der Benutzer eine PIN eingegeben hat. Die Variable `erfolg` wird entweder auf `True` oder `False` gesetzt, je nachdem, ob der Benutzer sich erfolgreich anmelden konnte.

```python
versuche = 0

while True:
    code = input("Bitte geben Sie Ihre PIN ein: ")
    versuche += 1

    if code == "1234":
        erfolg = True
        break

    if versuche == 3:
        erfolg = False
        break

    # Dies wird ausgegeben, wenn der Code falsch war UND weniger als drei Versuche unternommen wurden
    print("Falsch... versuchen Sie es erneut")

if erfolg:
    print("Korrekte PIN eingegeben!")
else:
    print("Zu viele Versuche...")
```

<sample-output>

Bitte geben Sie Ihre PIN ein: **0000**
Falsch... versuchen Sie es erneut
Bitte geben Sie Ihre PIN ein: **1234**
Korrekte PIN eingegeben!

</sample-output>

<sample-output>

Bitte geben Sie Ihre PIN ein: **0000**
Falsch... versuchen Sie es erneut
Bitte geben Sie Ihre PIN ein: **9999**
Falsch... versuchen Sie es erneut
Bitte geben Sie Ihre PIN ein: **4321**
Zu viele Versuche...

</sample-output>

Die Schleife wird verlassen, _entweder_ wenn der Benutzer die korrekte PIN eingibt _oder_ wenn zu viele Versuche unternommen wurden. Die `if`-Anweisung nach der Schleife prüft den Wert der Variablen `erfolg` und gibt entsprechend eine Nachricht aus.

## Debugging-Print-Anweisungen in Schleifen

Das Hinzufügen von Schleifen zu Programmen erhöht auch die potenziellen Fehlerquellen. Es wird umso wichtiger, die Verwendung von Debugging-Print-Anweisungen zu beherrschen, wie sie im [ersten Abschnitt dieses Teils](/part-2/1-programming-terminology) eingeführt wurden.

Betrachten wir ein Programm, das fast identisch mit dem vorherigen Beispiel ist, aber einen entscheidenden Unterschied aufweist:

```python
versuche = 0

while True:
    code = input("Bitte geben Sie Ihre PIN ein: ")
    versuche += 1

    if versuche == 3:
        erfolg = False
        break

    if code == "1234":
        erfolg = True
        break

    print("Falsch... versuchen Sie es erneut")

if erfolg:
    print("Korrekte PIN eingegeben!")
else:
    print("Zu viele Versuche...")
```

Diese Version verhält sich seltsam, wenn der Benutzer beim dritten Versuch den korrekten Code eingibt:

<sample-output>

Bitte geben Sie Ihre PIN ein: **0000**
Falsch... versuchen Sie es erneut
Bitte geben Sie Ihre PIN ein: **9999**
Falsch... versuchen Sie es erneut
Bitte geben Sie Ihre PIN ein: **1234**
Zu viele Versuche...

</sample-output>

Versuchen wir also, die Ursache zu finden, indem wir einige strategische Debugging-Print-Anweisungen innerhalb der Schleife hinzufügen:

```python
while True:
    print("Beginn des while-Blocks:")
    code = input("Bitte geben Sie Ihre PIN ein: ")
    versuche += 1

    print("Versuche:", versuche)
    print("Bedingung1:", versuche == 3)
    if versuche == 3:
        erfolg = False
        break

    print("Code:", code)
    print("Bedingung2:", code == "1234")
    if code == "1234":
        erfolg = True
        break

    print("Falsch... versuchen Sie es erneut")
```

<sample-output>

Beginn des while-Blocks:
Bitte geben Sie Ihre PIN ein: **2233**
Versuche: 1
Bedingung1: False
Code: 2233
Bedingung2: False
Falsch... versuchen Sie es erneut
Beginn des while-Blocks:
Bitte geben Sie Ihre PIN ein: **4545**
Versuche: 2
Bedingung1: False
Code: 4545
Bedingung2: False
Falsch... versuchen Sie es erneut
Beginn des while-Blocks:
Bitte geben Sie Ihre PIN ein: **1234**
Versuche: 3
Bedingung1: True
Zu viele Versuche...

</sample-output>

Aus den obigen Ausgaben können wir ersehen, dass während der dritten Iteration der Schleife die Bedingung der ersten `if`-Anweisung `True` ist und die Schleife verlassen wird. Diese Iteration erreicht niemals die zweite `if`-Anweisung, die prüft, ob der Code korrekt eingegeben wurde:

```python
  while True:
    # ....

    # Dieser Block wird zu früh ausgeführt
    if versuche == 3:
        erfolg = False
        break

    # Die dritte Iteration kommt nie so weit
    if code == "1234":
        erfolg = True
        break
```

Die Reihenfolge von bedingten Anweisungen oder von verschiedenen Verzweigungen innerhalb einer bedingten Anweisung ist eine häufige Ursache für Bugs, insbesondere in Schleifen. Debugging-Print-Anweisungen sind oft der einfachste Weg, um deren Ursache zu finden.

<in-browser-programming-exercise name="PIN und Anzahl der Versuche" tmcname="part02-19_pin_and_number_of_attempts">

Bitte schreiben Sie ein Programm, das den Benutzer so lange nach einem PIN-Code fragt, bis er den korrekten Code eingegeben hat, welcher _4321_ lautet. Das Programm soll dann die Anzahl der Versuche ausgeben, die der Benutzer unternommen hat.

<sample-output>

PIN: **3245**
Falsch
PIN: **1234**
Falsch
PIN: **0000**
Falsch
PIN: **4321**
Richtig! Sie haben 4 Versuche benötigt.

</sample-output>

Wenn der Benutzer den Code bereits beim ersten Versuch richtig eingibt, soll das Programm etwas anders ausgeben:

<sample-output>

PIN: **4321**
Richtig! Sie haben nur einen einzigen Versuch benötigt!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Das nächste Schaltjahr" tmcname="part02-20_next_leap_year">

Bitte schreiben Sie ein Programm, das den Benutzer nach einem Jahr fragt und das nächste Schaltjahr ausgibt.

<sample-output>

Jahr: **2023**
Das nächste Schaltjahr nach 2023 ist 2024.

</sample-output>

Wenn der Benutzer ein Jahr eingibt, das bereits ein Schaltjahr ist (wie 2024), soll das Programm das darauf folgende Schaltjahr ausgeben:

<sample-output>

Jahr: **2024**
Das nächste Schaltjahr nach 2024 ist 2028.

</sample-output>

</in-browser-programming-exercise>

## Verketten von Zeichenketten mit dem +-Operator

Das obige Beispiel mit der PIN-Prüfung verwendete eine Hilfsvariable `versuche`, um zu verfolgen, wie oft der Benutzer versucht hat, einen Code einzugeben:

```python
versuche = 0

while True:
    code = input("Bitte geben Sie Ihre PIN ein: ")
    versuche += 1
    # ...
```

Die Variable wird außerhalb der Schleife auf Null gesetzt, und jede Iteration erhöht ihren Wert um eins.

Eine ähnliche Idee der Inkrementierung funktioniert auch mit String-Variablen. Das Programm könnte beispielsweise alle vom Benutzer eingegebenen PIN-Codes mitverfolgen:

```python
codes = ""
versuche = 0

while True:
    code = input("Bitte geben Sie Ihre PIN ein: ")
    versuche += 1
    codes += code + ", "
    # ...
```

Die Hilfsvariable wird mit _einer leeren Zeichenkette_ initialisiert, also einer Zeichenkette ohne Zeichen:

```python
codes = ""
```

Mit jeder Iteration wird die Zeichenkette länger, da der vom Benutzer eingegebene Code zusammen mit einem Komma hinzugefügt wird:

```python
    code = input("Bitte geben Sie Ihre PIN ein: ")
    codes += code + ", "
```

Wenn der Benutzer die Codes _1111 2222 1234_ eingibt, wäre der Wert von `codes` am Ende der Programmausführung:

<sample-output>

1111, 2222, 1234,

</sample-output>

<in-browser-programming-exercise name="Geschichte" tmcname="part02-21_story">

### Teil 1

Bitte schreiben Sie ein Programm, das den Benutzer fortlaufend nach Wörtern fragt. Wenn der Benutzer `ende` eingibt, soll das Programm die aus den Wörtern gebildete Geschichte ausgeben und beendet werden.

<sample-output>

Bitte geben Sie ein Wort ein: **Es**
Bitte geben Sie ein Wort ein: **war**
Bitte geben Sie ein Wort ein: **einmal**
Bitte geben Sie ein Wort ein: **ein**
Bitte geben Sie ein Wort ein: **Mädchen**
Bitte geben Sie ein Wort ein: **ende**
Es war einmal ein Mädchen

</sample-output>

### Teil 2

Ändern wir das Programm so, dass die Schleife auch dann endet, wenn der Benutzer zweimal hintereinander dasselbe Wort eingibt.

<sample-output>

Bitte geben Sie ein Wort ein: **Es**
Bitte geben Sie ein Wort ein: **war**
Bitte geben Sie ein Wort ein: **eine**
Bitte geben Sie ein Wort ein: **dunkle**
Bitte geben Sie ein Wort ein: **und**
Bitte geben Sie ein Wort ein: **stürmische**
Bitte geben Sie ein Wort ein: **Nacht**
Bitte geben Sie ein Wort ein: **Nacht**
Es war eine dunkle und stürmische Nacht

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Arbeiten mit Zahlen" tmcname="part02-22_working_with_numbers">

### Voraufgabe

Bitte schreiben Sie ein Programm, das den Benutzer nach Ganzzahlen fragt. Das Programm soll so lange nach Zahlen fragen, bis der Benutzer Null eingibt.

<sample-output>

Bitte geben Sie Ganzzahlen ein. Geben Sie 0 zum Beenden ein.
Zahl: **5**
Zahl: **22**
Zahl: **9**
Zahl: **-2**
Zahl: **0**

</sample-output>

### Teil 1: Anzahl

Nach dem Einlesen der Zahlen soll das Programm ausgeben, wie viele Zahlen eingegeben wurden. Die Null am Ende soll nicht mitgezählt werden.

Sie benötigen hier eine neue Variable, um die Anzahl der eingegebenen Zahlen zu verfolgen.

<sample-output>

... das Programm fragt nach Zahlen
Eingegebene Zahlen: 4

</sample-output>

### Teil 2: Summe

Das Programm soll auch die Summe aller eingegebenen Zahlen ausgeben. Die Null am Ende soll nicht in die Berechnung einbezogen werden.

Das Programm soll nun Folgendes ausgeben:

<sample-output>

... das Programm fragt nach Zahlen
Eingegebene Zahlen: 4
Die Summe der Zahlen ist 34

</sample-output>

### Teil 3: Mittelwert

Das Programm soll auch den Mittelwert (Durchschnitt) der Zahlen ausgeben. Die Null am Ende soll nicht in die Berechnung einbezogen werden. Sie können davon ausgehen, dass der Benutzer immer mindestens eine gültige Zahl ungleich Null eingibt.

<sample-output>

... das Programm fragt nach Zahlen
Eingegebene Zahlen: 4
Die Summe der Zahlen ist 34
Der Mittelwert der Zahlen ist 8.5

</sample-output>

#### Teil 4: Positive und negative Zahlen

Das Programm soll auch eine Statistik darüber ausgeben, wie viele der Zahlen positiv und wie viele negativ waren. Die Null am Ende soll nicht in die Berechnung einbezogen werden.

<sample-output>

... das Programm fragt nach Zahlen
Eingegebene Zahlen: 4
Die Summe der Zahlen ist 34
Der Mittelwert der Zahlen ist 8.5
Positive Zahlen: 3
Negative Zahlen: 1

</sample-output>

</in-browser-programming-exercise>
