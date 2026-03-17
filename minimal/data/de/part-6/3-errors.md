---
path: '/part-6/3-errors'
title: 'Fehlerbehandlung'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man mit ungültigen Eingaben umgeht
- werden Sie verstehen, was Ausnahmen (Exceptions) in der Programmierung sind
- werden Sie mit den gängigsten Ausnahmetypen in Python vertraut sein
- werden Sie in der Lage sein, Ausnahmen in Ihren eigenen Programmen zu behandeln

</text-box>

Es gibt zwei grundlegende Kategorien von Fehlern, die im Programmierkontext auftreten:

1. Syntaxfehler, die die Ausführung des Programms verhindern
2. Laufzeitfehler, die die Ausführung unterbrechen

Fehler der Kategorie 1 sind in der Regel leicht zu beheben, da der Python-Interpreter den Fehlerort markiert, wenn er versucht, das Programm auszuführen. Häufige Syntaxfehler sind ein fehlender Doppelpunkt am Ende einer Kopfzeile oder ein fehlendes Anführungszeichen am Ende einer Zeichenkette.

Fehler der Kategorie 2 können schwieriger zu entdecken sein, da sie möglicherweise nur an einem bestimmten Punkt in der Ausführung eines Programms und nur unter bestimmten Umständen auftreten. Das Programm kann in den meisten Situationen einwandfrei funktionieren, bricht aber aufgrund eines Fehlers in einem speziellen Grenzfall ab. Wir werden uns nun auf die Behandlung dieser Art von Fehlern konzentrieren.

## Eingabevalidierung

Viele Fehler, die während der Ausführung eines Programms auftreten, haben mit ungültigen Eingaben zu tun. Einige Beispiele sind:

* fehlende oder leere Eingabewerte in Pflichtfeldern, wie z.B. leere Zeichenketten, wenn die Länge der Zeichenkette kritisch ist
* negative Werte, wo nur positive Werte akzeptiert werden, wie z.B. -15 als Menge einer Zutat in einem Rezept
* fehlende Dateien oder Tippfehler in Dateinamen
* Werte, die zu klein oder zu groß sind, zum Beispiel bei der Arbeit mit Daten und Zeiten
* ungültige Indizes, wie der Versuch, auf Index 3 in der Zeichenkette "hey" zuzugreifen
* Werte eines falschen Typs, wie Zeichenketten, wenn Ganzzahlen erwartet werden

Glücklicherweise können wir uns als Programmierer auf die meisten Fehler vorbereiten. Schauen wir uns ein Programm an, das den Benutzer nach seinem Alter fragt und sicherstellt, dass es eine akzeptable Zahl ist (in diesem Fall zwischen 0 und 150):

```python
age = int(input("Bitte geben Sie Ihr Alter ein: "))
if age >= 0 and age <= 150:
    print("Das ist ein schönes Alter")
else:
    print("Dies ist kein gültiges Alter")
```

<sample-output>

Bitte geben Sie Ihr Alter ein: **25**
Das ist ein schönes Alter

</sample-output>

<sample-output>

Bitte geben Sie Ihr Alter ein: **-3**
Dies ist kein gültiges Alter

</sample-output>

Solange der Benutzer eine Ganzzahl eingibt, scheint unsere Eingabevalidierung gut zu funktionieren. Aber was passiert, wenn er eine Zeichenkette eingibt?

<sample-output>

Bitte geben Sie Ihr Alter ein: **dreiundzwanzig**
ValueError: invalid literal for int() with base 10: 'dreiundzwanzig'

</sample-output>

Die `int`-Funktion ist nicht in der Lage, die Eingabezeichenkette `dreiundzwanzig` als gültigen Ganzzahlwert zu interpretieren. Die Ausführung bricht ab und die obige Fehlermeldung wird ausgegeben.

## Ausnahmen (Exceptions)

Fehler, die auftreten, während das Programm bereits läuft, werden _Ausnahmen_ (Exceptions) genannt. Es ist möglich, sich auf Ausnahmen vorzubereiten und sie so zu behandeln, dass die Ausführung trotz ihres Auftretens fortgesetzt wird.

Die Fehlerbehandlung in Python erfolgt mit `try`- und `except`-Anweisungen. Die Idee ist, dass Python prüft, ob es einen entsprechenden `except`-Block gibt, wenn etwas innerhalb eines `try`-Blocks eine Ausnahme verursacht. Wenn ein solcher Block existiert, wird er ausgeführt und das Programm fährt dann fort, als wäre nichts passiert.

Ändern wir das obige Beispiel so, dass das Programm auf die `ValueError`-Ausnahme vorbereitet ist:

```python
try:
    age = int(input("Bitte geben Sie Ihr Alter ein: "))
except ValueError:
    age = -1

if age >= 0 and age <= 150:
    print("Das ist ein schönes Alter")
else:
    print("Dies ist kein gültiges Alter")
```

<sample-output>

Bitte geben Sie Ihr Alter ein: **dreiundzwanzig**
Dies ist kein gültiges Alter

</sample-output>

Wir können den `try`-Block verwenden, um zu markieren, dass der Code innerhalb des Blocks einen Fehler verursachen kann. In der `except`-Anweisung direkt nach dem Block wird der relevante Fehler genannt. Im obigen Beispiel haben wir nur eine `ValueError`-Ausnahme abgedeckt. Hätte die Ausnahme eine andere Ursache gehabt, wäre die Ausführung trotz der `try`- und `except`-Blöcke dennoch abgebrochen worden.

Wenn im obigen Beispiel der Fehler abgefangen wird, wird der Wert von `age` auf -1 gesetzt. Dies ist ein ungültiger Eingabewert, für den wir bereits ein Verhalten programmiert haben, da das Programm erwartet, dass das Alter des Benutzers größer als 0 ist.

Im folgenden Beispiel haben wir eine Funktion `read_integer`, die den Benutzer auffordert, einen Ganzzahlwert einzugeben, aber die Funktion ist auch auf ungültige Eingaben vorbereitet. Die Funktion fragt so lange nach Ganzzahlen, bis der Benutzer einen gültigen Eingabewert eingibt.

```python
def read_integer():
    while True:
        try:
            input_str = input("Bitte geben Sie eine Ganzzahl ein: ")
            return int(input_str)
        except ValueError:
            print("Diese Eingabe ist ungültig")

number = read_integer()
print("Vielen Dank!")
print(number, "hoch drei ist", number**3)
```

<sample-output>

Bitte geben Sie eine Ganzzahl ein: **drei**
Diese Eingabe ist ungültig
Bitte geben Sie eine Ganzzahl ein: **aybabtu**
Diese Eingabe ist ungültig
Bitte geben Sie eine Ganzzahl ein: **5**
Vielen Dank!
5 hoch drei ist 125

</sample-output>

Manchmal reicht es aus, Ausnahmen mit einer try-except-Struktur abzufangen, ohne etwas dagegen zu unternehmen. Das heißt, wir können die Situation im `except`-Block einfach ignorieren.

Wenn wir das obige Beispiel so ändern würden, dass wir nur Ganzzahlen kleiner als 100 akzeptieren, könnten die Ergebnisse so aussehen:

```python
def read_small_integer():
    while True:
        try:
            input_str = input("Bitte geben Sie eine Ganzzahl ein: ")
            number = int(input_str)
            if number < 100:
                return number
        except ValueError:
            pass # dieser Befehl tut eigentlich gar nichts

        print("Diese Eingabe ist ungültig")

number = read_small_integer()
print(number, "hoch drei ist", number**3)
```

<sample-output>

Bitte geben Sie eine Ganzzahl ein: **drei**
Diese Eingabe ist ungültig
Bitte geben Sie eine Ganzzahl ein: **1000**
Diese Eingabe ist ungültig
Bitte geben Sie eine Ganzzahl ein: **5**
Vielen Dank!
5 hoch drei ist 125

</sample-output>

Nun enthält der `except`-Block nur den Befehl `pass`, der nichts tut. Python erlaubt keine leeren Blöcke, daher ist der Befehl notwendig.

<programming-exercise name='Eingabe lesen' tmcname='part06-17_read_input'>

Bitte schreiben Sie eine Funktion namens `read_input`, die den Benutzer so lange nach einer Eingabe fragt, bis dieser eine Ganzzahl eingibt, die innerhalb der als Argumente an die Funktion übergebenen Grenzen liegt. Die Funktion sollte den endgültigen gültigen Ganzzahlwert zurückgeben, den der Benutzer eingegeben hat.

Ein Beispiel für die Funktion in Aktion:

```python
number = read_input("Bitte geben Sie eine Zahl ein: ", 5, 10)
print("Sie haben eingegeben:", number)
```

<sample-output>

Bitte geben Sie eine Zahl ein: **sieben**
Sie müssen eine Ganzzahl zwischen 5 und 10 eingeben
Bitte geben Sie eine Zahl ein: **-3**
Sie müssen eine Ganzzahl zwischen 5 und 10 eingeben
Bitte geben Sie eine Zahl ein: **8**
Sie haben eingegeben: 8

</sample-output>

</programming-exercise>

## Typische Fehler

Hier ist eine Auswahl typischer Fehler, auf die Sie wahrscheinlich stoßen werden, zusammen mit einigen Situationen, in denen sie auftreten können.

**ValueError**

Dieser Fehler wird oft ausgelöst, wenn das an eine Funktion übergebene Argument irgendwie ungültig ist. Beispielsweise verursacht der Funktionsaufruf `float("1,23")` einen Fehler, da Dezimalzahlen in Python immer durch einen Punkt getrennt werden und wir hier ein Komma haben. 

**TypeError**

Dieser Fehler tritt auf, wenn ein Wert vom falschen Typ ist. Beispielsweise verursacht der Funktionsaufruf `len(10)` einen `TypeError`, da die Funktion `len` einen Wert erfordert, dessen Länge berechnet werden kann, wie eine Zeichenkette oder eine Liste.

**IndexError**

Dieser häufige Fehler tritt auf, wenn versucht wird, auf einen Index zu verweisen, der nicht existiert. Beispielsweise verursacht der Ausdruck `"abc"[5]` einen `IndexError`, da die betreffende Zeichenkette keinen Index 5 hat.

**ZeroDivisionError**

Wie der Name schon sagt, wird dieser Fehler ausgelöst, wenn versucht wird, durch Null zu dividieren, was wir aus der Mathematik als immer schlechte Idee kennen. Wenn wir beispielsweise versuchen, das arithmetische Mittel von Werten in einer Liste mit der Formel `sum(my_list) / len(my_list)` zu bestimmen, unsere Liste aber die Länge Null hat, tritt dieser Fehler auf.

**Ausnahmen bei der Dateiverarbeitung**

Einige häufige Fehler bei der Arbeit mit Dateien sind **FileNotFoundError** (beim Versuch, auf eine Datei zuzugreifen, die nicht existiert), **io.UnsupportedOperation** (beim Versuch, eine Operation an einer Datei durchzuführen, die von dem Modus, in dem die Datei geöffnet ist, nicht unterstützt wird) oder **PermissionError** (dem Programm fehlen die erforderlichen Berechtigungen für den Zugriff auf die Datei).

## Mehrere Ausnahmen gleichzeitig behandeln

An jeden `try`-Block können mehr als ein `except`-Block angehängt werden. Das folgende Programm kann beispielsweise sowohl eine `FileNotFoundError`-Ausnahme als auch einen `PermissionError` behandeln:

```python
try:
    with open("example.txt") as my_file:
        for line in my_file:
            print(line)
except FileNotFoundError:
    print("Die Datei example.txt wurde nicht gefunden")
except PermissionError:
    print("Keine Berechtigung für den Zugriff auf die Datei example.txt")
```

Manchmal ist es nicht notwendig, den Fehler genau zu spezifizieren, auf den sich das Programm vorbereitet. Gerade beim Umgang mit Dateien reicht es oft zu wissen, dass ein Fehler aufgetreten ist, und das Programm sicher zu beenden. Es ist nicht immer notwendig zu wissen, _warum_ der Fehler aufgetreten ist. Wenn wir alle möglichen Ausnahmen abdecken müssen, können wir den `except`-Block verwenden, ohne den Fehler anzugeben:

```python

try:
    with open("example.txt") as my_file:
        for line in my_file:
            print(line)
except:
    print("Beim Lesen der Datei ist ein Fehler aufgetreten.")

```

Hinweis: Die `except`-Anweisung deckt hier alle möglichen Fehler ab, auch solche, die durch Programmierfehler verursacht wurden. Nur Syntaxfehler werden dadurch nicht abgefangen, da sie von vornherein verhindern, dass der Code ausgeführt wird.

Beispielsweise wird das folgende Programm immer einen Fehler auslösen, da der Variablenname `my_file` in der dritten Zeile als `myfile` geschrieben wurde.

```python
try:
    with open("example.txt") as my_file:
        for line in myfile:
            print(line)
except:
    print("Beim Lesen der Datei ist ein Fehler aufgetreten.")
```

Ein `except`-Block kann den tatsächlichen Fehler verbergen: Das Problem hier wurde nicht durch die Dateiverarbeitung an sich verursacht, sondern durch den falsch geschriebenen Variablennamen. Ohne den `except`-Block würde der ausgelöste Fehler angezeigt und die Ursache könnte leichter gefunden werden. Daher ist es in der Regel eine gute Idee, nur `except`-Blöcke zu verwenden, die speziell für bestimmte Fehlertypen deklariert sind.

## Weitergabe von Ausnahmen

Wenn das Ausführen einer Funktion eine Ausnahme verursacht und diese Ausnahme nicht behandelt wird, wird sie an den Codeabschnitt weitergegeben, der die Funktion aufgerufen hat, und so weiter die Aufrufkette hinauf, bis sie die Ebene der Hauptfunktion erreicht. Wenn sie auch dort nicht behandelt wird, bricht die Ausführung des Programms ab und die Ausnahme wird in der Regel für den Benutzer sichtbar ausgedruckt.

Im folgenden Beispiel haben wir die Funktion `testing`. Wenn sie eine Ausnahme verursacht, wird diese nicht innerhalb der Funktion selbst behandelt, sondern in der Hauptfunktion:

```python
def testing(x):
    print(int(x) + 1)

try:
    number = input("Bitte geben Sie eine Zahl ein: ")
    testing(number)
except:
    print("Etwas ist schief gelaufen")
```

<sample-output>

Bitte geben Sie eine Zahl ein: **drei**
Etwas ist schief gelaufen

</sample-output>

## Ausnahmen auslösen

Sie können Ausnahmen auch selbst mit dem Befehl `raise` auslösen. Es mag wie eine seltsame Idee erscheinen, absichtlich Fehler in Ihren Programmen zu verursachen, aber es kann tatsächlich ein sehr nützlicher Mechanismus sein.

Beispielsweise kann es manchmal eine gute Idee sein, einen Fehler auszulösen, wenn ungültige Parameter erkannt werden. Bisher haben wir bei der Eingabevalidierung meist Meldungen ausgegeben, aber wenn wir eine Funktion schreiben, die von anderswo ausgeführt wird, kann das bloße Ausdrucken von etwas unbemerkt bleiben, wenn die Funktion aufgerufen wird. Das Auslösen eines Fehlers kann das Debuggen erleichtern.

Im folgenden Beispiel haben wir eine Funktion, die Fakultäten berechnet (beispielsweise ist die Fakultät der Zahl 5: 1 * 2 * 3 * 4 * 5). Wenn das an die Funktion übergebene Argument negativ ist, löst die Funktion einen Fehler aus:

```python
def factorial(n):
    if n < 0:
        raise ValueError("Die Eingabe war negativ: " + str(n))
    k = 1
    for i in range(2, n + 1):
        k *= i
    return k

print(factorial(3))
print(factorial(6))
print(factorial(-1))
```

<sample-output>

6
720
Traceback (most recent call last):
  File "test.py", line 11, in <module>
    print(factorial(-1))
  File "test.py", line 3, in factorial
    raise ValueError("Die Eingabe war negativ: " + str(n))
ValueError: Die Eingabe war negativ: -1

</sample-output>


<programming-exercise name='Parametervalidierung' tmcname='part06-18_parameter_validation'>

Bitte schreiben Sie eine Funktion namens `new_person(name: str, age: int)`, die ein Tuple mit den Daten in den Argumenten erstellt und zurückgibt. Das erste Element sollte der Name und das zweite das Alter sein.

Wenn die in den Parametervariablen gespeicherten Werte nicht gültig sind, sollte die Funktion eine `ValueError`-Ausnahme auslösen.

Ungültige Parameter sind in diesem Fall:

* name ist eine leere Zeichenkette
* name enthält weniger als zwei Wörter
* name ist länger als 40 Zeichen
* age ist eine negative Zahl
* age ist größer als 150

</programming-exercise>

<programming-exercise name='Falsche Lottozahlen' tmcname='part06-19_incorrect_lottery_numbers'>

Die Datei `lottery_numbers.csv` enthält Lotto-Gewinnzahlen im folgenden Format:

<sample-data>

week 1;5,7,11,13,23,24,30
week 2;9,13,14,24,34,35,37
...etc...

</sample-data>

Jede Zeile sollte einen Kopf `week x` enthalten, gefolgt von sieben Ganzzahlen, die alle zwischen 1 und einschließlich 39 liegen.

Die Datei wurde beschädigt. Zeilen in der Datei können die folgenden Arten von Fehlern enthalten (diese exakten Zeilen sind möglicherweise nicht in der Datei vorhanden, aber Fehler in einem ähnlichen Format werden es sein):

Die Wochennummer ist falsch:

<sample-data>

week zzc;1,5,13,22,24,25,26

</sample-data>

Eine oder mehrere Zahlen sind nicht korrekt:

<sample-data>

week 22;1,**,5,6,13,2b,34

</sample-data>

Zu wenige Zahlen:

<sample-data>

week 13;4,6,17,19,24,33

</sample-data>

Die Zahlen sind zu klein oder zu groß:

<sample-data>

week 39;5,9,15,35,39,41,105

</sample-data>

Dieselbe Zahl erscheint zweimal:

<sample-data>

week 41;5,12,3,35,12,14,36

</sample-data>

Bitte schreiben Sie eine Funktion namens `filter_incorrect()`, die eine Datei namens `correct_numbers.csv` erstellt. Die Datei sollte nur diejenigen Zeilen aus der Originaldatei enthalten, die im korrekten Format vorliegen.

</programming-exercise>
