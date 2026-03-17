---
path: '/part-10/3-oo-programming-techniques'
title: 'Techniken der objektorientierten Programmierung'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Sind Sie mit einigen der verschiedenen Verwendungsmöglichkeiten für den Variablennamen `self` vertraut
- Wissen Sie, wie man Operatoren in eigenen Klassen überlädt
- Sind Sie in der Lage, eine iterierbare Klasse zu erstellen

</text-box>

Eine Klasse kann eine Methode enthalten, die ein Objekt derselben Klasse zurückgibt. Unten haben wir zum Beispiel die Klasse `Product`, deren Methode `product_on_sale` ein neues `Product`-Objekt mit demselben Namen wie das Original, aber mit einem um 25 % niedrigeren Preis zurückgibt:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (Preis {self.__price})"

    def product_on_sale(self):
        on_sale = Product(self.__name, self.__price * 0.75)
        return on_sale
```

```python
apple1 = Product("Apfel", 2.99)
apple2 = apple1.product_on_sale()
print(apple1)
print(apple2)
```

<sample-output>

Apfel (Preis 2.99)
Apfel (Preis 2.2425)

</sample-output>

Wiederholen wir den Zweck der Variablen `self`: Innerhalb einer Klassendefinition bezieht sie sich auf das Objekt selbst. Typischerweise wird sie verwendet, um auf die eigenen Merkmale des Objekts, seine Attribute und Methoden, zu verweisen. Die Variable kann jedoch auch verwendet werden, um auf das gesamte Objekt zu verweisen, beispielsweise wenn das Objekt selbst an den Client-Code zurückgegeben werden soll. Im folgenden Beispiel haben wir die Methode `cheaper` zur Klassendefinition hinzugefügt. Sie nimmt ein anderes `Product` als Argument entgegen und gibt das günstigere der beiden zurück:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (Preis {self.__price})"

    @property
    def price(self):
        return self.__price

    def cheaper(self, another_product: "Product"):
        if self.__price < another_product.price:
            return self
        else:
            return another_product
```

```python
apple = Product("Apfel", 2.99)
orange = Product("Orange", 3.95)
banana = Product("Banane", 5.25)

print(orange.cheaper(apple))
print(orange.cheaper(banana))
```

<sample-output>

Apfel (Preis 2.99)
Orange (Preis 3.95)

</sample-output>

Obwohl dies einwandfrei funktioniert, handelt es sich um einen sehr speziellen Fall des Vergleichs zweier Objekte. Es wäre besser, wenn wir die Python-Vergleichsoperatoren direkt auf diese `Product`-Objekte anwenden könnten.

## Operatoren überladen (Operator Overloading)

Python enthält einige speziell benannte integrierte Methoden für die Arbeit mit den standardmäßigen arithmetischen und Vergleichsoperatoren. Diese Technik wird als _Operator-Überladung_ bezeichnet. Wenn Sie einen bestimmten Operator auf Instanzen selbst definierter Klassen anwenden können möchten, können Sie eine spezielle Methode schreiben, die das korrekte Ergebnis des Operators zurückgibt. Wir haben diese Technik bereits mit der Methode `__str__` angewendet: Python weiß, dass es nach einer so benannten Methode suchen muss, wenn eine String-Repräsentation eines Objekts angefordert wird.

Beginnen wir mit dem Operator `>`, der uns sagt, ob der erste Operand größer als der zweite ist. Die untenstehende Klassendefinition von `Product` enthält die Methode `__gt__`, was kurz für *g*reater *t*han ist. Diese speziell benannte Methode sollte das korrekte Ergebnis des Vergleichs zurückgeben. Konkret sollte sie genau dann `True` zurückgeben, wenn das aktuelle Objekt größer ist als das als Argument übergebene Objekt. Die verwendeten Kriterien können vom Programmierer festgelegt werden. Mit _aktuellem Objekt_ meinen wir das Objekt, auf dem die Methode mit der Punktnotation `.` aufgerufen wird.

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (Preis {self.__price})"

    @property
    def price(self):
        return self.__price

    def __gt__(self, another_product):
        return self.price > another_product.price
```

In der obigen Implementierung gibt die Methode `__gt__` den Wert `True` zurück, wenn der Preis des aktuellen Produkts höher ist als der Preis des als Argument übergebenen Produkts. Andernfalls gibt die Methode `False` zurück.

Nun steht der Vergleichsoperator `>` für die Verwendung mit Objekten vom Typ `Product` zur Verfügung:

```python
orange = Product("Orange", 2.90)
apple = Product("Apfel", 3.95)

if orange > apple:
    print("Orange ist größer")
else:
    print("Apfel ist größer")
```

<sample-output>

Apfel ist größer

</sample-output>

Wie oben erwähnt, liegt es am Programmierer, die Kriterien zu bestimmen, nach denen entschieden wird, was größer und was kleiner ist. Wir könnten zum Beispiel entscheiden, dass die Reihenfolge nicht auf dem Preis basieren soll, sondern stattdessen alphabetisch nach dem Namen erfolgt. Das würde bedeuten, dass `orange` nun "größer als" `apple` wäre, da "Orange" alphabetisch nach "Apfel" kommt.

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (Preis {self.__price})"

    @property
    def price(self):
        return self.__price

    @property
    def name(self):
        return self.__name

    def __gt__(self, another_product):
        return self.name > another_product.name
```

```python
orange = Product("Orange", 4.90)
apple = Product("Apfel", 3.95)

if orange > apple:
    print("Orange ist größer")
else:
    print("Apfel ist größer")
```

<sample-output>

Orange ist größer

</sample-output>

## Weitere Operatoren

Hier finden Sie eine Tabelle mit den standardmäßigen Vergleichsoperatoren sowie den Methoden, die implementiert werden müssen, wenn wir sie für unsere Objekte verfügbar machen möchten:

Operator | Traditionelle Bedeutung | Name der Methode
:--:|:--:|:--:
`<` | Kleiner als | `__lt__(self, another)`
`>` | Größer als | `__gt__(self, another)`
`==` | Gleich | `__eq__(self, another)`
`!=` | Ungleich | `__ne__(self, another)`
`<=` | Kleiner oder gleich | `__le__(self, another)`
`>=` | Größer oder gleich | `__ge__(self, another)`

Sie können auch einige andere Operatoren implementieren, einschließlich der folgenden arithmetischen Operatoren:

Operator | Traditionelle Bedeutung | Name der Methode
:--:|:--:|:--:
`+` | Addition | `__add__(self, another)`
`-` | Subtraktion | `__sub__(self, another)`
`*` | Multiplikation | `__mul__(self, another)`
`/` | Division (Fließkomma-Ergebnis) | `__truediv__(self, another)`
`//` | Division (Ganzzahl-Ergebnis) | `__floordiv__(self, another)`

Weitere Operatoren und Methodennamen lassen sich leicht online finden. Denken Sie auch an den Befehl `dir`, um die für ein bestimmtes Objekt verfügbaren Methoden aufzulisten.

Es ist nur sehr selten notwendig, alle arithmetischen und Vergleichsoperatoren in Ihren eigenen Klassen zu implementieren. Beispielsweise ist die Division eine Operation, die außerhalb von numerischen Objekten selten Sinn ergibt. Was wäre das Ergebnis der Division eines `Student`-Objekts durch drei oder durch ein anderes `Student`-Objekt? Dennoch sind einige dieser Operatoren oft auch bei eigenen Klassen sehr nützlich. Die Auswahl der zu implementierenden Methoden hängt davon ab, was unter Berücksichtigung der Eigenschaften Ihrer Objekte sinnvoll ist.

Schauen wir uns eine Klasse an, die eine einzelne Notiz modelliert. Wenn wir die Methode `__add__` in unserer Klassendefinition implementieren, wird der Additionsoperator `+` für unsere `Note`-Objekte verfügbar:

```python
from datetime import datetime

class Note:
    def __init__(self, entry_date: datetime, entry: str):
        self.entry_date = entry_date
        self.entry = entry

    def __str__(self):
        return f"{self.entry_date}: {self.entry}"

    def __add__(self, another):
        # Das Datum der neuen Notiz ist die aktuelle Zeit
        new_note = Note(datetime.now(), "")
        new_note.entry = self.entry + " und " + another.entry
        return new_note
```

```python
entry1 = Note(datetime(2016, 12, 17), "Geschenke kaufen nicht vergessen")
entry2 = Note(datetime(2016, 12, 23), "Weihnachtsbaum besorgen")

# Diese Notizen können mit dem +-Operator addiert werden
# Dies ruft die __add__-Methode in der Note-Klasse auf
both = entry1 + entry2
print(both)
```

<sample-output>

2020-09-09 14:13:02.163170: Geschenke kaufen nicht vergessen und Weihnachtsbaum besorgen

</sample-output>

## Eine String-Repräsentation eines Objekts

Sie haben bereits einige `__str__`-Methoden in Ihren Klassen implementiert. Wie Sie wissen, gibt die Methode eine String-Repräsentation des Objekts zurück. Eine weitere, recht ähnliche Methode ist `__repr__`, die eine _technische_ Repräsentation des Objekts zurückgibt. Die Methode `__repr__` wird oft so implementiert, dass sie den Programmcode zurückgibt, der ausgeführt werden kann, um ein Objekt mit _identischem Inhalt_ zum aktuellen Objekt zu erhalten.

Die Funktion `repr` gibt diese technische String-Repräsentation des Objekts zurück. Die technische Repräsentation wird auch immer dann verwendet, wenn die Methode `__str__` für das Objekt nicht definiert wurde. Das folgende Beispiel verdeutlicht dies:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def __repr__(self):
        return f"Person({repr(self.name)}, {self.age})"
```

```python
person1 = Person("Anna", 25)
person2 = Person("Peter", 99)
print(person1)
print(person2)
```

<sample-output>

Person('Anna', 25)
Person('Peter', 99)

</sample-output>

Beachten Sie, wie die Methode `__repr__` selbst die Funktion `repr` verwendet, um die technische Repräsentation des Strings abzurufen. Dies ist notwendig, um die Anführungszeichen `'` in das Ergebnis einzuschließen.

Die folgende Klasse hat Definitionen für sowohl `__repr__` als auch `__str__`:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def __repr__(self):
        return f"Person({repr(self.name)}, {self.age})"

    def __str__(self):
        return f"{self.name} ({self.age} Jahre)"
```

```python
anna = Person("Anna", 25)
print(anna)
print(repr(anna))
```

<sample-output>

Anna (25 Jahre)
Person('Anna', 25)

</sample-output>

Erwähnenswert ist, dass Python bei Datenstrukturen wie Listen immer die Methode `__repr__` für die String-Repräsentation des Inhalts verwendet. Das kann manchmal etwas verwirrend aussehen:

```python
persons = []
persons.append(Person("Anna", 25))
persons.append(Person("Peter", 99))
persons.append(Person("Mary", 55))
print(persons)
```

<sample-output>

[Person('Anna', 25), Person('Peter', 99), Person('Mary', 55)]

</sample-output>

<programming-exercise name='Geld' tmcname='part10-07_money'>

Die Aufgabenvorlage enthält einen Entwurf für eine Klasse namens `Money`. In dieser Aufgabe sollen Sie einige zusätzliche Methoden implementieren und einige kleine Probleme in der Vorlage beheben.

## Die String-Repräsentation korrigieren

Die Methode `__str__` in der Klassendefinition funktioniert nicht ganz richtig. Bei den folgenden zwei `Money`-Objekten wird das zweite falsch ausgegeben:

```python
e1 = Money(4, 10)
e2 = Money(2, 5)  # zwei Euro und fünf Cent

print(e1)
print(e2)
```

<sample-output>

4.10
2.5

</sample-output>

Bitte korrigieren Sie die Methode so, dass sie Folgendes ausgibt:

<sample-output>

4.10 eur
2.05 eur

</sample-output>

## Gleiche Beträge

Bitte definieren Sie eine neue Methode namens `__eq__(self, another)`, die es ermöglicht, den Vergleichsoperator `==` auf `Money`-Objekte anzuwenden. Sie können Ihre Implementierung mit dem folgenden Code testen:

```python
e1 = Money(4, 10)
e2 = Money(2, 5)
e3 = Money(4, 10)

print(e1)
print(e2)
print(e3)
print(e1 == e2)
print(e1 == e3)
```

<sample-output>

4.10 eur
2.05 eur
4.10 eur
False
True

</sample-output>

## Andere Vergleichsoperatoren

Bitte implementieren Sie die entsprechenden Methoden für die Vergleichsoperatoren `<`, `>` und `!=`.

```python
e1 = Money(4, 10)
e2 = Money(2, 5)

print(e1 != e2)
print(e1 < e2)
print(e1 > e2)
```

<sample-output>

True
False
True

</sample-output>

## Addition und Subtraktion

Bitte implementieren Sie die Additions- und Subtraktionsoperatoren `+` und `-` für `Money`-Objekte. Beide sollten ein neues Objekt vom Typ `Money` zurückgeben. Weder das Objekt selbst noch das als Argument übergebene Objekt sollten durch die Operation geändert werden.

Hinweis: Der Wert eines `Money`-Objekts kann nicht negativ sein. Falls ein Subtraktionsversuch zu einem negativen Ergebnis führen würde, sollte die Methode eine `ValueError`-Ausnahme auslösen.

```python
e1 = Money(4, 5)
e2 = Money(2, 95)

e3 = e1 + e2
e4 = e1 - e2

print(e3)
print(e4)

e5 = e2 - e1
```

<sample-output>

7.00 eur
1.10 eur
Traceback (most recent call last):
  File "money.py", line 416, in <module>
    e5 = e2-e1
  File "money.py", line 404, in __sub__
    raise ValueError(f"a negative result is not allowed")
ValueError: a negative result is not allowed

</sample-output>

## Der Wert darf nicht direkt zugänglich sein

Die Klasse hat noch ein kleines Integritätsproblem. Der Benutzer kann "schummeln", indem er direkt auf die Attribute zugreift und den im `Money`-Objekt gespeicherten Wert ändert:

```python
print(e1)
e1.euros = 1000
print(e1)
```

<sample-output>

4.05 eur
1000.05 eur

</sample-output>

Bitte [kapseln](/part-9/3-encapsulation#kapselung) Sie die Implementierung der in der Klasse definierten Attribute so, dass der oben gezeigte Betrug nicht möglich ist. Die Klasse sollte keine öffentlichen Attribute und keine Getter- oder Setter-Methoden für Euro oder Cent haben.

</programming-exercise>

<programming-exercise name='Einfaches Datum' tmcname='part10-08_simple_date'>

In dieser Aufgabe sollen Sie die Klasse `SimpleDate` implementieren, die den Umgang mit Daten ermöglicht. Der Einfachheit halber nehmen wir hier an, dass _jeder Monat 30 Tage hat_.

Wegen dieser Vereinfachung sollten Sie das Modul `datetime` aus der Python-Standardbibliothek nicht verwenden. Sie werden stattdessen eine ähnliche Funktionalität selbst implementieren.

## Vergleiche

Bitte implementieren Sie das Grundgerüst der Klasse zusammen mit Methoden, die Vergleiche mit den Operatoren `<`, `>`, `==` und `!=` ermöglichen. Sie können den folgenden Code verwenden, um Ihre Implementierung zu testen:

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(28, 12, 1985)
d3 = SimpleDate(28, 12, 1985)

print(d1)
print(d2)
print(d1 == d2)
print(d1 != d2)
print(d1 == d3)
print(d1 < d2)
print(d1 > d2)
```

<sample-output>

4.10.2020
28.12.1985
False
True
False
False
True

</sample-output>

## Inkrementieren

Bitte implementieren Sie den Additionsoperator `+`, der es ermöglicht, eine bestimmte Anzahl von Tagen zu einem `SimpleDate`-Objekt hinzuzufügen. Der Operator sollte ein neues `SimpleDate`-Objekt zurückgeben. Das ursprüngliche Objekt sollte nicht geändert werden.

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(28, 12, 1985)

d3 = d1 + 3
d4 = d2 + 400

print(d1)
print(d2)
print(d3)
print(d4)
```

<sample-output>

4.10.2020
28.12.1985
7.10.2020
8.2.1987

</sample-output>

## Differenz

Bitte implementieren Sie den Subtraktionsoperator `-`, mit dem Sie die Differenz in Tagen zwischen zwei `SimpleDate`-Objekten ermitteln können. Da wir davon ausgegangen sind, dass jeder Monat 30 Tage hat, ist ein Jahr im Rahmen dieser Aufgabe 12 * 30 = 360 Tage lang.

Sie können den folgenden Code verwenden, um Ihr Programm zu testen:

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(2, 11, 2020)
d3 = SimpleDate(28, 12, 1985)

print(d2 - d1)
print(d1 - d2)
print(d1 - d3)
```

<sample-output>

28
28
12516

</sample-output>

</programming-exercise>

## Iteratoren

Wir wissen, dass die `for`-Anweisung verwendet werden kann, um durch viele verschiedene Datenstrukturen, Dateien und Sammlungen von Elementen zu _iterieren_. Ein typischer Anwendungsfall wäre die folgende Funktion:

```python
def count_positives(my_list: list):
    n = 0
    for item in my_list:
        if item > 0:
            n += 1
    return n
```

Die Funktion geht die Elemente in der Liste nacheinander durch und verfolgt, wie viele der Elemente positiv waren.

Es ist möglich, auch eigene Klassen iterierbar zu machen. Dies ist nützlich, wenn der Kernzweck der Klasse darin besteht, eine Sammlung von Elementen zu speichern. Die Klasse `Bookshelf` aus einem vorherigen Beispiel wäre ein guter Kandidat, da es sinnvoll wäre, eine `for`-Schleife zu verwenden, um die Bücher im Regal durchzugehen. Dasselbe gilt beispielsweise für ein Studentenregister. Die Möglichkeit, durch die Sammlung von Studenten zu iterieren, könnte nützlich sein.

Um eine Klasse iterierbar zu machen, müssen Sie die Iterator-Methoden `__iter__` und `__next__` implementieren. Wir werden nach dem folgenden Beispiel auf die Besonderheiten dieser Methoden zurückkommen:

```python
class Book:
    def __init__(self, name: str, author: str, page_count: int):
        self.name = name
        self.author = author
        self.page_count = page_count

class Bookshelf:
    def __init__(self):
        self._books = []

    def add_book(self, book: Book):
        self._books.append(book)

    # Dies ist die Initialisierungsmethode des Iterators
    # Die Iterationsvariable(n) sollten hier initialisiert werden
    def __iter__(self):
        self.n = 0
        # Die Methode gibt eine Referenz auf das Objekt selbst zurück, da
        # der Iterator innerhalb derselben Klassendefinition implementiert ist
        return self

    # Diese Methode gibt das nächste Element innerhalb des Objekts zurück
    # Wenn alle Elemente durchlaufen wurden, wird das StopIteration-Ereignis ausgelöst
    def __next__(self):
        if self.n < len(self._books):
            # Das aktuelle Element aus der Liste innerhalb des Objekts auswählen
            book = self._books[self.n]
            # Den Zähler (d. h. die Iterationsvariable) um eins erhöhen
            self.n += 1
            # Das aktuelle Element zurückgeben
            return book
        else:
            # Alle Bücher wurden durchlaufen
            raise StopIteration
```

Die Methode `__iter__` initialisiert die Iterationsvariable oder -variablen. In diesem Fall genügt ein einfacher Zähler, der den Index des aktuellen Elements in der Liste enthält. Wir benötigen außerdem die Methode `__next__`, die das nächste Element im Iterator zurückgibt. Im obigen Beispiel gibt die Methode das Element an Index `n` aus der Liste innerhalb des `Bookshelf`-Objekts zurück, und die Iteratorvariable wird ebenfalls inkrementiert.

Wenn alle Objekte durchlaufen wurden, löst die Methode `__next__` die Ausnahme `StopIteration` aus. Der Vorgang unterscheidet sich nicht vom Auslösen anderer Ausnahmen, aber diese Ausnahme wird von Python automatisch behandelt. Ihr Zweck ist es, dem Code, der den Iterator aufruft (z. B. einer `for`-Schleife), zu signalisieren, dass die Iteration nun beendet ist.

Unser `Bookshelf` ist nun bereit für die Iteration, zum Beispiel mit einer `for`-Schleife:

```python
if __name__ == "__main__":
    b1 = Book("Das Leben des Python", "Montague Python", 123)
    b2 = Book("Der alte Mann und das C", "Ernest Hemingjavay", 204)
    b3 = Book("Eine gute Tasse Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Die Namen aller Bücher ausgeben
    for book in shelf:
        print(book.name)
```

<sample-output>

Das Leben des Python
Der alte Mann und das C
Eine gute Tasse Java

</sample-output>


<programming-exercise name='Eine iterierbare Einkaufsliste' tmcname='part10-09_iterable_shopping_list'>

Die Aufgabenvorlage enthält die Klasse `ShoppingList` aus der [Aufgabe in Teil 8](/part-8/2-classes-and-objects#programming-exercise-shopping-list). Bitte passen Sie die Klasse so an, dass sie iterierbar ist und somit wie folgt verwendet werden kann:

```python
shopping_list = ShoppingList()
shopping_list.add("Bananen", 10)
shopping_list.add("Äpfel", 5)
shopping_list.add("Ananas", 1)

for product in shopping_list:
    print(f"{product[0]}: {product[1]} Einheiten")
```

<sample-output>

Bananen: 10 Einheiten
Äpfel: 5 Einheiten
Ananas: 1 Einheiten

</sample-output>

Die Methode `__next__` Ihres Iterators sollte Tupel zurückgeben, wobei das erste Element der Name des Produkts und das zweite Element die Menge ist.

</programming-exercise>
