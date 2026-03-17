---
path: '/part-11/3-recursion'
title: 'Rekursion'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was Rekursion bedeutet
- werden Sie in der Lage sein, eine einfache rekursive Funktion zu schreiben

</text-box>

Wie wir schon oft gesehen haben, können Funktionen andere Funktionen aufrufen. Zum Beispiel:

```python
def hello(name : str):
    print("Hallo", name)

def hello_many_times(name : str, times : int):
    for i in range(times):
        hello(name)
```

Eine Funktion kann sich auch selbst aufrufen, aber wir als Programmierer müssen dabei vorsichtig sein. Es ist leicht, in eine Endlosschleife von Funktionsaufrufen zu geraten, genau wie wir bei `while`-Schleifen in eine unendliche Folge von Wiederholungen geraten sind, wenn wir die entsprechenden Abbruchbedingungen vergessen haben. Der Versuch, eine `hello`-Funktion mit der folgenden Definition aufzurufen:

```python
def hello(name : str):
    print("Hallo", name)
    hello(name) # Funktion ruft sich selbst auf
```

würde eine neue Art von Fehler verursachen:

<sample-output>

RecursionError: maximum recursion depth exceeded

</sample-output>

## Was bedeutet Rekursion?

Die in der obigen Fehlermeldung erwähnte _Rekursion_ bezieht sich auf das _Definieren von etwas durch sich selbst_. Im Programmierkontext bezieht sie sich in der Regel auf eine Funktion, die sich selbst aufruft. Damit dies funktioniert, ohne Endlosschleifen zu verursachen, müssen sich die an die Funktion übergebenen Argumente jedes Mal ändern, damit die verschachtelten Funktionsaufrufe irgendwann aufhören. Das Grundprinzip ist hier dasselbe wie bei `while`-Schleifen: Es muss immer eine Art Abbruchbedingung geben, und diese Bedingung muss zu einem bestimmten Zeitpunkt während der Ausführung ausgelöst werden.

Sehen wir uns eine einfache Funktion an, die Nullen zu einer Liste hinzufügt, solange weniger als 10 Elemente in der Liste enthalten sind. Diesmal verwenden wir jedoch keine Schleife. Wenn die Bedingung noch nicht erfüllt ist, ruft sich die Funktion selbst auf:

```python
def fill_list(numbers: list):
    """ Wenn die Länge der Liste weniger als 10 beträgt, füge Elemente zur Liste hinzu """
    if len(numbers) < 10:
        numbers.append(0)
        # Die Funktion erneut aufrufen
        fill_list(numbers)


if __name__ == "__main__":
    test_list = [1,2,3,4]
    fill_list(test_list)
    print(test_list)
```

<sample-output>

[1, 2, 3, 4, 0, 0, 0, 0, 0, 0]

</sample-output>

Diese Funktionalität könnte genauso gut mit einer regulären `while`-Schleife erreicht werden:

```python
def fill_list(numbers: list):
    """ Wenn die Länge der Liste weniger als 10 beträgt, füge Elemente zur Liste hinzu """
    while len(numbers) < 10:
        numbers.append(0)

if __name__ == "__main__":
    test_list = [1,2,3,4]
    fill_list(test_list)
    print(test_list)
```

Der traditionellere iterative Ansatz führt zu einem kürzeren Programm, das wohl auch leichter zu verstehen ist. Bei der rekursiven Version ist nicht so klar, dass wir während des gesamten Prozesses an ein und derselben Liste arbeiten. Das ist jedoch der Fall, und deshalb funktioniert die rekursive Funktion genauso gut.

<text-box variant="hint" name="Iterativ oder rekursiv?">

Die Theorie der Informatik unterscheidet oft zwischen _iterativen_ und _rekursiven_ Algorithmen, daher ist es am besten, sich von Anfang an mit diesen Begriffen vertraut zu machen. Iterative Lösungen sind solche, die auf einer sequentiellen Verarbeitung von Elementen basieren, oft unter Verwendung von Schleifen. Bisher haben wir uns fast ausschließlich mit iterativen Methoden beschäftigt. Rekursiv hingegen bezieht sich auf eine Methode, bei der die Funktion sich selbst mit geänderten Parameterwerten aufruft.

Im Prinzip sollte es möglich sein, jedes Problem entweder mit iterativen oder mit rekursiven Methoden zu lösen. In der Praxis ist jedoch meist die eine oder die andere Methode deutlich besser für das jeweilige Problem geeignet. Die Fähigkeit zu bestimmen, welche Methode besser ist, kommt vor allem mit der Übung.

</text-box>

<programming-exercise name='Zahlen zu einer Liste hinzufügen' tmcname='part11-13_add_numbers_to_list'>

Bitte schreiben Sie eine _rekursive Funktion_ namens `add_numbers_to_list(numbers: list)`. Die Funktion nimmt eine Liste von Zahlen als Argument entgegen und fügt der Liste so lange neue Zahlen hinzu, bis die Länge der Liste durch fünf teilbar ist. Jede der Liste hinzugefügte Zahl soll um eins größer sein als die letzte Zahl in der Liste.

Die Funktion muss sich selbst rekursiv aufrufen. Bitte beachten Sie das folgende Beispiel.

```python
numbers = [1,3,4,5,10,11]
add_numbers_to_list(numbers)
print(numbers)
```

<sample-output>

[1, 3, 4, 5, 10, 11, 12, 13, 14, 15]

</sample-output>

</programming-exercise>

## Rekursion und Rückgabewerte

Rekursive Funktionen können auch Rückgabewerte haben. In den letzten Abschnitten haben wir mit Fakultäten gearbeitet, also schreiben wir eine rekursive Fakultätsfunktion:

```python

def factorial(n: int):
    """ Die Funktion berechnet die Fakultät n! für n >= 0 """
    if n < 2:
        # Die Fakultät für 0 und 1 ist 1
        return 1

    # Die Funktion erneut mit einem um eins kleineren Argument aufrufen
    return n * factorial(n - 1)

if __name__ == "__main__":
    # Testen unserer Funktion
    for i in range(1, 7):
        print(f"Die Fakultät von {i} ist {factorial(i)}")

```

<sample-output>

Die Fakultät von 1 ist 1
Die Fakultät von 2 ist 2
Die Fakultät von 3 ist 6
Die Fakultät von 4 ist 24
Die Fakultät von 5 ist 120
Die Fakultät von 6 ist 720

</sample-output>

Wenn der Parameter der rekursiven Fakultätsfunktion 0 oder 1 ist, gibt die Funktion 1 zurück, da die Fakultätsoperation so definiert ist. In jedem anderen Fall gibt die Funktion den Wert `n * factorial(n - 1)` zurück, was dem Wert ihres Parameters `n` multipliziert mit dem Rückgabewert des Funktionsaufrufs `factorial(n - 1)` entspricht.

Der entscheidende Teil hierbei ist, dass die Funktionsdefinition eine Abbruchbedingung enthält. Wenn diese erfüllt ist, endet die Rekursion. In diesem Fall ist diese Bedingung `n < 2`. Wir wissen, dass sie irgendwann erreicht wird, da der als Argument an die Funktion übergebene Wert auf jeder Ebene der Rekursion um eins verringert wird.

Das [Visualisierungstool](http://www.pythontutor.com/visualize.html#mode=edit) kann eine große Hilfe sein, um rekursive Programme zu verstehen.

Es könnte das obige Beispiel etwas klarer machen, wenn wir Hilfsvariablen verwenden würden:

```python
def factorial(n: int):
    if n < 2:
        return 1

    factorial_one_level_down = factorial(n - 1)
    factorial_now = n * factorial_one_level_down
    return factorial_now
    
factorial(5)
```

Sehen Sie sich an, wie das [Visualisierungstool](http://www.pythontutor.com/visualize.html#code=def%20factorial%28n%3A%20int%29%3A%0A%20%20%20%20if%20n%20%3C%202%3A%0A%20%20%20%20%20%20%20%20return%201%0A%0A%20%20%20%20factorial_one_level_down%20%3D%20factorial%28n%20-%201%29%0A%20%20%20%20factorial_now%20%3D%20n%20*%20factorial_one_level_down%0A%20%20%20%20return%20factorial_now%0A%20%20%20%20%0Afactorial%285%29&cumulative=false&curInstr=5&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false) den Fortschritt der Rekursion demonstriert.

Das Visualisierungstool hat eine kleine Eigenheit in der Art und Weise, wie es den Call Stack (Aufrufstapel) handhabt, da er nach unten zu "wachsen" scheint. Normalerweise werden Call Stacks genau als das dargestellt: Stapel, bei denen die neuen Aufrufe obenauf platziert werden. Im Visualisierungstool ist der aktuell aktive Funktionsaufruf der schattierte Block ganz unten, der seine eigenen Kopien der sichtbaren Variablen hat.

Wenn die rekursive Fakultätsfunktion aufgerufen wird, wird der Aufrufstapel aufgebaut, bis die durch `n < 2` gesetzte Grenze erreicht ist. Dann kehrt der letzte Funktionsaufruf im Stapel mit einem Wert zurück – es ist `1`, da `n` nun kleiner als 2 ist. Dieser Rückgabewert wird an den vorherigen Funktionsaufruf im Stapel übergeben, wo er zur Berechnung des Rückgabewerts dieses Funktionsaufrufs verwendet wird, und so weiter zurück aus dem Stapel heraus.

Der Rückgabewert jedes Funktionsaufrufs wird in der Hilfsvariablen `factorial_now` gespeichert. Bitte gehen Sie die Visualisierung sorgfältig durch, bis Sie verstehen, was bei jedem Schritt passiert, und achten Sie besonders auf den bei jedem Schritt zurückgegebenen Wert.

<img src="11_1_1.png">

Werfen wir einen Blick auf ein weiteres verbreitetes rekursives Beispiel: die Fibonacci-Zahl. In einer Fibonacci-Folge ist jede Zahl die Summe der beiden vorangegangenen Zahlen. Die ersten beiden Zahlen sind hier als 1 und 1 definiert, und die Folge beginnt dann wie folgt: 1, 1, 2, 3, 5, 8, 13, 21, 34.

```python
def fibonacci(n: int):
    """ Die Funktion gibt die n-te Zahl in der Fibonacci-Folge zurück (1, 1, 2, 3, 5, 8 etc.); n > 0"""

    if n <= 2:
        # Die ersten beiden sind Einsen
        return 1

    # Alle anderen Zahlen entsprechen der Summe der beiden vorangegangenen Zahlen in der Folge
    return fibonacci(n - 1) + fibonacci(n - 2)

# Testen, ob alles funktioniert
if __name__ == "__main__":
    for i in range(1, 11):
        print(f"Die {i}. Zahl in der Fibonacci-Folge ist {fibonacci(i)}")
```

<sample-output>

Die 1. Zahl in der Fibonacci-Folge ist 1
Die 2. Zahl in der Fibonacci-Folge ist 1
Die 3. Zahl in der Fibonacci-Folge ist 2
Die 4. Zahl in der Fibonacci-Folge ist 3
Die 5. Zahl in der Fibonacci-Folge ist 5
Die 6. Zahl in der Fibonacci-Folge ist 8
Die 7. Zahl in der Fibonacci-Folge ist 13
Die 8. Zahl in der Fibonacci-Folge ist 21
Die 9. Zahl in der Fibonacci-Folge ist 34
Die 10. Zahl in der Fibonacci-Folge ist 55

</sample-output>

Diesmal ist die Abbruchbedingung, dass der Parameter kleiner oder gleich 2 ist, da die gesamte Folge ab den ersten beiden Zahlen definiert ist und wir die ersten beiden Zahlen als gleich 1 definiert haben.

Wie funktioniert diese Funktion also in der Praxis?

Wenn die Funktion mit 1 oder 2 als Argument aufgerufen wird, gibt sie 1 zurück, wie durch die Bedingung `n <= 2` vorgegeben.

Wenn das Argument 3 oder größer ist, gibt die Funktion den Wert von `fibonacci(n - 1) + fibonacci(n - 2)` zurück. Wenn das Argument genau 3 ist, entspricht dieser Wert `fibonacci(2) + fibonacci(1)`, und wir kennen bereits das Ergebnis von beiden aus dem vorherigen Schritt. `1 + 1` ergibt 2, was in der Tat die dritte Zahl in der Fibonacci-Folge ist.

Wenn das Argument 4 ist, ist der Rückgabewert `fibonacci(3) + fibonacci(2)`, was, wie wir nun wissen, `2 + 1` entspricht, also 3.

Wenn das Argument 5 ist, ist der Rückgabewert `fibonacci(4) + fibonacci(3)`, was, wie wir nun wissen, `3 + 2` entspricht, also 5.

Und so weiter und so fort.

Wir können bei jedem Schritt überprüfen, ob die Funktion die korrekten Ergebnisse liefert, was bei grundlegenden Programmieraufgaben oft ausreicht. Die formale Verifizierbarkeit von Algorithmen ist ein Thema für fortgeschrittenere Kurse, wie z. B. [Datenstrukturen und Algorithmen](https://studies.helsinki.fi/courses/cur/hy-opt-cur-2122-808d3413-3db0-4ab9-89d9-e816e94bf51d).

<programming-exercise name='Rekursive Summe' tmcname='part11-14_recursive_sum'>

Bitte schreiben Sie eine rekursive Funktion namens `recursive_sum(number: int)`, welche die Summe `1 + 2 + ... + number` berechnet. Die Übungsvorlage enthält den folgenden Entwurf:

```python
def recursive_sum(number: int):
    # Wenn die Zahl 1 ist, gibt es nichts mehr hinzuzufügen
    if number <= 1:
        return number

    # Ergänzen Sie den Rest der Funktion
```

Einige Beispiele:

```python
result = recursive_sum(3)
print(result)

print(recursive_sum(5))
print(recursive_sum(10))
```

<sample-output>

6
15
55

</sample-output>

</programming-exercise>

<programming-exercise name='Alle Klammern ausgleichen' tmcname='part11-15_balanced_brackets'>

Die Übungsvorlage enthält die Funktion `balanced_brackets`, die eine Zeichenkette als Argument entgegennimmt. Sie prüft, ob die _runden_ Klammern innerhalb der Zeichenkette ausgeglichen sind. Das heißt, für jede öffnende Klammer `(` sollte es eine schließende Klammer `)` geben, und alle Klammerpaare sollten in der richtigen Reihenfolge zugeordnet sein, d. h. die Klammerpaare dürfen sich nicht überschneiden.

```python
def balanced_brackets(my_string: str):
    if len(my_string) == 0:
        return True
    if not (my_string[0] == '(' and my_string[-1] == ')'):
        return False

    # Erstes und letztes Zeichen entfernen
    return balanced_brackets(my_string[1:-1])

ok = balanced_brackets("(((())))")
print(ok)

# Es gibt eine schließende Klammer zu viel, daher ergibt dies False
ok = balanced_brackets("()())")
print(ok)

# Diese beginnt mit einer schließenden Klammer, wieder False
ok = balanced_brackets(")()")
print(ok)

# Dies ergibt False, da die Funktion nur vollständig verschachtelte Klammern verarbeitet
ok = balanced_brackets("()(())")
print(ok)
```

<sample-output>

True
False
False
False

</sample-output>

Bitte erweitern Sie die Funktion so, dass sie auch mit eckigen Klammern `[]` funktioniert. Die Funktion soll außerdem alle Zeichen ignorieren, die keine Klammern `()` oder `[]` sind. Die verschiedenen Klammertypen müssen in der richtigen Reihenfolge korrekt zugeordnet werden.

Bitte sehen Sie sich die folgenden Beispiele an:

```python
ok = balanced_brackets("([([])])")
print(ok)

ok = balanced_brackets("(Python Version [3.7]) bitte verwenden Sie diese!")
print(ok)

# Dies ist nicht gut, die schließende Klammer passt nicht
ok = balanced_brackets("(()]")
print(ok)

# Verschiedene Klammertypen sind falsch zugeordnet
ok = balanced_brackets("([schlechtes Ei)]")
print(ok)
```

Hinweis: Die Funktion muss nur vollständig verschachtelte Klammern handhaben. Die Zeichenkette `(x + 1)(y + 1)` sollte `False` ergeben, da die Klammern nicht ineinander verschachtelt sind.

<sample-output>

True
True
False
False


</sample-output>

</programming-exercise>

## Binäre Suche

Bei einer binären Suche haben wir eine sortierte Liste von Elementen und versuchen, ein bestimmtes Element darin zu finden. Die Reihenfolge der Elemente könnte zum Beispiel Zahlen von der kleinsten zur größten oder Zeichenketten vom alphabetisch ersten zum letzten sein. Die Methode der Sortierung spielt keine Rolle, solange sie bekannt und für das gesuchte Element relevant ist.

Die Idee einer binären Suche besteht darin, immer das Element in der Mitte der Liste zu betrachten. Wir haben dann drei mögliche Szenarien. Wenn das Element in der Mitte

- dasjenige ist, das wir suchen: Wir können einen Hinweis zurückgeben, dass wir das Element gefunden haben.
- kleiner ist als das gesuchte Element: Wir können die Suche in der größeren Hälfte der Liste wiederholen.
- größer ist als das gesuchte Element: Wir können die Suche in der kleineren Hälfte der Liste wiederholen.

Wenn die Liste leer ist, können wir feststellen, dass das Element nicht gefunden wurde, und einen entsprechenden Hinweis zurückgeben.

Im folgenden Bild sehen wir, wie eine binäre Suche fortschreitet, während sie nach der Zahl 24 sucht:

<img src="11_3_1.png">

Hier ist ein rekursiver Algorithmus für eine binäre Suche:

```python
def binary_search(target: list, item: int, left : int, right : int):
    """ Die Funktion gibt True zurück, wenn das Element in der Zielliste enthalten ist, andernfalls False """
    # Wenn der Suchbereich leer ist, wurde das Element nicht gefunden
    if left > right:
        return False

    # Die Mitte des Suchbereichs berechnen, Ganzzahlergebnis
    centre = (left+right)//2

    # Wenn das Element in der Mitte gefunden wird, Rückgabe
    if target[centre] == item:
        return True

    # Wenn das Element größer ist, die größere Hälfte durchsuchen
    if target[centre] < item:
        return binary_search(target, item, centre+1, right)
    # Andernfalls ist das Element kleiner, die kleinere Hälfte durchsuchen
    else:
        return binary_search(target, item, left, centre-1)


if __name__ == "__main__":
    # Testen Ihrer Funktion
    target = [1, 2, 4, 5, 7, 8, 11, 13, 14, 18]
    print(binary_search(target, 2, 0, len(target)-1))
    print(binary_search(target, 13, 0, len(target)-1))
    print(binary_search(target, 6, 0, len(target)-1))
    print(binary_search(target, 15, 0, len(target)-1))
```

<sample-output>

True
True
False
False

</sample-output>

Die Funktion `binary_search` nimmt vier Argumente entgegen: die Zielliste, das gesuchte Element sowie den linken und rechten Rand des Suchbereichs. Wenn die Funktion zum ersten Mal aufgerufen wird, deckt der Suchbereich die gesamte Zielliste ab. Der linke Rand liegt bei Index `0` und der rechte Rand bei Index `len(target)-1`. Die Funktion berechnet den mittleren Index und prüft diese Position in der Liste. Entweder wurde das Element gefunden, oder die Suche wird in der kleineren oder größeren Hälfte der Zielliste fortgesetzt.

Vergleichen wir dies mit einer einfachen linearen Suche. Bei einer linearen Suche wird der Suchbereich vom Anfang an durchlaufen, bis entweder das Element gefunden wird oder der Suchbereich erschöpft ist. Die Anzahl der Schritte, die erforderlich sind, um den gesamten Suchbereich abzudecken, wächst _linear_ im gleichen Maße wie die Größe des Suchbereichs. Jeder Suchschritt deckt nur einen Suchkandidaten vom Anfang des Suchbereichs ab. Nehmen wir an, das gesuchte Element wird _nicht_ gefunden. Wenn der Suchbereich eine Million Elemente lang ist, müssten wir eine Million Suchschritte unternehmen, um sicherzugehen, dass sich das Element nicht im Suchbereich befindet.

Bei einer binären Suche hingegen wächst die Anzahl der benötigten Schritte _logarithmisch_. Nehmen wir wieder an, dass das gesuchte Element _nicht_ gefunden wird. Der Suchbereich wird mit jedem Schritt halbiert, da wir wissen, dass das Element entweder kleiner oder größer als der aktuelle Suchkandidat in der Mitte ist. 2 hoch 20 (2^20) ist bereits deutlich über 1 Million, sodass es höchstens 20 Schritte dauern wird, um den gesamten Suchbereich mit einer binären Suche abzudecken. Wenn wir es also mit sortierten Suchbereichen zu tun haben, wie es bei Computern und Materialien, die automatisch verarbeitet werden sollen, oft der Fall ist, ist eine binäre Suche wesentlich effizienter als eine lineare Suche.
