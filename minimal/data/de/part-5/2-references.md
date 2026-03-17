---
path: '/part-5/2-references'
title: 'Referenzen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was mit einer Referenz auf eine Variable gemeint ist
- werden Sie verstehen, dass es mehrere Referenzen auf dasselbe Objekt geben kann
- werden Sie in der Lage sein, Listen als Parameter in Funktionen zu verwenden
- werden Sie wissen, was mit einem Seiteneffekt einer Funktion gemeint ist

</text-box>

Bisher haben wir uns eine Variable als eine Art "Box" vorgestellt, die den Wert der Variable enthält. Technisch gesehen stimmt das in Python nicht ganz. Was in einer Variable gespeichert wird, ist nicht der Wert an sich, sondern eine _Referenz_ auf das _Objekt_, welches den eigentlichen Wert der Variable darstellt. Das Objekt kann z.B. eine Zahl, eine Zeichenkette oder eine Liste sein.

In der Praxis bedeutet dies, dass der Wert der Variable _nicht_ in der Variable selbst gespeichert wird. Stattdessen gibt es Informationen über den Ort im Arbeitsspeicher des Computers, an dem der Wert zu finden ist.

Eine Referenz wird oft durch einen Pfeil von der Variable zum tatsächlichen Wert im Speicher dargestellt:

<img src="5_2_1.png">

Eine Referenz sagt uns also, wo der Wert zu finden ist. Die Funktion `id` kann verwendet werden, um den genauen Ort herauszufinden, auf den die Variable zeigt:

```python
a = [1, 2, 3]
print(id(a))
b = "Dies ist ebenfalls eine Referenz"
print(id(b))
```

<sample-output>

4538357072
4537788912

</sample-output>

Die Referenz oder die ID der Variable ist eine Ganzzahl, die man sich als die Adresse im Arbeitsspeicher vorstellen kann, an der der Wert der Variable gespeichert ist. Wenn Sie den obigen Code auf Ihrem eigenen Computer ausführen, wird das Ergebnis wahrscheinlich anders aussehen, da Ihre Variablen auf andere Orte zeigen werden - die Referenzen werden unterschiedlich sein.

Das Python Tutor Visualisierungstool zeigt Referenzen ebenfalls als Pfeile von der Variable zum tatsächlichen Inhalt an, wie wir im [vorherigen Abschnitt](/part-5/1-more-lists#visualising-code-containing-lists-within-lists) gesehen haben. Das Tool "schummelt" jedoch ein wenig bei Zeichenketten (Strings). Es stellt Strings so dar, als ob sie in den Variablen selbst gespeichert wären:

<img src="5_2_2.png">

In Wirklichkeit werden Python-Strings ganz ähnlich wie Listen behandelt, mit Referenzen auf Orte im Speicher.

Viele der eingebauten Typen in Python, wie `str`, sind _unveränderlich_ (immutable). Das bedeutet, dass der Wert des Objekts oder ein Teil davon nicht geändert werden kann. Der Wert kann nur durch einen neuen Wert ersetzt werden:

<img src="5_2_3.png">

Einige Python-Typen sind _veränderlich_ (mutable). Zum Beispiel kann sich der Inhalt einer Liste ändern, ohne dass eine komplett neue Liste erstellt werden muss:

<img src="5_2_4.png">

Es mag Sie überraschen, dass auch die Basisdatentypen `int`, `float` und `bool` in Python unveränderlich sind. Schauen wir uns das folgende Stück Code an:

```python
number = 1
number = 2
number += 10
```

Es scheint, dass die obigen Befehle nur den in der Variable gespeicherten Wert ändern, aber tatsächlich erzeugt jeder Befehl eine komplett neue Zahl im Speicher des Computers.

Die Ausgabe des folgenden Programms verdeutlicht die Situation:

```python
number = 1
print(id(number))
number += 10
print(id(number))
a = 1
print(id(a))
```

<sample-output>

4535856912
4535856944
4535856912

</sample-output>

Zuerst zeigt die Variable `number` auf den Speicherort 4535856912. Wenn `number` ein neuer Wert zugewiesen wird, zeigt sie auf den Ort 4535856944. Wenn nun der Variable `a` der Wert 1 zugewiesen wird, zeigt `a` auf genau denselben Ort, auf den `number` zeigte, als ihr ebenfalls der Wert 1 zugewiesen war.

Es scheint, dass Python den Wert 1 am Speicherort 4535856912 gespeichert hat. Wann immer einer Variable der Wert 1 zugewiesen wird, _referenziert_ sie diesen Ort im Arbeitsspeicher.

Es ist gut im Hinterkopf zu behalten, dass in Python _fast alles eine Referenz_ ist, aber all dies ist für alltägliche Programmieraufgaben selten relevant. Kehren wir also zu praktischeren Dingen zurück.

## Mehrere Referenzen auf dieselbe Liste

Was passiert eigentlich, wenn Sie eine Listenvariable einer neuen Variable zuweisen - wird die Liste kopiert?

```python
a = [1, 2, 3]
b = a
b[0] = 10
```

Die Zuweisung `b = a` kopiert den in der Variable `a` gespeicherten Wert in die Variable `b`. Der in `a` gespeicherte Wert ist jedoch nicht die Liste _selbst_, sondern eine _Referenz_ auf die Liste.

Die Zuweisung `b = a` kopiert also die Referenz. Als Ergebnis gibt es nun zwei Referenzen auf denselben Speicherort, der die Liste enthält.

<img src="5_2_5.png">

Auf die Liste kann über jede der beiden Referenzen zugegriffen werden:

```python
list1 = [1, 2, 3, 4]
list2 = list1

list1[0] = 10
list2[1] = 20

print(list1)
print(list2)
```

<sample-output>

[10, 20, 3, 4]
[10, 20, 3, 4]

</sample-output>

Wenn es mehr als eine Referenz auf dieselbe Liste gibt, kann jede der Referenzen verwendet werden, um auf die Liste zuzugreifen. Andererseits wirkt sich eine Änderung, die über eine der Referenzen vorgenommen wird, auch auf die anderen Referenzen aus, da ihr Ziel dasselbe ist.

Das Visualisierungstool ist wieder sehr nützlich, um herauszufinden, was passiert:

<img src="5_2_6.png">

## Kopieren einer Liste

Wenn Sie eine tatsächliche separate Kopie einer Liste erstellen möchten, können Sie eine neue Liste erstellen und jedes Element der ursprünglichen Liste nacheinander hinzufügen:

```python
my_list = [1, 2, 3, 3, 5]

new_list = []
for item in my_list:
    new_list.append(item)

new_list[0] = 10
new_list.append(6)
print("das Original:", my_list)
print("die Kopie:", new_list)
```

<sample-output>

my_list [1, 2, 3, 3, 5]
new_list [10, 2, 3, 3, 5, 6]

</sample-output>

Ein Schnappschuss des Kopierprozesses im Visualisierungstool:

<img src="5_2_7.png">

Die Variable `new_list` zeigt auf eine andere Liste als die Variable `my_list`.

Ein einfacherer Weg, eine Liste zu kopieren, ist der Klammeroperator `[]`, den wir zuvor für Slices verwendet haben. Die Notation `[:]` wählt alle Elemente in der Sammlung aus. Als Seiteneffekt wird eine Kopie der Liste erstellt:

```python
my_list = [1,2,3,4]
new_list = my_list[:]

my_list[0] = 10
new_list[1] = 20

print(my_list)
print(new_list)
```

<sample-output>

[10, 2, 3, 4]
[1, 20, 3, 4]

</sample-output>

## Verwendung von Listen als Parameter in Funktionen

Wenn Sie eine Liste als Argument an eine Funktion übergeben, übergeben Sie eine Referenz auf diese Liste. Das bedeutet, dass die Funktion die Liste direkt verändern kann.

Die folgende Funktion nimmt eine Liste als Argument und fügt am Ende der Liste ein neues Element hinzu:

```python
def add_item(my_list: list):
    new_item = 10
    my_list.append(new_item)

a_list = [1,2,3]
print(a_list)
add_item(a_list)
print(a_list)
```

<sample-output>
[1, 2, 3]
[1, 2, 3, 10]
</sample-output>

Beachten Sie, dass die Funktion `add_item` keinen Rückgabewert hat. Sie ändert nur die Liste, die sie als Argument erhält.

Das Visualisierungstool kann Ihnen helfen zu verstehen, was hier passiert:

<img src="5_2_8.png">

_Global frame_ bezieht sich auf die im Hauptprogramm definierten Variablen, während der *add_item*-Frame mit blauem Hintergrund die Parameter und Variablen innerhalb dieser Funktion darstellt. Wie Sie in der Visualisierung sehen können, bezieht sich die Funktion `add_item` auf genau dieselbe Liste wie das Hauptprogramm. Die innerhalb der Funktion `add_item` vorgenommenen Änderungen wirken sich auch auf das Hauptprogramm aus.

Eine andere Möglichkeit, diese Funktionalität zu implementieren, wäre, eine neue Liste innerhalb der Funktion zu erstellen und diese zurückzugeben:

```python
def add_item(my_list: list) -> list:
    new_item = 10
    my_list_copy = my_list[:]
    my_list_copy.append(new_item)
    return my_list_copy

numbers = [1, 2, 3]
numbers2 = add_item(numbers)

print("Original-Liste:", numbers)
print("neue Liste:", numbers2)
```

<sample-output>

Original-Liste: [1, 2, 3]
neue Liste: [1, 2, 3, 10]

</sample-output>

Wenn Sie sich nicht absolut sicher sind, ob Sie verstehen, was im obigen Code passiert, gehen Sie ihn bitte im Visualisierungstool durch.

## Bearbeiten einer Liste, die als Argument übergeben wurde

Das Folgende ist ein Versuch einer Funktion, die jedes Element in einer Liste um zehn erhöhen soll:

```python
def augment_all(my_list: list):
    new_list = []
    for item in my_list:
        new_list.append(item + 10)
    my_list = new_list

numbers = [1, 2, 3]
print("am Anfang:", numbers)
augment_all(numbers)
print("nach Ausführung der Funktion:", numbers)
```

<sample-output>

am Anfang: [1, 2, 3]
nach Ausführung der Funktion: [1, 2, 3]

</sample-output>

Aus irgendeinem Grund funktioniert die Funktion nicht. Was ist also los?

Die Funktion nimmt eine _Referenz_ auf eine Liste als Argument entgegen. Diese wird in der Variable `my_list` gespeichert. Die Zuweisung `my_list = new_list` weist derselben Variable einen neuen Wert zu. Die Variable `my_list` zeigt nun auf die neue, innerhalb der Funktion erstellte Liste, und die Referenz auf die ursprüngliche Liste ist innerhalb der Funktion nicht mehr verfügbar. Diese Zuweisung hat jedoch keine Auswirkungen außerhalb der Funktion.

Darüber hinaus ist die Variable `new_list`, welche die neuen, erhöhten Werte enthält, von außerhalb der Funktion nicht zugänglich. Sie geht "verloren", sobald die Ausführung der Funktion beendet ist und der Fokus zum Hauptprogramm zurückkehrt. Die Variable `numbers` im Hauptprogramm zeigt immer auf die ursprüngliche Liste.

Das Visualisierungstool ist auch hier Ihr Freund. Bitte gehen Sie die Schritte sorgfältig durch und sehen Sie, wie die ursprüngliche Liste durch die Ausführung der Funktion überhaupt nicht beeinflusst wird:

<img src="5_2_10.png">

Eine Möglichkeit, dies zu beheben, besteht darin, alle Elemente aus der neuen Liste nacheinander in die alte Liste zu kopieren:

```python
def augment_all(my_list: list):
    new_list = []
    for item in my_list:
        new_list.append(item + 10)

    # kopiere Elemente aus der neuen Liste in die alte Liste
    for i in range(len(my_list)):
        my_list[i] = new_list[i]
```

Python hat auch eine praktische Kurzschreibweise, um mehreren Elementen in einer Sammlung gleichzeitig Werte zuzuweisen:

```python
>>> my_list = [1, 2, 3, 4]
>>> my_list[1:3] = [10, 20]
>>> my_list
[1, 10, 20, 4]
```

Im obigen Beispiel wird einem Slice der Liste Werte aus einer anderen Sammlung zugewiesen.

Wie wir wissen, kann ein Slice die gesamte Sammlung umfassen:

```python
>>> my_list = [1, 2, 3, 4]
>>> my_list[:] = [100, 99, 98, 97]
>>> my_list
[100, 99, 98, 97]
```

Der gesamte Inhalt der alten Liste wird ersetzt. Inspiriert davon könnte eine funktionierende Version der Erhöhungsfunktion so aussehen:

```python
def augment_all(my_list: list):
    new_list = []
    for item in my_list:
        new_list.append(item + 10)

    my_list[:] = new_list
```

Eigentlich ist es gar nicht nötig, eine neue Liste innerhalb der Funktion zu erstellen. Wir können die neuen Werte einfach direkt in die ursprüngliche Liste schreiben:

```python
def augment_all(my_list: list):
    for i in range(len(my_list)):
        my_list[i] += 10
```

<programming-exercise name='Elemente mit zwei multipliziert' tmcname='part05-08_items_multiplied_by_two'>

Bitte schreiben Sie eine Funktion namens `double_items(numbers: list)`, die eine Liste von Ganzzahlen als Argument erhält.

Die Funktion sollte eine neue Liste zurückgeben, die alle Werte der ursprünglichen Liste verdoppelt enthält. Die Funktion sollte die ursprüngliche Liste _nicht_ verändern.

Ein Beispiel für die Funktion in Aktion:

```python
if __name__ == "__main__":
    numbers = [2, 4, 5, 3, 11, -4]
    numbers_doubled = double_items(numbers)
    print("Original:", numbers)
    print("verdoppelt:", numbers_doubled)
```
<sample-output>

Original: [2, 4, 5, 3, 11, -4]
verdoppelt: [4, 8, 10, 6, 22, -8]

</sample-output>

</programming-exercise>

<programming-exercise name='Das Kleinste entfernen' tmcname='part05-09_remove_smallest'>

Bitte schreiben Sie eine Funktion namens `remove_smallest(numbers: list)`, die eine Liste von Ganzzahlen als Argument erhält.

Die Funktion sollte das kleinste Element in der Liste finden und entfernen. Sie können davon ausgehen, dass es ein einziges kleinstes Element in der Liste gibt.

Die Funktion sollte keinen Rückgabewert haben - sie sollte die Liste, die sie als Parameter erhält, direkt modifizieren.

Ein Beispiel für die Funktionsweise:

```python
if __name__ == "__main__":
    numbers = [2, 4, 6, 1, 3, 5]
    remove_smallest(numbers)
    print(numbers)
```
<sample-output>

[2, 4, 6, 3, 5]

</sample-output>

</programming-exercise>

<programming-exercise name='Sudoku: Gitter ausgeben und Zahl hinzufügen' tmcname='part05-10_sudoku_print_and_add'>

In dieser Übung werden wir zwei weitere Funktionen für das Sudoku-Projekt aus dem vorherigen Abschnitt vervollständigen: `print_sudoku` und `add_number`.

Die Funktion `print_sudoku(sudoku: list)` nimmt ein zweidimensionales Array, das ein Sudoku-Gitter darstellt, als Argument entgegen. Die Funktion sollte das Gitter in dem in den Beispielen unten angegebenen Format ausgeben.

Die Funktion `add_number(sudoku: list, row_no: int, column_no: int, number:int)` nimmt ein zweidimensionales Array, das ein Sudoku-Gitter darstellt, zwei Ganzzahlen, die sich auf die Zeilen- und Spaltenindizes eines einzelnen Quadrats beziehen, und eine einzelne Ziffer zwischen 1 und 9 als Argumente entgegen. Die Funktion sollte die Ziffer an der angegebenen Stelle im Gitter hinzufügen.

```python
sudoku  = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

print_sudoku(sudoku)
add_number(sudoku, 0, 0, 2)
add_number(sudoku, 1, 2, 7)
add_number(sudoku, 5, 7, 3)
print()
print("Drei Zahlen hinzugefügt:")
print()
print_sudoku(sudoku)
```

<sample-output>

<pre>
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

Drei Zahlen hinzugefügt:

2 _ _  _ _ _  _ _ _
_ _ 7  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ 3 _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

</pre>

</sample-output>

**Hinweis**

Denken Sie daran, dass es möglich ist, die `print`-Funktion aufzurufen, ohne einen Zeilenumbruch zu verursachen:

```python
print("Zeichen ", end="")
print("ohne Wagenrücklauf", end="")
```

<sample-output>

Zeichen ohne Wagenrücklauf

</sample-output>

Manchmal benötigen Sie nur eine neue Zeile, was eine `print`-Anweisung ohne Argument erreicht:

```python
print()
```

</programming-exercise>

<programming-exercise name='Sudoku: Zahl zu einer Kopie des Gitters hinzufügen' tmcname='part05-11_sudoku_add_to_copy'>

Dies ist die allerletzte Sudoku-Aufgabe. Diesmal werden wir eine etwas andere Version der Funktion zum Hinzufügen neuer Zahlen zum Gitter erstellen.

Die Funktion `copy_and_add(sudoku: list, row_no: int, column_no: int, number: int)` nimmt ein zweidimensionales Array, das ein Sudoku-Gitter darstellt, zwei Ganzzahlen, die sich auf die Zeilen- und Spaltenindizes eines einzelnen Quadrats beziehen, und eine einzelne Ziffer zwischen 1 und 9 als Argumente entgegen. Die Funktion sollte eine Kopie des ursprünglichen Gitters mit der neuen Ziffer an der richtigen Stelle _zurückgeben_. Die Funktion sollte das als Parameter erhaltene ursprüngliche Gitter _nicht_ verändern.

Die `print_sudoku`-Funktion aus der vorherigen Übung könnte zum Testen nützlich sein und wird im folgenden Beispiel verwendet:

```python
sudoku  = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

grid_copy = copy_and_add(sudoku, 0, 0, 2)
print("Original:")
print_sudoku(sudoku)
print()
print("Kopie:")
print_sudoku(grid_copy)
```

<sample-output>

<pre>
Original:
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

Kopie:
2 _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

</pre>

</sample-output>

**Hinweis** 
Beim Umgang mit verschachtelten Listen sollten Sie beim Kopieren besonders vorsichtig sein. Was muss alles explizit kopiert werden und wo wirken sich Änderungen tatsächlich aus? Das [Visualisierungstool](http://www.pythontutor.com/visualize.html#mode=edit) ist auch hier eine große Hilfe, obwohl die Größe des Sudoku-Gitters die Ansicht weniger geordnet als gewohnt machen wird.

</programming-exercise>

<programming-exercise name='Tic-Tac-Toe' tmcname='part05-12_tic_tac_toe'>

Tic-Tac-Toe wird auf einem 3x3-Gitter von zwei Spielern gespielt, die abwechselnd Kreise und Kreuze eingeben. Wenn es einem der Spieler gelingt, drei seiner eigenen Symbole in einer Zeile, Spalte oder Diagonale zu platzieren, gewinnt er. Wenn dies keinem der Spieler gelingt, ist es ein Unentschieden.

Bitte schreiben Sie eine Funktion namens `play_turn(game_board: list, x: int, y: int, piece: str)`, die das angegebene Symbol an den angegebenen Koordinaten auf dem Brett platziert. Die Werte der Koordinaten auf dem Brett liegen zwischen 0 und 2.

**Hinweis:** Im Vergleich zu den Sudoku-Übungen sind die Argumente, die die Funktion entgegennimmt, hier umgekehrt. Die Spalte `x` kommt zuerst und die Zeile `y` als zweites.

Das Brett besteht aus den folgenden Zeichenketten:

* `""`: leeres Quadrat
* `"X"`: Symbol für Spieler 1
* `"O"`: Symbol für Spieler 2

Die Funktion sollte `True` zurückgeben, wenn das Quadrat leer war und das Symbol erfolgreich auf dem Spielbrett platziert wurde. Die Funktion sollte `False` zurückgeben, wenn das Quadrat besetzt war oder wenn die Koordinaten nicht gültig waren.

Ein Beispiel für die Ausführung der Funktion:

```python
game_board = [["", "", ""], ["", "", ""], ["", "", ""]]
print(play_turn(game_board, 2, 0, "X"))
print(game_board)
```

<sample-output>

True
[['', '', 'X'], ['', '', ''], ['', '', '']]

</sample-output>

</programming-exercise>

<programming-exercise name='Matrix transponieren' tmcname='part05-13_transpose_matrix'>

Bitte schreiben Sie eine Funktion namens `transpose(matrix: list)`, die ein zweidimensionales Ganzzahl-Array, d.h. eine Matrix, als Argument erhält. Die Funktion sollte die Matrix _transponieren_. Transponieren bedeutet im Wesentlichen, die Matrix an ihrer Diagonale zu spiegeln: Spalten werden zu Zeilen und Zeilen werden zu Spalten.

Sie können davon ausgehen, dass die Matrix eine quadratische Matrix ist, also eine gleiche Anzahl von Zeilen und Spalten hat.

Die folgende Matrix

```python
1 2 3
4 5 6
7 8 9
```

sieht transponiert so aus:

```python
1 4 7
2 5 8
3 6 9
```

Die Funktion sollte keinen Rückgabewert haben. Die Matrix sollte direkt über die Referenz modifiziert werden.

</programming-exercise>

## Seiteneffekte von Funktionen

Wenn eine Funktion eine Referenz auf eine Liste als Argument erhält, kann sie diese Liste verändern. Wenn direkte Änderungen vom Programmierer nicht beabsichtigt waren, könnte das versehentliche Ändern der als Parameter erhaltenen Liste an anderer Stelle im Programm Probleme verursachen.

Schauen wir uns eine Funktion an, die das zweitkleinste Element in einer Liste finden soll:

```python
def second_smallest(my_list: list) -> int:
    # in einer sortierten Liste befindet sich das zweitkleinste Element an Index 1
    my_list.sort()
    return my_list[1]

numbers = [1, 4, 2, 5, 3, 6, 4, 7]
print(second_smallest(numbers))
print(numbers)
```

<sample-output>
2
[1, 2, 3, 4, 4, 5, 6, 7]
</sample-output>

Die Funktion findet das zweitkleinste Element zuverlässig, aber sie sortiert zusätzlich die Liste an Ort und Stelle und ändert so die Reihenfolge der Elemente. Wenn die Reihenfolge an anderer Stelle im Programm von Bedeutung ist, könnte der Aufruf der Funktion Fehler verursachen. Unbeabsichtigte Änderungen an einem Objekt, auf das über eine Referenz zugegriffen wird, nennt man einen _Seiteneffekt_ einer Funktion.

Wir können den Seiteneffekt vermeiden, indem wir eine kleine Änderung an der Funktion vornehmen:

```python
def second_smallest(my_list: list) -> int:
    list_copy = sorted(my_list)
    return list_copy[1]

numbers = [1, 4, 2, 5, 3, 6, 4, 7]
print(second_smallest(numbers))
print(numbers)
```

<sample-output>

2
[1, 4, 2, 5, 3, 6, 4, 7]

</sample-output>

Die Funktion `sorted` gibt eine neue, sortierte Kopie der Liste zurück, sodass die Suche nach dem zweitkleinsten Element die Reihenfolge der ursprünglichen Liste nicht mehr durcheinander bringt.

Es wird allgemein als gute Programmierpraxis angesehen, Seiteneffekte bei Funktionen zu vermeiden. Seiteneffekte können es schwieriger machen, zu verifizieren, dass das Programm in allen Situationen wie beabsichtigt funktioniert.

Funktionen, die frei von Seiteneffekten sind, werden auch _reine Funktionen_ (pure functions) genannt. Insbesondere bei der Einhaltung eines funktionalen Programmierstils ist dies ein häufig verfolgtes Ideal. Wir werden dieses Thema im Kurs _Advanced Course in Programming_ weiter vertiefen, der auf diesen Kurs folgt.
