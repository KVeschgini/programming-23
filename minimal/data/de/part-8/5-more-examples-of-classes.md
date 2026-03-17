---
path: '/part-8/5-more-examples-of-classes'
title: 'Weitere Beispiele für Klassen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Sind Sie in der Lage, vielseitigere Klassen zu erstellen
- Wissen Sie, wie Sie eine `__str__`-Methode zu Ihren Klassendefinitionen hinzufügen

</text-box>


## Beispiel 1: Die Klasse Rectangle

Schauen wir uns eine Klasse an, die ein Rechteck im zweidimensionalen Raum modelliert:

```python
class Rectangle:
    def __init__(self, left_upper: tuple, right_lower: tuple):
        self.left_upper = left_upper
        self.right_lower = right_lower
        self.width = right_lower[0] - left_upper[0]
        self.height = right_lower[1] - left_upper[1]

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return self.width * 2 + self.height * 2

    def move(self, x_change: int, y_change: int):
        corner = self.left_upper
        self.left_upper = (corner[0] + x_change, corner[1] + y_change)
        corner = self.right_lower
        self.right_lower = (corner[0] + x_change, corner[1] + y_change)
```

Ein neues `Rectangle` wird mit zwei Tupeln als Argumenten erstellt. Diese Tupel enthalten die x- und y-Koordinaten der oberen linken Ecke und der unteren rechten Ecke. Der Konstruktor berechnet basierend auf diesen Werten die Höhe und Breite des Rechtecks.

Die Methoden `area` und `perimeter` berechnen die Fläche und den Umfang des Rechtecks basierend auf Höhe und Breite. Die Methode `move` verschiebt das Rechteck um die als Argumente angegebenen x- und y-Werte.

Das Rechteck wird in einem Koordinatensystem dargestellt, in dem die x-Koordinaten von links nach rechts zunehmen und die y-Koordinaten von oben nach unten zunehmen. Dies ist eine gängige Art der Handhabung von Koordinaten in der Programmierung, da es oft einfacher und natürlicher ist, die obere linke Ecke des Computerbildschirms als den Punkt zu betrachten, an dem x und y gleich Null sind.

Das folgende Programm testet die Klasse `Rectangle`:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle.left_upper)
print(rectangle.right_lower)
print(rectangle.width)
print(rectangle.height)
print(rectangle.perimeter())
print(rectangle.area())

rectangle.move(3, 3)
print(rectangle.left_upper)
print(rectangle.right_lower)
```

<sample-output>

(1, 1)
(4, 3)
3
2
10
6
(4, 4)
(7, 6)

</sample-output>

## Ein Objekt ausgeben

Wenn Sie ein Objekt haben, das aus einer von Ihnen selbst definierten Klasse erstellt wurde, ist die Standardreaktion beim Aufruf des `print`-Befehls mit diesem Objekt als Argument nicht sehr informativ:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle)
```

Die Ausgabe sollte in etwa so aussehen:

<sample-output>

<__main__.Rectangle object at 0x000002D7BF148A90>

</sample-output>

Offensichtlich möchten wir mehr Kontrolle darüber haben, was ausgegeben wird. Der einfachste Weg dazu ist, der Klassendefinition eine spezielle `__str__`-Methode hinzuzufügen. Ihr Zweck ist es, eine Momentaufnahme des Zustands des Objekts im String-Format zurückzugeben. Wenn die Klassendefinition eine `__str__`-Methode enthält, ist der von der Methode zurückgegebene Wert derjenige, der ausgegeben wird, wenn der `print`-Befehl ausgeführt wird.

Fügen wir also unserer Klasse `Rectangle` eine `__str__`-Methodendefinition hinzu:

```python
class Rectangle:

    # ...der Rest der Klasse bleibt wie oben...

    # Diese Methode gibt den Zustand des Objekts im String-Format zurück
    def __str__(self):
        return f"rectangle {self.left_upper} ... {self.right_lower}"
```

Nun erzeugt der `print`-Befehl etwas Benutzerfreundlicheres:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle)
```

<sample-output>

rectangle (1, 1) ... (4, 3)

</sample-output>

Die `__str__`-Methode wird vielleicht noch häufiger verwendet, um mit der `str`-Funktion eine String-Repräsentation des Objekts zu formulieren, wie im folgenden Programm zu sehen ist:

```python
rectangle = Rectangle((1, 1), (4, 3))
str_rep = str(rectangle)
print(str_rep)
```

<sample-output>

rectangle (1, 1) ... (4, 3)

</sample-output>

Es gibt noch viele weitere spezielle Methoden mit Unterstrichen, die für Klassen definiert werden können. Eine, die der `__str__`-Methode recht ähnlich ist, ist die `__repr__`-Methode. Ihr Zweck ist es, eine technische Darstellung des Zustands des Objekts zu liefern. Wir werden dieser Methode später begegnen.

<programming-exercise name='Stoppuhr' tmcname='part08-13_stopwatch'>

Die Aufgabenvorlage enthält das folgende Gerüst für die Klasse `Stopwatch`:

```python
class Stopwatch:
    def __init__(self):
        self.seconds = 0
        self.minutes = 0
```

Bitte ergänzen Sie die Klassendefinition so, dass sie wie folgt funktioniert:

```python
watch = Stopwatch()
for i in range(3600):
    print(watch)
    watch.tick()
```

<sample-output>

00:00
00:01
00:02
... viele weitere Zeilen ausgegeben
00:59
01:00
01:01
... viele, viele weitere Zeilen ausgegeben
59:58
59:59
00:00
00:01

</sample-output>

Die Methode `tick` fügt der Stoppuhr eine Sekunde hinzu. Der Maximalwert für sowohl Sekunden als auch Minuten ist 59. Ihre Klassendefinition sollte auch eine `__str__`-Methode enthalten, die eine String-Repräsentation des Zustands der Stoppuhr zurückgibt, wie im obigen Beispiel gezeigt.

**Hinweis:** Es könnte das Testen der `tick`-Methode erleichtern, wenn Sie die Initialwerte der Sekunden und Minuten im Konstruktor vorübergehend auf einen Wert näher bei 59 setzen. Wenn Sie die Initialwerte ändern, denken Sie daran, sie vor dem Einreichen wieder zurückzusetzen.

</programming-exercise>

<programming-exercise name='Uhr' tmcname='part08-14_clock'>

Bitte definieren Sie eine neue Klasse namens `Clock`, welche die Fähigkeiten Ihrer `Stopwatch`-Klasse erweitert. Sie sollte wie folgt funktionieren:

```python
clock = Clock(23, 59, 55)
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)

clock.set(12, 5)
print(clock)
```

<sample-output>
23:59:55
23:59:56
23:59:57
23:59:58
23:59:59
00:00:00
00:00:01
12:05:00
</sample-output>

Wie Sie oben sehen können, sollte der Konstruktor Initialwerte für Stunden, Minuten und Sekunden als Argumente entgegennehmen und diese entsprechend setzen. Die Methode `tick` fügt der Uhr eine Sekunde hinzu. Die Methode `set` setzt neue Werte für Stunden und Minuten und _setzt die Sekunden auf Null_.

</programming-exercise>

<programming-exercise name='LunchCard' tmcname='part08-15_lunchcard'>

Im Unicafe, der studentischen Mensa der Universität Helsinki, können Studierende ihr Mittagessen mit einer speziellen Debitkarte bezahlen.

In dieser Aufgabe schreiben Sie eine Klasse namens `LunchCard` mit dem Ziel, die Funktionen der Debitkarte der Mensa nachzubilden.

### Die Struktur der neuen Klasse

Bitte erstellen Sie eine neue Klasse namens `LunchCard`.

Schreiben Sie zuerst den Konstruktor für die Klasse. Er sollte das auf der Karte verfügbare Anfangsguthaben als Argument entgegennehmen und als Attribut speichern. Dies ist im untenstehenden Gerüst bereits für Sie vorbereitet.

Schreiben Sie als Nächstes eine `__str__`-Methode, die einen String mit dem Guthaben zurückgibt: "The balance is X euros". Das verfügbare Guthaben sollte mit einer Nachkommastelle Genauigkeit ausgegeben werden. Bitte sehen Sie sich das folgende Beispiel für die Verwendung an.

Hier ist eine Gerüst-Implementierung für die Klasse:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def __str__(self):
        pass
```

Ein Anwendungsbeispiel:

```python
card = LunchCard(50)
print(card)
```

Die Ausführung des Obigen sollte die folgende Ausgabe erzeugen:

<sample-output>

The balance is 50.0 euros

</sample-output>

### Für das Mittagessen bezahlen

Bitte implementieren Sie die folgenden Methoden in Ihrer `LunchCard`-Klasse:

- `eat_lunch` zieht 2,60 Euro vom Guthaben auf der Karte ab
- `eat_special` zieht 4,60 Euro vom Guthaben auf der Karte ab

Sie können die folgende Hauptfunktion verwenden, um Ihre Klasse zu testen:

```python
card = LunchCard(50)
print(card)

card.eat_lunch()
print(card)

card.eat_special()
card.eat_lunch()
print(card)
```

Dies sollte die folgende Ausgabe erzeugen:

<sample-output>

The balance is 50.0 euros
The balance is 47.4 euros
The balance is 40.2 euros

</sample-output>

Stellen Sie sicher, dass das Guthaben niemals Werte unter Null erreichen kann:

```python
card = LunchCard(4)
print(card)

card.eat_lunch()
print(card)

card.eat_lunch()
print(card)
```

<sample-output>

The balance is 4.0 euros
The balance is 1.4 euros
The balance is 1.4 euros

</sample-output>

Wenn nicht genügend Geld auf der Karte ist, um das Mittagessen zu bezahlen, sollte der Preis des Mittagessens nicht vom Guthaben abgezogen werden.

### Geld auf die Karte einzahlen

Implementieren Sie die Methode `deposit_money` in Ihrer `LunchCard`-Klasse.

Die Methode erhöht das Guthaben auf der Karte um den als Argument angegebenen Betrag.

```python
card = LunchCard(10)
print(card)
card.deposit_money(15)
print(card)
card.deposit_money(10)
print(card)
card.deposit_money(200)
print(card)
```

<sample-output>

The balance is 10.0 euros
The balance is 25.0 euros
The balance is 35.0 euros
The balance is 235.0 euros

</sample-output>

Die Methode sollte Argumente unter Null berücksichtigen, indem sie eine [Ausnahme auslöst](/part-6/3-errors#raising-exceptions) vom Typ `ValueError`:

```python
card = LunchCard(10)
card.deposit_money(-10)
```

<sample-output>

File "testi.py", line 3, in lunchcard
ValueError: You cannot deposit an amount of money less than zero

</sample-output>

**Hinweis:** Diese Methode sollte eine Ausnahme _auslösen_. Bitte beachten Sie die Anweisungen zum Auslösen von Ausnahmen in [Teil 6](/part-6/3-errors#raising-exceptions). Unter keinen Umständen sollte die Methode selbst etwas ausgeben – das obige Beispiel ist eine Ausgabe des Python-Interpreters, der auf die Ausnahme stößt.

### Mehrere Karten

Bitte schreiben Sie eine Hauptfunktion, die die folgende Abfolge von Ereignissen enthält:

- Erstellen Sie eine Lunch-Karte für Peter. Das Anfangsguthaben auf der Karte beträgt 20 Euro.
- Erstellen Sie eine Lunch-Karte für Grace. Das Anfangsguthaben auf der Karte beträgt 30 Euro.
- Peter isst ein Special.
- Grace isst ein normales Mittagessen.
- _Geben Sie das Guthaben auf jeder Karte aus (in separaten Zeilen, mit dem Namen des Besitzers am Anfang der Zeile)_
- Peter zahlt 20 Euro ein.
- Grace isst das Special.
- _Geben Sie das Guthaben auf jeder Karte aus (in separaten Zeilen, mit dem Namen des Besitzers am Anfang der Zeile)_
- Peter isst ein normales Mittagessen.
- Peter isst ein normales Mittagessen.
- Grace zahlt 50 Euro ein.
- _Geben Sie das Guthaben auf jeder Karte aus (in separaten Zeilen, mit dem Namen des Besitzers am Anfang der Zeile)_

Körper des Hauptprogramms:

```python
peters_card = LunchCard(20)
graces_card = LunchCard(30)
# der Rest Ihrer Hauptfunktion
```

Ihre Hauptfunktion sollte exakt Folgendes ausgeben:

<sample-output>

Peter: The balance is 15.4 euros
Grace: The balance is 27.4 euros
Peter: The balance is 35.4 euros
Grace: The balance is 22.8 euros
Peter: The balance is 30.2 euros
Grace: The balance is 72.8 euros

</sample-output>

</programming-exercise>

## Beispiel 2: Aufgabenliste

Die folgende Klasse `TaskList` modelliert eine Liste von Aufgaben:

```python
class TaskList:
    def __init__(self):
        self.tasks = []

    def add_task(self, name: str, priority: int):
        self.tasks.append((priority, name))

    def get_next(self):
        self.tasks.sort()
        # Die Listenmethode pop entfernt das letzte Element einer Liste und gibt es zurück
        task = self.tasks.pop()
        # Den Namen der Aufgabe zurückgeben (das zweite Element im Tupel)
        return task[1]

    def number_of_tasks(self):
        return len(self.tasks)

    def clear_tasks(self):
        self.tasks = []
```

Die Methode `add_task` fügt der Liste eine neue Aufgabe hinzu. Jede Aufgabe hat zudem eine Priorität, die zum Sortieren der Aufgaben verwendet wird. Die Methode `get_next` entfernt die Aufgabe mit der höchsten Priorität aus der Liste und gibt sie zurück. Es gibt auch die Methode `number_of_tasks`, die die Anzahl der Aufgaben in der Liste zurückgibt, und schließlich die Methode `clear_tasks`, welche die Aufgabenliste leert.

Innerhalb des Objekts werden die Aufgaben in einer Liste gespeichert. Jede Aufgabe besteht aus einem Tupel, das die Priorität der Aufgabe und ihren Namen enthält. Der Prioritätswert wird zuerst gespeichert, sodass beim Sortieren der Liste die Aufgabe mit der höchsten Priorität das letzte Element in der Liste ist. Aus diesem Grund können wir dann einfach die Methode `pop` verwenden, um das Element mit der höchsten Priorität abzurufen und zu entfernen.

Bitte schauen Sie sich das folgende Programm mit der Aufgabenliste in Aktion an:

```python
tasks = TaskList()
tasks.add_task("studying", 50)
tasks.add_task("exercise", 60)
tasks.add_task("cleaning", 10)
print(tasks.number_of_tasks())
print(tasks.get_next())
print(tasks.number_of_tasks())
tasks.add_task("date", 100)
print(tasks.number_of_tasks())
print(tasks.get_next())
print(tasks.get_next())
print(tasks.number_of_tasks())
tasks.clear_tasks()
print(tasks.number_of_tasks())
```

<sample-output>

3
exercise
2
3
date
studying
1
0

</sample-output>

<programming-exercise name='Serien' tmcname='part08-16_series'>

### Eine Klasse namens Series

Bitte schreiben Sie eine Klasse namens `Series` mit der folgenden Funktionalität:

```python
dexter = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
print(dexter)
```

<sample-output>

Dexter (8 seasons)
genres: Crime, Drama, Mystery, Thriller
no ratings

</sample-output>

Der Konstruktor sollte den Titel, die Anzahl der Staffeln und eine Liste der Genres für die Serie als Argumente entgegennehmen.

**Hinweis:** Wann immer Sie einen String aus einer Liste mit Strings erzeugen müssen, mit einem Trennzeichen Ihrer Wahl zwischen den Einträgen, können Sie die Methode `join` wie folgt verwenden:

```python
genre_list = ["Crime", "Drama", "Mystery", "Thriller"]
genre_string = ", ".join(genre_list)
print(genre_string)
```

<sample-output>

Crime, Drama, Mystery, Thriller

</sample-output>

### Bewertungen hinzufügen

Bitte implementieren Sie die Methode `rate(rating: int)`, mit der Sie jedem Serien-Objekt eine Bewertung zwischen 0 und 5 hinzufügen können. Sie müssen auch die `__str__`-Methode so anpassen, dass im Falle von vorhandenen Bewertungen die Anzahl der hinzugefügten Bewertungen und deren auf eine Dezimalstelle gerundeter Durchschnitt ausgegeben werden.

```python
dexter = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
dexter.rate(4)
dexter.rate(5)
dexter.rate(5)
dexter.rate(3)
dexter.rate(0)
print(dexter)
```

<sample-output>

Dexter (8 seasons)
genres: Crime, Drama, Mystery, Thriller
5 ratings, average 3.4 points

</sample-output>

### Suche nach Serien

Bitte implementieren Sie diese zwei Funktionen, mit denen Sie eine Liste von Serien durchsuchen können: `minimum_grade(rating: float, series_list: list)` und `includes_genre(genre: str, series_list: list)`.

Hier ist ein Beispiel für die Verwendung der neuen Methoden:

```python
s1 = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
s1.rate(5)

s2 = Series("South Park", 24, ["Animation", "Comedy"])
s2.rate(3)

s3 = Series("Friends", 10, ["Romance", "Comedy"])
s3.rate(2)

series_list = [s1, s2, s3]

print("a minimum grade of 4.5:")
for series in minimum_grade(4.5, series_list):
    print(series.title)

print("genre Comedy:")
for series in includes_genre("Comedy", series_list):
    print(series.title)
```

<sample-output>

a minimum rating of 4.5:
Dexter
genre Comedy:
South Park
Friends

</sample-output>

Der obige Code und die automatischen Tests für diese Aufgabe gehen davon aus, dass Ihre Klasse ein Attribut `title` enthält. Wenn Sie einen anderen Attributnamen verwendet haben, um auf den Namen der Serie zu verweisen, ändern Sie diesen bitte vor dem Einreichen.

</programming-exercise>
