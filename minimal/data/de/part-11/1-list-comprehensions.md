---
path: '/part-11/1-list-comprehensions'
title: 'Listen-Abstraktionen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was Listen-Abstraktionen (List Comprehensions) sind
- werden Sie in der Lage sein, Listen-Abstraktionen zu nutzen, um neue Listen zu erstellen

</text-box>

Eine der Situationen, in denen Programmierung ihre größte Stärke zeigt, ist die Verarbeitung von Sequenzen von Elementen und Ereignissen. Computer sind hervorragend darin, Dinge zu wiederholen. In den vorangegangenen Teilen dieses Materials haben wir beispielsweise auf verschiedene Weise über Zeichenketten, Listen und Wörterbücher iteriert.

Nehmen wir an, wir haben eine Liste von Ganzzahlen und benötigen dieselbe Liste von Elementen im Zeichenkettenformat. Ein traditioneller Weg, diese Aufgabe zu lösen, könnte wie folgt aussehen:

```python
numbers = [1, 2, 3, 6, 5, 4, 7]

strings = []
for number in numbers:
    strings.append(str(number))
```

## Listen-Abstraktionen

Es gibt auch einen "pythonischeren" Weg, Listen aus bestehenden Listen zu generieren. Diese werden als _Listen-Abstraktionen_ (List Comprehensions) bezeichnet.

Die Idee besteht darin, sowohl die Beschreibung dessen, was mit jedem Element der Liste geschehen soll, als auch die Zuweisung des Ergebnisses an eine neue Liste in einer einzigen Zeile unterzubringen.

Im obigen Beispiel war die an jedem Element der Liste durchgeführte Operation sehr einfach: Jede Ganzzahl wurde in eine Zeichenkette umgewandelt. Sehen wir uns an, wie dies mit einer Listen-Abstraktion implementiert aussehen würde:

```python
numbers = [1, 2, 3, 6, 5, 4, 7]
strings = [str(number) for number in numbers]
```

Die zweite Zeile oben enthält viele der gleichen Elemente wie der traditionellere iterative Ansatz, aber die Syntax ist anders. Eine Möglichkeit, eine Listen-Abstraktion zu verallgemeinern, wäre:

`[<Ausdruck> for <Element> in <Serie>]`

Die eckigen Klammern um die Listen-Abstraktion signalisieren Python, dass das Ergebnis eine neue Liste sein soll. Nacheinander wird jedes Element der ursprünglichen Liste verarbeitet, und das Ergebnis wird in der neuen Liste gespeichert, genau wie beim iterativen Ansatz oben. Als Ergebnis erhalten wir eine neue Liste mit genau so vielen Elementen, wie in der ursprünglichen Liste enthalten waren, wobei alle Elemente auf identische Weise verarbeitet wurden.

(Anmerkung: Die Originale für die Bilder in diesem Teil fehlen vorübergehend, weshalb in den Illustrationen teilweise finnisches Vokabular vorkommt. Wir arbeiten an einer Behebung.)

<img src="11_1_2.png">

Listen-Abstraktionen können auch wesentlich kompliziertere Operationen handhaben. Wir können Berechnungen durchführen, wie zum Beispiel die ursprünglichen Elemente mit zehn multiplizieren:

```python
numbers = list(range(1,10))
print(numbers)

numbers_multiplied = [number * 10 for number in numbers]
print(numbers_multiplied)
```

<sample-output>

[1, 2, 3, 4, 5, 6, 7, 8, 9]
[10, 20, 30, 40, 50, 60, 70, 80, 90]

</sample-output>

Tatsächlich kann der Ausdruck innerhalb der Listen-Abstraktion jeder beliebige Python-Ausdruck sein. Sie können sogar Funktionen aufrufen, die Sie selbst definiert haben:

```python
def factorial(n: int):
    """ Die Funktion berechnet die Fakultät n! für Ganzzahlen größer als Null """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [5, 2, 4, 3, 0]
    factorials = [factorial(number) for number in numbers]
    print(factorials)
```

<sample-output>

[120, 2, 24, 6, 1]

</sample-output>

Mit der vertrauteren `for`-Schleife könnte derselbe Prozess wie folgt ausgedrückt werden:

```python
def factorial(n: int):
    """ Die Funktion berechnet die Fakultät n! für Ganzzahlen größer als Null """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [5, 2, 4, 3, 0]
    factorials = []
    for number in numbers:
        factorials.append(factorial(number))
    print(factorials)
```

Listen-Abstraktionen ermöglichen es uns, dieselbe Funktionalität prägnanter auszudrücken, meist ohne an Lesbarkeit einzubüßen.

Wir können auch eine Listen-Abstraktion direkt von einer Funktion zurückgeben. Wenn wir eine Funktion benötigen, um Fakultäten für Listen von Zahlen zu erzeugen, könnten wir dies sehr kompakt erreichen:

```python
def factorials(numbers: list):
    return [factorial(number) for number in numbers]
```

<programming-exercise name='Quadratwurzeln' tmcname='part11-01_square_roots'>

Bitte schreiben Sie eine Funktion namens `square_roots(numbers: list)`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Funktion soll eine neue Liste zurückgeben, welche die Quadratwurzeln der ursprünglichen Ganzzahlen enthält.

Das [math](https://docs.python.org/3/library/math.html)-Modul aus der Python-Standardbibliothek enthält eine geeignete Funktion zur Berechnung der Quadratwurzel.

Die Funktion soll eine Listen-Abstraktion verwenden. Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Die Funktion soll wie folgt arbeiten:

```python
lines = square_roots([1,2,3,4])
for line in lines:
    print(line)
```

<sample-output>

1.0
1.4142135623730951
1.7320508075688772
2.0

</sample-output>

</programming-exercise>

<programming-exercise name='Sternchenreihen' tmcname='part11-02_rows_of_stars'>

Bitte schreiben Sie eine Funktion namens `rows_of_stars(numbers: list)`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Funktion soll eine neue Liste zurückgeben, die Reihen von Sternchen enthält. Die Länge jeder Reihe soll der Ganzzahl am entsprechenden Index in der ursprünglichen Liste entsprechen. Die Funktion soll hierfür eine Listen-Abstraktion verwenden.

Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Die Funktion soll wie folgt arbeiten:

```python
rows = rows_of_stars([1,2,3,4])
for row in rows:
    print(row)

print()

rows = rows_of_stars([4, 3, 2, 1, 10])
for row in rows:
    print(row)
```

<sample-output>

<pre>
*
**
***
****

****
***
**
*
**********
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Bestes Prüfungsergebnis' tmcname='part11-03_best_exam_result'>

Die Übungsvorlage enthält die Klassendefinition `ExamResult`. Die Klasse hat die folgenden öffentlichen Attribute:

* name
* grade1
* grade2
* grade3

Bitte schreiben Sie eine Funktion namens `best_results(results: list)`, die eine Liste von `ExamResult`-Objekten als Argument entgegennimmt.

Die Funktion soll eine neue Liste zurückgeben, die nur das beste Ergebnis aus jedem `ExamResult`-Objekt enthält. Die Funktion soll hierfür eine Listen-Abstraktion verwenden.

Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Die Funktion soll wie folgt arbeiten:

```python
result1 = ExamResult("Peter",5,3,4)
result2 = ExamResult("Pippa",3,4,1)
result3 = ExamResult("Paul",2,1,3)
results = [result1, result2, result3]
print(best_results(results))
```

<sample-output>

[5, 4, 3]

</sample-output>

</programming-exercise>

<programming-exercise name='Längen' tmcname='part11-04_lengths'>

Bitte schreiben Sie eine Funktion namens `lengths(lists: list)`, die eine Liste, welche wiederum Listen von Ganzzahlen enthält, als Argument entgegennimmt. Die Funktion soll eine neue Liste zurückgeben, welche die Längen der Listen innerhalb der Argumentliste enthält.

Die Funktion soll hierfür eine Listen-Abstraktion verwenden. Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Die Funktion soll wie folgt arbeiten:

```python
lists = [[1,2,3,4,5], [324, -1, 31, 7],[]]
print(lengths(lists))
```

<sample-output>

[5, 4, 0]

</sample-output>

</programming-exercise>

## Filtern von Elementen

In den obigen Beispielen blieben alle unsere Listen vor und nach einer Listen-Abstraktion gleich lang. In jedem Fall wurden alle Elemente der ursprünglichen Liste als Basis für die neue Liste verwendet. Manchmal benötigen wir jedoch nur _einige_ der ursprünglichen Elemente. Wie lässt sich dies erreichen?

Eine Listen-Abstraktion erlaubt auch eine Bedingung, sodass wir die Elemente gegen diese Bedingung prüfen und nur diejenigen auswählen können, die übereinstimmen. Die allgemeine Syntax lautet wie folgt:

`[<Ausdruck> for <Element> in <Serie> if <Boolescher Ausdruck>]`

Die obige Anweisung ist ansonsten identisch mit der zu Beginn dieses Abschnitts eingeführten allgemeinen Form, jedoch steht nun am Ende eine `if`-Anweisung. Nur diejenigen Elemente aus der ursprünglichen Liste, für die der boolesche Ausdruck wahr ist, werden als Basis für die neue Liste verwendet.

Im folgenden Beispiel wählen wir alle geraden Elemente aus der ursprünglichen Liste als Basis für die neue Liste aus. Tatsächlich werden diese Elemente in keiner Weise weiterverarbeitet; sie werden unverändert der neuen Liste zugewiesen:

```python
numbers = [1, 1, 2, 3, 4, 6, 4, 5, 7, 10, 12, 3]

even_items = [item for item in numbers if item % 2 == 0]
print(even_items)
```

<sample-output>

[2, 4, 6, 4, 10, 12]

</sample-output>

Der Ausdruck in der obigen Listen-Abstraktion ist lediglich `item`, was bedeutet, dass keine Operationen an den Elementen in der Liste durchgeführt werden sollen. Der Ausdruck könnte jeder beliebige Python-Ausdruck sein, genau wie in den vorherigen Beispielen. Beispielsweise nimmt die folgende Listen-Abstraktion alle geraden Elemente einer Liste, multipliziert jedes mit zehn und speichert das Ergebnis in einer neuen Liste:

```python
numbers = [1, 1, 2, 3, 4, 6, 4, 5, 7, 10, 12, 3]

even_items = [item * 10 for item in numbers if item % 2 == 0]
print(even_items)
```

<sample-output>

[20, 40, 60, 40, 100, 120]

</sample-output>

Wenn Sie auf immer kompliziertere Listen-Abstraktionen stoßen, werden Sie es vielleicht als nützlich empfinden, zuerst die Bedingung zu lesen. Schließlich werden die Elemente nur verarbeitet, wenn sie den Test bestehen, daher ist es oft sinnvoll, zuerst herauszufinden, welche Elemente die Filterstufe passieren. Manchmal wäre der Ausdruck in einer Listen-Abstraktion für alle Elemente der ursprünglichen Liste gar nicht möglich.

Beispielsweise ist die Fakultätsoperation nur für nicht-negative Ganzzahlen definiert. Wenn wir nicht sicher sein können, dass eine Liste nur Werte von Null oder höher enthält, müssen die Inhalte gefiltert werden, bevor sie an die zuvor erstellte Fakultätsfunktion übergeben werden:

```python
def factorial(n: int):
    """ Die Funktion berechnet die Fakultät n! für Ganzzahlen größer als Null """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [-2, 3, -1, 4, -10, 5, 1]
    factorials = [factorial(number) for number in numbers if number >= 0]
    print(factorials)
```

<sample-output>

[6, 24, 120, 1]

</sample-output>

Wie wir in unserem allerersten Beispiel für Listen-Abstraktionen gesehen haben, in dem Ganzzahlen in Zeichenketten umgewandelt wurden, müssen die Elemente in der neuen Liste nicht vom selben Typ sein wie die Elemente in der ursprünglichen Liste. Anknüpfend an das obige Fakultätsbeispiel können wir aus jedem ursprünglichen Element und seinem verarbeiteten Gegenstück ein Tupel erstellen und diese in einer Liste speichern, wobei wir alles bisher Gelernte in einer einzigen Listen-Abstraktion kombinieren:

```python
def factorial(n: int):
    """ Die Funktion berechnet die Fakultät n! für Ganzzahlen größer als Null """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [-2, 3, 2, 1, 4, -10, 5, 1, 6]
    # Der Variablenname wurde hier abgekürzt, damit dies leichter lesbar ist
    factorials = [(n, factorial(n)) for n in numbers if n > 0 and n % 2 == 0]
    print(factorials)
```

<sample-output>

[(2, 2), (4, 24), (6, 720)]

</sample-output>

Wenn wir das obige Beispiel zerlegen, haben wir den booleschen Ausdruck `n > 0 and n % 2 == 0`. Das bedeutet, dass nur Elemente, die sowohl positiv als auch durch zwei teilbar sind, aus der ursprünglichen Liste für die weitere Verarbeitung akzeptiert werden.

Diese positiven, geraden Zahlen werden dann jeweils nacheinander in das Format `(n, factorial(n))` verarbeitet. Dies ist ein Tupel, wobei das erste Element die Zahl selbst und das zweite Element das von der Fakultätsfunktion zurückgegebene Ergebnis ist.

<programming-exercise name='Entferne kleiner als' tmcname='part11-05_remove_smaller_than'>

Bitte schreiben Sie eine Funktion namens `remove_smaller_than(numbers: list, limit: int)`, die eine Liste von Ganzzahlen und einen Grenzwert (ebenfalls im Ganzzahlformat) als Argumente entgegennimmt.

Die Funktion soll eine Listen-Abstraktion verwenden, um eine neue Liste ohne die Werte zu erzeugen, die kleiner als der Grenzwert sind.

Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Ein Beispiel für die Verwendung der Funktion:

```python
numbers = [1,65, 32, -6, 9, 11]
print(remove_smaller_than(numbers, 10))

print(remove_smaller_than([-4, 7, 8, -100], 0))
```

<sample-output>

[65, 32, 11]
[7, 8]

</sample-output>

</programming-exercise>

<programming-exercise name='Beginne mit einem Vokal' tmcname='part11-06_begin_with_vowel'>

Bitte schreiben Sie eine Funktion namens `begin_with_vowel(words: list)`, die eine Liste von Zeichenketten als Argument entgegennimmt.

Die Funktion soll eine Listen-Abstraktionstechnik verwenden, um eine neue Liste zu erstellen und zurückzugeben, die nur diejenigen Wörter aus der ursprünglichen Liste enthält, die mit einem Vokal (a, e, i, o, u) beginnen. Sowohl Klein- als auch Großbuchstaben sollen akzeptiert werden.

Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Ein Beispiel für die Verwendung der Funktion:

```python
word_list = ["automobile","motorbike","Animal","cat","Dog","APPLE","orange"]
for vowelled in begin_with_vowel(word_list):
    print(vowelled)
```

<sample-output>

automobile
Animal
APPLE
orange

</sample-output>

</programming-exercise>

## Alternative Ausführung mit Listen-Abstraktionen

Oftmals fügen wir einer bedingten Anweisung auch einen `else`-Zweig hinzu. Da wir Bedingungen in Listen-Abstraktionen verwenden können, steht der `else`-Zweig auch bei Listen-Abstraktionen zur Verfügung. Die allgemeine Syntax der in Listen-Abstraktionen verwendeten Bedingung sieht wie folgt aus:

`<Ausdruck 1> if <Bedingung> else <Ausdruck 2>`

Diesen einzeiligen Bedingungen oder Ternär-Operatoren sind wir bereits in [Teil 7](/part-7/6-more-features) begegnet. Der obige Ausdruck wird entweder zu `Ausdruck 1` oder `Ausdruck 2` ausgewertet, je nachdem, ob die Bedingung wahr oder falsch ist.

Zur Auffrischung: Wenn wir die größere von zwei Zahlen ausgeben müssten und nur eine einzige `print`-Anweisung verwenden wollten, könnten wir alles in einer einzigen Zeile unterbringen:

```python
number1 = int(input("Geben Sie Nummer 1 ein:"))
number2 = int(input("Geben Sie Nummer 2 ein:"))
print (number1 if number1 > number2 else number2)
```

Die Kombination der Syntax des Ternär-Operators mit einer Listen-Abstraktion ergibt die folgende allgemeine Struktur:

`[<Ausdruck 1> if <Bedingung> else <Ausdruck 2> for <Element> in <Serie>]`

Dies mag etwas verwirrend erscheinen, da die bedingte Struktur nun vor dem eigentlichen Teil der Listen-Abstraktion steht. Dies ist einfach die Art und Weise, wie die Syntax definiert wurde, zumindest zum jetzigen Zeitpunkt. Wenn es auch einen `else`-Zweig gibt, kommt die Bedingung zuerst. Wenn es nur ein `if` gibt, steht es am Ende. Sie können versuchen, sie zu vertauschen und sehen, was passiert.

Das Einbeziehen eines `else`-Operators bedeutet, dass wir wieder jedes Element aus der ursprünglichen Liste verarbeiten werden. Je nachdem, ob die Bedingung wahr oder falsch ist, wird entweder `Ausdruck 1` oder `Ausdruck 2` an jedem Element der Liste durchgeführt.

Das folgende Beispiel prüft, ob die Elemente einer Liste Null oder höher sind. Jedes solche Element wird unverändert übernommen, aber alle negativen Elemente werden negiert, sodass sich das Vorzeichen von negativ zu positiv ändert. Das Ergebnis ist eine Liste, welche die Absolutwerte der Elemente der ursprünglichen Liste enthält.

```python
numbers = [1, -3, 45, -110, 2, 9, -11]
abs_vals = [number if number >= 0 else -number for number in numbers]
print(abs_vals)
```

<sample-output>

[1, 3, 45, 110, 2, 9, 11]

</sample-output>

Wiederholung dessen, was oben geschieht: Wenn die Bedingung `number >= 0` wahr ist, durchläuft das Element den Ausdruck `number`, und das Ergebnis ist das Element selbst. Wenn die Bedingung falsch ist, durchläuft das Element den Ausdruck `-number`, sodass es einen positiven Wert erhält.

Im folgenden Beispiel haben wir die Funktion `string_lengths`, die eine Liste als Argument entgegennimmt und eine weitere Liste mit den Längen aller Zeichenketten in der ursprünglichen Liste zurückgibt. Diese Funktion akzeptiert jedoch Listenelemente jedes Typs. Wenn das Element eine Zeichenkette ist, berechnet sie deren Länge. Wenn das Element etwas anderes ist, fügt sie -1 in die zurückgegebene Liste ein.

```python
def string_lengths(my_list: list):
    """ Die Funktion gibt die Längen von Zeichenketten in einer neuen Liste zurück """
    return [len(item) if type(item) == str else -1 for item in my_list]

if __name__ == "__main__":
    test_list = ["hi", 3, True, "there", -123.344, "toodlepip", 2, False]
    lengths = string_lengths(test_list)
    print(lengths)
```

<sample-output>

[2, -1, -1, 5, -1, 9, -1, -1]

</sample-output>


<programming-exercise name='Lottozahlen' tmcname='part11-07_lottery_numbers'>

## Übereinstimmende Lottozahlen

Bitte schreiben Sie eine Klasse namens `LotteryNumbers`, die die Wochennummer (ein Ganzzahlwert) und eine Liste von sieben Ganzzahlen als Konstruktor-Argumente entgegennimmt. Die Liste soll die korrekten Lottozahlen für die jeweilige Woche enthalten.

Bitte schreiben Sie außerdem eine Methode namens `number_of_hits(numbers: list)`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Methode gibt die Anzahl der korrekten Einträge in der Parameterliste zurück.

Die Methode soll eine Listen-Abstraktion verwenden. Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Ein Beispiel für die Verwendung der Klasse und Methode:

```python
week5 = LotteryNumbers(5, [1,2,3,4,5,6,7])
my_numbers = [1,4,7,11,13,19,24]

print(week5.number_of_hits(my_numbers))
```

<sample-output>

3

</sample-output>

## Übereinstimmende Lottozahlen an Ort und Stelle

Bitte schreiben Sie eine Methode namens `hits_in_place(numbers)`, die eine Liste von sieben Ganzzahlen als Argument entgegennimmt und eine neue Liste von sieben Ganzzahlen zurückgibt. Die neue Liste enthält nur diejenigen Elemente aus der ursprünglichen Liste, die mit den korrekten Zahlen der Woche übereinstimmen. Diese müssen an denselben Indizes verbleiben, an denen sie in der ursprünglichen Liste waren. Die restlichen Indizes sollen mit den Werten `-1` gefüllt werden.

Die Methode soll eine Listen-Abstraktion verwenden. Die maximale Länge der Funktion beträgt zwei Codezeilen, einschließlich der Kopfzeile, die mit dem Schlüsselwort `def` beginnt.

Bitte sehen Sie sich das folgende Beispiel an:

```python
week8 = LotteryNumbers(8, [1,2,3,10,20,30,33])
my_numbers = [1,4,7,10,11,20,30]

print(week8.hits_in_place(my_numbers))
```

<sample-output>

[1, -1, -1, 10, -1, 20, 30]

</sample-output>

</programming-exercise>
