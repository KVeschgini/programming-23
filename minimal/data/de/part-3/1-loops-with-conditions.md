---
path: '/part-3/1-loops-with-conditions'
title: 'Schleifen mit Bedingungen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man eine `while`-Schleife mit einer Bedingung erstellt
- werden Sie verstehen, welche Rollen Initialisierung, Formulierung einer Bedingung und Aktualisierung von Variablen in einer Schleife spielen
- werden Sie in der Lage sein, Schleifen mit verschiedenen Arten von Bedingungen zu erstellen

</text-box>

<!--the same text is in sections 3-1, 5-1 and 6-1, check them all if you're changing this-->
<text-box variant='hint' name="Über die Übungen in diesem Kurs">

Um ein versierter Programmierer zu werden, ist viel Übung erforderlich, manchmal sogar recht mechanische Übung. Es geht auch darum, Problemlösungsfähigkeiten zu entwickeln und Intuition anzuwenden. Aus diesem Grund gibt es in diesem Kurs viele Übungen unterschiedlicher Art. Einige von ihnen verlangen von Ihnen, das im Material Gelernte recht direkt anzuwenden, aber einige sind absichtlich herausfordernder und offener gestaltet.

Einige der Übungen mögen auf den ersten Blick überwältigend erscheinen, aber das ist kein Grund zur Sorge. Keine der Übungen ist strikt obligatorisch, und tatsächlich _benötigen Sie nur 25 % der Punkte aus jedem Teil, um den Kurs zu bestehen._ Weitere Details zum Bestehen des Kurses finden Sie auf der [Seite über Benotung](/grading-and-exams).

**Die Übungen sind nicht in einer bestimmten Reihenfolge des Schwierigkeitsgrads angeordnet.** Jeder Abschnitt führt in der Regel einige neue Programmierkonzepte ein, die dann sowohl mit einfacheren als auch mit komplizierteren Übungen geübt werden. **Wenn Sie auf eine Übung stoßen, die sich als zu schwierig anfühlt, gehen Sie zur nächsten über.** Sie können jederzeit zu den schwierigeren Übungen zurückkehren, wenn Sie später Zeit haben.

Wenn es unweigerlich schwierig wird, ein Wort des Trostes: Eine Aufgabe, die diese Woche unmöglich erscheint, wird sich in etwa vier Wochen wahrscheinlich ziemlich einfach anfühlen.

</text-box>

Im vorherigen Abschnitt haben wir gelernt, die `while True`-Schleife zu verwenden, um Codeabschnitte zu wiederholen. In dieser Konstruktion ist die Bedingung der Schleife `True`, sodass die Bedingung jedes Mal erfüllt ist. Wir mussten die Schleife jedes Mal explizit mit `break` verlassen, um eine Endlosschleife zu vermeiden. Zum Beispiel:

```python
# Zahlen ausgeben, bis die Variable a gleich 5 ist
a = 1
while True:
    print(a)
    a += 1
    if a == 5:
        break
```

<sample-output>

1
2
3
4

</sample-output>

Natürlich muss die Bedingung nicht immer `True` sein, sondern es kann jeder boolesche Ausdruck als Bedingung verwendet werden. Die allgemeine Struktur der `while`-Anweisung ist wie folgt:

```python
while <Bedingung>:
    <Block>
```

Die Idee dabei ist, dass die Ausführung hin und her geht, prüft, ob die Bedingung wahr ist, und den Code innerhalb des Blocks immer wieder ausführt. Wenn die Bedingung zu irgendeinem Zeitpunkt falsch ist, wird die Ausführung des Programms ab der Zeile nach dem `while`-Block fortgesetzt.

<img src="3_1_1.png">

In der folgenden Schleife haben wir die Bedingung `number < 10`. Der Block innerhalb der Schleife wird nur ausgeführt, wenn die Variable `number` kleiner als 10 ist.

```python
number = int(input("Bitte geben Sie eine Zahl ein: "))

while number < 10:
    print(number)
    number += 1

print("Ausführung beendet.")
```

Dies könnte Folgendes ausgeben:

<sample-output>

Bitte geben Sie eine Zahl ein: **4**
4
5
6
7
8
9
Ausführung beendet.

</sample-output>

In dieser Struktur wird die Bedingung immer geprüft, bevor der Block innerhalb der Schleife ausgeführt wird. Es kann vorkommen, dass der Block nie ausgeführt wird, wie hier:

<sample-output>

Bitte geben Sie eine Zahl ein: **12**
Ausführung beendet.

</sample-output>

12 ist nicht kleiner als 10, daher gibt das Programm keine einzige Zahl aus.

## Initialisierung, Bedingung und Aktualisierung

Um eine Schleife zu erstellen, müssen Sie oft drei verschiedene Schritte einbeziehen: Initialisierung, Bedingung und Aktualisierung der Iterationsvariablen.

_Initialisierung_ bezieht sich auf das Festlegen der Anfangswerte der Variablen, die in der Bedingung der Schleife verwendet werden. Diese werden oft als Iterations- oder Iteratorvariablen bezeichnet. Dies geschieht, bevor die Schleife zum ersten Mal betreten wird. Die _Bedingung_ definiert, wie lange die Schleife ausgeführt werden soll. Sie wird ganz am Anfang der Schleife festgelegt. Schließlich werden innerhalb jeder Wiederholung der Schleife die an der Bedingung beteiligten Variablen _aktualisiert_, sodass jede Iteration die Schleife einen Schritt näher an ihren Abschluss bringt. Das folgende Bild veranschaulicht diese Schritte:

<!--- this is here in case the following image needs to be updated
```python
# Den Benutzer nach einer Zahl fragen
number = int(input("Bitte geben Sie eine Zahl ein: "))

# Wiederholen, solange die Zahl kleiner als 10 ist
while number < 10:

    # Ausgeben und erhöhen
    print(number)
    number += 1

print("Ausführung beendet.")
```
-->
<img src="3_1_2.png">

Wenn eine dieser drei Komponenten fehlt, wird die Schleife wahrscheinlich nicht korrekt funktionieren. Ein typischer Fehler ist das Auslassen des Aktualisierungsschritts:

```python
number = 1

while number < 10:
    print(number)

print("Ausführung beendet.")
```

Hier ändert sich der Wert der Variable `number` nie. Das Programm steckt in einer Endlosschleife fest, und genau derselbe Codeabschnitt wird immer wieder wiederholt, bis der Benutzer die Ausführung stoppt, zum Beispiel durch Drücken von `Control` + `C`:

<sample-output>

1
1
1
1
1
(fortgesetzt ad infinitum...)

</sample-output>

<in-browser-programming-exercise name="Zahlen ausgeben" tmcname="part03-01_print_numbers">

Bitte schreiben Sie ein Programm, das mithilfe einer Schleife alle geraden Zahlen zwischen zwei und dreißig ausgibt. Geben Sie jede Zahl in einer separaten Zeile aus.

Der Anfang Ihrer Ausgabe sollte so aussehen:

<sample-output>
2
4
6
8
etc...
</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Code korrigieren: Countdown" tmcname="part03-02_countdown">

Das folgende Programm weist einige syntaktische Probleme auf:

```python
print("Sind Sie bereit?")
number = int(input("Bitte geben Sie eine Zahl ein: "))
while number = 0:
print(number)
print("Jetzt!")
```

Bitte korrigieren Sie es so, dass es Folgendes ausgibt:

<sample-output>

Sind Sie bereit?
Bitte geben Sie eine Zahl ein: **5**
5
4
3
2
1
Jetzt!

</sample-output>

Diese Übung ähnelt der Countdown-Übung im letzten Abschnitt, aber bitte verwenden Sie diesmal keine `while True`-Schleife!


</in-browser-programming-exercise>

## Bedingungen schreiben

Jeder boolesche Ausdruck oder jede Kombination davon ist eine gültige Bedingung in einer Schleife. Zum Beispiel gibt das folgende Programm jede dritte Zahl aus, aber nur solange die Zahl kleiner als 100 und nicht durch 5 teilbar ist:

```python
number = int(input("Bitte geben Sie eine Zahl ein: "))

while number < 100 and number % 5 != 0:
    print(number)
    number += 3
```

Zwei Beispiele für die Ausführung des Programms mit unterschiedlichen Eingaben:

<sample-output>

Bitte geben Sie eine Zahl ein: **28**
28
31
34
37

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **96**
96
99

</sample-output>

Wenn die Eingabe 28 ist, endet die Schleife mit der Zahl 37, da die nächste Zahl 40 ist, die durch 5 teilbar ist. Wenn die Eingabe 96 ist, endet die Schleife mit der Zahl 99, da die nächste Zahl 102 ist, die nicht kleiner als 100 ist.

Wann immer Sie eine Schleife schreiben, sollten Sie sicherstellen, dass die Ausführung der Schleife zu einem bestimmten Zeitpunkt immer endet. Das folgende Programm endet entweder oder nicht, abhängig von der Eingabe:

```python
number = int(input("Bitte geben Sie eine Zahl ein: "))

while number != 10:
    print(number)
    number += 2
```

Wenn die Eingabe eine gerade Zahl ist und 10 oder weniger beträgt, wird die Schleife beendet:

<sample-output>

Bitte geben Sie eine Zahl ein: **4**
4
6
8

</sample-output>

In jedem anderen Fall wird die Schleife endlos ausgeführt, da es keine Möglichkeit gibt, dass die Variable jemals gleich 10 wird. Zum Beispiel sind 3 oder 12 Eingaben, die in einer Endlosschleife enden würden.

<in-browser-programming-exercise name="Zahlen" tmcname="part03-03_numbers">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Zahl fragt. Das Programm gibt dann alle ganzzahligen Zahlen aus, die größer als Null, aber kleiner als die Eingabe sind.

<sample-output>

Obergrenze: **5**
1
2
3
4

</sample-output>

Bitte verwenden Sie in dieser Übung nicht den Wert `True` als Bedingung Ihrer `while`-Schleife!

</in-browser-programming-exercise>

## Tipps zum Debuggen

Stellen Sie sich vor, Sie schreiben ein etwas komplizierteres Programm, wie das in der nächsten Übung, _Zweierpotenzen_. Die ersten Versuche könnten so aussehen:

```python
limit = int(input("Obergrenze:"))
number = 1
while number == limit:
   # weiterer Code
```

Hier beginnt das Programm mit dem Einlesen der Eingabe und fährt mit dem Entwurf der Schleife und einem Versuch einer Bedingung fort.

Es ist wahrscheinlich, dass der Code beim ersten Versuch nicht wie gewünscht funktioniert. Er muss möglicherweise dutzende oder sogar hunderte Male getestet werden, bevor er korrekt funktioniert.

Dieser Codeabschnitt fragt immer nach einer Eingabe vom Benutzer, was das Testen langsam und mühsam macht. Jedes Mal, wenn das Programm getestet wird, muss eine Eingabe eingetippt werden.

Eine Möglichkeit, dies zu umgehen, ist das "Hardcoding" der Eingabe während des Testens:

```python
# Lassen Sie uns den Eingabewert zum Testen hardcoden
limit = 8 # int(input("Obergrenze"))
number = 1
while number == limit:
   # weiterer Code 
```
Wenn das Programm mit der einen hardcodierten Eingabe funktioniert, ist es einfach, es auch mit anderen hardcodierten Eingaben zu testen. Wenn es rundum korrekt zu funktionieren scheint, kann es mit der Eingabe vom Benutzer getestet werden.

Dieser Trick funktioniert bei vielen der Tests, mit denen die Übungen in diesem Kurs bewertet werden. Wenn der Test Ihnen sagt, dass das Programm falsch funktioniert, wenn die Eingabe beispielsweise 42 ist, kann diese Eingabe in das Programm hardcodiert werden, während Sie nach der Ursache des Fehlers suchen:

```python
# Der Test sagte, das Programm funktioniert falsch, wenn die Eingabe 42 ist
limit = 42 # int(input("Obergrenze"))
number = 1
while number == limit:
   # weiterer Code
```

Das Debuggen mit Print-Anweisungen wurde im [vorherigen Teil](/part-2) des Kurses einige Male erwähnt. Die Programme, die Sie schreiben sollen, werden im Laufe des Kurses immer komplexer. Der Umfang des Debuggings, den Sie durchführen müssen, wird wahrscheinlich entsprechend zunehmen. Häufige Ursachen für Fehler liegen in den Bedingungen, die Schleifen beenden; sie können für einige Eingaben korrekt funktionieren und für andere fehlschlagen, und es ist nicht immer offensichtlich, warum das so ist.

Deshalb ist es höchste Zeit, dass Sie das Debuggen mit Print-Anweisungen in Ihre Programmierpraktiken aufnehmen, falls Sie dies noch nicht getan haben. Debugging-Anweisungen finden Sie im [ersten](/part-2/1-programming-terminology) und [vierten](/part-2/4-simple-loops) Abschnitt des vorherigen Teils.

Neben Print-Anweisungen gibt es viele andere Werkzeuge, die zum Debuggen verwendet werden können. Eines davon ist das [Visualisierungswerkzeug](http://www.pythontutor.com/visualize.html#mode=edit) auf der Website von [Python Tutor](http://www.pythontutor.com/). Das Werkzeug ermöglicht es Ihnen, Ihren Code Zeile für Zeile auszuführen, und zeigt Ihnen auch die in den Variablen gespeicherten Werte bei jedem Schritt an.

Der leicht fehlerhafte Code aus dem Debugging-Beispiel im [vorherigen Abschnitt](/part-2/4-simple-loops) wird im folgenden Bild mit Python Tutor visualisiert:

<img src="3_1_3.png">

Der rote Pfeil zeigt an, wo sich die Ausführung des Programms im Moment befindet. Das Werkzeug zeigt an, was bisher ausgegeben wurde, und zeigt auch den Wert an, den jede Variable bei jedem Schritt hat. Die Ausführung bewegt sich Zeile für Zeile vorwärts, wenn Sie auf _Next_ drücken.

Alles, was Sie tun müssen, um das Visualisierungswerkzeug zu verwenden, ist, Ihren Code zu kopieren und in das [Code-Fenster](http://www.pythontutor.com/visualize.html#mode=edit) des Werkzeugs einzufügen. Das Werkzeug hat einige Einschränkungen im Vergleich zu der in diesem Kurs verwendeten Python-Version. Wenn Sie auf kryptische Fehlermeldungen stoßen, ist es möglicherweise besser, eine andere Debugging-Methode auszuprobieren.

Erfahrenere Programmierer nutzen das Visualisierungswerkzeug selten intensiv, aber für einen Anfänger kann es eine wertvolle Hilfe sein. Programmierung als Disziplin lässt wenig Raum für Glück oder Zufall. Es ist wichtig, dass ein Programmierer versteht, welche Werte durch seinen Code zu jedem Zeitpunkt der Ausführung erzeugt werden. Wenn die in Variablen gespeicherten Werte nicht den Erwartungen entsprechen, liegt höchstwahrscheinlich ein Fehler im Programm vor.

Das Visualisierungswerkzeug und Debugging-Print-Anweisungen sind beides großartige Möglichkeiten für einen Programmierer, mit eigenen Augen zu sehen, dass ein Programm genau das tut, was von ihm erwartet wurde.

<in-browser-programming-exercise name="Zweierpotenzen" tmcname="part03-04_powers_of_two">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Obergrenze einzugeben. Das Programm gibt dann Zahlen so aus, dass jede nachfolgende Zahl das Doppelte der vorherigen ist, beginnend mit der Zahl 1. Das heißt, das Programm gibt Zweierpotenzen der Reihe nach aus.

Die Ausführung des Programms endet, wenn die nächste auszugebende Zahl größer als die vom Benutzer festgelegte Grenze wäre. Es sollten keine Zahlen ausgegeben werden, die größer als die Grenze sind.

<sample-output>

Obergrenze: **8**
1
2
4
8

</sample-output>

<sample-output>

Obergrenze: **20**
1
2
4
8
16

</sample-output>

<sample-output>

Obergrenze: **100**
1
2
4
8
16
32
64

</sample-output>

Bitte verwenden Sie in dieser Übung nicht den Wert `True` as Bedingung Ihrer `while`-Schleife!

**Was sind Zweierpotenzen?** Die erste Zweierpotenz ist die Zahl 1. Die nächste ist 1 mal 2, was 2 ist. Die nächste ist 2 mal 2, was 4 ist. Die nächste ist 4 mal 2, was 8 ist, und so weiter. Jede Potenz in der Sequenz wird mit zwei multipliziert, um die nächste zu erzeugen.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Potenzen zur Basis n" tmcname="part03-05_powers_of_base_n">

Bitte ändern Sie das Programm aus der vorherigen Übung so, dass der Benutzer auch die Basis eingeben kann, die multipliziert wird (im vorherigen Programm war die Basis immer 2).

<sample-output>

Obergrenze: **27**
Basis: **3**
1
3
9
27

</sample-output>

<sample-output>

Obergrenze: **1234567**
Basis: **10**
1
10
100
1000
10000
100000
1000000

</sample-output>

Bitte verwenden Sie in dieser Übung nicht den Wert `True` als Bedingung Ihrer `while`-Schleife!

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Die Summe aufeinanderfolgender Zahlen, Version 1" tmcname="part03-06_consecutive_sum_v1">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Grenze einzugeben. Das Programm berechnet dann die Summe aufeinanderfolgender Zahlen (1 + 2 + 3 + ...), bis die Summe mindestens gleich der vom Benutzer festgelegten Grenze ist. Das Programm sollte wie folgt funktionieren:

<sample-output>

Grenze: **2**
3

</sample-output>

<sample-output>

Grenze: **10**
10

</sample-output>

<sample-output>

Grenze: **18**
21

</sample-output>

Wenn Sie Schwierigkeiten haben zu verstehen, wie die gewünschte Ausgabe berechnet wird, können die Beispielausgaben in der nächsten Übung helfen. Sie können davon ausgehen, dass die vom Benutzer eingegebene Zahl immer gleich 2 oder höher ist.

</in-browser-programming-exercise>

## Zeichenketten aufbauen

In der allerersten [Woche des Kurses](/part-1/2-information-from-the-user) haben wir gelernt, dass es möglich ist, Zeichenketten aus kürzeren Zeichenketten mit dem `+`-Operator "aufzubauen". Dies ist zum Beispiel gültiger Python-Code:

```python
words = "Stolz"
words = words + ", Vorurteil"
words = words + " und Python"

print(words)
```

<sample-output>

Stolz, Vorurteil und Python

</sample-output>

Der `+=`-Operator ermöglicht es uns, dies etwas kompakter zu schreiben:

```python
words = "Stolz"
words += ", Vorurteil"
words += " und Python"

print(words)
```

Dies gilt auch für f-Strings, die praktisch sein können, wenn in Variablen gespeicherte Werte als Teile der resultierenden Zeichenkette benötigt werden. Zum Beispiel würde dies funktionieren:

```python
course = "Einführung in die Programmierung"
grade = 4

verdict = "Sie haben "
verdict += f"die Note {grade} "
verdict += f"im Kurs {course} erhalten"

print(verdict)
```

<sample-output>

Sie haben die Note 4 im Kurs Einführung in die Programmierung erhalten

</sample-output>

In der vorherigen Übung haben Sie die Summe aufeinanderfolgender Zahlen berechnet, indem Sie innerhalb einer Schleife immer einen neuen Wert hinzugefügt haben.

Genau dieselbe Idee gilt auch für Zeichenketten: Sie können innerhalb einer Schleife neue Teile zu einer Zeichenkette hinzufügen. Diese Technik sollte in der folgenden Übung nützlich sein.

<in-browser-programming-exercise name="Die Summe aufeinanderfolgender Zahlen, Version 2" tmcname="part03-07_consecutive_sum_v2">

Bitte schreiben Sie eine neue Version des Programms aus der vorherigen Übung. Zusätzlich zum Ergebnis soll es auch die durchgeführte Berechnung ausgeben:

<sample-output>

Grenze: **2**
Die aufeinanderfolgende Summe: 1 + 2 = 3

</sample-output>

<sample-output>

Grenze: **10**
Die aufeinanderfolgende Summe: 1 + 2 + 3 + 4 = 10

</sample-output>

<sample-output>

Grenze: **18**
Die aufeinanderfolgende Summe: 1 + 2 + 3 + 4 + 5 + 6 = 21

</sample-output>

Sie können davon ausgehen, dass die vom Benutzer eingegebene Zahl immer gleich 2 oder höher ist.

</in-browser-programming-exercise>

<!---
