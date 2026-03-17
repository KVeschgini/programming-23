---
path: '/part-8/3-defining-classes'
title: 'Eigene Klassen definieren'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Wissen Sie, wie Sie eigene Klassen definieren
- Sind Sie in der Lage, Objekte auf Basis selbst definierter Klassen zu erstellen
- Wissen Sie, wie man einen Konstruktor schreibt
- Sind Sie mit dem Parameternamen `self` vertraut
- Wissen Sie, was Attribute sind und wie sie verwendet werden

</text-box>

Eine Klasse wird mit dem Schlüsselwort `class` definiert. Die Syntax lautet wie folgt:

```python
class NameDerKlasse:
    # Klassendefinition hier
```

Klassen werden üblicherweise in _CamelCase_ benannt. Das bedeutet, dass alle Wörter im Klassennamen ohne Leerzeichen zusammengeschrieben werden und jedes Wort großgeschrieben wird. Die folgenden Klassennamen folgen dieser Konvention:

* `Wochentag`
* `Bankkonto`
* `BibliotheksDatenbank`
* `PythonKursNoten`

Eine einzelne Klassendefinition sollte ein einzelnes Ganzes repräsentieren, dessen Inhalte in gewisser Weise atomar miteinander verknüpft sind. In komplexeren Programmen können Klassen Mitglieder anderer Klassen enthalten. Beispielsweise könnte die Klasse `Kurs` Objekte der Klassen `Vorlesung`, `Uebungsstunde` usw. enthalten.

Schauen wir uns das Grundgerüst einer Klassendefinition an. Die Funktionalitäten fehlen an dieser Stelle noch.

```python
class BankAccount:
    pass
```

Das obige Codestück teilt Python mit, dass wir hier eine Klasse namens `BankAccount` definieren. Die Klasse enthält noch keine Funktionalität, aber wir können dennoch ein Objekt auf Basis der Klasse erstellen.

Schauen wir uns ein Programm an, in dem zwei Variablen zu einem `BankAccount`-Objekt hinzugefügt werden: `balance` und `owner`. Alle an ein Objekt gebundenen Variablen werden als dessen _Attribute_ bezeichnet, genauer gesagt als _Datenattribute_ oder manchmal auch als _Instanzvariablen_.

Auf die an ein Objekt gebundenen Attribute kann über das Objekt zugegriffen werden:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter Python"
peters_account.balance = 5.0

print(peters_account.owner)
print(peters_account.balance)
```

<sample-output>

Peter Python
5.0

</sample-output>

Die Datenattribute sind nur über das Objekt verfügbar, an das sie gebunden sind. Jedes auf Basis der Klasse `BankAccount` erstellte `BankAccount`-Objekt hat seine eigenen Werte, die an die Datenattribute gebunden sind. Auf diese Werte kann zugegriffen werden, indem man sich auf das betreffende Objekt bezieht:

```python
account = BankAccount()
account.balance = 155.50

print(account.balance) # Dies bezieht sich auf das Datenattribut balance des Objekts account
print(balance) # DIES VERURSACHT EINEN FEHLER, da keine solche unabhängige Variable existiert und die Objektreferenz fehlt
```

## Einen Konstruktor hinzufügen

Im obigen Beispiel haben wir gesehen, dass eine neue Instanz einer Klasse erstellt werden kann, indem die Konstruktormethode der Klasse wie folgt aufgerufen wird: `NameDerKlasse()`. Danach haben wir dem Objekt Datenattribute separat zugewiesen. Es ist jedoch oft bequemer, diese Initialwerte der Attribute direkt beim Erstellen des Objekts zu übergeben. Im obigen Beispiel hatten wir zunächst ein `BankAccount`-Objekt ohne diese Attribute, und die Attribute existierten erst, nachdem sie explizit deklariert wurden.

Das Deklarieren von Attributen außerhalb des Konstruktors führt dazu, dass verschiedene Instanzen derselben Klasse unterschiedliche Attribute haben können. Der folgende Code erzeugt einen Fehler, da wir nun ein weiteres `BankAccount`-Objekt `paulas_account` haben, das nicht dieselben Attribute enthält:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter"
peters_account.balance = 1400

paulas_account = BankAccount()
paulas_account.owner = "Paula"

print(peters_account.balance)
print(paulas_account.balance) # DIES VERURSACHT EINEN FEHLER
```

Anstatt Attribute nach der Erstellung jeder Instanz der Klasse zu deklarieren, ist es daher in der Regel eine bessere Idee, die Werte der Attribute beim Aufruf des Klassenkonstruktors zu initialisieren. Da die Definition der Klasse `BankAccount` derzeit nur ein Gerüst ist, wird die Konstruktormethode vom Python-Interpreter implizit angenommen. Es ist jedoch möglich, eigene Konstruktormethoden zu definieren, und genau das werden wir jetzt tun.

Eine Konstruktormethode ist eine Methodendeklaration mit dem speziellen Namen `__init__`, die üblicherweise ganz am Anfang einer Klassendefinition steht.

Schauen wir uns eine Klasse `BankAccount` mit einer hinzugefügten Konstruktormethode an:

```python
class BankAccount:

    # Der Konstruktor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner
```

Der Name der Konstruktormethode lautet immer `__init__`. Beachten Sie die _zwei Unterstriche auf beiden Seiten_ des Wortes `init`.

Der erste Parameter in einer Konstruktordefinition heißt immer `self`. Dieser bezieht sich auf das Objekt selbst und ist notwendig, um Attribute zu deklarieren, die an das Objekt gebunden sind. Die Zuweisung

`self.balance = balance`

weist den als Argument erhaltenen Kontostand (balance) dem Attribut `balance` des Objekts zu. Es ist eine gängige Konvention, dieselben Variablennamen für die Parameter und die im Konstruktor definierten Datenattribute zu verwenden, aber die Variablennamen `self.balance` und `balance` oben beziehen sich auf _zwei verschiedene Variablen_:

* Die Variable `self.balance` ist ein Attribut des Objekts. Jedes `BankAccount`-Objekt hat seinen eigenen Kontostand.

* Die Variable `balance` ist ein Parameter in der Konstruktormethode `__init__`. Ihr Wert wird auf den Wert gesetzt, der beim Aufruf des Konstruktors (also beim Erstellen einer neuen Instanz der Klasse) als Argument an die Methode übergeben wird.

Da wir nun die Parameter der Konstruktormethode definiert haben, können wir die gewünschten Initialwerte der Datenattribute als Argumente übergeben, wenn ein neues Objekt erstellt wird:

```python
class BankAccount:

    # Der Konstruktor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner

# Beim Aufruf der Methode sollte kein Argument für den self-Parameter angegeben werden
# Python weist den Wert für self automatisch zu
peters_account = BankAccount(100, "Peter Python")
paulas_account = BankAccount(20000, "Paula Pythons")

print(peters_account.balance)
print(paulas_account.balance)
```

<sample-output>

100
20000

</sample-output>

Es ist nun viel einfacher, mit den `BankAccount`-Objekten zu arbeiten, da die Werte bei der Objekterstellung übergeben werden können und die resultierenden zwei separaten Instanzen vorhersehbarer und einheitlicher gehandhabt werden können. Das Deklarieren von Datenattributen im Konstruktor stellt außerdem sicher, dass die Attribute tatsächlich deklariert werden und die gewünschten Initialwerte vom Programmierer, der die Klasse verwendet, immer angegeben werden.

Es ist weiterhin möglich, die Initialwerte der Datenattribute später im Programm zu ändern:

```python
class BankAccount:

    # Der Konstruktor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner

peters_account = BankAccount(100, "Peter Python")
print(peters_account.balance)

# Den Kontostand auf 1500 ändern
peters_account.balance = 1500
print(peters_account.balance)

# 2000 zum Kontostand hinzufügen
peters_account.balance += 2000
print(peters_account.balance)
```

<sample-output>

100
1500
3500

</sample-output>

Schauen wir uns ein weiteres Beispiel für Klassen und Objekte an. Wir schreiben eine Klasse, die eine einzelne Ziehung von Lottozahlen modelliert:

```python
from datetime import date

class LotteryDraw:

    def __init__(self, round_week: int, round_date: date, numbers: list):
        self.round_week = round_week
        self.round_date = round_date
        self.numbers = numbers


# Ein neues LotteryDraw-Objekt erstellen
round1 = LotteryDraw(1, date(2021, 1, 2), [1, 4, 8, 12, 13, 14, 33])

# Daten ausgeben
print(round1.round_week)
print(round1.round_date)

for number in round1.numbers:
    print(number)
```

<sample-output>

1
2021-01-02
1
4
8
12
13
14
33

</sample-output>

Wie Sie oben sehen können, können die Attribute von beliebigem Typ sein. Hier hat jedes `LotteryDraw`-Objekt Attribute vom Typ `list` und `date`.

<programming-exercise name='Buch' tmcname='part08-05_book'>

Bitte schreiben Sie eine Klasse namens `Book` mit den Attributen `name`, `author`, `genre` und `year` sowie einem Konstruktor, der diesen Attributen Initialwerte zuweist.

Ihre Klasse sollte wie folgt funktionieren:

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)

print(f"{python.author}: {python.name} ({python.year})")
print(f"Das Genre des Buches {everest.name} ist {everest.genre}")
```

<sample-output>

Luciano Ramalho: Fluent Python (2015)
Das Genre des Buches High Adventure ist autobiography

</sample-output>

</programming-exercise>

<programming-exercise name='Drei Klassen' tmcname='part08-06_three_classes'>

Bitte schreiben Sie die drei unten angegebenen Klassen. Jede Klasse sollte genau die aufgeführten Namen und Typen von Attributen haben.

Bitte fügen Sie in jeder Klasse auch einen Konstruktor ein. Der Konstruktor sollte die Initialwerte der Attribute als Argumente in der unten aufgeführten Reihenfolge entgegennehmen.

1. Klasse Checklist
- Attribut header (String)
- Attribut entries (Liste)

2. Klasse Customer
- Attribut id (String)
- Attribut balance (Float)
- Attribut discount (Integer)

3. Klasse Cable
- Attribut model (String)
- Attribut length (Float)
- Attribut max_speed (Integer)
- Attribut bidirectional (Boolean)

</programming-exercise>

## Verwendung von Objekten eigener Klassen

Objekte, die aus Ihren eigenen Klassendefinitionen gebildet werden, unterscheiden sich nicht von anderen Python-Objekten. Sie können genau wie jedes andere Objekt als Argumente übergeben und als Rückgabewerte verwendet werden. Wir könnten zum Beispiel einige Hilfsfunktionen für die Arbeit mit Bankkonten schreiben:

```python
# Diese Funktion erstellt ein neues Bankkonto-Objekt und gibt es zurück
def open_account(name: str):
    new_account = BankAccount(0, name)
    return new_account

# Diese Funktion fügt den als Argument übergebenen Betrag zum Kontostand des ebenfalls als Argument übergebenen Bankkontos hinzu
def deposit_money_on_account(account: BankAccount, amount: int):
    account.balance += amount

peters_account = open_account("Peter Python")
print(peters_account.balance)

deposit_money_on_account(peters_account, 500)

print(peters_account.balance)
```

<sample-output>

0
500

</sample-output>

<programming-exercise name='Klasse definieren: Haustier' tmcname='part08-07_pet'>

Bitte definieren Sie die Klasse `Pet`. Die Klasse sollte einen Konstruktor enthalten, der die Initialwerte der Attribute `name`, `species` und `year_of_birth` als Argumente in genau dieser Reihenfolge entgegennimmt.

Bitte schreiben Sie auch eine Funktion namens `new_pet(name: str, species: str, year_of_birth: int)` _außerhalb der Klassendefinition_. Die Funktion sollte ein neues Objekt vom Typ `Pet` erstellen und zurückgeben, wie es in der Klasse `Pet` definiert ist.

Ein Beispiel für die Verwendung der Funktion:

```python
fluffy = new_pet("Fluffy", "dog", 2017)
print(fluffy.name)
print(fluffy.species)
print(fluffy.year_of_birth)
```

<sample-output>

Fluffy
dog
2017

</sample-output>

</programming-exercise>

<programming-exercise name='Das ältere Buch' tmcname='part08-08_older_book'>

Bitte schreiben Sie eine Funktion namens `older_book(book1: Book, book2: Book)`, die zwei Objekte vom Typ `Book` als Argumente entgegennimmt. Die Funktion sollte eine Nachricht mit den Details des jeweils älteren Buches ausgeben. Sie sollte eine andere Nachricht ausgeben, wenn die beiden Bücher im selben Jahr geschrieben wurden. Bitte beachten Sie die folgenden Beispiele.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

older_book(python, everest)
older_book(python, norma)
```

<sample-output>

High Adventure is older, it was published in 1956
Fluent Python and Norma were published in 2015

</sample-output>

</programming-exercise>

<programming-exercise name='Bücher eines Genres' tmcname='part08-09_books_of_genre'>

Bitte schreiben Sie eine Funktion namens `books_of_genre(books: list, genre: str)`, die eine Liste von Objekten des Typs `Book` und einen String, der ein Genre repräsentiert, als Argumente entgegennimmt.

Die Funktion sollte eine _neue_ Liste zurückgeben, die die Bücher mit dem gewünschten Genre aus der ursprünglichen Liste enthält. Bitte beachten Sie die folgenden Beispiele.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

books = [python, everest, norma, Book("The Snowman", "Jo Nesbø", "crime", 2007)]

print("Bücher im Genre crime:")
for book in books_of_genre(books, "crime"):
    print(f"{book.author}: {book.name}")
```

<sample-output>

Bücher im Genre crime:
Sofi Oksanen: Norma
Jo Nesbø: The Snowman

</sample-output>

</programming-exercise>
