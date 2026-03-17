---
path: '/part-7/1-modules'
title: 'Module'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was ein Python-Modul ist
- werden Sie in der Lage sein, ein Modul mit der `import`-Anweisung in Ihr Programm einzubinden
- werden Sie wissen, wie Sie nach weiteren Informationen über den Inhalt von Modulen suchen können

</text-box>

## Debugging revisited

Wir sind in diesem Kurs bereits auf einige Debugging-Methoden gestoßen. Das [Visualisierungstool](http://www.pythontutor.com/visualize.html#mode=edit) sollte Ihnen inzwischen vertraut sein, und [Debugging-Ausdrucke](/part-2/1-programming-terminology#debugging) sind mittlerweile ein bewährter Standard. Möglicherweise haben Sie auch den in Visual Studio Code [integrierten Debugger](/part-4/1-vscode#the-built-in-debugger) ausprobiert. Falls Sie auf Probleme gestoßen sind, bei denen der Debugger Ihre Dateien nicht findet, gab es im [vorherigen Teil](/part-6/1-reading-files#debugging-code-which-handles-files) einige Tipps zum Umgang mit diesen Situationen.

In Python Version 3.7 wurde ein weiteres einfaches und nützliches Werkzeug zum Debuggen von Programmen eingeführt: der Befehl [breakpoint()](https://docs.python.org/3/library/functions.html?highlight=breakpoint#breakpoint).

Sie können diesen Befehl an jeder beliebigen Stelle in Ihrem Code einfügen (natürlich innerhalb der normalen syntaktischen Regeln). Wenn das Programm ausgeführt wird, hält die Ausführung an der Stelle an, an der Sie den `breakpoint`-Befehl eingefügt haben. Hier ist ein Beispiel für Debugging-Bemühungen beim Lösen einer der Übungen aus dem vorherigen Teil (bitte ignorieren Sie die finnischen Variablennamen in den Bildern und konzentrieren Sie sich auf die Funktionalität):

<img src="7_1_1.png">

Wenn die Ausführung beim `breakpoint`-Befehl anhält, öffnet sich ein interaktives Konsolenfenster. Hier können Sie beliebigen Code schreiben, genau wie in einer normalen Python-Konsole, und sehen, wie der Code genau an diesem Punkt im Programm funktioniert.

Der `breakpoint`-Befehl ist besonders nützlich, wenn Sie wissen, dass eine bestimmte Codezeile einen Fehler verursacht, aber nicht ganz sicher sind, warum das so ist. Fügen Sie einen Breakpoint kurz vor der problematischen Codezeile ein und führen Sie Ihr Programm aus. Jetzt können Sie im interaktiven Konsolenfenster verschiedene Optionen ausprobieren und die korrekten Befehle für Ihr Programm herausfinden.

Es ist auch möglich, die Ausführung von der Stelle aus fortzusetzen, an der sie angehalten wurde. Der Befehl `continue` oder die Kurzform `c`, die in die Debugging-Konsole eingegeben wird, setzt die Ausführung fort, bis der nächste Breakpoint erreicht wird. Das folgende Bild zeigt eine Situation, in der die Schleife bereits einige Male ausgeführt wurde:

<img src="7_1_2.png">

In der Debugging-Konsole stehen auch einige andere Befehle zur Verfügung. Sie finden diese [hier](https://docs.python.org/3/library/pdb.html#debugger-commands), oder Sie können _help_ in die Debugging-Konsole eingeben:

<img src="7_1_3.png">

Der Befehl _exit_ beendet die Ausführung des Programms.

Wenn Sie mit dem Debuggen fertig sind, denken Sie daran, die `breakpoint`-Befehle wieder aus Ihrem Code zu entfernen!

## Verwendung von Modulen

Die Definition der Sprache Python enthält bereits einige nützliche Funktionen, wie die `len`-Funktion, die die Länge einer Zeichenkette oder einer Liste zurückgibt, oder die `sum`-Funktion, die die Summe der Elemente in einer Datenstruktur zurückgibt. Diese bringen einen Programmierer jedoch nur bis zu einem gewissen Punkt. Die Python-_Standardbibliothek_ ist eine Sammlung standardisierter Funktionen und Objekte, mit denen die Ausdruckskraft von Python in vielerlei Hinsicht erweitert werden kann. Wir haben bereits in früheren Übungen einige in der Standardbibliothek definierte Funktionen verwendet, zum Beispiel bei der Berechnung von Quadratwurzeln.

Die Standardbibliothek besteht aus _Modulen_, die Funktionen und Klassen enthalten, die nach verschiedenen Themen und Funktionalitäten gruppiert sind. In diesem Teil des Kurses werden wir uns mit einigen nützlichen Python-Modulen vertraut machen. Wir werden auch lernen, unsere eigenen Module zu schreiben.

Der Befehl `import` macht den Inhalt des angegebenen Moduls im aktuellen Programm zugänglich. Schauen wir uns die Arbeit mit dem `math`-Modul genauer an. Es enthält Definitionen einiger mathematischer Funktionen, wie `sqrt` für die Quadratwurzel und `log` für den Logarithmus.

```python
import math

# Die Quadratwurzel der Zahl 5
print(math.sqrt(5))
# der Logarithmus zur Basis 2 der Zahl 8
print(math.log(8, 2))
```

<sample-output>

2.23606797749979
3.0

</sample-output>

Die Funktionen sind im Modul `math` definiert, daher muss im Programmcode als `math.sqrt` und `math.log` auf sie verwiesen werden.

## Bestimmte Abschnitte aus einem Modul auswählen

Eine andere Möglichkeit, Module zu verwenden, besteht darin, mit dem Befehl `from` eine bestimmte Einheit aus dem Modul auszuwählen. Falls wir nur die Funktionen `sqrt` und `log` aus dem Modul `math` verwenden wollen, können wir Folgendes tun:

```python
from math import sqrt, log

print(sqrt(5))
print(log(5,2))
```

Wie Sie oben sehen können, benötigen wir das Präfix `math` nicht, wenn wir die auf diese Weise importierten Funktionen verwenden.

Manchmal ist es eine praktische Abkürzung, den _gesamten_ Inhalt eines Moduls mit der Stern-Notation zu importieren:

```python
from math import *

print(sqrt(5))
print(log(5,2))
```

Das Importieren von Modulen mit der Stern-Notation kann beim Testen und in kleineren Projekten nützlich sein, kann aber auch neue Probleme aufwerfen. Darauf werden wir später noch zurückkommen.

<programming-exercise name='Hypotenuse' tmcname='part07-01_hypotenuse'>

Bitte schreiben Sie eine Funktion namens `hypotenuse(leg1: float, leg2: float)`, die die Längen der beiden Katheten eines rechtwinkligen Dreiecks entgegennimmt. Die Funktion soll die Länge der Hypotenuse zurückgeben.

Sie können den [Satz des Pythagoras](https://de.wikipedia.org/wiki/Satz_des_Pythagoras) verwenden, um das Ergebnis zu berechnen. Sie benötigen die `sqrt`-Funktion aus dem `math`-Modul.

Einige Beispiele:

```python
print(hypotenuse(3,4)) # 5.0
print(hypotenuse(5,12)) # 13.0
print(hypotenuse(1,1)) # 1.4142135623730951
```

</programming-exercise>

## Der Inhalt eines Moduls

Die Python-Dokumentation bietet umfangreiche Ressourcen zu jedem Modul in der Python-Standardbibliothek. Die Dokumentation enthält Informationen zu den im Modul definierten Funktionen und Methoden und wie das Modul verwendet werden kann. Hier ist zum Beispiel der Link zur Dokumentation für das `math`-Modul:

* https://docs.python.org/3/library/math.html

Wir können uns den Inhalt des Moduls auch mit der Funktion `dir` ansehen:

```python
import math

print(dir(math))
```

Die Funktion gibt eine Liste der vom Modul definierten Namen zurück. Dies können zum Beispiel Namen von Klassen, Konstanten oder Funktionen sein:

<sample-output>

['\_\_doc\_\_', '\_\_name\_\_', '\_\_package\_\_', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'hypot', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'modf', 'pi', 'pow', 'radians', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc']

</sample-output>

<programming-exercise name='Sonderzeichen' tmcname='part07-02_special_characters'>

Das Python-Modul [string](https://docs.python.org/3/library/string.html) enthält einige String-Konstanten, die bestimmte Gruppen von Zeichen definieren. Dazu gehören zum Beispiel Kleinbuchstaben und Satzzeichen. Bitte machen Sie sich mit diesen Konstanten vertraut und schreiben Sie dann eine Funktion namens `separate_characters(my_string: str)`. Die Funktion nimmt einen String als Argument entgegen, trennt die Zeichen im String in drei andere Strings auf und gibt diese in einem Tuple zurück:

* Der erste String soll die ASCII-Klein- und Großbuchstaben enthalten (String-Konstante `ascii_letters`).
* Der zweite String soll alle Satzzeichen enthalten, die durch die String-Konstante `punctuation` definiert sind.
* Der dritte String soll alle anderen Zeichen enthalten (einschließlich Leerzeichen).

Die Zeichen sollen in den drei Strings in der gleichen Reihenfolge erscheinen, in der sie im ursprünglichen String vorkamen.

Ein Beispiel für die Funktion in Aktion:

```python
parts = separate_characters("Olé!!! Hey, are ümläüts wörking?")
print(parts[0])
print(parts[1])
print(parts[2])
```

<sample-output>

OlHeyaremltswrking
!!!,?
é  üäü ö 

</sample-output>

</programming-exercise>

<programming-exercise name='Brüche' tmcname='part07-03_fractions'>

Bitte machen Sie sich mit dem Python-Modul `fractions` vertraut. Verwenden Sie es, um eine Funktion namens `fractionate(amount: int)` zu schreiben, die die Anzahl der Teile als Argument entgegennimmt. Die Funktion soll die Zahl 1 in so viele gleich große Brüche unterteilen, wie durch das Argument angegeben, und diese in einer Liste zurückgeben.

Ein Beispiel für die Funktion in Aktion:

```python
for p in fractionate(3):
    print(p)

print()

print(fractionate(5))
```

<sample-output>

1/3
1/3
1/3

[Fraction(1, 5), Fraction(1, 5), Fraction(1, 5), Fraction(1, 5), Fraction(1, 5)]

</sample-output>

</programming-exercise>
