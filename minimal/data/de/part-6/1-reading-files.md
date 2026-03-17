---
path: '/part-6/1-reading-files'
title: 'Dateien lesen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man den Inhalt von Dateien mit Python liest
- werden Sie wissen, was eine Textdatei und eine CSV-Datei sind
- werden Sie in der Lage sein, den Inhalt einer CSV-Datei in Ihren Programmen zu verarbeiten

</text-box>

<!--der gleiche Text befindet sich in den Abschnitten 3-1, 5-1 und 6-1, bitte alle prüfen, falls dies geändert wird-->
<text-box variant='hint' name="Über die Übungen in diesem Kurs">

Um ein versierter Programmierer zu werden, ist viel Übung erforderlich, manchmal sogar recht mechanische Übung. Es geht auch darum, Problemlösungsfähigkeiten zu entwickeln und Intuition anzuwenden. Aus diesem Grund gibt es in diesem Kurs viele Übungen unterschiedlicher Art. Einige von ihnen fordern Sie auf, das Gelernte recht direkt anzuwenden, aber einige sind absichtlich herausfordernder und offener gestaltet.

Einige der Übungen mögen auf den ersten Blick überwältigend erscheinen, aber das ist kein Grund zur Sorge. Keine der Übungen ist strikt verpflichtend, und tatsächlich sind _nur 25 % der Punkte in jedem Teil erforderlich, um den Kurs zu bestehen._ Weitere Details zur Benotung finden Sie auf der [Seite über Benotung und Prüfungen](/grading-and-exams).

**Die Übungen sind nicht in einer bestimmten Reihenfolge der Schwierigkeit angeordnet.** Jeder Abschnitt führt in der Regel einige neue Programmierkonzepte ein, die dann sowohl mit einfacheren als auch mit komplizierteren Übungen geübt werden. **Wenn Sie auf eine Übung stoßen, die sich als zu schwierig anfühlt, gehen Sie zur nächsten über.** Sie können jederzeit zu den schwierigeren Übungen zurückkehren, wenn Sie später Zeit haben.

Wenn es zwangsläufig schwierig wird, ein Wort des Trostes: Eine Aufgabe, die diese Woche unmöglich erscheint, wird sich in etwa vier Wochen wahrscheinlich ziemlich einfach anfühlen.

</text-box>

Ein sehr häufiger Anwendungsfall für die Programmierung ist die Verarbeitung von Daten, die in Dateien gespeichert sind. Programme können Daten aus Dateien lesen und die berechneten Ergebnisse in Dateien schreiben. Selbst große Datenmengen lassen sich durch die Verwendung von Dateien leicht automatisch verarbeiten.

In diesem Kurs beschäftigen wir uns ausschließlich mit _Textdateien_. Alle verwendeten Dateien bestehen aus Textzeilen. Beispielsweise arbeitet der Visual Studio Code Editor, den wir in diesem Kurs verwenden, mit Textdateien. Hinweis: Obwohl Textverarbeitungsprogramme wie Microsoft Word normalerweise für Dateien verwendet werden, die Text enthalten, sind Word-Dokumente selbst keine Textdateien. Sie enthalten auch Formatierungsinformationen und sind in einer Weise kodiert, die ihre Verarbeitung in einem Programm komplizierter macht.

## Daten aus einer Datei lesen

Lassen Sie uns zuerst mit einer Datei namens `example.txt` arbeiten, die den folgenden Inhalt hat:

<sample-data>

Hello there!
This example file contains three lines of text.
This is the last line.

</sample-data>

Eine einfache Möglichkeit, Dateien in ein Python-Programm einzubinden, ist die Verwendung der `with`-Anweisung. Die Kopfzeile öffnet die Datei, und der Block, in dem auf die Datei zugegriffen werden kann, folgt. Nach dem Block wird die Datei automatisch geschlossen und kann nicht mehr zugegriffen werden.

Der folgende Code öffnet also die Datei, liest den Inhalt, gibt ihn aus und schließt dann die Datei:

```python
with open("example.txt") as new_file:
    contents = new_file.read()
    print(contents)
```

<sample-output>

Hello there!
This example file contains three lines of text.
This is the last line.

</sample-output>

Die Variable `new_file` oben ist ein _File Handle_ (Dateizeiger). Über ihn kann auf die Datei zugegriffen werden, solange sie noch offen ist. Hier haben wir die Methode `read` verwendet, die den Inhalt der Datei als eine einzige Zeichenkette zurückgibt. In diesem Fall wäre die von `read` zurückgegebene Zeichenkette:

```
"Hello there!\nThis example file contains three lines of text.\nThis is the last line."
```

## Den Inhalt einer Datei durchlaufen

Die `read`-Methode ist nützlich, um den Inhalt der gesamten Datei auszugeben, aber häufiger werden wir die Datei Zeile für Zeile durchgehen wollen.

Textdateien können als Listen von Zeichenketten betrachtet werden, wobei jede Zeichenkette eine einzelne Zeile in der Datei darstellt. Wir können die Liste mit einer `for`-Schleife durchlaufen.

Das folgende Beispiel liest unsere Beispieldatei mit einer `for`-Schleife, entfernt Zeilenumbrüche am Ende jeder Zeile, zählt die Anzahl der Zeilen und gibt jede Zeile mit ihrer Zeilennummer aus. Es verfolgt auch die Länge der Zeilen:

```python
with open("example.txt") as new_file:
    count = 0
    total_length = 0

    for line in new_file:
        line = line.replace("\n", "")
        count += 1
        print("Zeile", count, line)
        length = len(line)
        total_length += length

print("Gesamtlänge der Zeilen:", total_length)
```

<sample-output>

Zeile 1 Hello there!
Zeile 2 This example file contains three lines of text.
Zeile 3 This is the last line.
Gesamtlänge der Zeilen: 81

</sample-output>

Am Ende jeder Zeile in der Datei befindet sich ein Zeilenumbruch `\n`, aber die `print`-Funktion fügt standardmäßig ebenfalls einen Zeilenumbruch hinzu. In der obigen Ausgabe gibt es keine zusätzlichen Zeilenumbrüche, da die Zeilenumbrüche am Ende der Zeilen mit der `replace`-Methode entfernt werden. Sie ersetzt jedes Zeilenumbruchzeichen durch eine leere Zeichenkette. Auf diese Weise werden auch die Längen der Zeilen korrekt berechnet.

<programming-exercise name='Größte Zahl' tmcname='part06-01_largest_number'>

Die Datei `numbers.txt` enthält Ganzzahlen, eine Zahl pro Zeile. Der Inhalt könnte so aussehen:

```sh
2
45
108
3
-10
1100
...etc...
```

Bitte schreiben Sie eine Funktion namens `largest`, die die Datei liest und die größte Zahl in der Datei zurückgibt.

Beachten Sie, dass die Funktion keine Argumente entgegennimmt. Die Datei, mit der Sie arbeiten, heißt immer `numbers.txt`.

**Hinweis:** Wenn Visual Studio Code die Datei nicht finden kann und Sie geprüft haben, dass keine Rechtschreibfehler vorliegen, werfen Sie einen Blick auf die Anweisungen nach dieser Übung.

</programming-exercise>

## Was ist, wenn Visual Studio Code meine Datei nicht finden kann?

Wenn Sie Ihren Code ausführen, könnte sich Visual Studio Code darüber beschweren, dass die Datei nicht gefunden wurde, obwohl Sie den Dateinamen mehrfach auf Richtigkeit geprüft haben und die Datei existiert. Das Ändern der folgenden Einstellung kann das Problem beheben:

* Öffnen Sie die Einstellungen über die Menüleiste: _File_ -> _Preferences_ -> _Settings_
* Suchen Sie die relevante Einstellung mit dem Suchbegriff "executeinfile"
* Wählen Sie den Reiter _Workspace_
* Wählen Sie die Option unter _Python_ -> _Terminal_ -> _Execute In File Dir_

Ihr Einstellungsfenster sollte nun etwa so aussehen:

<img src="6_1_1.png">

Wenn dies nicht hilft, können Sie die Datei im Verzeichnis _src_

<img src="6_1_2.png">

direkt in das Wurzelverzeichnis des Übungsverzeichnisses kopieren:

<img src="6_1_3.png">

## Debuggen von Code, der Dateien verarbeitet

Die Verwendung des Visual Studio Code [Debuggers](/part-4/1-vscode#the-built-in-debugger) bei Programmen, die Dateien verarbeiten, führt oft zu einer unschönen Fehlermeldung:

<img src="6_1_4.png">

Der Grund dafür ist, dass der Debugger immer im Wurzelverzeichnis des Übungsverzeichnisses nach Dateien sucht. Die oben erwähnte Einstellung _Execute In File Dir_ hat darauf keinen Einfluss. Die einfachste Lösung ist, die Datei einfach in das Wurzelverzeichnis des Verzeichnisses zu kopieren.

Möglicherweise müssen Sie Visual Studio Code nach dem Kopieren aller erforderlichen Dateien neu starten.

## CSV-Dateien lesen

Eine CSV-Datei, kurz für _Comma-Separated Values_ (kommagetrennte Werte), ist eine Textdatei, die durch ein vorbestimmtes Zeichen getrennte Daten enthält. Die am häufigsten verwendeten Zeichen für diesen Zweck sind das Komma `,` und das Semikolon `;`, aber jedes Zeichen ist prinzipiell möglich.

CSV-Dateien werden häufig verwendet, um Datensätze verschiedener Art zu speichern. Viele Datenbank- und Tabellenkalkulationsprogramme wie Excel können Daten im CSV-Format importieren und exportieren, was den Datenaustausch zwischen verschiedenen Systemen erleichtert.

Wir haben bereits gelernt, dass wir die Zeilen in einer Datei mit einer `for`-Schleife durchlaufen können, aber wie können wir die verschiedenen Felder in einer einzelnen Zeile trennen? Python hat eine String-Methode `split` genau für diesen Zweck. Die Methode nimmt das Trennzeichen (oder die Trennzeichen) als String-Argument entgegen und gibt den Inhalt des Ziel-Strings als Liste von Strings zurück, getrennt an dem Trennzeichen.

Ein Beispiel für die Funktionsweise der Methode:

```python
text = "monkey,banana,harpsichord"
words = text.split(",")
for word in words:
    print(word)
```

<sample-output>

monkey
banana
harpsichord

</sample-output>

Nehmen wir an, wir haben eine Datei `grades.csv`, die Namen von Studenten und die Noten enthält, die sie in einigen Kursen erhalten haben. Jede Zeile enthält die Daten eines einzelnen Studenten, und die Daten sind durch ein Semikolon getrennt.

<sample-data>

Paul;5;4;5;3;4;5;5;4;2;4
Beth;3;4;2;4;4;2;3;1;3;3
Ruth;4;5;5;4;5;5;4;5;4;4

</sample-data>

Das folgende Programm geht die Datei Zeile für Zeile durch, teilt jede Zeile in ihre Einzelteile auf und gibt den Namen und die Noten jedes Studenten aus.

```python
with open("grades.csv") as new_file:
    for line in new_file:
        line = line.replace("\n", "")
        parts = line.split(";")
        name = parts[0]
        grades = parts[1:]
        print("Name:", name)
        print("Noten:", grades)
```

<sample-output>

Name: Paul
Noten: ['5', '4', '5', '3', '4', '5', '5', '4', '2', '4']
Name: Beth
Noten: ['3', '4', '2', '4', '4', '2', '3', '1', '3', '3']
Name: Ruth
Noten: ['4', '5', '5', '4', '5', '5', '4', '5', '4', '4']

</sample-output>

<programming-exercise name='Obstmarkt' tmcname='part06-02_fruit_market'>

Die Datei `fruits.csv` enthält Namen von Früchten und deren Preise in dem in diesem Beispiel angegebenen Format:

```sh
banana;6.50
apple;4.95
orange;8.0
...etc...
```

Bitte schreiben Sie eine Funktion namens `read_fruits`, die die Datei liest und basierend auf dem Inhalt ein Dictionary zurückgibt. Im Dictionary sollte der Name der Frucht der Schlüssel sein und der Wert sollte ihr Preis sein. Preise sollten vom Typ `float` sein.

Hinweis: Die Funktion nimmt keine Argumente entgegen. Die Datei, mit der Sie arbeiten, heißt immer `fruits.csv`.

</programming-exercise>

<programming-exercise name='Matrix' tmcname='part06-03_matrix'>

Die Datei `matrix.txt` enthält eine Matrix in dem im folgenden Beispiel angegebenen Format:

```sh
1,0,2,8,2,1,3,2,5,2,2,2
9,2,4,5,2,4,2,4,1,10,4,2
...etc...
```

Bitte schreiben Sie zwei Funktionen namens `matrix_sum` und `matrix_max`. Beide durchlaufen die Matrix in der Datei und geben dann die Summe der Elemente bzw. das Element mit dem größten Wert zurück, wie die Namen der Funktionen andeuten.

Bitte schreiben Sie auch die Funktion `row_sums`, die eine Liste mit der Summe jeder Zeile in der Matrix zurückgibt. Wenn beispielsweise `row_sums` aufgerufen wird und die Matrix in der Datei wie folgt definiert ist:

```sh
1,2,3
2,3,4
```

sollte die Funktion die Liste `[6, 9]` zurückgeben.

Tipp: Sie können auch andere Hilfsfunktionen in Ihr Programm aufnehmen. Es lohnt sich sehr, einen Moment darüber nachzudenken, welche Funktionalitäten von den drei Funktionen, die Sie schreiben sollen, gemeinsam genutzt werden. Beachten Sie, dass die drei oben genannten Funktionen keine Argumente entgegennehmen, aber alle Hilfsfunktionen, die Sie schreiben, Argumente entgegennehmen können. Die Datei, mit der Sie arbeiten, heißt immer `matrix.txt`.

**Hinweis:** Wenn Visual Studio Code die Datei nicht finden kann und Sie geprüft haben, dass keine Rechtschreibfehler vorliegen, werfen Sie einen Blick auf die Anweisungen vor dieser Übung.

</programming-exercise>

## Dieselbe Datei mehrmals lesen

Manchmal ist es notwendig, den Inhalt einer Datei mehr als einmal in einem einzigen Programm zu verarbeiten. Schauen wir uns ein Programm an, das mit einigen persönlichen Daten arbeitet, die in einer CSV-Datei gespeichert sind:

<sample-data>
Peter;40;Helsinki
Emily;34;Espoo
Eric;42;London
Adam;100;Amsterdam
Alice;58;Paris
</sample-data>

```python
with open("people.csv") as new_file:
    # Namen ausgeben
    for line in new_file:
        parts = line.split(";")
        print("Name:", parts[0])

    # den Ältesten finden
    age_of_oldest = -1
    for line in new_file:
        parts = line.split(";")
        name = parts[0]
        age = int(parts[1])
        if age > age_of_oldest:
            age_of_oldest = age
            oldest = name
    print("der Älteste ist", oldest)
```

Das Ausführen dieses Programms führt zu einer etwas kryptischen Fehlermeldung:

```python
Traceback (most recent call last):
    print("der Älteste ist"; oldest)
UnboundLocalError: local variable 'oldest' referenced before assignment
```

Der Grund dafür ist, dass die zweite `for`-Schleife überhaupt nicht ausgeführt wird, da die Datei nur einmal verarbeitet werden kann. Sobald die letzte Zeile gelesen wurde, verbleibt der File Handle am Ende der Datei und auf die Daten in der Datei kann nicht mehr zugegriffen werden.

Wenn wir in der zweiten `for`-Schleife auf den Inhalt zugreifen wollen, müssen wir die Datei ein zweites Mal `open` (öffnen):

```python
with open("people.csv") as new_file:
    # Namen ausgeben
    for line in new_file:
        parts = line.split(";")
        print("Name:", parts[0])

with open("people.csv") as new_file:
    # den Ältesten finden
    age_of_oldest = -1
    for line in new_file:
        parts = line.split(";")
        name = parts[0]
        age = int(parts[1])
        if age > age_of_oldest:
            age_of_oldest = age
            oldest = name
    print("der Älteste ist", oldest)
```

Obwohl der obige Code funktionieren würde, enthält er unnötige Wiederholungen. Es ist normalerweise am besten, die Datei nur einmal zu lesen und ihren Inhalt in einem geeigneten Format für die weitere Verarbeitung zu speichern:

```python
people = []
# Inhalt der Datei lesen und in einer Liste speichern
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(";")
        people.append((parts[0], int(parts[1]), parts[2]))

# Namen ausgeben
for person in people:
    print("Name:", person[0])

# den Ältesten finden
age_of_oldest = -1
for person in people:
    name = person[0]
    age = person[1]
    if age > age_of_oldest:
        age_of_oldest = age
        oldest = name
print("der Älteste ist", oldest)
```

## Weitere CSV-Dateiverarbeitung

Fahren wir mit der Datei `grades.csv` fort, die den folgenden Inhalt hat:

<sample-data>

Paul;5;4;5;3;4;5;5;4;2;4
Beth;3;4;2;4;4;2;3;1;3;3
Ruth;4;5;5;4;5;5;4;5;4;4

</sample-data>

Das folgende Programm erstellt basierend auf dem Inhalt der Datei ein Dictionary `grades`. Die Schlüssel sind die Namen der Studenten und der jedem Schlüssel zugeordnete Wert ist die Liste der vom Studenten erreichten Noten. Das Programm wandelt die Noten in Ganzzahlwerte um, damit sie leichter verarbeitet werden können.

```python
grades = {}
with open("grades.csv") as new_file:
    for line in new_file:
        line = line.replace("\n", "")
        parts = line.split(";")
        name = parts[0]
        grades[name] = []
        for grade in parts[1:]:
            grades[name].append(int(grade))

print(grades)
```

<sample-output>

{'Paul': [5, 4, 5, 3, 4, 5, 5, 4, 2, 4], 'Beth': [3, 4, 2, 4, 4, 2, 3, 1, 3, 3], 'Ruth': [4, 5, 5, 4, 5, 5, 4, 5, 4, 4]}

</sample-output>

Jetzt können wir basierend auf dem Inhalt des Dictionaries `grades` einige Statistiken zu jedem Studenten ausgeben:

```python
for name, grade_list in grades.items():
    best = max(grade_list)
    average = sum(grade_list) / len(grade_list)
    print(f"{name}: beste Note {best}, Durchschnitt {average:.2f}")
```

<sample-output>

Paul: beste Note 5, Durchschnitt 4.10
Beth: beste Note 4, Durchschnitt 2.90
Ruth: beste Note 5, Durchschnitt 4.50

</sample-output>

Bitte schauen Sie sich das Programm im obigen Beispiel genau an. Es mag auf den ersten Blick etwas kompliziert erscheinen, aber die Technik kann auf Dateien mit vielen verschiedenen Datentypen angewendet werden.

## Unnötige Zeilen, Leerzeichen und Zeilenumbrüche entfernen

Nehmen wir an, wir haben eine CSV-Datei mit einigen Namen, die aus Excel exportiert wurde:

```sh
first; last
Paul; Python
Jean; Java
Harry; Haskell
```

Excel ist berüchtigt dafür, zusätzliche Leerzeichen hinzuzufügen. Hier haben wir ein zusätzliches Leerzeichen zwischen den Elementen, nach jedem Semikolon.

Wir möchten die Nachnamen jeder Person auf der Liste ausgeben. Die erste Zeile enthält die Überschriften für die Daten und kann sicher ignoriert werden:

```python
last_names = []
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(";")
        # Kopfzeile ignorieren
        if parts[0] == "first":
            continue
        last_names.append(parts[1])

print(last_names)
```

Die Ausführung dieses Programms würde folgendes ausgeben:

<sample-output>

[' Python\n', ' Java\n', ' Haskell']

</sample-output>

Die ersten beiden Elemente haben ein Zeilenumbruchzeichen am Ende und alle drei haben ein führendes Leerzeichen.

Wir haben bereits die `replace`-Methode verwendet, um zusätzliche Leerzeichen zu entfernen, aber eine effizientere Lösung ist die Verwendung der Python-String-Methode `strip`, die Leerzeichen am Anfang und Ende einer Zeichenkette entfernt. Sie entfernt alle Leerzeichen, Zeilenumbrüche, Tabs und andere Zeichen, die normalerweise nicht ausgedruckt würden.

Sie können es in der Python-Konsole ausprobieren:

```python
>>> " ausprobieren ".strip()
'ausprobieren'
>>> "\n\ntest\n".strip()
'test'
>>>
```

Das Strippen der Zeichenkette erfordert nur eine kleine Änderung am Programm:

```python
last_names = []
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "first":
            continue # dies war die Kopfzeile, sie wird ignoriert
        last_names.append(parts[1].strip())
print(last_names)
```

Jetzt haben wir die gewünschte saubere Ausgabe:

<sample-output>

['Python', 'Java', 'Haskell']

</sample-output>

Es gibt auch die verwandten String-Methoden `lstrip` und `rstrip`. Sie entfernen nur die führenden oder abschließenden nicht druckbaren Zeichen, l für den linken Rand der Zeichenkette und r für den rechten:

```python
>>> " teststring  ".rstrip()
' teststring'
>>> " teststring  ".lstrip()
'teststring  '
```

## Daten aus verschiedenen Dateien kombinieren

Es ist sehr häufig, dass die von einem Programm verarbeiteten Daten über mehrere Dateien verteilt sind. Schauen wir uns eine Situation an, in der die Personaldaten der Belegschaft eines Unternehmens in einer Datei namens `employees.csv` gespeichert sind:

```csv
pic;name;address;city
080488-123X;Pekka Mikkola;Vilppulantie 7;00700 Helsinki
290274-044S;Liisa Marttinen;Mannerheimintie 100 A 10;00100 Helsinki
010479-007Z;Arto Vihavainen;Pihapolku 4;01010 Kerava
010499-345K;Leevi Hellas;Tapiolantie 11 B;02000 Espoo
```

Die Gehälter sind in einer separaten Datei `salaries.csv` gespeichert:

```csv
pic;salary;bonus
080488-123X;3300;0
290274-044S;4150;200
010479-007Z;1300;1200
```

Jede Datenzeile in beiden Dateien enthält die _persönliche Identifikationsnummer_ (PIC), die identifiziert, mit wessen Daten wir es zu tun haben. Unter Verwendung der PIC als gemeinsamen Faktor ist es einfach, die Namen und Gehälter jedes Mitarbeiters zu verknüpfen. Wir können beispielsweise die folgende Liste der monatlichen Einkommen ausgeben:

<sample-output>

<pre>
incomes:
Pekka Mikkola    3300 euros
Liisa Marttinen  4350 euros
Arto Vihavainen  2500 euros
</pre>

</sample-output>

Dieses Programm verwendet zwei Dictionaries als Hilfsdatenstrukturen: `names` und `salaries`. Beide verwenden die PIC als Schlüssel:

```python
names = {}

with open("employees.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "pic":
            continue
        names[parts[0]] = parts[1]

salaries = {}

with open("salaries.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "pic":
            continue
        salaries[parts[0]] = int(parts[1]) + int(parts[2])

print("incomes:")

for pic, name in names.items():
    if pic in salaries:
        salary = salaries[pic]
        print(f"{name:16} {salary} euros")
    else:
        print(f"{name:16} 0 euros")
```

Zuerst erstellt das Programm die Dictionaries `names` und `salaries`. Sie haben den folgenden Inhalt:

```sh
{
    '080488-123X': 'Pekka Mikkola',
    '290274-044S': 'Liisa Marttinen',
    '010479-007Z': 'Arto Vihavainen',
    '010499-345K': 'Leevi Hellas'
}

{
    '080488-123X': 3300,
    '290274-044S': 4350,
    '010479-007Z': 2500
}
```

Die `for`-Schleife am Ende des Programms kombiniert die Namen der Mitarbeiter mit ihren jeweiligen Gehältern.

Das Programm berücksichtigt auch Situationen, in denen die PIC des Mitarbeiters nicht in der Gehaltsdatei vorhanden ist.

Denken Sie daran, dass die Reihenfolge, in der Elemente in einem Dictionary gespeichert werden, keine Rolle spielt, da die Schlüssel basierend auf Hash-Werten verarbeitet werden.

<programming-exercise name='Kursbewertung, Teil 1' tmcname='part06-04_course_grading_part_1'>

Dieses Programm arbeitet mit zwei CSV-Dateien. Eine davon enthält Informationen über einige Studenten eines Kurses:

```csv
id;first;last
12345678;peter;pythons
12345687;jean;javanese
12345699;alice;adder
```

Die andere enthält die Anzahl der Übungen, die jeder Student pro Woche abgeschlossen hat:

```csv
id;e1;e2;e3;e4;e5;e6;e7
12345678;4;1;1;4;5;2;4
12345687;3;5;3;1;5;4;6
12345699;10;2;2;7;10;2;2
```

Wie Sie oben sehen können, haben beide CSV-Dateien auch eine Kopfzeile, die angibt, was jede Spalte enthält.

Bitte schreiben Sie ein Programm, das den Benutzer nach den Namen dieser beiden Dateien fragt, die Dateien liest und dann die Gesamtzahl der von jedem Studenten abgeschlossenen Übungen ausgibt. Wenn die Dateien den Inhalt der obigen Beispiele haben, sollte das Programm folgendes ausgeben:

<sample-output>

Studenteninformationen: **students1.csv**
Abgeschlossene Übungen: **exercises1.csv**
pekka peloton 21
jaana javanainen 27
liisa virtanen 35

</sample-output>

Tipp: Beim Testen Ihres Programms könnten Sie schnell die Geduld verlieren, wenn Sie die Dateinamen immer an der Eingabeaufforderung eingeben müssen. Vielleicht möchten Sie die Benutzereingabe fest im Code verankern (Hardcoding), etwa so:

```python
if False:
    # dies wird nie ausgeführt
    student_info = input("Studenteninformationen: ")
    exercise_data = input("Abgeschlossene Übungen: ")
else:
    # fest kodierte Eingabe
    student_info = "students1.csv"
    exercise_data = "exercises1.csv"
```

Die eigentliche Funktionalität des Programms ist nun im `False`-Zweig einer `if`-Anweisung "versteckt". Sie wird nie ausgeführt.

Wenn Sie nun schnell überprüfen möchten, ob das Programm auch mit Benutzereingaben korrekt funktioniert, können Sie einfach `False` durch `True` ersetzen:

```python

if True:
    student_info = input("Studenteninformationen: ")
    exercise_data = input("Abgeschlossene Übungen: ")
else:
    # dies ist nun der False-Zweig und wird nie ausgeführt
    student_info = "students1.csv"
    exercise_data = "exercises1.csv"
```

Wenn Sie überprüft haben, dass Ihr Programm korrekt funktioniert, können Sie die `if`-Struktur entfernen und die Befehle beibehalten, die nach der Eingabe fragen.

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

**Hinweis 2:** Wenn Visual Studio die Datei nicht finden kann und Sie geprüft haben, dass keine Rechtschreibfehler vorliegen, werfen Sie einen Blick auf [diese Anweisungen](/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

</programming-exercise>

<programming-exercise name='Kursbewertung, Teil 2' tmcname='part06-05_course_grading_part_2'>

Erweitern wir das in der vorherigen Übung erstellte Programm. Nun sind auch die Prüfungspunkte, die jedem Studenten verliehen wurden, in einer CSV-Datei enthalten. Der Inhalt der Datei folgt diesem Format:

```csv
id;e1;e2;e3
12345678;4;1;4
12345687;3;5;3
12345699;10;2;2
```

Im obigen Beispiel erhielt der Student mit der Matrikelnummer 12345678 in der Prüfung 4+1+4 Punkte, was einer Gesamtzahl von 9 Punkten entspricht. 

Das Programm sollte den Benutzer erneut nach den Namen der Dateien fragen. Dann sollte das Programm die Dateien verarbeiten und für jeden Studenten eine Note ausgeben.

<sample-output>

Studenteninformationen: **students1.csv**
Abgeschlossene Übungen: **exercises1.csv**
Prüfungspunkte: **exam_points1.csv**
pekka peloton 0
jaana javanainen 1
liisa virtanen 3

</sample-output>

Jede abgeschlossene Übung wird auf die _Übungspunkte_ angerechnet, sodass das Abschließen von mindestens 10 % der gesamten Übungen 1 Punkt ergibt, das Abschließen von mindestens 20 % 2 Punkte ergibt usw. Das Abschließen aller 40 Übungen ergibt 10 Punkte. Die Anzahl der vergebenen Punkte ist immer eine Ganzzahl.

Die Endnote für den Kurs wird basierend auf der Summe aus Prüfungs- und Übungspunkten gemäß der folgenden Tabelle ermittelt:

Prüfungspunkte + Übungspunkte   | Note
:--:|:----:
0-14 | 0 (nicht bestanden)
15-17 | 1
18-20 | 2
21-23 | 3
24-27 | 4
28- | 5

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

</programming-exercise>

<programming-exercise name='Kursbewertung, Teil 3' tmcname='part06-06_course_grading_part_3'>

Diese Übung baut auf der vorherigen auf. Nun sollen wir einige Statistiken basierend auf den CSV-Dateien ausgeben.

<sample-output>

Studenteninformationen: **students1.csv**
Abgeschlossene Übungen: **exercises1.csv**
Prüfungspunkte: **exam_points1.csv**
<pre>
name                          exec_nbr  exec_pts. exm_pts.  tot_pts.  grade
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
</pre>

</sample-output>

Jede Zeile enthält die Informationen für einen einzelnen Studenten. Die Anzahl der abgeschlossenen Übungen, die Anzahl der vergebenen Übungspunkte, die Anzahl der vergebenen Prüfungspunkte, die Gesamtzahl der vergebenen Punkte und die Note werden alle in sauberen Spalten angezeigt. Die Breite der Spalte für den Namen sollte 30 Zeichen betragen, während die anderen Spalten 10 Zeichen breit sein sollten.

Vielleicht finden Sie die in [Teil 4](/part-4/5-print-statement-formatting) behandelten f-Strings hier nützlich.

f-Strings unterscheiden zwischen Zeichenketten und Zahlen, wenn es um die Ausrichtung von Spalten geht:

```python
word = "python"
print(f"{word:10}continues")
print(f"{word:>10}continues")
```

<sample-output>

<pre>
python    continues
    pythoncontinues
</pre>

</sample-output>

Wie Sie oben sehen können, werden Zeichenketten standardmäßig am _linken_ Rand des für sie spezifizierten Bereichs ausgerichtet. Das Symbol `>` kann verwendet werden, um am rechten Rand auszurichten.

Bei Zahlenwerten ist die Logik umgekehrt:

```python
number = 42
print(f"{number:10}continues")
print(f"{number:<10}continues")
```

<sample-output>

<pre>
        42continues
42        continues
</pre>

</sample-output>

Bei Zahlen ist das Standardverhalten die Ausrichtung am _rechten_ Rand. Das Symbol `<` kann verwendet werden, um am linken Rand auszurichten.

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

</programming-exercise>

<programming-exercise name='Rechtschreibprüfung' tmcname='part06-07_spellchecker'>

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, einen Text einzugeben. Ihr Programm sollte dann eine Rechtschreibprüfung durchführen und dem Benutzer Feedback geben, sodass alle falsch geschriebenen Wörter von Sternchen umgeben sind. Bitte sehen Sie sich die beiden folgenden Beispiele an:

<sample-output>

Text schreiben: **We use ptython to make a spell checker**
<pre>
We use *ptython* to make a spell checker
</pre>

</sample-output>

<sample-output>

Text schreiben: **This is acually a good and usefull program**
<pre>
This is *acually* good and *usefull* program
</pre>

</sample-output>

Die Groß- und Kleinschreibung der Buchstaben sollte für die Funktion Ihres Programms irrelevant sein.

Die Übungsvorlage enthält die Datei `wordlist.txt`, die alle Wörter enthält, die die Rechtschreibprüfung als korrekt akzeptieren sollte.

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

**Hinweis 2:** Wenn Visual Studio die Datei nicht finden kann und Sie geprüft haben, dass keine Rechtschreibfehler vorliegen, werfen Sie einen Blick auf [diese Anweisungen](/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

</programming-exercise>

<programming-exercise name='Rezeptsuche' tmcname='part06-08_recipe_search'>

In dieser Übung geht es darum, ein Programm zu erstellen, das es dem Benutzer ermöglicht, nach Rezepten basierend auf deren Namen, Zubereitungszeiten oder verwendeten Zutaten zu suchen. Das Programm sollte die Rezepte aus einer vom Benutzer übermittelten Datei lesen.

Jedes Rezept besteht aus drei oder mehr Zeilen. Die erste Zeile enthält den Namen des Rezepts, die zweite Zeile enthält eine Ganzzahl, die die Zubereitungszeit in Minuten darstellt, und die verbleibende Zeile oder Zeilen enthalten die verwendeten Zutaten, eine pro Zeile. Das Rezept endet mit einer Leerzeile, mit Ausnahme des letzten Rezepts in der Datei, das einfach mit dem Ende der Datei endet. Es können also mehr als ein Rezept in einer einzigen Datei stehen, wie im folgenden Beispiel.

```sh
Pancakes
15
milk
eggs
flour
sugar
salt
butter

Meatballs
45
mince
eggs
breadcrumbs

Tofu rolls
30
tofu
rice
water
carrot
cucumber
avocado
wasabi

Cake pops
60
milk
bicarbonate
eggs
salt
sugar
cardamom
butter
```

**Tipp:** Es könnte am besten sein, zuerst alle Zeilen in der Datei zu lesen und sie in eine Liste zu packen, die dann einfacher auf die in der Übung beschriebene Weise manipuliert werden kann.

#### Suche nach Rezepten basierend auf dem Namen des Rezepts 

Bitte schreiben Sie eine Funktion namens `search_by_name(filename: str, word: str)`, die einen Dateinamen und einen Suchstring als Argumente entgegennimmt. Die Funktion sollte die Datei durchgehen und alle Rezepte auswählen, deren _Name_ den angegebenen Suchstring enthält. Die Namen dieser Rezepte werden dann in einer Liste zurückgegeben.

Ein Beispiel für die Funktion in Aktion:

```python
found_recipes = search_by_name("recipes1.txt", "cake")

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes
Cake pops

</sample-output>

Wie Sie im obigen Beispiel sehen können, ist die Groß- und Kleinschreibung der Buchstaben irrelevant. Der Suchbegriff _cake_ gibt sowohl _Pancakes_ als auch _Cake pops_ zurück, obwohl letzteres großgeschrieben wird.

**Hinweis:** Wenn Visual Studio die Datei nicht finden kann und Sie geprüft haben, dass keine Rechtschreibfehler vorliegen, werfen Sie einen Blick auf [diese Anweisungen](/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

#### Suche nach Rezepten basierend auf der Zubereitungszeit

Bitte schreiben Sie eine Funktion namens `search_by_time(filename: str, prep_time: int)`, die einen Dateinamen und eine Ganzzahl als Argumente entgegennimmt. Die Funktion sollte die Datei durchgehen und alle Rezepte auswählen, deren Zubereitungszeit höchstens die angegebene Zahl beträgt.

Die Namen dieser Rezepte werden wieder in einer Liste zurückgegeben, aber die Zubereitungszeit sollte an jeden Namen angehängt werden. Bitte schauen Sie sich das folgende Beispiel an.

```python
found_recipes = search_by_time("recipes1.txt", 20)

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes, preparation time 15 min

</sample-output>

#### Suche nach Rezepten basierend auf den Zutaten

**Ein Wort der Vorsicht:** Dieser dritte Teil der Übung ist wesentlich anspruchsvoller als die vorherigen beiden. Wenn Sie das Gefühl haben, dass Sie nicht vorankommen, kann es sich lohnen, weiterzumachen, die anderen Übungen in diesem Teil des Materials abzuschließen und dann zu dieser Übung zurückzukehren, wenn Sie später Zeit haben. Denken Sie daran, dass Sie die ersten beiden Teile dieser Übung einreichen und Punkte dafür erhalten können, auch wenn Sie den dritten Teil nicht abgeschlossen haben.

Bitte schreiben Sie eine Funktion namens `search_by_ingredient(filename: str, ingredient: str)`, die einen Dateinamen und einen Suchstring als Argumente entgegennimmt. Die Funktion sollte die Datei durchgehen und alle Rezepte auswählen, deren _Zutaten_ den angegebenen Suchstring enthalten.

Die Namen dieser Rezepte werden in einer Liste zurückgegeben, genau wie im zweiten Teil, mit angehängter Zubereitungszeit. Bitte schauen Sie sich das folgende Beispiel an.

```python
found_recipes = search_by_ingredient("recipes1.txt", "eggs")

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes, preparation time 15 min
Meatballs, preparation time 45 min
Cake pops, preparation time 60 min

</sample-output>

</programming-exercise>

<programming-exercise name='Stadträder' tmcname='part06-09_city_bikes'>

In dieser Übung werden wir einige Funktionen für die Arbeit mit einer Datei schreiben, die Standortdaten von den Stationen für [Stadträder in Helsinki](https://www.hsl.fi/en/citybikes) enthält.

Jede Datei folgt diesem Format:

```csv
Longitude;Latitude;FID;name;total_slot;operative;id
24.950292890004903;60.155444793742276;1;Kaivopuisto;30;Yes;001
24.956347471358754;60.160959093887129;2;Laivasillankatu;12;Yes;002
24.944927399779715;60.158189199971673;3;Kapteeninpuistikko;16;Yes;003
```

Jede Station hat eine einzelne Zeile in der Datei. Die Zeile enthält die Koordinaten, den Namen und andere identifizierende Informationen für die Station.

#### Entfernung zwischen Stationen

Schreiben Sie zuerst eine Funktion namens `get_station_data(filename: str)`. Diese Funktion sollte die Namen und Standorte aller Stationen in der Datei lesen und sie in einem Dictionary mit dem folgenden Format zurückgeben:

<sample-output>

<pre>
{
  "Kaivopuisto": (24.950292890004903, 60.155444793742276),
  "Laivasillankatu": (24.956347471358754, 60.160959093887129),
  "Kapteeninpuistikko": (24.944927399779715, 60.158189199971673)
}
</pre>

</sample-output>

Die Dictionary-Schlüssel sind die Namen der Stationen, und der angehängte Wert ist ein Tuple, das die Standortkoordinaten der Station enthält. Das erste Element im Tuple ist das Feld _Longitude_ und das zweite das Feld _Latitude_.

Schreiben Sie als Nächstes eine Funktion namens `distance(stations: dict, station1: str, station2: str)`, die die Entfernung zwischen den beiden als Argumente angegebenen Stationen zurückgibt.

Die Entfernung wird mit dem Satz des Pythagoras berechnet. Die untenstehenden Multiplikationsfaktoren sind ungefähre Werte für die Umrechnung von Breiten- und Längengraden in Entfernungen in Kilometern in der Region Helsinki.

```python
# wir benötigen die Funktion sqrt aus dem math-Modul 
import math

x_km = (longitude1 - longitude2) * 55.26
y_km = (latitude1 - latitude2) * 111.2
distance_km = math.sqrt(x_km**2 + y_km**2)
```

Einige Beispiele für die Funktion in Aktion:

```python
stations = get_station_data('stations1.csv')
d = distance(stations, "Designmuseo", "Hietalahdentori")
print(d)
d = distance(stations, "Viiskulma", "Kaivopuisto")
print(d)
```

<sample-output>

0.9032737292463177
0.7753594392019532

</sample-output>

**Hinweis:** Wenn Visual Studio die Datei nicht finden kann und Sie geprüft haben, dass keine Rechtschreibfehler vorliegen, werfen Sie einen Blick auf [diese Anweisungen](/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

#### Die größte Entfernung

Bitte schreiben Sie eine Funktion namens `greatest_distance(stations: dict)`, die die zwei Stationen auf der Liste ermittelt, die die größte Entfernung voneinander haben. Die Funktion sollte ein Tuple zurückgeben, wobei die ersten beiden Elemente die Namen der beiden Stationen sind und das dritte Element die Entfernung zwischen den beiden ist.

```python
stations = get_station_data('stations1.csv')
station1, station2, greatest = greatest_distance(stations)
print(station1, station2, greatest)
```

<sample-output>

Laivasillankatu Hietalahdentori 1.478708873076181

</sample-output>

</programming-exercise>
