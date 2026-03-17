---
path: '/part-9/1-objects-and-references'
title: 'Objekte und Referenzen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Sind Sie in der Lage, verschiedene Datenstrukturen zur Handhabung von Objekten zu verwenden
- Wissen Sie, wie Objekte als Argumente übergeben werden können

</text-box>

Jeder Wert in Python ist ein Objekt. Jedes Objekt, das Sie auf Basis einer selbst definierten Klasse erstellen, funktioniert genau wie jedes "normale" Python-Objekt. Beispielsweise können Objekte in einer Liste gespeichert werden:

```python
from datetime import date

class CompletedCourse:

    def __init__(self, course_name: str, credits: int, completion_date: date):
        self.name = course_name
        self.credits = credits
        self.completion_date = completion_date


if __name__ == "__main__":
    # Hier erstellen wir einige abgeschlossene Kurse und fügen diese einer Liste hinzu
    completed = []

    maths1 = CompletedCourse("Mathematics 1", 5, date(2020, 3, 11))
    prog1 = CompletedCourse("Programming 1", 6, date(2019, 12, 17))

    completed.append(maths1)
    completed.append(prog1)

    # Fügen wir noch ein paar direkt zur Liste hinzu
    completed.append(CompletedCourse("Physics 2", 4, date(2019, 11, 10)))
    completed.append(CompletedCourse("Programming 2", 5, date(2020, 5, 19)))

    # Alle abgeschlossenen Kurse durchgehen, ihre Namen ausgeben
    # und die erhaltenen Leistungspunkte summieren
    credits = 0
    for course in completed:
        print(course.name)
        credits += course.credits

    print("Gesamtzahl der erhaltenen Leistungspunkte:", credits)
```

<sample-output>

Mathematics 1
Programming 1
Physics 2
Programming 2
Gesamtzahl der erhaltenen Leistungspunkte: 20

</sample-output>

<programming-exercise name='Das schnellste Auto' tmcname='part09-01_fastest_car'>

Die Aufgabenvorlage enthält eine Klasse namens `Car`, die die Merkmale eines Autos durch zwei Attribute repräsentiert: `make (str)` und `top_speed (int)`.

Bitte schreiben Sie eine Funktion namens `fastest_car(cars: list)`, die eine Liste von `Car`-Objekten als Argument entgegennimmt.

Die Funktion sollte die Marke (make) des schnellsten Autos zurückgeben. Sie können davon ausgehen, dass es immer ein einzelnes Auto mit der höchsten Höchstgeschwindigkeit gibt. Ändern Sie die als Argument übergebene Liste nicht und nehmen Sie keine Änderungen an der Klassendefinition von `Car` vor.

Sie können den folgenden Code verwenden, um Ihre Funktion zu testen:

```python
if __name__ == "__main__":
    car1 = Car("Saab", 195)
    car2 = Car("Lada", 110)
    car3 = Car("Ferrari", 280)
    car4 = Car("Trabant", 85)

    cars = [car1, car2, car3, car4]
    print(fastest_car(cars))
```

<sample-output>

Ferrari

</sample-output>

</programming-exercise>

<programming-exercise name='Bestandene Einsendungen' tmcname='part09-02_passing_submissions'>

Die Aufgabenvorlage enthält eine Klasse namens `ExamSubmission`, die, wie der Name schon sagt, die Einsendung eines Prüflings in einer Prüfung modelliert. Die Klasse hat zwei definierte Attribute: `examinee (str)` und `points (int)`.

Bitte schreiben Sie eine Funktion namens `passed(submissions: list, lowest_passing: int)`, die eine Liste von Prüfungseinsendungen und eine Ganzzahl, die die niedrigste zum Bestehen erforderliche Punktzahl darstellt, als Argumente entgegennimmt.

Die Funktion sollte eine neue Liste erstellen und zurückgeben, die nur die bestandenen Einsendungen aus der ursprünglichen Liste enthält. Bitte ändern Sie die als Argument übergebene Liste nicht und nehmen Sie keine Änderungen an der Klassendefinition von `ExamSubmission` vor.

Sie können den folgenden Code verwenden, um Ihre Funktion zu testen:

```python
if __name__ == "__main__":
    s1 = ExamSubmission("Peter", 12)
    s2 = ExamSubmission("Pippa", 19)
    s3 = ExamSubmission("Paul", 15)
    s4 = ExamSubmission("Phoebe", 9)
    s5 = ExamSubmission("Persephone", 17)

    passes = passed([s1, s2, s3, s4, s5], 15)
    for passing in passes:
        print(passing)
```

<sample-output>

ExamSubmission (examinee: Pippa, points: 19)
ExamSubmission (examinee: Paul, points: 15)
ExamSubmission (examinee: Persephone, points: 17)

</sample-output>

</programming-exercise>

Sie erinnern sich vielleicht, dass Listen selbst keine Objekte enthalten. Sie enthalten _Referenzen auf Objekte_. Dasselbe Objekt kann mehrfach in einer einzigen Liste erscheinen, und es kann mehrfach innerhalb der Liste oder außerhalb davon referenziert werden. Schauen wir uns ein Beispiel an:

```python
class Product:
    def __init__(self, name: str, unit: str):
        self.name = name
        self.unit = unit


if __name__ == "__main__":
    shopping_list = []
    milk = Product("Milch", "Liter")

    shopping_list.append(milk)
    shopping_list.append(milk)
    shopping_list.append(Product("Gurke", "Stück"))
```

<img src="9_1_1.png">

Wenn es mehr als eine Referenz auf dasselbe Objekt gibt, macht es keinen Unterschied, welche der Referenzen verwendet wird:

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

dogs = []
fluffy = Dog("Fluffy")
dogs.append(fluffy)
dogs.append(fluffy)
dogs.append(Dog("Fluffy"))

print("Hunde zu Beginn:")
for dog in dogs:
    print(dog)

print("Der Hund an Index 0 wird umbenannt:")
dogs[0].name = "Pooch"
for dog in dogs:
    print(dog)

print("Der Hund an Index 2 wird umbenannt:")
dogs[2].name = "Fifi"
for dog in dogs:
    print(dog)
```

<sample-output>

Hunde zu Beginn:
Fluffy
Fluffy
Fluffy
Der Hund an Index 0 wird umbenannt:
Pooch
Pooch
Fluffy
Der Hund an Index 2 wird umbenannt:
Pooch
Pooch
Fifi

</sample-output>

Die Referenzen an den Indizes 0 und 1 in der Liste beziehen sich auf dasselbe Objekt. Jede der Referenzen kann verwendet werden, um auf das Objekt zuzugreifen. Die Referenz an Index 2 bezieht sich auf ein anderes Objekt, wenn auch mit scheinbar gleichem Inhalt. Eine Änderung des Inhalts dieses letzteren Objekts hat keine Auswirkungen auf das andere.

Der Operator `is` wird verwendet, um zu prüfen, ob sich zwei Referenzen auf exakt dasselbe Objekt beziehen, während der Operator `==` Ihnen sagt, ob der Inhalt der Objekte gleich ist. Das folgende Beispiel macht den Unterschied hoffentlich deutlich:

```python
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 is list2)
print(list1 is list3)
print(list2 is list3)

print()

print(list1 == list2)
print(list1 == list3)
print(list2 == list3)
```

<sample-output>

False
True
False

True
True
True

</sample-output>

Jedes Python-Objekt kann auch in einem Dictionary oder einer anderen Datenstruktur gespeichert werden. Dies gilt auch für Objekte, die auf Basis einer selbst definierten Klasse erstellt wurden.

```python
class Student:
    def __init__(self, name: str, cr: int):
        self.name = name
        self.cr = cr

if __name__ == "__main__":
    # Der Schlüssel in diesem Dictionary ist die Matrikelnummer,
    # und der Wert ist ein Objekt vom Typ Student
    students = {}
    students["12345"] = Student("Saul Student", 10)
    students["54321"] = Student("Sally Student", 67)
```

Das [Visualisierungstool](http://www.pythontutor.com/visualize.html#mode=edit) kann dabei helfen, das obige Beispiel besser zu verstehen:

<img src="9_1_2.png">


## Self oder kein Self?

Bisher haben wir die Verwendung des Parameternamens `self` nur oberflächlich gestreift. Schauen wir uns genauer an, wann er verwendet werden sollte und wann nicht.

Unten haben wir eine einfache Klasse, mit der wir ein Vokabel-Objekt erstellen können, das einige Wörter enthält:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    def add_word(self, word: str):
        if not word in self.words:
            self.words.append(word)

    def print_vocabulary(self):
        for word in sorted(self.words):
            print(word)

vocab = Vocabulary()
vocab.add_word("python")
vocab.add_word("object")
vocab.add_word("object-oriented programming")
vocab.add_word("object")
vocab.add_word("nerd")

vocab.print_vocabulary()
```

<sample-output>

nerd
object
object-oriented programming
python

</sample-output>

Die Liste der Wörter wird in einem Attribut namens `self.words` gespeichert. In diesem Fall ist der Parametername `self` sowohl in der Konstruktormethode der Klasse als auch in jeder anderen Methode, die auf diese Variable zugreift, obligatorisch. Wenn `self` weggelassen wird, greifen die verschiedenen Methoden nicht auf dieselbe Wortliste zu.

Fügen wir unserer Klassendefinition eine neue Methode hinzu. Die Methode `longest_word(self)` gibt (eines der) längsten Wörter im Vokabular zurück.

Im Folgenden wird eine Möglichkeit gezeigt, diese Aufgabe zu lösen, aber wir werden bald sehen, dass dies kein sehr guter Weg ist:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # Zwei Hilfsvariablen definieren
        self.longest = ""
        self.length_of_longest = 0

        for word in self.words:
            if len(word) > self.length_of_longest:
                self.length_of_longest = len(word)
                self.longest = word

        return self.longest
```

Diese Methode verwendet zwei Hilfsvariablen, die mit dem Parameternamen `self` deklariert werden. Denken Sie daran, dass die Namen von Variablen im funktionalen Sinne keine Rolle spielen, sodass diese Variablen auch verwirrender benannt werden könnten, zum Beispiel `helper` und `helper2`. Der Code beginnt dann etwas kryptisch auszusehen:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # Zwei Hilfsvariablen definieren
        self.helper = ""
        self.helper2 = 0

        for word in self.words:
            if len(word) > self.helper2:
                self.helper2 = len(word)
                self.helper = word

        return self.helper
```

Wenn eine Variable mit dem Parameternamen `self` deklariert wird, wird sie zu einem Attribut des Objekts. Das bedeutet, dass die Variable so lange existiert, wie das Objekt existiert. Insbesondere existiert die Variable auch nach Abschluss der Ausführung der Methode, die sie deklariert hat, weiter. Im obigen Beispiel ist dies völlig unnötig, da die Hilfsvariablen nur innerhalb der Methode `longest_word(self)` verwendet werden sollen. Daher ist es hier keine gute Idee, Hilfsvariablen mit dem Parameternamen `self` zu deklarieren.

Abgesehen davon, dass Variablen über ihr "Verfallsdatum" hinaus existieren, kann die Verwendung von `self` zum Erstellen neuer Attribute, wo sie nicht notwendig sind, schwierige Fehler in Ihrem Code verursachen. Besonders generisch benannte Attribute wie `self.helper`, die dann in verschiedenen Methoden verwendet werden, können zu unerwartetem Verhalten führen, das schwer nachzuvollziehen ist.

Wenn beispielsweise eine Hilfsvariable als Attribut deklariert und im Konstruktor mit einem Initialwert versehen wird, die Variable dann aber in einem nicht zusammenhängenden Kontext in einer anderen Methode verwendet wird, sind die Ergebnisse oft unvorhersehbar:

```python
class Vocabulary:
    def __init__(self):
        self.words = []
        # Hilfsvariablen definieren
        self.helper = ""
        self.helper2 = ""
        self.helper3 = ""
        self.helper4 = ""

    # ...

    def longest_word(self):
        for word in self.words:
            # Oben wurden den Hilfsvariablen alle String-Werte zugewiesen
            # Folgendes wird nicht funktionieren, da der Typ von helper2 falsch ist
            if len(word) > self.helper2:
                self.helper2 = len(word)
                self.helper = word

        return self.helper
```

Sie könnten denken, dass dies gelöst werden könnte, indem man Attribute einfach dort deklariert, wo sie verwendet werden, _außerhalb_ des Konstruktors. Dies führt jedoch zu einer Situation, in der die über ein Objekt zugänglichen Attribute davon abhängen, _welche Methoden ausgeführt wurden_. Im vorherigen Teil haben wir gesehen, dass der Vorteil der Deklaration von Attributen im Konstruktor darin besteht, dass alle Instanzen der Klasse dann exakt dieselben Attribute haben. Wenn dies nicht der Fall ist, kann die Verwendung verschiedener Instanzen der Klasse leicht zu Fehlern führen.

Zusammenfassend lässt sich sagen: Wenn Sie Hilfsvariablen zur Verwendung innerhalb einer einzelnen Methode benötigen, ist der richtige Weg, dies _ohne_ `self` zu tun. Um Ihren Code verständlicher zu machen, verwenden Sie zudem aussagekräftige Variablennamen:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # Der richtige Weg, Hilfsvariablen zur Verwendung
        # innerhalb einer einzelnen Methode zu deklarieren
        longest = ""
        length_of_longest = 0

        for word in self.words:
            if len(word) > length_of_longest:
                length_of_longest = len(word)
                longest = word

        return longest
```

In der obigen Implementierung sind die Hilfsvariablen nur zugänglich, während die Methode ausgeführt wird. Die darin gespeicherten Werte können keine Komplikationen in anderen Teilen des Programms verursachen.

## Objekte als Argumente für Funktionen

Die auf Basis unserer eigenen Klassen erstellten Objekte sind in der Regel veränderlich (mutable). Sie erinnern sich vielleicht, dass beispielsweise Python-Listen veränderlich sind: Wenn sie als Argumente an Funktionen übergeben werden, kann sich ihr Inhalt als Ergebnis der Ausführung ändern.

Schauen wir uns ein einfaches Beispiel an, bei dem eine Funktion eine Referenz auf ein Objekt vom Typ `Student` als Argument erhält. Die Funktion ändert dann den Namen des Studenten. Sowohl die Funktion als auch die aufrufende Hauptfunktion greifen auf dasselbe Objekt zu, sodass die Änderung auch in der Hauptfunktion sichtbar ist.

```python
class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number

    def __str__(self):
        return f"{self.name} ({self.student_number})"

# Der Typ-Hinweis hier verwendet den Namen der oben definierten Klasse
def change_name(student: Student):
    student.name = "Saul Student"

# Ein Student-Objekt erstellen
steve = Student("Steve Student", "12345")

print(steve)
change_name(steve)
print(steve)
```

<sample-output>

Steve Student (12345)
Saul Student (12345)

</sample-output>

Es ist auch möglich, Objekte innerhalb von Funktionen zu erstellen. Wenn eine Funktion eine Referenz auf das neu erstellte Objekt zurückgibt, ist dieses auch innerhalb der Hauptfunktion zugänglich:

```python
from random import randint, choice

class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number

    def __str__(self):
        return f"{self.name} ({self.student_number})"

# Diese Funktion erstellt ein neues Student-Objekt und gibt es zurück.
# Sie wählt zufällig Werte für den Namen und die Matrikelnummer aus.
def new_student():
    first_names = ["Mark", "Mindy", "Mary", "Mike"]
    last_names = ["Javanese", "Rusty", "Scriptor", "Pythons"]

    # Den Namen zufällig bestimmen
    name = choice(first_names) + " " + choice(last_names)

    # Die Matrikelnummer zufällig bestimmen
    student_number = str(randint(10000, 99999))

    # Ein Student-Objekt erstellen und zurückgeben
    return Student(name, student_number)

if __name__ == "__main__":
    # Die Funktion fünfmal aufrufen und die Ergebnisse in einer Liste speichern
    students = []
    for i in range(5):
        students.append(new_student())

    # Die Ergebnisse ausgeben
    for student in students:
        print(student)
```

Die Ausführung des Obigen könnte zu folgender Ausgabe führen (Hinweis: Da Zufall im Spiel ist, werden die Ergebnisse bei Ihnen wahrscheinlich anders aussehen).

<sample-output>

Mary Rusty (78218)
Mindy Rusty (80068)
Mike Pythons (70396)
Mark Javanese (83307)
Mary Pythons (45149)

</sample-output>

## Objekte als Argumente für Methoden

Ebenso können Objekte als Argumente für Methoden dienen. Schauen wir uns ein Beispiel aus einem Freizeitpark an:

```python
class Person:
    def __init__(self, name: str, height: int):
        self.name = name
        self.height = height

class Attraction:
    def __init__(self, name: str, min_height: int):
        self.visitors = 0
        self.name = name
        self.min_height = min_height

    def admit_visitor(self, person: Person):
        if person.height >= self.min_height:
            self.visitors += 1
            print(f"{person.name} durfte mitfahren")
        else:
            print(f"{person.name} war zu klein :(")

    def __str__(self):
        return f"{self.name} ({self.visitors} Besucher)"
```

Die Klasse `Attraction` enthält eine Methode `admit_visitor`, die ein Objekt vom Typ `Person` als Argument entgegennimmt. Wenn der Besucher groß genug ist, wird er eingelassen und die Anzahl der Besucher erhöht. Die Klassen können wie folgt getestet werden:

```python
rollercoaster = Attraction("Achterbahn", 120)
jared = Person("Jared", 172)
alice = Person("Alice", 105)

rollercoaster.admit_visitor(jared)
rollercoaster.admit_visitor(alice)

print(rollercoaster)
```

<sample-output>

Jared durfte mitfahren
Alice war zu klein :(
Achterbahn (1 Besucher)

</sample-output>

<programming-exercise name='Baby-Zentrum' tmcname='part09-03_baby_centre'>

Die Aufgabenvorlage enthält eine Klasse namens `Person` und eine Gerüst-Implementierung für die Klasse `BabyCentre`. Ein `BabyCentre`-Objekt führt verschiedene Aktionen an einem `Person`-Objekt aus. Es kann zum Beispiel die Person wiegen oder füttern. In dieser Aufgabe werden Sie den Rest der Klasse `BabyCentre` implementieren. Bitte ändern Sie die Klassendefinition von `Person` in keiner Weise.

## Personen wiegen

Die Klassendefinition von `BabyCentre` enthält einen Entwurf für die Funktion `weigh`:

```python
class BabyCentre:
    def weigh(self, person: Person):
        # Das Gewicht der als Argument übergebenen Person zurückgeben
        return -1
```

Die Methode nimmt ein `Person`-Objekt als Argument entgegen. Sie sollte das Gewicht der Person zurückgeben. Sie können auf das Gewicht einer Person über das entsprechende Attribut zugreifen, das in der Klasse `Person` definiert ist. Bitte füllen Sie den Rest der Implementierung für die Methode `weigh` aus.

Unten ist ein Beispiel für eine Hauptfunktion, in der ein `BabyCentre` zwei separate `Person`-Objekte wiegt:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} wiegt {baby_centre.weigh(eric)} kg")
print(f"{peter.name} wiegt {baby_centre.weigh(peter)} kg")
```

<sample-output>

Eric wiegt 7 kg
Peter wiegt 85 kg

</sample-output>

## Füttern

Es ist möglich, den Zustand eines als Argument übergebenen Objekts zu ändern. Bitte implementieren Sie die Methode `feed(person: Person)`, die das Gewicht der als Argument übergebenen Person um eins erhöht.

Im folgenden Beispiel werden zwei Personen gewogen, und dann wird eine von ihnen dreimal gefüttert. Danach werden die Personen erneut gewogen:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} wiegt {baby_centre.weigh(eric)} kg")
print(f"{peter.name} wiegt {baby_centre.weigh(peter)} kg")
print()

baby_centre.feed(eric)
baby_centre.feed(eric)
baby_centre.feed(eric)

print(f"{eric.name} wiegt {baby_centre.weigh(eric)} kg")
print(f"{peter.name} wiegt {baby_centre.weigh(peter)} kg")
```

Die Ausgabe sollte zeigen, dass Erics Gewicht um drei gestiegen ist:

<sample-output>

Eric wiegt 7 kg
Peter wiegt 85 kg

Eric wiegt 10 kg
Peter wiegt 85 kg

</sample-output>

## Wägungen zählen

Bitte implementieren Sie die Methode `weigh_ins()`, die die Gesamtzahl der Wägungen zurückgibt, die ein `BabyCentre`-Objekt durchgeführt hat. Hinweis: Sie benötigen ein neues Attribut, um die Anzahl der Wägungen zu verfolgen. Sie können den folgenden Code verwenden, um Ihre Methode zu testen:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"Gesamtzahl der Wägungen: {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Gesamtzahl der Wägungen: {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Gesamtzahl der Wägungen: {baby_centre.weigh_ins()}")
```

<sample-output>

Gesamtzahl der Wägungen: 0
Gesamtzahl der Wägungen: 2
Gesamtzahl der Wägungen: 6

</sample-output>

</programming-exercise>

<programming-exercise name='LunchCard und PaymentTerminal' tmcname='part09-04_lunchcard_and_paymentterminal'>

Im vorherigen Teil gab es eine [Aufgabe](/part-8/5-more-examples-of-classes#programming-exercise-lunchcard), in der Sie die Klasse `LunchCard` implementiert haben. Die Karte hatte separate Methoden für den Verzehr eines normalen und eines speziellen Mittagessens sowie eine Methode zum Einzahlen von Geld auf die Karte.

Die Klasse `LunchCard`, wie Sie sie implementieren sollten, weist jedoch einige Probleme auf. Die Karte selbst kannte die Preise der verschiedenen Mittagsoptionen und wusste, wie viel Geld basierend darauf vom Guthaben abgezogen werden musste. Stellen Sie sich jedoch vor, die Preise würden sich ändern oder es würden neue Artikel in das System eingeführt, aber es wären bereits mehrere Karten im System registriert. Dies würde bedeuten, dass alle vorhandenen Karten durch Versionen ersetzt werden müssten, die die neuen Preise kennen.

Eine bessere Lösung wäre es, die Karten "dumm" zu machen, also unwissend über die Preise der verschiedenen Produkte. Der Zweck der Karte bestünde lediglich darin, das verfügbare Guthaben zu verfolgen. Alle komplizierteren Funktionen sollten in einer anderen Klasse enthalten sein: dem Zahlungsterminal (Payment Terminal).

## Eine einfachere LunchCard

Implementieren wir zunächst eine einfachere Version der Klasse `LunchCard`. Die Karte sollte nur Funktionen enthalten, um das aktuelle Guthaben zu ermitteln, Geld auf die Karte einzuzahlen und vom Guthaben abzubuchen. Bitte füllen Sie die Methode `subtract_from_balance(amount)` in der Aufgabenvorlage gemäß den Anweisungen in den Kommentaren aus:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def deposit_money(self, amount: float):
        self.balance += amount

    def subtract_from_balance(self, amount: float):
        pass
        # Der Betrag sollte nur vom Guthaben abgezogen werden, wenn
        # genügend Geld auf der Karte ist.
        # Wenn die Zahlung erfolgreich ist, gibt die Methode True zurück.
        # Andernfalls gibt sie False zurück.
```

Sie können den folgenden Code verwenden, um Ihre Funktion zu testen:

```python
if __name__ == "__main__":
    card = LunchCard(10)
    print("Guthaben", card.balance)
    result = card.subtract_from_balance(8)
    print("Zahlung erfolgreich:", result)
    print("Guthaben", card.balance)
    result = card.subtract_from_balance(4)
    print("Zahlung erfolgreich:", result)
    print("Guthaben", card.balance)
```

<sample-output>

Guthaben 10
Zahlung erfolgreich: True
Guthaben 2
Zahlung erfolgreich: False
Guthaben 2

</sample-output>

## Das Zahlungsterminal und der Umgang mit Barzahlungen

In der Mensa ist es möglich, entweder bar oder mit einer `LunchCard` zu bezahlen. Ein Zahlungsterminal wird verwendet, um sowohl Bar- als auch Kartentransaktionen abzuwickeln. Beginnen wir mit den Bartransaktionen.

Hier haben wir eine Gerüst-Implementierung für eine Klasse `PaymentTerminal`. Bitte implementieren Sie die Methoden wie in den Kommentaren beschrieben:

```python
class PaymentTerminal:
    def __init__(self):
        # Zu Beginn sind 1000 Euro Bargeld am Terminal verfügbar
        self.funds = 1000
        self.lunches = 0
        self.specials = 0

    def eat_lunch(self, payment: float):
        # Ein normales Mittagessen kostet 2,50 Euro.
        # Erhöhen Sie den Wert des Bargeldbestands am Terminal um den
        # Preis des Mittagessens, erhöhen Sie die Anzahl der verkauften
        # Mittagessen und geben Sie das entsprechende Wechselgeld zurück.
        # Wenn die als Argument übergebene Zahlung nicht ausreicht, um den
        # Preis zu decken, wird das Mittagessen nicht verkauft und die
        # gesamte Summe wird zurückgegeben.

    def eat_special(self, payment: float):
        # Ein spezielles Mittagessen kostet 4,30 Euro.
        # Erhöhen Sie den Wert des Bargeldbestands am Terminal um den
        # Preis des Mittagessens, erhöhen Sie die Anzahl der verkauften
        # Mittagessen und geben Sie das entsprechende Wechselgeld zurück.
        # Wenn die als Argument übergebene Zahlung nicht ausreicht, um den
        # Preis zu decken, wird das Mittagessen nicht verkauft und die
        # gesamte Summe wird zurückgegeben.
```

Sie können den folgenden Code verwenden, um Ihre Klasse zu testen:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("Das zurückgegebene Wechselgeld war", change)

change = exactum.eat_lunch(5)
print("Das zurückgegebene Wechselgeld war", change)

change = exactum.eat_special(4.3)
print("Das zurückgegebene Wechselgeld war", change)

print("Am Terminal verfügbares Bargeld:", exactum.funds)
print("Verkaufte normale Mittagessen:", exactum.lunches)
print("Verkaufte spezielle Mittagessen:", exactum.specials)
```

<sample-output>

Das zurückgegebene Wechselgeld war 7.5
Das zurückgegebene Wechselgeld war 2.5
Das zurückgegebene Wechselgeld war 0.0
Am Terminal verfügbares Bargeld: 1009.3
Verkaufte normale Mittagessen: 2
Verkaufte spezielle Mittagessen: 1

</sample-output>

## Umgang mit Kartentransaktionen

Implementieren wir nun die Kartentransaktionen. Wir benötigen Methoden, die eine `LunchCard` als Argument entgegennehmen und das Guthaben auf der Karte um den Preis des Mittagessens reduzieren. Unten finden Sie die Entwürfe dieser Funktionen. Bitte füllen Sie die Methoden wie in den Kommentaren beschrieben aus:

```python
class PaymentTerminal:
    # ...

    def eat_lunch_lunchcard(self, card: LunchCard):
        # Ein normales Mittagessen kostet 2,50 Euro.
        # Wenn genügend Geld auf der Karte ist,
        # ziehen Sie den Preis des Mittagessens vom Guthaben ab
        # und geben Sie True zurück. Wenn nicht, geben Sie False zurück.


    def eat_special_lunchcard(self, card: LunchCard):
        # Ein spezielles Mittagessen kostet 4,30 Euro.
        # Wenn genügend Geld auf der Karte ist,
        # ziehen Sie den Preis des Mittagessens vom Guthaben ab
        # und geben Sie True zurück. Wenn nicht, geben Sie False zurück.
```

**Hinweis:** Bei Zahlung mit einer `LunchCard` ändern sich die am Terminal verfügbaren Barmittel nicht. Die Mittagessen werden jedoch trotzdem verkauft, wann immer das erforderliche Guthaben verfügbar ist. Denken Sie also daran, die Anzahl der verkauften Mittagessen entsprechend zu erhöhen.

Sie können den folgenden Code verwenden, um Ihre Klasse zu testen:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("Das zurückgegebene Wechselgeld war", change)

card = LunchCard(7)

result = exactum.eat_special_lunchcard(card)
print("Zahlung erfolgreich:", result)
result = exactum.eat_special_lunchcard(card)
print("Zahlung erfolgreich:", result)
result = exactum.eat_lunch_lunchcard(card)
print("Zahlung erfolgreich:", result)

print("Am Terminal verfügbares Bargeld:", exactum.funds)
print("Verkaufte normale Mittagessen:", exactum.lunches)
print("Verkaufte spezielle Mittagessen:", exactum.specials)
```

<sample-output>

Das zurückgegebene Wechselgeld war 7.5
Zahlung erfolgreich: True
Zahlung erfolgreich: False
Zahlung erfolgreich: True
Am Terminal verfügbares Bargeld: 1002.5
Verkaufte normale Mittagessen: 2
Verkaufte spezielle Mittagessen: 1

</sample-output>

## Geld auf die Karte einzahlen

Fügen wir schließlich eine Methode hinzu, mit der Sie Geld auf die Karte einzahlen können. Der Kartenbesitzer bezahlt dies bar, sodass die eingezahlte Summe dem am Terminal verfügbaren Bargeldbestand hinzugefügt wird. Hier ist ein Entwurf für die Methode:

```python
def deposit_money_on_card(self, card: LunchCard, amount: float):
    pass
```

Sie können den folgenden Code verwenden, um Ihre Methode zu testen:

```python
exactum = PaymentTerminal()

card = LunchCard(2)
print(f"Kartenguthaben beträgt {card.balance} Euro")

result = exactum.eat_special_lunchcard(card)
print("Zahlung erfolgreich:", result)

exactum.deposit_money_on_card(card, 100)
print(f"Kartenguthaben beträgt {card.balance} Euro")

result = exactum.eat_special_lunchcard(card)
print("Zahlung erfolgreich:", result)
print(f"Kartenguthaben beträgt {card.balance} Euro")

print("Am Terminal verfügbares Bargeld:", exactum.funds)
print("Verkaufte normale Mittagessen:", exactum.lunches)
print("Verkaufte spezielle Mittagessen:", exactum.specials)
```

<sample-output>

Kartenguthaben beträgt 2 Euro
Zahlung erfolgreich: False
Kartenguthaben beträgt 102 Euro
Zahlung erfolgreich: True
Kartenguthaben beträgt 97.7 Euro
Am Terminal verfügbares Bargeld: 1100
Verkaufte normale Mittagessen: 0
Verkaufte spezielle Mittagessen: 1

</sample-output>

</programming-exercise>

## Eine Instanz derselben Klasse als Argument für eine Methode

Unten haben wir eine weitere Version der Klasse `Person`:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth
```

Nehmen wir an, wir möchten ein Programm schreiben, das das Alter von Objekten des Typs `Person` vergleicht. Wir könnten eine separate Funktion für diesen Zweck schreiben:

```python
def older_than(person1: Person, person2: Person):
    if person1.year_of_birth < person2.year_of_birth:
        return True
    else:
        return False

muhammad = Person("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Person("Blaise Pascal", 1623)
grace = Person("Grace Hopper", 1906)

if older_than(muhammad, pascal):
    print(f"{muhammad.name} ist älter als {pascal.name}")
else:
    print(f"{muhammad.name} ist nicht älter als {pascal.name}")

if older_than(grace, pascal):
    print(f"{grace.name} ist älter als {pascal.name}")
else:
    print(f"{grace.name} ist nicht älter als {pascal.name}")
```

<sample-output>

Muhammad ibn Musa al-Khwarizmi ist älter als Blaise Pascal
Grace Hopper ist nicht älter als Blaise Pascal

</sample-output>

Eines der Prinzipien der objektorientierten Programmierung besteht darin, jede Funktionalität, die Objekte eines bestimmten Typs verarbeitet, als Methoden in die Klassendefinition aufzunehmen. Anstelle einer Funktion könnten wir also eine _Methode_ schreiben, die es uns ermöglicht, das Alter eines `Person`-Objekts mit einem _anderen_ `Person`-Objekt zu vergleichen:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # Hinweis: Typ-Hinweise müssen in Anführungszeichen gesetzt werden, wenn der Parameter
    # vom gleichen Typ wie die Klasse selbst ist!
    def older_than(self, another: "Person"):
        if self.year_of_birth < another.year_of_birth:
            return True
        else:
            return False
```

Hier wird das Objekt, auf dem die Methode aufgerufen wird, als `self` bezeichnet, während das andere `Person`-Objekt `another` ist.

Denken Sie daran, dass sich der Aufruf einer Methode vom Aufruf einer Funktion unterscheidet. Eine Methode wird mit der Punktnotation an ein Objekt gebunden:

```python
muhammad = Person("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Person("Blaise Pascal", 1623)
grace = Person("Grace Hopper", 1906)

if muhammad.older_than(pascal):
    print(f"{muhammad.name} ist älter als {pascal.name}")
else:
    print(f"{muhammad.name} ist nicht älter als {pascal.name}")

if grace.older_than(pascal):
    print(f"{grace.name} ist älter als {pascal.name}")
else:
    print(f"{grace.name} ist nicht älter als {pascal.name}")
```

Links vom Punkt steht das Objekt selbst, auf das innerhalb der Methodendefinition als `self` verwiesen wird. In Klammern steht das Argument für die Methode, das Objekt, auf das als `another` verwiesen wird.

Die Ausgabe des Programms ist exakt dieselbe wie bei der obigen Funktionsimplementierung.

Ein eher kosmetischer Punkt zum Abschluss: Die `if...else`-Struktur in der Methode `older_than` ist im Großen und Ganzen unnötig. Der Wert des booleschen Ausdrucks in der Bedingung ist bereits exakt derselbe Wahrheitswert, der zurückgegeben wird. Die Methode kann somit vereinfacht werden:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # Hinweis: Typ-Hinweise müssen in Anführungszeichen gesetzt werden, wenn der Parameter
    # vom gleichen Typ wie die Klasse selbst ist!
    def older_than(self, another: "Person"):
        return self.year_of_birth < another.year_of_birth
```

Wie in den Kommentaren in den obigen Beispielen erwähnt, muss der Typ-Hinweis in Anführungszeichen gesetzt werden, wenn der Parameter in einer Methodendefinition vom gleichen Typ wie die Klasse selbst ist. Das Weglassen der Anführungszeichen verursacht einen Fehler, den Sie sehen werden, wenn Sie Folgendes versuchen:

```python
class Person:
    # ...

    # Dies würde einen Fehler verursachen, da Person in Anführungszeichen gesetzt werden muss
    def older_than(self, another: Person):
        return self.year_of_birth < another.year_of_birth
```

<programming-exercise name='Immobilienvergleich' tmcname='part09-05_comparing_properties'>

Die Datenbank einer Immobilienagentur führt Aufzeichnungen über verfügbare Immobilien mit Objekten, die durch die folgende Klasse definiert sind:

```python
class RealProperty:
    def __init__(self, rooms: int, square_metres: int, price_per_sqm: int):
        self.rooms = rooms
        self.square_metres = square_metres
        self.price_per_sqm = price_per_sqm
```

Ihre Aufgabe ist es, Methoden zu implementieren, die einen Vergleich zwischen verfügbaren Immobilien ermöglichen.

## Ist sie größer?

Bitte schreiben Sie eine Methode namens `bigger(self, compared_to)`, die `True` zurückgibt, wenn das `RealProperty`-Objekt selbst größer ist als das, mit dem es verglichen wird.

Ein Beispiel für die Funktionsweise der Funktion:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.bigger(downtown_two_bedroom))
print(suburbs_three_bedroom.bigger(downtown_two_bedroom))
```

<sample-output>

False
True

</sample-output>

## Preisunterschied

Bitte schreiben Sie eine Methode namens `price_difference(self, compared_to)`, die den Preisunterschied zwischen dem `RealProperty`-Objekt selbst und dem, mit dem es verglichen wird, zurückgibt. Der Preisunterschied ist der Absolutwert der Differenz zwischen den Gesamtpreisen der beiden Immobilien. Der Gesamtpreis einer Immobilie ist ihr Preis pro Quadratmeter multipliziert mit der Anzahl der Quadratmeter der Immobilie.

Ein Beispiel für die Funktionsweise der Funktion:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.price_difference(downtown_two_bedroom))
print(suburbs_three_bedroom.price_difference(downtown_two_bedroom))
```

<sample-output>

71600
35400

</sample-output>

## Ist sie teurer?

Bitte schreiben Sie eine Methode namens `more_expensive(self, compared_to)`, die `True` zurückgibt, wenn das `RealProperty`-Objekt selbst teurer ist als das, mit dem es verglichen wird.

Ein Beispiel für die Funktionsweise der Funktion:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.more_expensive(downtown_two_bedroom))
print(suburbs_three_bedroom.more_expensive(downtown_two_bedroom))
```

<sample-output>

False
True

</sample-output>

</programming-exercise>
