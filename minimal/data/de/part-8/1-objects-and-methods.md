---
path: '/part-8/1-objects-and-methods'
title: 'Objekte und Methoden'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Wissen Sie, was ein Objekt in der Programmierung ist
- Verstehen Sie, was mit der Unabhängigkeit einzelner Objekte gemeint ist
- Sind Sie in der Lage, Objekte zu erstellen und auf sie zuzugreifen

</text-box>

Dies ist der erste Teil des Fortgeschrittenenkurses in Programmierung. Das Material ist für die Verwendung mit dem Editor Visual Studio Code konzipiert, genau wie der vorangegangene Einführungskurs in die Programmierung. Falls Sie Visual Studio Code bisher noch nicht genutzt haben, finden Sie die Installationsanweisungen [hier](https://www.mooc.fi/en/installation/vscode) und eine Einführung in die Programmierumgebung aus dem vorherigen Kurs [hier](/part-4/1-vscode).

Im Einführungskurs in die Programmierung haben wir festgestellt, dass es oft sinnvoll ist, zusammengehörige Daten in unseren Programmen zu gruppieren. Wenn wir beispielsweise Informationen über ein Buch speichern möchten, kann es sinnvoll sein, ein Tupel oder ein Dictionary zu verwenden, um die Daten in einer einzigen Datenstruktur zu organisieren.

Bei Verwendung eines Tupels könnte die Lösung wie folgt aussehen:

```python
name = "Auf der Suche nach der verlorenen Typisierung"
author = "Marcel Pythons"
year = 1992

# Diese in einem Tupel kombinieren
book = (name, author, year)

# Den Namen des Buches ausgeben
print(book[0])
```

In einem solchen Fall liegt der Vorteil eines Dictionarys darin, dass wir Strings anstelle von Indizes als Schlüssel verwenden können. Das heißt, wir können den in der Datenstruktur gespeicherten Elementen beschreibende Namen geben:

```python
name = "Auf der Suche nach der verlorenen Typisierung"
author = "Marcel Pythons"
year = 1992

# Diese in einem Dictionary kombinieren
book = {"name": name, "author": author, "year": year}

# Den Namen des Buches ausgeben
print(book["name"])
```

In beiden Fällen erstellen wir ein neues _Objekt_. In der Programmierung hat dieser Begriff die spezifische Bedeutung eines unabhängigen Ganzen, das in diesem Fall einige Datenbits enthält, die in gewisser Weise miteinander in Beziehung stehen. Unabhängig zu sein bedeutet, dass Änderungen an einem Objekt keine Auswirkungen auf andere Objekte haben.

Würden wir zwei strukturell identische Repräsentationen von Büchern erstellen, indem wir Dictionarys mit identischen Schlüsseln verwenden, hätte jede an einem von ihnen vorgenommene Änderung keinerlei Auswirkungen auf das andere:

```python
book1 = {"name": "Der alte Mann und die Pythons", "author": "Ernest Pythons", "year": 1952}
book2 = {"name": "Sieben Pythons", "author": "Aleksis Python", "year": 1894}

print(book1["name"])
print(book2["name"])

book1["name"] = "In einem anderen Land mit ARM-Prozessoren"

print(book1["name"])
print(book2["name"])
```

<sample-output>

Der alte Mann und die Pythons
Sieben Pythons
In einem anderen Land mit ARM-Prozessoren
Sieben Pythons

</sample-output>

<img src="8_1_1.png">

<text-box variant="info" name="Python-Objekte">

Sie erinnern sich vielleicht aus dem Einführungskurs in die Programmierung, dass jeder Wert in Python intern als Objekt behandelt wird. Dies bedeutet, dass der in einer Variablen gespeicherte Wert eine _Referenz auf ein Objekt_ ist. Die Daten selbst werden innerhalb des Objekts im Computerspeicher gespeichert. Wenn Sie einer neuen Variablen mit dem Befehl `a = 3` einen Wert zuweisen, ist der in der Variablen gespeicherte Wert _nicht_ 3, sondern eine _Referenz auf ein Objekt, das den Wert 3 enthält_.

Die meisten anderen Programmiersprachen (zumindest diejenigen, die objektorientierte Programmierung unterstützen) enthalten einige speziell definierte _primitive Datentypen_. Diese umfassen in der Regel mindestens Ganzzahlen, Fließkommazahlen und boolesche Wahrheitswerte. Primitive werden direkt verarbeitet, was bedeutet, dass sie direkt in Variablen gespeichert werden, nicht als Referenzen. Python besitzt keine solchen Primitivtypen, aber die Arbeit mit den Basisdatentypen in Python ist in der Praxis sehr ähnlich. Objekte dieser Basisdatentypen (wie Zahlen, boolesche Werte und Strings) sind _unveränderlich_ (immutable), was bedeutet, dass sie im Speicher nicht geändert werden können. Wenn der in einer Variablen eines Basisdatentyps gespeicherte Wert geändert werden muss, wird die gesamte Referenz ersetzt, das Objekt selbst bleibt jedoch im Speicher intakt.

</text-box>

## Objekte und Methoden

Auf die in einem Objekt gespeicherten Daten kann über _Methoden_ zugegriffen werden. Eine Methode ist eine Funktion, die auf dem spezifischen Objekt operiert, an das sie gebunden ist. Methoden unterscheiden sich von anderen Funktionen durch die Art und Weise, wie sie aufgerufen werden: Zuerst schreiben Sie den Namen des Zielobjekts, gefolgt von einem Punkt und dann dem Namen der Methode, gegebenenfalls mit Argumenten. Beispielsweise gibt die Methode `values` alle Werte zurück, die in einem Objekt vom Typ Dictionary oder `dict` gespeichert sind:

```python
# Dies erstellt ein Objekt vom Typ Dictionary mit dem Namen book
book = {"name": "Der alte Mann und die Pythons", "author": "Ernest Pythons", "year": 1952}

# Alle Werte ausgeben
# Der Methodenaufruf values() wird nach dem Namen der Variablen geschrieben
# Beachten Sie die Punktnotation!
for value in book.values():
    print(value)
```

<sample-output>

Der alte Mann und die Pythons
Ernest Pythons
1952

</sample-output>

In ähnlicher Weise zielen String-Methoden auf das String-Objekt ab, auf dem sie aufgerufen werden. Einige Beispiele für String-Methoden sind `count` und `find`:

```python
name = "Imaginary Irene"

# Die Anzahl der Vorkommen des Buchstabens I ausgeben
print(name.count("I"))

# Die Anzahl der Buchstaben I in einem anderen String
print("Irreverent Irises in Islington".count("I"))

# Der Index des Substrings Irene
print(name.find("Irene"))

# Dieser String enthält keinen solchen Substring
print("Ein völlig anderer String".find("Irene"))
```

<sample-output>

2
3
10
-1

</sample-output>

String-Methoden geben Werte zurück, ändern jedoch nicht den Inhalt eines Strings. Wie oben erwähnt, sind Strings in Python unveränderlich. Dies gilt jedoch nicht für alle Methoden. Python-Listen sind veränderlich (mutable), daher können Methoden von Python-Listen den Inhalt der Liste ändern, auf der sie aufgerufen werden:

```python
my_list = [1, 2, 3]

# Ein paar Elemente hinzufügen
my_list.append(5)
my_list.append(1)

print(my_list)

# Das erste Element entfernen
my_list.pop(0)

print(my_list)
```

<sample-output>

[1, 2, 3, 5, 1]
[2, 3, 5, 1]

</sample-output>

<programming-exercise name='Das kleinste Durchschnittsergebnis' tmcname='part08-01_smallest_average'>

Bitte schreiben Sie eine Funktion namens `smallest_average(person1: dict, person2: dict, person3: dict)`, die drei Dictionary-Objekte als Argumente entgegennimmt.

Jedes Dictionary-Objekt enthält Werte, die den folgenden Schlüsseln zugeordnet sind:

* `"name"`: Der Name des Teilnehmers
* `"result1"`: das erste Ergebnis des Teilnehmers (eine Ganzzahl zwischen 1 und 10)
* `"result2"`: das zweite Ergebnis des Teilnehmers (wie oben)
* `"result3"`: das dritte Ergebnis des Teilnehmers (wie oben)

Die Funktion sollte den Durchschnitt der drei Ergebnisse für jeden Teilnehmer berechnen und dann den Teilnehmer zurückgeben, dessen Durchschnittsergebnis am kleinsten war. Der Rückgabewert sollte das gesamte Dictionary-Objekt sein, das die Informationen des Teilnehmers enthält.

Sie können davon ausgehen, dass es keine Gleichstände gibt, d. h. ein einzelner Teilnehmer wird das kleinste Durchschnittsergebnis haben.

Ein Beispiel für die Funktion in Aktion:

```python
person1 = {"name": "Mary", "result1": 2, "result2": 3, "result3": 3}
person2 = {"name": "Gary", "result1": 5, "result2": 1, "result3": 8}
person3 = {"name": "Larry", "result1": 3, "result2": 1, "result3": 1}

print(smallest_average(person1, person2, person3))
```

<sample-output>

{'name': 'Larry', 'result1': 3, 'result2': 1, 'result3': 1}

</sample-output>

</programming-exercise>

<programming-exercise name='Zeilensummen' tmcname='part08-02_row_sums '>

In Python ist jeder in einer Variablen gespeicherte Wert eine Referenz auf ein Objekt, daher ist auch jeder in einer Liste gespeicherte Wert eine Referenz auf ein Objekt. Dies gilt auch bei der Modellierung einer Matrix-Datenstruktur: Jeder Wert in der Liste der obersten Ebene ist eine Referenz auf eine andere Liste, die wiederum Referenzen auf die Objekte enthält, die die Elemente der Matrix repräsentieren.

Bitte schreiben Sie eine Funktion namens `row_sums(my_matrix: list)`, die eine Ganzzahl-Matrix als Argument entgegennimmt.

Die Funktion sollte jeder Zeile in der Matrix ein neues Element hinzufügen. Dieses Element enthält die Summe der anderen Elemente in dieser Zeile. Die Funktion hat keinen Rückgabewert. Sie sollte die Parameter-Matrix direkt (in-place) modifizieren.

Ein Beispiel für die Funktion in Aktion:

```python
my_matrix = [[1, 2], [3, 4]]
row_sums(my_matrix)
print(my_matrix)
```

<sample-output>

[[1, 2, 3], [3, 4, 7]]

</sample-output>

</programming-exercise>
