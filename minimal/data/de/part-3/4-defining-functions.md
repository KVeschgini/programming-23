---
path: '/part-3/4-defining-functions'
title: 'Funktionen definieren'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie Sie Ihre eigenen Funktionen schreiben und aufrufen
- werden Sie verstehen, was mit dem Argument und dem Parameter einer Funktion gemeint ist
- werden Sie in der Lage sein, Parameter in Ihren eigenen Funktionen zu definieren

</text-box>

Wir haben bereits Funktionen wie `len`, `print` und `input` in unseren Programmen verwendet. Dies sind in Python eingebaute Funktionen, die uns daher immer zur Verfügung stehen, unabhängig davon, in welcher Umgebung wir programmieren. Es ist jedoch auch möglich, eigene Funktionen zu definieren.

## Die Funktionsdefinition

Bevor eine Funktion verwendet werden kann, muss sie definiert werden. Jede Funktionsdefinition beginnt mit dem Schlüsselwort `def`, kurz für _define_ (definieren). Dann folgt der _Name_ der Funktion, gefolgt von Klammern und einem Doppelpunkt. Dies wird als _Header_ (Kopf) der Funktion bezeichnet. Danach folgt, genau wie bei `while`- und `if`-Blöcken eingerückt, der _Body_ (Körper) der Funktion.

Zum Beispiel definiert der folgende Code die Funktion `message`:

```python
def message():
    print("Dies ist meine ganz eigene Funktion!")
```

Wenn das obige Programm ausgeführt wird, scheint nichts zu passieren. Das liegt daran, dass der Code im Körper der Funktion nur ausgeführt wird, wenn die Funktion _aufgerufen_ wird.

Der Aufruf einer Funktion ist so einfach wie die Erwähnung ihres Namens in Ihrem Code. Wenn wir am Ende des obigen Programms einen Funktionsaufruf hinzufügen, etwa so:

```python
def message():
    print("Dies ist meine ganz eigene Funktion!")

message()
```

führt dies zu einer ausgegebenen Anweisung:

<sample-output>

Dies ist meine ganz eigene Funktion!

</sample-output>

Wenn eine Funktion definiert wurde, kann sie mehrmals aufgerufen werden:

```python
def message():
    print("Dies ist meine ganz eigene Funktion!")

message()
message()
message()
```

<sample-output>

Dies ist meine ganz eigene Funktion!
Dies ist meine ganz eigene Funktion!
Dies ist meine ganz eigene Funktion!

</sample-output>

<text-box variant='hint' name='Testen Ihrer eigenen Funktionen'>

Hinweis: Von nun an wird der Großteil der Übungen in diesem Kurs von Ihnen verlangen, eigene Funktion(en) zu schreiben.

Wenn ein Programm nur aus Funktionen besteht, scheint die Ausführung keine Wirkung zu haben. Der folgende Code gibt nichts aus, obwohl eine Print-Anweisung vorhanden ist:

```python
def greet():
    print("Hallo!")
```

Der Grund, warum nichts ausgegeben wird, ist, dass der Code im Körper der Funktion `greet` nur ausgeführt wird, wenn die Funktion aufgerufen wird.

Das "Hauptprogramm" unterhalb der Funktion sollte entsprechende Funktionsaufrufe enthalten, damit das Programm getestet werden kann. Tatsächlich behandelt Python allen Code, der sich nicht innerhalb von Funktionsdefinitionen befindet, als Teil der _Hauptfunktion_, die ausgeführt wird, wenn die Datei selbst ausgewertet oder ausgeführt wird. Fügen wir also einen Funktionsaufruf hinzu:

```python
def greet():
    print("Hallo!")

# Alles an Code, das nicht in Funktionsdefinitionen steht, ist Teil
# der Hauptfunktion des Programms
# Aufruf unserer Funktion:

greet()
```

**Wichtig**: In diesem Kurs erfordern die automatischen Tests, die für die Übungsdateien ausgeführt werden, eine leere Hauptfunktion. In der Hauptfunktion Ihrer Lösung sollten keine Befehle verbleiben. Das heißt, jeder Code, den Sie selbst zum Testen verwenden, muss in einem speziell definierten `if`-Block enthalten sein:

```python
def greet():
    print("Hallo!")

# Schreiben Sie Ihre Hauptfunktion innerhalb eines Blocks wie diesem:
if __name__ == "__main__":
    greet()
```

Jeglicher Code, der außerhalb des obigen Blocks verbleibt, verursacht einen Fehler:

<img src="3_4_1.png">

Der Zweck dessen ist sicherzustellen, dass Ihre Lösung auf einem sauberen Blatt getestet wird, da die Tests oft prüfen, was Ihre Funktionen ausgeben. Es ist erwähnenswert, dass die Tests keinen Code innerhalb des `if __name__ == "__main__"`-Blocks ausführen, daher sollte kein Code, der zur Erfüllung der Anforderungen der Übung benötigt wird, innerhalb des Blocks platziert werden.

</text-box>

<in-browser-programming-exercise name="Sieben Brüder" tmcname="part03-28_seven_brothers">

Bitte schreiben Sie eine Funktion namens `seven_brothers`. Wenn die Funktion aufgerufen wird, soll sie die Namen der sieben Brüder in alphabetischer Reihenfolge ausgeben, wie im folgenden Beispiel gezeigt. Weitere Einzelheiten zu den Brüdern finden Sie in der [gleichnamigen Übung in Teil 1](/part-1/1-getting-started#programming-exercise-fix-the-code-seven-brothers).


<sample-output>

Aapo
Eero
Juhani
Lauri
Simeoni
Timo
Tuomas

</sample-output>

</in-browser-programming-exercise>

## Funktionsargumente

Funktionen nehmen oft ein oder mehrere _Argumente_ entgegen, die beeinflussen können, was die Funktion tut. Beispielsweise nehmen die eingebauten Python-Funktionen `print` und `input` als Argument(e) den Text entgegen, der angezeigt werden soll:

```python
print("Hallo!")                           # Argument ist die Zeichenkette "Hallo!"
name = input("Wie heißen Sie? ")          # Argument ist die Zeichenkette "Wie heißen Sie? "
print(name)                               # Argument ist der Wert der Variable name
```

Es wurde bereits erwähnt, dass die Begriffe _Argument_ und _Parameter_ oft synonym verwendet werden. Der Unterschied besteht darin, dass _Argument_ für die Daten verwendet wird, die beim Aufruf der Funktion an diese übergeben werden, während _innerhalb_ der Funktion die Argumente Variablen zugewiesen werden, die _Parameter_ genannt werden. Grob gesagt nennen wir die übergebenen Daten beim Funktionsaufruf Argumente, bei der Definition der Funktion nennen wir sie jedoch Parameter.

Dies mag wie eine unnötige semantische Unterscheidung erscheinen, und um die Sache noch unklarer zu machen, folgen nicht alle Quellen dieser Definition. In diesem Kurs versuchen wir jedoch, die Unterscheidung klar zu halten, da die Kenntnis der korrekten Terminologie Ihnen helfen wird, andere Quellen neben diesem Kursmaterial zu verstehen.

Definieren wir einige Funktionen, die Argumente entgegennehmen. In der Funktionsdefinition werden die Parameter in den Klammern nach dem Funktionsnamen definiert:

```python
def hello(target):
    print("Hallo", target)
```

Wenn wir diese Funktion zweimal aufrufen, etwa so:

```python
hello("Emily")
hello("Welt!")
```

werden zwei verschiedene Begrüßungen ausgegeben:

<sample-output>

Hallo Emily
Hallo Welt!

</sample-output>

Schauen wir uns die Funktionsdefinition genauer an:

```python
def hello(target):
    print("Hallo", target)
```

In der ersten Zeile, im Funktionskopf, haben wir definiert, dass diese Funktion ein Argument entgegennimmt und es einem Parameter namens `target` zuweist. Im Körper der Funktion verwendet der `print`-Befehl den in `target` gespeicherten Wert.

Wenn die Funktion aufgerufen wird, hat der Parameter `target` den Wert, der im Funktionsaufruf als Argument übergeben wurde. Beispielsweise bewirkt der folgende Funktionsaufruf

```python
name = "Alan"
hello(name)
```

dass der Parameter `target` auf den Wert `"Alan"` gesetzt wird.

Die Namen von Funktionen und ihren Parametern folgen denselben Prinzipien wie die Namen von Variablen. Sie sollten beschreibend sein und primär aus Kleinbuchstaben und Unterstrichen bestehen. Auch hier gibt es einige Ausnahmen von diesen Richtlinien, aber diese werden wir vorerst ignorieren.

<in-browser-programming-exercise name="Das erste Zeichen" tmcname="part03-29_first_character">

Die Übung enthält den Entwurf der Funktion `first_character`. Bitte vervollständigen Sie diese so, dass sie das erste Zeichen der Zeichenkette ausgibt, die sie als Argument erhält.

```python
def first_character(text):
     # schreiben Sie hier Ihren Code
     pass

# Testen der Funktion:
if __name__ == "__main__":
    first_character('python')
    first_character('yellow')
    first_character('tomorrow')
    first_character('heliotrope')
    first_character('open')
    first_character('night')
```

<sample-output>

p
y
t
h
o
n

</sample-output>

</in-browser-programming-exercise>

<text-box variant='hint' name='Testen Ihrer Funktionen mit Argumenten'>

Wann immer Ihre Funktion ein oder mehrere Argumente entgegennimmt, empfiehlt es sich, sie mit verschiedenen Argumenten zu testen.

Achten Sie besonders auf "Spezialfälle", die für den Typ des von Ihnen verwendeten Arguments spezifisch sind. Wie verhält sich Ihre Funktion, wenn das Argument Null, eine negative Zahl oder eine Fließkommazahl anstelle einer ganzen Zahl ist? Was passiert, wenn das Argument eine leere Zeichenkette ist?

Wenn die Übungsaufgabe Sie nicht explizit auffordert, Funktionsaufrufe einzufügen, können Sie gerne Ihre eigenen innerhalb des `if`-Blocks der Hauptfunktion hinzufügen, wie oben erklärt. Die Tests ignorieren alles innerhalb des `if`-Blocks.

</text-box>

## Weitere Beispiele

Schauen wir uns einige weitere Beispiele für Funktionen an, die Argumente entgegennehmen. In der folgenden Funktionsdefinition ist der Parameter eine Zahl:

```python
def squared(x):
    print(f"Das Quadrat der Zahl {x} ist {x * x}")

squared(2)
squared(5)
```

<sample-output>

Das Quadrat der Zahl 2 ist 4
Das Quadrat der Zahl 5 ist 25

</sample-output>

In dieser Funktionsdefinition befindet sich hingegen eine `if`-Anweisung im Körper der Funktion:

```python
def hello(name):
    if name == "Emily":
        print("Hallo", name)
    else:
        print("Guten Tag", name)

hello("Emily")
hello("Mark")
```

<sample-output>

Hallo Emily
Guten Tag Mark

</sample-output>

Diese Funktion nimmt zwei Argumente entgegen:

```python
def sum(x, y):
    result = x + y
    print(f"Die Summe der Argumente {x} und {y} ist {result}")

sum(1, 2)
sum(5, 24)
```

<sample-output>

Die Summe der Argumente 1 und 2 ist 3
Die Summe der Argumente 5 und 24 ist 29

</sample-output>

Die Funktion enthält auch die Hilfsvariable `result`, die sie verwendet, um die Summe ihrer Argumente zu speichern.

Beachten Sie, dass die Namen der Parameter innerhalb der Funktionsdefinition keine Beziehung zu Variablen außerhalb dieser haben. Wir könnten die obige Funktion genauso gut so aufrufen:

```python
x = 100
y = 30
sum(1, 2)
sum(x + y, 10)
```

Dies sollte Folgendes ausgeben:

<sample-output>

Die Summe der Argumente 1 und 2 ist 3
Die Summe der Argumente 130 und 10 ist 140

</sample-output>

Im ersten Funktionsaufruf werden den Parametern die Werte `x = 1` und `y = 2` zugewiesen. Im zweiten Funktionsaufruf werden ihnen die Werte `x = 130` und `y = 10` zugewiesen, unabhängig von den ähnlich benannten Variablen, die im Funktionsaufruf verwendet werden.

Wir werden zu Beginn des nächsten Teils des Kurses auf Funktionsdefinitionen zurückkommen.

<!--a similar warning is in sections 3-4, 4-6 and 5-1, check them all if you're changing this-->
## Warnung: Verwendung globaler Variablen innerhalb von Funktionen

In den obigen Beispielen haben wir gesehen, dass es möglich ist, neue Variablen innerhalb von Funktionsdefinitionen zuzuweisen. Die Funktion kann auch Variablen sehen, die außerhalb von ihr, in der Hauptfunktion, zugewiesen wurden. Solche Variablen werden als _globale_ Variablen bezeichnet.

Die Verwendung globaler Variablen innerhalb von Funktionen ist in der Regel eine schlechte Idee. Dies kann unter anderem Fehler verursachen, die schwer nachzuvollziehen sind.

Unten ist ein Beispiel für eine Funktion, die "aus Versehen" eine globale Variable verwendet:

```python
# dies ist eine globale Variable
name = "Betty"

def hello(given_name):
    # Verwendung der globalen Variable anstelle des Parameters aus Versehen
    print("Hallo", name)

hello("Steve")
hello("Betty")
```

<sample-output>

Hallo Betty
Hallo Betty

</sample-output>

Egal mit wie vielen verschiedenen Argumenten wir die Funktion aufrufen, sie wird immer den in der globalen Variable gespeicherten Wert `"Betty"` ausgeben.

<in-browser-programming-exercise name="Mittelwert" tmcname="part03-30_mean">

Bitte schreiben Sie eine Funktion namens `mean`, die drei ganzzahlige Argumente entgegennimmt. Die Funktion soll das arithmetische Mittel der drei Argumente ausgeben.

```python
mean(5, 3, 1)
mean(10, 1, 1)
```

<sample-output>

3.0
4.0

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Mehrmals ausgeben" tmcname="part03-31_print_many_times">

Bitte schreiben Sie eine Funktion namens `print_many_times(text, times)`, die eine Zeichenkette und eine ganze Zahl als Argumente entgegennimmt. Das ganzzahlige Argument gibt an, wie oft das Zeichenkettenargument ausgegeben werden soll:

```python
print_many_times("hi", 5)

print()

text = "Alle Pythons, außer einer, wachsen auf"
times = 3
print_many_times(text, times)
```
<sample-output>

hi
hi
hi
hi
hi

Alle Pythons, außer einer, wachsen auf
Alle Pythons, außer einer, wachsen auf
Alle Pythons, außer einer, wachsen auf

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Ein Quadrat aus Rautezeichen" tmcname="part03-32_square_of_hashes">

Bitte schreiben Sie eine Funktion namens `hash_square(length)`, die ein ganzzahliges Argument entgegennimmt. Die Funktion gibt ein Quadrat aus Rautezeichen aus, und das Argument gibt die Seitenlänge des Quadrats an.

```python
hash_square(3)
print()
hash_square(5)
```

<sample-output>

<pre>
###
###
###

#####
#####
#####
#####
#####
</pre>

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Schachbrett" tmcname="part03-33_chessboard">

Bitte schreiben Sie eine Funktion namens `chessboard`, die ein Schachbrett aus Einsen und Nullen ausgibt. Die Funktion nimmt ein ganzzahliges Argument entgegen, das die Seitenlänge des Bretts angibt. Weitere Einzelheiten finden Sie in den folgenden Beispielen:

```python
chessboard(3)
print()
chessboard(6)
```

<sample-output>

<pre>
101
010
101

101010
010101
101010
010101
101010
010101
</pre>

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Ein Wort im Quadrat" tmcname="part03-34_word_squared">

Bitte schreiben Sie eine Funktion namens `squared`, die ein Zeichenkettenargument und ein ganzzahliges Argument entgegennimmt und ein Quadrat aus Zeichen ausgibt, wie in den folgenden Beispielen gezeigt.

```python
squared("ab", 3)
print()
squared("aybabtu", 5)
```

<sample-output>

<pre>
aba
bab
aba

aybab
tuayb
abtua
ybabt
uayba
</pre>

</sample-output>

</in-browser-programming-exercise>

<!---
