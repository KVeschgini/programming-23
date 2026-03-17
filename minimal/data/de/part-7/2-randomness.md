---
path: '/part-7/2-randomness'
title: 'Zufall'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie mit einigen Funktionen im Modul `random` vertraut sein
- werden Sie in der Lage sein, Zufallszahlen in Ihren Programmen zu nutzen

</text-box>

Dieser Abschnitt konzentriert sich auf das Modul [random](https://docs.python.org/3/library/random.html?highlight=random#module-random) aus der Python-Standardbibliothek. Es enthält Werkzeuge zum Generieren von Zufallszahlen und andere randomisierte Funktionalitäten.

Die Abschnitte in diesem Teil des Materials enthalten viele Links zur [Dokumentation](https://docs.python.org/3/library/) der Python-Standardbibliothek. Wir empfehlen, den Links zu folgen, um sich damit vertraut zu machen, wie die Dokumentation funktioniert.

## Eine Zufallszahl generieren

Die Funktion [randint(a, b)](https://docs.python.org/3/library/random.html?highlight=random#random.randint) gibt einen zufälligen Ganzzahlwert zwischen `a` und `b` (einschließlich) zurück. Das folgende Programm funktioniert beispielsweise wie ein herkömmlicher Würfel:

```python
from random import randint

print("Das Ergebnis des Wurfs:", randint(1, 6))
```

Das Ausführen dieses Programms könnte folgendes ausgeben:

<sample-output>

Das Ergebnis des Wurfs: 4

</sample-output>

Das folgende Programm würfelt zehnmal:

```python
from random import randint

for i in range(10):
    print("Das Ergebnis des Wurfs:", randint(1, 6))
```

Das Ausführen des obigen Programms könnte folgendes ausgeben:

<sample-output>

Das Ergebnis des Wurfs: 5
Das Ergebnis des Wurfs: 4
Das Ergebnis des Wurfs: 3
Das Ergebnis des Wurfs: 2
Das Ergebnis des Wurfs: 3
Das Ergebnis des Wurfs: 4
Das Ergebnis des Wurfs: 6
Das Ergebnis des Wurfs: 4
Das Ergebnis des Wurfs: 4
Das Ergebnis des Wurfs: 3

</sample-output>

Hinweis: Es ist wichtig zu bedenken, dass die Funktion `randint` etwas anders funktioniert als beispielsweise Slices oder die Funktion `range`, die wir zuvor kennengelernt haben. Der Funktionsaufruf `randint(1, 6)` ergibt eine Zahl zwischen 1 und 6 einschließlich, aber der Funktionsaufruf `range(1, 6)` ergibt einen Bereich von Zahlen von 1 bis 5.

## Weitere Zufallsfunktionen

Die Funktion [shuffle](https://docs.python.org/3/library/random.html?highlight=random#random.shuffle) mischt eine als Argument übergebene Datenstruktur an Ort und Stelle (in place). Das folgende Programm mischt beispielsweise eine Liste von Wörtern:

```python
from random import shuffle

words = ["atlas", "banana", "carrot"]
shuffle(words)
print(words)
```

<sample-output>

['banana', 'atlas', 'carrot']

</sample-output>

Die Funktion `choice` gibt ein zufällig ausgewähltes Element aus einer Datenstruktur zurück:

```python
from random import choice

words = ["atlas", "banana", "carrot"]
print(choice(words))
```

<sample-output>

'carrot'

</sample-output>

## Lottozahlen

Ein häufiges Beispiel für die Untersuchung von Zufall ist der Fall von Lottozahlen. Versuchen wir, einige Lottozahlen zu ziehen. In Finnland besteht das nationale Lotto aus einem Pool von 40 Zahlen, von denen 7 für die wöchentliche Ziehung ausgewählt werden.

Ein erster Versuch, einen Satz Zahlen zu ziehen, könnte so aussehen:

```python
from random import randint

for i in range(7):
    print(randint(1, 40))
```

Dies würde jedoch auf lange Sicht nicht funktionieren, da dieselbe Zahl in einer wöchentlichen Ziehung von sieben Zahlen zweimal vorkommen kann. Wir brauchen einen Weg, um sicherzustellen, dass die gezogenen Zahlen alle eindeutig sind.

Eine Möglichkeit besteht darin, die gezogenen Zahlen in einer Liste zu speichern und eine Zahl nur dann hinzuzufügen, wenn sie noch nicht in der Liste enthalten ist. Dies kann wiederholt werden, bis die Länge der Liste sieben beträgt:

```python
from random import randint

weekly_draw = []
while len(weekly_draw) < 7:
    new_rnd = randint(1, 40)
    if new_rnd not in weekly_draw:
        weekly_draw.append(new_rnd)

print(weekly_draw)
```

Ein kompakterer Ansatz wäre die Verwendung der `shuffle`-Funktion:

```python
from random import shuffle

number_pool = list(range(1, 41))
shuffle(number_pool)
weekly_draw = number_pool[0:7]
print(weekly_draw)
```

Hier ist die Idee, dass wir zuerst eine Liste mit den verfügbaren Zahlen 1 bis 40 erstellen, ähnlich wie die Kugeln in einer Lottomaschine. Der Pool der Zahlen wird dann gemischt und die ersten sieben Zahlen für die wöchentliche Ziehung ausgewählt. Das erspart uns das Schreiben einer Schleife.

Tatsächlich enthält das `random`-Modul einen noch einfacheren Weg, um Lottozahlen auszuwählen: die Funktion [sample](https://docs.python.org/3/library/random.html?highlight=random#random.sample). Sie gibt eine Zufallsauswahl einer bestimmten Größe aus einer gegebenen Datenstruktur zurück:

```python
from random import sample

number_pool = list(range(1, 41))
weekly_draw = sample(number_pool, 7)
print(weekly_draw)
```

<programming-exercise name='Lottozahlen' tmcname='part07-04_lottery_numbers'>

Bitte schreiben Sie eine Funktion namens `lottery_numbers(amount: int, lower: int, upper: int)`, die so viele Zufallszahlen generiert, wie durch das erste Argument angegeben. Alle Zahlen sollen innerhalb der Grenzen von `lower` bis `upper` liegen. Die Zahlen sollen in einer Liste gespeichert und zurückgegeben werden. Die Zahlen in der zurückgegebenen Liste sollen aufsteigend sortiert sein.

Da es sich um Lottozahlen handelt, darf keine Zahl doppelt in der Liste vorkommen.

Ein Beispiel für die Funktionsweise:

```python
for number in lottery_numbers(7, 1, 40):
    print(number)
```

<sample-output>

4
7
11
16
22
29
38

</sample-output>

</programming-exercise>

## Woher kommen diese Zufallszahlen?

Die Funktionen des Moduls [random](https://docs.python.org/3/library/random.html) basieren auf einem Algorithmus, der Zufallszahlen basierend auf einem bestimmten Initialisierungswert und einigen arithmetischen Operationen erzeugt. Der Initialisierungswert wird oft als _Seed-Wert_ bezeichnet.

Der Seed-Wert kann vom Benutzer mit der Funktion [seed](https://docs.python.org/3/library/random.html?highlight=random#random.seed) bereitgestellt werden:

```python
from random import randint, seed

seed(1337)
# dies wird immer dieselbe "Zufallszahl" erzeugen
print(randint(1, 100))
```

Wenn wir Funktionen haben, die auf Randomisierung basieren, und wir einen Seed-Wert setzen, wird die Funktion bei jeder Ausführung das gleiche Ergebnis liefern. Das Ergebnis kann bei verschiedenen Python-Versionen unterschiedlich sein, aber im Wesentlichen geht der Zufall durch das Setzen eines Seed-Werts verloren. Dies kann beispielsweise beim Testen eines Programms eine nützliche Funktion sein.

<text-box variant="info" name="Echter Zufall">

Genau genommen sind die vom `random`-Modul bereitgestellten Zahlen nicht wirklich zufällig. Stattdessen sind sie _pseudozufällig_. Computer sind im Wesentlichen deterministische Maschinen. In einer idealen Situation sollte es möglich sein, ihre Funktionsweise bis auf das letzte Bit vorherzusagen. Daher ist es sehr schwierig, mit einem Computer wirklich zufällige Zahlen zu erzeugen. Für viele Anwendungen sind pseudozufällige Zahlen jedoch gut genug. Wenn echte Zufallszahlen benötigt werden, wird der Seed-Wert normalerweise von einer Quelle außerhalb des Computers generiert, zum Beispiel durch Hintergrundstrahlung, Rauschpegel oder [Lavalampen](https://blog.cloudflare.com/randomness-101-lavarand-in-production/).

Weitere Informationen über Zufall finden Sie auf <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>

<programming-exercise name='Passwortgenerator, Teil 1' tmcname='part07-05_password_generator_part_1'>

Bitte schreiben Sie eine Funktion, die Passwörter einer gewünschten Länge erstellt, bestehend aus Kleinbuchstaben von a bis z.

Ein Beispiel für die Funktionsweise:

```python
for i in range(10):
    print(generate_password(8))
```

<sample-output>

lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib

</sample-output>

</programming-exercise>

<programming-exercise name='Passwortgenerator, Teil 2' tmcname='part07-06_password_generator_part_2'>

Bitte schreiben Sie eine verbesserte Version Ihres Passwortgenerators. Die Funktion nimmt nun drei Argumente entgegen:

* Wenn das zweite Argument `True` ist, soll das generierte Passwort auch eine oder mehrere Zahlen enthalten.
* Wenn das dritte Argument `True` ist, soll das generierte Passwort auch eines oder mehrere dieser Sonderzeichen enthalten: `!?=+-()#`.

Trotz dieser zwei zusätzlichen Argumente muss das Passwort immer mindestens einen Kleinbuchstaben enthalten. Sie können davon ausgehen, dass die Funktion nur mit Kombinationen von Argumenten aufgerufen wird, die es ermöglichen, Passwörter gemäß dieser Regeln zu formulieren. Das heißt, die Argumente werden z.B. kein Passwort der Länge 2 spezifizieren, das sowohl eine Zahl als auch ein Sonderzeichen enthält, da dann kein Platz für den obligatorischen Kleinbuchstaben wäre.

Ein Beispiel für die Funktionsweise:

```python
for i in range(10):
    print(generate_strong_password(8, True, True))
```

<sample-output>

2?0n+u31
u=m4nl94
n#=i6r#(
da9?zvm?
7h)!)g?!
a=59x2n5
(jr6n3b5
9n(4i+2!
32+qba#=
n?b0a7ey

</sample-output>

</programming-exercise>

<programming-exercise name='Würfelroller' tmcname='part07-07_dice_roller'>

In dieser Übung schreiben Sie einige Funktionen, die in Spielen mit Würfeln verwendet werden können.

Anstelle von normalen Würfeln spezifiziert diese Übung _nicht-transitive Würfel_. Sie können darüber [hier](https://singingbanana.com/dice/article.htm) nachlesen oder [dieses Video ansehen](https://www.youtube.com/watch?v=LrIp6CKUlH8).

Sie werden drei Würfel verwenden:

- Würfel A hat die Seiten 3, 3, 3, 3, 3, 6
- Würfel B hat die Seiten 2, 2, 2, 5, 5, 5
- Würfel C hat die Seiten 1, 4, 4, 4, 4, 4

Bitte schreiben Sie eine Funktion namens `roll(die: str)`, die den durch das Argument spezifizierten Würfel rollt. Ein Beispiel für die Funktionsweise:

```python
for i in range(20):
    print(roll("A"), " ", end="")
print()
for i in range(20):
    print(roll("B"), " ", end="")
print()
for i in range(20):
    print(roll("C"), " ", end="")
```

<sample-output>

3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  6  3  6  3
2  2  5  2  2  5  5  2  2  5  2  5  5  5  2  5  2  2  2  2
4  4  4  4  4  1  1  4  4  4  1  4  4  4  4  4  4  4  4  4

</sample-output>

Schreiben Sie außerdem eine Funktion namens `play(die1: str, die2: str, times: int)`, die beide Würfel so oft wirft, wie durch das dritte Argument angegeben. Die Funktion soll ein Tuple zurückgeben. Das erste Element soll die Anzahl der Siege von Würfel 1 sein, das zweite die Anzahl der Siege von Würfel 2 und das dritte Element die Anzahl der Unentschieden.

```python
result = play("A", "C", 1000)
print(result)
result = play("B", "B", 1000)
print(result)
```

<sample-output>

(292, 708, 0)
(249, 273, 478)

</sample-output>

</programming-exercise>

<programming-exercise name='Zufällige Wörter' tmcname='part07-08_random_words'>

Die Übungsvorlage enthält die Datei `words.txt`, die einige englische Wörter enthält, eines pro Zeile.

Bitte schreiben Sie eine Funktion namens `words(n: int, beginning: str)`, die eine Liste mit `n` Zufallswörtern aus der Datei `words.txt` zurückgibt. Alle Wörter müssen mit der durch das zweite Argument angegebenen Zeichenkette beginnen. 

Dasselbe Wort darf nicht zweimal in der Liste vorkommen. Wenn nicht genügend Wörter vorhanden sind, die mit der angegebenen Zeichenkette beginnen, soll die Funktion eine `ValueError`-Ausnahme auslösen.

Ein Beispiel für die Funktion in Aktion:

```python
word_list = words(3, "ca")
for word in word_list:
    print(word)
```

<sample-output>

cat
car
carbon

</sample-output>

</programming-exercise>
