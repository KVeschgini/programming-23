---
path: '/part-11/2-more-comprehensions'
title: 'Weitere Abstraktionen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie in der Lage sein, Abstraktionen mit Zeichenketten zu verwenden
- werden Sie wissen, wie man Abstraktionen mit eigenen Klassen verwendet
- werden Sie in der Lage sein, Wörterbuch-Abstraktionen (Dictionary Comprehensions) zu erstellen

</text-box>

Listen sind vielleicht das häufigste Ziel für Abstraktionen, aber Abstraktionen funktionieren bei jeder Serie von Elementen, einschließlich Zeichenketten. Genau wie in den Listenbeispielen im vorangegangenen Abschnitt werden bei einer Listen-Abstraktion auf einer Zeichenkette die Elemente (d. h. die Zeichen) in der Zeichenkette nacheinander entnommen, gemäß dem angegebenen Ausdruck verarbeitet und in einer Liste gespeichert.

```python
name = "Peter Python"

uppercased = [character.upper() for character in name]
print(uppercased)
```

<sample-output>

['P', 'E', 'T', 'E', 'R', ' ', 'P', 'Y', 'T', 'H', 'O', 'N']

</sample-output>

Das Ergebnis ist tatsächlich eine Liste, wie durch die Klammernotation um die Abstraktionsanweisung vorgegeben. Wenn wir stattdessen eine Zeichenkette wollten, könnten wir die Zeichenkettenmethode `join` verwenden, um die Liste in eine Zeichenkette zu parsen. Denken Sie daran, dass die Methode auf der Zeichenkette aufgerufen wird, die wir als "Kleber" zwischen den Zeichen verwenden wollen. Sehen wir uns einige Beispiele an:

```python
name = "Peter"
char_list = list(name)
print(char_list)

print("".join(char_list))
print(" ".join(char_list))
print(",".join(char_list))
print(" und ".join(char_list))
```

<sample-output>

['P', 'e', 't', 'e', 'r']
Peter
P e t e r
P,e,t,e,r
P und e und t und e und r

</sample-output>

Listen-Abstraktionen und die Methode `join` machen es einfach, neue Zeichenketten auf der Grundlage anderer Zeichenketten zu erstellen. Wir könnten zum Beispiel eine Zeichenkette erstellen, die nur die Vokale aus einer anderen Zeichenkette enthält:

```python
test_string = "Hallo zusammen, dies ist ein Test!"

vowels = [character for character in test_string if character in "aeiou"]
new_string = "".join(vowels)

print(new_string)
```

<sample-output>

aouaeeie

</sample-output>

Im obigen Beispiel stehen die Listen-Abstraktion und die Methode `join` in separaten Zeilen, sie könnten jedoch zu einem einzigen Ausdruck kombiniert werden:

```python
test_string = "Hallo zusammen, dies ist ein Test!"

vowel_string = "".join([character for character in test_string if character in "aeiou"])

print(vowel_string)
```

Viele Python-Programmierer schwören auf diese Einzeiler, daher lohnt es sich für Sie, zu lernen, sie zu lesen. Wir könnten sogar die Methode `split` hinzufügen, sodass wir ganze Sätze effizient mit einer einzigen Anweisung verarbeiten können. Im folgenden Beispiel wird das erste Zeichen jedes Wortes in einem Satz entfernt:

```python
sentence = "Sheila keeps on selling seashells on the seashore"

sentence_no_initials = " ".join([word[1:] for word in sentence.split()])
print(sentence_no_initials)
```

<sample-output>

heila eeps n elling eashells n he eashore

</sample-output>

Gehen wir dies Schritt für Schritt durch:

- `word[1:]` extrahiert eine Teilzeichenkette ab dem zweiten Zeichen (bei Index 1)
- `sentence.split()` zerlegt den Satz an dem angegebenen Zeichen in Abschnitte. In diesem Fall wird der Methode kein Argument übergeben, sodass der Satz standardmäßig an Leerzeichen zerlegt wird
- `" ".join()` kombiniert die Elemente in der Liste zu einer neuen Zeichenkette unter Verwendung eines Leerzeichens zwischen den Elementen

Ein traditionellerer iterativer Ansatz könnte wie folgt aussehen:

```python
sentence = "Sheila keeps on selling seashells on the seashore"

word_list = []
words = sentence.split()
for word in words:
    word_no_initials = word[1:]
    word_list.append(word_no_initials)

sentence_no_initials = " ".join(word_list)

print(sentence_no_initials)
```

<programming-exercise name='Verbotene filtern' tmcname='part11-08_filter_forbidden'>

Bitte schreiben Sie eine Funktion namens `filter_forbidden(string: str, forbidden: str)`, die zwei Zeichenketten als Argumente entgegennimmt. Die Funktion soll eine neue Version der ersten Zeichenkette zurückgeben. Sie darf keine Zeichen aus der zweiten Zeichenkette enthalten.

Die Funktion soll unter Verwendung von Listen-Abstraktionen implementiert werden. Die maximale Länge der Funktion beträgt drei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Bitte sehen Sie sich das folgende Beispiel an.

```python
sentence = "Einmal! vor, langer Zeit: gab es einen Python!??!?!"
filtered = filter_forbidden(sentence, "!?:,.")
print(filtered)
```

<sample-output>

Einmal vor langer Zeit gab es einen Python

</sample-output>

</programming-exercise>

## Eigene Klassen und Abstraktionen

Abstraktionen können ein nützliches Werkzeug zur Verarbeitung oder Formulierung von Instanzen Ihrer eigenen Klassen sein, wie wir in den folgenden Beispielen sehen werden.

Zuerst werfen wir einen Blick auf die Klasse `Country`, die ein einfaches Modell für ein einzelnes Land mit Attributen für den Namen und die Bevölkerung darstellt. In der Hauptfunktion unten erstellen wir zunächst einige `Country`-Objekte und verwenden dann eine Listen-Abstraktion, um nur diejenigen auszuwählen, deren Bevölkerung größer als fünf Millionen ist.

```python
class Country:
    """ Diese Klasse modelliert ein einzelnes Land mit seiner Bevölkerung """
    def __init__(self, name: str, population: int):
        self.name = name
        self.population = population

if __name__ == "__main__":
    finland = Country("Finnland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Schweden", 10000000)
    iceland = Country("Island", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country.name for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country)

```

<sample-output>

Finnland
Schweden

</sample-output>

In der obigen Listen-Abstraktion haben wir nur das Attribut `name` aus den `Country`-Objekten ausgewählt, sodass der Inhalt der Liste direkt ausgegeben werden konnte. Wir könnten auch eine neue Liste der Länder selbst erstellen und in der `for`-Schleife auf das Attribut `name` zugreifen. Dies wäre nützlich, wenn dieselbe Liste von Ländern auch später im Programm verwendet würde oder wenn wir in der `for`-Schleife auch das Attribut `population` benötigen würden:

```python
if __name__ == "__main__":
    finland = Country("Finnland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Schweden", 10000000)
    iceland = Country("Island", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country.name, country.population)
```

Im nächsten Beispiel haben wir eine Klasse namens `RunningEvent`, die ein einzelnes Laufereignis mit Attributen für die Länge und den Namen des Rennens modelliert. Wir werden Listen-Abstraktionen verwenden, um `RunningEvent`-Objekte basierend auf einer Liste von Rennlängen zu erstellen.

Der Parameter `name` hat im Konstruktor der Klasse `RunningEvent` einen Standardwert, weshalb wir den Namen nicht als Argument übergeben müssen.

```python
class RunningEvent:
    """ Die Klasse modelliert ein Laufereignis mit einer Länge von n Metern """
    def __init__(self, length: int, name: str = "kein Name"):
        self.length = length
        self.name = name

    def __repr__(self):
        return f"{self.length} m. ({self.name})"

if __name__ == "__main__":
    lengths = [100, 200, 1500, 3000, 42195]
    events = [RunningEvent(length) for length in lengths]

    # Alle Ereignisse ausgeben
    print(events)

    # Eines aus der Liste auswählen und ihm einen Namen geben
    marathon = events[-1] # das letzte Element in der Liste
    marathon.name = "Marathon"

    # Alles erneut ausgeben, einschließlich des neuen Namens
    print(events)
```

<sample-output>

[100 m. (kein Name), 200 m. (kein Name), 1500 m. (kein Name), 3000 m. (kein Name), 42195 m. (kein Name)]
[100 m. (kein Name), 200 m. (kein Name), 1500 m. (kein Name), 3000 m. (kein Name), 42195 m. (Marathon)]

</sample-output>

Lassen Sie uns nun herausfinden, was eine Serie von Elementen "abstrahierbar" macht. Im vorangegangenen Teil haben wir gelernt, wie wir unsere eigenen Klassen iterierbar machen können. Genau dieses Merkmal ermöglicht auch Listen-Abstraktionen. Wenn Ihre eigene Klasse iterierbar ist, kann sie als Basis für eine Listen-Abstraktion verwendet werden. Die folgenden Klassendefinitionen sind direkt aus [Teil 10](/part-10/3-oo-programming-techniques#iterators) kopiert:

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
        # Die Methode gibt eine Referenz auf das Objekt selbst zurück,
        # da der Iterator innerhalb derselben Klassendefinition implementiert ist
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

# Testen Sie Ihre Klassen
if __name__ == "__main__":
    b1 = Book("The Life of Python", "Montague Python", 123)
    b2 = Book("The Old Man and the C", "Ernest Hemingjavay", 204)
    b3 = Book("A Good Cup of Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Eine Liste erstellen, die die Namen aller Bücher enthält
    book_names = [book.name for book in shelf]
    print(book_names)

```

<programming-exercise name='Produkte in der Einkaufsliste' tmcname='part11-09_products_in_shopping_list'>

In Teil 10 haben Sie eine [iterierbare Einkaufsliste](/part-10/3-oo-programming-techniques#programming-exercise-an-iterable-shopping-list) erstellt, und wir haben gerade gelernt, dass ein aus einer iterierbaren Klasse erstelltes Objekt mit Listen-Abstraktionen verwendet werden kann. Die Übungsvorlage enthält eine abgespeckte Version der `ShoppingList` mit gerade genug Funktionalität, um die Anforderungen dieser Übung zu erfüllen.

Bitte schreiben Sie eine Funktion namens `products_in_shopping_list(shopping_list, amount: int)`, die ein `ShoppingList`-Objekt und einen Ganzzahlwert als Argumente entgegennimmt. Die Funktion gibt eine Liste von Produktnamen zurück. Die Liste soll nur die Produkte enthalten, deren Anzahl mindestens dem durch den Parameter `amount` angegebenen Wert entspricht.

Die Funktion soll unter Verwendung von Listen-Abstraktionen implementiert werden. Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt. Die Klassendefinition von `ShoppingList` sollte _nicht_ geändert werden.

Die Funktion soll wie folgt arbeiten:

```python
my_list = ShoppingList()
my_list.add("Bananen", 10)
my_list.add("Äpfel", 5)
my_list.add("alkoholfreies Bier", 24)
my_list.add("Ananas", 1)

print("Die Einkaufsliste enthält mindestens 8 der folgenden Artikel:")
for product in products_in_shopping_list(my_list, 8):
    print(product)
```

<sample-output>

Die Einkaufsliste enthält mindestens 8 der folgenden Artikel:
Bananen
alkoholfreies Bier

</sample-output>

</programming-exercise>

<programming-exercise name='Preisdifferenz günstigerer Immobilien' tmcname='part11-10_cheaper_properties'>

Diese Übung ist eine leicht modifizierte Version der Übung [Immobilienvergleich](/part-9/1-objects-and-references#programming-exercise-comparing-properties) aus Teil 9.

Bitte schreiben Sie eine Funktion namens `cheaper_properties(properties: list, reference: RealProperty)`, die eine Liste von Immobilien und ein einzelnes `RealProperty`-Objekt als Argumente entgegennimmt. Die Funktion soll eine Liste zurückgeben, die nur diejenigen Immobilien aus der ursprünglichen Liste enthält, die günstiger als die Referenzimmobilie sind, zusammen mit der Preisdifferenz. Die Elemente in der zurückgegebenen Liste sollen Tupel sein, wobei das erste Element die Immobilie selbst und das zweite die Preisdifferenz ist.

Die Funktion soll unter Verwendung von Listen-Abstraktionen implementiert werden. Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Der Code für die Klasse `RealProperty` ist in der Übungsvorlage enthalten und sollte nicht geändert werden.

Ein Beispiel für die Funktion in Aktion:

```python
a1 = RealProperty(1, 16, 5500, "Zentrales Studio")
a2 = RealProperty(2, 38, 4200, "Zwei Zimmer in der Innenstadt")
a3 = RealProperty(3, 78, 2500, "Drei Zimmer in den Vororten")
a4 = RealProperty(6, 215, 500, "Bauernhof im Nirgendwo")
a5 = RealProperty(4, 105, 1700, "Loft in einer Kleinstadt")
a6 = RealProperty(25, 1200, 2500, "Herrenhaus auf dem Land")

properties = [a1, a2, a3, a4, a5, a6]

print(f"Günstigere Optionen im Vergleich zu {a3.description}:")
for item in cheaper_properties(properties, a3):
    print(f"{item[0].description:35} Preisdifferenz {item[1]} Euro")
```

<sample-output>

Günstigere Optionen im Vergleich zu Drei Zimmer in den Vororten:
Zentrales Studio                      Preisdifferenz 107000 Euro
Zwei Zimmer in der Innenstadt         Preisdifferenz 35400 Euro
Bauernhof im Nirgendwo                Preisdifferenz 87500 Euro
Loft in einer Kleinstadt              Preisdifferenz 16500 Euro

</sample-output>

</programming-exercise>

## Abstraktionen und Wörterbücher

Es gibt nichts an Abstraktionen, das sie zwangsläufig auf Listen beschränkt. Das Ergebnis ist eine Liste, weil die Abstraktionsanweisung in eckige Klammern eingeschlossen ist, die eine Python-Liste kennzeichnen. Abstraktionen funktionieren genauso gut mit Python-Wörterbüchern (Dictionaries), wenn Sie stattdessen geschweifte Klammern verwenden. Denken Sie jedoch daran, dass Wörterbücher Schlüssel-Wert-Paare erfordern. Beide müssen angegeben werden, wenn ein Wörterbuch erstellt wird, auch bei Abstraktionen.

Die Basis einer Abstraktion kann jede iterierbare Serie sein, sei es eine Liste, eine Zeichenkette, ein Tupel, ein Wörterbuch, eine Ihrer eigenen iterierbaren Klassen und so weiter.

Im folgenden Beispiel verwenden wir eine Zeichenkette als Basis für ein Wörterbuch. Das Wörterbuch enthält alle eindeutigen Zeichen in der Zeichenkette zusammen mit der Anzahl ihres Vorkommens:

```python
sentence = "hallo zusammen"

char_counts = {character : sentence.count(character) for character in sentence}
print(char_counts)
```

<sample-output>

{'h': 1, 'a': 2, 'l': 2, 'o': 1, ' ': 1, 'z': 1, 'u': 1, 's': 1, 'm': 2, 'e': 1, 'n': 1}

</sample-output>

Das Prinzip der Abstraktionsanweisung ist genau dasselbe wie bei Listen, aber anstelle eines einzelnen Wertes besteht der Ausdruck nun aus einem Schlüssel und einem Wert. Die allgemeine Syntax sieht wie folgt aus:

`{<Schlüssel-Ausdruck> : <Wert-Ausdruck> for <Element> in <Serie>}`

Zum Abschluss dieses Abschnitts werfen wir noch einmal einen Blick auf die Fakultäten. Dieses Mal speichern wir die Ergebnisse in einem Wörterbuch. Die Zahl selbst ist der Schlüssel, während der Wert das Ergebnis der Fakultät aus unserer Funktion ist:

```python
def factorial(n: int):
    """ Die Funktion berechnet die Fakultät n! für Ganzzahlen größer als Null """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [-2, 3, 2, 1, 4, -10, 5, 1, 6]
    factorials = {number : factorial(number) for number in numbers if number > 0}
    print(factorials)
```

<sample-output>

{3: 6, 2: 2, 1: 1, 4: 24, 5: 120, 6: 720}

</sample-output>

<programming-exercise name='Längen von Zeichenketten' tmcname='part11-11_lengths_of_strings'>

Bitte schreiben Sie eine Funktion namens `lengths(strings: list)`, die eine Liste von Zeichenketten als Argument entgegennimmt. Die Funktion soll ein _Wörterbuch_ zurückgeben, mit den Zeichenketten aus der Liste als Schlüsseln und ihren Längen als Werten.

Die Funktion soll mit einer Wörterbuch-Abstraktion implementiert werden. Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Die Funktion soll wie folgt arbeiten:

```python
word_list = ["einmal", "vor" , "langer", "zeit", "in"]

word_lengths = lengths(word_list)
print(word_lengths)
```

<sample-output>

{'einmal': 6, 'vor': 3, 'langer': 6, 'zeit': 4, 'in': 2}

</sample-output>


</programming-exercise>

<programming-exercise name='Häufigste Wörter' tmcname='part11-12_most_common_words'>

Bitte schreiben Sie eine Funktion namens `most_common_words(filename: str, lower_limit: int)`, die einen Dateinamen und einen Ganzzahlwert für eine Untergrenze als Argumente entgegennimmt. Die Funktion soll ein Wörterbuch zurückgeben, das die Vorkommen der Wörter enthält, die mindestens so oft erscheinen, wie durch den Parameter `lower_limit` angegeben.

Nehmen wir zum Beispiel an, die Funktion würde zur Verarbeitung einer Datei namens _comprehensions.txt_ mit folgendem Inhalt verwendet:

```txt
Listen-Abstraktion ist ein eleganter Weg, um Listen auf der Grundlage bestehender Listen zu definieren und zu erstellen.
Listen-Abstraktion ist im Allgemeinen kompakter und schneller als normale Funktionen und Schleifen zum Erstellen von Listen.
Wir sollten es jedoch vermeiden, sehr lange Listen-Abstraktionen in einer Zeile zu schreiben, um sicherzustellen, dass der Code benutzerfreundlich ist.
Denken Sie daran, dass jede Listen-Abstraktion in eine for-Schleife umgeschrieben werden kann, aber nicht jede for-Schleife in Form einer Listen-Abstraktion umgeschrieben werden kann.
```

Wenn die Funktion mit den Argumenten `most_common_words("comprehensions.txt", 3)` aufgerufen wird, sollte sie Folgendes zurückgeben:

<sample-output>

{'Abstraktion': 4, 'ist': 3, 'und': 3, 'zu': 3, 'Listen': 4, 'in': 3}

</sample-output>

Hinweis: Die Groß- und Kleinschreibung beeinflusst die Ergebnisse, und alle flektierten Formen sind in dieser Übung eindeutige Wörter. Das heißt, die Wörter `Liste`, `Listen` und `liste` sind hier jeweils separate Wörter, und nur `Listen` kommt häufig genug vor, um es in die zurückgegebene Liste zu schaffen. Alle Satzzeichen sollten vor dem Zählen der Vorkommen entfernt werden.

Es liegt an Ihnen, wie Sie dies implementieren. Der einfachste Weg wäre wahrscheinlich die Verwendung von Listen- und Wörterbuch-Abstraktionen.

</programming-exercise>
