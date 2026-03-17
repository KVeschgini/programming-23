---
path: '/part-8/2-classes-and-objects'
title: 'Klassen und Objekte'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Wissen Sie, was eine Klasse ist
- Verstehen Sie die Verbindung zwischen einer Klasse und einem Objekt
- Wissen Sie, was mit objektorientierter Programmierung gemeint ist

</text-box>

Im vorherigen Abschnitt haben wir mit Listen, Tupeln, Dictionarys und Strings gearbeitet. Dies sind allesamt recht spezielle Fälle in der Python-Programmierung. Die Python-Syntax bietet eine einzigartige, vordefinierte Methode zur Deklaration eines Objekts, das zu jedem dieser Typen gehört:

```python
# Listen werden mit eckigen Klammern deklariert
my_list = [1, 2, 3]

# Strings werden mit Anführungszeichen deklariert
my_string = "Hallo zusammen!"

# Dictionarys werden mit geschweiften Klammern deklariert
my_dict = {"eins": 1, "zwei": 2}

# Tupel werden mit runden Klammern deklariert
my_tuple = (1, 2, 3)
```

Wenn ein Objekt eines anderen Typs deklariert wird, müssen wir eine spezielle Initialisierungsfunktion aufrufen, die als _Konstruktor_ bezeichnet wird. Schauen wir uns die Arbeit mit Brüchen über die Klasse `Fraction` an.

```python
# Wir verwenden die Klasse Fraction aus dem Modul fractions
from fractions import Fraction

# Einige neue Brüche erstellen
half = Fraction(1, 2)

third = Fraction(1, 3)

another = Fraction(3, 11)

# Diese ausgeben
print(half)
print(third)
print(another)

# Brüche können beispielsweise addiert werden
print(half + third)
```

<sample-output>

1/2
1/3
3/11
5/6

</sample-output>

Wie Sie oben sehen können, sehen Konstruktormethodenaufrufe etwas anders aus als die normalen Methodenaufrufe, denen wir bisher begegnet sind. Zum einen sind sie nicht über die Punktnotation an ein Objekt gebunden (da der Konstruktoraufruf überhaupt erst benötigt wird, um ein Objekt zu erstellen). Die Konstruktormethode wird zudem großgeschrieben: `half = Fraction(1, 2)`. Schauen wir uns genauer an, wie Objekte konstruiert werden, indem wir uns mit dem Konzept der _Klasse_ vertraut machen.

## Eine Klasse ist der Bauplan eines Objekts

Wir haben den Begriff _Klasse_ im Material bereits mehrfach verwendet. Beispielsweise haben wir im obigen Beispiel die Klasse `Fraction` aus dem Modul `fractions` importiert. Neue Bruch-Objekte wurden durch Aufruf der _Konstruktor_-Methode der Klasse `Fraction` erstellt.

Eine Klassendefinition enthält die Struktur und Funktionalitäten jedes Objekts, das sie repräsentiert. Aus diesem Grund werden Klassen manchmal als Baupläne von Objekten bezeichnet. Eine Klassendefinition sagt Ihnen also, welche Art von Daten ein Objekt enthält, und definiert auch die Methoden, die auf das Objekt angewendet werden können. _Objektorientierte Programmierung_ bezieht sich auf ein Programmierparadigma, bei dem die Funktionalität des Programms an die Verwendung von Klassen und darauf basierenden Objekten gebunden ist.

Eine einzige Klassendefinition kann verwendet werden, um mehrere Objekte zu erstellen. Wie bereits erwähnt, sind Objekte unabhängig. Änderungen an einem Objekt wirken sich im Allgemeinen nicht auf die anderen Objekte derselben Klasse aus. Jedes Objekt verfügt über seinen eigenen, einzigartigen Satz an Datenattributen. Es könnte hilfreich sein, diese Vereinfachung der Klasse-Objekt-Beziehung zu betrachten:

* Eine Klasse definiert die Variablen
* Wenn ein Objekt erstellt wird, werden diesen Variablen Werte zugewiesen

So können wir ein Objekt vom Typ `Fraction` verwenden, um auf den Zähler (numerator) und Nenner (denominator) einer Bruchzahl zuzugreifen:

```python
from fractions import Fraction

number = Fraction(2, 5)

# Den Zähler ausgeben
print(number.numerator)

# ...und den Nenner
print(number.denominator)
```

<sample-output>

2
5

</sample-output>

Die Klassendefinition von `Fraction` enthält Deklarationen für die Variablen `numerator` und `denominator`. Jedes auf Basis der Klasse erstellte Objekt hat seine eigenen spezifischen Werte, die diesen Variablen zugewiesen sind.

In ähnlicher Weise enthalten Objekte, die auf Basis der Klasse `date` erstellt wurden, jeweils ihre eigenen einzigartigen Werte für Jahr, Monat und Tag des Datums:

```python
from datetime import date

xmas_eve = date(2020, 12, 24)
midsummer = date(2020, 6, 20)

# Nur das Monatsattribut beider Objekte ausgeben
print(xmas_eve.month)
print(midsummer.month)
```

<sample-output>

12
6

</sample-output>

Die Klassendefinition von `date` enthält Deklarationen der Variablen `year`, `month` und `day`. Wenn ein neues `date`-Objekt auf Basis der Klasse erstellt wird, werden diesen Variablen Werte zugewiesen. Jedes Objekt hat seine eigenen einzigartigen Werte, die diesen Variablen zugewiesen sind.

## Funktionen, die mit Objekten arbeiten

Die Übergabe eines Objekts als Argument an eine Funktion sollte Ihnen inzwischen vertraut sein, da wir dies in diesem Kurs bisher schon oft getan haben. Schauen wir uns das folgende Beispiel an. Hier haben wir eine Funktion, die prüft, ob das als Argument übergebene `date`-Objekt auf ein Wochenende fällt:

```python
def is_it_weekend(my_date: date):
    weekday = my_date.isoweekday()
    return weekday == 6 or weekday == 7
```

Diese Funktion verwendet die Methode [isoweekday](https://docs.python.org/3/library/datetime.html#datetime.date.isoweekday), die in der Klassendefinition von `date` definiert ist und einen ganzzahligen Wert zurückgibt: Wenn das angegebene Datum ein Montag ist, wird 1 zurückgegeben, bei einem Dienstag 2 und so weiter.

Sie können die obige Funktion wie folgt verwenden:

```python
xmas_eve = date(2020, 12, 24)
midsummer = date(2020, 6, 20)

print(is_it_weekend(xmas_eve))
print(is_it_weekend(midsummer))
```

<sample-output>

False
True

</sample-output>

## Methoden vs. Variablen

Bei der Arbeit mit einem Objekt vom Typ `date` stellen Sie möglicherweise fest, dass es einen geringfügigen Unterschied gibt, wie auf die im Objekt enthaltenen Variablen zugegriffen wird, im Gegensatz dazu, wie die an die Objekte gebundenen Methoden verwendet werden:

```python
my_date = date(2020, 12, 24)

# Aufruf einer Methode
weekday = my_date.isoweekday()

# Zugriff auf eine Variable
my_month = my_date.month

print("Der Wochentag:", weekday)
print("Der Monat:", my_month)
```

<sample-output>

Der Wochentag: 4
Der Monat: 12

</sample-output>

Der Wochentag, auf den das Datum fällt, ist über die _Methode_ `isoweekday` verfügbar:

```python
weekday = my_date.isoweekday()
```

Dies ist ein Methodenaufruf, daher stehen nach dem Namen der Methode Klammern. Das Weglassen der Klammern führt nicht zu einem Fehler, aber die Ergebnisse sind merkwürdig:

```python
weekday = my_date.isoweekday
print("Der Wochentag:", weekday)
```

<sample-output>

Der Wochentag: <built-in method isoweekday of datetime.date object at 0x10ed66450>

</sample-output>

Der Monat eines `date`-Objekts ist eine Variable, daher kann auf den zugehörigen Wert über eine _Referenz_ zugegriffen werden.

```python
my_month = my_date.month
```

Beachten Sie, dass hier _keine Klammern_ stehen. Das Hinzufügen von Klammern _würde_ einen Fehler verursachen:

```python
my_month = my_date.month()
```

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not callable

</sample-output>

<programming-exercise name='Liste von Jahren' tmcname='part08-03_list_years'>

Bitte schreiben Sie eine Funktion namens `list_years(dates: list)`, die eine Liste von Objekten des Typs `date` als Argument entgegennimmt. Die Funktion sollte eine neue Liste zurückgeben, die die _Jahre aus der ursprünglichen Liste in chronologischer Reihenfolge_ enthält, vom frühesten zum spätesten.

Ein Beispiel für die Funktion in Aktion:

```python
date1 = date(2019, 2, 3)
date2 = date(2006, 10, 10)
date3 = date(1993, 5, 9)

years = list_years([date1, date2, date3])
print(years)
```

<sample-output>

[1993, 2006, 2019]

</sample-output>

</programming-exercise>


<programming-exercise name='Einkaufsliste' tmcname='part08-04_shopping_list'>

Die Aufgabenvorlage enthält eine vordefinierte Klasse `ShoppingList`, die zur Modellierung einer Einkaufsliste verwendet werden kann. Ihre Aufgabe ist es, der Klassendefinition eine Methode hinzuzufügen. Sie müssen keine der bereits definierten Methoden ändern.

Angenommen, wir haben ein `ShoppingList`-Objekt, das in einer Variablen namens `shopping_list` referenziert wird. Das Objekt kann mit den folgenden Methoden gehandhabt werden:

```python
print(shopping_list.number_of_items())
print(shopping_list.item(1))
print(shopping_list.amount(1))
print(shopping_list.item(2))
print(shopping_list.amount(2))
```

<sample-output>

2
Bananas
4
Milk
1

</sample-output>

Wir können auch dies tun:

```python
# Die Elemente auf der Einkaufsliste sind ab 1 indiziert
for i in range(1, shopping_list.number_of_items() + 1):
    item = shopping_list.item(i)
    amount = shopping_list.amount(i)
    print(f"{item}: {amount} units")
```

<sample-output>

Bananas: 4 units
Milk: 1 units

</sample-output>

Wie Sie sehen können, funktioniert eine `ShoppingList` ähnlich wie eine normale Liste, aber der Zugriff erfolgt über die von der Klasse `ShoppingList` bereitgestellten Methoden. Im Gegensatz zu normalen Python-Listen beginnt die Indizierung bei 1, nicht bei 0.

Bitte schreiben Sie eine Funktion namens `total_units(my_list: ShoppingList)`, die ein Objekt vom Typ `ShoppingList` als Argument entgegennimmt. Die Funktion sollte die Gesamtzahl der aufgeführten Einheiten berechnen und den Wert zurückgeben.

Sie können den folgenden Code verwenden, um Ihre Funktion zu testen:

```python
if __name__ == "__main__":
    my_list = ShoppingList()
    my_list.add("bananas", 10)
    my_list.add("apples", 5)
    my_list.add("pineapple", 1)

    print(total_units(my_list))
```

<sample-output>

16

</sample-output>

**Hinweis:** Die Definition der Klasse `ShoppingList` ist bereits in der Aufgabenvorlage enthalten. Sie müssen keine `import`-Anweisung verwenden, um sie zu importieren, anders als in den obigen Beispielen mit den Python-Standardbibliotheksklassen `Fraction` und `date`.

</programming-exercise>
