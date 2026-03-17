---
path: '/part-5/4-tuple'
title: 'Tuple'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie mit dem Datentyp Tuple vertraut sein
- werden Sie in der Lage sein, Tuples aus verschiedenen Arten von Werten zu erstellen
- werden Sie den Unterschied zwischen einem Tuple und einer Liste kennen
- werden Sie in der Lage sein, einige typische Anwendungsfälle für Tuples zu nennen

</text-box>

Ein Tuple ist eine Datenstruktur, die in vielerlei Hinsicht einer Liste ähnlich ist. Die wichtigsten Unterschiede zwischen den beiden sind:

* Tuples werden in runden Klammern `()` eingeschlossen, während Listen in eckigen Klammern `[]` stehen.
* Tuples sind _unveränderlich_ (immutable), während sich der Inhalt einer Liste ändern kann.

Das folgende Stück Code erstellt ein Tuple, das die Koordinaten eines Punktes enthält:

```python
point = (10, 20)
```

Auf die in einem Tuple gespeicherten Elemente wird über den Index zugegriffen, genau wie bei den Elementen in einer Liste:

```python
point = (10, 20)
print("x-Koordinate:", point[0])
print("y-Koordinate:", point[1])
```

<sample-output>

x-Koordinate: 10
y-Koordinate: 20

</sample-output>

Die in einem Tuple gespeicherten Werte können nach der Definition des Tuples nicht mehr geändert werden. Das Folgende wird _nicht_ funktionieren:

```python
point = (10, 20)
point[0] = 15
```

<sample-output>

TypeError: 'tuple' object does not support item assignment

</sample-output>

<programming-exercise name='Ein Tuple erstellen' tmcname='part05-23_create_tuple'>

Bitte schreiben Sie eine Funktion namens `create_tuple(x: int, y: int, z: int)`, die drei Ganzzahlen als Argumente entgegennimmt und ein Tuple basierend auf den folgenden Kriterien erstellt und zurückgibt:

1. Das erste Element im Tuple ist das kleinste der Argumente.
2. Das zweite Element im Tuple ist das größte der Argumente.
3. Das dritte Element im Tuple ist die Summe der Argumente.

Ein Beispiel für die Verwendung:

```python

if __name__ == "__main__":
    print(create_tuple(5, 3, -1))

```

<sample-output>

(-1, 5, 7)

</sample-output>


</programming-exercise>

<programming-exercise name='Die älteste Person' tmcname='part05-24_oldest_person'>

Bitte schreiben Sie eine Funktion namens `oldest_person(people: list)`, die eine Liste von Tuples als Argument erhält. In jedem Tuple ist das erste Element der Name einer Person und das zweite Element ihr Geburtsjahr. Die Funktion sollte die älteste Person auf der Liste finden und ihren Namen zurückgeben.

Ein Beispiel für die Funktion in Aktion:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

print(oldest_person(people))
```

<sample-output>

Mary

</sample-output>

</programming-exercise>

<programming-exercise name='Ältere Menschen' tmcname='part05-25_older_people'>

In dieser Übung behandeln wir Tuples genau wie die in der vorherigen Übung beschriebenen.

Bitte schreiben Sie eine Funktion namens `older_people(people: list, year: int)`, die alle Personen auf der Liste auswählt, die _vor_ dem als Argument angegebenen Jahr geboren wurden. Die Funktion sollte die Namen dieser Personen in einer neuen Liste zurückgeben.

Ein Beispiel für die Verwendung:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

older = older_people(people, 1979)
print(older)
```

<sample-output>

[ 'Adam', 'Mary' ]

</sample-output>

</programming-exercise>

## Was ist der Zweck eines Tuples?

Tuples sind ideal, wenn es eine feste Sammlung von Werten gibt, die in irgendeiner Weise miteinander verbunden sind. Wenn zum Beispiel die x- und y-Koordinaten eines Punktes verarbeitet werden müssen, ist ein Tuple eine natürliche Wahl, da Koordinaten immer aus zwei Werten bestehen werden:

```python
point = (10, 20)
```

Technisch gesehen ist es natürlich möglich, auch eine Liste zu verwenden, um diese zu speichern:

```python
point = [10, 20]
```

Eine Liste ist eine Sammlung von aufeinanderfolgenden Elementen in einer bestimmten Reihenfolge. Die Größe einer Liste kann sich ebenfalls ändern. Wenn wir die Koordinaten eines Punktes speichern, möchten wir speziell die x- und y-Koordinaten speichern, nicht eine beliebige Liste, die diese Werte enthält.

Da Tuples im Gegensatz zu Listen unveränderlich sind, können sie als Schlüssel in einem Dictionary verwendet werden. Das folgende Stück Code erstellt ein Dictionary, in dem die Schlüssel Koordinatenpunkte sind:

```python
points = {}
points[(3, 5)] = "monkey"
points[(5, 0)] = "banana"
points[(1, 2)] = "harpsichord"
print(points[(3, 5)])
```

<sample-output>
monkey
</sample-output>

Der Versuch einer ähnlichen Dictionary-Definition unter Verwendung von Listen würde _nicht_ funktionieren:

```python
points = {}
points[[3, 5]] = "monkey"
points[[5, 0]] = "banana"
points[[1, 2]] = "harpsichord"
print(points[[3, 5]])
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

## Tuples ohne Klammern

Die Klammern sind bei der Definition von Tuples nicht zwingend erforderlich. Die folgenden zwei Variablenzuweisungen sind in ihren Ergebnissen identisch:

```python
numbers = (1, 2, 3)
```

```python
numbers = 1, 2, 3
```

Das bedeutet, dass wir auch problemlos mehrere Werte mit Hilfe von Tuples zurückgeben können. Schauen wir uns das folgende Beispiel an:

```python
def minmax(my_list):
  return min(my_list), max(my_list)

my_list = [33, 5, 21, 7, 88, 312, 5]

min_value, max_value = minmax(my_list)
print(f"Das kleinste Element ist {min_value} und das größte Element ist {max_value}")
```

<sample-output>

Das kleinste Element ist 5 und das größte Element ist 312

</sample-output>

Diese Funktion gibt zwei Werte in einem Tuple zurück. Der Rückgabewert wird zwei Variablen gleichzeitig zugewiesen:

```python
min_value, max_value = minmax(my_list)
```

Die Verwendung von Klammern kann die Notation klarer machen. Auf der linken Seite der Zuweisung haben wir ebenfalls ein Tuple, das zwei Variablennamen enthält. Die im von der Funktion zurückgegebenen Tuple enthaltenen Werte werden diesen beiden Variablen zugewiesen.

```python
(min_value, max_value) = minmax(my_list)
```

Sie erinnern sich vielleicht an die Dictionary-Methode `items` im vorherigen Abschnitt. Wir haben sie verwendet, um auf alle in einem Dictionary gespeicherten Schlüssel und Werte zuzugreifen:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key, value in my_dictionary.items():
    print("Schlüssel:", key)
    print("Wert:", value)
```

Auch hier sind Tuples am Werk. Die Methode `my_dictionary.items()` gibt jedes Schlüssel-Wert-Paar als Tuple zurück, wobei das erste Element der Schlüssel und das zweite Element der Wert ist.

Ein weiterer häufiger Anwendungsfall für Tuples ist das Vertauschen der Werte zweier Variablen:

```python
number1, number2 = number2, number1
```

Die obige Zuweisung vertauscht die in den Variablen `number1` und `number2` gespeicherten Werte. Das Ergebnis ist identisch mit dem, was mit dem folgenden Stück Code unter Verwendung einer Hilfsvariablen erreicht wird:

```python
helper_var = number1
number1 = number2
number2 = helper_var
```

<programming-exercise name='Studenten-Datenbank' tmcname='part05-26_student_database'>

In dieser Übungsreihe erstellen Sie eine einfache Studenten-Datenbank. Bevor Sie eintauchen, nehmen Sie sich bitte einen Moment Zeit, um die Anweisungen durchzulesen und darüber nachzudenken, welche Art von Datenstrukturen für die Organisation der von Ihrem Programm gespeicherten Daten erforderlich sind.

#### Studenten hinzufügen

Schreiben Sie zuerst eine Funktion namens `add_student`, die einen neuen Studenten zur Datenbank hinzufügt. Schreiben Sie außerdem eine vorläufige Version der Funktion `print_student`, die die Informationen eines einzelnen Studenten ausgibt.

Diese Funktionen werden wie folgt verwendet:

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
print_student(students, "Peter")
print_student(students, "Eliza")
print_student(students, "Jack")
```

Ihr Programm sollte nun folgendes ausgeben:

<sample-output>

<pre>
Peter:
 no completed courses
Eliza:
 no completed courses
Jack: no such person in the database
</pre>

</sample-output>

#### Abgeschlossene Kurse hinzufügen

Bitte schreiben Sie eine Funktion namens `add_course`, die einen abgeschlossenen Kurs zu den Informationen eines bestimmten Studenten in der Datenbank hinzufügt. Die Kursdaten sind ein Tuple bestehend aus dem Namen des Kurses und der Note:

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
print_student(students, "Peter")
```

Wenn einige Kurse hinzugefügt wurden, ändern sich die ausgegebenen Informationen:

<sample-output>

<pre>
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</pre>

</sample-output>

#### Kurse wiederholen

Kurse mit der Note 0 sollten beim Hinzufügen von Kursinformationen ignoriert werden. Wenn der Kurs bereits in der Datenbank in den Informationen dieses Studenten vorhanden ist, sollte die in der Datenbank aufgezeichnete Note niemals gesenkt werden, wenn der Kurs wiederholt wird.

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
add_course(students, "Peter", ("Data Structures and Algorithms", 0))
add_course(students, "Peter", ("Introduction to Programming", 2))
print_student(students, "Peter")
```

<sample-output>

<pre>
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</pre>

</sample-output>

#### Zusammenfassung der Datenbank

Bitte schreiben Sie eine Funktion namens `summary`, die eine Zusammenfassung basierend auf allen in der Datenbank gespeicherten Informationen ausgibt.

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
add_course(students, "Peter", ("Data Structures and Algorithms", 1))
add_course(students, "Peter", ("Introduction to Programming", 1))
add_course(students, "Peter", ("Advanced Course in Programming", 1))
add_course(students, "Eliza", ("Introduction to Programming", 5))
add_course(students, "Eliza", ("Introduction to Computer Science", 4))
summary(students)
```

Dies sollte folgendes ausgeben:

<sample-output>

<pre>
students 2
most courses completed 3 Peter
best average grade 4.5 Eliza
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name="Ein Quadrat aus Buchstaben" tmcname="part05-27_letter_square">

Diese letzte Übung in diesem Teil ist eine relativ anspruchsvolle Problemlösungsaufgabe. Sie kann auf viele verschiedene Arten gelöst werden. Auch wenn dieser aktuelle Abschnitt im Material Tuples behandelt, sind Tuples nicht unbedingt der beste Weg, um dies zu lösen.

Bitte schreiben Sie ein Programm, das ein Quadrat aus Buchstaben ausgibt, wie in den Beispielen unten angegeben. Sie können davon ausgehen, dass es höchstens 26 Schichten geben wird.

<sample-output>

Schichten: **3**
<pre>
CCCCC
CBBBC
CBABC
CBBBC
CCCCC
</pre>

</sample-output>

<sample-output>

Schichten: **4**
<pre>
DDDDDDD
DCCCCCD
DCBBBCD
DCBABCD
DCBBBCD
DCCCCCD
DDDDDDD
</pre>

</sample-output>

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

</programming-exercise>
