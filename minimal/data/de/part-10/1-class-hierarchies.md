---
path: '/part-10/1-class-hierarchies'
title: 'Klassenhierarchien'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Wissen Sie, was Vererbung im programmiertechnischen Kontext bedeutet
- Sind Sie in der Lage, Klassen zu schreiben, die von anderen Klassen erben
- Wissen Sie, wie sich Vererbung auf die Merkmale in Klassen auswirkt

</text-box>

## Spezielle Klassen für spezielle Zwecke

Manchmal stoßen Sie auf eine Situation, in der Sie bereits eine Klasse definiert haben, dann aber feststellen, dass Sie für einige, aber nicht alle Instanzen der Klasse spezielle Merkmale benötigen. Andererseits stellen Sie manchmal fest, dass Sie zwei sehr ähnliche Klassen mit nur geringfügigen Unterschieden definiert haben. Als Programmierer streben wir danach, uns so wenig wie möglich zu wiederholen, während wir gleichzeitig Klarheit und Lesbarkeit wahren. Wie können wir also unterschiedliche Implementierungen von im Wesentlichen ähnlichen Objekten berücksichtigen?

Schauen wir uns zwei Klassendefinitionen an: `Student` und `Teacher`. Getter- und Setter-Methoden wurden vorerst weggelassen, um das Beispiel kurz zu halten.

```python
class Student:

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits

class Teacher:

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years
```

Selbst in einem reduzierten Beispiel wie dem obigen haben wir bereits eine ganze Menge Wiederholungen: Beide Klassen enthalten die Attribute `name` und `email`. Es wäre eine gute Idee, eine einzige Attributdefinition zu haben, sodass eine einzige Funktion ausreichen würde, um beide Attribute zu bearbeiten.

Stellen Sie sich zum Beispiel vor, die E-Mail-Adresse der Schule würde sich ändern. Alle Adressen müssten aktualisiert werden. Wir _könnten_ zwei separate Versionen von im Wesentlichen derselben Funktion schreiben:

```python
def update_email(o: Student):
    o.email = o.email.replace(".com", ".edu")

def update_email2(o: Teacher):
    o.email = o.email.replace(".com", ".edu")
```

Praktisch dasselbe zweimal zu schreiben, ist unnötige Wiederholung, ganz zu schweigen davon, dass es die Fehlermöglichkeiten verdoppelt. Es wäre eine deutliche Verbesserung, wenn wir eine einzige Funktion verwenden könnten, um mit Instanzen beider Klassen zu arbeiten.

Beide Klassen haben zudem Attribute, die nur für sie spezifisch sind. Einfach _alle_ Attribute in einer einzigen Klasse zu kombinieren, würde bedeuten, dass _alle_ Instanzen der Klasse dann unnötige Attribute hätten, nur eben unterschiedliche für verschiedene Instanzen. Das scheint auch keine ideale Situation zu sein.

## Vererbung

Objektorientierte Programmiersprachen verfügen üblicherweise über eine Technik namens _Vererbung_. Eine Klasse kann die Merkmale einer anderen Klasse _erben_. Zusätzlich zu diesen geerbten Merkmalen kann eine Klasse auch Merkmale enthalten, die nur für sie spezifisch sind.

In diesem Wissen wäre es sinnvoll, wenn die Klassen `Teacher` und `Student` eine gemeinsame Basis- oder Elternklasse `Person` hätten:

```python
class Person:

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
```

Die neue Klasse enthält diejenigen Merkmale, die von den anderen beiden Klassen geteilt werden. Nun können `Student` und `Teacher` diese Merkmale _erben_ und zusätzlich ihre eigenen hinzufügen.

Die Syntax für Vererbung beinhaltet einfach das Hinzufügen des Namens der Basisklasse in Klammern in der Kopfzeile:

```python
class Person:

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def update_email_domain(self, new_domain: str):
        old_domain = self.email.split("@")[1]
        self.email = self.email.replace(old_domain, new_domain)


class Student(Person):

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits


class Teacher(Person):

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years

# Testen wir unsere Klassen
if __name__ == "__main__":
    saul = Student("Saul Student", "1234", "saul@example.com", 0)
    saul.update_email_domain("example.edu")
    print(saul.email)

    tara = Teacher("Tara Teacher", "tara@example.fi", "A123", 2)
    tara.update_email_domain("example.ex")
    print(tara.email)
```

Sowohl `Student` als auch `Teacher` erben von der Klasse `Person`, sodass beide über die in der Klasse `Person` definierten Merkmale verfügen, einschließlich der Methode `update_email_domain`. Dieselbe Methode funktioniert für Instanzen beider abgeleiteter Klassen.

Schauen wir uns ein weiteres Beispiel an. Wir haben ein `Bookshelf`, das von der Klasse `BookContainer` erbt:

```python
class Book:
    """ Diese Klasse modelliert ein einfaches Buch """
    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class BookContainer:
    """ Diese Klasse modelliert einen Behälter für Bücher """

    def __init__(self):
        self.books = []

    def add_book(self, book: Book):
        self.books.append(book)

    def list_books(self):
        for book in self.books:
            print(f"{book.name} ({book.author})")


class Bookshelf(BookContainer):
    """ Diese Klasse modelliert ein Regal für Bücher """

    def __init__(self):
        super().__init__()

    def add_book(self, book: Book, location: int):
        self.books.insert(location, book)
```

Die Klasse `Bookshelf` enthält die Methode `add_book`. Eine Methode mit demselben Namen ist in der Basisklasse `BookContainer` definiert. Dies wird als _Überschreiben_ (Overriding) bezeichnet: Wenn eine abgeleitete Klasse eine Methode mit demselben Namen wie die Basisklasse hat, überschreibt die abgeleitete Version das Original in Instanzen der abgeleiteten Klasse.

Die Idee im obigen Beispiel ist, dass ein neues Buch, das einem `BookContainer` hinzugefügt wird, immer ans Ende kommt, aber bei einem `Bookshelf` können Sie den Ort selbst bestimmen. Die Methode `list_books` funktioniert für beide Klassen gleich, da es keine überschreibende Methode in der abgeleiteten Klasse gibt.

Probieren wir diese Klassen aus:

```python
if __name__ == "__main__":
    # Einige Bücher zum Testen erstellen
    b1 = Book("Der alte Mann und das Meer", "Ernest Hemingway")
    b2 = Book("Der stumme Frühling", "Rachel Carson")
    b3 = Book("Stolz und Vorurteil", "Jane Austen")

    # Einen BookContainer erstellen und die Bücher hinzufügen
    container = BookContainer()
    container.add_book(b1)
    container.add_book(b2)
    container.add_book(b3)

    # Ein Bookshelf erstellen und die Bücher hinzufügen (immer an den Anfang)
    shelf = Bookshelf()
    shelf.add_book(b1, 0)
    shelf.add_book(b2, 0)
    shelf.add_book(b3, 0)


    # Ausgeben
    print("Behälter:")
    container.list_books()

    print()

    print("Regal:")
    shelf.list_books()
```

<sample-output>

Behälter:
Der alte Mann und das Meer (Ernest Hemingway)
Der stumme Frühling (Rachel Carson)
Stolz und Vorurteil (Jane Austen)

Regal:
Stolz und Vorurteil (Jane Austen)
Der stumme Frühling (Rachel Carson)
Der alte Mann und das Meer (Ernest Hemingway)

</sample-output>

Die Klasse `Bookshelf` hat also auch Zugriff auf die Methode `list_books`. Durch Vererbung ist die Methode ein Mitglied aller von der Klasse `BookContainer` abgeleiteten Klassen.

## Vererbung und Gültigkeitsbereich von Merkmalen

Eine abgeleitete Klasse erbt alle Merkmale von ihrer Basisklasse. Diese Merkmale sind in der abgeleiteten Klasse direkt zugänglich, es sei denn, sie wurden in der Basisklasse als privat definiert (mit zwei Unterstrichen vor dem Namen des Merkmals).

Da die Attribute eines `Bookshelf` identisch mit denen eines `BookContainer` sind, war es nicht notwendig, den Konstruktor von `Bookshelf` neu zu schreiben. Wir haben einfach den Konstruktor der Basisklasse aufgerufen:

```python
class Bookshelf(BookContainer):

    def __init__(self):
        super().__init__()
```

Jedes Merkmal in der Basisklasse kann von der abgeleiteten Klasse aus mit der Funktion `super()` aufgerufen werden. Das Argument `self` wird beim Methodenaufruf weggelassen, da Python es automatisch hinzufügt.

Aber was ist, wenn die Attribute nicht identisch sind; können wir den Konstruktor der Basisklasse trotzdem irgendwie nutzen? Schauen wir uns eine Klasse namens `Thesis` an, die von der Klasse `Book` erbt. Die abgeleitete Klasse _kann_ immer noch den Konstruktor der Basisklasse aufrufen:

```python
class Book:
    """ Diese Klasse modelliert ein einfaches Buch """

    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class Thesis(Book):
    """ Diese Klasse modelliert eine Abschlussarbeit """

    def __init__(self, name: str, author: str, grade: int):
        super().__init__(name, author)
        self.grade = grade
```

Der Konstruktor in der Klasse `Thesis` ruft den Konstruktor in der Basisklasse `Book` mit den Argumenten für `name` und `author` auf. Zusätzlich setzt der Konstruktor in der abgeleiteten Klasse den Wert für das Attribut `grade`. Dies kann natürlich kein Teil des Basisklassenkonstruktors sein, da die Basisklasse kein solches Attribut hat.

Die obige Klasse kann wie folgt verwendet werden:

```python
if __name__ == "__main__":
    thesis = Thesis("Python und das Universum", "Peter Pythons", 3)

    # Die Werte der Attribute ausgeben
    print(thesis.name)
    print(thesis.author)
    print(thesis.grade)
```

<sample-output>

Python und das Universum
Peter Pythons
3

</sample-output>

Selbst wenn eine abgeleitete Klasse eine Methode in ihrer Basisklasse _überschreibt_, kann die abgeleitete Klasse _immer noch_ die überschriebene Methode in der Basisklasse aufrufen. Im folgenden Beispiel haben wir eine einfache `BonusCard` und eine spezielle `PlatinumCard` für besonders treue Kunden. Die Methode `calculate_bonus` wird in der abgeleiteten Klasse überschrieben, aber die überschreibende Methode ruft die Basismethode auf:

```python
class Product:

    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

class BonusCard:

    def __init__(self):
        self.products_bought = []

    def add_product(self, product: Product):
        self.products_bought.append(product)

    def calculate_bonus(self):
        bonus = 0
        for product in self.products_bought:
            bonus += product.price * 0.05

        return bonus

class PlatinumCard(BonusCard):

    def __init__(self):
        super().__init__()

    def calculate_bonus(self):
        # Die Methode in der Basisklasse aufrufen
        bonus = super().calculate_bonus()

        # ...und fünf Prozent zum Gesamtwert hinzufügen
        bonus = bonus * 1.05
        return bonus
```

Der Bonus für eine `PlatinumCard` wird also berechnet, indem die überschriebene Methode in der Basisklasse aufgerufen und dann ein zusätzlicher Bonus von 5 Prozent zum Basisergebnis hinzugefügt wird. Ein Beispiel für die Verwendung dieser Klassen:

```python
if __name__ == "__main__":
    card = BonusCard()
    card.add_product(Product("Bananen", 6.50))
    card.add_product(Product("Satsumas", 7.95))
    bonus = card.calculate_bonus()

    card2 = PlatinumCard()
    card2.add_product(Product("Bananen", 6.50))
    card2.add_product(Product("Satsumas", 7.95))
    bonus2 = card2.calculate_bonus()

    print(bonus)
    print(bonus2)
```

<sample-output>

0.7225
0.7586250000000001

</sample-output>

<programming-exercise name='Laptop' tmcname='part10-01_laptop_computer'>

Die Aufgabenvorlage enthält eine Klassendefinition für einen `Computer`, der die Attribute `model` und `speed` hat.

Bitte definieren Sie eine Klasse namens `LaptopComputer`, die von der Klasse `Computer` _erbt_. Der Konstruktor der neuen Klasse sollte ein drittes Argument entgegennehmen: `weight` vom Typ Integer.

Bitte fügen Sie Ihrer Klassendefinition auch eine `__str__`-Methode hinzu. Siehe das folgende Beispiel für das erwartete Format der ausgegebenen String-Repräsentation.

```python
laptop = LaptopComputer("NoteBook Pro15", 1500, 2)
print(laptop)
```

<sample-output>

NoteBook Pro15, 1500 MHz, 2 kg

</sample-output>

</programming-exercise>

<programming-exercise name='Spielemuseum' tmcname='part10-02_game_museum'>

Die Aufgabenvorlage enthält Klassendefinitionen für ein `ComputerGame` und ein `GameWarehouse`. Ein `GameWarehouse`-Objekt wird verwendet, um `ComputerGame`-Objekte zu speichern.

Bitte machen Sie sich mit diesen Klassen vertraut. Definieren Sie dann eine neue Klasse namens `GameMuseum`, die von der Klasse `GameWarehouse` erbt.

Die Klasse `GameMuseum` sollte die Methode `list_games()` _überschreiben_, sodass sie eine Liste nur derjenigen Spiele zurückgibt, die vor dem Jahr 1990 erstellt wurden.

Die neue Klasse sollte zudem einen Konstruktor haben, der _den Konstruktor der Elternklasse `GameWarehouse` aufruft_. Der Konstruktor nimmt keine Argumente entgegen.

Sie können den folgenden Code verwenden, um Ihre Implementierung zu testen:

```python
museum = GameMuseum()
museum.add_game(ComputerGame("Pacman", "Namco", 1980))
museum.add_game(ComputerGame("GTA 2", "Rockstar", 1999))
museum.add_game(ComputerGame("Bubble Bobble", "Taito", 1986))
for game in museum.list_games():
    print(game.name)
```

<sample-output>

Pacman
Bubble Bobble

</sample-output>

</programming-exercise>

<programming-exercise name='Flächen' tmcname='part10-03_areas'>

Die Aufgabenvorlage enthält eine Klassendefinition für ein `Rectangle`. Es repräsentiert eine [Rechteckform](https://de.wikipedia.org/wiki/Rechteck). Ein `Rectangle` funktioniert wie folgt:

```python
rectangle = Rectangle(2, 3)
print(rectangle)
print("Fläche:", rectangle.area())
```

<sample-output>

rectangle 2x3
Fläche: 6

</sample-output>

## Quadrat

Bitte definieren Sie eine Klasse namens `Square`, die von der Klasse `Rectangle` erbt. Die Seiten eines [Quadrats](https://de.wikipedia.org/wiki/Quadrat) sind alle gleich lang, was das Quadrat zu einem Spezialfall des Rechtecks macht. Die neue Klasse sollte keine neuen Attribute enthalten.

Ein `Square`-Objekt wird wie folgt verwendet:

```python
square = Square(4)
print(square)
print("Fläche:", square.area())
```

<sample-output>

square 4x4
Fläche: 16

</sample-output>

</programming-exercise>

<programming-exercise name='Wortspiel' tmcname='part10-04_word_game'>

Die Aufgabenvorlage enthält die Klassendefinition für ein `WordGame`. Es bietet einige grundlegende Funktionalitäten zum Spielen verschiedener wortbasierter Spiele:

```python
import random

class WordGame():
    def __init__(self, rounds: int):
        self.wins1 = 0
        self.wins2 = 0
        self.rounds = rounds

    def round_winner(self, player1_word: str, player2_word: str):
        # Einen zufälligen Gewinner bestimmen
        return random.randint(1, 2)

    def play(self):
        print("Wortspiel:")
        for i in range(1, self.rounds+1):
            print(f"Runde {i}")
            answer1 = input("Spieler 1: ")
            answer2 = input("Spieler 2: ")

            if self.round_winner(answer1, answer2) == 1:
                self.wins1 += 1
                print("Spieler 1 hat gewonnen")
            elif self.round_winner(answer1, answer2) == 2:
                self.wins2 += 1
                print("Spieler 2 hat gewonnen")
            else:
                pass # Unentschieden

        print("Spiel vorbei, Siege:")
        print(f"Spieler 1: {self.wins1}")
        print(f"Spieler 2: {self.wins2}")
```

Das Spiel wird wie folgt gespielt:

```python
p = WordGame(3)
p.play()
```

<sample-output>

Wortspiel:
Runde 1
Spieler 1: **langeswort**
Spieler 2: **??**
Spieler 2 hat gewonnen
Runde 2
Spieler 1: **ich bin der beste**
Spieler 2: **was?**
Spieler 1 hat gewonnen
Runde 3
Spieler 1: **wer wird gewinnen**
Spieler 2: **ich**
Spieler 1 hat gewonnen
Spiel vorbei, Siege:
Spieler 1: 2
Spieler 2: 1

</sample-output>

In dieser "Basisversion" des Spiels wird der Gewinner zufällig bestimmt. Die Eingabe der Spieler hat keinen Einfluss auf das Ergebnis.

## Längstes Wort gewinnt

Bitte definieren Sie eine Klasse namens `LongestWord`. Es ist eine Version des Spiels, bei der derjenige gewinnt, der in jeder Runde das längste Wort eingibt.

Die neue Version des Spiels wird durch _Vererbung_ von der Klasse `WordGame` implementiert. Die Methode `round_winner` sollte ebenfalls entsprechend überschrieben werden. Das Grundgerüst der neuen Klasse sieht wie folgt aus:

```python
class LongestWord(WordGame):
    def __init__(self, rounds: int):
        super().__init__(rounds)

    def round_winner(self, player1_word: str, player2_word: str):
        # Ihr Code zur Bestimmung des Gewinners hier
```

Ein Beispiel für den Ablauf des neuen Spiels:

```python
p = LongestWord(3)
p.play()
```

<sample-output>

Wortspiel:
Runde 1
Spieler 1: **kurz**
Spieler 2: **langeswort**
Spieler 2 hat gewonnen
Runde 2
Spieler 1: **wort**
Spieler 2: **was?**
Runde 3
Spieler 1: **ich bin der beste**
Spieler 2: **nein, ich**
Spieler 1 hat gewonnen
Spiel vorbei, Siege:
Spieler 1: 1
Spieler 2: 1

</sample-output>

## Die meisten Vokale gewinnen

Bitte definieren Sie eine weitere `WordGame`-Klasse namens `MostVowels`. In dieser Version des Spiels gewinnt die Runde, wer mehr Vokale in sein Wort gequetscht hat.

## Schere, Stein, Papier

Definieren Sie schließlich eine Klasse namens `RockPaperScissors`, die es ermöglicht, eine Runde [Schere, Stein, Papier](https://de.wikipedia.org/wiki/Schere,_Stein,_Papier) zu spielen.

Die Regeln des Spiels lauten wie folgt:

- Stein schlägt Schere (der Stein macht die Schere stumpf, aber die Schere kann den Stein nicht schneiden)
- Papier schlägt Stein (das Papier wickelt den Stein ein)
- Schere schlägt Papier (die Schere schneidet das Papier)

Wenn die Eingabe eines Spielers ungültig ist, verliert er die Runde. Wenn beide Spieler etwas anderes als _Stein_, _Papier_ oder _Schere_ eingeben, ist das Ergebnis ein Unentschieden.

Ein Beispiel für den Ablauf des Spiels:

```python
p = RockPaperScissors(4)
p.play()
```

<sample-output>

Wortspiel:
Runde 1
Spieler 1: **Stein**
Spieler 2: **Stein**
Runde 2
Spieler 1: **Stein**
Spieler 2: **Papier**
Spieler 2 hat gewonnen
Runde 3
Spieler 1: **Schere**
Spieler 2: **Papier**
Spieler 1 hat gewonnen
Runde 4
Spieler 1: **Papier**
Spieler 2: **Dynamit**
Spieler 1 hat gewonnen
Spiel vorbei, Siege:
Spieler 1: 2
Spieler 2: 1

</sample-output>

</programming-exercise>
