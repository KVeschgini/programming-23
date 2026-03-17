---
path: '/part-10/4-application-development'
title: 'Entwicklung einer größeren Anwendung'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Sind Sie mit einigen grundlegenden Prinzipien der Anwendungsentwicklung vertraut
- Fühlen Sie sich sicher darin, zwischen den verschiedenen Teilen einer Anwendung zu unterscheiden (Benutzeroberfläche, Programmlogik und Dateiverarbeitung)
- Haben Sie geübt, Ihre eigene etwas größere Anwendung zu schreiben

</text-box>

Bisher haben wir in diesem Kursmaterial eine große Anzahl von Python-Funktionen behandelt.

Der Einführungskurs in die Programmierung führte Kontrollstrukturen wie `while` und `for`, Funktionen und grundlegende Datenstrukturen wie Listen, Tupel und Dictionarys ein. Im Prinzip sind diese Werkzeuge alles, was benötigt wird, um alles auszudrücken, was ein Programmierer mit Python ausdrücken möchte.

In diesem Fortgeschrittenenkurs in Programmierung haben Sie ab Teil 8 des Materials Klassen und Objekte kennengelernt. Nehmen wir uns einen Moment Zeit, um zu überlegen, wann und _warum_ sie notwendig sind, wenn jene grundlegenden Werkzeuge aus den Teilen 1 bis 7 eigentlich ausreichen sollten.

## Komplexität bewältigen

Objekte und Klassen sind keineswegs in jedem Programmierkontext notwendig. Wenn Sie beispielsweise ein kleineres Skript für den einmaligen Gebrauch programmieren, sind Objekte meist überflüssig. Wenn Sie jedoch etwas Größeres und Komplizierteres programmieren, werden Objekte sehr nützlich.

Wenn Programme an Komplexität gewinnen, wird die Menge an Details schnell unüberschaubar, sofern das Programm nicht systematisch organisiert ist. Selbst einige der komplizierteren Aufgaben in diesem Kurs hätten von den Beispielen in diesem Teil des Materials profitiert.

Seit Jahrzehnten ist das Konzept der [Trennung der Belange](https://de.wikipedia.org/wiki/Schichtentrennung_(Softwareentwicklung)) (Separation of Concerns) eines der zentralen Prinzipien in der Programmierung und dem weiteren Feld der Informatik. Zitat aus der Wikipedia:

_Die Trennung der Belange ist ein Entwurfsprinzip zur Aufteilung eines Computerprogramms in verschiedene Abschnitte, sodass jeder Abschnitt einen separaten Belang behandelt. Ein Belang ist eine Menge von Informationen, die den Code eines Computerprogramms beeinflusst._

Die Aufteilung des Programms in Abschnitte, von denen jeder seinen eigenen Belang zu bearbeiten hat, hilft dabei, die unvermeidliche Komplexität eines Computerprogramms zu bewältigen.

Funktionen sind eine Möglichkeit, ein Programm in verschiedene, überschaubare Einheiten zu gliedern. Anstatt ein einziges Skript zu schreiben, besteht die Idee darin, kleine, separat überprüfbare Funktionen zu formulieren, die jeweils einen Teil des größeren Problems lösen.

Ein weiterer gängiger Ansatz zur Verwaltung größerer Programme sind Objekte durch die Prinzipien der objektorientierten Programmierung. Beide Ansätze haben Vor- und Nachteile, und jeder Programmierer hat seinen eigenen Favoriten. Wie wir bisher gesehen haben, ermöglichen uns Objekte und Klassen, alle Daten _und_ den Code zur Verarbeitung dieser Daten innerhalb einer einzigen Einheit zu sammeln, nämlich in den Attributen und Methoden eines Objekts. Darüber hinaus bieten Objekte eine Möglichkeit, die von ihnen kontrollierten Daten zu kapseln, sodass sich andere Teile des Programms nicht um die internen Details eines Objekts kümmern müssen.

## Ein durchgearbeitetes Beispiel: Telefonbuch

Wie sollte ein Programm in Klassen und Objekte unterteilt werden? Dies ist keineswegs eine einfache Frage mit einer einzigen akzeptablen Antwort, daher werden wir anhand eines Beispiels vorgehen. In Teil 5 haben Sie eine [Telefonbuch-Anwendung](/part-5/3-dictionary#programming-exercise-phone-book-version-2) fertiggestellt, und nun werden wir etwas Ähnliches unter Anwendung objektorientierter Programmierprinzipien implementieren.

Dem Prinzip der Trennung der Belange folgend, sollte ein Programm in Abschnitte unterteilt werden, von denen jeder seine eigene Aufgabe zu erfüllen hat. In der objektorientierten Programmierung übersetzt sich dies in das [Prinzip der Einzelverantwortung](https://de.wikipedia.org/wiki/Single-Responsibility-Prinzip) (Single-Responsibility-Principle). Ohne auf die feineren Details einzugehen, ist sein grundlegender Zweck bereits aus dem Namen ersichtlich: _Eine einzelne Klasse und die darauf basierenden Objekte sollten eine einzige Verantwortung im Programm haben_.

Objektorientierte Programmierung wird oft als Weg zur Modellierung realer Objekte und Phänomene verwendet. Ein einzelnes Objekt in der realen Welt wird mit einer einzelnen Klasse im Programmcode modelliert. Im Falle eines Telefonbuchs könnten solche Objekte sein:
- eine Person
- ein Name
- eine Telefonnummer

Ein Name und eine Telefonnummer können als bloße Datenbits betrachtet werden, die keine eigenen Klassen verdienen, aber eine _Person_ ist eine eigenständige physische Einheit in der realen Welt und könnte in der Programmierwelt als Klasse fungieren. Ein `Person`-Objekt wäre dafür verantwortlich, einen Namen und die damit verbundenen Telefonnummern miteinander zu verknüpfen.

Ein _Telefonbuch_ selbst könnte ein guter Kandidat für eine Klasse sein. Seine Verantwortung bestünde darin, verschiedene `Person`-Objekte und die darin enthaltenen Daten zu verwalten.

Damit haben wir den Kern unserer Anwendung skizziert: _Telefonbuch_ und _Person_ bilden die Programmlogik unserer Anwendung, kurz _Anwendungslogik_ (Application Logic). Unsere Anwendung würde auch noch einige andere Klassen benötigen.

Es ist in der Regel eine gute Idee, jegliche Interaktion mit einem Benutzer von der Anwendungslogik getrennt zu halten. Das ist schließlich eine ganz eigene Verantwortung. Zusätzlich zur Kernanwendungslogik sollte unser Programm daher eine Klasse enthalten, die die Benutzeroberfläche handhabt.

Darüber hinaus sollte unser Telefonbuch über Mittel zur dauerhaften Speicherung zwischen den Ausführungen verfügen. Die Dateiverarbeitung ist wiederum eine klar getrennte Verantwortung, verdient also eine eigene Klasse.

Da wir nun einen Entwurf der grundlegenden Komponenten unseres Programms haben, stellt sich die Frage: Wo sollen wir mit dem Programmieren beginnen? Auch hier gibt es keine richtige oder falsche Antwort, aber es ist oft eine gute Idee, mit einem Teil der Anwendungslogik zu beginnen.

## Schritt 1: Ein Entwurf für die Anwendungslogik

Beginnen wir mit der Klasse `PhoneBook`. Eine Gerüst-Implementierung könnte so aussehen:

```python
class PhoneBook:
    def __init__(self):
        self.__persons = []

    def add_number(self, name: str, number: str):
        pass

    def get_numbers(self, name: str):
        pass
```

Diese Klasse besteht aus einer Liste von Personen sowie Methoden zum Hinzufügen und Abrufen von Daten.

Jede Person kann mit mehreren Nummern verbunden sein, also implementieren wir die interne Struktur von `persons` mit einem Dictionary. Ein Dictionary ermöglicht es uns, nach Schlüsseln anhand des Namens zu suchen, und der an einen Dictionary-Schlüssel gebundene Wert kann eine Liste sein. Bisher sieht es so aus, als bräuchten wir keine separate Klasse, um eine Person zu repräsentieren – ein Eintrag in einem Dictionary reicht aus.

Implementieren wir die oben aufgeführten Methoden und testen wir unser Telefonbuch:

```python
class PhoneBook:
    def __init__(self):
        self.__persons = {}

    def add_number(self, name: str, number: str):
        if not name in self.__persons:
            # Einen neuen Dictionary-Eintrag mit einer leeren Liste für die Nummern hinzufügen
            self.__persons[name] = []

        self.__persons[name].append(number)

    def get_numbers(self, name: str):
        if not name in self.__persons:
            return None

        return self.__persons[name]

# Testcode
phonebook = PhoneBook()
phonebook.add_number("Eric", "02-123456")
print(phonebook.get_numbers("Eric"))
print(phonebook.get_numbers("Emily"))
```

Dies sollte Folgendes ausgeben:

<sample-output>

['02-123456']
None

</sample-output>

Die Methode `get_numbers` gibt `None` zurück, wenn ein Name nicht im Telefonbuch enthalten ist. Wenn der Name gefunden wird, gibt sie die Liste der mit dem Namen verknüpften Nummern zurück.

Wann immer Sie Änderungen an einem Programm vornehmen, lohnt es sich _immer_, zu testen, ob der Code wie erwartet funktioniert, bevor Sie mit weiteren Änderungen fortfahren. Der zum Testen verwendete Code ist meist etwas, das kurz darauf wieder gelöscht wird, und als solches könnten Sie denken, dass es sich gar nicht erst lohnt, Tests zu schreiben. In den meisten Fällen ist das nicht wahr. Testen ist für gute Programmierergebnisse unerlässlich.

Ein Fehler im Programm sollte so schnell wie möglich gefunden und behoben werden. Wenn Sie es sich zur Gewohnheit machen, die Funktionalität praktisch jeder neuen Codezeile zu überprüfen, werden Sie feststellen, dass Fehler meist leicht zu lokalisieren und zu beheben sind, da Sie sich ziemlich sicher sein können, dass der Fehler durch die jüngste Änderung verursacht wurde. Wenn Sie das Programm erst nach dem Hinzufügen von Dutzenden von Codezeilen testen, vervielfachen sich auch die potenziellen Fehlerquellen um das Dutzendfache.

## Schritt 2: Ein Entwurf für die Benutzeroberfläche

Nachdem die Kernanwendungslogik erledigt ist, ist es an der Zeit, eine textbasierte Benutzeroberfläche zu implementieren. Wir benötigen eine neue Klasse, `PhoneBookApplication`, mit der folgenden anfänglichen Funktionalität:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()

    def help(self):
        print("Befehle: ")
        print("0 Beenden")

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("Befehl: ")
            if command == "0":
                break

application = PhoneBookApplication()
application.execute()
```

Dieses Programm tut noch nicht viel, aber gehen wir den Inhalt durch. Die Konstruktormethode erstellt ein neues `PhoneBook`, das in einem privaten Attribut gespeichert wird. Die Methode `execute(self)` startet die textbasierte Benutzeroberfläche des Programms, deren Kern die `while`-Schleife ist, die den Benutzer so lange nach Befehlen fragt, bis er den Befehl zum Beenden eingibt. Es gibt auch eine Methode für Anweisungen, `help(self)`, die vor dem Eintritt in die Schleife aufgerufen wird, damit die Anweisungen ausgegeben werden.

Fügen wir nun eine tatsächliche Funktionalität hinzu. Zuerst implementieren wir das Hinzufügen neuer Daten zum Telefonbuch:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()

    def help(self):
        print("Befehle: ")
        print("0 Beenden")
        print("1 Eintrag hinzufügen")

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("Befehl: ")
            if command == "0":
                break
            elif command == "1":
                name = input("Name: ")
                number = input("Nummer: ")
                self.__phonebook.add_number(name, number)

application = PhoneBookApplication()
application.execute()
```

Wenn der Benutzer _1_ zum Hinzufügen einer neuen Nummer eingibt, fragt die Benutzeroberfläche nach einem Namen und einer Nummer und fügt diese dem `PhoneBook` unter Verwendung der entsprechenden in der Klasse definierten Methode hinzu.

Die einzige Verantwortung der Benutzeroberfläche besteht darin, mit dem Benutzer zu kommunizieren. Jede andere Funktionalität, wie das Speichern eines neuen Name-Nummer-Paares, liegt in der Verantwortung des `PhoneBook`-Objekts.

Es gibt Raum für Verbesserungen in der Struktur unserer Benutzeroberflächenklasse. Erstellen wir eine Methode `add_entry(self)`, die den Befehl zum Hinzufügen eines neuen Eintrags handhabt:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()

    def help(self):
        print("Befehle: ")
        print("0 Beenden")
        print("1 Eintrag hinzufügen")

    # Trennung der Belange in Aktion: Eine neue Methode zum Hinzufügen eines Eintrags
    def add_entry(self):
        name = input("Name: ")
        number = input("Nummer: ")
        self.__phonebook.add_number(name, number)

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("Befehl: ")
            if command == "0":
                break
            elif command == "1":
                self.add_entry()

application = PhoneBookApplication()
application.execute()
```

Das Prinzip der _Trennung der Belange_ erstreckt sich auch auf die Ebene der Methoden. Wir könnten die gesamte Funktionalität der Benutzeroberfläche in einer einzigen komplizierten `while`-Schleife haben, aber es ist besser, jede Funktionalität in eine eigene Methode zu trennen. Die Verantwortung der Methode `execute()` besteht lediglich darin, die vom Benutzer eingegebenen Befehle an die relevanten Methoden zu delegieren. Dies hilft bei der Bewältigung der wachsenden Komplexität unseres Programms. Wenn wir beispielsweise später die Art und Weise ändern möchten, wie Einträge hinzugefügt werden, ist sofort klar, dass wir unsere Bemühungen dann auf die Methode `add_entry()` konzentrieren müssen.

Nehmen wir die Funktionalität zum Suchen nach Einträgen in unsere Benutzeroberfläche auf. Auch diese sollte ihre eigene Methode haben:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()

    def help(self):
        print("Befehle: ")
        print("0 Beenden")
        print("1 Eintrag hinzufügen")
        print("2 Suchen")

    def add_entry(self):
        name = input("Name: ")
        number = input("Nummer: ")
        self.__phonebook.add_number(name, number)

    def search(self):
        name = input("Name: ")
        numbers = self.__phonebook.get_numbers(name)
        if numbers == None:
            print("Nummer unbekannt")
            return
        for number in numbers:
            print(number)

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("Befehl: ")
            if command == "0":
                break
            elif command == "1":
                self.add_entry()
            elif command == "2":
                self.search()
            else:
                self.help()

application = PhoneBookApplication()
application.execute()
```

Wir haben nun eine einfache funktionierende Telefonbuch-Anwendung, die zum Testen bereit ist. Das Folgende ist ein Beispiellauf:

<sample-output>

Befehle:
0 Beenden
1 Eintrag hinzufügen
2 Suchen

Befehl: **1**
Name: **Eric**
Nummer: **02-123456**

Befehl: **1**
Name: **Eric**
Nummer: **045-4356713**

Befehl: **2**
Name: **Eric**
02-123456
045-4356713

Befehl: **2**
Name: Emily
Nummer unbekannt

Befehl: **0**

</sample-output>

Für eine so einfache Anwendung haben wir ziemlich viel Code geschrieben. Hätten wir alles in der einen `while`-Schleife geschrieben, wären wir wahrscheinlich mit viel weniger Code ausgekommen. Es ist jedoch recht einfach, den Code zu lesen, die Struktur ist klar, und wir sollten keine Probleme haben, neue Funktionen hinzuzufügen.

## Schritt 3: Daten aus einer Datei importieren

Nehmen wir an, wir haben bereits einige Telefonnummern in einer Datei gespeichert und möchten diese beim Programmstart einlesen. Die Datendatei liegt im folgenden CSV-Format vor:

```csv
Eric;02-1234567;045-4356713
Emily;040-324344
```

Der Umgang mit Dateien ist eindeutig ein eigener Verantwortungsbereich, verdient also eine eigene Klasse:

```python
class FileHandler():
    def __init__(self, filename):
        self.__filename = filename

    def load_file(self):
        names = {}
        with open(self.__filename) as f:
            for line in f:
                parts = line.strip().split(';')
                name, *numbers = parts
                names[name] = numbers

        return names
```

Die Konstruktormethode nimmt den Namen der Datei als Argument entgegen. Die Methode `load_file(self)` liest den Inhalt der Datei. Sie teilt jede Zeile in zwei Teile: einen Namen und eine Liste von Nummern. Diese fügt sie dann einem Dictionary hinzu, wobei sie den Namen als Schlüssel und die Liste als Wert verwendet.

Die Methode nutzt ein raffiniertes Python-Feature: Es ist möglich, zuerst einige Elemente aus einer Liste separat auszuwählen und dann den Rest der Elemente in einer neuen Liste aufzunehmen. Ein Beispiel hierfür sehen Sie unten. Sie erinnern sich vielleicht aus [Teil 6](/part-6/1-reading-files#csv-dateien-lesen), dass die String-Methode `split` eine Liste zurückgibt.

```python
my_list = [1, 2, 3, 4, 5]
first, second, *rest = my_list
print(first)
print(second)
print(rest)
```

<sample-output>

1
2
[3, 4, 5]

</sample-output>

Das `*` vor dem Variablennamen `rest` in der Zuweisung bedeutet, dass diese letzte Variable alle verbleibenden Elemente der Liste enthalten soll, ab dem dritten Element.

Wir sollten den Datei-Handler unbedingt separat testen, bevor wir ihn in unsere Anwendung aufnehmen:

```python
t = FileHandler("phonebook.txt")
print(t.load_file())
```

<sample-output>

{'Eric': ['02-1234567', '045-4356713'], 'Emily': ['040-324344']}

</sample-output>

Da der Datei-Handler einwandfrei zu funktionieren scheint, können wir ihn unserer Anwendung hinzufügen. Nehmen wir an, wir möchten die Datei jedes Mal als Erstes einlesen, wenn das Programm ausgeführt wird. Der logische Ort für das Einlesen der Datei wäre der Konstruktor der Klasse `PhoneBookApplication`:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()
        self.__filehandler = FileHandler("phonebook.txt")

        # Die Namen und Nummern aus der Datei zum Telefonbuch hinzufügen
        for name, numbers in self.__filehandler.load_file().items():
            for number in numbers:
                self.__phonebook.add_number(name, number)

    # Der Rest des Programms
```

Diese Funktionalität sollte ebenfalls getestet werden. Sobald wir sichergestellt haben, dass der Inhalt der Datei über die Benutzeroberfläche unserer Anwendung zugänglich ist, können wir zur nächsten Stufe übergehen.

## Schritt 4: Daten in eine Datei exportieren

Das letzte Feature in unserer Basisversion der Anwendung ist das Speichern des Inhalts des Telefonbuchs zurück in dieselbe Datei, aus der die Daten gelesen wurden.

Dies erfordert eine Änderung an der Klasse `PhoneBook`. Wir müssen in der Lage sein, den Inhalt des Telefonbuchs zu exportieren:

```python
class PhoneBook:
    def __init__(self):
        self.__persons = {}

    # ...

    # Alle Einträge zurückgeben (im Dictionary-Format)
    def all_entries(self):
        return self.__persons
```

Das eigentliche Speichern in der Datei sollte von der Klasse `FileHandler` übernommen werden. Fügen wir die Methode `save_file` hinzu, die eine Dictionary-Repräsentation des Telefonbuchs als Argument entgegennimmt:

```python
class FileHandler():
    def __init__(self, filename):
        self.__filename = filename

    def load_file(self):
        # ...

    def save_file(self, phonebook: dict):
        with open(self.__filename, "w") as f:
            for name, numbers in phonebook.items():
                line = [name] + numbers
                f.write(";".join(line) + "\n")
```

Das Speichern sollte beim Beenden des Programms erfolgen. Fügen wir der Benutzeroberfläche eine Methode für diesen Zweck hinzu und rufen wir sie auf, bevor wir aus der `while`-Schleife ausbrechen:

```python
class PhoneBookApplication:
    # Der restliche Code für die Benutzeroberfläche

    # Eine Methode, die beim Beenden des Programms ausgeführt wird
    def exit(self):
        self.__filehandler.save_file(self.__phonebook.all_entries())

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("Befehl: ")
            if command == "0":
                self.exit()
                break
            elif command == "1":
                self.add_entry()
            elif command == "2":
                self.search()
            else:
                self.help()
```

<programming-exercise name='Telefonbuch-Erweiterung, Version 1' tmcname='part10-10_phone_book_v1'>

In dieser Aufgabe erstellen Sie eine kleine Erweiterung für die Telefonbuch-Anwendung. Der Code aus dem obigen Beispiel befindet sich in der Aufgabenvorlage. Bitte fügen Sie einen Befehl hinzu, mit dem der Benutzer das Telefonbuch nach Nummer durchsuchen kann. Nach der Hinzufügung sollte die Anwendung wie folgt funktionieren:

<sample-output>

Befehle:
0 Beenden
1 Eintrag hinzufügen
2 Suchen
3 Suche nach Nummer

Befehl: **1**
Name: **Eric**
Nummer: **02-123456**

Befehl: **1**
Name: **Eric**
Nummer: **045-4356713**

Befehl: **3**
Nummer: **02-123456**
Eric

Befehl: **3**
Nummer: **0100100**
Unbekannte Nummer

Befehl: **0**

</sample-output>

Bitte implementieren Sie diese Ergänzung unter Berücksichtigung der aktuellen Struktur des Programms. Das bedeutet, dass Sie in der Klasse `PhoneBookApplication` eine entsprechende Hilfsmethode hinzufügen sollten, um die neue Funktionalität zu ermöglichen, und zudem einen neuen Zweig zur `while`-Schleife hinzufügen sollten. In der Klasse `PhoneBook` sollten Sie eine Methode hinzufügen, die das Suchen mit einer Nummer ermöglicht.

**Hinweis:** Wenn Sie Ihr Programm testen und am Ende viele verschiedene Nummern in der Datei `phonebook.txt` gespeichert haben, besteht die Möglichkeit, dass die lokalen Tests nicht bestanden werden, wenn beim Start der App widersprüchliche Daten aus der Datei gelesen werden. Sie können versuchen, den Inhalt aller `phonebook.txt`-Dateien, die Sie im Verzeichnis für die Aufgabe finden, zu leeren, _bevor_ Sie die lokalen Tests ausführen. Welche der Dateien von Ihrem Programm verwendet wird, kann von Ihren Visual Studio Code-Einstellungen abhängen. Bitte schauen Sie sich die Erklärung in [Teil 6](/part-6/1-reading-files#was-wenn-visual-studio-code-meine-datei-nicht-finden-kann) an. Wenn Ihre Lösung korrekt ist, sollten die Tests auf dem Server unabhängig davon normal bestanden werden.

</programming-exercise>

## Objekte in einem Dictionary

In der nächsten Aufgabe werden Sie gebeten, Ihr Telefonbuch so zu ändern, dass die Werte im Dictionary _Objekte_ und keine Listen sind.

Daran ist an sich nichts Seltsames, aber dies ist das erste Mal in diesem Kurs, dass so etwas vorgeschlagen wird. Gehen wir also ein einfacheres Beispiel durch, bevor wir uns in die Aufgabe stürzen.

Hier haben wir eine Anwendung, die verfolgt, wie viele Aufgaben Studenten in einem Kurs abgeschlossen haben. Die Aufgabenzahl jedes Studenten wird in einem einfachen Objekt gespeichert:

```python
class ExerciseCounter:
    def __init__(self):
        self.__exercises = 0

    def done(self):
        self.__exercises += 1

    def how_many(self):
        return self.__exercises
```

Die folgende Hauptfunktion verwendet die obige Klasse:

```python
students = {}

print("Lass uns ein paar Aufgaben machen")
while True:
    name = input("Student: ")
    if len(name) == 0:
        break

    # Ein neues Objekt erstellen, falls es noch nicht existiert
    if not name in students:
        students[name] = ExerciseCounter()

    # Eine neue erledigte Aufgabe zum Zähler hinzufügen
    students[name].done()

print()
print("Abgeschlossene Aufgaben:")

for student, exercises in students.items():
    print(f"{student}'s Aufgaben: {exercises.how_many()}")
```

Das Ausführen des Obigen könnte so aussehen:

<sample-output>

Lass uns ein paar Aufgaben machen
Student: **peter**
Student: **sarah**
Student: **andy**
Student: **sarah**
Student: **charlotte**
Student: **charlotte**
Student: **andy**
Student: **sarah**
Student:

Abgeschlossene Aufgaben:
peter's Aufgaben: 1
andy's Aufgaben: 2
sarah's Aufgaben: 3
charlotte's Aufgaben: 2

</sample-output>

In dem obigen Beispiel gibt es ein paar Dinge zu beachten. Wenn der Benutzer einen Namen eingibt, prüft das Programm zuerst, ob der Name bereits ein Schlüssel im Dictionary ist. Wenn der Name nicht vorhanden ist, wird ein neues Objekt erstellt und als Eintrag im Dictionary hinzugefügt:

```python
if not name in students:
    students[name] = ExerciseCounter()
```

Danach können wir _sicher_ sein, dass das Objekt existiert, gebunden an den Namen des Studenten, der als Schlüssel verwendet wird. Entweder wurde es gerade erst erstellt oder es existierte bereits aus einer vorherigen Iteration der Schleife. In jedem Fall können wir nun das Objekt mit dem Schlüssel abrufen und die Methode `done` aufrufen:

```python
students[name].done()
```

Die obige Zeile enthält eigentlich zwei separate Ereignisse. Wir könnten genauso gut eine Hilfsvariable verwenden und sie in zwei separate Codezeilen schreiben:

```python
students_counter = students[name]
students_counter.done()
```

Hinweis: Auch wenn das Objekt hier einer Hilfsvariablen zugewiesen wird, existiert das Objekt im Dictionary weiterhin genau wie zuvor. Die Hilfsvariable enthält eine _Referenz_ auf das Objekt im Dictionary.

Wenn Sie sich nicht ganz sicher sind, was im obigen Code tatsächlich passiert, probieren Sie ihn bitte mit dem [Visualisierungstool](http://www.pythontutor.com/visualize.html#mode=edit) aus.

<programming-exercise name='Telefonbuch-Erweiterung, Version 2' tmcname='part10-11_phone_book_v2'>

In dieser Aufgabe erstellen Sie eine weitere Version der `PhoneBookApplication`. Sie fügen Adressen zu den Daten hinzu, die mit einem Namen verknüpft werden können. Der Einfachheit halber wurde die Funktionalität zum Speichern in eine Datei entfernt, und einige andere Methoden wurden umbenannt, um der Änderung besser Rechnung zu tragen.

## Eine separate Klasse für die Daten einer Person

Bitte ändern Sie die Art und Weise, wie die Daten einer Person gehandhabt werden. Implementieren Sie eine Klasse namens `Person`, die sich um die Telefonnummern und Adressen von Personen kümmert. Die Klasse sollte wie folgt funktionieren:

```python
person = Person("Eric")
print(person.name())
print(person.numbers())
print(person.address())
person.add_number("040-123456")
person.add_address("Mannerheimintie 10 Helsinki")
print(person.numbers())
print(person.address())
```

<sample-output>

Eric
[]
None
['040-123456']
Mannerheimintie 10 Helsinki

</sample-output>

## PhoneBook verwendet die Klasse Person

Bitte ändern Sie die interne Implementierung Ihrer Anwendung so, dass Ihre Klasse `PhoneBook` Objekte der Klasse `Person` verwendet, um die Daten im Telefonbuch zu speichern. Das heißt, das Attribut `__persons` sollte weiterhin ein Dictionary enthalten, aber die Werte sollten `Person`-Objekte und keine Listen sein. Der Benutzer Ihrer Anwendung sollte keinen Unterschied bemerken; die Änderungen dürfen die Benutzeroberfläche nicht beeinträchtigen.

**WARNUNG:** Wann immer Sie strukturelle Änderungen an Ihrem Code vornehmen, wie in dieser Aufgabe beschrieben, gehen Sie immer in kleinen Schritten vor und testen Sie in jeder möglichen Phase. Versuchen Sie nicht, alle Änderungen auf einmal vorzunehmen. Das ist ein sicherer Weg, um **ernsthafte Probleme mit Ihrem Code zu bekommen**.

Ein geeigneter erster Schritt könnte sein, etwas Code zu schreiben, um die Funktionalität der Klasse `PhoneBook` direkt zu überprüfen. Beispielsweise sollte das Folgende zumindest keine Fehler verursachen:

```python
phonebook = PhoneBook()
phonebook.add_number("Eric", "02-123456")
print(phonebook.get_entry("Eric"))
print(phonebook.get_entry("Emily"))
```

Beachten Sie den neuen Namen für die Methode zum Abrufen eines Eintrags aus dem Telefonbuch. Die automatischen Tests prüfen nicht, was die Ausgabe Ihrer Methode `get_entry` ist, aber stellen Sie sicher, dass durch den obigen Code keine Fehler ausgelöst werden und dass das Ergebnis innerhalb Ihrer Implementierung sinnvoll ist.

Wenn Sie die notwendigen Änderungen in Ihrem Programm vorgenommen und die Funktionalität innerhalb der Klasse `PhoneBook` absolut verifiziert haben, können Sie zur Benutzeroberfläche übergehen und sehen, ob alles noch wie erwartet funktioniert.

## Eine Adresse hinzufügen

Bitte implementieren Sie die Funktionalität zum Hinzufügen einer Adresse zu einem Eintrag in Ihrem Telefonbuch. Das Programm sollte wie folgt funktionieren:

<sample-output>

Befehle:
0 Beenden
1 Nummer hinzufügen
2 Suchen
3 Adresse hinzufügen

Befehl: **1**
Name: **Eric**
Nummer: **02-123456**

Befehl: **3**
Name: **Emily**
Adresse: **Viherlaaksontie 7, Espoo**

Befehl: **2**
Name: **Eric**
02-123456
Adresse unbekannt

Befehl: **2**
Name: **Emily**
Nummer unbekannt
Viherlaaksontie 7, Espoo

Befehl: **3**
Name: **Eric**
Adresse: **Linnankatu 75, Turku**

Befehl: **2**
Name: **Eric**
02-123456
Linnankatu 75, Turku

Befehl: **2**
Name: **Wilhelm**
Adresse unbekannt
Nummer unbekannt

Befehl: **0**

</sample-output>

**WARNUNG und Tipp:** Wie bereits in der vorherigen Aufgabe erwähnt, versuchen Sie nicht, alle Änderungen auf einmal vorzunehmen. Das ist ein sicherer Weg, um **ernsthafte Probleme mit Ihrem Code zu bekommen**.

Stellen Sie zuerst sicher, dass Sie Adressen zuverlässig unter direkter Verwendung der Klasse `PhoneBook` hinzufügen können. Sobald Sie dies verifiziert haben, können Sie zu den notwendigen Änderungen in der Benutzeroberfläche übergehen.

</programming-exercise>

## Einige abschließende Bemerkungen

Die Struktur des obigen Telefonbuch-Beispiels folgt den grundlegenden Prinzipien der objektorientierten Programmierung recht gut. Der zentrale Grundsatz besteht darin, die verschiedenen Verantwortlichkeiten im Programm zu identifizieren und diese logisch auf die verschiedenen Klassen und Methoden aufzuteilen. Eine der Hauptmotivationen für diese Aufteilung ist die Bewältigung von Komplexität. Ein weiteres wichtiges Motiv ist, dass eine logische Aufteilung der Verantwortlichkeiten – Modularität in der Fachterminologie – den Code oft einfacher zu warten und zu erweitern macht.

In den Softwarepaketen, die in der weiten Welt entwickelt und verwendet werden, ist der bei weitem teuerste Aspekt der Entwicklung die Wartung und Erweiterung, also das Debuggen bestehender Software und das Implementieren neuer Funktionen. Korrekt implementierte Modularität ist ein finanziell sehr wichtiges Merkmal in der Softwareentwicklung.

Es gibt noch einige weitere Prinzipien der objektorientierten Programmierung, die hier hervorzuheben sind. Das Telefonbuch ist ein gutes Beispiel dafür, wie die Kernanwendungslogik _sowohl_ von der Benutzeroberfläche _als auch_ von jeglichen Datenspeichereinrichtungen getrennt werden kann (und sollte). Dies ist aus mehreren Gründen wichtig. Erstens ermöglicht diese Trennung das Testen des Codes in kleineren Einheiten, eine Klasse und Methode nach der anderen. Zweitens ist es, da die Kernlogik nun unabhängig von den Schnittstellen zur Außenwelt ist, möglich, bis zu einem gewissen Grad die Implementierung entweder der Kernlogik oder der Schnittstellen zu ändern, ohne die gesamte Anwendung zu beschädigen.

Der Dateiverarbeitungsprozess in der Telefonbuch-Anwendung läuft wie folgt ab: Das Programm liest die Datei nur einmal beim Start ein. Danach werden alle Daten in Variablen im Programm gespeichert. Wenn das Programm beendet wird, speichert es wieder alle Daten und überschreibt dabei praktisch die Datei. In den meisten Fällen ist dies der empfohlene Weg im Umgang mit externen Dateien, da das Bearbeiten der Daten an Ort und Stelle oft viel komplizierter ist.

Es gibt viele gute Handbücher zum Erlernen guter Programmierpraktiken. Eines davon ist [Clean Code](https://www.amazon.de/Clean-Code-Handbuch-Software-Handwerkskunst-Robert-Martin/dp/3826655486) von Robert Martin. Die Codebeispiele im Buch sind jedoch in Java implementiert, sodass das Durcharbeiten der Beispiele an diesem Punkt Ihrer Programmierkarriere recht mühsam sein kann, obwohl das Buch selbst vom Kurspersonal sehr empfohlen wird. Die Themen leicht wartbarer, erweiterbarer und qualitativ hochwertiger Code werden in den Kursen [Softwareentwicklungsmethoden](https://studies.helsinki.fi/courses/cu/hy-CU-118024742-2020-08-01) und [Software Engineering](https://studies.helsinki.fi/courses/cu/hy-CU-118024909-2020-08-01) weiter vertieft.

Das Schreiben von Code nach etablierten objektorientierten Programmierprinzipien hat seinen Preis. Sie werden wahrscheinlich mehr Code schreiben, als wenn Sie Ihre Implementierung in einem einzigen kontinuierlichen Anfall von Spaghetti-Code schreiben würden. Eine der Schlüsselkompetenzen eines Programmierers ist es, den besten Ansatz für jede Situation zu wählen. Manchmal ist es notwendig, einfach schnell etwas für den sofortigen Gebrauch zusammenzuschustern. Wenn jedoch absehbar ist, dass der Code wiederverwendet, gewartet oder weiterentwickelt wird – sei es durch Sie oder, was noch kritischer ist, durch jemand ganz anderen –, werden die Lesbarkeit und logische Modularität des Programmcodes unerlässlich. In den meisten Fällen gilt: Wenn es sich lohnt, es zu tun, lohnt es sich, es gut zu machen, selbst in den sehr frühen Phasen der Entwicklung.

Zum Abschluss dieses Teils des Materials werden Sie eine weitere größere Anwendung implementieren.

<programming-exercise name='Kursaufzeichnungen' tmcname='part10-12_course_records'>

Bitte schreiben Sie eine interaktive Anwendung zur Verfolgung Ihrer Studienleistungen. Die interne Struktur bleibt Ihnen überlassen, aber dies wäre eine gute Gelegenheit, eine ähnliche Struktur wie im obigen Telefonbuch-Beispiel zu üben.

Ihr Programm sollte wie folgt funktionieren:

<sample-output>

1 Kurs hinzufügen
2 Kursdaten abrufen
3 Statistiken
0 Beenden

Befehl: **1**
Kurs: **ItP**
Note: **3**
Leistungspunkte: **5**

Befehl: **2**
Kurs: **ItP**
ItP (5 cr) Note 3

Befehl: **1**
Kurs: **ItP**
Note: **5**
Leistungspunkte: **5**

Befehl: **2**
Kurs: **ItP**
ItP (5 cr) Note 5

Befehl: **1**
Kurs: **ItP**
Note: **1**
Leistungspunkte: **5**

Befehl: **2**
Kurs: **ItP**
ItP (5 cr) Note 5

Befehl: **2**
Kurs: **Einführung in Java**
Kein Eintrag für diesen Kurs vorhanden

Befehl: **1**
Kurs: **ACiP**
Note: **1**
Leistungspunkte: **10**

Befehl: **1**
Kurs: **ItAI**
Note: **2**
Leistungspunkte: **5**

Befehl: **1**
Kurs: **Algo101**
Note: **4**
Leistungspunkte: **1**

Befehl: **1**
Kurs: **CompModels**
Note: **5**
Leistungspunkte: **8**

Befehl: **3**
5 abgeschlossene Kurse, insgesamt 29 Leistungspunkte
Durchschnitt 3.4
Notenverteilung
5: xx
4: x
3:
2: x
1: x

Befehl: **0**

</sample-output>

Jeder Kursname sollte zu einem einzigen Eintrag in den Aufzeichnungen führen. Eine Note kann durch erneute Eingabe der Kursdetails erhöht werden, aber die Note sollte niemals gesenkt werden.

Diese Aufgabe ist zwei Aufgabenpunkte wert. Der erste wird gewährt, wenn die Befehle 1, 2 und 0 in Ihrem Programm korrekt funktionieren. Der zweite wird gewährt, wenn auch Befehl 3 wie erwartet funktioniert.

</programming-exercise>

## Epilog

Kehren wir zum Abschluss dieses Teils des Materials noch einmal kurz zur Benutzeroberfläche des Telefonbuch-Beispiels zurück.

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()
        self.__filehandler = FileHandler("phonebook.txt")

    # Der Rest des Programms

application = PhoneBookApplication()
application.execute()
```

Ein `PhoneBookApplication`-Objekt enthält sowohl ein `PhoneBook`-Objekt als auch ein `FileHandler`-Objekt. Der Name der an den `FileHandler` übergebenen Datei ist momentan fest in der Klasse `PhoneBookApplication` kodiert. Dies ist ein völlig irrelevantes Detail, wenn es um die _Benutzeroberfläche_ der Anwendung geht. Tatsächlich bricht es das Prinzip der _Trennung der Belange_: Wo ein `PhoneBook`-Objekt seinen Inhalt speichert, sollte für eine `PhoneBookApplication` von keinem Belang sein, doch wenn wir den Ort ändern wollten, müssten wir den Code von `PhoneBookApplication` ändern.

Es wäre eine bessere Idee, ein `FileHandler`-Objekt irgendwo _außerhalb_ der Klasse `PhoneBookApplication` zu erstellen und es als Argument an die Anwendung zu übergeben:

```python
class PhoneBookApplication:
    def __init__(self, storage_service):
        self.__phonebook = PhoneBook()
        self.__storage_service = storage_service

    # Der Rest der Benutzeroberfläche

# Einen FileHandler erstellen
storage_service = FileHandler("phonebook.txt")
# Ihn als Argument an den Konstruktor von PhoneBookApplication übergeben
application = PhoneBookApplication(storage_service)
application.execute()
```

Dies entfernt eine _unnötige Abhängigkeit_ aus der Klasse `PhoneBookApplication`. Wenn sich der Name der Datei ändert, muss die Benutzeroberfläche nicht mehr geändert werden. Wir müssen lediglich ein anderes Argument an den Konstruktor übergeben:

```python
class PhoneBookApplication:
    def __init__(self, storage_service):
        self.__phonebook = PhoneBook()
        self.__storage_service = storage_service

    # Der Rest der Benutzeroberfläche

# Einen anderen Dateinamen verwenden
storage_service = FileHandler("new_phonebook.txt")
application = PhoneBookApplication(storage_service)
application.execute()
```

Diese Änderung ermöglicht es uns auch, exotischere Speicherorte in Betracht zu ziehen, zum Beispiel einen Cloud-Dienst im Internet. Wir müssen lediglich eine Klasse implementieren, die den Cloud-Dienst nutzt und `PhoneBookApplication` exakt dieselben Methoden wie `FileHandler` anbietet.

Eine Instanz dieser neuen "Cloud-Handler"-Klasse kann als Argument an den Konstruktor übergeben werden, und keine einzige Codezeile in der Benutzeroberfläche muss geändert werden:

```python
class CloudHandler:
    # Code zum Speichern des Inhalts des Telefonbuchs
    # in einem Cloud-Dienst im Internet
    pass

storage_service = CloudHandler("amazon-cloud", "benutzername", "passwort")
application = PhoneBookApplication(storage_service)
application.execute()
```

Wie Sie bereits gesehen haben, hat die Anwendung solcher Techniken ihren Preis, da mehr Code zu schreiben ist. Ein Programmierer muss daher abwägen, ob dies ein akzeptabler Kompromiss ist.

Die oben skizzierte Technik wird als _Abhängigkeitsinjektion_ (Dependency Injection) bezeichnet. Wie der Name schon sagt, besteht die Idee darin, jede von einem Objekt benötigte Abhängigkeit von _außerhalb_ des Objekts bereitzustellen. Es ist ein sehr nützliches Werkzeug im Werkzeugkasten eines Programmierers, da es die Implementierung neuer Funktionen in Programmen erleichtert und automatisierte Tests begünstigt. Dieses Thema wird in den bereits erwähnten Kursen [Softwareentwicklungsmethoden](https://studies.helsinki.fi/courses/cu/hy-CU-118024742-2020-08-01) und [Software Engineering](https://studies.helsinki.fi/courses/cu/hy-CU-118024909-2020-08-01) weiter vertieft.
