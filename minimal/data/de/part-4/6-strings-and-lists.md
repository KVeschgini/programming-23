---
path: '/part-4/6-strings-and-lists'
title: 'Mehr über Zeichenketten und Listen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie mit weiteren Methoden zum Slicing von Zeichenketten und Listen vertraut sein
- werden Sie verstehen, was die Unveränderlichkeit (Immutability) von Zeichenketten bedeutet
- werden Sie in der Lage sein, die Methoden `count` und `replace` zu verwenden

</text-box>

Sie sind bereits mit der `[]`-Syntax für den Zugriff auf einen Teil einer Zeichenkette vertraut:

```python
my_string = "exemplary"
print(my_string[3:7])
```

<sample-output>

mpla

</sample-output>

Die gleiche Syntax funktioniert auch bei Listen. Listen können genau wie Zeichenketten geschnitten (sliced) werden:

```python
my_list = [3,4,2,4,6,1,2,4,2]
print(my_list[3:7])
```

<sample-output>

[4, 6, 1, 2]

</sample-output>

## Mehr über Slices

Tatsächlich funktioniert die `[]`-Syntax sehr ähnlich wie die `range`-Funktion, was bedeutet, dass wir ihr auch einen Schritt (step) übergeben können:

```python
my_string = "exemplary"
print(my_string[0:7:2])
my_list = [1,2,3,4,5,6,7,8]
print(my_list[6:2:-1])
```

<sample-output>

eepa
[7, 6, 5, 4]

</sample-output>

Wenn wir einen der Indizes weglassen, schließt der Operator standardmäßig alles ein. Dies ermöglicht uns unter anderem, ein sehr kurzes Programm zu schreiben, um eine Zeichenkette umzudrehen:

```python
my_string = input("Bitte geben Sie eine Zeichenkette ein: ")
print(my_string[::-1])
```

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **exemplary**
yralpmexe

</sample-output>

## Warnung: Verwendung globaler Variablen innerhalb von Funktionen

Wir wissen, dass es möglich ist, neue Variablen innerhalb von Funktionsdefinitionen zuzuweisen, aber die Funktion kann auch Variablen sehen, die außerhalb von ihr, in der Hauptfunktion, zugewiesen wurden. Solche Variablen werden _globale_ Variablen genannt.

Die Verwendung globaler Variablen innerhalb von Funktionen ist normalerweise eine schlechte Idee. Dies kann unter anderem zu Fehlern führen, die schwer nachzuvollziehen sind.

Unten ist ein Beispiel für eine Funktion, die "versehentlich" eine globale Variable verwendet:

```python
def print_reversed(names: list):
    # Versehentliche Verwendung der globalen Variable anstelle des Parameters
    i = len(name_list) - 1
    while i >= 0:
        print(name_list[i])
        i -= 1

# Hier wird die globale Variable zugewiesen
name_list = ["Steve", "Jean", "Katherine", "Paul"]
print_reversed(name_list)
print()
print_reversed(["Huey", "Dewey", "Louie"])
```

<sample-output>

Paul
Katherine
Jean
Steve

Paul
Katherine
Jean
Steve

</sample-output>

Obwohl beide Funktionsaufrufe die richtige Art von Argument haben, gibt die Funktion immer das aus, was in der globalen Variable `name_list` gespeichert ist.

Um die Sache noch unübersichtlicher zu machen, denken Sie daran, dass der gesamte Code zum Testen Ihrer Funktionen für die automatischen Tests in den `if __name__ == "__main__":`-Block gesetzt werden sollte. Das vorherige Beispiel sollte wie folgt geändert werden:

```python
def print_reversed(names: list):
    # Versehentliche Verwendung der globalen Variable anstelle des Parameters
    i = len(name_list) - 1
    while i >= 0:
        print(name_list[i])
        i -= 1

# Der gesamte Code zum Testen der Funktion sollte in diesem Block stehen
if __name__ == "__main__":
    # Hier wird die globale Variable zugewiesen
    name_list = ["Steve", "Jean", "Katherine", "Paul"]
    print_reversed(name_list)
    print()
    print_reversed(["Huey", "Dewey", "Louie"])
```

Beachten Sie, dass die globale Variable nun innerhalb des `if`-Blocks zugewiesen wird.

Die automatischen Tests im TMC-System werden ausgeführt, ohne dass der Code im `if`-Block ausgeführt wird. In diesem letzten Beispiel würde die Funktion also nicht einmal theoretisch funktionieren, da sie sich auf die Variable `name_list` bezieht, die überhaupt nicht existiert, wenn die Tests ausgeführt werden.

<programming-exercise name='Alles umgedreht' tmcname='part04-33_everything_reversed'>

Bitte schreiben Sie eine Funktion namens `everything_reversed`, die eine Liste von Zeichenketten als Argument entgegennimmt. Die Funktion gibt eine neue Liste zurück, in der alle Elemente der ursprünglichen Liste umgedreht sind. Auch die Reihenfolge der Elemente in der neuen Liste soll umgekehrt sein.

Ein Beispiel für die Funktionsweise:

```python
my_list = ["Hallo", "da", "Beispiel", "noch eins"]
new_list = everything_reversed(my_list)
print(new_list)
```

<sample-output>

['snie hcon', 'leipsieB', 'ad', 'ollaH']

</sample-output>

</programming-exercise>

## Zeichenketten sind unveränderlich

Zeichenketten und Listen haben viel gemeinsam, insbesondere in der Art und Weise, wie sie sich mit verschiedenen Operatoren verhalten. Der Hauptunterschied besteht darin, dass Zeichenketten _unveränderlich_ (immutable) sind. Das bedeutet, dass sie nicht geändert werden können.

```python
my_string = "exemplary"
my_string[0] = "a"
```

Zeichenketten können nicht geändert werden, daher verursacht die Ausführung dieses Programms einen Fehler:

<sample-output>

TypeError: 'str' object does not support item assignment

</sample-output>

Ein ähnlicher Fehler folgt, wenn Sie versuchen, eine Zeichenkette mit der Methode `sort` zu sortieren.

Zeichenketten selbst sind unveränderlich, aber die Variablen, die sie halten, sind es nicht. Eine Zeichenkette kann durch eine andere Zeichenkette ersetzt werden.

Die folgenden zwei Beispiele sind daher grundlegend verschieden:

```python
my_list = [1, 2, 3]
my_list[0] = 10
```

<img src="4_6_1.png">

```python
my_string = "Hey"
my_string = my_string + "!"
```

<img src="4_6_2.png">

Das erste Beispiel ändert den Inhalt der referenzierten Liste. Das zweite Beispiel ersetzt die Referenz auf die ursprüngliche Zeichenkette durch eine Referenz auf eine andere Zeichenkette. Die ursprüngliche Zeichenkette befindet sich zwar noch irgendwo im Computerspeicher, aber es gibt keine Referenz mehr auf sie, und sie kann im Programm nicht mehr verwendet werden.

Wir werden auf dieses Thema im nächsten Teil zurückkommen, in dem Referenzen auf Listen ausführlicher untersucht werden.

## Weitere Methoden für Listen und Zeichenketten

Die Methode `count` zählt, wie oft das angegebene Element oder die Teilzeichenkette im Ziel vorkommt. Die Methode funktioniert bei Zeichenketten und Listen gleichermaßen:

```python
my_string = "Wie viel Holz würde ein Murmeltier nagen, wenn ein Murmeltier Holz nagen könnte"
print(my_string.count("en"))

my_list = [1, 2, 3, 1, 4, 5, 1, 6]
print(my_list.count(1))
```

<sample-output>

4
3

</sample-output>

Die Methode zählt keine überlappenden Vorkommen. In der Zeichenkette `aaaa` zählt die Methode beispielsweise nur zwei Vorkommen der Teilzeichenkette `aa`, obwohl es eigentlich drei wären, wenn überlappende Vorkommen erlaubt wären.

Die Methode `replace` erstellt eine neue Zeichenkette, in der eine angegebene Teilzeichenkette durch eine andere Zeichenkette ersetzt wird:

```python
my_string = "Hallo da"
new_string = my_string.replace("Hallo", "Hey")
print(new_string)
```

<sample-output>

Hey da

</sample-output>

Die Methode ersetzt alle Vorkommen der Teilzeichenkette:

```python
sentence = "sheila verkauft muscheln am meeresufer"
print(sentence.replace("muscheln", "MUSCHELN"))
```

<sample-output>

sheila verkauft MUSCHELN am meeresufer

</sample-output>

Bei der Verwendung der Methode `replace` ist ein typischer Fehler zu vergessen, dass Zeichenketten unveränderlich sind:

```python
my_string = "Python macht Spaß"

# Ersetzt die Teilzeichenkette, speichert das Ergebnis aber nicht...
my_string.replace("Python", "Java")
print(my_string)
```

<sample-output>

Python macht Spaß

</sample-output>

Wenn die alte Zeichenkette nicht mehr benötigt wird, kann die neue Zeichenkette derselben Variablen zugewiesen werden:

```python
my_string = "Python macht Spaß"

# Ersetzt die Teilzeichenkette und speichert das Ergebnis in derselben Variablen
my_string = my_string.replace("Python", "Java")
print(my_string)
```

<sample-output>

Java macht Spaß

</sample-output>

<programming-exercise name='Häufigstes Zeichen' tmcname='part04-34_most_common_character'>

Bitte schreiben Sie eine Funktion namens `most_common_character`, die ein Zeichenketten-Argument entgegennimmt. Die Funktion gibt das Zeichen zurück, das am häufigsten in der Zeichenkette vorkommt. Wenn es mehrere Zeichen mit gleich vielen Vorkommen gibt, soll dasjenige zurückgegeben werden, das zuerst in der Zeichenkette erscheint.

Ein Beispiel für das erwartete Verhalten:

```python
first_string = "abcdbde"
print(most_common_character(first_string))

second_string = "exemplaryelementary"
print(most_common_character(second_string))
```

<sample-output>

b
e

</sample-output>

</programming-exercise>


<programming-exercise name='Keine Vokale erlaubt' tmcname='part04-35_no_vowels_allowed'>

Bitte schreiben Sie eine Funktion namens `no_vowels`, die ein Zeichenketten-Argument entgegennimmt. Die Funktion gibt eine neue Zeichenkette zurück, die der ursprünglichen entspricht, bei der jedoch alle Vokale entfernt wurden.

Sie können davon ausgehen, dass die Zeichenkette nur Zeichen aus dem englischen Kleinbuchstaben-Alphabet a...z enthält.

Ein Beispiel für das erwartete Verhalten:

```python
my_string = "dies ist ein beispiel"
print(no_vowels(my_string))
```

<sample-output>

ds st n bspl

</sample-output>

</programming-exercise>


<programming-exercise name='Kein Schreien erlaubt' tmcname='part04-36_no_shouting_allowed'>

Die Python-String-Methode `isupper()` gibt `True` zurück, wenn eine Zeichenkette _nur_ aus Großbuchstaben besteht.

Einige Beispiele:

```python
print("XYZ".isupper())

is_it_upper = "Abc".isupper()
print(is_it_upper)
```

<sample-output>

True
False

</sample-output>

Bitte verwenden Sie die Methode `isupper`, um eine Funktion namens `no_shouting` zu schreiben, die eine Liste von Zeichenketten als Argument entgegennimmt. Die Funktion gibt eine neue Liste zurück, die nur diejenigen Elemente aus dem Original enthält, die nicht ausschließlich aus Großbuchstaben bestehen.

Ein Beispiel für das erwartete Verhalten:

```python
my_list = ["ABC", "def", "UPPER", "ANOTHERUPPER", "lower", "another lower", "Capitalized"]
pruned_list = no_shouting(my_list)
print(pruned_list)
```

<sample-output>

['def', 'lower', 'another lower', 'Capitalized']

</sample-output>

</programming-exercise>

<programming-exercise name='Nachbarn in einer Liste' tmcname='part04-37_neighbours_in_list'>

Nehmen wir an, dass in einer Liste von Ganzzahlen zwei aufeinanderfolgende Elemente Nachbarn sind, wenn ihre Differenz 1 beträgt. Die Elemente 1 und 2 wären also Nachbarn, ebenso wie die Elemente 56 und 55.

Bitte schreiben Sie eine Funktion namens `longest_series_of_neighbours`, die nach der längsten Reihe von Nachbarn in der Liste sucht und deren Länge zurückgibt.

In der Liste `[1, 2, 5, 4, 3, 4]` wäre die längste Liste von Nachbarn beispielsweise `[5, 4, 3, 4]` mit einer Länge von 4.

Ein Beispiel für einen Funktionsaufruf:

```python
my_list = [1, 2, 5, 7, 6, 5, 6, 3, 4, 1, 0]
print(longest_series_of_neighbours(my_list))
```

<sample-output>

4

</sample-output>

</programming-exercise>

## Entwicklung eines größeren Programmierprojekts

Dieser vierte Teil gipfelt in einem etwas größeren Programmierprojekt, bei dem Sie viele der bisher gelernten Techniken anwenden können.

Regel Nr. 1 bei jedem Programmierprojekt ist, nicht zu versuchen, alles auf einmal zu lösen. Das Programm sollte aus kleineren Abschnitten, wie z. B. Hilfsfunktionen, aufgebaut sein. Sie sollten die Funktionsweise jedes Teils überprüfen, bevor Sie zum nächsten übergehen. Wenn Sie versuchen, zu viel auf einmal zu bewältigen, entsteht höchstwahrscheinlich nur Chaos.

Dazu benötigen Sie eine Möglichkeit, Ihre Funktionen außerhalb der Hauptfunktion zu testen. Dies erreichen Sie, indem Sie eine Hauptfunktion explizit definieren und diese Funktion von außerhalb jeder anderen Funktion im Programm aufrufen. Ein einzelner Funktionsaufruf lässt sich dann zum Testen leicht auskommentieren. Die ersten Schritte beim Aufbau des folgenden Programmierprojekts könnten so aussehen:

```python
def main():
    points = []
    # Ihr Programmcode kommt hierhin

main()
```

Nun können die Hilfsfunktionen getestet werden, ohne die Hauptfunktion auszuführen:

```python
# Hilfsfunktion zur Bestimmung der Note basierend auf der Punktzahl
def grade(points):
    # weiterer Code

def main():
    all_points = []
    # Ihr Programmcode kommt hierhin

# Kommentieren Sie die Hauptfunktion aus
#main()

# Testen Sie die Hilfsfunktion
student_points = 35
result = grade(student_points)
print(result)
```

## Daten von einer Funktion an eine andere übergeben

Wenn ein Programm mehrere Funktionen enthält, stellt sich die Frage: Wie übergibt man Daten von einer Funktion an eine andere?

Das folgende Beispiel fordert den Benutzer zur Eingabe einiger Ganzzahlwerte auf. Das Programm gibt diese Werte dann aus und führt eine "Analyse" an ihnen durch. Das Programm ist in drei separate Funktionen unterteilt:

```python
def input_from_user(how_many: int):
    print(f"Bitte geben Sie {how_many} Zahlen ein:")
    numbers = []

    for i in range(how_many):
        number = int(input(f"Zahl {i+1}: "))
        numbers.append(number)

    return numbers

def print_result(numbers: list):
    print("Die Zahlen sind: ")
    for number in numbers:
        print(number)

def analyze(numbers: list):
    mean = sum(numbers) / len(numbers)
    return f"Es sind insgesamt {len(numbers)} Zahlen, der Mittelwert ist {mean}, die kleinste ist {min(numbers)} und die größte ist {max(numbers)}"

# Die "Hauptfunktion", die diese Funktionen verwendet
inputs = input_from_user(5)
print_result(inputs)
analysis_result = analyze(inputs)
print(analysis_result)
```

Wenn das Programm ausgeführt wird, könnte es so ablaufen:

<sample-output>

Bitte geben Sie 5 Zahlen ein:
Zahl 1: **10**
Zahl 2: **34**
Zahl 3: **-32**
Zahl 4: **99**
Zahl 5: **-53**
Die Zahlen sind:
10
34
-32
99
-53
Es sind insgesamt 5 Zahlen, der Mittelwert ist 11.6, die kleinste ist -53 und die größte ist 99

</sample-output>

Die Idee hier ist, dass die Hauptfunktion alle vom Programm verarbeiteten Daten "speichert". In diesem Fall ist lediglich die Benutzereingabe in der Variablen `inputs` erforderlich.

Wenn die Eingabe in einer Funktion benötigt wird, wird sie als Argument übergeben. Dies geschieht bei den Funktionen `print_result` und `analyze`. Wenn die Funktion Daten erzeugt, die an anderer Stelle im Programm benötigt werden, gibt die Funktion diese mit dem `return`-Befehl zurück, und sie werden in einer Variablen in der Hauptfunktion gespeichert. Dies geschieht bei den Funktionen `input_from_user` und `analyze`.

Sie könnten die globale Variable `inputs` aus der Hauptfunktion direkt in den Hilfsfunktionen verwenden. Wir haben bereits besprochen, warum das eine schlechte Idee ist, aber [hier ist eine weitere Erklärung](https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil). Wenn Funktionen in der Lage sind, eine globale Variable zu ändern, können unerwartete Dinge im Programm passieren, insbesondere wenn die Anzahl der Funktionen groß wird.

Die Übergabe von Daten in und aus Funktionen wird am besten über Argumente und Rückgabewerte gehandhabt.

Sie könnten die implizite Hauptfunktion im obigen Beispiel auch in eine eigene Funktion auslagern. Dann wäre die Variable `inputs` keine globale Variable mehr, sondern eine lokale Variable innerhalb der `main`-Funktion:

```python
# Ihre Hauptfunktion kommt hierhin
def main():
    inputs = input_from_user(5)
    print_result(inputs)
    analysis_result = analyze(inputs)

    print(analysis_result)

# Führen Sie die Hauptfunktion aus
main()
```

<programming-exercise name='Notenstatistik' tmcname='part04-38_grade_statistics'>

In dieser Übung schreiben Sie ein Programm zur Ausgabe von Notenstatistiken für einen Universitätskurs.

Das Programm fragt den Benutzer nach den Ergebnissen verschiedener Studenten des Kurses. Dazu gehören Prüfungspunkte und die Anzahl der absolvierten Übungen. Das Programm gibt dann Statistiken basierend auf den Ergebnissen aus.

Prüfungspunkte sind Ganzzahlen zwischen 0 und 20. Die Anzahl der absolvierten Übungen ist eine Ganzzahl zwischen 0 und 100.

Das Programm fragt so lange nach Eingaben, bis der Benutzer eine leere Zeile eingibt. Sie können davon ausgehen, dass alle Zeilen gültige Eingaben enthalten, d. h. dass sich auf jeder Zeile zwei Ganzzahlen befinden oder die Zeile leer ist.

Ein Beispiel für die Dateneingabe:

<sample-output>

Prüfungspunkte und absolvierte Übungen: **15 87**
Prüfungspunkte und absolvierte Übungen: **10 55**
Prüfungspunkte und absolvierte Übungen: **11 40**
Prüfungspunkte und absolvierte Übungen: **4 17**
Prüfungspunkte und absolvierte Übungen:
Statistik:

</sample-output>

Wenn der Benutzer eine leere Zeile eingibt, gibt das Programm Statistiken aus. Diese sind wie folgt formuliert:

Die absolvierten Übungen werden in _Übungspunkte_ umgerechnet, sodass das Absolvieren von mindestens 10 % der Übungen einen Punkt ergibt, 20 % zwei Punkte usw. Das Absolvieren aller 100 Übungen ergibt 10 Übungspunkte. Die Anzahl der vergebenen Übungspunkte ist ein ganzzahliger Wert, abgerundet.

Die Note für den Kurs wird basierend auf der folgenden Tabelle ermittelt:

Prüfungspunkte + Übungspunkte | Note
:--:|:----:
0–14 | 0 (d. h. nicht bestanden)
15–17 | 1
18–20 | 2
21–23 | 3
24–27 | 4
28–30 | 5

Es gibt auch eine Prüfungsschwelle. Wenn ein Student weniger als 10 Punkte in der Prüfung erreicht hat, fällt er automatisch durch den Kurs, unabhängig von seiner Gesamtpunktzahl.

Mit der obigen Beispiel-Eingabe würde das Programm die folgende Statistik ausgeben:

<sample-output>

<pre>
Statistik:
Punktedurchschnitt: 14.5
Bestehensquote: 75.0
Notenverteilung:
  5:
  4:
  3: *
  2:
  1: **
  0: *
</pre>

</sample-output>

Gleitkommazahlen sollten mit einer Nachkommastelle ausgegeben werden.

**Hinweis:** Diese Übung verlangt nicht, dass Sie bestimmte Funktionen schreiben, daher sollten Sie keinen Code in einen `if __name__ == "__main__"`-Block setzen. Wenn sich Funktionalität in Ihrem Programm z. B. in der `main`-Funktion befindet, sollten Sie den Code, der diese Funktion aufruft, normal einfügen und ihn nicht in einen `if`-Block wie in den Übungen setzen, die bestimmte Funktionen spezifizieren.

**Hinweis:**

Die Benutzereingabe in diesem Programm besteht aus Zeilen mit zwei ganzzahligen Werten:

<sample-output>

Prüfungspunkte und absolvierte Übungen: **15 87**

</sample-output>

Sie müssen zuerst die Eingabezeile in zwei Teile aufteilen und dann die Abschnitte mit der `int`-Funktion in Ganzzahlen umwandeln. Das Aufteilen der Eingabe kann auf die gleiche Weise wie in der Übung [Erstes, zweites und letztes Wort](/part-4/2-more-functions#programming-exercise-erstes-zweites-und-letztes-wort) erreicht werden, aber es gibt auch einen einfacheren Weg. Die String-Methode `split` zerlegt die Eingabe sehr schön. Weitere Informationen finden Sie, wenn Sie online nach *python string split* suchen.

</programming-exercise>
