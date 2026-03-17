---
path: '/part-12/2-generators'
title: 'Generatoren'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was ein Python-Generator ist
- werden Sie mit dem Schlüsselwort `yield` vertraut sein
- werden Sie in der Lage sein, Ihre eigenen Generatorfunktionen zu schreiben

</text-box>

Wir sind bereits auf Situationen gestoßen, in denen wir es mit einer Reihe von Elementen zu tun haben und das nächste Element (oder die nächsten Elemente) in der Reihe benötigen, aber nicht unbedingt jedes Mal die gesamte Reihe bis zu diesem Punkt neu formulieren wollen, wenn ein neues Element erforderlich ist. Einige rekursive Reihen, wie die Fibonacci-Zahlen, sind ein gutes Beispiel für eine solche Situation. Wenn jeder Funktionsaufruf rekursiv die gesamte Reihe bis zum gewünschten Punkt generiert, erzeugen wir den Anfang der Reihe viele Male neu.

Python-_Generatoren_ sind eine Möglichkeit, nur das nächste Element in einer Reihe zu erzeugen, wenn es benötigt wird, wodurch der Erzeugungsprozess für die Reihe im Wesentlichen nur einmal (für eine bestimmte Ausführung eines Programms) durchlaufen wird. Sie funktionieren größtenteils wie normale Funktionen, da sie aufgerufen werden können und Werte zurückgeben, aber der Wert, den eine Generatorfunktion zurückgibt, unterscheidet sich von einer normalen Funktion. Eine normale Funktion sollte bei gleichen Argumenten jedes Mal denselben Wert zurückgeben. Eine Generatorfunktion hingegen sollte sich ihren aktuellen Zustand merken und das nächste Element in der Reihe zurückgeben, das sich vom vorherigen Element unterscheiden kann.

So wie es viele Möglichkeiten gibt, fast jedes Programmierproblem zu lösen, gibt es auch viele Möglichkeiten, eine Funktionalität ähnlich wie Generatoren zu erreichen. Generatoren können jedoch dazu beitragen, das Programm leichter verständlich zu machen, und können in bestimmten Situationen Speicherplatz oder andere Rechenressourcen sparen.

## Das Schlüsselwort yield

Eine Generatorfunktion muss das Schlüsselwort `yield` enthalten, das den Wert kennzeichnet, den die Funktion zurückgibt. Sehen wir uns eine Funktion an, die Ganzzahlen generiert, beginnend bei Null und endend bei einem vorher festgelegten Maximalwert:

```python

def counter(max_value: int):
    number = 0
    while number <= max_value:
        yield number
        number += 1

```

Nun kann die Funktion `counter` als Argument an die Funktion `next()` übergeben werden:

```python
if __name__ == "__main__":
    numbers = counter(10)
    print("Erster Wert:")
    print(next(numbers))
    print("Zweiter Wert:")
    print(next(numbers))
```

<sample-output>

Erster Wert:
0
Zweiter Wert:
1

</sample-output>

Wie Sie im obigen Beispiel sehen können, ähnelt das Schlüsselwort `yield` dem Schlüsselwort `return`: Beide werden verwendet, um einen Rückgabewert zu definieren. Der Unterschied besteht darin, dass `yield` die Funktion nicht im gleichen Sinne "schließt" wie `return`. Eine Generatorfunktion mit dem Schlüsselwort `yield` behält den Überblick über ihren Zustand, und wenn sie das nächste Mal aufgerufen wird, macht sie an derselben Stelle weiter.

Dieser Generator benötigt auch einen Maximalwert, der im obigen Beispiel `10` war. Wenn dem Generator die Werte ausgehen, löst er eine `StopIteration`-Ausnahme aus:

```python
if __name__ == "__main__":
    # Erstellt einen Generator mit dem Maximalwert 1
    numbers = counter(1)
    print(next(numbers))
    print(next(numbers))
    print(next(numbers))
```

<sample-output>

0
1
Traceback (most recent call last):
  File "generator_example.py", line 11, in <module>
    print(next(numbers))
StopIteration

</sample-output>

Die Ausnahme kann mit einem `try` - `except`-Block abgefangen werden:

```python
if __name__ == "__main__":
    numbers = counter(1)
    try:
        print(next(numbers))
        print(next(numbers))
        print(next(numbers))
    except StopIteration:
        print("Zahlen sind ausgegangen")
```

<sample-output>

0
1
Zahlen sind ausgegangen

</sample-output>

Das Durchlaufen aller Elemente in einem Generator lässt sich einfach mit einer `for`-Schleife bewerkstelligen:

```python
if __name__ == "__main__":
    numbers = counter(5)
    for number in numbers:
        print(number)
```

<sample-output>

0
1
2
3
4
5

</sample-output>

Generatoren müssen keinen definierten Maximalwert oder Endpunkt haben. Sie können unendlich viele Werte generieren (natürlich innerhalb anderer rechnerischer und physikalischer Grenzen).

Bedenken Sie jedoch: Das Durchlaufen eines Generators mit einer `for`-Schleife funktioniert nur, wenn der Generator an einem bestimmten Punkt endet. Wenn der Generator auf einer Endlosschleife basiert, führt der Versuch, ihn mit einer einfachen `for`-Schleife zu durchlaufen, zu einer endlosen Ausführung, genau wie eine `while`-Schleife ohne End- oder Abbruchbedingung.

<programming-exercise name='Gerade Zahlen' tmcname='part12-08_even_numbers'>

Bitte schreiben Sie eine Generatorfunktion namens `even_numbers(beginning: int, maximum: int)`, die zwei Ganzzahlen als Argumente entgegennimmt. Die Funktion soll gerade Zahlen erzeugen, beginnend bei `beginning` und endend bei höchstens `maximum`.

Zwei Beispiele für die Funktionsweise der Funktion:

```python
numbers = even_numbers(2, 10)
for number in numbers:
    print(number)
```

<sample-output>

2
4
6
8
10

</sample-output>

```python
numbers = even_numbers(11, 21)
for number in numbers:
    print(number)
```

<sample-output>

12
14
16
18
20

</sample-output>

</programming-exercise>

<programming-exercise name='Primzahlen' tmcname='part12-09_prime_numbers'>

Eine Primzahl ist eine Zahl, die nur durch sich selbst und die Zahl 1 teilbar ist. Konventionsgemäß sind Primzahlen als positive Ganzzahlen ab der Zahl 2 definiert. Die ersten sechs Primzahlen sind 2, 3, 5, 7, 11 und 13.

Bitte schreiben Sie eine Generatorfunktion `prime_numbers()`, die einen neuen Generator erstellt. Der Generator soll nacheinander neue Primzahlen ab 2 zurückgeben. Hinweis: Dieser Generator endet nie. Er wird so lange Zahlen generieren, wie sie benötigt werden.

Zum Beispiel:

```python
numbers = prime_numbers()
for i in range(8):
    print(next(numbers))
```

<sample-output>

2
3
5
7
11
13
17
19

</sample-output>

**Hinweis:** Sie können eine Schleife verwenden, um zu prüfen, ob eine Zahl eine Primzahl ist. Wenn wir die Zahl `x` prüfen, würde die Schleife die Zahlen `2` bis `x-1` durchlaufen. Wenn `x` durch eine dieser Zahlen teilbar ist, ist es keine Primzahl.

</programming-exercise>


## Generator-Abstraktionen

Sie benötigen nicht unbedingt eine Funktionsdefinition, um einen Generator zu erstellen. Wir können stattdessen eine Struktur verwenden, die einer Listen-Abstraktion ähnelt. Diesmal verwenden wir _runde_ Klammern, um einen Generator anstelle einer Liste oder eines Wörterbuchs zu kennzeichnen:

```python
# Dieser Generator gibt Quadrate von Ganzzahlen zurück
squares = (x ** 2 for x in range(1, 64))

print(squares) # Die Ausgabe eines Generator-Objekts ist nicht allzu informativ

for i in range(5):
    print(next(squares))
```

<sample-output>

<generator object &lt;genexpr&gt; at 0x000002B4224EBFC0>
1
4
9
16
25

</sample-output>

Im folgenden Beispiel geben wir Teilzeichenketten des englischen Alphabets aus, die jeweils drei Zeichen lang sind. Dies gibt die ersten 10 Elemente im Generator aus:

```python
substrings = ("abcdefghijklmnopqrstuvwxyz"[i : i + 3] for i in range(24))

# Die ersten 10 Teilzeichenketten ausgeben
for i in range(10):
    print(next(substrings))
```

<sample-output>

abc
bcd
cde
def
efg
fgh
ghi
hij
ijk
jkl

</sample-output>

<programming-exercise name='Zufällige Wörter' tmcname='part12-10_random_words'>

Bitte schreiben Sie eine Funktion namens `word_generator(characters: str, length: int, amount: int)`, die einen neuen Generator zur Erzeugung zufälliger Wörter basierend auf den angegebenen Parametern zurückgibt.

Ein zufälliges Wort wird erzeugt, indem aus der Zeichenkette `characters` so viele Zeichen ausgewählt werden, wie durch das Argument `length` angegeben. Dasselbe Zeichen kann in einem zufälligen Wort mehrmals vorkommen.

Der Generator gibt so viele Wörter zurück, wie durch das Argument `amount` angegeben, bevor er endet.

Ein Beispiellauf des Wortgenerators:

```python
wordgen = word_generator("abcdefg", 3, 5)
for word in wordgen:
    print(word)
```

<sample-output>

dbf
baf
ead
fga
ccc

</sample-output>

Hinweis: Es bleibt Ihnen überlassen, wie Sie diese Funktion implementieren. Sie können gleichermaßen einen "traditionellen" Generator oder eine Generator-Abstraktion verwenden.

</programming-exercise>
