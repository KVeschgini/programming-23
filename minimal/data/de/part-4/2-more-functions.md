---
path: '/part-4/2-more-functions'
title: 'Mehr über Funktionen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie mehr über die Argumente und Parameter von Funktionen wissen
- werden Sie wissen, wie man Werte aus Funktionen zurückgibt und wie man diese Werte in Ihrem Code verwendet
- werden Sie in der Lage sein, Typ-Hinweise für Parameter und Rückgabewerte hinzuzufügen

</text-box>

Lassen Sie uns kurz Python-Funktionen wiederholen. Funktionen werden mit dem Schlüsselwort `def` definiert:

```python
def message():
    print("Diese Nachricht wurde Ihnen von einer Funktion präsentiert")
```

Diese Funktion kann in Ihrem Programmcode wie folgt aufgerufen werden:

```python
message()
```

Ihr Programm würde dann folgendes ausgeben:

<sample-output>

Diese Nachricht wurde Ihnen von einer Funktion präsentiert

</sample-output>

## Die Parameter und Argumente einer Funktion

Eine Funktion kann ein oder mehrere Argumente entgegennehmen. Wenn die Funktion aufgerufen wird, werden die Argumente Variablen zugewiesen, die in der Funktionsdefinition festgelegt sind. Diese Variablen werden Parameter genannt und sie werden in den Klammern nach dem Funktionsnamen aufgelistet.

Im folgenden Code hat die Funktion `greet` einen definierten Parameter, während die Funktion `sum` zwei hat.

```python
def greet(name):
    print("Hallo,", name)

def sum(a, b):
    print("Die Summe der Argumente ist", a + b)
```

```python
greet("Emily")
sum(2, 3)
```

<sample-output>

Hallo, Emily
Die Summe der Argumente ist 5

</sample-output>

<text-box variant='hint' name='Formal vs. tatsächlich, Parameter vs. Argument'>

Die Terminologie rund um Daten, die an Funktionen übergeben werden, kann verwirrend sein. Erschwerend kommt hinzu, dass einige Quellen das, was wir Parameter und Argumente genannt haben, als _formale_ und _tatsächliche Parameter_ bezeichnen. Andere Quellen nennen sie _formale_ und _tatsächliche Argumente_. [Die Python-Dokumentation](https://docs.python.org/3/glossary.html#term-argument) spezifiziert nur die Begriffe _Argument_ und _Parameter_, daher werden wir diese ebenfalls verwenden.

Was passiert eigentlich, wenn der Funktionsaufruf `greet("Emily")` ausgeführt wird?

In der Funktionsdefinition `greet(name)` verhält sich der Parameter `name` in jeder Hinsicht wie eine normale Variable. Wir können ihn innerhalb der Funktion genau so verwenden, wie wir bisher Variablen in den vielen Hauptfunktionen unserer Programme verwendet haben.

Im Funktionsaufruf `greet("Emily")` ist das Argument `"Emily"` genau wie jede andere Zeichenkette, der wir bisher begegnet sind. Wir können sie zum Beispiel einer Variablen zuweisen.

Wenn also der Funktionsaufruf ausgeführt wird, wird der Wert des Arguments, `"Emily"`, der Parametervariablen `name` zugewiesen. Für die Dauer _dieser Ausführung_ der Funktion gilt `name = "Emily"`. Wenn die Funktion mit einem anderen Argument aufgerufen wird, wird der Wert von `name` ein anderer sein.

Diese Terminologie mag etwas überflüssig erscheinen, aber die Informatik als Disziplin strebt danach, eine so exakte Wissenschaft wie möglich zu sein. Die Verwendung wohldefinierter Terminologie hilft dabei.

</text-box>

## Fehlermeldungen beim Ausführen von Tests

Die meisten Übungen in diesem Kurs sind mit automatischen Tests verbunden. Wenn Ihr Programm nicht wie in der Aufgabe spezifiziert funktioniert, zeigen die Tests eine Fehlermeldung an, die mehr oder weniger hilfreich sein kann. Es lohnt sich in der Regel, die Fehlermeldung sorgfältig zu lesen.

In manchen Situationen sagt Ihnen die Fehlermeldung vielleicht gar nicht viel. In der nächsten Übung unten könnten Sie auf diese Fehlermeldung stoßen:

<img src="4_2_1.png">

Die Meldung besagt lediglich, dass Sie in der Lage sein sollten, die Funktion `line` mit den angegebenen Argumenten aufzurufen:
```python
line(5, "")
```

Das eigentliche Problem wird klar, wenn wir versuchen, den in der Fehlermeldung angegebenen Funktionsaufruf auszuführen. Sie können dies tun, indem Sie den Funktionsaufruf in Ihr Programm kopieren und auf das Dreieck klicken:

<img src="4_2_2.png">

Die letzten Zeilen der Ausführung, die im obigen Bild hervorgehoben sind, sagen uns, dass Zeile 4 unseres Codes den Fehler _IndexError: string index out of range_ verursacht. Im [vorherigen Teil](/part-3/2-working-with-strings) gab es ein ähnliches Beispiel, bei dem wir versuchten, einen Index zu verwenden, der außerhalb des Bereichs der Zeichenkette lag. Diesmal tritt der Fehler auf, weil wir versuchen, auf das erste Zeichen einer leeren Zeichenkette zuzugreifen, also einer Zeichenkette der Länge 0.

<programming-exercise name='Linie' tmcname='part04-02_line'>

Bitte schreiben Sie eine Funktion namens `line`, die zwei Argumente entgegennimmt: eine Ganzzahl und eine Zeichenkette. Die Funktion gibt eine Textzeile aus, deren Länge durch das erste Argument bestimmt wird. Das zum Zeichnen der Linie verwendete Zeichen sollte das erste Zeichen im zweiten Argument sein. Wenn das zweite Argument eine leere Zeichenkette ist, soll die Linie aus Sternchen bestehen.

Ein Beispiel für das erwartete Verhalten:

```python
line(7, "%")
line(10, "LOL")
line(3, "")
```

<sample-output>

<pre>
%%%%%%%
LLLLLLLLLL
***
</pre>

</sample-output>

</programming-exercise>

## Funktionsaufrufe innerhalb von Funktionsaufrufen

Sie können eine Funktion aus einer anderen Funktion heraus aufrufen. Tatsächlich haben wir das schon oft getan, als wir im vorherigen Teil die Funktion `print` innerhalb unserer eigenen Funktionen aufgerufen haben. Unsere eigenen Funktionen unterscheiden sich funktional nicht davon. Im folgenden Beispiel ruft die Funktion `greet_many_times` die Funktion `greet` so oft auf, wie durch das Argument `times` angegeben:

```python
def greet(name):
    print("Hallo,", name)

def greet_many_times(name, times):
    while times > 0:
        greet(name)
        times -= 1

greet_many_times("Emily", 3)
```

<sample-output>

Hallo, Emily
Hallo, Emily
Hallo, Emily

</sample-output>

<programming-exercise name='Ein Kasten aus Rautezeichen' tmcname='part04-03_box_of_hashes'>

Bitte schreiben Sie eine Funktion namens `box_of_hashes`, die ein Rechteck aus Rautezeichen ausgibt. Die Funktion nimmt ein Argument entgegen, das die Höhe des Rechtecks angibt. Das Rechteck soll zehn Zeichen breit sein.

Die Funktion sollte die Funktion `line` aus der obigen Übung für die eigentliche Ausgabe aufrufen. Kopieren Sie Ihre Lösung zu dieser Übung über den Code für diese Übung. Bitte ändern Sie nichts an Ihrer `line`-Funktion.

Einige Beispiele, wie die Funktion funktionieren sollte:

```python
box_of_hashes(5)
print()
box_of_hashes(2)
```

<sample-output>

<pre>
##########
##########
##########
##########
##########

##########
##########
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Ein Quadrat aus Rautezeichen' tmcname='part04-04_square_of_hashes'>

Bitte schreiben Sie eine Funktion namens `square_of_hashes`, die ein Quadrat aus Rautezeichen zeichnet. Die Funktion nimmt ein Argument entgegen, das die Seitenlänge des Quadrats bestimmt.

Die Funktion sollte die Funktion `line` aus der obigen Übung für die eigentliche Ausgabe aufrufen. Kopieren Sie Ihre Lösung zu dieser Übung über den Code für diese Übung. Bitte ändern Sie nichts an der `line`-Funktion.

Einige Beispiele:

```python
square_of_hashes(5)
print()
square_of_hashes(3)
```

<sample-output>

<pre>
#####
#####
#####
#####
#####

###
###
###
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Ein Quadrat' tmcname='part04-05_square'>

Bitte schreiben Sie eine Funktion namens `square`, die ein Quadrat aus Zeichen ausgibt und zwei Argumente entgegennimmt. Der erste Parameter bestimmt die Seitenlänge des Quadrats. Der zweite Parameter bestimmt das Zeichen, das zum Zeichnen des Quadrats verwendet wird.

Die Funktion sollte die Funktion `line` aus der obigen Übung für die eigentliche Ausgabe aufrufen. Kopieren Sie Ihre Lösung zu dieser Übung über den Code für diese Übung. Bitte ändern Sie nichts an der `line`-Funktion.

Einige Beispiele:

```python
square(5, "*")
print()
square(3, "o")
```

<sample-output>

<pre>
*****
*****
*****
*****
*****

ooo
ooo
ooo
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Ein Dreieck' tmcname='part04-06_triangle'>

Bitte schreiben Sie eine Funktion namens `triangle`, die ein Dreieck aus Rautezeichen zeichnet und ein Argument entgegennimmt. Das Dreieck soll so hoch und so breit sein wie der Wert des Arguments.

Die Funktion sollte die Funktion `line` aus der obigen Übung für die eigentliche Ausgabe aufrufen. Kopieren Sie Ihre Lösung zu dieser Übung über den Code für diese Übung. Bitte ändern Sie nichts an der `line`-Funktion.

Einige Beispiele:

```python
triangle(6)
print()
triangle(3)
```

<sample-output>

<pre>
#
##
###
####
#####
######

#
##
###
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Eine Form' tmcname='part04-07_shape'>

Bitte schreiben Sie eine Funktion namens `shape`, die vier Argumente entgegennimmt. Die ersten beiden Parameter bestimmen ein Dreieck, wie oben, und das zu dessen Zeichnen verwendete Zeichen. Der erste Parameter bestimmt auch die Breite eines Rechtecks, während der dritte Parameter dessen Höhe bestimmt. Der vierte Parameter bestimmt das Füllzeichen des Rechtecks. Die Funktion gibt zuerst das Dreieck und dann das Rechteck darunter aus.

Die Funktion sollte die Funktion `line` aus der obigen Übung für die eigentliche Ausgabe aufrufen. Kopieren Sie Ihre Lösung zu dieser Übung über den Code für diese Übung. Bitte ändern Sie nichts an der `line`-Funktion.

Einige Beispiele:

```python
shape(5, "X", 3, "*")
print()
shape(2, "o", 4, "+")
print()
shape(3, ".", 0, ",")
```

<sample-output>

<pre>
X
XX
XXX
XXXX
XXXXX
*****
*****
*****

o
oo
++
++
++
++

.
..
...
</pre>

</sample-output>

**Hinweis**

Versuchen Sie nicht, diese Übung "auf einmal" zu lösen. Ein guter erster Schritt wäre sicherzustellen, dass Sie das Dreieck zuverlässig drucken können. Dann können Sie versuchen, das Rechteck hinzuzufügen.

Dies ist eine der wichtigsten Fähigkeiten eines Programmierers: **Konzentrieren Sie sich auf kleine, greifbare Abschnitte des Problems zur Zeit**. Lösen und verifizieren Sie Teillösungen und nutzen Sie diese, um auf eine vollständige Lösung hinzuarbeiten.

</programming-exercise>

<programming-exercise name='Eine Fichte' tmcname='part04-08_spruce'>

Bitte schreiben Sie eine Funktion namens `spruce`, die ein Argument entgegennimmt. Die Funktion gibt den Text `Eine Fichte!` aus und dann eine Fichte, deren Größe durch das Argument bestimmt wird.

Der Aufruf von `spruce(3)` sollte folgendes ausgeben:

<sample-output>

<pre>
Eine Fichte!
  *
 ***
*****
  *
</pre>

</sample-output>

Der Aufruf von `spruce(5)` sollte folgendes ausgeben:

<sample-output>

<pre>
Eine Fichte!
    *
   ***
  *****
 *******
*********
    *
</pre>

</sample-output>

**Hinweis: Links von der Fichte sollte genau die richtige Menge an Leerzeichen stehen**. Wenn die Form der Fichte korrekt aussieht, aber der linke Rand des Baumes nicht den linken Rand des Textbereichs im Terminal berührt, werden die Tests die Lösung nicht akzeptieren.

</programming-exercise>

## Der Rückgabewert einer Funktion

Funktionen können auch Werte zurückgeben. Zum Beispiel gibt die eingebaute Python-Funktion `input` eine vom Benutzer eingegebene Zeichenkette _zurück_. Der von einer Funktion zurückgegebene Wert kann in einer Variablen gespeichert werden:

```python
word = input("Bitte geben Sie ein Wort ein: ")
```

Wenn Sie einen ganzzahligen Wert vom Benutzer wünschen, muss die Eingabe des Benutzers in eine Ganzzahl umgewandelt werden. Die Funktion, die wir für diesen Zweck verwendet haben, ist `int`, und sie gibt ebenfalls einen Wert zurück:

```python
number = int(input("Bitte geben Sie eine Ganzzahl ein: "))
```

Die Funktion `int` nimmt die von `input` zurückgegebene Zeichenkette als Argument und gibt einen ganzzahligen Wert zurück, falls eine Ganzzahl aus der Zeichenkette interpretiert werden kann.

## Die return-Anweisung

Die Funktionen, die Sie selbst definieren, können ebenfalls Werte zurückgeben. Dazu benötigen Sie die `return`-Anweisung. Beispielsweise gibt die folgende Funktion `my_sum` die Summe ihrer Parameter zurück:

```python
def my_sum(a, b):
    return a + b

result = my_sum(2, 3)

print("Summe:", result)
```

<sample-output>

Summe: 5

</sample-output>

Hier ist ein weiteres Beispiel für einen Rückgabewert. Diese Funktion fragt nach dem Namen des Benutzers und gibt die vom Benutzer eingegebene Zeichenkette zurück:

```python
def ask_for_name():
    name = input("Wie ist Ihr Name? ")
    return name

name = ask_for_name()
print("Hallo,", name)
```

<sample-output>

Wie ist Ihr Name? **Anna**
Hallo, Anna

</sample-output>

Die `return`-Anweisung beendet die Ausführung der Funktion sofort. Das Folgende ist eine raffinierte Art, eine Vergleichsfunktion zu erstellen:

```python
def smallest(a,b):
    if a < b:
        return a
    return b

print(smallest(3, 7))
print(smallest(5, 2))
```

Die Idee hier ist, dass die Funktion, wenn `a` kleiner als `b` ist, `a` zurückgibt und sofort beendet wird. Wenn nicht, wird die Ausführung in der nächsten Zeile fortgesetzt, in der der Wert `b` zurückgegeben wird. Eine Funktion kann niemals zwei separate `return`-Anweisungen bei einem einzigen Funktionsaufruf ausführen.

<sample-output>

3
2

</sample-output>

Sie können die `return`-Anweisung auch dann verwenden, wenn die Funktion keinen Wert zurückgibt. Ihr Zweck ist es dann, die Ausführung der Funktion zu beenden:

```python
def greet(name):
    if name == "":
        print("???")
        return
    print("Hallo,", name)

greet("Emily")
greet("")
greet("Mark")
```

Wenn das Argument (das in der Variablen `name` gespeichert wird) eine leere Zeichenkette ist, gibt die Funktion `???` aus und beendet sich.

<sample-output>

Hallo, Emily
???
Hallo, Mark

</sample-output>

## Verwendung von Rückgabewerten aus Funktionen

Wir wissen bereits, dass die Rückgabewerte von Funktionen in Variablen gespeichert werden können:

```python
def my_sum(a, b):
    return a + b

result = my_sum(4, 6)
print("Die Summe ist", result)
```

<sample-output>

Die Summe ist 10

</sample-output>

Der Rückgabewert einer Funktion ist ein Wert wie jeder andere auch. Es ist nicht notwendig, ihn in einer Variablen zu speichern, um ihn als Argument an den `print`-Befehl zu übergeben:

```python
print("Die Summe ist", my_sum(4, 6))
```

Der Rückgabewert einer Funktion kann zum Argument einer anderen Funktion werden:

```python
def my_sum(a, b):
    return a+b

def difference(a, b):
    return a-b

result = difference(my_sum(5, 2), my_sum(2, 3))
print("Das Ergebnis ist", result)
```

<sample-output>

Das Ergebnis ist 2

</sample-output>

In diesem Fall werden zuerst die inneren Funktionsaufrufe `my_sum(5, 2)` und `my_sum(2, 3)` ausgeführt. Die von ihnen zurückgegebenen Werte (7 und 5) werden als Argumente des äußeren Funktionsaufrufs verwendet.

Der äußere Funktionsaufruf `difference(7, 5)` gibt den Wert 2 zurück, der in der Variablen `result` gespeichert und ausgegeben wird.

Zusammenfassend lässt sich sagen, dass von Funktionen zurückgegebene Werte genau wie jeder andere Wert in Python funktionieren. Sie können ausgegeben, in Variablen gespeichert, in Ausdrücken verwendet und als Argumente in anderen Funktionsaufrufen verwendet werden.

## Der Unterschied zwischen return und print

Manchmal kann der Unterschied zwischen einer Funktion, die einen Wert _zurückgibt_, und einer _print-Anweisung_ innerhalb einer Funktion verwirrend sein. Schauen wir uns zwei verschiedene Möglichkeiten an, eine Funktion zu implementieren, die ermittelt, welcher von zwei Werten größer ist:

```python
def max1(a, b):
    if a > b:
        return a
    else:
        return b

def max2(a, b):
    if a > b:
        print(a)
    else:
        print(b)

result = max1(3, 5)
print(result)

max2(7, 2)
```

<sample-output>

5
7

</sample-output>

Beide Versionen scheinen einwandfrei zu funktionieren, da die Maximalwerte korrekt ausgegeben werden. Es gibt jedoch einen grundlegenden Unterschied zwischen den beiden. Die erste der beiden Funktionen, `max1`, gibt von sich aus nichts aus, sondern _gibt den größeren Wert zurück_. Wenn wir die folgende Zeile ausführen

```python
max1(3, 5)
```

scheint nichts zu passieren. Der Rückgabewert der Funktion muss in irgendeiner Weise im Code verwendet werden, der die Funktion aufgerufen hat. Er kann beispielsweise in einer Variablen gespeichert und ausgegeben werden:

```python
result = max1(3, 5)
print(result)
```

Die zweite Version, `max2`, verwendet den `print`-Befehl _innerhalb der Funktion_, um den größeren Wert auszugeben. Wenn wir den Wert sehen wollen, reicht es aus, die Funktion aufzurufen

```python
max2(7, 5)
```

und der größere Wert wird ausgegeben. Der Nachteil dieser praktischen Funktion ist, dass der von der Funktion ermittelte Wert für die Verwendung im Programm, das sie aufgerufen hat, nicht zur Verfügung steht. Deshalb sind Funktionen, die Werte zurückgeben, oft die bessere Wahl.

<programming-exercise name='Die größte Zahl' tmcname='part04-09_greatest_number'>

Bitte schreiben Sie eine Funktion namens `greatest_number`, die drei Argumente entgegennimmt. Die Funktion gibt den größten Wert der drei zurück.

Ein Beispiel für die Verwendung der Funktion:

```python
print(greatest_number(3, 4, 1)) # 4
print(greatest_number(99, -4, 7)) # 99
print(greatest_number(0, 0, 0)) # 0
```

</programming-exercise>

<programming-exercise name='Gleiche Zeichen' tmcname='part04-10_same_characters'>

Bitte schreiben Sie eine Funktion namens `same_chars`, die eine Zeichenkette und zwei Ganzzahlen als Argumente entgegennimmt. Die Ganzzahlen beziehen sich auf Indizes innerhalb der Zeichenkette. Die Funktion soll `True` zurückgeben, wenn die beiden Zeichen an den angegebenen Indizes gleich sind. Andernfalls, und insbesondere wenn einer der Indizes außerhalb des Bereichs der Zeichenkette liegt, gibt die Funktion `False` zurück.

Einige Beispiele für die Verwendung der Funktion:

```python
# Gleiche Zeichen m und m
print(same_chars("programmer", 6, 7)) # True

# Unterschiedliche Zeichen p und r
print(same_chars("programmer", 0, 4)) # False

# Der zweite Index liegt nicht in der Zeichenkette
print(same_chars("programmer", 0, 12)) # False
```

</programming-exercise>

<programming-exercise name='Erstes, zweites und letztes Wort' tmcname='part04-11_first_second_last'>

Bitte schreiben Sie drei Funktionen: `first_word`, `second_word` und `last_word`. Jede Funktion nimmt ein Zeichenketten-Argument entgegen.

Wie ihre Namen vermuten lassen, geben die Funktionen entweder das erste, das zweite oder das letzte Wort in dem Satz zurück, den sie als Zeichenketten-Argument erhalten.

In jedem Fall können Sie davon ausgehen, dass die Argument-Zeichenkette mindestens zwei separate Wörter enthält und alle Wörter durch genau ein Leerzeichen getrennt sind. Am Anfang oder am Ende der Argument-Zeichenketten befinden sich keine Leerzeichen.

```python
sentence = "it was a dark and stormy python"

print(first_word(sentence)) # it
print(second_word(sentence)) # was
print(last_word(sentence)) # python
```

<sample-output>

it
was
python

</sample-output>

```python
sentence = "it was"

print(second_word(sentence)) # was
print(last_word(sentence)) # was
```

</programming-exercise>

## Der Typ des Arguments

Eine kurze Zusammenfassung der Datentypen, denen wir bisher begegnet sind:

Typ          | Python-Datentyp | Beispiel
:-------------|:----------------:|------
Ganzzahl       | `int`            | `23`
Gleitkommazahl | `float`          | `-0.45`
Zeichenkette   | `str`            | `"Peter Python"`
Boolescher Wert | `bool`           | `True`

Wenn Sie eine Funktion aufrufen, funktioniert sie nur dann korrekt, wenn die Argumente, die Sie ihr übergeben, vom richtigen Typ sind. Schauen wir uns ein Beispiel an:

```python
def print_many_times(message, times):
    while times > 0:
        print(message)
        times -= 1
```

Die Funktion arbeitet wie erwartet, wenn wir sie so aufrufen:

```python
print_many_times("Hallo", 5)
```

<sample-output>

Hallo
Hallo
Hallo
Hallo
Hallo

</sample-output>

Wenn wir der Funktion jedoch ein Argument des falschen Typs übergeben, wird sie nicht funktionieren:

```python
print_many_times("Hallo", "Emily")
```

<sample-output>

TypeError: '>' not supported between instances of 'str' and 'int'

</sample-output>

Das Problem hier ist, dass der zweite Parameter `times` in Zeile 2 der Funktionsdefinition mit einer Ganzzahl, `0`, verglichen wird. Das übergebene Argument war `"Emily"`, was eine Zeichenkette ist, keine Ganzzahl. Zeichenketten und Ganzzahlen können nicht so einfach verglichen werden, daher kommt es zu einem Fehler.

Um solche Probleme zu vermeiden, können Sie _Typ-Hinweise_ (type hints) in Ihre Funktionsdefinitionen aufnehmen. Der Typ-Hinweis gibt den für die Funktion vorgesehenen Typ des Arguments an:

```python
def print_many_times(message : str, times : int):
    while times > 0:
        print(message)
        times -= 1
```

Dies sagt jedem, der die Funktion verwendet, dass das in `message` gespeicherte Argument eine Zeichenkette sein soll und das in `times` gespeicherte Argument eine Ganzzahl sein soll.

Ebenso kann der Rückgabewert einer Funktion in der Funktionsdefinition angedeutet werden:

```python
def ask_for_name() -> str:
    name = input("Wie ist Ihr Name? ")
    return name
 ```

Dies sagt dem Benutzer der Funktion, dass die Funktion eine Zeichenkette zurückgeben soll.

**Hinweis:** Typ-Hinweise sind buchstäblich nur Hinweise auf den Typ des Arguments oder des Rückgabewerts. Sie sind keine Garantie für den Typ und definitiv kein Schutz gegen Typfehler. Wenn eine Funktion ein Argument erhält oder einen Wert des falschen Typs zurückgibt, wird die Funktion dennoch ausgeführt, aber sie funktioniert möglicherweise nicht korrekt.
