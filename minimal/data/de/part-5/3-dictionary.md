---
path: '/part-5/3-dictionary'
title: 'Dictionary'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie mit der Datenstruktur des Dictionaries vertraut sein
- werden Sie in der Lage sein, ein Dictionary mit verschiedenen Typen von Schlüsseln und Werten zu verwenden
- werden Sie wissen, wie man den Inhalt eines Dictionaries durchläuft
- werden Sie in der Lage sein, einige typische Anwendungsfälle für Dictionaries zu nennen

</text-box>

Listen können in vielen Situationen praktisch sein, aber sie sind dadurch eingeschränkt, dass auf die Elemente über Indizes zugegriffen wird (0, 1, 2 usw.). Wenn Sie ein bestimmtes Element in einer Liste finden wollen, müssen Sie entweder dessen Index kennen oder im schlimmsten Fall die gesamte Liste durchlaufen.

Eine weitere zentrale Datenstruktur in Python ist das _Dictionary_ (Wörterbuch). In einem Dictionary werden die Elemente über _Schlüssel_ (Keys) indiziert. Jeder Schlüssel ist einem _Wert_ (Value) zugeordnet. Auf die im Dictionary gespeicherten Werte kann über den Schlüssel zugegriffen und diese können geändert werden.

## Verwendung eines Dictionaries

Das folgende Beispiel zeigt Ihnen, wie die Datenstruktur des Dictionaries funktioniert. Hier ist ein einfaches Dictionary von Finnisch nach Englisch:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

print(len(my_dictionary))
print(my_dictionary)
print(my_dictionary["apina"])
```

<sample-output>

3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey

</sample-output>

Die Notation `{}` erzeugt ein leeres Dictionary, dem wir nun Inhalte hinzufügen können. Drei Schlüssel-Wert-Paare werden hinzugefügt: `"apina"` wird auf `"monkey"` abgebildet, `"banaani"` auf `"banana"` und `"cembalo"` auf `"harpsichord"`. Schließlich wird die Anzahl der Schlüssel-Wert-Paare im Dictionary zusammen mit dem gesamten Dictionary und dem dem Schlüssel `"apina"` zugeordneten Wert ausgegeben.

Nachdem wir das Dictionary definiert haben, könnten wir es auch mit Benutzereingaben verwenden:

```python
word = input("Bitte geben Sie ein Wort ein: ")
if word in my_dictionary:
    print("Übersetzung: ", my_dictionary[word])
else:
    print("Wort nicht gefunden")
```

Beachten Sie die Verwendung des `in`-Operators oben. Wenn er auf eine Variable vom Typ Dictionary angewendet wird, prüft er, ob der erste Operand unter den im Dictionary gespeicherten Schlüsseln ist. Bei verschiedenen Eingaben könnte dieses Programm folgendes ausgeben:

<sample-output>

Bitte geben Sie ein Wort ein: **apina**
Übersetzung: monkey

</sample-output>

<sample-output>

Bitte geben Sie ein Wort ein: **pöllö**
Wort nicht gefunden

</sample-output>

## Was kann in einem Dictionary gespeichert werden?

Der Datentyp heißt Dictionary, aber er muss nicht nur Zeichenketten enthalten. Zum Beispiel sind im folgenden Dictionary die Schlüssel Zeichenketten, aber die Werte sind Ganzzahlen:

```python
results = {}
results["Mary"] = 4
results["Alice"] = 5
results["Larry"] = 2
```

Hier sind die Schlüssel Ganzzahlen und die Werte sind Listen:

```python
lists = {}
lists[5] = [1, 2, 3]
lists[42] = [5, 4, 5, 4, 5]
lists[100] = [5, 2, 3]
```

## Wie Schlüssel und Werte funktionieren

Jeder Schlüssel kann nur einmal im Dictionary vorkommen. Wenn Sie einen Eintrag mit einem Schlüssel hinzufügen, der bereits im Dictionary existiert, wird der ursprüngliche, diesem Schlüssel zugeordnete Wert durch den neuen Wert ersetzt:

```python
my_dictionary["suuri"] = "big"
my_dictionary["suuri"] = "large"
print(my_dictionary["suuri"])
```

<sample-output>

large

</sample-output>

Alle Schlüssel in einem Dictionary müssen _unveränderlich_ (immutable) sein. Daher kann eine Liste nicht als Schlüssel verwendet werden, da sie geändert werden kann. Zum Beispiel verursacht die Ausführung des folgenden Codes einen Fehler:

```python
my_dictionary[[1, 2, 3]] = 5
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

<text-box variant="hint" name="Hash-Tabelle">

Beachten Sie das Wort 'unhashable' in der obigen Fehlermeldung. Dies ist ein Hinweis auf das Innenleben des Datentyps Dictionary. Python speichert den Inhalt eines Dictionaries in einer _Hash-Tabelle_. Jeder Schlüssel wird auf einen _Hash-Wert_ reduziert, der bestimmt, wo der Schlüssel im Arbeitsspeicher des Computers gespeichert wird. Die obige Fehlermeldung zeigt an, dass eine Liste nicht zu einem Hash-Wert verarbeitet werden kann und daher nicht als Schlüssel in einem Dictionary verwendet werden kann.

Die Kurse _Data Structures and Algorithms_ werden Hash-Tabellen weiter untersuchen.

</text-box>

Im Gegensatz zu Schlüsseln können sich die in einem Dictionary gespeicherten _Werte_ ändern, sodass jeder Datentyp als Wert akzeptabel ist. Ein Wert kann auch mehr als einem Schlüssel im selben Dictionary zugeordnet sein.

<programming-exercise name='Mal zehn' tmcname='part05-14_times_ten'>

Bitte schreiben Sie eine Funktion namens `times_ten(start_index: int, end_index: int)`, die ein neues Dictionary erstellt und zurückgibt. Die Schlüssel des Dictionaries sollten die Zahlen zwischen `start_index` und `end_index` (einschließlich) sein.

Der jedem Schlüssel zugeordnete Wert sollte der Schlüssel mal zehn sein.

Zum Beispiel:

```python
d = times_ten(3, 6)
print(d)
```

<sample-output>

{3: 30, 4: 40, 5: 50, 6: 60}

</sample-output>

</programming-exercise>

<programming-exercise name='Fakultäten' tmcname='part05-15_factorials'>

Bitte schreiben Sie eine Funktion namens `factorials(n: int)`, die die Fakultäten der Zahlen 1 bis `n` in einem Dictionary zurückgibt. Die Zahl ist der Schlüssel, und die Fakultät dieser Zahl ist der ihr zugeordnete Wert.

Zur Erinnerung: Die Fakultät der Zahl `n` wird als `n`! geschrieben und berechnet, indem die Zahl mit jeder kleineren Ganzzahl multipliziert wird. Zum Beispiel ist die Fakultät von 4: 4 * 3 * 2 * 1 = 24.

Ein Beispiel für die Funktion in Aktion:

```python
k = factorials(5)
print(k[1])
print(k[3])
print(k[5])
```

<sample-output>

1
6
120

</sample-output>

</programming-exercise>

## Durchlaufen eines Dictionaries

Die vertraute `for element in sammlung`-Schleife kann auch zum Durchlaufen eines Dictionaries verwendet werden. Wenn sie direkt auf das Dictionary angewendet wird, geht die Schleife nacheinander die im Dictionary gespeicherten Schlüssel durch. Im folgenden Beispiel werden alle im Dictionary gespeicherten Schlüssel und Werte ausgegeben:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key in my_dictionary:
    print("Schlüssel:", key)
    print("Wert:", my_dictionary[key])
```

<sample-output>

Schlüssel: apina
Wert: monkey
Schlüssel: banaani
Wert: banana
Schlüssel: cembalo
Wert: harpsichord

</sample-output>

Manchmal müssen Sie den gesamten Inhalt eines Dictionaries durchlaufen. Die Methode `items` gibt alle im Dictionary gespeicherten Schlüssel und Werte paarweise zurück:

```python

for key, value in my_dictionary.items():
    print("Schlüssel:", key)
    print("Wert:", value)
```

In den obigen Beispielen haben Sie vielleicht bemerkt, dass die Schlüssel in derselben Reihenfolge verarbeitet werden, in der sie dem Dictionary hinzugefügt wurden. Da die Schlüssel basierend auf einem Hash-Wert verarbeitet werden, sollte die Reihenfolge in Anwendungen normalerweise keine Rolle spielen. Tatsächlich ist in vielen älteren Version von Python nicht garantiert, dass die Reihenfolge dem Zeitpunkt des Einfügens folgt.

## Einige fortgeschrittenere Möglichkeiten zur Verwendung von Dictionaries

Schauen wir uns eine Liste von Wörtern an:

```python
word_list = [
  "banana", "milk", "beer", "cheese", "sourmilk", "juice", "sausage",
  "tomato", "cucumber", "butter", "margarine", "cheese", "sausage",
  "beer", "sourmilk", "sourmilk", "butter", "beer", "chocolate"
]
```

Wir möchten diese Wortliste auf verschiedene Weise analysieren. Zum Beispiel möchten wir wissen, wie oft jedes Wort in der Liste vorkommt.

Ein Dictionary kann ein nützliches Werkzeug zur Verwaltung dieser Art von Informationen sein. Im folgenden Beispiel gehen wir die Elemente in der Liste nacheinander durch. Indem wir die Wörter in der Liste als Schlüssel in einem neuen Dictionary verwenden, ist der jedem Schlüssel zugeordnete Wert die Anzahl der Male, die das Wort aufgetreten ist:

```python
def counts(my_list):
    words = {}
    for word in my_list:
        # wenn das Wort noch nicht im Dictionary ist, initialisiere den Wert auf Null
        if word not in words:
            words[word] = 0
        # erhöhe den Wert
        words[word] += 1
    return words

# rufe die Funktion auf
print(counts(word_list))
```

Das Programm gibt folgendes aus:

<sample-output>

{'banana': 1, 'milk': 1, 'beer': 3, 'cheese': 2, 'sourmilk': 3, 'juice': 1, 'sausage': 2, 'tomato': 1, 'cucumber': 1, 'butter': 2, 'margarine': 1, 'chocolate': 1}

</sample-output>

Was wäre, wenn wir die Wörter basierend auf dem Anfangsbuchstaben jedes Wortes kategorisieren wollten? Eine Möglichkeit, dies zu erreichen, wäre die Verwendung von Dictionaries:

```python
def categorize_by_initial(my_list):
    groups = {}
    for word in my_list:
        initial = word[0]
        # initialisiere eine neue Liste, wenn der Buchstabe zum ersten Mal auftritt
        if initial not in groups:
            groups[initial] = []
        # füge das Wort der entsprechenden Liste hinzu
        groups[initial].append(word)
    return groups

groups = categorize_by_initial(word_list)

for key, value in groups.items():
    print(f"Wörter, die mit {key} beginnen:")
    for word in value:
        print(word)
```
Die Struktur der Funktion ist der vorherigen Übung sehr ähnlich, aber diesmal sind die den Schlüsseln zugeordneten Werte Listen. Das Programm gibt folgendes aus:

<sample-output>

Wörter, die mit b beginnen:
banana
beer
butter
beer
butter
beer
Wörter, die mit m beginnen:
milk
margarine
Wörter, die mit c beginnen:
cheese
cucumber
cheese
chocolate
Wörter, die mit s beginnen:
sourmilk
sausage
sausage
sourmilk
sourmilk
Wörter, die mit j beginnen:
juice
Wörter, die mit t beginnen:
tomato

</sample-output>

<programming-exercise name='Histogramm' tmcname='part05-16_histogram'>

Bitte schreiben Sie eine Funktion namens `histogram`, die eine Zeichenkette als Argument erhält. Die Funktion sollte ein Histogramm ausgeben, das die Anzahl der Vorkommen jedes Buchstabens in der Zeichenkette darstellt. Jedes Vorkommen eines Buchstabens sollte durch einen Stern in der spezifischen Zeile für diesen Buchstaben dargestellt werden.

Zum Beispiel sollte der Funktionsaufruf `histogram("abba")` folgendes ausgeben:

<sample-output>

<pre>
a **
b **
</pre>

</sample-output>

während `histogram("statistically")` folgendes ausgeben sollte:

<sample-output>

<pre>
s **
t ***
a **
i **
c *
l **
y *
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Telefonbuch, Version 1' tmcname='part05-17_phone_book_v1'>

Bitte schreiben Sie eine Telefonbuch-Anwendung. Sie sollte wie folgt funktionieren:

<sample-output>

Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **2**
Name: **peter**
Nummer: **040-5466745**
ok!
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **2**
Name: **emily**
Nummer: **045-1212344**
ok!
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **1**
Name: **peter**
040-5466745
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **1**
Name: **mary**
keine Nummer
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **2**
Name: **peter**
Nummer: **09-22223333**
ok!
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **1**
Name: **peter**
09-22223333
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **3**
beende...

</sample-output>

Wie Sie oben sehen können, kann jedem Namen nur eine einzige Nummer zugeordnet werden. Wenn ein neuer Eintrag mit demselben Namen hinzugefügt wird, wird die dem alten Eintrag zugeordnete Nummer durch die neue Nummer ersetzt.

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

</programming-exercise>

<programming-exercise name='Telefonbuch, Version 2' tmcname='part05-18_phone_book_v2'>

Bitte schreiben Sie eine verbesserte Version der Telefonbuch-Anwendung. Jeder Eintrag sollte nun mehrere Telefonnummern aufnehmen können. Die Anwendung sollte ansonsten genau wie oben funktionieren, aber diesmal sollten _alle_ einem Namen zugeordneten Nummern ausgegeben werden.

<sample-output>

Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **2**
Name: **peter**
Nummer: **040-5466745**
ok!
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **2**
Name: **emily**
Nummer: **045-1212344**
ok!
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **1**
Name: **peter**
040-5466745
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **1**
Name: **mary**
keine Nummer
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **2**
Name: **peter**
Nummer: **09-22223333**
ok!
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **1**
Name: **peter**
040-5466745
09-22223333
Befehl (1 Suche, 2 Hinzufügen, 3 Beenden): **3**
beende...

</sample-output>

</programming-exercise>

## Entfernen von Schlüsseln und Werten aus einem Dictionary

Es ist natürlich möglich, auch Schlüssel-Wert-Paare aus dem Dictionary zu entfernen. Es gibt zwei Möglichkeiten, dies zu erreichen. Die erste ist der Befehl `del`:

```python
staff = {"Alan": "Dozent", "Emily": "Professorin", "David": "Dozent"}
del staff["David"]
print(staff)
```

<sample-output>

{'Alan': 'Dozent', 'Emily': 'Professorin'}

</sample-output>

Wenn Sie versuchen, mit dem `del`-Befehl einen Schlüssel zu löschen, der im Dictionary nicht existiert, tritt ein Fehler auf:

```python
staff = {"Alan": "Dozent", "Emily": "Professorin", "David": "Dozent"}
del staff["Paul"]
```

<sample-output>

<pre>
>>> del staff["Paul"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'Paul'
</pre>

</sample-output>

Bevor Sie also einen Schlüssel löschen, sollten Sie prüfen, ob er im Dictionary vorhanden ist:

```python
staff = {"Alan": "Dozent", "Emily": "Professorin", "David": "Dozent"}
if "Paul" in staff:
  del staff["Paul"]
  print("Gelöscht")
else:
  print("Diese Person ist kein Mitarbeiter")
```

Die andere Möglichkeit, Einträge in einem Dictionary zu löschen, ist die Methode `pop`:

```python
staff = {"Alan": "Dozent", "Emily": "Professorin", "David": "Dozent"}
deleted = staff.pop("David")
print(staff)
print(deleted, "gelöscht")
```

<sample-output>

{'Alan': 'Dozent', 'Emily': 'Professorin'}
Dozent gelöscht

</sample-output>

Wie Sie oben sehen können, gibt `pop` auch den Wert des gelöschten Eintrags zurück.

Standardmäßig verursacht `pop` ebenfalls einen Fehler, wenn Sie versuchen, einen Schlüssel zu löschen, der nicht im Dictionary vorhanden ist. Es ist möglich, dies zu vermeiden, indem man der Methode ein zweites Argument übergibt, das einen _Standard-Rückgabewert_ enthält. Dieser Wert wird zurückgegeben, falls der Schlüssel im Dictionary nicht gefunden wird. Der spezielle Python-Wert `None` bietet sich hier an:

```python
staff = {"Alan": "Dozent", "Emily": "Professorin", "David": "Dozent"}
deleted = staff.pop("Paul", None)
if deleted == None:
  print("Diese Person ist kein Mitarbeiter")
else:
  print(deleted, "gelöscht")
```

<sample-output>

Diese Person ist kein Mitarbeiter

</sample-output>

Hinweis: Wenn Sie den Inhalt des gesamten Dictionaries löschen müssen und versuchen, dies mit einer for-Schleife zu tun, wie folgt:

```python
staff = {"Alan": "Dozent", "Emily": "Professorin", "David": "Dozent"}
for key in staff:
  del staff[key]
```

erhalten Sie eine Fehlermeldung:

<sample-output>

RuntimeError: dictionary changed size during iteration

</sample-output>

Beim Durchlaufen einer Sammlung mit einer `for`-Schleife darf sich der Inhalt während des Schleifendurchlaufs nicht ändern.

Glücklicherweise gibt es eine Dictionary-Methode genau für diesen Zweck:

```python
staff.clear()
```

<programming-exercise name='Ein Dictionary invertieren' tmcname='part05-19_invert_dictionary'>

Bitte schreiben Sie eine Funktion namens `invert(dictionary: dict)`, die ein Dictionary als Argument erhält. Das Dictionary sollte an Ort und Stelle invertiert werden, sodass Werte zu Schlüsseln und Schlüssel zu Werten werden.

Ein Beispiel für die Verwendung:

```python
s = {1: "erstens", 2: "zweitens", 3: "drittens", 4: "viertens"}
invert(s)
print(s)
```

<sample-output>

{"erstens": 1, "zweitens": 2, "drittens": 3, "viertens": 4}

</sample-output>

**Hinweis:** Die Prinzipien bezüglich Listen, die [hier](/part-5/2-references#using-lists-as-parameters-in-functions) behandelt wurden, gelten auch für Dictionaries, die als Argumente übergeben werden.

Wenn Sie Schwierigkeiten haben, diese Übung abzuschließen, könnte Ihnen das [Visualisierungstool](http://www.pythontutor.com/visualize.html#mode=edit) helfen zu verstehen, was Ihr Code tut oder nicht tut.

</programming-exercise>

<programming-exercise name='Zahlen ausgeschrieben' tmcname='part05-20_numbers_spelled_out'>

Bitte schreiben Sie eine Funktion namens `dict_of_numbers()`, die ein neues Dictionary zurückgibt. Das Dictionary sollte die Zahlen von 0 bis 99 als Schlüssel haben. Der jedem Schlüssel zugeordnete Wert sollte die als Wort ausgeschriebene Zahl sein. Schauen Sie sich bitte das folgende Beispiel an:

```python
numbers = dict_of_numbers()
print(numbers[2])
print(numbers[11])
print(numbers[45])
print(numbers[99])
print(numbers[0])
```

<sample-output>

two
eleven
forty-five
ninety-nine
zero

</sample-output>

Hinweis: Bitte formulieren Sie nicht jede ausgeschriebene Zahl von Hand. Überlegen Sie, wie Sie Schleifen und Dictionaries in Ihrer Lösung verwenden können.

</programming-exercise>

## Verwendung von Dictionaries für strukturierte Daten

Dictionaries sind sehr nützlich für die Strukturierung von Daten. Der folgende Code erstellt ein Dictionary, das einige persönliche Daten enthält:

```python
person = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
```

Das bedeutet, dass wir hier eine Person namens Pippa Python haben, deren Größe 154, Gewicht 61 und Alter 44 ist. Dieselbe Information könnte genauso gut in Variablen gespeichert werden:

```python
name = "Pippa Python"
height = 154
weight = 61
age = 44
```

Der Vorteil eines Dictionaries ist, dass es eine Sammlung ist. Es sammelt zusammengehörige Daten unter einer Variable, sodass es einfach ist, auf die verschiedenen Komponenten zuzugreifen. Derselbe Vorteil wird durch eine Liste geboten:

```python
person = ["Pippa Python", 153, 61, 44]
```

Bei Listen muss sich der Programmierer merken, was an jedem Index in der Liste gespeichert ist. Es gibt nichts, was darauf hindeutet, dass `person[2]` das Gewicht und `person[3]` das Alter der Person enthält. Bei der Verwendung eines Dictionaries wird dieses Problem vermieden, da auf jedes Datenbit über einen benannten Schlüssel zugegriffen wird.

Angenommen, wir haben mehrere Personen im gleichen Format definiert, können wir auf deren Daten wie folgt zugreifen:

```python
person1 = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
person2 = {"name": "Peter Pythons", "height": 174, "weight": 103, "age": 31}
person3 = {"name": "Pedro Python", "height": 191, "weight": 71, "age": 14}

people = [person1, person2, person3]

for person in people:
    print(person["name"])

combined_height = 0
for person in people:
    combined_height += person["height"]

print("Die durchschnittliche Größe ist", combined_height / len(people))
```

<sample-output>

Pippa Python
Peter Pythons
Pedro Python
Die durchschnittliche Größe ist 173.0

</sample-output>

<programming-exercise name='Film-Datenbank' tmcname='part05-21_movie_database'>

Bitte schreiben Sie eine Funktion namens `add_movie(database: list, name: str, director: str, year: int, runtime: int)`, die ein neues Film-Objekt in eine Film-Datenbank einfügt.

Die Datenbank ist eine Liste, und jedes Film-Objekt in der Liste ist ein Dictionary. Das Dictionary sollte die folgenden Schlüssel enthalten:

* name
* director
* year
* runtime

Die diesen Schlüsseln zugeordneten Werte werden der Funktion als Argumente übergeben.

Ein Beispiel für die Verwendung:

```python
database = []
add_movie(database, "Vom Python verweht", "Victor Pything", 2017, 116)
add_movie(database, "Pythons on a Plane", "Renny Pytholin", 2001, 94)
print(database)
```

<sample-output>

[{"name": "Vom Python verweht", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]

</sample-output>

</programming-exercise>

<programming-exercise name='Filme finden' tmcname='part05-22_find_movies'>

Bitte schreiben Sie eine Funktion namens `find_movies(database: list, search_term: str)`, die die in der vorherigen Übung erstellte Film-Datenbank verarbeitet. Die Funktion sollte eine neue Liste erstellen, die nur die Filme enthält, deren Titel das gesuchte Wort enthält. Groß- und Kleinschreibung ist hierbei irrelevant. Eine Suche nach `ana` sollte eine Liste zurückgeben, die sowohl `Anaconda` als auch `Management` enthält.

Ein Beispiel für die Verwendung:

```python
database = [{"name": "Vom Python verweht", "director": "Victor Pything", "year": 2017, "runtime": 116},
{"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94},
{"name": "Dawn of the Dead Programmers", "director": "M. Night Python", "year": 2011, "runtime": 101}]

my_movies = find_movies(database, "python")
print(my_movies)
```

<sample-output>

[{"name": "Vom Python verweht", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]

</sample-output>

</programming-exercise>

An dieser Stelle des Kurses können Sie sich entscheiden, an einer Forschungsstudie zum Erlernen der Programmierung teilzunehmen. Die Teilnahme ist freiwillig und einzelne Teilnehmer können aus den in der Studie gesammelten Daten nicht identifiziert werden. Sie können das Experiment jederzeit frei beenden. [Klicken Sie hier, um mit der Studie zu beginnen!](https://runestone.academy/ns/books/published/p3pt/index.html)
