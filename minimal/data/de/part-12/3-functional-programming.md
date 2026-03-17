---
path: '/part-12/3-functional-programming'
title: 'Funktionale Programmierung'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was funktionale Programmierung bedeutet
- werden Sie in der Lage sein, die Funktionen `map`, `reduce` und `filter` in Ihren eigenen Programmen zu nutzen

</text-box>

Funktionale Programmierung bezieht sich auf ein _Programmierparadigma_, das Änderungen des Programmzustands so weit wie möglich vermeidet. Variablen werden im Allgemeinen vermieden. Stattdessen bilden Ketten von Funktionsaufrufen das Rückgrat des Programms.

Lambda-Ausdrücke und verschiedene Arten von Abstraktionen sind gängige Techniken im funktionalen Programmierstil, da sie es ermöglichen, Daten zu verarbeiten, ohne sie in Variablen zu speichern, sodass sich der Zustand des Programms nicht ändert. Beispielsweise ist ein Lambda-Ausdruck in jeder Hinsicht eine Funktion, aber wir müssen nirgendwo einen benannten Verweis darauf speichern.

Wie oben erwähnt, ist die funktionale Programmierung ein Programmierparadigma oder ein Programmierstil. Es gibt viele verschiedene Programmierparadigmen, und wir sind bereits auf einige von ihnen gestoßen:

* imperative Programmierung, bei der das Programm aus einer Folge von Befehlen besteht, die der Reihe nach ausgeführt werden
* prozedurale Programmierung, bei der das Programm in Prozeduren oder Teilprogramme gruppiert ist
* objektorientierte Programmierung, bei der das Programm und sein Zustand in Objekten gespeichert werden, die in Klassen definiert sind.

Es gibt unterschiedliche Meinungen über die Unterteilung der verschiedenen Paradigmen; einige behaupten beispielsweise, dass imperative und prozedurale Programmierung dasselbe bedeuten, während andere die imperative Programmierung als Oberbegriff betrachten, der sowohl die prozedurale als auch die objektorientierte Programmierung abdeckt. Die Terminologie und die Unterteilungen sind nicht so wichtig, ebenso wenig wie das strikte Festhalten an dem einen oder anderen Paradigma. Es ist jedoch wichtig zu verstehen, dass solche unterschiedlichen Ansätze existieren, da sie die Entscheidungen beeinflussen, die Programmierer treffen.

Viele Programmiersprachen sind mit Blick auf das eine oder andere Programmierparadigma konzipiert, aber Python ist eine recht vielseitige Programmiersprache und ermöglicht das Befolgen mehrerer verschiedener Programmierparadigmen, sogar innerhalb eines einzigen Programms. Dies lässt uns die effizienteste und klarste Methode zur Lösung jedes Problems wählen.

Werfen wir einen Blick auf einige Werkzeuge für die funktionale Programmierung, die Python bereitstellt.

## map

Die Funktion `map` führt eine Operation an jedem Element in einer iterierbaren Serie aus. Dies klingt sehr nach dem Effekt, den eine Abstraktion hat, aber die Syntax ist anders.

Nehmen wir an, wir haben eine Liste von Zeichenketten, die wir in eine Liste von Ganzzahlen umwandeln wollen:

```python
str_list = ["123","-10", "23", "98", "0", "-110"]

integers = map(lambda x : int(x), str_list)

print(integers) # Dies sagt uns, mit welcher Art von Objekt wir es zu tun haben

for number in integers:
    print(number)
```

<sample-output>

<map object at 0x0000021A4BFA9A90>
123
-10
23
98
0
-110

</sample-output>

Die allgemeine Syntax für die Funktion `map` lautet

`map(<Funktion>, <Serie>)`

wobei `Funktion` die Operation ist, die wir an jedem Element in der `Serie` ausführen wollen.

Die Funktion `map` gibt ein Objekt vom Typ `map` zurück, das iterierbar ist und in eine Liste umgewandelt werden kann:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["erstens", "zweitens", "drittens", "viertens"]

capitalized = map(capitalize, test_list)

capitalized_list = list(capitalized)
print(capitalized_list)
```

<sample-output>

['Erstens', 'Zweitens', 'Drittens', 'Viertens']

</sample-output>

Wie Sie aus den obigen Beispielen ersehen können, akzeptiert die Funktion `map` sowohl eine anonyme Lambda-Funktion als auch eine benannte Funktion, die mit dem Schlüsselwort `def` definiert wurde.

Dasselbe Ergebnis könnten wir mit einer Listen-Abstraktion erzielen:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["erstens", "zweitens", "drittens", "viertens"]

capitalized_list = [capitalize(item) for item in test_list]
print(capitalized_list)
```

...oder wir könnten die ursprüngliche Liste mit einer `for`-Schleife durchlaufen und die verarbeiteten Elemente mit der Methode `append` in einer neuen Liste speichern. In der Programmierung gibt es in der Regel viele verschiedene Lösungen für jedes Problem. Es gibt selten absolut richtige oder falsche Antworten. Die Kenntnis vieler verschiedener Ansätze hilft Ihnen, den für die jeweilige Situation am besten geeigneten oder denjenigen zu wählen, der Ihrem eigenen Geschmack am besten entspricht.

Es ist erwähnenswert, dass die Funktion `map` keine Liste zurückgibt, sondern ein _Iterator_-Objekt vom Typ map. Ein Iterator verhält sich in vielerlei Hinsicht wie eine Liste, aber es gibt Ausnahmen, wie im folgenden Beispiel zu sehen ist:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["erstens", "zweitens", "drittens", "viertens"]

# Den Rückgabewert der map-Funktion speichern
capitalized = map(capitalize, test_list)

for word in capitalized:
  print(word)

print("Dasselbe noch einmal ausgeben:")
for word in capitalized:
  print(word)
```

Dies würde Folgendes ausgeben:

<sample-output>

Erstens
Zweitens
Drittens
Viertens
Dasselbe noch einmal ausgeben:

</sample-output>

Oben haben wir versucht, den Inhalt des `map`-Iterators zweimal auszugeben, aber der zweite Versuch ergab keine Ausgabe. Der Grund dafür ist, dass `map` ein Iterator ist; das Durchlaufen mit einer `for`-Schleife "erschöpft" ihn, ähnlich wie ein Generator erschöpft ist, sobald sein Maximalwert erreicht ist. Sobald die Elemente im Iterator mit einer `for`-Schleife durchlaufen wurden, ist nichts mehr übrig, was man durchgehen könnte.

Wenn Sie den Inhalt eines `map`-Iterators mehr als einmal durchgehen müssen, könnten Sie die Map beispielsweise in eine Liste umwandeln:

```python
test_list = ["erstens", "zweitens", "drittens", "viertens"]

# Den Rückgabewert der map-Funktion in eine Liste umwandeln
capitalized = list(map(capitalize, test_list))

for word in capitalized:
  print(word)

print("Dasselbe noch einmal ausgeben:")
for word in capitalized:
  print(word)
```

<sample-output>

Erstens
Zweitens
Drittens
Viertens
Dasselbe noch einmal ausgeben:
Erstens
Zweitens
Drittens
Viertens

</sample-output>

## Die map-Funktion und Ihre eigenen Klassen

Sie können natürlich auch Instanzen Ihrer eigenen Klassen mit der Funktion `map` verarbeiten. Dabei gibt es keine besonderen Tricks, wie Sie im folgenden Beispiel sehen können:

```python
class BankAccount:
    def __init__(self, account_number: str, name: str, balance: float):
        self.__account_number = account_number
        self.name = name
        self.__balance = balance

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

a1 = BankAccount("123456", "Randy Riches", 5000)
a2 = BankAccount("12321", "Paul Pauper", 1)
a3 = BankAccount("223344", "Mary Millionaire ", 1000000)

accounts = [a1, a2, a3]

clients = map(lambda t: t.name, accounts)
for name in clients:
  print(name)

balances = map(lambda t: t.get_balance(), accounts)
for balance in balances:
  print(balance)
```

<sample-output>

Randy Riches
Paul Pauper
Mary Millionaire
5000
1
1000000

</sample-output>

Hier sammeln wir zunächst die Namen der Kontoinhaber mit der Funktion `map`. Eine anonyme Lambda-Funktion wird verwendet, um den Wert des Attributs `name` aus jedem `BankAccount`-Objekt abzurufen:

```python
clients = map(lambda t: t.name, accounts)
```

In ähnlicher Weise wird der Kontostand jedes `BankAccount` gesammelt. Die Lambda-Funktion sieht etwas anders aus, da der Kontostand mit einem Methodenaufruf abgerufen wird und nicht direkt aus dem Attribut:

```python
balances = map(lambda t: t.get_balance(), accounts)
```

<programming-exercise name='Versuchte Kurse' tmcname='part12-11_attempted_courses'>

Die Übungsvorlage enthält die Klassendefinition für einen `CourseAttempt`. Sie funktioniert wie folgt:

```python
attempt = CourseAttempt("Peter Python", "Einführung in die Programmierung", 5)
print(attempt.student_name)
print(attempt.course_name)
print(attempt.grade)
print(attempt)
```

<sample-output>

Peter Python
Einführung in die Programmierung
5
Peter Python, Note für den Kurs Einführung in die Programmierung 5

</sample-output>

## Namen der Studenten

Bitte schreiben Sie eine Funktion namens `names_of_students(attempts: list)`, die eine Liste von `CourseAttempt`-Objekten als Argument entgegennimmt. Die Funktion soll eine neue Liste mit den Namen der Studenten zurückgeben, die den Kurs versucht haben.

```python
s1 = CourseAttempt("Peter Python", "Einführung in die Programmierung", 3)
s2 = CourseAttempt("Olivia C. Objective", "Einführung in die Programmierung", 5)
s3 = CourseAttempt("Peter Python", "Fortgeschrittener Kurs in Programmierung", 2)

for name in names_of_students([s1, s2, s3]):
    print(name)
```

<sample-output>

Peter Python
Olivia C. Objective
Peter Python

</sample-output>

Bitte implementieren Sie die Funktion unter Verwendung der Funktion `map`.

## Kurse

Bitte schreiben Sie eine Funktion namens `course_names(attempts: list)`, die eine Liste von `CourseAttempt`-Objekten als Argument entgegennimmt. Die Funktion soll eine neue Liste zurückgeben, welche die Namen der Kurse auf der ursprünglichen Liste in alphabetischer Reihenfolge enthält. Jeder Kursname sollte nur einmal auf der Liste erscheinen.

```python
s1 = CourseAttempt("Peter Python", "Einführung in die Programmierung", 3)
s2 = CourseAttempt("Olivia C. Objective", "Einführung in die Programmierung", 5)
s3 = CourseAttempt("Peter Python", "Fortgeschrittener Kurs in Programmierung", 2)

for name in course_names([s1, s2, s3]):
    print(name)
```
<sample-output>

Fortgeschrittener Kurs in Programmierung
Einführung in die Programmierung

</sample-output>

Bitte implementieren Sie die Funktion unter Verwendung der Funktion `map`. Das allein wird jedoch wahrscheinlich nicht ausreichen. Sie werden noch etwas anderes benötigen, um sicherzustellen, dass die Kursnamen eindeutig sind.

</programming-exercise>

## filter

Die integrierte Python-Funktion `filter` ähnelt der Funktion `map`, übernimmt aber, wie der Name schon sagt, nicht alle Elemente aus der Quelle. Stattdessen filtert sie diese mit einer Kriteriumsfunktion, die als Argument übergeben wird. Wenn die Kriteriumsfunktion `True` zurückgibt, wird das Element ausgewählt.

Sehen wir uns ein Beispiel mit `filter` an:

```python
integers = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

even_numbers = filter(lambda number: number % 2 == 0, integers)

for number in even_numbers:
    print(number)
```

<sample-output>

2
6
4
10
14

</sample-output>

Es könnte das obige Beispiel etwas klarer machen, wenn wir stattdessen eine benannte Funktion verwenden würden:

```python
def is_it_even(number: int):
    if number % 2 == 0:
        return True
    return False

integers = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

even_numbers = filter(is_it_even, integers)

for number in even_numbers:
    print(number)
```

Diese beiden Programme sind funktional völlig identisch. Es ist weitgehend Geschmackssache, welchen Ansatz Sie für besser halten.

Werfen wir einen Blick auf ein weiteres Filterbeispiel. Dieses Programm modelliert Fische und wählt nur diejenigen aus, die mindestens 1000 Gramm wiegen:

```python
class Fish:
    """ Die Klasse modelliert einen Fisch einer bestimmten Art und eines bestimmten Gewichts """
    def __init__(self, species: str, weight: int):
        self.species = species
        self.weight = weight

    def __repr__(self):
        return f"{self.species} ({self.weight} g.)"

if __name__ == "__main__":
    f1 = Fish("Hecht", 1870)
    f2 = Fish("Barsch", 763)
    f3 = Fish("Hecht", 3410)
    f4 = Fish("Dorsch", 2449)
    f5 = Fish("Plötze", 210)

    fishes = [f1, f2, f3, f4, f5]

    over_a_kilo = filter(lambda fish : fish.weight >= 1000, fishes)

    for fish in over_a_kilo:
        print(fish)
```

<sample-output>

Hecht (1870 g.)
Hecht (3410 g.)
Dorsch (2449 g.)

</sample-output>

Wir könnten genauso gut eine Listen-Abstraktion verwenden und dasselbe Ergebnis erzielen:

```python
over_a_kilo = [fish for fish in fishes if fish.weight >= 1000]
```

## Der Rückgabewert von filter ist ein Iterator

Die Funktion `filter` ähnelt der Funktion `map` auch darin, dass sie einen _Iterator_ zurückgibt. Es gibt Situationen, in denen Sie bei `filter` besonders vorsichtig sein sollten, da Iteratoren nur einmal durchlaufen werden können. Der Versuch, die Sammlung großer Fische zweimal auszugeben, wird also nicht ganz so einfach funktionieren, wie Sie vielleicht denken:

```python
f1 = Fish("Hecht", 1870)
f2 = Fish("Barsch", 763)
f3 = Fish("Hecht", 3410)
f4 = Fish("Dorsch", 2449)
f5 = Fish("Plötze", 210)

fishes = [f1, f2, f3, f4, f5]

over_a_kilo = filter(lambda fish : fish.weight >= 1000, fishes)

for fish in over_a_kilo:
    print(fish)

print("Dasselbe noch einmal ausgeben:")

for Fish in over_a_kilo:
    print(Fish)
```

Dies würde Folgendes ausgeben:

<sample-output>

Hecht (1870 g.)
Hecht (3410 g.)
Dorsch (2449 g.)
Dasselbe noch einmal ausgeben:

</sample-output>

Wenn Sie den Inhalt eines `filter`-Iterators mehr als einmal durchgehen müssen, könnten Sie das Ergebnis in eine Liste umwandeln:

```python
fishes = [f1, f2, f3, f4, f5]

# Den Rückgabewert der filter-Funktion in eine Liste umwandeln
over_a_kilo = list(filter(lambda fish : fish.weight >= 1000, fishes))
```

<programming-exercise name='Versuche filtern' tmcname='part12-12_filtering_attempts'>

In dieser Übung fahren wir mit der Klasse `CourseAttempt` fort.

## Akzeptierte Versuche

Bitte schreiben Sie eine Funktion namens `accepted(attempts: list)`, die eine Liste von `CourseAttempt`-Objekten als Argument entgegennimmt. Die Funktion soll eine neue Liste von `CourseAttempt`-Objekten zurückgeben, die nur diejenigen Elemente aus der ursprünglichen Liste enthält, deren Note mindestens 1 beträgt.

```python
s1 = CourseAttempt("Peter Python", "Einführung in die Programmierung", 3)
s2 = CourseAttempt("Olivia C. Objective", "Einführung in die Programmierung", 5)
s3 = CourseAttempt("Peter Python", "Fortgeschrittener Kurs in Programmierung", 0)

for attempt in accepted([s1, s2, s3]):
    print(attempt)
```

<sample-output>

Peter Python, Note für den Kurs Einführung in die Programmierung 3
Olivia C. Objective Note für den Kurs Einführung in die Programmierung 5

</sample-output>

Bitte implementieren Sie die Funktion unter Verwendung der Funktion `filter`.

## Versuche mit Note

Bitte schreiben Sie eine Funktion namens `attempts_with_grade(attempts: list, grade: int)`, die eine Liste von `CourseAttempt`-Objekten und eine Ganzzahl als Argumente entgegennimmt. Die Funktion soll eine neue Liste zurückgeben, die nur diejenigen `CourseAttempt`-Objekte aus der ursprünglichen Liste enthält, deren Note mit dem zweiten Argument übereinstimmt.

```python
s1 = CourseAttempt("Peter Python", "Einführung in die Programmierung", 3)
s2 = CourseAttempt("Olivia C. Objective", "Einführung in die Programmierung", 5)
s3 = CourseAttempt("Peter Python", "Einführung in KI", 3)
s4 = CourseAttempt("Olivia C. Objective", "Datenstrukturen und Algorithmen", 3)

for attempt in attempts_with_grade([s1, s2, s3, s4], 3):
    print(attempt)
```

<sample-output>

Peter Python, Note für den Kurs Einführung in die Programmierung 3
Peter Python, Note für den Kurs Einführung in KI 3
Olivia C. Objective, Note für den Kurs Datenstrukturen und Algorithmen 3

</sample-output>

Bitte implementieren Sie die Funktion unter Verwendung der Funktion `filter`.

## Studenten, die den Kurs bestanden haben

Bitte schreiben Sie eine Funktion namens `passed_students(attempts: list, course: str)`, die eine Liste von `CourseAttempt`-Objekten und einen Kursnamen als Argumente entgegennimmt. Die Funktion soll eine _alphabetisch sortierte_ Liste der Namen der Studenten zurückgeben, die den Kurs bestanden haben, d. h. deren Note für den angegebenen Kurs höher als 0 war.

```python
s1 = CourseAttempt("Peter Python", "Einführung in die Programmierung", 3)
s2 = CourseAttempt("Olivia C. Objective", "Einführung in KI", 5)
s3 = CourseAttempt("Peter Python", "Einführung in KI", 0)
s4 = CourseAttempt("Jack Java", "Einführung in KI", 3)

for attempt in passed_students([s1, s2, s3, s4], "Einführung in KI"):
    print(attempt)
```

<sample-output>

Jack Java
Olivia C. Objective

</sample-output>

Bitte implementieren Sie die Funktion unter Verwendung der Funktionen `filter` und `map`.

</programming-exercise>

## reduce

Eine dritte grundlegende Funktion in dieser Einführung in die Prinzipien der funktionalen Programmierung ist `reduce` aus dem Modul `functools`. Wie der Name schon sagt, besteht ihr Zweck darin, die Elemente in einer Serie auf einen einzigen Wert zu _reduzieren_.

Die Funktion `reduce` beginnt mit einer Operation und einem Anfangswert. Sie führt die angegebene Operation nacheinander an jedem Element der Serie aus, sodass sich der Wert bei jedem Schritt ändert. Sobald alle Elemente verarbeitet wurden, wird der resultierende Wert zurückgegeben.

Wir haben Summierungen von Listen von Ganzzahlen schon auf verschiedene Arten durchgeführt, aber hier haben wir ein Beispiel mit Hilfe der Funktion `reduce`. Beachten Sie die `import`-Anweisung; in Python-Versionen 3 und höher ist sie erforderlich, um auf die Funktion `reduce` zuzugreifen. In älteren Python-Versionen war die `import`-Anweisung nicht erforderlich, daher können Sie online auf Beispiele ohne sie stoßen.

```python
from functools import reduce

my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list, 0)

print(sum_of_numbers)
```

<sample-output>

11

</sample-output>

Schauen wir uns genauer an, was hier passiert. Die Funktion `reduce` nimmt drei Argumente entgegen: eine Funktion, eine Serie von Elementen und einen Anfangswert. In diesem Fall ist die Serie eine Liste von Ganzzahlen, und da wir eine Summe berechnen, ist ein geeigneter Anfangswert Null.

Das erste Argument ist eine Funktion, welche die Operation darstellt, die wir an jedem Element ausführen wollen. Hier ist die Funktion eine anonyme Lambda-Funktion:

```python
lambda reduced_sum, item: reduced_sum + item
```

Diese Funktion nimmt zwei Argumente entgegen: den aktuellen reduzierten Wert und das Element, das gerade an der Reihe ist, verarbeitet zu werden. Diese werden verwendet, um einen neuen Wert für den reduzierten Wert zu berechnen. In diesem Fall ist der neue Wert die Summe aus dem alten Wert und dem aktuellen Element.

Es ist vielleicht einfacher zu verstehen, was die Funktion `reduce` eigentlich tut, wenn wir eine normale benannte Funktion anstelle einer Lambda-Funktion verwenden. Auf diese Weise können wir auch hilfreiche Ausgaben einfügen:

```python
from functools import reduce

my_list = [2, 3, 1, 5]

# Eine Hilfsfunktion für reduce, fügt einen Wert zur aktuellen reduzierten Summe hinzu
def sum_helper(reduced_sum, item):
  print(f"Die reduzierte Summe ist jetzt {reduced_sum}, das nächste Element ist {item}")
  # Die neue reduzierte Summe ist die alte Summe + das nächste Element
  return reduced_sum + item

sum_of_numbers = reduce(sum_helper, my_list, 0)

print(sum_of_numbers)
```

Das Programm gibt Folgendes aus:

<sample-output>

Die reduzierte Summe ist jetzt 0, das nächste Element ist 2
Die reduzierte Summe ist jetzt 2, das nächste Element ist 3
Die reduzierte Summe ist jetzt 5, das nächste Element ist 1
Die reduzierte Summe ist jetzt 6, das nächste Element ist 5
11

</sample-output>

Zuerst kümmert sich die Funktion um das Element mit dem Wert 2. Zu Beginn ist die reduzierte Summe 0, was der Anfangswert ist, der an die Funktion `reduce` übergeben wurde. Die Funktion berechnet und gibt die Summe dieser beiden zurück: `0 + 2 = 2`.

Dies ist der Wert, der in `reduced_sum` gespeichert wird, während die Funktion `reduce` das nächste Element auf der Liste mit dem Wert 3 verarbeitet. Die Funktion berechnet und gibt die Summe dieser beiden zurück: `2 + 3 = 5`. Dieses Ergebnis wird dann bei der Verarbeitung des nächsten Elements verwendet, und so weiter und so fort.

Nun ist die Summierung einfach, da es für diesen Zweck sogar die integrierte Funktion `sum` gibt. Aber wie sieht es mit der Multiplikation aus? Nur geringfügige Änderungen sind erforderlich, um ein reduziertes Produkt zu erstellen:

```python
from functools import reduce

my_list = [2, 2, 4, 3, 5, 2]

product_of_list = reduce(lambda product, item: product * item, my_list, 1)

print(product_of_list)
```

<sample-output>

480

</sample-output>

Da wir es mit Multiplikation zu tun haben, ist der Anfangswert nicht Null. Stattdessen verwenden wir 1. Was würde passieren, wenn wir 0 als Anfangswert verwenden würden?

Oben haben wir uns weitgehend mit Ganzzahlen beschäftigt, aber `map`, `filter` und `reduce` können alle eine Sammlung von Objekten jedes Typs verarbeiten.

Lassen Sie uns als Beispiel mit Hilfe von `reduce` eine Gesamtsumme der Kontostände aller Konten einer Bank generieren:

```python
class BankAccount:
    def __init__(self, account_number: str, name: str, balance: float):
        self.__account_number = account_number
        self.name = name
        self.__balance = balance

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

a1 = BankAccount("123456", "Randy Riches", 5000)
a2 = BankAccount("12321", "Paul Pauper", 1)
a3 = BankAccount("223344", "Mary Millionaire ", 1000000)

accounts = [a1, a2, a3]

from functools import reduce

def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()

balances_total = reduce(balance_sum_helper, accounts, 0)

print("Die Gesamtsumme der Kontostände der Bank:")
print(balances_total)
```

Dieses Programm würde Folgendes ausgeben:

<sample-output>

Die Gesamtsumme der Kontostände der Bank:
1005001

</sample-output>

Die Funktion `balance_sum_helper` greift auf den Kontostand jedes Bankkontos zu, mit der dafür vorgesehenen Methode in der Klassendefinition von `BankAccount`:

```python
def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()
```

<text-box variant='hint' name='Reduce ohne Anfangswert'>

Sie müssen der Funktion `reduce` nicht immer ein drittes Argument übergeben. Beispielsweise würde die Summierung auch _ohne_ den Anfangswert funktionieren:

```python
my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list)

print(sum_of_numbers)
```

Wenn der Anfangswert weggelassen wird, nimmt `reduce` das erste Element der Liste als Anfangswert und beginnt mit der Reduzierung ab dem zweiten Element.

</text-box>

**Hinweis:** Wenn die Elemente in der Serie von einem anderen Typ sind als das beabsichtigte reduzierte Ergebnis, ist das dritte Argument obligatorisch. Das Beispiel mit den Bankkonten würde ohne den Anfangswert nicht funktionieren. Das heißt, der Versuch:

```python
balances_total = reduce(balance_sum_helper, accounts)
```

würde eine Fehlermeldung erzeugen:

```python
TypeError: unsupported operand type(s) for +: 'BankAccount' and 'int'
```

Im obigen Fall, wenn `reduce` versucht, die Funktion `balance_sum_helper` zum ersten Mal auszuführen, sind die Argumente, die sie verwendet, die _beiden ersten Elemente in der Liste_, die beide vom Typ `BankAccount` sind. Konkret ist der dem Parameter `balance_sum` zugewiesene Wert das erste Element in der Liste. Die Funktion `balance_sum_helper` versucht, einen Ganzzahlwert dazu zu addieren, aber das direkte Addieren einer Ganzzahl zu einem `BankAccount`-Objekt ist keine unterstützte Operation.

<programming-exercise name='Leistungspunkte' tmcname='part12-13_credits'>

In dieser Übung arbeiten wir mit einer leicht modifizierten Version der Klasse `CourseAttempt`. Der Name des Studenten wird weggelassen, aber die Anzahl der Leistungspunkte (LP) ist enthalten. Die Klasse funktioniert wie folgt:

```python
attempt = CourseAttempt("Datenstrukturen und Algorithmen", 3, 10)
print(attempt)
print(attempt.course_name)
print(attempt.credits)
print(attempt.grade)
```

<sample-output>

Datenstrukturen und Algorithmen (10 LP) Note 3
Datenstrukturen und Algorithmen
10
3

</sample-output>

## Die Summe aller Leistungspunkte

Bitte implementieren Sie eine Funktion namens `sum_of_all_credits`, die eine Liste von Kursversuchen als Argument entgegennimmt. Die Funktion summiert die Gesamtzahl der durch die Kurse abgedeckten Leistungspunkte. Sie soll wie folgt arbeiten:

```python
s1 = CourseAttempt("Einführung in die Programmierung", 5, 5)
s2 = CourseAttempt("Fortgeschrittener Kurs in Programmierung", 4, 5)
s3 = CourseAttempt("Datenstrukturen und Algorithmen", 3, 10)
credit_sum = sum_of_all_credits([s1, s2, s3])
print(credit_sum)
```

<sample-output>

20

</sample-output>

Bitte implementieren Sie die Funktion unter Verwendung der Funktion `reduce`.

## Die Summe der bestandenen Leistungspunkte

Bitte implementieren Sie eine Funktion namens `sum_of_passed_credits`, die eine Liste von Kursversuchen als Argument entgegennimmt. Die Funktion summiert die Leistungspunkte für die Kursversuche mit der Note 1 oder höher. Sie soll wie folgt arbeiten:

```python
s1 = CourseAttempt("Einführung in die Programmierung", 5, 5)
s2 = CourseAttempt("Fortgeschrittener Kurs in Programmierung", 0, 4)
s3 = CourseAttempt("Datenstrukturen und Algorithmen", 3, 10)
credit_sum = sum_of_passed_credits([s1, s2, s3])
print(credit_sum)
```

<sample-output>

15

</sample-output>

Bitte implementieren Sie die Funktion unter Verwendung der Funktionen `reduce` und `filter`.

## Durchschnittsnote für bestandene Kurse

Bitte implementieren Sie eine Funktion namens `average`, die eine Liste von Kursversuchen als Argument entgegennimmt. Die Funktion berechnet die Durchschnittsnote für die Kursversuche mit der Note 1 oder höher. Sie soll wie folgt arbeiten:

```python
s1 = CourseAttempt("Einführung in die Programmierung", 5, 5)
s2 = CourseAttempt("Fortgeschrittener Kurs in Programmierung", 0, 4)
s3 = CourseAttempt("Datenstrukturen und Algorithmen", 3, 10)
ag = average([s1, s2, s3])
print(ag)
```

<sample-output>

4.0

</sample-output>

Bitte implementieren Sie die Funktion unter Verwendung der Funktionen `reduce` und `filter`. Hinweis: Die Übung fragt nach einem einfachen Mittelwert, nicht nach einem gewichteten Durchschnitt.

Während Sie an dieser Übung arbeiten, ist es wahrscheinlich hilfreich, sich daran zu erinnern, dass [der Rückgabewert von filter ein Iterator ist](/part-12/3-functional-programming#the-return-value-of-filter-is-an-iterator).

</programming-exercise>
