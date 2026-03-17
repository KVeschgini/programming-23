---
path: '/part-6/2-writing-files'
title: 'Dateien schreiben'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man Dateien mit Python-Code erstellt
- werden Sie in der Lage sein, textbasierte Daten in eine Datei zu schreiben
- werden Sie wissen, wie man eine CSV-Datei erstellt

</text-box>

Bisher haben wir Daten aus Dateien gelesen, aber es ist natürlich auch möglich, Daten in Dateien zu schreiben. Typischerweise verarbeitet ein Programm Daten und speichert die Ergebnisse in einer Datei, damit sie später verwendet oder von einem anderen Programm weiterverarbeitet werden können.

Wir können jedes Mal eine neue Datei erstellen, wenn wir Daten in eine Datei schreiben wollen, aber wir können auch neue Daten an das Ende einer bestehenden Datei anhängen. In beiden Fällen verwenden wir die `open`-Funktion aus dem vorherigen Abschnitt. Zum Schreiben von Dateien benötigt die Funktion ein zweites Argument.

## Eine neue Datei erstellen

Wenn Sie eine neue Datei erstellen möchten, rufen Sie die `open`-Funktion mit dem zusätzlichen Argument `"w"` auf, um anzuzeigen, dass die Datei im Schreibmodus (write mode) geöffnet werden soll. Der Funktionsaufruf könnte also so aussehen:

```python
with open("new_file.txt", "w") as my_file:
    # Code, um etwas in die Datei zu schreiben
```

**Hinweis: Wenn die Datei bereits existiert, wird der gesamte Inhalt überschrieben.** Es lohnt sich, beim Erstellen neuer Dateien sehr vorsichtig zu sein.

Wenn die Datei geöffnet ist, können Sie Daten hineinschreiben. Dazu verwenden Sie die Methode `write`, die die zu schreibende Zeichenkette als Argument entgegennimmt.

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!")
```

Wenn Sie das Programm ausführen, erscheint eine neue Datei namens `new_file.txt` im Verzeichnis. Der Inhalt würde so aussehen:

<sample-data>

Hello there!

</sample-data>

Wenn Sie Zeilenumbrüche in der Datei wünschen, müssen Sie diese von Hand hinzufügen - die `write`-Funktion arbeitet nicht genau wie die vertrautere `print`-Funktion, obwohl sie ähnlich sind. Das folgende Programm

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!")
    my_file.write("This is the second line")
    my_file.write("This is the last line")
```

würde zu einer Datei mit diesem Inhalt führen:

<sample-data>

Hello there!This is the second lineThis is the last line

</sample-data>

Zeilenumbrüche werden erreicht, indem man Zeilenumbruchzeichen `\n` zu den Argument-Strings hinzufügt:

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!\n")
    my_file.write("This is the second line\n")
    my_file.write("This is the last line\n")
```

Nun würde der Inhalt von `new_file.txt` so aussehen:

<sample-data>

Hello there!
This is the second line
This is the last line

</sample-data>

<programming-exercise name='Inschrift' tmcname='part06-10_inscription'>

Bitte schreiben Sie ein Programm, das nach dem Namen des Benutzers fragt und dann eine "Inschrift" in einer vom Benutzer angegebenen Datei erstellt. Bitte sehen Sie sich das folgende Beispiel an.

<sample-output>

Für wen soll ich dies signieren: **Ada**
Wo soll ich es speichern: **inscribed.txt**

</sample-output>

Der Inhalt der Datei `inscribed.txt` wäre:

<sample-data>

Hi Ada, we hope you enjoy learning Python with us! Best, Mooc.fi Team

</sample-data>

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

</programming-exercise>

## Daten an eine bestehende Datei anhängen

Wenn Sie Daten an das Ende einer Datei anhängen möchten, anstatt die gesamte Datei zu überschreiben, sollten Sie die Datei im Anhängemodus (append mode) mit dem Argument `"a"` öffnen.

Wenn die Datei noch nicht existiert, funktioniert der Anhängemodus genau wie der Schreibmodus.

Das folgende Programm öffnet die Datei `new_file.txt` und hängt ein paar Textzeilen am Ende an:

```python
with open("new_file.txt", "a") as my_file:
    my_file.write("This is the 4th line\n")
    my_file.write("And yet another line.\n")
```

Nachdem dieses Programm ausgeführt wurde, würde der Inhalt der Datei so aussehen:

<sample-output>

Hello there!
This is the second line
This is the last line
This is the 4th line
And yet another line.

</sample-output>

In der Programmierpraxis ist das Anhängen von Daten an Dateien keine sehr häufige Aufgabe.

Häufiger wird eine Datei gelesen, verarbeitet und in ihrer Gesamtheit überschrieben. Wenn sich beispielsweise der Inhalt in der _Mitte_ der Datei ändern soll, ist es meist am einfachsten, die gesamte Datei zu überschreiben.

<programming-exercise name='Tagebuch' tmcname='part06-11_diary'>

Bitte schreiben Sie ein Programm, das als einfaches Tagebuch fungiert. Die Tagebucheinträge sollen in der Datei `diary.txt` gespeichert werden. Wenn das Programm ausgeführt wird, sollte es zuerst alle bereits in der Datei vorhandenen Einträge lesen.

Hinweis: Die automatischen Tests für diese Übung werden den Inhalt der Datei ändern. Wenn Sie den Inhalt behalten möchten, erstellen Sie zuerst eine Kopie der Datei unter einem anderen Namen.

Das Programm sollte wie folgt funktionieren:

<sample-output>

1 - Eintrag hinzufügen, 2 - Einträge lesen, 0 - Beenden
Funktion: **1**
Tagebucheintrag: **Heute habe ich Haferbrei gegessen**
Tagebuch gespeichert

1 - Eintrag hinzufügen, 2 - Einträge lesen, 0 - Beenden
Funktion: **2**
Einträge:
Heute habe ich Haferbrei gegessen
1 - Eintrag hinzufügen, 2 - Einträge lesen, 0 - Beenden
Funktion: **1**
Tagebucheintrag: **Ich war am Abend in der Sauna**
Tagebuch gespeichert

1 - Eintrag hinzufügen, 2 - Einträge lesen, 0 - Beenden
Funktion: **2**
Einträge:
Heute habe ich Haferbrei gegessen
Ich war am Abend in der Sauna
1 - Eintrag hinzufügen, 2 - Einträge lesen, 0 - Beenden
Funktion: **0**
Bis bald!

</sample-output>

Wenn das Programm zum zweiten Mal ausgeführt wird, sollte dies passieren:

<sample-output>

1 - Eintrag hinzufügen, 2 - Einträge lesen, 0 - Beenden
Funktion: **2**
Einträge:
Heute habe ich Haferbrei gegessen
Ich war am Abend in der Sauna
1 - Eintrag hinzufügen, 2 - Einträge lesen, 0 - Beenden
Funktion: **0**
Bis bald!

</sample-output>

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

</programming-exercise>

## CSV-Dateien schreiben

CSV-Dateien können mit der `write`-Methode Zeile für Zeile geschrieben werden, genau wie jede andere Datei. Das folgende Beispiel erstellt die Datei `coders.csv`, wobei jede Zeile den Namen, die Arbeitsumgebung, die Lieblingssprache und die Jahre an Erfahrung eines einzelnen Programmierers enthält. Die Felder sind durch ein Semikolon getrennt.

```python
with open("coders.csv", "w") as my_file:
    my_file.write("Eric;Windows;Pascal;10\n")
    my_file.write("Matt;Linux;PHP;2\n")
    my_file.write("Alan;Linux;Java;17\n")
    my_file.write("Emily;Mac;Cobol;9\n")
```

Das Ausführen dieses Programms würde zu der folgenden Datei führen:

<sample-output>

Eric;Windows;Pascal;10
Matt;Linux;PHP;2
Alan;Linux;Java;17
Emily;Mac;Cobol;9

</sample-output>

Was ist, wenn die zu schreibenden Daten im Arbeitsspeicher in einer Liste gespeichert sind?

```python
coders = []
coders.append(["Eric", "Windows", "Pascal", 10])
coders.append(["Matt", "Linux", "PHP", 2])
coders.append(["Alan", "Linux", "Java", 17])
coders.append(["Emily", "Mac", "Cobol", 9])
```

Wir können den String, den wir schreiben wollen, als f-String aufbauen und die fertige Zeile wie folgt in die Datei schreiben:

```python
with open("coders.csv", "w") as my_file:
    for coder in coders:
        line = f"{coder[0]};{coder[1]};{coder[2]};{coder[3]}"
        my_file.write(line+"\n")
```

Wäre jede Liste von Coder-Daten sehr lang, mit vielen weiteren Elementen, wäre der Aufbau des Strings von Hand recht mühsam. Wir können stattdessen eine `for`-Schleife verwenden, um den String aufzubauen:

```python
with open("coders.csv", "w") as my_file:
    for coder in coders:
        line = ""
        for value in coder:
            line += f"{value};"
        line = line[:-1]
        my_file.write(line+"\n")
```

## Dateiinhalt löschen und Dateien löschen

Manchmal ist es notwendig, den Inhalt einer bestehenden Datei zu löschen. Das Öffnen der Datei im Schreibmodus und das sofortige Schließen der Datei erreicht genau dies:

```python
with open("file_to_be_cleared.txt", "w") as my_file:
    pass
```

Nun enthält der `with`-Block nur den Befehl `pass`, der eigentlich gar nichts tut. Python erlaubt keine leeren Blöcke, daher ist der Befehl hier notwendig.

Es ist auch möglich, den `with`-Block zu umgehen, indem man den folgenden Einzeiler verwendet:

```python
open('file_to_be_cleared.txt', 'w').close()
```

<text-box variant='hint' name='Dateien löschen'>

Sie können eine Datei auch komplett löschen. Dazu müssen wir das Betriebssystem um Hilfe bitten:

```python
# der Befehl zum Löschen von Dateien befindet sich im os-Modul
import os

os.remove("unnecessary_file.csv")
```

Hinweis: Dies wird aufgrund technischer Einschränkungen in der Testumgebung nicht funktionieren, wenn die automatischen Tests auf den Kursservern laufen. Wenn Sie aufgefordert werden, den Inhalt einer Datei zu löschen, verwenden Sie die oben beschriebenen Methoden.

</text-box>


<programming-exercise name='Inhalt einer Datei filtern' tmcname='part06-12_filtering_file_contents'>

Die Datei `solutions.csv` enthält einige Lösungen für Mathematikaufgaben:

```csv
Arto;2+5;7
Pekka;3-2;1
Erkki;9+3;11
Arto;8-3;4
Pekka;5+5;10
...jne...
```

Wie Sie oben sehen können, ist das Format in jeder Zeile `Name_des_Studenten;Aufgabe;Ergebnis`. Alle Operationen sind entweder Addition oder Subtraktion, und jede hat genau zwei Operanden.

Bitte schreiben Sie eine Funktion namens `filter_solutions()`, die:

* den Inhalt der Datei `solutions.csv` liest
* diejenigen Zeilen, die ein _korrektes_ Ergebnis haben, in die Datei `correct.csv` schreibt
* diejenigen Zeilen, die ein _falsches_ Ergebnis haben, in die Datei `incorrect.csv` schreibt

Unter Verwendung des obigen Beispiels würde die Datei `correct.csv` die Zeilen enthalten:

```sh
Arto;2+5;7
Pekka;3-2;1
Pekka;5+5;10
```

Die anderen beiden stünden in der Datei `incorrect.csv`.

Bitte schreiben Sie die Zeilen in der gleichen Reihenfolge, in der sie in der Originaldatei erscheinen. Ändern Sie die Originaldatei nicht.

Hinweis: Die Funktion sollte genau das gleiche Ergebnis haben, egal wie oft sie aufgerufen wird. Das heißt, es sollte keine Rolle spielen, ob die Funktion einmal aufgerufen wird

```python
filter_solutions()
```

oder mehrmals hintereinander

```python
filter_solutions()
filter_solutions()
filter_solutions()
filter_solutions()
```

Nach der Ausführung sollte der Inhalt der Dateien `correct.csv` und `incorrect.csv` in beiden Fällen exakt gleich sein.

</programming-exercise>

<programming-exercise name='Persönliche Daten speichern' tmcname='part06-13_store_personal_data'>

Bitte schreiben Sie eine Funktion namens `store_personal_data(person: tuple)`, die ein Tuple mit einigen identifizierenden Informationen als Argument erhält.

Das Tuple enthält die folgenden Elemente:

* Name (String)
* Alter (Ganzzahl)
* Größe (Float)

Dies sollte verarbeitet und in die Datei `people.csv` geschrieben werden. Die Datei kann bereits einige Daten enthalten; der neue Eintrag kommt ans Ende der Datei. Die Daten sollten im Format geschrieben werden:

Name;Alter;Größe

Jeder Eintrag sollte in einer separaten Zeile stehen. Wenn wir die Funktion mit dem Argument `("Paul Paulson", 37, 175.5)` aufrufen, sollte die Funktion diese Zeile ans Ende der Datei schreiben:

`Paul Paulson;37;175.5`

</programming-exercise>

## Umgang mit Daten im CSV-Format

Schreiben wir ein Programm, das die Leistung von Studenten in einem Kurs bewertet. Das Programm liest eine CSV-Datei, die die wöchentlich von den Studenten erhaltenen Übungspunkte enthält. Das Programm berechnet dann die Gesamtpunktzahl und ermittelt die von jedem Studenten erreichte Note. Schließlich erstellt das Programm eine CSV-Datei, die die Gesamtpunktzahl und die Note für jeden Studenten enthält.

Die CSV-Datei, die dem Programm als Eingabe dient, sieht so aus:

<sample-data>

Peter;4;2;3;5;4;0;0
Paula;7;2;8;3;5;4;5
Susan;3;4;3;5;3;4;4
Emily;6;6;5;5;0;4;8

</sample-data>

Die Programmlogik ist in drei Funktionen unterteilt: Lesen der Datei und Verarbeiten des Inhalts in ein zugängliches Format, Ermitteln der Note und Schreiben der Datei. 

Die Datei wird nach den im vorherigen Abschnitt behandelten Prinzipien gelesen. Die Daten werden in einem Dictionary gespeichert, wobei der Schlüssel der Name des Studenten ist und der Wert eine Liste der vom Studenten erhaltenen Punkte im Ganzzahlformat ist:

```python
def read_weekly_points(filename):
    weekly_points = {}
    with open(filename) as my_file:
        for line in my_file:
            parts = line.split(";")
            point_list = []
            for points in parts[1:]:
                point_list.append(int(points))
            weekly_points[parts[0]] = point_list

    return weekly_points
```

Die zweite Funktion dient der Ermittlung der Note basierend auf den erhaltenen Punkten. Diese Funktion wird wiederum von der dritten Funktion verwendet, die die Ergebnisse in die Datei schreibt.

```python
def grade(points):
    if points < 20:
        return 0
    elif points < 25:
        return 1
    elif points < 30:
        return 2
    elif points < 35:
        return 3
    elif points < 40:
        return 4
    else:
        return 5

def save_results(filename, weekly_points):
    with open(filename, "w") as my_file:
        for name, point_list in weekly_points.items():
            point_sum = sum(point_list)
            my_file.write(f"{name};{point_sum};{grade(point_sum)}\n")
```

Diese Struktur erlaubt es uns, eine sehr einfache Hauptfunktion zu schreiben. Beachten Sie, wie die Dateinamen für die gelesenen und geschriebenen Dateien als Argumente in der Hauptfunktion übergeben werden:

```python
weekly_points = read_weekly_points("weekly_points.csv")
save_results("results.csv", weekly_points)
```

Wenn die Hauptfunktion ausgeführt wird, sieht der Inhalt der als Ergebnis erstellten Datei `results.csv` so aus:

<sample-data>

Peter;18;0
Paula;34;3
Susan;26;2
Emily;41;5

</sample-data>

Beachten Sie, dass jede oben definierte Funktion relativ einfach ist und jede eine einzige Verantwortung hat. Dies ist ein verbreiteter und ratsamer Ansatz beim Programmieren größerer Ganzen. Das Prinzip der Einzelverantwortung (Single Responsibility Principle) erleichtert die Überprüfung der Funktionalität. Es macht es auch einfacher, später Änderungen am Programm vorzunehmen und neue Funktionen hinzuzufügen.

Angenommen, wir wollten eine Funktion hinzufügen, um die Note für einen einzelnen Studenten auszugeben. Wir haben bereits eine Funktion, die die Note des Studenten ermittelt, also können wir diese in unserer neuen Funktion verwenden:

```python
def get_grade(student_name, weekly_points):
    for name, point_list in weekly_points.items():
        if name == student_name:
            return grade(sum(point_list))


weekly_points = read_weekly_points("weekly_points.csv")
print(get_grade("Paula", weekly_points))

```

<sample-data>

3

</sample-data>

Wenn wir feststellen, dass eine bestimmte Funktionalität im Programm korrigiert werden muss, wird die Änderung in einem gut entworfenen Programm nur einige ausgewählte Codeabschnitte betreffen, und es wird einfacher sein zu bestimmen, wo die Änderungen vorgenommen werden sollten. Wenn wir beispielsweise die Notengrenzen ändern wollten, müssten wir die Änderung nur in der Funktion zur Ermittlung der Note implementieren, und sie würde auch in allen anderen Funktionen funktionieren, die diese Funktion nutzen. Wäre der Code für diese einzelne Funktionalität an mehreren Stellen implementiert, bestünde die Gefahr, dass wir beim Ändern der Funktionalität nicht daran denken würden, alle Instanzen zu ändern.

<programming-exercise name='Kursbewertung, Teil 4' tmcname='part06-14_course_grading_part_4'>

Kehren wir zum Kursbewertungsprojekt aus dem vorherigen Abschnitt zurück. 

Wie wir es beim letzten Mal verlassen haben, las und verarbeitete das Programm Dateien mit Studenteninformationen, abgeschlossenen Übungen und Prüfungsergebnissen. Wir fügen eine Datei mit Informationen über den Kurs hinzu. Ein Beispiel für das Format der Datei:

<sample-data>

<pre>

name: Introduction to Programming
study credits: 5
</pre>

</sample-data>

Das Programm soll dann zwei Dateien erstellen. Es soll eine Datei namens `results.txt` mit folgendem Inhalt geben:

<sample-data>

<pre>
Introduction to Programming, 5 credits
======================================
name                          exec_nbr  exec_pts. exm_pts.  tot_pts.  grade
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
</pre>

</sample-data>

Der Statistik-Abschnitt ist identisch mit den in Teil 3 des Projekts ausgegebenen Ergebnissen. Die einzige Ergänzung hier ist der Kopfbereich. 

Zusätzlich soll es eine Datei namens `results.csv` mit folgendem Format geben:

<sample-data>

<pre>
12345678;pekka peloton;0
12345687;jaana javanainen;1
12345699;liisa virtanen;3
</pre>

</sample-data>

Wenn das Programm ausgeführt wird, sollte es so aussehen:

<sample-output>

Studenteninformationen: **students1.csv**
Abgeschlossene Übungen: **exercises1.csv**
Prüfungspunkte: **exam_points1.csv**
Kursinformationen: **course1.txt**
Ergebnisse in Dateien results.txt und results.csv geschrieben

</sample-output>

Das heißt, das Programm fragt nur nach den Namen der Eingabedateien. Alle Ausgaben sollen in die Dateien geschrieben werden. Der Benutzer sieht nur eine Nachricht, die dies bestätigt.

**Hinweis:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

</programming-exercise>


<programming-exercise name='Wortsuche' tmcname='part06-15_word_search'>

Die Übungsvorlage enthält die Datei `words.txt`, die englische Wörter enthält.

Bitte schreiben Sie eine Funktion namens `find_words(search_term: str)`. Sie sollte eine Liste zurückgeben, die alle Wörter in der Datei enthält, die dem Suchbegriff entsprechen.

Der Suchbegriff kann Kleinbuchstaben und die folgenden Platzhalterzeichen enthalten:

* Ein Punkt `.` bedeutet, dass jedes beliebige einzelne Zeichen an seiner Stelle akzeptabel ist. Beispielsweise würde `ca.` Wörter wie _cat_ und _car_ ergeben, `p.ng` würde Wörter wie _ping_ und _pong_ ergeben und `.a.e` würde Wörter wie _sane_, _care_ und _late_ ergeben.
* Ein Sternchen `*` am _Ende_ des Suchbegriffs bedeutet, dass jedes Wort akzeptabel ist, das mit dem Suchbegriff _beginnt_. Ein Sternchen am _Anfang_ des Suchbegriffs bedeutet, dass jedes Wort akzeptabel ist, das mit dem Suchbegriff _endet_. Beispielsweise würde `ca*` Wörter wie _california_, _cat_, _caring_ und _catapult_ ergeben, während `*ane` Wörter wie _crane_, _insane_ und _aeroplane_ ergeben würde. Es kann immer nur ein einzelnes Sternchen im Suchbegriff vorkommen.
* Wenn keine Platzhalterzeichen im Suchbegriff vorhanden sind, werden nur Wörter zurückgegeben, die exakt dem Suchbegriff entsprechen. 

Sie können davon ausgehen, dass niemals beide Platzhalter im selben Suchbegriff verwendet werden.

Die Wörter in der Datei sind alle in Kleinbuchstaben geschrieben. Sie können auch davon ausgehen, dass das Argument der Funktion vollständig in Kleinbuchstaben vorliegt.

Wenn keine passenden Wörter gefunden werden, sollte die Funktion eine leere Liste zurückgeben.

Tipp: Die Python-String-Methoden `startswith()` und `endswith()` könnten hier nützlich sein. Sie können online nach weiteren Informationen über sie suchen.

Ein Beispiel für die Funktion in Aktion:

```python
print(find_words("*vokes"))
```

<sample-output>

['convokes', 'equivokes', 'evokes', 'invokes', 'provokes', 'reinvokes', 'revokes']

</sample-output>

</programming-exercise>

<programming-exercise name='In einer Datei gespeichertes Dictionary' tmcname='part06-16_dictionary_file'>

Bitte schreiben Sie ein Programm, das als Wörterbuch fungiert. Der Benutzer kann neue Einträge eingeben oder nach bestehenden Einträgen suchen.

Das Programm sollte wie folgt funktionieren:

<sample-output>

1 - Wort hinzufügen, 2 - Suchen, 3 - Beenden
Funktion: **1**
Das Wort auf Finnisch: **auto**
Das Wort auf Englisch: **car**
Wörterbucheintrag hinzugefügt
1 - Wort hinzufügen, 2 - Suchen, 3 - Beenden
Funktion: **1**
Das Wort auf Finnisch: **roska**
Das Wort auf Englisch: **garbage**
Wörterbucheintrag hinzugefügt
1 - Wort hinzufügen, 2 - Suchen, 3 - Beenden
Funktion: **1**
Das Wort auf Finnisch: **laukku**
Das Wort auf Englisch: **bag**
Wörterbucheintrag hinzugefügt
1 - Wort hinzufügen, 2 - Suchen, 3 - Beenden
Funktion: **2**
Suchbegriff: **bag**
roska - garbage
laukku - bag
1 - Wort hinzufügen, 2 - Suchen, 3 - Beenden
Funktion: **2**
Suchbegriff: **car**
auto - car
1 - Wort hinzufügen, 2 - Suchen, 3 - Beenden
Funktion: **2**
Suchbegriff: **laukku**
laukku - bag
1 - Wort hinzufügen, 2 - Suchen, 3 - Beenden
Funktion: **3**
Tschüss!

</sample-output>

Die Wörterbucheinträge sollen in eine Datei namens `dictionary.txt` geschrieben werden. Das Programm soll zuerst den Inhalt der Datei lesen. Neue Einträge werden ans Ende der Datei geschrieben, wann immer sie dem Wörterbuch hinzugefügt werden.

Das Format der im Wörterbuch gespeicherten Daten bleibt Ihnen überlassen.

Hinweis: Die automatischen Tests für diese Übung können den Inhalt der Datei ändern. Wenn Sie den Inhalt behalten möchten, erstellen Sie zuerst eine Kopie der Datei unter einem anderen Namen.

**Hinweis 2:** In dieser Übung werden keine Funktionen verlangt, daher sollten Sie __keinen__ Code innerhalb eines `if __name__ == "__main__"`-Blocks platzieren.

</programming-exercise>
