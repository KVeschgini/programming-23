---
path: '/part-4/3-lists'
title: 'Listen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was Listen in Python sind
- werden Sie in der Lage sein, auf ein bestimmtes Element innerhalb einer Liste zuzugreifen
- werden Sie wissen, wie man Elemente zu einer Liste hinzufügt und wie man sie entfernt
- werden Sie mit den eingebauten Listenfunktionen und -methoden vertraut sein

</text-box>

Bisher haben wir in unseren Programmen Daten in Variablen gespeichert, wobei jedes Datenelement normalerweise eine eigene benannte Variable hatte. Dies hat offensichtlich einige Einschränkungen, da es mühsam werden kann, für alles separate Variablen zu definieren, wenn große Datenmengen zu verarbeiten sind.

Eine Python-_Liste_ (list) ist eine Sammlung von Werten, auf die über einen einzigen Variablennamen zugegriffen wird. Der Inhalt der Liste wird in eckigen Klammern geschrieben. Die in der Liste enthaltenen Werte werden _Elemente_ (items oder elements) genannt.

Der folgende Befehl erstellt eine neue, leere Liste:

```python
my_list = []
```

Dieser Befehl hingegen erstellt eine Liste mit fünf Elementen:

```python
my_list = [7, 2, 2, 5, 2]
```

## Zugriff auf Elemente in einer Liste

Die Elemente in einer Liste werden genau so indiziert wie die Zeichen in einer Zeichenkette. Die Indizierung beginnt bei Null, und der letzte Index ist die Länge der Liste minus 1:

<img src="4_3_1.png" alt="Listen werden beginnend bei 0 indiziert">

Auf ein einzelnes Listenelement kann genau wie auf ein einzelnes Zeichen in einer Zeichenkette mit eckigen Klammern zugegriffen werden:

```python
my_list = [7, 2, 2, 5, 2]

print(my_list[0])
print(my_list[1])
print(my_list[3])

print("Die Summe der ersten beiden Elemente:", my_list[0] + my_list[1])
```

<sample-output>

7
2
5
Die Summe der ersten beiden Elemente: 9

</sample-output>

Der gesamte Inhalt der Liste kann ebenfalls ausgegeben werden:

```python
my_list = [7, 2, 2, 5, 2]
print(my_list)
```

<sample-output>

[7, 2, 2, 5, 2]

</sample-output>

Im Gegensatz zu Zeichenketten sind Listen _veränderlich_ (mutable), was bedeutet, dass sich ihr Inhalt ändern kann. Sie können einem Element innerhalb einer Liste einen neuen Wert zuweisen, genau wie Sie einer Variablen einen neuen Wert zuweisen können:

```python
my_list = [7, 2, 2, 5, 2]
print(my_list)
my_list[1] = 3
print(my_list)
```

<sample-output>

[7, 2, 2, 5, 2]
[7, 3, 2, 5, 2]

</sample-output>

Die Funktion `len` gibt Ihnen die Anzahl der Elemente in einer Liste an:

```python
my_list = [7, 2, 2, 5, 2]
print(len(my_list))
```

<sample-output>

5

</sample-output>


<programming-exercise name='Den Wert eines Elements ändern' tmcname='part04-12_change_value_of_item'>

Bitte schreiben Sie ein Programm, das eine Liste mit den Werten `[1, 2, 3, 4, 5]` initialisiert. Dann soll das Programm den Benutzer nach einem Index und einem neuen Wert fragen, den Wert an dem gegebenen Index ersetzen und die Liste erneut ausgeben. Dies soll so lange wiederholt werden, bis der Benutzer -1 als Index angibt. Sie können davon ausgehen, dass alle angegebenen Indexwerte innerhalb Ihrer Liste liegen.

Ein Beispiel für die Ausführung des Programms:

<sample-output>

Index: **0**
Neuer Wert: **10**
[10, 2, 3, 4, 5]
Index: **2**
Neuer Wert: **250**
[10, 2, 250, 4, 5]
Index: **4**
Neuer Wert: **-45**
[10, 2, 250, 4, -45]
Index: **-1**

</sample-output>

**Hinweis:** Diese Übung verlangt nicht, dass Sie Funktionen schreiben, daher sollten Sie keinen Code in einen `if __name__ == "__main__"`-Block setzen.

</programming-exercise>

## Elemente zu einer Liste hinzufügen

Die Methode `append` fügt Elemente am Ende einer Liste hinzu. Sie funktioniert wie folgt:

```python
numbers = []
numbers.append(5)
numbers.append(10)
numbers.append(3)
print(numbers)
```

<sample-output>

[5, 10, 3]

</sample-output>

Das folgende Beispiel verwendet zwei separate Listen:

```python
numbers = []
shoe_sizes = []

numbers.append(5)
numbers.append(10)
numbers.append(3)

shoe_sizes.append(37)
shoe_sizes.append(44)
shoe_sizes.append(40)
shoe_sizes.append(28)

print("Zahlen:")
print(numbers)

print("Schuhgrößen:")
print(shoe_sizes)
```

Das Element wird an die Liste angehängt, auf der die Methode aufgerufen wird:

<sample-output>

Zahlen:
[5, 10, 3]
Schuhgrößen:
[37, 44, 40, 28]

</sample-output>

<programming-exercise name='Elemente zu einer Liste hinzufügen' tmcname='part04-13_add_items_to_list'>

Bitte schreiben Sie ein Programm, das den Benutzer zuerst nach der Anzahl der hinzuzufügenden Elemente fragt. Dann soll das Programm nacheinander die angegebene Anzahl von Werten abfragen und sie in der Reihenfolge, in der sie eingegeben wurden, zu einer Liste hinzufügen. Schließlich wird die Liste ausgegeben.

Ein Beispiel für das erwartete Verhalten:

<sample-output>

Wie viele Elemente: **3**
Element 1: **10**
Element 2: **250**
Element 3: **34**
[10, 250, 34]

</sample-output>

**Hinweis:** Diese Übung verlangt nicht, dass Sie Funktionen schreiben, daher sollten Sie keinen Code in einen `if __name__ == "__main__"`-Block setzen.

</programming-exercise>

## An einer bestimmten Stelle hinzufügen

Wenn Sie eine Stelle in der Liste angeben möchten, an der ein Element hinzugefügt werden soll, können Sie die Methode `insert` verwenden. Die Methode fügt ein Element am angegebenen Index hinzu. Alle bereits in der Liste vorhandenen Elemente mit einem Index, der gleich oder höher als der angegebene Index ist, werden um einen Index weiter "nach rechts" verschoben:

<img src="4_3_2.png" alt = "Einfügen eines Elements in eine Liste">

Dieses Programm zum Beispiel:

```python
numbers = [1, 2, 3, 4, 5, 6]
numbers.insert(0, 10)
print(numbers)
numbers.insert(2, 20)
print(numbers)
```

gibt dies aus:

<sample-output>

[10, 1, 2, 3, 4, 5, 6]
[10, 1, 20, 2, 3, 4, 5, 6]

</sample-output>

## Elemente aus einer Liste entfernen

Es gibt zwei verschiedene Ansätze, um ein Element aus einer Liste zu entfernen:

* Wenn der _Index_ des Elements bekannt ist, können Sie die Methode `pop` verwenden.
* Wenn der _Inhalt_ des Elements bekannt ist, können Sie die Methode `remove` verwenden.

Die Methode `pop` nimmt also den Index des Elements, das Sie entfernen möchten, als Argument entgegen. Das folgende Programm entfernt die Elemente an den Indizes 2 und 3 aus der Liste. Beachten Sie, wie sich die Indizes der verbleibenden Elemente ändern, wenn eines entfernt wird.

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.pop(2)
print(my_list)
my_list.pop(3)
print(my_list)
```

<sample-output>

[1, 2, 4, 5, 6]
[1, 2, 4, 6]

</sample-output>

Es ist nützlich zu wissen, dass die Methode `pop` das entfernte Element auch _zurückgibt_:

```python
my_list = [4, 2, 7, 2, 5]

number = my_list.pop(2)
print(number)
print(my_list)
```

<sample-output>

7
[4, 2, 2, 5]

</sample-output>

Die Methode `remove` hingegen nimmt den Wert des zu entfernenden Elements als Argument entgegen. Dieses Programm zum Beispiel:

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.remove(2)
print(my_list)
my_list.remove(5)
print(my_list)
```

gibt dies aus:

<sample-output>

[1, 3, 4, 5, 6]
[1, 3, 4, 6]

</sample-output>

Die Methode entfernt das _erste_ Vorkommen des Wertes in der Liste, ähnlich wie die String-Funktion `find` das erste Vorkommen einer Teilzeichenkette zurückgibt:

```python
my_list = [1, 2, 1, 2]

my_list.remove(1)
print(my_list)
my_list.remove(1)
print(my_list)
```

<sample-output>

[2, 1, 2]
[2, 2]

</sample-output>

<programming-exercise name='Hinzufügen und Entfernen' tmcname='part04-14_addition_and_removal'>

Bitte schreiben Sie ein Programm, das den Benutzer zwischen Hinzufügen und Entfernen wählen lässt. Je nach Wahl _fügt das Programm ein Element am Ende einer Liste hinzu_ oder _entfernt ein Element vom Ende einer Liste_. Das hinzugefügte Element muss immer um eins größer sein als das letzte Element in der Liste. Das erste hinzuzufügende Element muss 1 sein.

Die Liste wird am Anfang und nach jeder Operation ausgegeben. Schauen Sie sich das Beispiel für die Ausführung unten an:

<sample-output>

Die Liste ist jetzt []
Hinzufügen (d), Entfernen (r) oder Beenden (x): **d**
Die Liste ist jetzt [1]
Hinzufügen (d), Entfernen (r) oder Beenden (x): **d**
Die Liste ist jetzt [1, 2]
Hinzufügen (d), Entfernen (r) oder Beenden (x): **d**
Die Liste ist jetzt [1, 2, 3]
Hinzufügen (d), Entfernen (r) oder Beenden (x): **r**
Die Liste ist jetzt [1, 2]
Hinzufügen (d), Entfernen (r) oder Beenden (x): **d**
Die Liste ist jetzt [1, 2, 3]
Hinzufügen (d), Entfernen (r) oder Beenden (x): **x**
Auf Wiedersehen!

</sample-output>

Sie können davon ausgehen, dass nicht versucht wird, Elemente zu entfernen, wenn die Liste leer ist.

**Hinweis:** Diese Übung verlangt nicht, dass Sie Funktionen schreiben, daher sollten Sie keinen Code in einen `if __name__ == "__main__"`-Block setzen.

</programming-exercise>

Wenn das angegebene Element nicht in der Liste enthalten ist, verursacht die Funktion `remove` einen Fehler. Genau wie bei Zeichenketten können wir das Vorhandensein eines Elements mit dem Operator `in` prüfen:

```python
my_list = [1, 3, 4]

if 1 in my_list:
    print("Die Liste enthält das Element 1")

if 2 in my_list:
    print("Die Liste enthält das Element 2")
```

<sample-output>

Die Liste enthält das Element 1

</sample-output>

<programming-exercise name='Dasselbe Wort zweimal' tmcname='part04-15_same_word_twice'>

Bitte schreiben Sie ein Programm, das den Benutzer nach Wörtern fragt. Wenn der Benutzer ein Wort zum zweiten Mal eingibt, soll das Programm die Anzahl der verschiedenen eingegebenen Wörter ausgeben und beendet werden.

<sample-output>

Wort: **einmal**
Wort: **auf**
Wort: **ein**
Wort: **Mal**
Wort: **auf**
Sie haben 4 verschiedene Wörter eingegeben

</sample-output>

**Hinweis:** Diese Übung verlangt nicht, dass Sie Funktionen schreiben, daher sollten Sie keinen Code in einen `if __name__ == "__main__"`-Block setzen.

</programming-exercise>

## Listen sortieren

Die Elemente in einer Liste können mit der Methode `sort` vom kleinsten zum größten Wert _sortiert_ werden.

```python
my_list = [2,5,1,2,4]
my_list.sort()
print(my_list)
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Beachten Sie, wie die Methode die Liste selbst verändert. Manchmal möchten wir die ursprüngliche Liste nicht ändern, daher verwenden wir stattdessen die Funktion `sorted`. Sie _gibt eine sortierte Liste zurück_:

```python
my_list = [2,5,1,2,4]
print(sorted(my_list))
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Merken Sie sich den Unterschied zwischen den beiden: `sort` ändert die Reihenfolge der ursprünglichen Liste an Ort und Stelle (in place), während `sorted` eine neue, geordnete Kopie der Liste erstellt. Mit `sorted` können wir die ursprüngliche Reihenfolge der Liste beibehalten:

```python
original = [2, 5, 1, 2, 4]
in_order = sorted(original)
print(original)
print(in_order)
```

<sample-output>

[2, 5, 1, 2, 4]
[1, 2, 2, 4, 5]

</sample-output>

<programming-exercise name='Liste zweimal' tmcname='part04-16_list_twice'>

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, Werte einzugeben und diese zu einer Liste hinzufügt. Nach jedem Hinzufügen wird die Liste auf zwei verschiedene Arten ausgegeben:
- in der Reihenfolge, in der die Elemente hinzugefügt wurden
- sortiert vom kleinsten zum größten Wert

Das Programm wird beendet, wenn der Benutzer 0 eingibt.

Ein Beispiel für das erwartete Verhalten:

<sample-output>

Neues Element: **3**
Die Liste jetzt: [3]
Die Liste sortiert: [3]
Neues Element: **1**
Die Liste jetzt: [3, 1]
Die Liste sortiert: [1, 3]
Neues Element: **9**
Die Liste jetzt: [3, 1, 9]
Die Liste sortiert: [1, 3, 9]
Neues Element: **5**
Die Liste jetzt: [3, 1, 9, 5]
Die Liste sortiert: [1, 3, 5, 9]
Neues Element: **0**
Auf Wiedersehen!

</sample-output>

**Hinweis:** Diese Übung verlangt nicht, dass Sie Funktionen schreiben, daher sollten Sie keinen Code in einen `if __name__ == "__main__"`-Block setzen.

</programming-exercise>

## Maximum, Minimum und Summe

Die Funktionen `max` und `min`, kurz für Maximum und Minimum, geben das größte bzw. kleinste Element einer Liste zurück. Die Funktion `sum` gibt die Summe aller Elemente einer Liste zurück.

```python
my_list = [5, 2, 3, 1, 4]

greatest = max(my_list)
smallest = min(my_list)
list_sum = sum(my_list)

print("Kleinstes:", smallest)
print("Größtes:", greatest)
print("Summe:", list_sum)
```

<sample-output>

Kleinstes: 1
Größtes: 5
Summe: 15

</sample-output>

## Methoden vs. Funktionen

Es gibt zwei verschiedene Arten der Verarbeitung von Listen in Python, was verwirrend sein kann. Meistens werden Sie Listen-_Methoden_ wie `append` und `sort` verwenden. Sie werden mit dem Punkt-Operator `.` auf der Listenvariablen verwendet:

```python
my_list = []

# Methodenaufrufe
my_list.append(3)
my_list.append(1)
my_list.append(7)
my_list.append(2)

# ein weiterer Methodenaufruf
my_list.sort()
```

Einige _Funktionen_ nehmen gerne eine Liste als Argument entgegen. Oben haben wir gesehen, dass die Funktionen `max`, `min`, `len` und `sorted` genau das tun:

```python
my_list = [3, 2, 7, 1]

# Funktionsaufrufe nehmen die Liste als Argument entgegen
greatest = max(my_list)
smallest = min(my_list)
length = len(my_list)

print("Kleinstes:", smallest)
print("Größtes:", greatest)
print("Länge der Liste:", length)

# ein weiterer Funktionsaufruf
# die Liste selbst ist ein Argument, die Funktion gibt eine sortierte Kopie zurück
in_order = sorted(my_list)
print(in_order)
```

<sample-output>

Kleinstes: 1
Größtes: 7
Länge der Liste: 4
[1, 2, 3, 7]

</sample-output>

## Eine Liste als Argument oder Rückgabewert

Genau wie die oben genannten eingebauten Funktionen können auch unsere eigenen Funktionen eine Liste als Argument entgegennehmen und eine Liste als Rückgabewert erzeugen. Die folgende Funktion ermittelt den zentralen Wert in einer geordneten Liste, auch _Median_ genannt:

```python
def median(my_list: list):
    ordered = sorted(my_list)
    list_centre = len(ordered) // 2
    return ordered[list_centre]
```

Die Funktion erstellt eine geordnete Version der als Argument übergebenen Liste und gibt das Element in der Mitte zurück. Beachten Sie den hier verwendeten Ganzzahl-Divisionsoperator `//`. Der Index einer Liste sollte immer eine Ganzzahl sein.

Die Funktion arbeitet wie folgt:

```python
shoe_sizes = [45, 44, 36, 39, 40]
print("Der Median der Schuhgrößen ist", median(shoe_sizes))

ages = [1, 56, 34, 22, 5, 77, 5]
print("Der Median des Alters ist", median(ages))
```

<sample-output>

Der Median der Schuhgrößen ist 40
Der Median des Alters ist 22

</sample-output>

Eine Funktion kann auch eine Liste zurückgeben. Die folgende Funktion fordert den Benutzer auf, Ganzzahlen einzugeben, und gibt die Eingabe als Liste zurück:

```python
def input_numbers():
    numbers = []
    while True:
        user_input = input("Bitte geben Sie eine Ganzzahl ein, zum Beenden leer lassen: ")
        if len(user_input) == 0:
            break
        numbers.append(int(user_input))
    return numbers
```

Die Funktion verwendet eine Hilfsvariable `numbers`, die eine Liste ist. Alle vom Benutzer eingegebenen Zahlen werden der Liste hinzugefügt. Wenn die Schleife verlassen wird, gibt die Funktion die Liste mit der Anweisung `return numbers` zurück.

Ein Aufruf der Funktion wie dieser:

```python 
numbers = input_numbers()

print("Die größte Zahl ist", max(numbers))
print("Der Median der Zahlen ist", median(numbers))
```

könnte zum Beispiel dies ausgeben:

<sample-output>

Bitte geben Sie eine Ganzzahl ein, zum Beenden leer lassen: **5**
Bitte geben Sie eine Ganzzahl ein, zum Beenden leer lassen: **-22**
Bitte geben Sie eine Ganzzahl ein, zum Beenden leer lassen: **4**
Bitte geben Sie eine Ganzzahl ein, zum Beenden leer lassen: **35**
Bitte geben Sie eine Ganzzahl ein, zum Beenden leer lassen: **1**
Bitte geben Sie eine Ganzzahl ein, zum Beenden leer lassen:
Die größte Zahl ist 35
Der Median der Zahlen ist 4

</sample-output>

Dieses kleine Beispiel demonstriert eine der wichtigsten Anwendungen von Funktionen: Sie können Ihnen helfen, Ihren Code in kleinere, leicht verständliche und logische Einheiten zu unterteilen.

Natürlich könnte die gleiche Funktionalität auch ohne das Schreiben eigener Funktionen erreicht werden:

```python
numbers = []
while True:
    user_input = input("Bitte geben Sie eine Ganzzahl ein, zum Beenden leer lassen: ")
    if len(user_input) == 0:
        break
    numbers.append(int(user_input))

ordered = sorted(numbers)
list_centre = len(ordered) // 2
median = ordered[list_centre]

print("Die größte Zahl ist", max(numbers))
print("Der Median der Zahlen ist", median)
```

In dieser Version ist es schwieriger, der Programmlogik zu folgen, da nicht mehr klar ist, welche Befehle zu welcher Funktionalität gehören. Der Code erfüllt die gleichen Zwecke – Einlesen der Eingabe, Berechnen des Medians usw. – aber die Struktur ist weniger klar.

Die Organisation Ihres Codes in separate Funktionen verbessert die Lesbarkeit Ihres Programms, macht es aber auch einfacher, logische Einheiten zu handhaben. Dies hilft Ihnen wiederum zu verifizieren, dass das Programm wie beabsichtigt funktioniert, da jede Funktion separat getestet werden kann.

Ein weiterer wichtiger Verwendungszweck für Funktionen ist die _Wiederverwendbarkeit_ von Code. Wenn Sie eine Funktionalität in Ihrem Programm zweimal benötigen, ist es eine gute Idee, eine eigene Funktion zu erstellen und sie entsprechend zu benennen:

```python
print("Schuhgrößen:")
shoe_sizes = input_numbers()

print("Gewichte:")
weights = input_numbers()

print("Größen:")
heights = input_numbers()
```

<programming-exercise name='Die Länge einer Liste' tmcname='part04-17_length_of_list'>

Bitte schreiben Sie eine Funktion namens `length`, die eine Liste als Argument entgegennimmt und die Länge der Liste zurückgibt.

```python
my_list = [1, 2, 3, 4, 5]
result = length(my_list)
print("Die Länge ist", result)

# Die als Argument übergebene Liste muss nicht in einer Variablen gespeichert sein
result = length([1, 1, 1, 1])
print("Die Länge ist", result)
```

<sample-output>

Die Länge ist 5
Die Länge ist 4

</sample-output>

</programming-exercise>

<programming-exercise name='Arithmetisches Mittel' tmcname='part04-18_mean'>

Bitte schreiben Sie eine Funktion namens `mean`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Funktion gibt das arithmetische Mittel der Werte in der Liste zurück.

```python
my_list = [1, 2, 3, 4, 5]
result = mean(my_list)
print("Mittelwert ist", result)
```

<sample-output>

Mittelwert ist 3.0

</sample-output>

</programming-exercise>

<programming-exercise name='Die Spannweite einer Liste' tmcname='part04-19_range_of_list'>

Bitte schreiben Sie eine Funktion namens `range_of_list`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Funktion gibt die Differenz zwischen dem kleinsten und dem größten Wert in der Liste zurück.


```python
my_list = [1, 2, 3, 4, 5]
result = range_of_list(my_list)
print("Die Spannweite der Liste ist", result)
```

<sample-output>

Die Spannweite der Liste ist 4

</sample-output>

</programming-exercise>


Es gibt noch viele weitere Möglichkeiten, Listen in Python zu verwenden. Die Python-[Dokumentation](https://docs.python.org/3/tutorial/datastructures.html) ist ein guter Ort, um mehr zu erfahren.
