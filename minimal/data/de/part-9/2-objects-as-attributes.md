---
path: '/part-9/2-objects-as-attributes'
title: 'Objekte als Attribute'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Wissen Sie, wie Sie Objekte als Attribute in anderen Objekten verwenden
- Sind Sie mit dem Schlüsselwort `None` vertraut

</text-box>

Wir haben bereits Beispiele für Klassen gesehen, die Listen als Attribute haben. Da uns also nichts daran hindert, veränderliche Objekte als Attribute in unsere Klassen aufzunehmen, können wir ebenso gut Instanzen unserer eigenen Klassen als Attribute in anderen Klassen verwenden, die wir selbst definiert haben. In den folgenden Beispielen werden wir die Klassen `Course`, `Student` und `CompletedCourse` definieren. Ein abgeschlossener Kurs nutzt die ersten beiden Klassen. Die Klassendefinitionen sind sehr kurz und einfach gehalten, um sich besser auf die Technik der Verwendung von Instanzen eigener Klassen als Attribute konzentrieren zu können.

Wir gehen davon aus, dass jede Klasse in einer separaten Datei definiert ist.

Zuerst definieren wir die Klasse `Course` in einer Datei namens `course.py`:

```python
class Course:
    def __init__(self, name: str, code: str, credits: int):
        self.name = name
        self.code = code
        self.credits = credits
```

Als Nächstes die Klasse `Student` in einer Datei namens `student.py`:

```python
class Student:
    def __init__(self, name: str, student_number: str, credits: int):
        self.name = name
        self.student_number = student_number
        self.credits = credits
```

Schließlich wird die Klasse `CompletedCourse` in einer Datei namens `completedcourse.py` definiert. Da sie die anderen beiden Klassen verwendet, müssen diese importiert werden, bevor sie verwendet werden können:

```python
from course import Course
from student import Student

class CompletedCourse:
    def __init__(self, student: Student, course: Course, grade: int):
        self.student = student
        self.course = course
        self.grade = grade
```

Hier ist ein Beispiel für eine Hauptfunktion, die einige abgeschlossene Kurse zu einer Liste hinzufügt:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# Eine Liste von Studenten erstellen
students = []
students.append(Student("Ollie", "1234", 10))
students.append(Student("Peter", "3210", 23))
students.append(Student("Lena", "9999", 43))
students.append(Student("Tina", "3333", 8))

# Einen Kurs namens Einführung in die Programmierung erstellen
itp = Course("Introduction to Programming", "itp1", 5)

# Abgeschlossene Kurse für jeden Studenten hinzufügen, mit Note 3 für alle
completed = []
for student in students:
    completed.append(CompletedCourse(student, itp, 3))

# Den Namen des Studenten für jeden abgeschlossenen Kurs ausgeben
for course in completed:
    print(course.student.name)
```

<sample-output>

Ollie
Peter
Lena
Tina

</sample-output>

Was genau passiert bei all den Punkten in der Zeile `print(course.student.name)`?

* `course` ist eine Instanz der Klasse `CompletedCourse`
* `student` bezieht sich auf ein Attribut des `CompletedCourse`-Objekts, welches ein Objekt vom Typ `Student` ist
* das Attribut `name` im `Student`-Objekt enthält den Namen des Studenten

## Wann ist ein Import notwendig?

In den obigen Beispielen tauchte eine `import`-Anweisung ziemlich oft auf:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# Rest der Hauptfunktion
```

Eine `import`-Anweisung ist nur dann notwendig, wenn Code verwendet wird, der irgendwo außerhalb der aktuellen Datei (oder der Python-Interpreter-Sitzung) definiert ist. Dies schließt Situationen ein, in denen wir etwas aus der Python-Standardbibliothek verwenden möchten. Zum Beispiel enthält das Modul `math` einige mathematische Operationen:

```python
import math

x = 10
print(f"Die Quadratwurzel von {x} ist {math.sqrt(x)}")
```

Im obigen Beispiel sind wir davon ausgegangen, dass die drei Klassen jeweils in einer separaten Datei definiert wurden und die Hauptfunktion von einer weiteren Datei aus ausgeführt wurde. Aus diesem Grund waren die `import`-Anweisungen notwendig.

Wenn der gesamte Programmcode in derselben Datei geschrieben wird, wie es die meisten Aufgaben in diesem Kurs vorsehen, **benötigen Sie keine** `import`-Anweisungen, um die von Ihnen definierten Klassen zu verwenden.

Wenn Sie sich dabei ertappen, etwas in der Art von

```python
from person import Person

# weiterer Code hier
```

zu schreiben, haben Sie wahrscheinlich etwas falsch gemacht. Wenn Sie eine Auffrischung benötigen: Die `import`-Anweisung wurde erstmals in [Teil 7](/part-7/1-modules) dieses Kursmaterials eingeführt.

<programming-exercise name='Haustiere' tmcname='part09-06_pets'>

Die Aufgabenvorlage enthält die Entwürfe von zwei Klassen: `Person` und `Pet`. Jede Person hat ein Haustier. Bitte ändern Sie die `__str__`-Methode in der Klasse `Person` so, dass sie auch Informationen über das Haustier der Person ausgibt, wie im folgenden Beispiel gezeigt.

Der von der Methode zurückgegebene String _muss exakt dem unten angegebenen Format folgen_.

```python
hulda = Pet("Hulda", "mixed-breed dog")
levi = Person("Levi", hulda)

print(levi)
```

<sample-output>

Levi, whose pal is Hulda, a mixed-breed dog

</sample-output>

**Hinweis:** Alle Klassendefinitionen befinden sich in derselben Textdatei. Sie sollten nichts `importieren` müssen.

</programming-exercise>

## Eine Liste von Objekten als Attribut eines Objekts

In den obigen Beispielen haben wir einzelne Instanzen anderer Klassen als Attribute verwendet: Eine Person hat ein einzelnes Haustier als Attribut, und ein abgeschlossener Kurs hat einen Studenten und einen Kurs als seine Attribute.

In der objektorientierten Programmierung kommt es oft vor, dass wir eine _Sammlung_ von Objekten als Attribut haben möchten. Zum Beispiel folgt die Beziehung zwischen einer Sportmannschaft und ihren Spielern diesem Muster:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} Tore)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def summary(self):
        goals = []
        for player in self.players:
            goals.append(player.goals)
        print("Team:", self.name)
        print("Spieler:", len(self.players))
        print("Tore pro Spieler:", goals)
```

Ein Beispiel für unsere Klasse in Aktion:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Emily", 22))
ca.add_player(Player("Andy", 1))
ca.summary()
```

<sample-output>

Team: Campus Allstars
Spieler: 3
Tore pro Spieler: [10, 22, 1]

</sample-output>

<programming-exercise name='Eine Kiste voller Geschenke' tmcname='part09-07_box_of_presents'>

In dieser Aufgabe üben Sie das Verpacken von Geschenken. Sie schreiben zwei Klassen: `Present` und `Box`. Ein Geschenk hat einen Namen und ein Gewicht, und eine Kiste enthält Geschenke.

## Die Klasse Present

Bitte definieren Sie die Klasse `Present`, die zur Darstellung verschiedener Arten von Geschenken verwendet werden kann. Die Klassendefinition sollte Attribute für den Namen und das Gewicht (in kg) des Geschenks enthalten. Instanzen der Klasse sollten wie folgt funktionieren:

```python
book = Present("ABC-Buch", 2)

print("Name des Geschenks:", book.name)
print("Gewicht des Geschenks:", book.weight)
print("Geschenk:", book)
```

Dies sollte Folgendes ausgeben:

<sample-output>

Name des Geschenks: ABC-Buch
Gewicht des Geschenks: 2
Geschenk: ABC-Buch (2 kg)

</sample-output>

## Die Klasse Box

Bitte definieren Sie die Klasse `Box`. Sie sollten in der Lage sein, Geschenke zur Kiste hinzuzufügen, und die Kiste sollte das Gesamtgewicht der darin enthaltenen Geschenke verfolgen. Die Klassendefinition sollte diese Methoden enthalten:

- `add_present(self, present: Present)`, welche das als Argument übergebene Geschenk zur Kiste hinzufügt. Die Methode hat keinen Rückgabewert.
- `total_weight(self)`, welche das Gesamtgewicht der Geschenke in der Kiste zurückgibt.

Sie können den folgenden Code verwenden, um Ihre Klasse zu testen:

```python
book = Present("ABC-Buch", 2)

box = Box()
box.add_present(book)
print(box.total_weight())

cd = Present("Pink Floyd: Dark Side of the Moon", 1)
box.add_present(cd)
print(box.total_weight())
```

<sample-output>

2
3

</sample-output>

</programming-exercise>

## None: Eine Referenz auf Nichts

In der Python-Programmierung beziehen sich alle initialisierten Variablen auf ein Objekt. Es gibt jedoch unvermeidlich Situationen, in denen wir uns auf etwas beziehen müssen, das nicht existiert, ohne Fehler zu verursachen. Das Schlüsselwort `None` repräsentiert genau ein solches "leeres" Objekt.

Anknüpfend an das Beispiel mit Team und Spieler oben, nehmen wir an, wir möchten eine Methode hinzufügen, um nach Spielern im Team anhand ihres Namens zu suchen. Wenn kein solcher Spieler gefunden wird, könnte es sinnvoll sein, `None` zurückzugeben:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} Tore)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def find_player(self, name: str):
        for player in self.players:
            if player.name == name:
                return player
        return None
```

Testen wir unsere Funktion:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Amily", 22))
ca.add_player(Player("Andy", 1))

player1 = ca.find_player("Andy")
print(player1)
player2 = ca.find_player("Charlie")
print(player2)
```

<sample-output>

Andy (1 Tore)
None

</sample-output>

Seien Sie jedoch vorsichtig mit `None`. Es kann manchmal mehr Probleme verursachen, als es löst. Es ist ein häufiger Programmierfehler, zu versuchen, auf eine Methode oder ein Attribut über eine Referenz zuzugreifen, die zu `None` ausgewertet wird:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
print(f"Tore von Charlie: {player.goals}")
```

Die Ausführung des Obigen würde einen Fehler verursachen:

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'goals'

</sample-output>

Es ist eine gute Idee, auf `None` zu prüfen, bevor Sie versuchen, auf Attribute oder Methoden von Rückgabewerten zuzugreifen:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
if player is not None:
    print(f"Tore von Charlie: {player.goals}")
else:
    print("Charlie spielt nicht bei den Campus Allstars :(")
```

<sample-output>

Charlie spielt nicht bei den Campus Allstars :(

</sample-output>

<programming-exercise name='Die kleinste Person im Raum' tmcname='part09-08_shortest_in_room'>

Die Aufgabenvorlage enthält die Klasse `Person`. Eine Person hat einen Namen und eine Größe. In dieser Aufgabe werden Sie die Klasse `Room` implementieren. Sie können eine beliebige Anzahl von Personen zu einem Raum hinzufügen und auch nach der kleinsten Person im Raum suchen und diese entfernen.

## Room

Bitte definieren Sie die Klasse `Room`. Sie sollte eine Liste von Personen als Attribut haben und zudem die folgenden Methoden enthalten:

- `add(person: Person)` fügt die als Argument übergebene Person zum Raum hinzu.
- `is_empty()` gibt `True` oder `False` zurück, je nachdem, ob der Raum leer ist.
- `print_contents()` gibt den Inhalt der Personenliste im Raum aus.

Bitte schauen Sie sich das folgende Anwendungsbeispiel an:

```python
room = Room()
print("Ist der Raum leer?", room.is_empty())
room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Ally", 166))
room.add(Person("Nina", 162))
room.add(Person("Dorothy", 155))
print("Ist der Raum leer?", room.is_empty())
room.print_contents()
```

<sample-output>

Ist der Raum leer? True
Ist der Raum leer? False
There are 5 persons in the room, and their combined height is 838 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)
Nina (162 cm)
Dorothy (155 cm)

</sample-output>

## Die kleinste Person

Bitte definieren Sie die Methode `shortest()` innerhalb der Klassendefinition von `Room`. Die Methode sollte die kleinste Person in dem Raum zurückgeben, in dem sie aufgerufen wird. Wenn der Raum leer ist, sollte die Methode `None` zurückgeben. Die Methode sollte die Person _nicht_ aus dem Raum entfernen.

```python
room = Room()

print("Ist der Raum leer?", room.is_empty())
print("Kleinste Person:", room.shortest())

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))

print()

print("Ist der Raum leer?", room.is_empty())
print("Kleinste Person:", room.shortest())

print()

room.print_contents()
```

<sample-output>

Ist der Raum leer? True
Kleinste Person: None

Ist der Raum leer? False
Kleinste Person: Nina

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

</sample-output>

## Eine Person aus dem Raum entfernen

Bitte definieren Sie die Methode `remove_shortest()` innerhalb der Klassendefinition von `Room`. Die Methode sollte das kleinste `Person`-Objekt aus dem Raum entfernen und die Referenz auf das Objekt zurückgeben. Wenn der Raum leer ist, sollte die Methode `None` zurückgeben.

```python
room = Room()

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))
room.print_contents()

print()

removed = room.remove_shortest()
print(f"Aus dem Raum entfernt: {removed.name}")

print()

room.print_contents()
```

<sample-output>

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

Aus dem Raum entfernt: Nina

There are 3 persons in the room, and their combined height is 521 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)

</sample-output>

**Tipp**: In [Teil 4](/part-4/3-lists#removing-items-from-a-list) finden Sie Anweisungen zum Entfernen von Elementen aus einer Liste.

**Tipp 2**: Es ist immer möglich, eine andere Methode derselben Klasse von innerhalb einer Methode aufzurufen. Das Folgende sollte einwandfrei funktionieren:

```python
class Room:
    # ...
    def shortest(self):
        # Ihr Code hier

    def remove_shortest(self):
        shortest_person = self.shortest()
        # ...
```

</programming-exercise>
