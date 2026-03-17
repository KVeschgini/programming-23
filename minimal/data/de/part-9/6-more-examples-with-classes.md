---
path: '/part-9/6-more-examples-with-classes'
title: 'Weitere Beispiele mit Klassen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Sind Sie mit weiteren Beispielen für Klassen und Objekte vertraut
- Sind Sie in der Lage, Standardwerte für Parameter in Ihren Methoden zu verwenden

</text-box>

Das folgende Beispiel besteht aus zwei Klassen. Die Klasse `Point` ist ein Modell für einen Punkt im zweidimensionalen Raum. Die Klasse `Line` ist ein Modell für ein Liniensegment zwischen zwei Punkten. Der folgende Code ist kommentiert; bitte lesen Sie die Kommentare, um zu verstehen, wie die Klassen funktionieren.

```python
import math

class Point:
    """ Die Klasse repräsentiert einen Punkt im zweidimensionalen Raum """

    def __init__(self, x: float, y: float):
        # Diese Attribute sind öffentlich, da jeder Wert für x und y akzeptabel ist
        self.x = x
        self.y = y

    # Diese Klassenmethode gibt einen neuen Punkt im Ursprung (0, 0) zurück
    # Es ist möglich, eine neue Instanz der Klasse von innerhalb der Klasse zurückzugeben
    @classmethod
    def origo(cls):
        return Point(0, 0)

    # Diese Klassenmethode erstellt einen neuen Punkt basierend auf einem existierenden Punkt
    # Der ursprüngliche Punkt kann an der x- und/oder y-Achse gespiegelt werden
    # Zum Beispiel ist der Punkt (1, 3) an der x-Achse gespiegelt (1, -3)
    @classmethod
    def mirrored(cls, point: "Point", mirror_x: bool, mirror_y: bool):
        x = point.x
        y = point.y
        if mirror_x:
            y = -y
        if mirror_y:
            x = -x

        return Point(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"


class Line:
    """ Die Klasse repräsentiert ein Liniensegment im zweidimensionalen Raum """

    def __init__(self, beginning: Point, end: Point):
        # Diese Attribute sind öffentlich, da beliebige zwei Punkte akzeptabel sind
        self.beginning = beginning
        self.end = end

    # Diese Methode verwendet den Satz des Pythagoras, um die Länge des Liniensegments zu berechnen
    def length(self):
        sum_of_squares = (self.end.x - self.beginning.x) ** 2 + (self.end.y - self.beginning.y) ** 2
        return math.sqrt(sum_of_squares)

    # Diese Methode gibt den Punkt in der Mitte des Liniensegments zurück
    def centre_point(self):
        centre_x = (self.beginning.x + self.end.x) / 2
        centre_y = (self.beginning.y + self.end.y) / 2
        return Point(centre_x, centre_y)

    def __str__(self):
        return f"{self.beginning} ... {self.end}"
```

```python
point = Point(1, 3)
print(point)

origo = Point.origo()
print(origo)

point2 = Point.mirrored(point, True, True)
print(point2)

line = Line(point, point2)
print(line.length())
print(line.centre_point())
print(line)
```

<sample-output>

(1, 3)
(0, 0)
(-1, -3)
6.324555320336759
(0.0, 0.0)
(1, 3) ... (-1, -3)

</sample-output>

## Standardwerte von Parametern

In der Python-Programmierung können Sie im Allgemeinen für jeden Parameter einen Standardwert festlegen. Standardwerte können sowohl in Funktionen als auch in Methoden verwendet werden.

Wenn ein Parameter einen Standardwert hat, müssen Sie beim Aufruf der Funktion keinen Wert als Argument angeben. Wenn ein Argument angegeben wird, wird der Standardwert ignoriert. Wenn nicht, wird der Standardwert verwendet.

Standardwerte werden häufig in Konstruktoren verwendet. Wenn zu erwarten ist, dass bei der Erstellung eines Objekts nicht alle Informationen verfügbar sind, ist es besser, einen Standardwert in die Definition der Konstruktormethode aufzunehmen, als den Client zu zwingen, sich um das Problem zu kümmern. Dies macht die Verwendung der Klasse aus Sicht des Clients einfacher, gewährleistet aber auch die Integrität des Objekts. Beispielsweise können wir mit einem festgelegten Standardwert sicher sein, dass ein "leerer" Wert immer derselbe ist, es sei denn, der Client möchte ausdrücklich etwas anderes angeben. Wenn kein Standardwert festgelegt ist, liegt es am Client, einen "leeren" Wert bereitzustellen. Dies könnte zum Beispiel ein leerer String `""`, das spezielle leere Objekt `None` oder der String `"nicht gesetzt"` sein.

Schauen wir uns eine weitere Klasse an, die einen Studenten repräsentiert. Beim Erstellen eines neuen `Student`-Objekts muss der Client einen Namen und eine Matrikelnummer angeben. Die Matrikelnummer ist privat und sollte später nicht geändert werden. Zusätzlich hat ein `Student`-Objekt Attribute für Leistungspunkte und Notizen, für die im Konstruktor Standardwerte festgelegt sind. Neue Werte können als Argumente an den Konstruktor übergeben werden, sie können aber auch weggelassen werden, sodass stattdessen die Standardwerte verwendet werden. Bitte schauen Sie sich die Kommentare im Code an, um besser zu verstehen, was jede Methode tut.

```python
class Student:
    """ Diese Klasse modelliert einen Studenten """

    def __init__(self, name: str, student_number: str, credits: int = 0, notes: str = ""):
        # Aufruf der Setter-Methode für das Attribut name
        self.name = name

        if len(student_number) < 5:
            raise ValueError("Eine Matrikelnummer sollte mindestens fünf Zeichen haben")

        self.__student_number = student_number

        # Aufruf der Setter-Methode für das Attribut credits
        self.credits = credits

        self.__notes = notes

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        if name != "":
            self.__name = name
        else:
            raise ValueError("Der Name darf kein leerer String sein")

    @property
    def student_number(self):
        return self.__student_number

    @property
    def credits(self):
        return self.__credits

    @credits.setter
    def credits(self, op):
        if op >= 0:
            self.__credits = op
        else:
            raise ValueError("Die Anzahl der Leistungspunkte darf nicht unter Null liegen")

    @property
    def notes(self):
        return self.__notes

    @notes.setter
    def notes(self, notes):
        self.__notes = notes

    def summary(self):
        print(f"Student {self.__name} ({self.student_number}):")
        print(f"- Leistungspunkte: {self.__credits}")
        print(f"- Notizen: {self.notes}")
```

```python
# Nur Name und Matrikelnummer als Argumente an den Konstruktor übergeben
student1 = Student("Sally Student", "12345")
student1.summary()

# Name, Matrikelnummer und Anzahl der Leistungspunkte übergeben
student2 = Student("Sassy Student", "54321", 25)
student2.summary()

# Werte für alle Parameter übergeben
student3 = Student("Saul Student", "99999", 140, "Schreibzeitverlängerung")
student3.summary()

# Einen Wert für Notizen übergeben, aber nicht für Leistungspunkte
# Hinweis: Der Parameter muss nun benannt werden, da die Argumente nicht in der Reihenfolge sind
student4 = Student("Sandy Student", "98765", notes="abwesend im akademischen Jahr 20-21")
student4.summary()
```

<sample-output>

Student Sally Student (12345):
- Leistungspunkte: 0
- Notizen:
Student Sassy Student (54321):
- Leistungspunkte: 25
- Notizen:
Student Saul Student (99999):
- Leistungspunkte: 140
- Notizen: Schreibzeitverlängerung
Student Sandy Student (98765):
- Leistungspunkte: 0
- Notizen: abwesend im akademischen Jahr 20-21

</sample-output>

Hinweis: Es gibt keine Setter-Methode für das Attribut `student_number`, da die Matrikelnummer nicht geändert werden soll.

Es gibt einen recht bedeutenden Fallstrick bei der Verwendung von Standardwerten für Parameter. Das folgende Beispiel, das eine weitere Art von Studenten modelliert, wird dies verdeutlichen:

```python
class Student:
    def __init__(self, name, completed_courses=[]):
        self.name = name
        self.completed_courses = completed_courses

    def add_course(self, course):
        self.completed_courses.append(course)
```

```python
student1 = Student("Sally Student")
student2 = Student("Sassy Student")

student1.add_course("ItP")
student1.add_course("ACiP")

print(student1.completed_courses)
print(student2.completed_courses)
```

<sample-output>

['ItP', 'ACiP']
['ItP', 'ACiP']

</sample-output>

Das Hinzufügen abgeschlossener Kurse zu Sallys Liste fügt diese Kurse auch zu Sassys Liste hinzu. Tatsächlich handelt es sich bei diesen beiden um exakt dieselbe Liste, da Python die im Standardwert gespeicherte Referenz wiederverwendet. Das Erstellen der zwei neuen `Student`-Objekte im obigen Beispiel entspricht dem Folgenden:

```python
courses = []
student1 = Student("Sally Student", courses)
student2 = Student("Sassy Student", courses)
```

Standardwerte von Parametern sollten niemals Instanzen komplexerer, veränderlicher Datenstrukturen wie Listen sein. Das Problem kann umgangen werden, indem die folgenden Änderungen am Konstruktor der Klasse `Student` vorgenommen werden:

```python
class Student:
    def __init__(self, name, completed_courses=None):
        self.name = name
        if completed_courses is None:
            self.completed_courses = []
        else:
            self.completed_courses = completed_courses

    def add_course(self, course):
        self.completed_courses.append(course)
```

```python
student1 = Student("Sally Student")
student2 = Student("Sassy Student")

student1.add_course("ItP")
student1.add_course("ACiP")

print(student1.completed_courses)
print(student2.completed_courses)
```

<sample-output>

['ItP', 'ACiP']
[]

</sample-output>

## Das große Finale

Auch wenn die folgende Aufgabe diesen Teil des Materials abschließt, wurden die zu ihrer Lösung erforderlichen Techniken bereits im Abschnitt [Objekte als Attribute](/part-9/2-objects-as-attributes) behandelt. Insbesondere müssen Sie in dieser Aufgabe nicht den `@property`-Dekorator oder Standardwerte für Parameter verwenden. Diese Aufgabe ähnelt stark den Aufgaben [Eine Kiste voller Geschenke](/part-9/2-objects-as-attributes#programming-exercise-a-box-of-presents) und [Die kleinste Person im Raum](/part-9/2-objects-as-attributes#programming-exercise-the-shortest-person-in-the-room).


#### Wichtige Informationen zur nächsten Aufgabe
Bitte beachten Sie, dass es ein Problem aufgrund eines Updates in Python gibt, das mit der integrierten Bibliothek und dem ursprünglichen Dateinamen für diese Aufgabe kollidiert. Falls Probleme auftreten, empfehlen wir, den Aufgabenordner erneut herunterzuladen. Sobald Sie die neuen lokalen Testdateien erhalten haben, können Sie entweder "code.py" oder "code_1.py" als Dateinamen verwenden. Bei der Verwendung von Visual Studio Code erhalten Sie möglicherweise Benachrichtigungen über Probleme in der Testdatei. Diese Benachrichtigungen können jedoch sicher ignoriert werden, da sie durch die Unfähigkeit des Tests verursacht werden, aus den Dateien "code.py" oder "code_1.py" zu importieren.

<programming-exercise name='Gegenstand, Koffer und Frachtraum' tmcname='part09-15_item_suitcase_hold'>

In dieser Aufgabenserie erstellen Sie die Klassen `Item`, `Suitcase` und `CargoHold`, mit denen Sie die Arbeit mit Objekten, die Referenzen auf andere Objekte enthalten, weiter üben können.

## Item

Bitte erstellen Sie eine Klasse namens `Item`, die zur Erstellung von Gegenständen verschiedener Art verwendet wird. Jeder Gegenstand hat einen Namen und ein Gewicht (in Kilogramm).

Sie können den folgenden Code zum Testen Ihrer Klasse verwenden:

```python
book = Item("ABC-Buch", 2)
phone = Item("Nokia 3210", 1)

print("Name des Buches:", book.name())
print("Gewicht des Buches:", book.weight())

print("Buch:", book)
print("Telefon:", phone)
```

Ihr Programm sollte dies ausgeben:

<sample-output>

Name des Buches: ABC-Buch
Gewicht des Buches: 2
Buch: ABC-Buch (2 kg)
Telefon: Nokia 3210 (1 kg)

</sample-output>

Ein `Item` sollte die Methoden `weight` und `name` bereitstellen, die die in diesen Attributen gespeicherten Werte zurückgeben.

Der Name und das Gewicht sollten innerhalb der Klasse gekapselt sein. Der folgende Code sollte nicht funktionieren:

```python
book = Item("ABC-Buch", 2)
book.weight = 10
```

## Suitcase

Bitte schreiben Sie eine Klasse namens `Suitcase`. Sie sollten in der Lage sein, Gegenstände in einen Koffer zu packen. Ein Koffer hat zudem ein maximales Gesamtgewicht für die darin aufbewahrten Gegenstände.

Ihre Klasse sollte die folgenden Mitglieder enthalten:

- Einen Konstruktor, der das maximale Gewicht als Argument entgegennimmt
- Eine Methode namens `add_item`, die den als Argument übergebenen Gegenstand zum Koffer hinzufügt. Die Methode hat keinen Rückgabewert.
- Eine `__str__`-Methode, die einen String im Format "x items (y kg)" zurückgibt

Die Klasse sollte sicherstellen, dass das Gesamtgewicht der in einem `Suitcase` aufbewahrten Gegenstände das für diese Instanz festgelegte maximale Gewicht nicht überschreitet. Falls das maximale Gewicht beim Aufruf der Methode `add_item` überschritten würde, sollte der neue Gegenstand nicht zum Koffer hinzugefügt werden.

Ihre Klasse sollte wie folgt funktionieren:

```python
book = Item("ABC-Buch", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Ziegelstein", 4)

suitcase = Suitcase(5)
print(suitcase)

suitcase.add_item(book)
print(suitcase)

suitcase.add_item(phone)
print(suitcase)

suitcase.add_item(brick)
print(suitcase)
```

Die Ausführung des Obigen sollte Folgendes ausgeben:

<sample-output>

0 items (0 kg)
1 items (2 kg)
2 items (3 kg)
2 items (3 kg)

</sample-output>

## Auf die Sprache achten

Die Benachrichtigung "1 items" ist grammatikalisch nicht ganz korrekt. Stattdessen sollte es "1 item" heißen. Bitte nehmen Sie die erforderlichen Änderungen an Ihrer `__str__`-Methode vor.

Das vorherige Beispiel sollte nun Folgendes ausgeben:

<sample-output>

0 items (0 kg)
1 item (2 kg)
2 items (3 kg)
2 items (3 kg)

</sample-output>

## Alle Gegenstände

Bitte fügen Sie Ihrer Klassendefinition `Suitcase` die folgenden Methoden hinzu:

- `print_items` gibt alle im Koffer aufbewahrten Gegenstände aus
- `weight` gibt eine Ganzzahl zurück, die das Gesamtgewicht aller im Koffer aufbewahrten Gegenstände darstellt

Ihre Klasse sollte nun mit dem folgenden Programm funktionieren:

```python
book = Item("ABC-Buch", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Ziegelstein", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

print("Der Koffer enthält die folgenden Gegenstände:")
suitcase.print_items()
combined_weight = suitcase.weight()
print(f"Gesamtgewicht: {combined_weight} kg")
```

Die Ausführung des obigen Programms sollte dies ausgeben:

<sample-output>

Der Koffer enthält die folgenden Gegenstände:
ABC-Buch (2 kg)
Nokia 3210 (1 kg)
Ziegelstein (4 kg)
Gesamtgewicht: 7 kg

</sample-output>

Falls Sie Ihre Klasse `Suitcase` mit mehr als zwei Instanzvariablen implementiert haben, nehmen Sie bitte die erforderlichen Änderungen vor, sodass jede Instanz nur zwei Datenattribute hat: das maximale Gewicht und eine Liste der darin enthaltenen Gegenstände.

## Der schwerste Gegenstand

Bitte fügen Sie Ihrer Klasse `Suitcase` eine neue Methode hinzu: `heaviest_item` sollte den `Item` zurückgeben, der am schwersten ist. Falls es zwei oder mehr Gegenstände mit demselben Höchstgewicht gibt, kann die Methode einen beliebigen dieser Gegenstände zurückgeben. Die Methode sollte eine Referenz auf ein Objekt zurückgeben. Wenn der Koffer leer ist, sollte die Methode `None` zurückgeben.

Ihre Klasse sollte nun mit dem folgenden Programm funktionieren:

```python
book = Item("ABC-Buch", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Ziegelstein", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

heaviest = suitcase.heaviest_item()
print(f"Der schwerste Gegenstand: {heaviest}")
```

Die Ausführung des obigen Programms sollte dies ausgeben:

<sample-output>

Der schwerste Gegenstand: Ziegelstein (4 kg)

</sample-output>

## Frachtraum

Bitte schreiben Sie eine Klasse namens `CargoHold` mit den folgenden Methoden:

- Einen Konstruktor, der das maximale Gewicht als Argument entgegennimmt
- Eine Methode namens `add_suitcase`, die den als Argument übergebenen Koffer zum Frachtraum hinzufügt
- Eine `__str__`-Methode, die einen String im Format "x suitcases, space for y kg" zurückgibt

Die Klasse sollte sicherstellen, dass das Gesamtgewicht der in einem `CargoHold` aufbewahrten Gegenstände das für diese Instanz festgelegte maximale Gewicht nicht überschreitet. Falls das maximale Gewicht beim Aufruf der Methode `add_suitcase` überschritten würde, sollte der neue Koffer nicht zum Frachtraum hinzugefügt werden.

Ihre Klasse sollte nun mit dem folgenden Programm funktionieren:

```python
cargo_hold = CargoHold(1000)
print(cargo_hold)

book = Item("ABC-Buch", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Ziegelstein", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold.add_suitcase(adas_suitcase)
print(cargo_hold)

cargo_hold.add_suitcase(peters_suitcase)
print(cargo_hold)
```

Die Ausführung des Obigen sollte Folgendes ausgeben:

<sample-output>

0 suitcases, space for 1000 kg
1 suitcase, space for 997 kg
2 suitcases, space for 993 kg

</sample-output>

## Der Inhalt des Frachtraums

Bitte fügen Sie Ihrer Klasse `CargoHold` eine Methode namens `print_items` hinzu. Sie sollte alle Gegenstände in allen Koffern innerhalb des Frachtraums ausgeben.

Ihre Klasse sollte nun mit dem folgenden Programm funktionieren:

```python
book = Item("ABC-Buch", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Ziegelstein", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold = CargoHold(1000)
cargo_hold.add_suitcase(adas_suitcase)
cargo_hold.add_suitcase(peters_suitcase)

print("Die Koffer im Frachtraum enthalten die folgenden Gegenstände:")
cargo_hold.print_items()
```

Die Ausführung des obigen Programms sollte dies ausgeben:

<sample-output>

Die Koffer im Frachtraum enthalten die folgenden Gegenstände:
ABC-Buch (2 kg)
Nokia 3210 (1 kg)
Ziegelstein (4 kg)

</sample-output>

</programming-exercise>
