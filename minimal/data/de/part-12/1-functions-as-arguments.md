---
path: '/part-12/1-functions-as-arguments'
title: 'Funktionen als Argumente'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie in der Lage sein, Listen nach verschiedenen Kriterien zu sortieren
- werden Sie wissen, was ein Lambda-Ausdruck ist
- werden Sie in der Lage sein, Lambda-Ausdrücke mit anderen Python-Funktionen zu verwenden
- werden Sie wissen, wie eine Funktion als Argument an eine andere Funktion übergeben wird

</text-box>

Wir sind bereits mit der Methode `sort` und der Funktion `sorted` vertraut, die verwendet werden, um Listen in ihre natürliche Ordnung zu bringen. Bei Zahlen und Zeichenketten funktioniert dies in der Regel einwandfrei. Bei allem, was darüber hinausgeht, entspricht das, was Python als natürliche Ordnung der Elemente ansieht, jedoch nicht immer dem, was wir als Programmierer beabsichtigt haben.

Beispielsweise wird eine Liste von Tupeln standardmäßig nach dem ersten Element jedes Tupels sortiert:

```python
products = [("Banane", 5.95), ("Apfel", 3.95), ("Orange", 4.50), ("Wassermelone", 4.95)]

products.sort()

for product in products:
    print(product)
```

<sample-output>

('Apfel', 3.95)
('Banane', 5.95)
('Orange', 4.5)
('Wassermelone', 4.95)

</sample-output>

Was aber, wenn wir die Liste nach dem Preis sortieren wollten?

## Funktionen als Argumente

Eine Sortiermethode oder -funktion akzeptiert in der Regel ein optionales zweites Argument, mit dem Sie die Standard-Sortierkriterien umgehen können. Dieses zweite Argument ist eine Funktion, die definiert, wie der Wert jedes Elements auf der Liste bestimmt wird. Während die Liste sortiert wird, ruft Python diese Funktion auf, wenn es die Elemente miteinander vergleicht.

Sehen wir uns ein Beispiel an:

```python
def order_by_price(item: tuple):
    # Den Preis zurückgeben, welches das zweite Element im Tupel ist
    return item[1]

if __name__ == "__main__":
    products = [("Banane", 5.95), ("Apfel", 3.95), ("Orange", 4.50), ("Wassermelone", 4.95)]

    # Die Funktion order_by_price zum Sortieren verwenden
    products.sort(key=order_by_price)

    for product in products:
        print(product)
```

<sample-output>

('Apfel', 3.95)
('Orange', 4.5)
('Wassermelone', 4.95)
('Banane', 5.95)

</sample-output>

Nun ist die Liste nach den Preisen der Artikel sortiert, aber was passiert eigentlich im Programm?

Die Funktion `order_by_price` ist eigentlich recht einfach. Sie nimmt ein Element als Argument entgegen und gibt einen Wert für dieses Element zurück. Genauer gesagt gibt sie das zweite Element im Tupel zurück, welches den Preis darstellt. Aber dann haben wir diese Codezeile, in der die Methode `sort` aufgerufen wird:

`products.sort(key=order_by_price)`

Hier wird die Methode `sort` mit einer Funktion als Argument aufgerufen. Dies ist kein Verweis auf den Rückgabewert der Funktion, sondern ein Verweis auf _die Funktion selbst_. Die Methode `sort` ruft diese Funktion mehrmals auf und verwendet dabei nacheinander jedes Element der Liste als Argument.

Wenn wir eine zusätzliche `print`-Anweisung in die Funktionsdefinition von `order_by_price` einfügen, können wir überprüfen, dass die Funktion tatsächlich einmal pro Element auf der Liste aufgerufen wird:

```python
def order_by_price(item: tuple):
    # Das Element ausgeben
    print(f"Funktionsaufruf: order_by_price({item})")

    # Den Preis zurückgeben, welches das zweite Element im Tupel ist
    return item[1]


products = [("Banane", 5.95), ("Apfel", 3.95), ("Orange", 4.50), ("Wassermelone", 4.95)]

# Die Funktion order_by_price zum Sortieren verwenden
products.sort(key=order_by_price)

for product in products:
    print(product)
```

<sample-output>

Funktionsaufruf: order_by_price(('Banane', 5.95))
Funktionsaufruf: order_by_price(('Apfel', 3.95))
Funktionsaufruf: order_by_price(('Orange', 4.5))
Funktionsaufruf: order_by_price(('Wassermelone', 4.95))
('Apfel', 3.95)
('Orange', 4.5)
('Wassermelone', 4.95)
('Banane', 5.95)

</sample-output>

Die Reihenfolge kann mit einem weiteren Schlüsselwort-Argument, `reverse`, umgekehrt werden, das sowohl bei der Methode `sort` als auch bei der Funktion `sorted` zur Verfügung steht:

```python
products.sort(key=order_by_price, reverse=True)

t2 = sorted(products, key=order_by_price, reverse=True)
```

## Eine Funktionsdefinition innerhalb einer Funktionsdefinition

Wir könnten auch eine benannte Funktion für diese neue preisbasierte Sortierfunktionalität, die wir erstellt haben, aufnehmen. Fügen wir eine Funktion namens `sort_by_price` hinzu:

```python
def order_by_price(item: tuple):
    return item[1]

def sort_by_price(items: list):
    # Hier die Funktion order_by_price verwenden
    return sorted(items, key=order_by_price)

products = [("Banane", 5.95), ("Apfel", 3.95), ("Orange", 4.50), ("Wassermelone", 4.95)]

for product in sort_by_price(products):
    print(product)
```

Wenn wir wissen, dass die Hilfsfunktion `order_by_price` nirgendwo außerhalb der Funktion `sort_by_price` verwendet wird, können wir die erstgenannte Funktionsdefinition innerhalb der letztgenannten Funktionsdefinition platzieren:

```python
def sort_by_price(items: list):
    # Hilfsfunktion, die innerhalb der Funktion definiert ist
    def order_by_price(item: tuple):
        return item[1]

    return sorted(items, key=order_by_price)
```

<programming-exercise name='Nach Restbestand sortieren' tmcname='part12-01_remaining_stock'>

Bitte schreiben Sie eine Funktion namens `sort_by_remaining_stock(items: list)`. Die Funktion nimmt eine Liste von Tupeln als Argument entgegen. Die Tupel bestehen aus dem Namen, dem Preis und dem Restbestand eines Produkts. Die Funktion soll eine neue Liste zurückgeben, in der die Artikel nach dem Restbestand sortiert sind, wobei der niedrigste Wert zuerst kommt. Die ursprüngliche Liste soll nicht verändert werden.

Die Funktion soll wie folgt arbeiten:

```python
products = [("Banane", 5.95, 12), ("Apfel", 3.95, 3), ("Orange", 4.50, 2), ("Wassermelone", 4.95, 22)]

for product in sort_by_remaining_stock(products):
    print(f"{product[0]} {product[2]} Stk")
```

<sample-output>
Orange 2 Stk
Apfel 3 Stk
Banane 12 Stk
Wassermelone 22 Stk
</sample-output>

</programming-exercise>

<programming-exercise name='Nach Anzahl der Staffeln sortieren' tmcname='part12-02_seasons'>

Bitte schreiben Sie eine Funktion namens `sort_by_seasons(items: list)`, die eine Liste von Wörterbüchern als Argument entgegennimmt. Jedes Wörterbuch enthält die Informationen zu einer einzelnen Fernsehserie. Die Funktion soll diese Liste nach der Anzahl der Staffeln jeder Serie in aufsteigender Reihenfolge sortieren. Die Funktion soll die ursprüngliche Liste nicht verändern, sondern stattdessen eine neue Liste zurückgeben.

Die Funktion soll wie folgt arbeiten:

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

for show in sort_by_seasons(shows):
    print(f"{show['name']} {show['seasons']} Staffeln")
```

<sample-output>
Dexter 9 Staffeln
Friends 10 Staffeln
Simpsons 32 Staffeln
</sample-output>

</programming-exercise>

<programming-exercise name='Nach Bewertungen sortieren' tmcname='part12-03_ratings'>

Bitte schreiben Sie eine Funktion namens `sort_by_ratings(items: list)`, die eine Liste von Wörterbüchern als Argument entgegennimmt. Die Struktur der Wörterbücher ist identisch mit der der vorherigen Übung. Diese Funktion soll die Wörterbücher in _absteigender Reihenfolge basierend auf den Bewertungen der Serien_ sortieren. Die Funktion soll die ursprüngliche Liste nicht verändern, sondern stattdessen eine neue Liste zurückgeben.

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

print("Bewertung laut IMDB")
for show in sort_by_ratings(shows):
    print(f"{show['name']}  {show['rating']}")
```

<sample-output>

Bewertung laut IMDB
Friends 8.9
Simpsons 8.7
Dexter 8.6

</sample-output>

</programming-exercise>

## Sortieren von Sammlungen eigener Objekte

Nach demselben Prinzip schreiben wir ein Programm, das eine Liste von Objekten unserer eigenen Klasse `Student` auf zwei verschiedene Arten sortiert:

```python
class Student:
    """ Die Klasse modelliert einen einzelnen Studenten """
    def __init__(self, name: str, id: str, credits: int):
        self.name = name
        self.id = id
        self.credits = credits

    def __str__(self):
        return f"{self.name} ({self.id}), {self.credits} LP."


def by_id(item: Student):
    return item.id

def by_credits(item: Student):
    return item.credits


if __name__ == "__main__":
    o1 = Student("Archie", "a123", 220)
    o2 = Student("Marvin", "m321", 210)
    o3 = Student("Anna", "a999", 131)

    students = [o1, o2, o3]

    print("Nach ID sortieren:")
    for student in sorted(students, key=by_id):
        print(student)

    print()

    print("Nach Leistungspunkten sortieren:")
    for student in sorted(students, key=by_credits):
        print(student)
```

<sample-output>

Nach ID sortieren:
Archie (a123), 220 LP.
Anna (a999), 131 LP.
Marvin (m321), 210 LP.

Nach Leistungspunkten sortieren:
Anna (a999), 131 LP.
Marvin (m321), 210 LP.
Archie (a123), 220 LP.

</sample-output>

Wie Sie oben sehen können, funktioniert das Sortieren nach verschiedenen Kriterien genau wie beabsichtigt. Wenn die Funktionen `by_id` und `by_credits` an anderer Stelle nicht benötigt werden, gibt es Möglichkeiten, die Implementierung zu vereinfachen. Wir werden nach diesen Übungen auf dieses Thema zurückkommen.

<programming-exercise name='Kletterroute' tmcname='part12-04_climbing_route'>

Die Übungsvorlage enthält die Klassendefinition für eine `ClimbingRoute`. Sie funktioniert wie folgt:

```python
route1 = ClimbingRoute("Edge", 38, "6A+")
route2 = ClimbingRoute("Smooth operator", 11, "7A")
route3 = ClimbingRoute("Synchro", 14, "8C+")


print(route1)
print(route2)
print(route3.name, route3.length, route3.grade)
```

<sample-output>

Edge, Länge 38 Meter, Grad 6A+
Smooth operator, Länge 11 Meter, Grad 7A
Synchro 14 8C+

</sample-output>

## Nach Länge sortieren

Bitte schreiben Sie eine Funktion namens `sort_by_length(routes: list)`, die eine neue Liste von Routen zurückgibt, sortiert nach der Länge von der längsten zur kürzesten.

Die Funktion soll wie folgt arbeiten:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]

for route in sort_by_length(routes):
    print(route)
```

<sample-output>

Edge, Länge 38 Meter, Grad 6A+
Synchro, Länge 14 Meter, Grad 8C+
Small steps, Länge 12 Meter, Grad 6A+
Smooth operator, Länge 11 Meter, Grad 7A

</sample-output>

## Nach Schwierigkeit sortieren

Bitte schreiben Sie eine Funktion namens `sort_by_difficulty(routes: list)`, die eine neue Liste von Routen zurückgibt, sortiert nach Schwierigkeit, d. h. dem Grad, von der schwersten zur leichtesten. Bei Routen mit demselben Grad ist die längere schwieriger. Die Skala der Kletterroutengrade lautet _4, 4+, 5, 5+, 6A, 6A+, ..._, was in der Praxis der alphabetischen Reihenfolge bei Zeichenketten entspricht.

Die Funktion soll wie folgt arbeiten:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]
for route in sort_by_difficulty(routes):
    print(route)
```

<sample-output>

Synchro, Länge 14 Meter, Grad 8C+
Smooth operator, Länge 11 Meter, Grad 7A
Edge, Länge 38 Meter, Grad 6A+
Small steps, Länge 12 Meter, Grad 6A+

</sample-output>

**Hinweis:** Wenn die Reihenfolge auf einer Liste oder einem Tupel basiert, sortiert Python die Elemente standardmäßig zuerst nach dem ersten Element, dann nach dem zweiten Element und so weiter:

```python
my_list = [("a", 4),("a", 2),("b", 30), ("b", 0) ]
print(sorted(my_list))
```

<sample-output>

[('a', 2), ('a', 4), ('b', 0), ('b', 30)]

</sample-output>

</programming-exercise>

<programming-exercise name='Klettergebiete' tmcname='part12-05_climbing_areas'>

Zusätzlich zu der `ClimbingRoute` aus der vorherigen Übung enthält die Übungsvorlage die Klassendefinition für ein `ClimbingArea`.

```python
ca1 = ClimbingArea("Olhava")
ca1.add_route(ClimbingRoute("Edge", 38, "6A+"))
ca1.add_route(ClimbingRoute("Great cut", 36, "6B"))
ca1.add_route(ClimbingRoute("Swedish route", 42, "5+"))

ca2 = ClimbingArea("Nummi")
ca2.add_route(ClimbingRoute("Synchro", 14, "8C+"))

ca3 = ClimbingArea("Nalkkila slab")
ca3.add_route(ClimbingRoute("Small steps", 12, "6A+"))
ca3.add_route(ClimbingArea("Smooth operator", 11, "7A"))
ca3.add_route(ClimbingRoute("Piggy not likey", 12 , "6B+"))
ca3.add_route(ClimbingRoute("Orchard", 8, "6A"))

print(ca1)
print(ca3.name, ca3.routes())
print(ca3.hardest_route())
```

<sample-output>

Olhava, 3 Routen, schwerste 6B
Nalkkila slab 4
Smooth operator, Länge 9 Meter, Grad 7A

</sample-output>

## Nach Anzahl der Routen sortieren

Bitte schreiben Sie eine Funktion namens `sort_by_number_of_routes`, die Klettergebiete in aufsteigender Reihenfolge basierend auf der Anzahl der Routen sortiert, die sie jeweils haben.

```python
# ca1, ca2 und ca3 wie oben deklariert
areas = [ca1, ca2, ca3]
for area in sort_by_number_of_routes(areas):
    print(area)

```

<sample-output>

Nummi, 1 Routen, schwerste 8C+
Olhava, 3 Routen, schwerste 6B
Nalkkila slab, 4 Routen, schwerste 7A

</sample-output>

## Nach der schwierigsten Route sortieren

Bitte schreiben Sie eine Funktion namens `sort_by_most_difficult`, die Klettergebiete in _absteigender_ Reihenfolge basierend auf der schwierigsten Route in jedem Gebiet sortiert.

```python
# ca1, ca2 und ca3 wie oben deklariert
areas = [ca1, ca2, ca3]
for area in sort_by_most_difficult(areas):
    print(area)
```

<sample-output>

Nummi, 1 Routen, schwerste 8C+
Nalkkila slab, 4 Routen, schwerste 7A
Olhava, 3 Routen, schwerste 6B

</sample-output>

</programming-exercise>

## Lambda-Ausdrücke

Wir haben Funktionen bisher meist unter dem Gesichtspunkt der Modularität betrachtet. Es stimmt, dass Funktionen eine wichtige Rolle bei der Bewältigung der Komplexität Ihrer Programme und der Vermeidung von Code-Wiederholungen spielen. Funktionen werden in der Regel so geschrieben, dass sie viele Male verwendet werden können.

Manchmal benötigen Sie jedoch etwas, das einer Funktion ähnelt, die Sie nur ein einziges Mal verwenden werden. Lambda-Ausdrücke ermöglichen es Ihnen, kleine, anonyme Funktionen zu erstellen, die genau dann im Code erstellt (und wieder verworfen) werden, wenn sie benötigt werden. Die allgemeine Syntax lautet wie folgt:

`lambda <Parameter> : <Ausdruck>`

Das Sortieren einer Liste von Tupeln nach dem zweiten Element in jedem Tupel würde mit einem Lambda-Ausdruck implementiert so aussehen:

```python
products = [("Banane", 5.95), ("Apfel", 3.95), ("Orange", 4.50), ("Wassermelone", 4.95)]

# Die Funktion wird "on the fly" mit einem Lambda-Ausdruck erstellt:
products.sort(key=lambda item: item[1])

for product in products:
    print(product)
```

<sample-output>

('Apfel', 3.95)
('Orange', 4.5)
('Wassermelone', 4.95)
('Banane', 5.95)

</sample-output>

Der Ausdruck

`lambda item: item[1]`

ist äquivalent zu der Funktionsdefinition

```python
def price(item):
    return item[1]
```

außer der Tatsache, dass eine Lambda-Funktion keinen Namen hat. Deshalb werden Lambda-Funktionen auch als anonyme Funktionen bezeichnet.

In jeder anderen Hinsicht unterscheidet sich eine Lambda-Funktion nicht von jeder anderen Funktion, und sie können in allen denselben Kontexten wie jede äquivalente benannte Funktion verwendet werden. Beispielsweise sortiert das folgende Programm eine Liste von Zeichenketten alphabetisch nach dem _letzten_ Zeichen in jeder Zeichenkette:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: word[-1]):
    print(word)
```

<sample-output>

Minnie
Mack
Merl
Marvin
Mickey

</sample-output>

Wir können auch Listen-Abstraktionen, die Methode `join` und Lambda-Ausdrücke kombinieren. Zum Beispiel könnten wir Zeichenketten nur basierend auf den darin enthaltenen Vokalen sortieren und alle anderen Zeichen ignorieren:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: "".join([c for c in word if c in "aeiou"])):
    print(word)
```

<sample-output>

Mack
Marvin
Merl
Mickey
Minnie

</sample-output>

Anonyme Funktionen können auch mit anderen integrierten Python-Funktionen verwendet werden, nicht nur mit solchen zum Sortieren. Beispielsweise akzeptieren auch die Funktionen `min` und `max` ein Schlüsselwort-Argument namens `key`. Es wird als Kriterium für den Vergleich der Elemente bei der Auswahl des Minimal- oder Maximalwerts verwendet.

Im folgenden Beispiel beschäftigen wir uns mit Audioaufnahmen. Zuerst wählen wir die älteste Aufnahme aus und dann die längste:

```python

class Recording:
    """ Die Klasse modelliert eine einzelne Audioaufnahme """
    def __init__(self, name: str, performer: str, year: int, runtime: int):
        self.name = name
        self.performer = performer
        self.year = year
        self.runtime = runtime


    def __str__(self):
        return f"{self.name} ({self.performer}), {self.year}. {self.runtime} Min."

if __name__ == "__main__":
    r1 = Recording("Nevermind", "Nirvana", 1991, 43)
    r2 = Recording("Let It Be", "Beatles", 1969, 35)
    r3 = Recording("Joshua Tree", "U2", 1986, 50)

    recordings = [r1, r2, r3]


    print("Die älteste Aufnahme:")
    print(min(recordings, key=lambda rec: rec.year))

    print("Die längste Aufnahme:")
    print(max(recordings, key=lambda rec: rec.runtime))
```

<sample-output>

Die älteste Aufnahme:
Let It Be (Beatles), 1969. 35 Min.
Die längste Aufnahme:
U2 (Joshua Tree), 1986. 50 Min.

</sample-output>

<programming-exercise name='Ballspieler' tmcname='part12-06_ballplayers'>

Die Übungsvorlage enthält die Definition für eine Klasse namens `BallPlayer`. Sie hat die folgenden öffentlichen Attribute:

* name
* Trikotnummer `number`
* erzielte Tore `goals`
* Vorlagen `assists`
* gespielte Minuten `minutes`

Bitte implementieren Sie die folgenden Funktionen. Hinweis: Jede Funktion hat einen anderen Typ von Rückgabewert.

## Die meisten Tore

Bitte schreiben Sie eine Funktion namens `most_goals`, die eine Liste von Ballspielern als Argument entgegennimmt.

Die Funktion soll den Namen des Spielers, der die meisten Tore erzielt hat, im Zeichenkettenformat zurückgeben.

## Die meisten Punkte

Bitte schreiben Sie eine Funktion namens `most_points`, die eine Liste von Ballspielern als Argument entgegennimmt.

Die Funktion soll ein Tupel zurückgeben, das den Namen und die Trikotnummer des Spielers enthält, der die meisten Punkte erzielt hat. Die Gesamtzahl der Punkte ist die Summe aus Toren und Vorlagen.

## Wenigste Minuten

Bitte schreiben Sie eine Funktion namens `least_minutes`, die eine Liste von Ballspielern als Argument entgegennimmt.

Die Funktion soll das `BallPlayer`-Objekt zurückgeben, das den kleinsten Wert an gespielten Minuten aufweist.

Sie können Ihre Funktionen mit dem folgenden Programm testen:

```python
if __name__ == "__main__":
    player1 = BallPlayer("Archie Bonkers", 13, 5, 12, 46)
    player2 = BallPlayer("Speedy Tickets", 7, 2, 26, 55)
    player3 = BallPlayer("Cruella De Hill", 9, 1, 32, 26)
    player4 = BallPlayer("Devilled Tasmanian", 12, 1, 11, 41)
    player5 = BallPlayer("Donald Quack", 4, 3, 9, 12)
    
    team = [player1, player2, player3, player4, player5]
    print(most_goals(team))
    print(most_points(team))
    print(least_minutes(team))
```

Dies sollte Folgendes ausgeben:

<sample-output>

Archie Bonkers
('Cruella De Hill', 9)
BallPlayer(name=Donald Quack, number=4, goals=3, assists=9, minutes=12)

</sample-output>

</programming-exercise>

## Funktionen als Argumente innerhalb Ihrer eigenen Funktionen

Wir haben oben festgestellt, dass es möglich ist, einen Verweis auf eine Funktion als Argument an eine andere Funktion zu übergeben. Zum Abschluss dieses Abschnitts schreiben wir unsere ganz eigene Funktion, die eine Funktion als Argument entgegennimmt.

```python
# Der Typ-Hinweis "callable" bezieht sich auf eine Funktion
def perform_operation(operation: callable):
    # Die Funktion aufrufen, die als Argument übergeben wurde
    return operation(10, 5)

def my_sum(a: int, b: int):
    return a + b

def my_product(a: int, b: int):
    return a * b


if __name__ == "__main__":
    print(perform_operation(my_sum))
    print(perform_operation(my_product))
    print(perform_operation(lambda x,y: x - y))

```

<sample-output>

15
50
5

</sample-output>

Der von der Funktion `perform_operation` zurückgegebene Wert hängt davon ab, welche Funktion als Argument übergeben wurde. Jede Funktion, die zwei Argumente akzeptiert, wäre geeignet, unabhängig davon, ob sie anonym oder benannt ist.

Das Übergeben von Verweisen auf Funktionen als Argumente an andere Funktionen ist vielleicht nichts, was Sie in Ihrer Programmierkarriere täglich tun werden, aber es kann eine nützliche Technik sein. Das folgende Programm wählt einige Zeilen aus einer Datei aus und schreibt sie in eine andere Datei. Die Art und Weise, wie die Zeilen ausgewählt werden, wird durch eine Funktion bestimmt, die nur dann `True` zurückgibt, wenn die Zeilen kopiert werden sollen:

```python
def copy_lines(source_file: str, target_file: str, criterion= lambda x: True):
    with open(source_file) as source, open(target_file, "w") as target:
        for line in source:
            # Jegliche Leerzeichen am Anfang und Ende der Zeile entfernen
            line = line.strip()

            if criterion(line):
                target.write(line + "\n")

# Einige Beispiele
if __name__ == "__main__":
    # Wenn der dritte Parameter nicht angegeben wird, alle Zeilen kopieren
    copy_lines("first.txt", "second.txt")

    # Alle nicht leeren Zeilen kopieren
    copy_lines("first.txt", "second.txt", lambda line: len(line) > 0)

    # Alle Zeilen kopieren, die das Wort "Python" enthalten
    copy_lines("first.txt", "second.txt", lambda line: "Python" in line)

    # Alle Zeilen kopieren, die nicht mit einem Punkt enden
    copy_lines("first.txt", "second.txt", lambda line: line[-1] != ".")
```

Die Funktionsdefinition enthält einen Standardwert für den Schlüsselwort-Parameter `criterion`: `lambda x: True`. Diese anonyme Funktion gibt unabhängig von der Eingabe immer `True` zurück. Das Standardverhalten besteht also darin, alle Zeilen zu kopieren. Wie üblich ersetzt ein für einen Parameter mit Standardwert angegebener Wert den Standardwert.

<programming-exercise name='Produktsuche' tmcname='part12-07_product_search'>

Diese Übung befasst sich mit Produkten, die in Tupeln gespeichert sind. Die Beispiele gehen alle von einer Variablen namens `products` aus, der der folgende Wert zugewiesen ist:

```python
products = [("Banane", 5.95, 12), ("Apfel", 3.95, 3), ("Orange", 4.50, 2), ("Wassermelone", 4.95, 22), ("Grünkohl", 0.99, 1)]
```

Jedes Tupel enthält drei Elemente: Name, Preis und Menge.

Bitte schreiben Sie eine Funktion namens `search(products: list, criterion: callable)`. Das zweite Argument der Funktion ist selbst eine Funktion, die in der Lage sein sollte, ein wie oben definiertes Tupel zu verarbeiten und einen booleschen Wert zurückzugeben. Die Suchfunktion soll eine neue Liste zurückgeben, die diejenigen Tupel aus dem Original enthält, die das Kriterium erfüllen.

Wenn wir nur Produkte aufnehmen wollten, deren Preis unter 4 Euro liegt, könnten wir die folgende Kriteriumsfunktion verwenden:

```python
def price_under_4_euros(product):
    return product[1] < 4
```

Die Funktion gibt `True` zurück, wenn das zweite Element im Tupel einen Wert von weniger als vier hat.

Ein Beispiel für die Verwendung der Funktion `search`:

```python
for product in search(products, price_under_4_euros):
    print(product)
```

<sample-output>

('Apfel', 3.95, 3)
('Grünkohl', 0.99, 1)

</sample-output>

Die Kriteriumsfunktion kann auch eine Lambda-Funktion sein. Wenn wir nur nach den Produkten suchen wollten, deren Menge mindestens 11 beträgt, könnten wir Folgendes schreiben:

```python
for product in search(products, lambda t: t[2]>10):
    print(product)
```

<sample-output>

('Banane', 5.95, 12)
('Wassermelone', 4.95, 22)

</sample-output>

</programming-exercise>
