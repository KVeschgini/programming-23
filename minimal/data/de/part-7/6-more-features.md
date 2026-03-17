---
path: '/part-7/6-more-features'
title: 'Weitere Python-Features'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie mit einigen weiteren Python-Features vertraut sein

</text-box>

Zum Abschluss dieses Kurses finden Sie hier verschiedene nützliche Python-Features.

## Einzeilige Bedingungen

Die folgenden zwei Anweisungen erzeugen exakt die gleichen Ergebnisse:

```python
if x%2 == 0:
    print("gerade")
else:
    print("ungerade")
```

```python
print("gerade" if x%2 == 0 else "ungerade")
```

Im letzteren Beispiel haben wir einen bedingten Ausdruck in einer einzigen Zeile: `a if [Bedingung] else b`. Der Wert dieses Ausdrucks ergibt `a`, wenn die Bedingung wahr ist, und `b`, wenn sie falsch ist. Diese Struktur wird manchmal als _ternärer Operator_ bezeichnet.

Bedingte Ausdrücke können sehr nützlich sein, wenn Sie etwas _bedingt_ zuweisen müssen. Wenn Sie beispielsweise die Variablen `x` und `y` hätten und den Wert von `y` abhängig von der Parität von `x` entweder erhöhen oder auf Null setzen wollten, könnten Sie dies in einer normalen `if else`-Anweisung schreiben, etwa so:

```python
if x%2 == 0:
    y += 1
else:
    y = 0
```

Dasselbe ließe sich mit einem schicken Einzeiler erreichen:

```python
y = y + 1 if x%2 == 0 else 0
```

## Ein "leerer" Block

Sie erinnern sich vielleicht aus dem vorherigen Teil, dass in einem Python-Programm kein leerer Block erlaubt ist. Wenn Sie einen Codeblock benötigen, der nichts tut, zum Beispiel beim Testen anderer Funktionalitäten, ermöglicht Ihnen der Befehl `pass` genau das. Sie könnten beispielsweise eine Funktion schreiben, die nichts tut:

```python
def testing():
    pass
```

Diese Funktion würde einfach sofort zurückkehren. Das Weglassen des `pass`-Befehls, d.h. ein völlig leerer Block, würde einen Fehler verursachen.

```python
def testing():  # dies verursacht einen Fehler!
```

## Schleifen mit else-Blöcken

In Python können Schleifen auch `else`-Blöcke haben. Dieser Codeabschnitt wird ausgeführt, wenn die Schleife normal beendet wird.

Im folgenden Beispiel suchen wir beispielsweise in einer Liste von Zahlen. Wenn eine gerade Zahl in der Liste enthalten ist, gibt das Programm eine Nachricht aus und die Schleife wird abgebrochen. Wenn keine geraden Zahlen vorhanden sind, wird die Schleife normal beendet, aber es wird dann eine andere Nachricht ausgegeben.

```python
my_list = [3,5,2,8,1]
for x in my_list:
    if x%2 == 0:
        print("gerade Zahl gefunden", x)
        break
else:
    print("es gab keine geraden Zahlen")
```

Ein traditionellerer Weg, dies zu erreichen, wäre die Verwendung einer Hilfsvariablen, um zu speichern, ob das gewünschte Element gefunden wurde:

```python
my_list = [3,5,2,8,1]
found = False
for x in my_list:
    if x%2 == 0:
        print("gerade Zahl gefunden", x)
        found = True
        break
if not found:
    print("es gab keine geraden Zahlen")
```

Die Verwendung einer `for else`-Anweisung erspart uns das Schreiben einer separaten Variable.

## Standard-Parameterwerte

Eine Python-Funktion kann einen Standard-Parameterwert haben. Dieser wird verwendet, wenn kein Argument an die Funktion übergeben wird. Siehe das folgende Beispiel:

```python
def say_hello(name="Emily"):
    print("Hallo,", name)

say_hello()
say_hello("Eric")
say_hello("Matthew")
say_hello("")
```

<sample-output>

Hallo, Emily
Hallo, Eric
Hallo, Matthew
Hallo, 

</sample-output>

Hinweis: Eine leere Zeichenkette ist immer noch eine Zeichenkette, daher wird der Standard-Parameter nicht verwendet, wenn eine leere Zeichenkette an die Funktion übergeben wird.

## Eine variable Anzahl von Parametern

Sie können auch eine Funktion mit einer variablen Anzahl von Parametern definieren, indem Sie ein Sternchen vor den Parameternamen setzen. Alle verbleibenden Argumente, die an die Funktion übergeben werden, sind in einem Tuple enthalten und können über den benannten Parameter aufgerufen werden.

Die folgende Funktion zählt die Anzahl und die Summe ihrer Argumente:

```python
def testing(*my_args):
    print("Sie haben", len(my_args), "Argumente übergeben")
    print("Die Summe der Argumente ist", sum(my_args))

testing(1, 2, 3, 4, 5)
```

<sample-output>

Sie haben 5 Argumente übergeben
Die Summe der Argumente ist 15

</sample-output>

<programming-exercise name='Ihre eigene Programmiersprache' tmcname='part07-18_own_programming_language'>

In dieser Übung schreiben Sie einen Executor für Ihre eigene Programmiersprache. Sie können alle Techniken und Fähigkeiten nutzen, die Sie in diesem Kurs bisher gelernt haben.

Die Programme bestehen aus Zeilen, und jede Zeile hat eines der folgenden Formate:

* `PRINT [Wert]`: gibt den Wert aus
* `MOV [Variable] [Wert]`: weist der Variable den Wert zu
* `ADD [Variable] [Wert]`: addiert den Wert zur Variable
* `SUB [Variable] [Wert]`: subtrahiert den Wert von der Variable
* `MUL [Variable] [Wert]`: multipliziert die Variable mit dem Wert
* `[Ort]:`: benennt eine Codezeile, damit sie von anderswo angesprungen werden kann
* `JUMP [Ort]`: springt zum angegebenen Ort
* `IF [Bedingung] JUMP [Ort]`: wenn die Bedingung wahr ist, springe zum angegebenen Ort
* `END`: beendet die Ausführung

Die eckigen Klammern oben sind nur eine Notation, um Operanden zu kennzeichnen; siehe unten für Anwendungsbeispiele.

Das Programm wird Zeile für Zeile ab der ersten Zeile ausgeführt. Die Ausführung endet, wenn der Executor auf den Befehl `END` stößt oder wenn keine weiteren Zeilen mehr auszuführen sind.

Jedes Programm hat 26 vordefinierte Variablen mit den Namen `A` bis `Z`. Jede Variable hat zu Beginn des Programms den Wert 0. Die Notation `[Variable]` bezieht sich auf eine dieser 26 Variablen.

Alle vom Programm verarbeiteten Werte sind Ganzzahlen. Die Notation `[Wert]` bezieht sich entweder auf einen in einer Variable gespeicherten Wert oder auf eine direkt eingegebene Ganzzahl.

Die Notation `[Ort]` bezieht sich auf einen beliebigen Namen eines Ortes, der aus Kleinbuchstaben `a` bis `z` und/oder Zahlen `0` bis `9` besteht. Zwei verschiedene Orte dürfen nicht denselben Namen haben.

Die Notation `[Bedingung]` bezieht sich auf einen beliebigen Ausdruck im Format `[Wert] [Vergleich] [Wert]`, wobei `[Vergleich]` einer der folgenden Operatoren ist: `==`, `!=`, `<`, `<=`, `>` und `>=`.

Bitte schreiben Sie eine Funktion namens `run(program)`, die eine Liste mit den Programmbefehlen als Argument entgegennimmt. Jedes Element der Liste ist eine Codezeile im Programm. Die Funktion soll eine neue Liste zurückgeben, die die Ergebnisse der während des Programmlaufs ausgeführten `PRINT`-Befehle enthält.

Sie können davon ausgehen, dass der Funktion nur Programme übergeben werden, die vollständig im korrekten Format vorliegen. Sie müssen keine Eingabevalidierung oder Fehlerbehandlung implementieren.

Diese Übung ist zwei Punkte wert. Sie erhalten einen Punkt, wenn die Befehle `PRINT`, `MOV`, `ADD`, `SUB`, `MUL` und `END` korrekt funktionieren. Sie erhalten einen weiteren Punkt, wenn auch der Rest der Befehle, die zur Implementierung von Schleifen verwendet werden, funktioniert.

Unten sind einige Beispiele, die Sie auch zum Testen verwenden können. Beispiel 1:

```python
program1 = []
program1.append("MOV A 1")
program1.append("MOV B 2")
program1.append("PRINT A")
program1.append("PRINT B")
program1.append("ADD A B")
program1.append("PRINT A")
program1.append("END")
result = run(program1)
print(result)
```

<sample-output>

[1, 2, 3]

</sample-output>

Beispiel 2:

```python
program2 = []
program2.append("MOV A 1")
program2.append("MOV B 10")
program2.append("begin:")
program2.append("IF A >= B JUMP quit")
program2.append("PRINT A")
program2.append("PRINT B")
program2.append("ADD A 1")
program2.append("SUB B 1")
program2.append("JUMP begin")
program2.append("quit:")
program2.append("END")
result = run(program2)
print(result)
```

<sample-output>

[1, 10, 2, 9, 3, 8, 4, 7, 5, 6]

</sample-output>

Beispiel 3 (Fakultät):

```python
program3 = []
program3.append("MOV A 1")
program3.append("MOV B 1")
program3.append("begin:")
program3.append("PRINT A")
program3.append("ADD B 1")
program3.append("MUL A B")
program3.append("IF B <= 10 JUMP begin")
program3.append("END")
result = run(program3)
print(result)
```

<sample-output>

[1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]

</sample-output>

Beispiel 4 (Primzahlen):

```python
program4 = []
program4.append("MOV N 50")
program4.append("PRINT 2")
program4.append("MOV A 3")
program4.append("begin:")
program4.append("MOV B 2")
program4.append("MOV Z 0")
program4.append("test:")
program4.append("MOV C B")
program4.append("new:")
program4.append("IF C == A JUMP error")
program4.append("IF C > A JUMP over")
program4.append("ADD C B")
program4.append("JUMP new")
program4.append("error:")
program4.append("MOV Z 1")
program4.append("JUMP over2")
program4.append("over:")
program4.append("ADD B 1")
program4.append("IF B < A JUMP test")
program4.append("over2:")
program4.append("IF Z == 1 JUMP over3")
program4.append("PRINT A")
program4.append("over3:")
program4.append("ADD A 1")
program4.append("IF A <= N JUMP begin")
result = run(program4)
print(result)
```

<sample-output>

[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

</sample-output>

</programming-exercise>
