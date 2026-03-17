---
path: '/part-1/1-getting-started'
title: 'Erste Schritte'
hidden: false
---

<text-box variant='learningObjectives' name='Lernziele'>

Nach diesem Abschnitt

- werden Sie Ihr erstes Python-Programm geschrieben und ausgeführt haben
- werden Sie wissen, wie man den `print`-Befehl verwendet
- werden Sie in der Lage sein, die Programmierung für arithmetische Operationen zu nutzen

</text-box>

Computerprogramme bestehen aus _Befehlen_, wobei jeder Befehl den Computer anweist, eine bestimmte Aktion auszuführen. Ein Computer führt diese Befehle nacheinander aus. Befehle können unter anderem dazu verwendet werden, Berechnungen durchzuführen, Dinge im Speicher des Computers zu vergleichen, Änderungen in der Funktionsweise des Programms zu bewirken, Nachrichten zu übermitteln oder Informationen vom Benutzer des Programms abzufragen.

Beginnen wir mit der Programmierung, indem wir uns mit dem `print`-Befehl vertraut machen, der Text _ausgibt_. In diesem Zusammenhang bedeutet Ausgeben im Wesentlichen, dass das Programm einen Text auf dem Bildschirm anzeigt.

Das folgende Programm gibt die Zeile "Hallo!" aus:

```python
print("Hallo!")
```

Wenn das Programm ausgeführt wird, erzeugt es Folgendes:

<sample-output>

Hallo!

</sample-output>

Das Programm wird nur funktionieren, wenn der Code exakt so geschrieben ist, wie oben angegeben. Wenn man zum Beispiel versucht, den `print`-Befehl ohne die Anführungszeichen auszuführen, wie hier:

```python
print(Hallo!)
```

wird die Nachricht nicht ausgegeben, sondern es wird stattdessen ein Fehler verursacht:

<sample-output>

File "&lt;stdin&gt;", line 1
  print(Hallo!)
               ^
SyntaxError: invalid syntax

</sample-output>

Zusammenfassend lässt sich sagen: Wenn Sie Text ausgeben möchten, muss der gesamte Text in Anführungszeichen eingeschlossen sein, da Python ihn sonst nicht korrekt interpretieren kann.

<in-browser-programming-exercise name="Emoticon" tmcname="part01-01_emoticon" height="300px">

Bitte schreiben Sie ein Programm, das ein Emoticon ausgibt: :-)

</in-browser-programming-exercise>

## Ein Programm mit mehreren Befehlen

Mehrere nacheinander geschriebene Befehle werden in der Reihenfolge vom ersten bis zum letzten ausgeführt.
Dieses Programm zum Beispiel:

```python
print("Willkommen zur Einführung in die Programmierung!")
print("Zuerst werden wir die Verwendung des print-Befehls üben.")
print("Dieses Programm gibt drei Zeilen Text auf dem Bildschirm aus.")
```
gibt die folgenden Zeilen auf dem Bildschirm aus:

<sample-output>

Willkommen zur Einführung in die Programmierung!
Zuerst werden wir die Verwendung des print-Befehls üben.
Dieses Programm gibt drei Zeilen Text auf dem Bildschirm aus.

</sample-output>

<in-browser-programming-exercise name="Code korrigieren: Sieben Brüder" tmcname="part01-02_seven_brothers">

"Seitsemän veljestä" (Die sieben Brüder) ist einer der ersten Romane, die jemals auf Finnisch geschrieben wurden. Er erzählt die Geschichte von sieben verwaisten Brüdern, die lernen, ihren Weg in der Welt zu finden ([lesen Sie mehr auf Wikipedia](https://de.wikipedia.org/wiki/Die_sieben_Br%C3%BCder)).

Dieses Programm soll die Namen der Brüder in alphabetischer Reihenfolge ausgeben, aber es funktioniert noch nicht ganz richtig. Bitte korrigieren Sie das Programm so, dass die Namen in der richtigen Reihenfolge ausgegeben werden.

```python
print("Simeoni")
print("Juhani")
print("Eero")
print("Lauri")
print("Aapo")
print("Tuomas")
print("Timo")
```

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Rudere, rudere, rudere dein Boot" tmcname="part01-03_row_your_boat">

Bitte schreiben Sie ein Programm, das die folgenden Zeilen exakt so ausgibt, wie sie hier stehen, einschließlich aller Satzzeichen:

<sample-output>

Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.

</sample-output>

</in-browser-programming-exercise>

## Arithmetische Operationen

Sie können auch arithmetische Operationen in einen `print`-Befehl einfügen. Das Ausführen des Befehls gibt dann das Ergebnis der Operation aus. Das folgende Programm zum Beispiel:

```python
print(2 + 5)
print(3 * 3)
print(2 + 2 * 10)
```
gibt diese Zeilen aus:

<sample-output>

7
9
22

</sample-output>

Beachten Sie das Fehlen von Anführungszeichen um die arithmetischen Operationen oben. Anführungszeichen werden verwendet, um _Strings_ (Zeichenketten) zu kennzeichnen. Im Kontext der Programmierung sind Strings Sequenzen von Zeichen. Sie können aus Buchstaben, Zahlen und allen anderen Arten von Zeichen bestehen, wie zum Beispiel Satzzeichen. Strings sind nicht nur Wörter, wie wir sie gemeinhin verstehen, sondern ein einzelner String kann so lang wie mehrere vollständige Sätze sein.
Strings werden normalerweise genau so ausgegeben, wie sie geschrieben wurden. Daher führen die folgenden zwei Befehle zu zwei recht unterschiedlichen Ergebnissen:

```python
print(2 + 2 * 10)
print("2 + 2 * 10")
```

Dieses Programm gibt aus:

<sample-output>

22
2 + 2 * 10

</sample-output>

In der zweiten Codezeile berechnet Python nicht das Ergebnis der Operation, sondern gibt stattdessen die Operation selbst als String aus.
Strings werden also genau so ausgegeben, wie sie geschrieben wurden, ohne Bezug auf ihren Inhalt.

## Kommentieren

Jede Zeile, die mit dem Doppelkreuz `#` beginnt, auch bekannt als Raute- oder Nummernzeichen, ist ein Kommentar. Das bedeutet, dass jeglicher Text in dieser Zeile nach dem `#`-Symbol in keiner Weise die Funktionsweise des Programms beeinflusst. Python wird ihn einfach ignorieren.

Kommentare werden verwendet, um die Funktionsweise eines Programms zu erklären, sowohl für den Programmierer selbst als auch für andere, die den Programmcode lesen. In diesem Programm erklärt ein Kommentar die im Code durchgeführte Berechnung:

```python
print("Stunden in einem Jahr:")
# ein Jahr hat 365 Tage und jeder Tag hat 24 Stunden
print(365*24)
```

Wenn das Programm ausgeführt wird, ist der Kommentar für den Benutzer nicht sichtbar:

<sample-output>

Stunden in einem Jahr:
8760

</sample-output>

Kurze Kommentare können auch am Ende einer Zeile hinzugefügt werden:

```python
print("Stunden in einem Jahr:")
print(365*24) # 365 Tage, 24 Stunden pro Tag
```

<in-browser-programming-exercise name="Minuten in einem Jahr" tmcname="part01-04_minutes_in_a_year">

Bitte schreiben Sie ein Programm, das die Anzahl der Minuten in einem Jahr ausgibt. Verwenden Sie Python-Code, um die Berechnung durchzuführen, wie im vorherigen Codebeispiel.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Etwas Code ausgeben" tmcname="part01-05_print_code">

Bisher haben Sie wahrscheinlich doppelte Anführungszeichen `"` verwendet, um Strings auszugeben. Zusätzlich zu den doppelten Anführungszeichen akzeptiert Python auch einfache Anführungszeichen `'`.

Dies ist praktisch, wenn Sie jemals die eigentlichen Anführungszeichen selbst ausgeben möchten:

```python
print('"Kommen Sie sofort zurück!", rief der Polizeibeamte.')
```

<sample-output>

"Kommen Sie sofort zurück!", rief der Polizeibeamte.

</sample-output>

Bitte schreiben Sie ein Programm, das Folgendes ausgibt:

<sample-output>

print("Hallo!")

</sample-output>

</in-browser-programming-exercise>
