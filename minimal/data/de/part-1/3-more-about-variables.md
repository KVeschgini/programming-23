---
path: "/part-1/3-more-about-variables"
title: "Mehr über Variablen"
hidden: false
---

<text-box variant='learningObjectives' name='Lernziele'>

Nach diesem Abschnitt

- werden Sie in der Lage sein, Variablen in verschiedenen Kontexten zu verwenden
- werden Sie wissen, welche Art von Daten in Variablen gespeichert werden können
- werden Sie den Unterschied zwischen Strings, Ganzzahlen (Integers) und Fließkommazahlen (Floats) verstehen

</text-box>

Variablen werden für verschiedene Zwecke in der Programmierung benötigt. Sie können Variablen verwenden, um alle Informationen zu speichern, die später bei der Ausführung des Programms benötigt werden.

In der Python-Programmierung werden Variablen wie folgt erstellt:

`variablen_name = ...`

Hier bedeutet `...` der in der Variable gespeicherte Wert.

Wenn Sie zum Beispiel den Befehl `input` verwendet haben, um einen String vom Benutzer einzulesen, haben Sie den String in einer Variable gespeichert und die Variable später in Ihrem Programm verwendet:

```python
name = input("Wie ist Ihr Name? ")
print("Hallo, " + name)
```

<sample-output>

Wie ist Ihr Name? **Ghosty**
Hallo, Ghosty

</sample-output>

Der in einer Variable gespeicherte Wert kann auch unter Verwendung anderer Variablen definiert werden:

```python
vorname = "Paul"
nachname = "Python"

name = vorname + " " + nachname

print(name)
```

<sample-output>

Paul Python

</sample-output>

Hier werden die in den drei Variablen gespeicherten Werte nicht aus Benutzereingaben gewonnen. Sie bleiben bei jeder Ausführung des Programms gleich. Dies wird als _Hardcoding_ von Daten in das Programm bezeichnet.

## Ändern des Wertes einer Variable

Wie der Name _Variable_ schon sagt, kann sich der in einer Variable gespeicherte Wert ändern. Im vorigen Abschnitt haben wir festgestellt, dass der neue Wert den alten ersetzt.

Während der Ausführung des folgenden Programms wird die Variable `wort` drei verschiedene Werte haben:

```python
wort = input("Bitte geben Sie ein Wort ein: ")
print(wort)

wort = input("Und noch ein Wort: ")
print(wort)

wort = "drittes"
print(wort)
```

<sample-output>

Bitte geben Sie ein Wort ein: **erstes**
erstes
Und noch ein Wort: **zweites**
zweites
drittes

</sample-output>

Der in der Variable gespeicherte Wert ändert sich jedes Mal, wenn der Variable ein neuer Wert zugewiesen wird.

Der neue Wert einer Variable kann von ihrem alten Wert abgeleitet werden. Im folgenden Beispiel wird der Variable `wort` zunächst ein Wert basierend auf der Benutzereingabe zugewiesen. Dann wird ihr ein neuer Wert zugewiesen, der der alte Wert mit drei angehängten Ausrufezeichen ist.

```python
wort = input("Bitte geben Sie ein Wort ein: ")
print(wort)

wort = wort + "!!!"
print(wort)
```

<sample-output>

Bitte geben Sie ein Wort ein: **Test**
Test
Test!!!

</sample-output>

<text-box variant="hint" name="Einen guten Namen für eine Variable wählen">

* Es ist oft nützlich, Variablen danach zu benennen, wofür sie verwendet werden. Wenn die Variable zum Beispiel ein Wort enthält, ist der Name `wort` eine bessere Wahl als etwa `a`.

* In Python gibt es keine feste Grenze für die Länge eines Variablennamens, aber es gibt einige andere Einschränkungen. Ein Variablenname sollte mit einem Buchstaben beginnen und darf nur Buchstaben, Zahlen und Unterstriche &#95; enthalten.

* Klein- und Großbuchstaben sind unterschiedliche Zeichen. Die Variablen `name`, `Name` und `NAME` sind alle unterschiedliche Variablen. Obwohl diese Regel einige Ausnahmen hat, werden wir diese vorerst ignorieren.

* In Python ist es eine gängige Programmierpraxis, in Variablennamen nur Kleinbuchstaben zu verwenden. Wenn der Variablenname aus mehreren Wörtern besteht, verwenden Sie einen Unterstrich zwischen den Wörtern. Obwohl diese Regel ebenfalls einige Ausnahmen hat, werden wir diese vorerst ignorieren.

</text-box>

## Ganzzahlen (Integers)

Bisher haben wir nur Strings in Variablen gespeichert, aber es gibt auch viele andere Arten von Informationen, die wir später speichern und auf die wir zugreifen wollen. Schauen wir uns zunächst die Ganzzahlen an. Ganzzahlen sind Zahlen, die keinen Dezimal- oder Bruchteil haben, wie zum Beispiel `-15`, `0` und `1`.

Das folgende Programm erstellt die Variable `alter`, die einen ganzzahligen Wert enthält.

```python
alter = 24
print(alter)
```

Das Programm gibt nur dies aus:

<sample-output>

24

</sample-output>

Beachten Sie das Fehlen von Anführungszeichen hier. Wenn wir Anführungszeichen um die Zahl setzen würden, würde dies bedeuten, dass unsere Variable keine Ganzzahl mehr wäre, sondern stattdessen ein String. Ein String kann Zahlen enthalten, wird aber anders verarbeitet.

Warum spielt es also eine Rolle, dass Variablen einen Typ haben, wenn das folgende Programm immer noch zweimal dasselbe ausgibt?

```python
nummer1 = 100
nummer2 = "100"

print(nummer1)
print(nummer2)
```

<sample-output>

100
100

</sample-output>

Variablentypen sind wichtig, weil verschiedene Operationen unterschiedliche Typen von Variablen auf unterschiedliche Weise beeinflussen. Schauen wir uns ein Beispiel an:

```python
nummer1 = 100
nummer2 = "100"

print(nummer1 + nummer1)
print(nummer2 + nummer2)
```

Dies gibt Folgendes aus:

<sample-output>

200
100100

</sample-output>

Bei ganzzahligen Werten bedeutet der `+`-Operator Addition, bei String-Werten jedoch Konkatenation oder "Aneinanderreihung".

Nicht alle Operatoren sind für alle Arten von Variablen verfügbar. Während Zahlen mit dem Divisionsoperator `/` dividiert werden können, verursacht der Versuch, einen String durch eine Zahl zu dividieren, einen Fehler:

```python
nummer = "100"
print(nummer / 2)
```

<sample-output>
TypeError: unsupported operand type(s) for /: 'str' and 'int'
</sample-output>

## Kombinieren von Werten beim Drucken

Ebenso wird das folgende Programm nicht funktionieren, da `"Das Ergebnis ist "` und `ergebnis` von zwei verschiedenen Typen sind:

```python
ergebnis = 10 * 25
# die folgende Zeile verursacht einen Fehler
print("Das Ergebnis ist " + ergebnis)
```

Das Programm gibt nichts aus, sondern wirft stattdessen einen Fehler:

<sample-output>

TypeError: unsupported operand type(s) for +: 'str' and 'int'

</sample-output>

Hier sagt uns Python, dass das Kombinieren von zwei verschiedenen Typen von Werten nicht einfach so funktioniert. In diesem Fall ist `"Das Ergebnis ist "` vom Typ String, während der in `ergebnis` gespeicherte Wert vom Typ Ganzzahl (Integer) ist.

Wenn wir einen String und eine Ganzzahl in einem einzigen Befehl ausgeben wollen, kann die Ganzzahl mit der `str`-Funktion in einen String umgewandelt werden, und die beiden Strings können dann normal kombiniert werden. Dies würde zum Beispiel funktionieren:

```python
ergebnis = 10 * 25
print("Das Ergebnis ist " + str(ergebnis))
```

<sample-output>

Das Ergebnis ist 250

</sample-output>

Der `print`-Befehl verfügt auch über integrierte Funktionen, die das Kombinieren verschiedener Werttypen unterstützen. Der einfachste Weg ist, ein Komma zwischen die Werte zu setzen. Alle Werte werden unabhängig von ihrem Typ ausgegeben:

```python
ergebnis = 10 * 25
print("Das Ergebnis ist", ergebnis)
```

<sample-output>

Das Ergebnis ist 250

</sample-output>

Beachten Sie, dass hier automatisch ein Leerzeichen zwischen den durch ein Komma getrennten Werten eingefügt wird.

## Drucken mit f-strings

Was ist, wenn wir mehr Flexibilität und Kontrolle darüber haben wollen, was wir ausgeben? Sogenannte _f-strings_ sind eine weitere Möglichkeit, Ausgaben in Python zu formatieren. Die Syntax kann anfangs etwas verwirrend aussehen, aber letztendlich sind f-strings oft die einfachste Art, Text zu formatieren.

Mit f-strings würde das vorherige Beispiel so aussehen:

```python
ergebnis = 10 * 25
print(f"Das Ergebnis ist {ergebnis}")
```

Lassen Sie uns dies auseinandernehmen. Ganz am Anfang des Strings, den wir ausgeben, steht das Zeichen _f_. Dies sagt Python, dass das, was folgt, ein f-string ist. Innerhalb des Strings, eingeschlossen in geschweifte Klammern, befindet sich der Variablenname `ergebnis`. Der darin enthaltene Wert wird Teil des ausgegebenen Strings. Die Ausgabe ist exakt dieselbe wie in den vorherigen Beispielen:

<sample-output>

Das Ergebnis ist 250

</sample-output>

Ein einzelner f-string kann mehrere Variablen enthalten. Dieser Code zum Beispiel:

```python
name = "Mark"
alter = 37
stadt = "Palo Alto"
print(f"Hallo {name}, Sie sind {alter} Jahre alt. Sie wohnen in {stadt}.")
```

gibt dies aus:

<sample-output>

Hallo Mark, Sie sind 37 Jahre alt. Sie wohnen in Palo Alto.

</sample-output>

Es ist schwierig, eine solche Ausgabe mit der Komma-Notation im `print`-Befehl zu erstellen. Dieses Programm zum Beispiel:

```python
name = "Mark"
alter = 37
stadt = "Palo Alto"
print("Hallo", name, ", Sie sind", alter, "Jahre alt. Sie wohnen in", stadt, ".")
```

gibt Folgendes aus:

<sample-output>

Hallo Mark , Sie sind 37 Jahre alt. Sie wohnen in Palo Alto .

</sample-output>

Beachten Sie das automatisch eingefügte Leerzeichen zwischen jedem durch Komma getrennten Teil der Ausgabe. Es ist technisch möglich, den `print`-Befehl daran zu hindern, die zusätzlichen Leerzeichen hinzuzufügen, aber es ist die Mühe nicht wert, da wir stattdessen f-strings verwenden können.

In ihrer Einfachheit kann die Komma-Notation des `print`-Befehls oft nützlich sein, aber sie verursacht manchmal mehr Probleme, als sie wert ist. F-strings sind in der Regel die zuverlässigere Option. In Teil 4 werden Sie mehr über die praktischen Funktionen von f-strings bei der Formatierung von Ausgaben erfahren.

<text-box variant="hint" name="F-strings und Python-Versionen">

Wenn Sie eine ältere Version von Python verwenden, funktionieren f-strings möglicherweise nicht. Sie wurden in der Python-Version 3.6 eingeführt. Später im Kurs werden Sie Python auf Ihrem eigenen Computer installieren. Leider sind die moderneren Versionen von Python nicht immer für ältere Betriebssysteme verfügbar. Wenn dies bei Ihrem Computer der Fall ist, können Sie bei Übungen, die die Verwendung von f-strings erfordern, diese immer in den In-Browser-Übungsvorlagen in diesen frühen Teilen dieses Kurses ausprobieren.

</text-box>

<in-browser-programming-exercise name="Zusätzliches Leerzeichen" tmcname="part01-10b_extra_space" height=400px>

Ihre Freundin arbeitet an einer App für Arbeitssuchende. Sie schickt Ihnen diesen Codeausschnitt:

```python
name = "Tim Tester"
age = 20
skill1 = "python"
level1 = "beginner"
skill2 = "java"
level2 = "veteran"
skill3 = "programming"
level3 = "semiprofessional"
lower = 2000
upper = 3000

print("my name is ", name, " , I am ", age, "years old")
print("my skills are")
print("- ", skill1, " (", level1, ")")
print("- ", skill2, " (", level2, ")")
print("- ", skill3, " (", level3, " )")
print("I am looking for a job with a salary of", lower, "-", upper, "euros per month")
```

Das Programm sollte _exakt_ Folgendes ausgeben:

<sample-output>

<pre>
my name is Tim Tester, I am 20 years old

my skills are
 - python (beginner)
 - java (veteran)
 - programming (semiprofessional)

I am looking for a job with a salary of 2000-3000 euros per month
</pre>

</sample-output>

Der Code funktioniert fast korrekt, aber nicht ganz. Diese Übung hat sehr strenge Tests, die die Ausgabe auf jedes einzelne Leerzeichen prüfen.

Bitte korrigieren Sie den Code so, dass die Ausgabe richtig aussieht. Beachten Sie insbesondere, wie die Komma-Notation im `print`-Befehl automatisch ein Leerzeichen um die verschiedenen durch Komma getrennten Teile einfügt.

Der einfachste Weg, den Code so umzugestalten, dass er die Anforderungen erfüllt, ist die Verwendung von f-strings.

Hinweis: Sie können eine Leerzeile ausgeben, indem Sie einen leeren `print`-Befehl hinzufügen oder das Zeilenumbruchzeichen `\n` in Ihren String einfügen.

Denken Sie daran, auch in Zukunft in diesem Kurs besonders vorsichtig bei der Formatierung von Ausgaben zu sein. Einige der Übungen haben Tests, die erfordern, dass Ihre Ausgabe exakt so ist, wie in den angegebenen Beispielen spezifiziert. Bitte verwenden Sie zum Beispiel tatsächliche Leerzeichen in Ihrem Code anstelle von ASCII-Zeichencodes für Leerzeichen oder Ähnlichem.

</in-browser-programming-exercise>

## Fließkommazahlen (Floats)

`Fließkommazahl` oder _Float_ ist ein Begriff, der Ihnen beim Programmieren oft begegnen wird. Er bezieht sich auf Zahlen mit einem Dezimalpunkt. Sie können fast genauso wie ganzzahlige Werte verwendet werden.

Dieses Programm berechnet den Mittelwert von drei Fließkommazahlen:

```python
nummer1 = 2.5
nummer2 = -1.25
nummer3 = 3.62

mittelwert = (nummer1 + nummer2 + nummer3) / 3
print(f"Mittelwert: {mittelwert}")
```

<sample-output>

Mittelwert: 1.6233333333333333

</sample-output>

<in-browser-programming-exercise name="Arithmetik" tmcname="part01-11_arithmetics">

Dieses Programm enthält bereits zwei Ganzzahlvariablen, `x` und `y`:

```python
x = 27
y = 15
```

Bitte vervollständigen Sie das Programm so, dass es auch Folgendes ausgibt:

<sample-output>

27 + 15 = 42
27 - 15 = 12
27 * 15 = 405
27 / 15 = 1.8

</sample-output>

Das Programm sollte auch dann korrekt funktionieren, wenn die Werte der Variablen geändert werden. Das heißt, wenn die ersten beiden Zeilen durch diese ersetzt werden:

```python
x = 4
y = 9
```

sollte das Programm Folgendes ausgeben:

<sample-output>

4 + 9 = 13
4 - 9 = -5
4 * 9 = 36
4 / 9 = 0.4444444444444444

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Code korrigieren: Eine einzelne Zeile ausgeben" tmcname="part01-12_print_a_single_line">

Jeder `print`-Befehl gibt normalerweise eine eigene Zeile aus, komplett mit einem Zeilenwechsel am Ende. Wenn dem `print`-Befehl jedoch ein zusätzliches Argument `end = ""` übergeben wird, wird kein Zeilenwechsel ausgegeben.

Zum Beispiel:

```python
print("Hallo ", end="")
print("Welt!")
```

<sample-output>

Hallo Welt!

</sample-output>

Bitte korrigieren Sie dieses Programm so, dass die gesamte Berechnung inklusive Ergebnis in einer einzigen Zeile ausgegeben wird. Ändern Sie nicht die Anzahl der verwendeten `print`-Befehle.

```python
print(5)
print(" + ")
print(8)
print(" - ")
print(4)
print(" = ")
print(5 + 8 - 4)
```

</in-browser-programming-exercise>
