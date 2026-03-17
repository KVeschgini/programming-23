---
path: '/part-7/4-data-processing'
title: 'Datenverarbeitung'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man ein Modul zur Verarbeitung von CSV-Dateien verwendet
- werden Sie wissen, wie man ein Modul zur Verarbeitung von JSON-Dateien verwendet
- werden Sie in der Lage sein, Dateien aus dem Internet abzurufen und zu lesen

</text-box>

## CSV-Dateien lesen

CSV ist ein so einfaches Format, dass wir bisher mit selbst geschriebenem Code darauf zugegriffen haben. Es gibt jedoch ein fertiges Modul in der Python-Standardbibliothek für die Arbeit mit CSV-Dateien: [csv](https://docs.python.org/3/library/csv.html). Es funktioniert wie folgt:

```python
import csv

with open("test.csv") as my_file:
    for line in csv.reader(my_file, delimiter=";"):
        print(line)
```

Der obige Code liest alle Zeilen in der CSV-Datei `test.csv`, trennt den Inhalt jeder Zeile unter Verwendung des Trennzeichens `;` in eine Liste auf und gibt jede Liste aus. Angenommen, der Inhalt der Zeilen ist wie folgt:

```x
012121212;5
012345678;2
015151515;4
```

Der Code würde dies ausgeben:

<sample-output>

['012121212', '5']
['012345678', '2']
['015151515', '4']

</sample-output>

Da das CSV-Format so einfach ist, welchen Nutzen hat ein separates Modul, wenn wir genauso gut die `split`-Funktion verwenden können? Nun, zum einen ist das Modul so aufgebaut, dass es auch korrekt funktioniert, wenn die Werte in der Datei Zeichenketten sind, die selbst das Trennzeichen enthalten können. Wenn eine Zeile in der Datei so aussähe:

```x
"aaa;bbb";"ccc;ddd"
```

würde der obige Code dies erzeugen:

<sample-output>

['aaa;bbb', 'ccc;ddd']

</sample-output>

Die Verwendung der `split`-Funktion würde auch innerhalb der Zeichenketten trennen, was wahrscheinlich die Daten und unser Programm dabei beschädigen würde.

## JSON-Dateien lesen

CSV ist nur eines von vielen maschinenlesbaren Datenformaten. [JSON](https://www.json.org/json-en.html) ist ein weiteres und wird oft verwendet, wenn Daten zwischen Anwendungen übertragen werden müssen.

JSON-Dateien sind Textdateien mit einem strengen Format, das für das menschliche Auge vielleicht etwas weniger zugänglich ist als das CSV-Format. Das folgende Beispiel verwendet die Datei `courses.json`, die Informationen über einige Kurse enthält:

```x
[
    {
        "name": "Introduction to Programming",
        "abbreviation": "ItP",
        "periods": [1, 3]
    },
    {
        "name": "Advanced Course in Programming",
        "abbreviation": "ACiP",
        "periods": [2, 4]
    },
    {
        "name": "Database Application",
        "abbreviation": "DbApp",
        "periods": [1, 2, 3, 4]
    }
]
```

Die Struktur einer JSON-Datei dürfte Ihnen inzwischen recht vertraut vorkommen. Die obige JSON-Datei sieht genau wie eine Python-Liste aus, die drei Python-Dictionaries enthält.

Die Standardbibliothek verfügt über ein Modul für die Arbeit mit JSON-Dateien: [json](https://docs.python.org/3/library/json.html). Die Funktion `loads` nimmt ein beliebiges im JSON-Format übergebenes Argument entgegen und wandelt es in eine Python-Datenstruktur um. Die Verarbeitung der Datei `courses.json` mit dem untenstehenden Code

```python
import json

with open("courses.json") as my_file:
    data = my_file.read()

courses = json.loads(data)
print(courses)
```

würde folgendes ausgeben:

<sample-output>

[{'name': 'Introduction to Programming', 'abbreviation': 'ItP', 'periods': [1, 3]}, {'name': 'Advanced Course in Programming', 'abbreviation': 'ACiP', 'periods': [2, 4]}, {'name': 'Database Application', 'abbreviation': 'DbApp', 'periods': [1, 2, 3, 4]}]

</sample-output>

Wenn wir auch den Namen jedes Kurses ausgeben wollten, könnten wir unser Programm um eine `for`-Schleife erweitern:

```python
for course in courses:
    print(course["name"])
```

<sample-output>

Introduction to Programming
Advanced Course in Programming
Database Application

</sample-output>


<programming-exercise name='Umgang mit JSON-Dateien' tmcname='part07-12_json_files'>

Schauen wir uns eine JSON-Datei an, die einige Informationen über Studenten im folgenden Format enthält:

```json
[
    {
        "name": "Peter Pythons",
        "age": 27,
        "hobbies": [
            "coding",
            "knitting"
        ]
    },
    {
        "name": "Jean Javanese",
        "age": 24,
        "hobbies": [
            "coding",
            "rock climbing",
            "reading"
        ]
    }
]
```

Bitte schreiben Sie eine Funktion namens `print_persons(filename: str)`, die eine JSON-Datei im obigen Format liest und den Inhalt wie unten gezeigt ausgibt. Die Datei kann eine beliebige Anzahl von Einträgen enthalten.

<sample-output>

Peter Pythons 27 years (coding, knitting)
Jean Javanese 24 years (coding, rock climbing, reading)

</sample-output>

Die Hobbys sollen in der gleichen Reihenfolge aufgeführt werden, in der sie in der JSON-Datei erscheinen.

</programming-exercise>

## Eine Datei aus dem Internet abrufen

Die Python-Standardbibliothek enthält auch Module für den Umgang mit Online-Inhalten, und eine nützliche Funktion ist [urllib.request.urlopen](
https://docs.python.org/3/library/urllib.request.html#urllib.request.urlopen). Wir empfehlen Ihnen, sich das gesamte Modul anzusehen, aber das folgende Beispiel sollte ausreichen, um die Funktion zu verstehen. Sie kann verwendet werden, um Inhalte aus dem Internet abzurufen, damit sie in Ihren Programmen verarbeitet werden können.

Der folgende Code würde den Inhalt der Homepage der Universität Helsinki ausgeben:

```python
import urllib.request

my_request = urllib.request.urlopen("https://helsinki.fi")
print(my_request.read())
```

Seiten, die für menschliche Augen bestimmt sind, sehen normalerweise nicht sehr hübsch aus, wenn ihr Code ausgedruckt wird. In den folgenden Beispielen werden wir jedoch mit maschinenlesbaren _Daten_ aus einer Online-Quelle arbeiten. Viele der online verfügbaren maschinenlesbaren Daten liegen im JSON-Format vor.

<programming-exercise name='Kursstatistiken' tmcname='part07-13_course_statistics'>

#### Abrufen der Liste der aktiven Kurse

Unter der Adresse <https://studies.cs.helsinki.fi/stats-mock/api/courses> finden Sie grundlegende Informationen über einige der vom Fachbereich Informatik der Universität Helsinki angebotenen Kurse im JSON-Format.

Bitte schreiben Sie eine Funktion namens `retrieve_all()`, die die Daten aller Kurse abruft, die derzeit aktiv sind (das Feld `enabled` hat den Wert `true`). Diese sollen als Liste von Tuples im folgenden Format zurückgegeben werden:

<sample-output>

<pre>
[
    ('Full Stack Open 2020', 'ofs2019', 2020, 201),
    ('DevOps with Docker 2019', 'docker2019', 2019, 36),
    ('DevOps with Docker 2020', 'docker2020', 2020, 36),
    ('Beta DevOps with Kubernetes', 'beta-dwk-20', 2020, 28)
]
</pre>

</sample-output>

Jedes Tuple enthält die folgenden Felder aus den Originaldaten:

- den Namen des Kurses: `fullName`
- `name`
- `year`
- die Summe der in `exercises` aufgeführten Werte


**Hinweis**: Es ist wichtig, dass Sie die Daten mit der Funktion `urllib.request.urlopen` abrufen, da die automatisierten Tests sonst möglicherweise nicht korrekt funktionieren.

**Hinweis 2:** Die Tests sind so konzipiert, dass sie die aus dem Internet abgerufenen Daten leicht modifizieren, um sicherzustellen, dass Sie Ihre Rückgabewerte nicht fest im Code verankern.

**Hinweis 3:** Einige Mac-Benutzer sind auf das folgende Problem gestoßen:

```sh
File "/Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/urllib/request.py", line 1353, in do_open
    raise URLError(err)
urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1124)>
```

Die Lösung hängt davon ab, wie Python auf Ihrem Rechner installiert ist. In einigen Fällen hilft es, Folgendes in einem Terminal auszuführen:

```sh
cd "/Applications/Python 3.8/"
sudo "./Install Certificates.command"
```

Der im obigen `cd`-Befehl verwendete Pfad hängt von der installierten Python-Version ab. Der Pfad könnte beispielsweise auch `"/Applications/Python 3.9/"` lauten.

Es wurden [verschiedene Lösungen](https://stackoverflow.com/questions/27835619/urllib-and-ssl-certificate-verify-failed-error) für das Problem vorgeschlagen.

Ein Trick, den einige nützlich fanden:

```python
import urllib.request
import json
import ssl # fügen Sie diese Bibliothek zu Ihren Imports hinzu

def retrieve_all():
    # fügen Sie die folgende Zeile am Anfang aller Ihrer Funktionen hinzu
    context = ssl._create_unverified_context()
    # der Rest Ihrer Funktion
```

Ein weiterer möglicher Workaround:

 ```python
import urllib.request
import certifi # fügen Sie diese Bibliothek zu Ihren Imports hinzu
import json

def retrieve_all():
    address = "https://studies.cs.helsinki.fi/stats-mock/api/courses"
    # fügen Sie ein zweites Argument zum Funktionsaufruf hinzu
    request = urllib.request.urlopen(address, cafile=certifi.where())
    # der Rest Ihrer Funktion
```

#### Abrufen der Daten für einen einzelnen Kurs

Jeder Kurs hat auch eine eigene URL, unter der spezifischere wöchentliche Daten über den Kurs verfügbar sind. Die URLs folgen dem Format <https://studies.cs.helsinki.fi/stats-mock/api/courses/****/stats>, wobei Sie die Sterne durch den Inhalt des Feldes `name` für den Kurs ersetzen würden, auf den Sie zugreifen möchten.

Beispielsweise befinden sich die Daten für den Kurs `docker2019` unter der Adresse <https://studies.cs.helsinki.fi/stats-mock/api/courses/docker2019/stats>.

Bitte schreiben Sie eine Funktion namens `retrieve_course(course_name: str)`, die Statistiken für den angegebenen Kurs im Dictionary-Format zurückgibt.

Beispielsweise würde der Funktionsaufruf `retrieve_course("docker2019")` ein Dictionary mit folgendem Inhalt zurückgeben:

<sample-output>

<pre>
{
    'weeks': 4,
    'students': 220,
    'hours': 5966,
    'hours_average': 27,
    'exercises': 4988,
    'exercises_average': 22
}
</pre>

</sample-output>

Die Werte im Dictionary werden wie folgt ermittelt:

- `weeks`: die Anzahl der abgerufenen JSON-Objektliterale
- `students`: die maximale Anzahl der Studenten in allen Wochen
- `hours`: die Summe aller `hour_total`-Werte in den verschiedenen Wochen
- `hours_average`: der `hours`-Wert geteilt durch den `students`-Wert (abgerundet auf den nächsten Ganzzahlwert)
- `exercises`: die Summe aller `exercise_total`-Werte in den verschiedenen Wochen
- `exercises_average`: der `exercises`-Wert geteilt durch den `students`-Wert (abgerundet auf den nächsten Ganzzahlwert)

**Hinweis**: Beachten Sie die Hinweise in Teil 1 der Übung, da diese auch hier gelten.

**Hinweis 2**: Das Python-[math](https://docs.python.org/3/library/math.html)-Modul verfügt über eine nützliche Funktion zum Abrunden von Ganzzahlen.

</programming-exercise>

<programming-exercise name='Wer hat geschummelt' tmcname='part07-14_who_cheated'>

Die Datei `start_times.csv` enthält individuelle Startzeiten für eine Programmierprüfung im Format `name;hh:mm`. Ein Beispiel:

```csv
jarmo;09:00
timo;18:42
kalle;13:23
```

Zusätzlich enthält die Datei `submissions.csv` Punkte und Abgabezeiten für einzelne Übungen. Das Format hier ist `name;task;points;hh:mm`. Ein Beispiel:

```csv
jarmo;1;8;16:05
timo;2;10;21:22
jarmo;2;10;19:15
jne...
```

Ihre Aufgabe ist es, die Studenten zu finden, die mehr als 3 Stunden für die Prüfungsaufgaben aufgewendet haben. Das heißt, jeder Student, dessen _irgendeine_ Aufgabe mehr als 3 Stunden nach seiner Prüfungsstartzeit abgegeben wurde, wird als Schummler eingestuft. Es kann mehr als eine Abgabe für dieselbe Aufgabe pro Student geben. Sie können davon ausgehen, dass alle Zeiten innerhalb desselben Tages liegen.

Bitte schreiben Sie eine Funktion namens `cheaters()`, die eine Liste mit den Namen der Studenten zurückgibt, die geschummelt haben.

</programming-exercise>

<programming-exercise name='Wer hat geschummelt, Version 2' tmcname='part07-15_who_cheated_2'>

Ihnen stehen wieder die CSV-Dateien aus der vorherigen Übung zur Verfügung. Bitte schreiben Sie eine Funktion namens `final_points()`, die die von den Studenten erhaltenen Abschlussprüfungspunkte in einem Dictionary-Format zurückgibt, wobei die folgenden Kriterien gelten:

* Wenn es mehrere Abgaben für dieselbe Aufgabe gibt, wird die Abgabe mit der höchsten Punktzahl berücksichtigt.
* Wenn die Abgabe mehr als 3 Stunden nach der Startzeit erfolgte, wird die Abgabe ignoriert.

Die Aufgaben sind von 1 bis 8 nummeriert, und jede Abgabe wird mit 0 bis 6 Punkten bewertet.

In dem zurückgegebenen Dictionary soll der Schlüssel der Name des Studenten und der Wert die vom Studenten erhaltene Gesamtpunktzahl sein.

Tipp: Verschachtelte Dictionaries könnten ein guter Ansatz bei der Verarbeitung der Aufgaben und Abgabezeiten jedes Studenten sein.

</programming-exercise>

## Nach Modulen suchen

Die offizielle Python-Dokumentation enthält Informationen zu allen in der Standardbibliothek verfügbaren Modulen:

* https://docs.python.org/3/library/

Zusätzlich zur Standardbibliothek ist das Internet voll von frei verfügbaren Python-Modulen für verschiedene Zwecke. Einige häufig verwendete Module sind hier aufgeführt:

* https://wiki.python.org/moin/UsefulModules

<programming-exercise name='Rechtschreibprüfung, Version 2' tmcname='part07-16_spellchecker_2'>

In dieser Übung schreiben Sie eine verbesserte Version der Rechtschreibprüfung aus dem [vorherigen Teil](/part-6/1-reading-files).

Genau wie in der vorherigen Version soll das Programm den Benutzer auffordern, eine Textzeile einzugeben. Ihr Programm soll dann eine Rechtschreibprüfung durchführen und dem Benutzer Feedback geben, sodass alle falsch geschriebenen Wörter von Sternchen umgeben sind. Zusätzlich soll _das Programm eine Liste von Vorschlägen für die falsch geschriebenen Wörter ausgeben_.

Bitte sehen Sie sich die folgenden zwei Beispiele an.

<sample-output>

Text schreiben: **We use ptython to make a spell checker**
<pre>
We use *ptython* to make a spell checker
suggestions:
ptython: python, pythons, typhon
</pre>

</sample-output>

<sample-output>

Text schreiben: **this is acually a good and usefull program**
<pre>
this is *acually* a good and *usefull* program
suggestions:
acually: actually, tactually, factually
usefull: usefully, useful, museful
</pre>

</sample-output>

Die Vorschläge sollen mit der Funktion [get\_close\_matches](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) aus dem Python-Standardbibliotheksmodul [difflib](https://docs.python.org/3/library/difflib.html) ermittelt werden.

**Hinweis**: Damit die automatischen Tests korrekt funktionieren, verwenden Sie die Funktion bitte mit den "Standardeinstellungen". Das heißt, übergeben Sie der Funktion bitte nur zwei Argumente: das falsch geschriebene Wort und die Wortliste.

</programming-exercise>
