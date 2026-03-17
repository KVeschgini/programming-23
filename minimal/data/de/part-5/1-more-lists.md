---
path: '/part-5/1-more-lists'
title: 'Mehr über Listen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie in der Lage sein, Listen mit verschiedenen Datentypen zu erstellen
- werden Sie wissen, wie man Listen zur Organisation von Daten nutzt
- werden Sie in der Lage sein, eine Matrix als zweidimensionale Liste zu speichern

</text-box>

<!--der gleiche Text befindet sich in den Abschnitten 3-1, 5-1 und 6-1, bitte alle prüfen, falls dies geändert wird-->
<text-box variant='hint' name="Über die Übungen in diesem Kurs">

Um ein versierter Programmierer zu werden, ist viel Übung erforderlich, manchmal sogar recht mechanische Übung. Es geht auch darum, Problemlösungsfähigkeiten zu entwickeln und Intuition anzuwenden. Aus diesem Grund gibt es in diesem Kurs viele Übungen unterschiedlicher Art. Einige von ihnen fordern Sie auf, das Gelernte recht direkt anzuwenden, aber einige sind absichtlich herausfordernder und offener gestaltet.

Einige der Übungen mögen auf den ersten Blick überwältigend erscheinen, aber das ist kein Grund zur Sorge. Keine der Übungen ist strikt verpflichtend, und tatsächlich sind _nur 25 % der Punkte in jedem Teil erforderlich, um den Kurs zu bestehen._ Weitere Details zur Benotung finden Sie auf der [Seite über Benotung und Prüfungen](/grading-and-exams).

**Die Übungen sind nicht in einer bestimmten Reihenfolge der Schwierigkeit angeordnet.** Jeder Abschnitt führt in der Regel einige neue Programmierkonzepte ein, die dann sowohl mit einfacheren als auch mit komplizierteren Übungen geübt werden. **Wenn Sie auf eine Übung stoßen, die sich als zu schwierig anfühlt, gehen Sie zur nächsten über.** Sie können jederzeit zu den schwierigeren Übungen zurückkehren, wenn Sie später Zeit haben.

Wenn es zwangsläufig schwierig wird, ein Wort des Trostes: Eine Aufgabe, die diese Woche unmöglich erscheint, wird sich in etwa vier Wochen wahrscheinlich ziemlich einfach anfühlen.

</text-box>

## Listen mit verschiedenen Datentypen

Im vorherigen Teil haben wir hauptsächlich Listen mit Ganzzahlen (Integers) behandelt, aber in Listen können beliebige Typen von Werten gespeichert werden. Eine Liste von Zeichenketten (Strings) könnte so aussehen:

```python
names = ["Marlyn", "Ruth", "Paul"]
print(names)
names.append("David")
print(names)

print("Anzahl der Namen auf der Liste:", len(names))
print("Namen in alphabetischer Reihenfolge:")
names.sort()
for name in names:
  print(name)
```

<sample-output>

['Marlyn', 'Ruth', 'Paul']
['Marlyn', 'Ruth', 'Paul', 'David']
Anzahl der Namen auf der Liste: 4
Namen in alphabetischer Reihenfolge:
David
Marlyn
Paul
Ruth

</sample-output>

Gleitkommazahlen (Floats) sind ebenfalls gültige Listenelemente:

```python
measurements = [-2.5, 1.1, 7.5, 14.6, 21.0, 19.2]

for measure in measurements:
    print(measure)

mean = sum(measurements) / len(measurements)

print("Der Mittelwert ist:", mean)
```

<sample-output>

-2.5
1.1
7.5
14.6
21.0
19.2
Der Mittelwert ist: 10.15

</sample-output>

<!--eine ähnliche Warnung befindet sich in den Abschnitten 3-4, 4-6 und 5-1, bitte alle prüfen, falls dies geändert wird-->
## Erinnerung: Verwendung globaler Variablen innerhalb von Funktionen

Wir wissen, dass es möglich ist, neue Variablen innerhalb von Funktionsdefinitionen zuzuweisen, aber die Funktion kann auch Variablen sehen, die außerhalb von ihr, im Hauptprogramm, zugewiesen wurden. Solche Variablen werden _globale_ Variablen genannt.

Die Verwendung globaler Variablen innerhalb von Funktionen ist in der Regel eine schlechte Idee. Unter anderem kann dies zu Fehlern führen, die schwer nachzuverfolgen sind.

Unten ist ein Beispiel für eine Funktion, die "aus Versehen" eine globale Variable verwendet:

```python
def print_reversed(names: list):
    # Verwendung der globalen Variable statt des Parameters aus Versehen
    i = len(name_list) - 1
    while i >= 0:
        print(name_list[i])
        i -= 1

# Hier wird die globale Variable zugewiesen
name_list = ["Steve", "Jean", "Katherine", "Paul"]
print_reversed(name_list)
print()
print_reversed(["Huey", "Dewey", "Louie"])
```

<sample-output>

Paul
Katherine
Jean
Steve

Paul
Katherine
Jean
Steve

</sample-output>

Obwohl beide Funktionsaufrufe die richtige Art von Argument haben, gibt die Funktion immer das aus, was in der globalen Variable `name_list` gespeichert ist.

Um die Sache noch unübersichtlicher zu machen, denken Sie daran, dass der gesamte Code zum Testen Ihrer Funktionen für die automatischen Tests innerhalb des `if __name__ == "__main__":`-Blocks platziert werden sollte. Das vorherige Beispiel sollte modifiziert werden:

```python
def print_reversed(names: list):
    # Verwendung der globalen Variable statt des Parameters aus Versehen
    i = len(name_list) - 1
    while i>=0:
        print(name_list[i])
        i -= 1

# Der gesamte Code zum Testen der Funktion sollte in diesem Block stehen
if __name__ == "__main__":
    # Hier wird die globale Variable zugewiesen
    name_list = ["Steve", "Jean", "Katherine", "Paul"]
    print_reversed(name_list)
    print()
    print_reversed(["Huey", "Dewey", "Louie"])
```

Beachten Sie, dass die globale Variable jetzt innerhalb des `if`-Blocks zugewiesen wird.

Die automatischen Tests im TMC-System werden ausgeführt, ohne den Code im `if`-Block auszuführen. In diesem letzteren Beispiel würde die Funktion also nicht einmal theoretisch funktionieren, da sie sich auf die Variable `name_list` bezieht, die gar nicht existiert, wenn die Tests ausgeführt werden.

## Warnung: Überschreiben eines Parameters und zu frühes Zurückkehren

Es gibt ein paar neuartige Fehlerquellen, die wir uns ansehen sollten, bevor wir zu den Übungen in diesem Teil springen. Schauen wir uns eine Funktion an, die uns sagt, ob eine Ganzzahl in einer Liste gefunden wird. Beide sind als Parameter der Funktion definiert:

```python
def number_in_list(numbers: list, number: int):
    for number in numbers:
        if number == number:
            return True
        else:
            return False
```

Diese Funktion scheint immer `True` zurückzugeben. Der Grund dafür ist, dass die `for`-Schleife den im Parameter `number` gespeicherten Wert überschreibt. Daher ist die Bedingung in der `if`-Anweisung immer wahr.

Das Umbenennen des Parameters löst das Problem:

```python
def number_in_list(numbers: list, searched_number: int):
    for number in numbers:
        if number == searched_number:
            return True
        else:
            return False
```

Jetzt sieht die Bedingung in der `if`-Anweisung besser aus. Aber es gibt ein neues Problem, da die Funktion immer noch nicht korrekt zu funktionieren scheint. Das Ausprobieren des Folgenden offenbart einen Fehler:

```python
found = number_in_list([1, 2, 3, 4], 3)
print(found)  # gibt False aus
```

Das Problem hier ist, dass die Funktion zu früh zurückkehrt, ohne alle Zahlen in der Liste zu prüfen. Tatsächlich nimmt die Funktion nur das erste Element in der Liste und gibt `True` oder `False` zurück, abhängig von seinem Wert. Wir können nicht wissen, ob eine Zahl _nicht_ in der Liste vorhanden ist, bis wir alle Elemente in der Liste geprüft haben. Der Befehl `return False` sollte außerhalb der `for`-Schleife platziert werden:

```python
def number_in_list(numbers: list, searched_number: int):
    for number in numbers:
        if number == searched_number:
            return True

    return False
```

Schauen wir uns eine weitere fehlerhafte Funktion an:

```python
def unique_numbers(numbers: list):
    # eine Hilfsvariable, um alle bereits geprüften Zahlen zu speichern
    numbers = []
    for number in numbers:
        # haben wir diese Zahl bereits gesehen?
        if number in numbers:
            return False
        numbers.append(number)

    return True

unique = unique_numbers([1, 2, 2])
print(unique)  # gibt True aus
```

Diese Funktion soll prüfen, ob alle Zahlen in einer Liste voneinander verschieden sind, aber sie gibt immer `True` zurück.

Hier überschreibt die Funktion wieder aus Versehen den in ihrem Parameter gespeicherten Wert. Die Funktion versucht, die Variable `numbers` zu verwenden, um alle bereits geprüften Zahlen zu speichern, aber dies überschreibt die ursprüngliche Argumentliste. Das Umbenennen der Hilfsvariablen ist eine einfache Lösung:

```python
def unique_numbers(numbers: list):
    # eine Hilfsvariable, um alle bereits geprüften Zahlen zu speichern
    numbers_checked = []
    for number in numbers:
        # haben wir diese Zahl bereits gesehen?
        if number in numbers_checked:
            return False
        numbers_checked.append(number)

    return True

unique = unique_numbers([1, 2, 2])
print(unique)  # gibt False aus
```

Probleme wie dieses und viele andere können mit Hilfe des Debuggers oder des [Visualisierungstools](http://www.pythontutor.com/visualize.html#mode=edit) lokalisiert und behoben werden. Es kann nicht genug betont werden, wie wichtig es ist, diese effizient nutzen zu lernen.

<programming-exercise name='Die längste Zeichenkette' tmcname='part05-01_longest_string'>

Bitte schreiben Sie eine Funktion namens `longest(strings: list)`, die eine Liste von Zeichenketten als Argument erhält. Die Funktion findet und gibt die längste Zeichenkette in der Liste zurück. Sie können davon ausgehen, dass es immer eine einzige längste Zeichenkette in der Liste gibt.

Ein Beispiel für das erwartete Verhalten:

```python

if __name__ == "__main__":
    strings = ["hi", "hiya", "hello", "howdydoody", "hi there"]
    print(longest(strings))

```

<sample-output>

howdydoody

</sample-output>

</programming-exercise>

## Listen in Listen

Die Elemente in einer Liste können selbst Listen sein:

```python
my_list = [[5, 2, 3], [4, 1], [2, 2, 5, 1]]
print(my_list)
print(my_list[1])
print(my_list[1][0])
```
<sample-output>

[[5, 2, 3], [4, 1], [2, 2, 5, 1]]
[4, 1]
4

</sample-output>

Warum sollten Listen in Listen nützlich sein?

Denken Sie daran, dass Listen Elemente verschiedener Typen enthalten können. Sie könnten Informationen über eine Person in einer Liste speichern. Zum Beispiel könnten Sie ihren Namen als erstes Element, ihr Alter als zweites Element und ihre Größe in Metern als drittes Element aufnehmen:

```python
["Anne", 12, 1.45]
```

Eine Datenbank von Personen könnte dann eine Liste sein, deren Elemente Listen sind, die Informationen über eine einzelne Person enthalten:

```python
persons = [["Betty", 10, 1.37], ["Peter", 7, 1.25], ["Emily", 32, 1.64], ["Alan", 39, 1.78]]

for person in persons:
  name = person[0]
  age = person[1]
  height = person[2]
  print(f"{name}: Alter {age} Jahre, Größe {height} Meter")
```

<sample-output>

Betty: Alter 10 Jahre, Größe 1.37 Meter
Peter: Alter 7 Jahre, Größe 1.25 Meter
Emily: Alter 32 Jahre, Größe 1.64 Meter
Alan: Alter 39 Jahre, Größe 1.78 Meter

</sample-output>

Die `for`-Schleife geht die Elemente in der äußeren Liste nacheinander durch. Das heißt, jede Liste, die Informationen über eine einzelne Person enthält, wird nacheinander der Variable `person` zugewiesen.

Listen sind nicht immer der beste Weg, um Daten wie Informationen über eine Person darzustellen. Wir werden bald auf Python-_Dictionaries_ stoßen, die für solche Situationen oft besser geeignet sind.

## Matrizen

Ein zweidimensionales Array oder eine _Matrix_ ist ebenfalls eine natürliche Anwendung einer Liste in einer Liste.

Zum Beispiel könnte die folgende Matrix

<img src="5_1_1.png">

in Python als zweidimensionale Liste wie folgt dargestellt werden:

```python
my_matrix = [[1, 2, 3], [3, 2, 1], [4, 5, 6]]
```

Da eine Matrix eine Liste ist, die Listen enthält, kann auf die einzelnen Elemente innerhalb der Matrix mit aufeinanderfolgenden eckigen Klammern zugegriffen werden. Der erste Index bezieht sich auf die Zeile, der zweite auf die Spalte. Die Indizierung beginnt bei Null, so bezieht sich zum Beispiel `my_matrix[0][1]` auf das zweite Element in der ersten Zeile.

```python
my_matrix = [[1, 2, 3], [3, 2, 1], [4, 5, 6]]

print(my_matrix[0][1])
my_matrix[1][0] = 10
print(my_matrix)
```

<sample-output>

2
[[1, 2, 3], [10, 2, 1], [4, 5, 6]]

</sample-output>

Wie jede andere Liste können die Zeilen der Matrix mit einer `for`-Schleife durchlaufen werden. Der folgende Code gibt jede Zeile der Matrix in einer separaten Zeile aus:

```python
my_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in my_matrix:
    print(row)
```

<sample-output>

[1, 2, 3]
[4, 5, 6]
[7, 8, 9]

</sample-output>

Ebenso können verschachtelte Schleifen verwendet werden, um auf die einzelnen Elemente zuzugreifen. Der folgende Code gibt jedes Element in der Matrix mit Hilfe von zwei `for`-Schleifen in einer separaten Zeile aus:

```python
my_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in my_matrix:
    print("eine neue Zeile")
    for element in row:
        print(element)
```

<sample-output>

eine neue Zeile
1
2
3
eine neue Zeile
4
5
6
eine neue Zeile
7
8
9

</sample-output>

## Visualisierung von Code mit Listen in Listen

Programme, die Listen in Listen enthalten, können sich auf den ersten Blick schwer fassbar anfühlen. Das [Visualisierungstool](http://www.pythontutor.com/visualize.html) von Python Tutor ist eine große Hilfe beim Verständnis ihrer Funktionsweise. Das Folgende ist eine Visualisierung des obigen Beispiels:

<img src="5_1_2.png">

Das obige Bild zeigt, dass eine 3x3-Matrix technisch gesehen aus vier Listen besteht. Die erste Liste repräsentiert die gesamte Matrix. Die drei verbleibenden Listen sind Elemente in der ersten Liste und repräsentieren die Zeilen.

Da mehrdimensionale Listen mit verschachtelten Schleifen durchlaufen werden können, wäre es natürlich zu denken, dass die Listen selbst verschachtelt sind, aber das obige Bild zeigt uns, dass dies eigentlich nicht so ist. Stattdessen "zeigt" die Liste, die die gesamte Matrix repräsentiert, auf jede einzelne Liste, die eine Zeile in der Matrix repräsentiert. Dies wird als _Referenz_ bezeichnet, und im [folgenden Abschnitt](/part-5/2-references) wird diese Idee gründlicher untersucht.

Im obigen Bild ist die Ausführung bis zur zweiten Zeile der Matrix fortgeschritten, und diese Liste ist das, worauf die Variable `row` derzeit verweist. Die Variable `element` enthält das Element, bei dem sich die Ausführung gerade befindet. Der in `element` gespeicherte Wert ist das mittlere Element in der Liste, d.h. 5.

## Zugriff auf Elemente in einer Matrix

Der Zugriff auf eine einzelne Zeile innerhalb einer Matrix ist einfach - wählen Sie einfach die gewünschte Zeile aus. Die folgende Funktion berechnet die Summe der Elemente in einer gewählten Zeile:

```python
def sum_of_row(my_matrix, row_no: int):
    # wähle die gewünschte Zeile innerhalb der Matrix aus
    row = my_matrix[row_no]
    row_sum = 0
    for item in row:
        row_sum += item

    return row_sum

m = [[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]

my_sum = sum_of_row(m, 1)
print(my_sum) # gibt 33 aus (was 9 + 1 + 12 + 11 entspricht)
```

Die Arbeit mit Spalten innerhalb einer Matrix ist etwas komplizierter, da die Matrix zeilenweise gespeichert wird: 

```python
def sum_of_column(my_matrix, column_no: int):
    # gehe jede Zeile durch und wähle das Element an der gewählten Position aus
    column_sum = 0
    for row in my_matrix:
        column_sum += row[column_no]

    return column_sum

m = [[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]

my_sum = sum_of_column(m, 2)
print(my_sum) # gibt 39 aus (was 3 + 12 + 9 + 15 entspricht)
```

Die hier behandelte Spalte besteht aus den Elementen an Index 2 in _jeder Zeile_.

[Das Visualisierungstool](http://www.pythontutor.com/visualize.html) wird definitiv empfohlen, um zu verstehen, wie diese Funktionen arbeiten.

Das Ändern des Wertes eines einzelnen Elements innerhalb der Matrix ist einfach: Wählen Sie eine Zeile innerhalb der Matrix und dann eine Spalte innerhalb der Zeile:

```python
def change_value(my_matrix, row_no: int, column_no: int, new_value: int):
    # wähle die gewünschte Zeile aus
    row = my_matrix[row_no]
    # wähle das korrekte Element innerhalb der Zeile aus
    row[column_no] = new_value

m = [[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]

print(m)
change_value(m, 2, 3, 1000)
print(m)
```

<sample-output>

[[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]
[[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 1000], [2, 9, 15, 1]]

</sample-output>

Beachten Sie, wie wir oben die Indizes der Zeile und Spalte verwendet haben, um auf ein ausgewähltes Element zuzugreifen. Wenn wir den Inhalt der Matrix ändern wollen, müssen wir auf die Elemente über ihre Indizes zugreifen. Das bedeutet, dass wir keine einfache `for item in list`-Schleife verwenden können, um die Matrix zu durchlaufen, wenn wir den Inhalt der Matrix ändern wollen.

Stattdessen müssen wir die Indizes der Elemente im Auge behalten, zum Beispiel mit einer `while`-Schleife oder einer `for`-Schleife unter Verwendung der `range`-Funktion. Der folgende Code erhöht den Wert jedes Elements in der Matrix um eins:

```python
m = [[1,2,3], [4,5,6], [7,8,9]]

for i in range(len(m)): # Verwendung der Anzahl der Zeilen in der Matrix
    for j in range(len(m[i])): # Verwendung der Anzahl der Elemente in jeder Zeile 
        m[i][j] += 1

print(m)
```

<sample-output>

[[2, 3, 4], [5, 6, 7], [8, 9, 10]]

</sample-output>

Die äußere Schleife durchläuft die Indizes von Null bis zur Länge der Matrix, d.h. die Anzahl der Zeilen in der Matrix. Die innere Schleife durchläuft die Indizes von Null bis zur Länge jeder Zeile innerhalb der Matrix.

<programming-exercise name='Anzahl der passenden Elemente' tmcname='part05-02_number_of_elements'>

Bitte schreiben Sie eine Funktion namens `count_matching_elements(my_matrix: list, element: int)`, die ein zweidimensionales Array von Ganzzahlen und einen einzelnen Ganzzahlwert als Argumente erhält. Die Funktion zählt dann, wie viele Elemente innerhalb der Matrix mit dem Argumentwert übereinstimmen.

Ein Beispiel für die Funktionsweise:

```python
m = [[1, 2, 1], [0, 3, 4], [1, 0, 0]]
print(count_matching_elements(m, 1))
```

<sample-output>

3

</sample-output>

</programming-exercise>

## Ein zweidimensionales Array als Datenstruktur in einem Spiel

Eine Matrix kann eine sehr nützliche Datenstruktur in vielen verschiedenen Spielen sein. Zum Beispiel kann das Gitter eines Sudoku-Spiels im Bild unten

<img src="5_1_3.png">

in Matrixform wie folgt dargestellt werden:

```python
sudoku = [
  [9, 0, 0, 0, 8, 0, 3, 0, 0],
  [0, 0, 0, 2, 5, 0, 7, 0, 0],
  [0, 2, 0, 3, 0, 0, 0, 0, 4],
  [0, 9, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 3, 0, 5, 6, 0],
  [7, 0, 5, 0, 6, 0, 4, 0, 0],
  [0, 0, 7, 8, 0, 3, 9, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 2]
]
```

Hier repräsentiert der Wert Null ein leeres Quadrat, da Null kein akzeptabler Wert in einem fertigen Sudoku-Rätsel ist.

Hier ist eine einfache Funktion zum Ausdrucken des obigen Sudoku-Gitters:

```python
def print_grid(sudoku):
    for row in sudoku:
        for square in row:
            if square > 0:
                print(f" {square}", end="")
            else:
                print(" _", end="")
        print()

print_grid(sudoku)
```

Der Ausdruck sollte so aussehen:

```x

 9 _ _ _ 8 _ 3 _ _
 _ _ _ 2 5 _ 7 _ _
 _ 2 _ 3 _ _ _ _ 4
 _ 9 4 _ _ _ _ _ _
 _ _ _ 7 3 _ 5 6 _
 7 _ 5 _ 6 _ 4 _ _
 _ _ 7 8 _ 3 9 _ _
 _ _ 1 _ _ _ _ _ 3
 3 _ _ _ _ _ _ _ 2

```

Jedes gängige Spiel mit einem Spielbrett-Layout kann auf ähnliche Weise modelliert werden. Unter anderem basieren Schach, Minesweeper, Schiffe versenken oder Mastermind alle auf einem zweidimensionalen Gitter. Für Sudoku ist es natürlich, Zahlen zur Darstellung des Spielzustands zu verwenden, aber für andere Spiele können andere Methoden besser geeignet sein.

<programming-exercise name='Go' tmcname='part05-03_go'>

In einem Go-Spiel platzieren zwei Spieler abwechselnd schwarze und weiße Steine auf einem Spielbrett. Gewinner ist der Spieler, dem es gelingt, mit seinen eigenen Spielsteinen eine größere Fläche auf dem Brett einzukreisen. 

Bitte schreiben Sie eine Funktion namens `who_won(game_board: list)`, die ein zweidimensionales Array als Argument erhält. Das Array besteht aus Ganzzahlwerten, die die folgenden Situationen darstellen:

* 0: leeres Quadrat
* 1: Spielstein von Spieler 1
* 2: Spielstein von Spieler 2

Die Scoring-Regeln von Go können recht komplex sein, aber in dieser Übung reicht es aus, die Anzahl der Steine zu vergleichen, die jeder Spieler auf dem Spielbrett hat. Außerdem ist die Größe des Spielbretts nicht begrenzt.

Die Funktion sollte den Wert 1 zurückgeben, wenn Spieler 1 gewonnen hat, und den Wert 2, wenn Spieler 2 gewonnen hat. Wenn beide Spieler die gleiche Anzahl an Steinen auf dem Brett haben, sollte die Funktion den Wert 0 zurückgeben.

</programming-exercise>

<programming-exercise name='Sudoku: Zeile prüfen' tmcname='part05-04_sudoku_row'>

Bitte schreiben Sie eine Funktion namens `row_correct(sudoku: list, row_no: int)`, die ein zweidimensionales Array, das ein Sudoku-Gitter darstellt, und eine Ganzzahl, die sich auf eine einzelne Zeile bezieht, als Argumente erhält. Zeilen sind ab 0 indiziert.

Die Funktion sollte `True` oder `False` zurückgeben, je nachdem, ob die Zeile korrekt ausgefüllt ist, d.h. ob sie jede der Zahlen 1 bis 9 höchstens einmal enthält.

```python
sudoku = [
  [9, 0, 0, 0, 8, 0, 3, 0, 0],
  [2, 0, 0, 2, 5, 0, 7, 0, 0],
  [0, 2, 0, 3, 0, 0, 0, 0, 4],
  [2, 9, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 3, 0, 5, 6, 0],
  [7, 0, 5, 0, 6, 0, 4, 0, 0],
  [0, 0, 7, 8, 0, 3, 9, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 2]
]

print(row_correct(sudoku, 0))
print(row_correct(sudoku, 1))
```

<sample-output>

True
False

</sample-output>

</programming-exercise>

<programming-exercise name='Sudoku: Spalte prüfen' tmcname='part05-05_sudoku_column'>

Bitte schreiben Sie eine Funktion namens `column_correct(sudoku: list, column_no: int)`, die ein zweidimensionales Array, das ein Sudoku-Gitter darstellt, und eine Ganzzahl, die sich auf eine einzelne Spalte bezieht, als Argumente erhält. Spalten sind ab 0 indiziert. 

Die Funktion sollte `True` oder `False` zurückgeben, je nachdem, ob die Spalte korrekt ausgefüllt ist, d.h. ob sie jede der Zahlen 1 bis 9 höchstens einmal enthält.

```python
sudoku = [
  [9, 0, 0, 0, 8, 0, 3, 0, 0],
  [2, 0, 0, 2, 5, 0, 7, 0, 0],
  [0, 2, 0, 3, 0, 0, 0, 0, 4],
  [2, 9, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 3, 0, 5, 6, 0],
  [7, 0, 5, 0, 6, 0, 4, 0, 0],
  [0, 0, 7, 8, 0, 3, 9, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 2]
]

print(column_correct(sudoku, 0))
print(column_correct(sudoku, 1))
```

<sample-output>

False
True

</sample-output>

</programming-exercise>

<programming-exercise name='Sudoku: Block prüfen' tmcname='part05-06_sudoku_block'>

Bitte schreiben Sie eine Funktion namens `block_correct(sudoku: list, row_no: int, column_no: int)`, die ein zweidimensionales Array, das ein Sudoku-Gitter darstellt, und zwei Ganzzahlen, die sich auf die Zeilen- und Spaltenindizes eines einzelnen Quadrats beziehen, als Argumente erhält. Zeilen und Spalten sind ab 0 indiziert. 

Die Funktion sollte `True` oder `False` zurückgeben, je nachdem, ob der 3x3-Block rechts und unterhalb der angegebenen Indizes korrekt ausgefüllt ist. Das heißt, ob der Block jede der Zahlen 1 bis 9 höchstens einmal enthält.

Beachten Sie, dass diese Funktion nicht strikt den Regeln von Sudoku folgt. In einem echten Sudoku-Spiel gibt es nur 9 Blöcke zu prüfen, und diese befinden sich an den Indizes (0, 0), (0, 3), (0, 6), (3, 0), (3, 3), (3, 6), (6, 0), (6, 3) und (6, 6). Solche Einschränkungen der Indizes sollten hier nicht implementiert werden.

```python
sudoku = [
  [9, 0, 0, 0, 8, 0, 3, 0, 0],
  [2, 0, 0, 2, 5, 0, 7, 0, 0],
  [0, 2, 0, 3, 0, 0, 0, 0, 4],
  [2, 9, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 3, 0, 5, 6, 0],
  [7, 0, 5, 0, 6, 0, 4, 0, 0],
  [0, 0, 7, 8, 0, 3, 9, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 2]
]

print(block_correct(sudoku, 0, 0))
print(block_correct(sudoku, 1, 2))
```

<sample-output>

False
True

</sample-output>

Der erste Funktionsaufruf sollte den 3x3-Block prüfen, der mit dem Quadrat an den Indizes `0, 0` beginnt:

<pre>
9 0 0
2 0 0
0 2 0
</pre>

Der zweite Funktionsaufruf sollte den 3x3-Block prüfen, der mit dem Quadrat in Zeile 1, Spalte 2 beginnt:

<pre>
0 2 5
0 3 0
4 0 0
</pre>

Dieser zweite Block würde in einem tatsächlichen Sudoku-Spiel nicht geprüft werden, aber Ihre Funktion sollte es ermöglichen, ihn zu prüfen.

</programming-exercise>

<programming-exercise name='Sudoku: Gitter prüfen' tmcname='part05-07_sudoku_grid'>

Bitte schreiben Sie eine Funktion namens `sudoku_grid_correct(sudoku: list)`, die ein zweidimensionales Array, das ein Sudoku-Gitter darstellt, als Argument erhält. Die Funktion sollte die Funktionen aus den drei vorherigen Übungen verwenden, um festzustellen, ob das komplette Sudoku-Gitter korrekt ausgefüllt ist. Kopieren Sie die Funktionen aus den obigen Übungen in Ihre Python-Codedatei für diese Übung.

Die Funktion sollte jede der neun Zeilen, Spalten und 3x3-Blöcke im Gitter prüfen. Wenn alle jede der Zahlen 1 bis 9 höchstens einmal enthalten, gibt die Funktion `True` zurück. Wenn ein einzelner Block falsch ausgefüllt ist, gibt die Funktion `False` zurück. 

Das Bild eines Sudoku-Gitters über diesen Übungen zeigt die neun Blöcke innerhalb des Gitters mit dickeren Rändern an. Dies sind die Blöcke, die die Funktion prüfen sollte, und sie beginnen bei den Indizes (0, 0), (0, 3), (0, 6), (3, 0), (3, 3), (3, 6), (6, 0), (6, 3) und (6, 6). 

```python
sudoku1 = [
  [9, 0, 0, 0, 8, 0, 3, 0, 0],
  [2, 0, 0, 2, 5, 0, 7, 0, 0],
  [0, 2, 0, 3, 0, 0, 0, 0, 4],
  [2, 9, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 3, 0, 5, 6, 0],
  [7, 0, 5, 0, 6, 0, 4, 0, 0],
  [0, 0, 7, 8, 0, 3, 9, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 2]
]

print(sudoku_grid_correct(sudoku1))

sudoku2 = [
  [2, 6, 7, 8, 3, 9, 5, 0, 4],
  [9, 0, 3, 5, 1, 0, 6, 0, 0],
  [0, 5, 1, 6, 0, 0, 8, 3, 9],
  [5, 1, 9, 0, 4, 6, 3, 2, 8],
  [8, 0, 2, 1, 0, 5, 7, 0, 6],
  [6, 7, 4, 3, 2, 0, 0, 0, 5],
  [0, 0, 0, 4, 5, 7, 2, 6, 3],
  [3, 2, 0, 0, 8, 0, 0, 5, 7],
  [7, 4, 5, 0, 0, 3, 9, 0, 1]
]

print(sudoku_grid_correct(sudoku2))
```

<sample-output>

False
True

</sample-output>

</programming-exercise>
