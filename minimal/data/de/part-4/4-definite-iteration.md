---
path: '/part-4/4-definite-iteration'
title: 'Bestimmte Iteration'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie den Unterschied zwischen bestimmter und unbestimmter Iteration kennen
- werden Sie wissen, wie eine Python `for`-Schleife funktioniert
- werden Sie in der Lage sein, eine `for`-Schleife zu verwenden, um Listen und Zeichenketten zu durchlaufen

</text-box>

Sie können eine `while`-Schleife verwenden, um die Elemente in einer Liste zu durchlaufen, genau wie wir `while`-Schleifen verwendet haben, um Zeichenketten zu durchlaufen. Das folgende Programm gibt die Elemente in der Liste aus, jedes in einer eigenen Zeile:

```python
my_list = [3, 2, 4, 5, 2]

index = 0
while index < len(my_list):
    print(my_list[index])
    index += 1
```

<sample-output>

3
2
4
5
2

</sample-output>

Dies funktioniert offensichtlich, ist aber eine ziemlich komplizierte Art, eine Liste zu durchlaufen, da Sie eine Hilfsvariable `index` verwenden müssen, um sich zu merken, an welchem Element in der Liste Sie sich gerade befinden. Glücklicherweise bietet Python eine intuitivere Art, Listen, Zeichenketten und andere ähnliche Strukturen zu durchlaufen.

## Die for-Schleife

Wenn Sie eine bereits vorhandene Sammlung von Elementen durchlaufen möchten, erledigt die Python `for`-Schleife dies für Sie. Zum Beispiel kann die Schleife alle Elemente in einer Liste vom ersten bis zum letzten durchlaufen.

Bei der Verwendung einer `while`-Schleife "weiß" das Programm nicht im Voraus, wie viele Iterationen die Schleife durchführen wird. Sie wird wiederholt, bis die Bedingung falsch wird oder die Schleife anderweitig verlassen wird. Deshalb fällt sie unter die _unbestimmte Iteration_. Bei einer `for`-Schleife wird die Anzahl der Iterationen beim Einrichten der Schleife festgelegt, weshalb sie unter die _bestimmte Iteration_ fällt.

Die Idee ist, dass die `for`-Schleife die Elemente in der Sammlung nacheinander nimmt und für jedes die gleichen Aktionen ausführt. Der Programmierer muss sich nicht darum kümmern, welches Element wann verarbeitet wird. Die Syntax der `for`-Schleife lautet wie folgt:

```python
for <variable> in <sammlung>:
    <block>
```

Die `for`-Schleife nimmt ein Element aus der Sammlung, weist es der Variablen zu, verarbeitet den Codeblock und geht zum nächsten Element über. Wenn alle Elemente in der Sammlung verarbeitet wurden, wird die Ausführung des Programms in der Zeile nach der Schleife fortgesetzt.

<img src="4_4_1.png" alt="Iterieren durch eine Liste">

Das folgende Programm gibt alle Elemente in einer Liste mit einer `for`-Schleife aus:

```python
my_list = [3, 2, 4, 5, 2]

for item in my_list:
    print(item)
```

<sample-output>

3
2
4
5
2

</sample-output>

Im Vergleich zum Beispiel am Anfang dieses Abschnitts ist die Struktur viel einfacher zu verstehen. Eine `for`-Schleife macht das einfache Durchlaufen einer Sammlung von Elementen sehr unkompliziert.

Das gleiche Prinzip gilt für Zeichen in einer Zeichenkette:

```python
name = input("Bitte geben Sie Ihren Namen ein: ")

for character in name:
    print(character)
```

<sample-output>

Bitte geben Sie Ihren Namen ein: **Grace**
G
r
a
c
e

</sample-output>

<programming-exercise name='Sternenbesät' tmcname='part04-20_star_studded'>

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Zeichenkette einzugeben. Das Programm gibt dann jedes eingegebene Zeichen in einer eigenen Zeile aus. Nach jedem Zeichen soll ein Sternchen (*) in einer eigenen Zeile ausgegeben werden.

So sollte es funktionieren:

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **Python**
P
*
y
*
t
*
h
*
o
*
n
*

</sample-output>

**Hinweis:** Diese Übung verlangt nicht, dass Sie Funktionen schreiben, daher sollten Sie keinen Code in einen `if __name__ == "__main__"`-Block setzen.

</programming-exercise>

## Die Funktion range

Oft wissen Sie, wie oft Sie einen bestimmten Codeabschnitt wiederholen möchten. Sie möchten zum Beispiel alle Zahlen zwischen 1 und 100 durchlaufen. Die Funktion `range` in Verbindung mit einer `for`-Schleife erledigt dies für Sie.

Es gibt verschiedene Möglichkeiten, die Funktion `range` aufzurufen. Der einfachste Weg ist, der Funktion nur ein Argument zu übergeben, das den Endpunkt des Bereichs angibt. Der Endpunkt selbst ist ausgeschlossen, genau wie bei String-Slices. Mit anderen Worten: Der Funktionsaufruf `range(n)` liefert eine Schleife mit einem Bereich von 0 bis `n-1`:

```python
for i in range(5):
    print(i)
```

<sample-output>

0
1
2
3
4

</sample-output>

Mit zwei Argumenten gibt die Funktion einen Bereich zwischen den beiden Zahlen zurück. Die Funktion `range(a, b)` liefert einen Bereich, der bei `a` beginnt und bei `b-1` endet:

```python
for i in range(3, 7):
    print(i)
```

<sample-output>

3
4
5
6

</sample-output>

Schließlich können Sie mit einem dritten Argument auch die Größe des _Schritts_ angeben, den der Bereich zwischen den einzelnen Werten macht. Der Funktionsaufruf `range(a, b, c)` liefert einen Bereich, der bei `a` beginnt, bei `b-1` endet und sich bei jedem Schritt um `c` ändert:

```python
for i in range(1, 9, 2):
    print(i)
```

<sample-output>

1
3
5
7

</sample-output>

Ein Schritt kann auch negativ sein. Dann wird der Bereich in umgekehrter Reihenfolge durchlaufen. Beachten Sie, dass die ersten beiden Argumente hier ebenfalls vertauscht sind:

```python
for i in range(6, 2, -1):
    print(i)
```

<sample-output>

6
5
4
3

</sample-output>

<programming-exercise name='Von negativ bis positiv' tmcname='part04-21_negative_to_positive'>

Bitte schreiben Sie ein Programm, das den Benutzer nach einer positiven Ganzzahl N fragt. Das Programm gibt dann alle Zahlen zwischen -N und N (einschließlich) aus, lässt aber die _Zahl 0 aus_. Jede Zahl soll in einer eigenen Zeile ausgegeben werden.

Ein Beispiel für das erwartete Verhalten:

<sample-output>

Bitte geben Sie eine positive Ganzzahl ein: **4**
-4
-3
-2
-1
1
2
3
4

</sample-output>

**Hinweis:** Diese Übung verlangt nicht, dass Sie Funktionen schreiben, daher sollten Sie keinen Code in einen `if __name__ == "__main__"`-Block setzen.

</programming-exercise>

## Von einem Bereich zu einer Liste

Die Funktion `range` gibt ein Range-Objekt zurück, das sich in vielerlei Hinsicht wie eine Liste verhält, aber eigentlich keine ist. Wenn Sie versuchen, den Wert auszugeben, den die Funktion zurückgibt, sehen Sie nur eine Beschreibung eines Range-Objekts:

```python
numbers = range(2, 7)
print(numbers)
```

<sample-output>

range(2, 7)

</sample-output>

Die Funktion `list` wandelt einen Bereich in eine Liste um. Die Liste enthält alle Werte, die im Bereich liegen. Der Kurs "Advanced Course in Programming", der auf diesen folgt, wird mehr Licht in dieses Thema bringen.

```python
numbers = list(range(2, 7))
print(numbers)
```

<sample-output>

[2, 3, 4, 5, 6]

</sample-output>

## Eine Erinnerung an die Anforderungen der automatischen Tests

Bisher sahen die Vorlagen für die Übungen, in denen Sie Funktionen schreiben sollten, so aus:

```python
# Schreiben Sie hier Ihre Lösung
# Sie können Ihre Funktion testen, indem Sie sie im folgenden Block aufrufen
if __name__ == "__main__":
    sentence = "it was a dark and stormy python"
    print(first_word(sentence))
    print(second_word(sentence))
    print(last_word(sentence))
```

Von nun an wird es in den Vorlagen keine Erinnerungen mehr an die Verwendung des `if __name__ == "__main__"`-Blocks geben. Die automatischen Tests verlangen jedoch weiterhin dessen Verwendung, sodass Sie den Block selbst hinzufügen müssen, wenn Sie Ihre Funktion innerhalb der Hauptfunktion Ihres Programms testen.

**Hinweis:** Einige Übungen, wie die Übung _Palindrome_ weiter unten in diesem Abschnitt, erwarten von Ihnen, dass Sie auch Code schreiben, der die von Ihnen geschriebene Funktion aufruft. Dieser Code sollte _nicht_ in einen `if __name__ == "__main__"`-Block gesetzt werden. Die automatischen Tests führen keinen Code innerhalb dieses Blocks aus, sodass Ihre Lösung nicht vollständig ist, wenn Sie Ihre Funktionsaufrufe dort platzieren.

<programming-exercise name='Liste aus Sternen' tmcname='part04-22_list_of_stars'>

Bitte schreiben Sie eine Funktion namens `list_of_stars`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Funktion soll Zeilen aus Sternchen ausgeben. Die Zahlen in der Liste geben an, wie viele Sterne jede Zeile enthalten soll.

Beispielsweise sollte beim Funktionsaufruf `list_of_stars([3, 7, 1, 1, 2])` folgendes ausgegeben werden:

<sample-output>

<pre>
***
*******
*
*
**
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Anagramme' tmcname='part04-23_anagrams'>

Bitte schreiben Sie eine Funktion namens `anagrams`, die zwei Zeichenketten als Argumente entgegennimmt. Die Funktion gibt `True` zurück, wenn die Zeichenketten Anagramme voneinander sind. Zwei Wörter sind Anagramme, wenn sie genau die gleichen Zeichen enthalten.

Einige Beispiele, wie die Funktion funktionieren sollte:

```python
print(anagrams("tame", "meta")) # True
print(anagrams("tame", "mate")) # True
print(anagrams("tame", "team")) # True
print(anagrams("tabby", "batty")) # False
print(anagrams("python", "java")) # False
```

Hinweis: Die Funktion `sorted` kann auch auf Zeichenketten angewendet werden.

</programming-exercise>

<programming-exercise name='Palindrome' tmcname='part04-24_palindromes'>

Bitte schreiben Sie eine Funktion namens `palindromes`, die ein Zeichenketten-Argument entgegennimmt und `True` zurückgibt, wenn die Zeichenkette ein Palindrom ist. Palindrome sind Wörter, die vorwärts und rückwärts genau gleich geschrieben werden.

Bitte schreiben Sie auch eine Hauptfunktion, die den Benutzer auffordert, Wörter einzugeben, bis er ein Palindrom eingibt:

<sample-output>

Bitte geben Sie ein Palindrom ein: **python**
das war kein Palindrom
Bitte geben Sie ein Palindrom ein: **java**
das war kein Palindrom
Bitte geben Sie ein Palindrom ein: **oddoreven**
das war kein Palindrom
Bitte geben Sie ein Palindrom ein: **neveroddoreven**
neveroddoreven ist ein Palindrom!

</sample-output>

**Hinweis:** Die Hauptfunktion **sollte nicht** in einem `if __name__ == "__main__":`-Block stehen.

</programming-exercise>

<programming-exercise name='Die Summe positiver Zahlen' tmcname='part04-25_sum_of_positives'>

Bitte schreiben Sie eine Funktion namens `sum_of_positives`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Funktion gibt die Summe der positiven Werte in der Liste zurück.

```python
my_list = [1, -2, 3, -4, 5]
result = sum_of_positives(my_list)
print("Das Ergebnis ist", result)
```

<sample-output>

Das Ergebnis ist 9

</sample-output>

</programming-exercise>

In diesen Übungen werden wir Listen als Argumente und Rückgabewerte verwenden. Dies wurde im [vorherigen Abschnitt](/part-4/3-lists#eine-liste-als-argument-oder-rückgabewert) behandelt, falls Sie eine Auffrischung benötigen.

<programming-exercise name='Gerade Zahlen' tmcname='part04-26_even_numbers'>

Bitte schreiben Sie eine Funktion namens `even_numbers`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Funktion gibt eine neue Liste zurück, die die geraden Zahlen aus der ursprünglichen Liste enthält.

```python
my_list = [1, 2, 3, 4, 5]
new_list = even_numbers(my_list)
print("Original", my_list)
print("Neu", new_list)
```

<sample-output>

Original [1, 2, 3, 4, 5]
Neu [2, 4]

</sample-output>

</programming-exercise>

<programming-exercise name='Die Summe von Listen' tmcname='part04-27_sum_of_lists'>

Bitte schreiben Sie eine Funktion namens `list_sum`, die zwei Listen von Ganzzahlen als Argumente entgegennimmt. Die Funktion gibt eine neue Liste zurück, die die Summen der Elemente an jedem Index in den beiden ursprünglichen Listen enthält. Sie können davon ausgehen, dass beide Listen die gleiche Anzahl von Elementen haben.

Ein Beispiel für die Funktion in Aktion:

```python
a = [1, 2, 3]
b = [7, 8, 9]
print(list_sum(a, b)) # [8, 10, 12]
```

</programming-exercise>

<programming-exercise name='Eindeutige Zahlen' tmcname='part04-28_distinct_numbers'>

Bitte schreiben Sie eine Funktion namens `distinct_numbers`, die eine Liste von Ganzzahlen als Argument entgegennimmt. Die Funktion gibt eine neue Liste zurück, die die Zahlen aus der ursprünglichen Liste in der Reihenfolge ihrer Größe enthält, wobei jede eindeutige Zahl nur einmal vorkommt.

```python
my_list = [3, 2, 2, 1, 3, 3, 1]
print(distinct_numbers(my_list)) # [1, 2, 3]
```

</programming-exercise>

## Das beste oder schlechteste Element in einer Liste finden

Eine sehr häufige Programmieraufgabe besteht darin, das beste oder schlechteste Element in einer Liste nach bestimmten Kriterien zu finden. Eine einfache Lösung besteht darin, eine Hilfsvariable zu verwenden, um sich zu "merken", welches der bisher verarbeiteten Elemente am besten geeignet war. Diese vorläufige beste Wahl wird dann nacheinander mit jedem Element verglichen, und am Ende der Iteration enthält die Variable das beste Element der Gruppe.

Ein grober Entwurf, der noch nicht ganz kompilierbar ist:

```python
best = initial_value # Der Anfangswert hängt von der Situation ab
for item in my_list:
    if item ist besser als best:
        best = item

# Wir haben nun das beste Element ermittelt!
```

Die Details des endgültigen Programmcodes hängen vom Typ der Elemente in der Liste und auch von den Kriterien für die Auswahl des besten (oder schlechtesten) Elements ab. Manchmal benötigen Sie mehr als eine Hilfsvariable.

Lassen Sie uns diese Methode ein wenig üben.

<programming-exercise name='Die Länge der längsten Zeichenkette in der Liste' tmcname='part04-29_length_of_longest'>

Bitte schreiben Sie eine Funktion namens `length_of_longest`, die eine Liste von Zeichenketten als Argument entgegennimmt. Die Funktion gibt die Länge der längsten Zeichenkette zurück.

```python
my_list = ["first", "second", "fourth", "eleventh"]

result = length_of_longest(my_list)
print(result)
```

```python
my_list = ["adele", "mark", "dorothy", "tim", "hedy", "richard"]

result = length_of_longest(my_list)
print(result)
```

<sample-output>

8
7

</sample-output>

</programming-exercise>

<programming-exercise name='Die kürzeste Zeichenkette in der Liste' tmcname='part04-30_shortest_in_list'>

Bitte schreiben Sie eine Funktion namens `shortest`, die eine Liste von Zeichenketten als Argument entgegennimmt. Die Funktion gibt diejenige der Zeichenketten zurück, die am kürzesten ist. Wenn mehr als eine gleich kurz sind, kann die Funktion eine beliebige der kürzesten Zeichenketten zurückgeben (eine solche Situation wird in den Tests nicht vorkommen). Sie können davon ausgehen, dass die Liste keine leeren Zeichenketten enthält.


```python
my_list = ["first", "second", "fourth", "eleventh"]

result = shortest(my_list)
print(result)
```

```python
my_list = ["adele", "mark", "dorothy", "tim", "hedy", "richard"]

result = shortest(my_list)
print(result)
```

<sample-output>

first
tim

</sample-output>

</programming-exercise>

<programming-exercise name='Alle längsten Zeichenketten in der Liste' tmcname='part04-31_all_longest_in_list'>

Bitte schreiben Sie eine Funktion namens `all_the_longest`, die eine Liste von Zeichenketten als Argument entgegennimmt. Die Funktion soll eine neue Liste zurückgeben, die die längste Zeichenkette aus der ursprünglichen Liste enthält. Wenn mehr als eine gleich lang sind, soll die Funktion alle längsten Zeichenketten zurückgeben.

Die Reihenfolge der Zeichenketten in der zurückgegebenen Liste sollte die gleiche sein wie in der ursprünglichen.

```python
my_list = ["first", "second", "fourth", "eleventh"]

result = all_the_longest(my_list)
print(result) # ['eleventh']
```

```python
my_list = ["adele", "mark", "dorothy", "tim", "hedy", "richard"]

result = all_the_longest(my_list)
print(result) # ['dorothy', 'richard']
```

</programming-exercise>
