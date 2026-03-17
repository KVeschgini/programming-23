---
path: '/part-3/2-working-with-strings'
title: 'Arbeiten mit Zeichenketten'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie in der Lage sein, die Operatoren `+` und `*` mit Zeichenketten zu verwenden
- werden Sie wissen, wie man die Länge einer Zeichenkette ermittelt
- werden Sie wissen, was mit String-Indizierung gemeint ist
- werden Sie wissen, wie man nach Teilzeichenketten innerhalb einer Zeichenkette sucht

</text-box>

## Operationen mit Zeichenketten

Zeichenketten können mit dem `+`-Operator kombiniert oder _verkettet_ werden:

```python
begin = "ex"
end = "ample"
word = begin+end
print(word)
```

<sample-output>

example

</sample-output>

Der `*`-Operator kann auch mit einer Zeichenkette verwendet werden, wenn der andere Operand eine ganze Zahl ist. Der Zeichenketten-Operand wird dann so oft wiederholt, wie durch die ganze Zahl angegeben. Dies würde zum Beispiel funktionieren:

```python
word = "banana"
print(word*3)
```

<sample-output>

bananabananabanana

</sample-output>

Durch die Verwendung von Zeichenkettenoperationen zusammen mit einer Schleife können wir ein Programm schreiben, das eine Pyramide zeichnet:

```python
n = 10 # Anzahl der Schichten in der Pyramide
row = "*"

while n > 0:
    print(" " * n + row)
    row += "**"
    n -= 1
```

Dies gibt Folgendes aus:

```x
          *
         ***
        *****
       *******
      *********
     ***********
    *************
   ***************
  *****************
 *******************
```

Der `print`-Befehl innerhalb der Schleife gibt eine Zeile aus, die mit `n` Leerzeichen beginnt, gefolgt von dem, was in der Variable `row` gespeichert ist. Dann werden zwei Sterne am Ende der Variable `row` hinzugefügt, und der Wert der Variable `n` wird um 1 verringert.

<in-browser-programming-exercise name="Zeichenkette multipliziert" tmcname="part03-08_string_multiplied">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Zeichenkette und einer Anzahl fragt. Das Programm gibt dann die Zeichenkette so oft aus, wie durch die Anzahl angegeben. Die Ausgabe sollte in einer Zeile erfolgen, ohne zusätzliche Leerzeichen oder Symbole.

Ein Beispiel für das erwartete Verhalten:

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **hiya**
Bitte geben Sie eine Anzahl ein: **4**
hiyahiyahiyahiya

</sample-output>

</in-browser-programming-exercise>

## Die Länge und der Index einer Zeichenkette

Die Funktion `len` gibt die Anzahl der Zeichen in einer Zeichenkette zurück, was immer ein ganzzahliger Wert ist. Zum Beispiel gibt `len("hey")` den Wert 3 zurück, da die Zeichenkette `hey` drei Zeichen enthält.

Das folgende Programm fragt den Benutzer nach einer Zeichenkette und gibt sie dann "unterstrichen" aus. Das Programm gibt eine zweite Zeile mit so vielen `-`-Zeichen aus, wie die Länge der Eingabe beträgt:

```python
input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
print(input_string)
print("-"*len(input_string))
```

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **Hi there!**

<pre>
Hi there!
---------
</pre>

</sample-output>

Die Länge einer Zeichenkette umfasst alle Zeichen in der Zeichenkette, einschließlich Leerzeichen. Zum Beispiel beträgt die Länge der Zeichenkette `bye bye` 7.

<in-browser-programming-exercise name="Die längere Zeichenkette" tmcname="part03-09_longer_string">

Bitte schreiben Sie ein Programm, das den Benutzer nach zwei Zeichenketten fragt und dann diejenige ausgibt, die länger ist – also diejenige mit mehr Zeichen. Wenn die Zeichenketten gleich lang sind, soll das Programm "Die Zeichenketten sind gleich lang" ausgeben.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Bitte geben Sie Zeichenkette 1 ein: **hey**
Bitte geben Sie Zeichenkette 2 ein: **hiya**
hiya ist länger

</sample-output>

<sample-output>

Bitte geben Sie Zeichenkette 1 ein: **howdy doody**
Bitte geben Sie Zeichenkette 2 ein: **hola**
howdy doody ist länger

</sample-output>

<sample-output>

Bitte geben Sie Zeichenkette 1 ein: **hey**
Bitte geben Sie Zeichenkette 2 ein: **bye**
Die Zeichenketten sind gleich lang

</sample-output>

</in-browser-programming-exercise>

Da Zeichenketten im Wesentlichen Sequenzen von Zeichen sind, kann auch jedes einzelne Zeichen in einer Zeichenkette abgerufen werden. Der Operator `[]` findet das Zeichen mit dem innerhalb der Klammern angegebenen _Index_.

Der Index bezieht sich auf eine Position in der Zeichenkette, beginnend bei Null. Das erste Zeichen in der Zeichenkette hat den Index 0, das zweite Zeichen den Index 1 und so weiter.

<img src="3_2_1.png">

Zum Beispiel würde dieses Programm

```python

input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
print(input_string[0])
print(input_string[1])
print(input_string[3])

```

Folgendes ausgeben:

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **monkey**
m
o
k

</sample-output>

Da das erste Zeichen in einer Zeichenkette den Index 0 hat, hat das letzte Zeichen den Index _Länge - 1_. Das folgende Programm gibt das erste und das letzte Zeichen einer Zeichenkette aus:

```python
input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
print("Erstes Zeichen: " + input_string[0])
print("Letztes Zeichen: " + input_string[len(input_string) - 1])
```

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **testing**
Erstes Zeichen: t
Letztes Zeichen: g

</sample-output>

Das folgende Programm durchläuft alle Zeichen einer Zeichenkette vom ersten bis zum letzten:

```python
input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
index = 0
while index < len(input_string):
    print(input_string[index])
    index += 1
```

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **test**
t
e
s
t

</sample-output>

Sie können auch eine negative Indizierung verwenden, um auf Zeichen zuzugreifen, die vom Ende der Zeichenkette aus gezählt werden. Das letzte Zeichen in einer Zeichenkette befindet sich am Index -1, das vorletzte Zeichen am Index -2 und so weiter. Sie können sich `input_string[-1]` als Kurzform für `input_string[len(input_string) - 1]` vorstellen.

<img src="3_2_2.png">

Das obige Beispiel kann mit negativer Indizierung vereinfacht werden:

```python
input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
print("Erstes Zeichen: " + input_string[0])
print("Letztes Zeichen: " + input_string[-1])
```

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **testing**
Erstes Zeichen: t
Letztes Zeichen: g

</sample-output>

## IndexError: string index out of range

Wenn Sie die obigen Beispiele selbst ausprobiert haben, sind Sie vielleicht bereits auf die Fehlermeldung _IndexError: string index out of range_ gestoßen. Dieser Fehler tritt auf, wenn Sie versuchen, auf einen Index zuzugreifen, der in der Zeichenkette nicht vorhanden ist.

```python
input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
print("Das zehnte Zeichen: " + input_string[9])
```

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **introduction to programming**
Das zehnte Zeichen: i

</sample-output>

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **python**

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: string index out of range

</sample-output>

Manchmal wird ein Indizierungsfehler durch einen Fehler im Code verursacht. Beispielsweise ist es recht üblich, einen zu hohen Index zu verwenden, wenn versucht wird, auf das letzte Zeichen in einer Zeichenkette zuzugreifen:

```python
input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
print("Letztes Zeichen: " + input_string[len(input_string)])
```

Da die String-Indizierung bei Null beginnt, befindet sich das letzte Zeichen am Index `len(input_string) - 1`, nicht bei `len(input_string)`.

Es gibt Situationen, in denen das Programm auf Fehler vorbereitet sein sollte, die durch Benutzereingaben verursacht werden:

```python
input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
if len(input_string) > 0:
    print("Erstes Zeichen: " + input_string[0])
else:
    print("Die eingegebene Zeichenkette ist leer. Es gibt kein erstes Zeichen.")
```

Wenn der Programmierer im obigen Beispiel keine Prüfung der Länge der Eingabezeichenkette eingebaut hätte, hätte eine Zeichenkette der Länge Null einen Fehler verursacht. Eine Zeichenkette der Länge Null wird auch als leere Zeichenkette bezeichnet und wird hier erreicht, indem man einfach die Eingabetaste bei der Eingabeaufforderung drückt.

<in-browser-programming-exercise name="Vom Ende zum Anfang" tmcname="part03-10_end_to_beginning">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Zeichenkette fragt. Das Programm gibt dann die Eingabezeichenkette in umgekehrter Reihenfolge aus, vom Ende zum Anfang. Jedes Zeichen sollte in einer separaten Zeile stehen.

Ein Beispiel für das erwartete Verhalten:

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **hiya**
a
y
i
h

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Zweites und vorletztes Zeichen" tmcname="part03-11_second_and_second_to_last">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Zeichenkette fragt. Das Programm gibt dann eine Meldung aus, je nachdem, ob das zweite Zeichen und das vorletzte Zeichen gleich sind oder nicht. Siehe die folgenden Beispiele.

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **python**
Das zweite und das vorletzte Zeichen sind verschieden

</sample-output>

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **pascal**
Das zweite und das vorletzte Zeichen sind a

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Eine Zeile aus Rautezeichen" tmcname="part03-12_line_of_hashes">

Bitte schreiben Sie ein Programm, das eine Zeile aus Rautezeichen ausgibt, deren Breite vom Benutzer gewählt wird.

<sample-output>

Breite: **3**
<pre>
###
</pre>

</sample-output>

<sample-output>

Breite: **8**
<pre>
########
</pre>

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Ein Rechteck aus Rautezeichen" tmcname="part03-13_rectangle_of_hashes">

Bitte ändern Sie das vorherige Programm so, dass es auch nach der Höhe fragt und entsprechend ein Rechteck aus Rautezeichen ausgibt.

<sample-output>

Breite: **10**
Höhe: **3**
##########
##########
##########

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Unterstreichen" tmcname="part03-14_underlining">

Bitte schreiben Sie ein Programm, das den Benutzer in einer Schleife nach Zeichenketten fragt. Das Programm gibt jede Zeichenkette unterstrichen aus, wie in den folgenden Beispielen gezeigt. Die Ausführung endet, wenn der Benutzer eine leere Zeichenkette eingibt – also einfach die Eingabetaste bei der Eingabeaufforderung drückt.

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **Hi there!**
<pre>
Hi there!
---------
</pre>
Bitte geben Sie eine Zeichenkette ein: **Dies ist ein Test**
<pre>
Dies ist ein Test
-----------------
</pre>
Bitte geben Sie eine Zeichenkette ein: **a**
<pre>
a
-
</pre>
Bitte geben Sie eine Zeichenkette ein:

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Rechtsbündig" tmcname="part03-15_right_aligned">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Zeichenkette fragt und diese dann so ausgibt, dass genau 20 Zeichen angezeigt werden. Wenn die Eingabe kürzer als 20 Zeichen ist, wird der Anfang der Zeile mit `*`-Zeichen aufgefüllt.

Sie können davon ausgehen, dass die Eingabezeichenkette höchstens 20 Zeichen lang ist.

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **python**
<pre>
**************python
</pre>

</sample-output>

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **alongerstring**
<pre>
*******alongerstring
</pre>

</sample-output>

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **averyverylongstring**
<pre>
*averyverylongstring
</pre>

</sample-output>


</in-browser-programming-exercise>

<in-browser-programming-exercise name="Ein eingerahmtes Wort" tmcname="part03-16_framed_word">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Zeichenkette fragt und dann einen Rahmen aus `*`-Zeichen mit dem Wort in der Mitte ausgibt. Die Breite des Rahmens sollte 30 Zeichen betragen. Sie können davon ausgehen, dass die Eingabezeichenkette immer in den Rahmen passt.

Wenn die Länge der Eingabezeichenkette eine ungerade Zahl ist, können Sie das Wort an einer der beiden möglichen mittleren Positionen ausgeben.

<sample-output>

Wort: **testing**
<pre>
******************************
*          testing           *
******************************
</pre>

</sample-output>

<sample-output>

Wort: **python**
<pre>
******************************
*           python           *
******************************
</pre>

</sample-output>

</in-browser-programming-exercise>


## Teilzeichenketten und Slices

Eine _Teilzeichenkette_ (Substring) einer Zeichenkette ist eine Sequenz von Zeichen, die einen Teil der Zeichenkette bildet. Zum Beispiel enthält die Zeichenkette `example` unter anderem die Teilzeichenketten `exam`, `amp` und `ple`. In der Python-Programmierung wird der Prozess des Auswählens von Teilzeichenketten üblicherweise als _Slicing_ bezeichnet, und eine Teilzeichenkette wird oft als _Slice_ der Zeichenkette bezeichnet. Die beiden Begriffe können oft synonym verwendet werden.

Wenn Sie die Start- und Endindizes des Slices kennen, den Sie extrahieren möchten, können Sie dies mit der Notation `[a:b]` tun. Das bedeutet, dass der Slice am Index `a` beginnt und beim letzten Zeichen vor dem Index `b` endet – also das erste einschließt, aber das letzte ausschließt. Sie können sich die Indizes als Trennlinien vorstellen, die auf der linken Seite des indizierten Zeichens gezeichnet werden, wie in der folgenden Abbildung dargestellt:

<img src="3_2_3.png">

Schauen wir uns einige geslicte Zeichenketten genauer an:

```python
input_string = "presumptious"

print(input_string[0:3])
print(input_string[4:10])

# wenn der Startindex weggelassen wird, ist der Standardwert 0
print(input_string[:3])

# wenn der Endindex weggelassen wird, ist der Standardwert die Länge der Zeichenkette
print(input_string[4:])
```

<sample-output>

pre
umptio
pre
umptious

</sample-output>

<text-box variant='hint' name='Halboffene Intervalle'>

In der Python-Stringverarbeitung ist das Intervall `[a:b]` _halboffen_, was in diesem Fall bedeutet, dass das Zeichen am Startindex `a` im Intervall enthalten ist, das Zeichen am Endindex `b` jedoch weggelassen wird. Warum ist das so?

Es gibt keinen tiefgreifenden Grund für dieses Merkmal. Vielmehr ist es eine Konvention, die aus anderen Programmiersprachen übernommen wurde.

Halboffene Intervalle mögen sich unintuitiv anfühlen, haben aber in der Praxis einige Vorteile. Beispielsweise können Sie die Länge eines Slices einfach mit `b-a` berechnen. Andererseits müssen Sie immer daran denken, dass das Zeichen am Endindex `b` nicht im Slice enthalten sein wird.

</text-box>

<in-browser-programming-exercise name="Teilzeichenketten, Teil 1" tmcname="part03-17_substrings_part_1">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Zeichenkette einzugeben. Das Programm gibt dann alle Teilzeichenketten aus, die mit dem ersten Zeichen beginnen, von der kürzesten bis zur längsten. Schauen Sie sich das folgende Beispiel an.

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **test**
t
te
tes
test

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Teilzeichenketten, Teil 2" tmcname="part03-18_substrings_part_2">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Zeichenkette einzugeben. Das Programm gibt dann alle Teilzeichenketten aus, die mit dem letzten Zeichen enden, von der kürzesten bis zur längsten. Schauen Sie sich das folgende Beispiel an.

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **test**
t
st
est
test

</sample-output>

</in-browser-programming-exercise>

## Nach Teilzeichenketten suchen

Der `in`-Operator kann uns sagen, ob eine Zeichenkette eine bestimmte Teilzeichenkette enthält. Der boolesche Ausdruck `a in b` ist wahr, wenn `b` die Teilzeichenkette `a` enthält.

Zum Beispiel gibt dieser Codeabschnitt

```python
input_string = "test"

print("t" in input_string)
print("x" in input_string)
print("es" in input_string)
print("ets" in input_string)
```

Folgendes aus:

<sample-output>

True
False
True
False

</sample-output>

Das folgende Programm lässt den Benutzer nach Teilzeichenketten innerhalb einer im Programm fest kodierten Zeichenkette suchen:

```python
input_string = "perpendicular"

while True:
    substring = input("Wonach suchen Sie? ")
    if substring in input_string:
        print("Gefunden")
    else:
        print("Nicht gefunden")
```

<sample-output>

Wonach suchen Sie? **perp**
Gefunden
Wonach suchen Sie? **abc**
Nicht gefunden
Wonach suchen Sie? **pen**
Gefunden
...

</sample-output>

<in-browser-programming-exercise name="Enthält es Vokale" tmcname="part03-19_does_it_contain_vowels">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Zeichenkette einzugeben. Das Programm gibt dann verschiedene Meldungen aus, wenn die Zeichenkette einen der Vokale a, e oder o enthält.

Sie können davon ausgehen, dass die Eingabe vollständig in Kleinbuchstaben erfolgt. Schauen Sie sich die folgenden Beispiele an.

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **hello there**
a nicht gefunden
e gefunden
o gefunden

</sample-output>

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **hiya**
a gefunden
e nicht gefunden
o nicht gefunden

</sample-output>


</in-browser-programming-exercise>

Der Operator `in` gibt einen booleschen Wert zurück, er sagt uns also nur, _ob_ eine Teilzeichenkette in einer Zeichenkette existiert, ist aber nicht nützlich, um herauszufinden, _wo_ genau sie sich befindet. Stattdessen kann für diesen Zweck die Python-String-Methode `find` verwendet werden. Sie nimmt die gesuchte Teilzeichenkette als Argument entgegen und gibt entweder den ersten Index zurück, an dem sie gefunden wurde, oder `-1`, wenn die Teilzeichenkette nicht in der Zeichenkette gefunden wird.

Die folgende Abbildung veranschaulicht die Verwendung:

<img src="3_2_4.png">

Einige Beispiele für die Verwendung von `find`:

```python
input_string = "test"

print(input_string.find("t"))
print(input_string.find("x"))
print(input_string.find("es"))
print(input_string.find("ets"))
```

<sample-output>

0
-1
1
-1

</sample-output>

Das obige Beispiel für die Suche nach Teilzeichenketten, implementiert mit `find`:

```python
input_string = "perpendicular"

while True:
    substring = input("Wonach suchen Sie? ")
    index = input_string.find(substring)
    if index >= 0:
        print(f"Gefunden am Index {index}")
    else:
        print("Nicht gefunden")
```

<sample-output>

Wonach suchen Sie? **perp**
Gefunden am Index 0
Wonach suchen Sie? **abc**
Nicht gefunden
Wonach suchen Sie? **pen**
Gefunden am Index 3
...

</sample-output>

<text-box variant='hint' name='Methoden'>

Oben haben wir die String-_Methode_ `find` verwendet. Methoden funktionieren ganz ähnlich wie die im vorherigen Teil behandelten _Funktionen_. Was sie von Funktionen unterscheidet, ist, dass Methoden immer an das _Objekt_ gebunden sind, auf dem sie aufgerufen werden. Das Objekt ist die Entität, die im Methodenaufruf vor der Methode benannt wird. Im Fall von `find` ist das Objekt die Zeichenkette, in der die Methode nach der Teilzeichenkette sucht, die sie als Argument hat.

</text-box>

<in-browser-programming-exercise name="Die erste Teilzeichenkette finden" tmcname="part03-20_find_first_substring">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Zeichenkette und ein einzelnes Zeichen einzugeben. Das Programm gibt dann den ersten Slice aus drei Zeichen aus, der mit dem vom Benutzer angegebenen Zeichen beginnt. Sie können davon ausgehen, dass die Eingabezeichenkette mindestens drei Zeichen lang ist. Das Programm muss drei Zeichen ausgeben oder gar nichts.

Achten Sie besonders darauf, wenn nach dem ersten Vorkommen des gesuchten Zeichens weniger als zwei Zeichen in der Zeichenkette übrig sind. In diesem Fall sollte nichts ausgegeben werden, und es sollten keine Indizierungsfehler bei der Ausführung des Programms auftreten.

<sample-output>

Bitte geben Sie ein Wort ein: **mammoth**
Bitte geben Sie ein Zeichen ein: **m**
mam

</sample-output>

<sample-output>

Bitte geben Sie ein Wort ein: **banana**
Bitte geben Sie ein Zeichen ein: **n**
nan

</sample-output>

<sample-output>

Bitte geben Sie ein Wort ein: **tomato**
Bitte geben Sie ein Zeichen ein: **x**

</sample-output>

<sample-output>

Bitte geben Sie ein Wort ein: **python**
Bitte geben Sie ein Zeichen ein: **n**

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Alle Teilzeichenketten finden" tmcname="part03-21_find_all_substrings">

Bitte erstellen Sie eine erweiterte Version des vorherigen Programms, die _alle Teilzeichenketten ausgibt, die mindestens drei Zeichen lang sind_ und mit dem vom Benutzer angegebenen Zeichen beginnen. Sie können davon ausgehen, dass die Eingabezeichenkette mindestens drei Zeichen lang ist.

<sample-output>

Bitte geben Sie ein Wort ein: **mammoth**
Bitte geben Sie ein Zeichen ein: **m**
mam
mmo
mot

</sample-output>

<sample-output>

Bitte geben Sie ein Wort ein: **banana**
Bitte geben Sie ein Zeichen ein: **n**
nan

</sample-output>

**Hinweis:** Das folgende Beispiel kann Ihnen eine Inspiration geben, wie diese Übung angegangen werden könnte:

```python
word = input("Wort: ")
while True:
    if len(word) == 0:
        break
    print(word)
    word = word[2:]
```

<sample-output>

Wort: **mammoth**
mammoth
mmoth
oth
h

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Das zweite Vorkommen" tmcname="part03-22_second_occurrence">

Bitte schreiben Sie ein Programm, das das _zweite_ Vorkommen einer Teilzeichenkette findet. Wenn es kein zweites (oder erstes) Vorkommen gibt, sollte das Programm eine entsprechende Meldung ausgeben.

In dieser Übung dürfen sich die Vorkommen _nicht_ überschneiden. Beispielsweise befindet sich in der Zeichenkette `aaaa` das zweite Vorkommen der Teilzeichenkette `aa` am Index 2.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **abcabc**
Bitte geben Sie eine Teilzeichenkette ein: **ab**
Das zweite Vorkommen der Teilzeichenkette befindet sich am Index 3.

</sample-output>

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **methodology**
Bitte geben Sie eine Teilzeichenkette ein: **o**
Das zweite Vorkommen der Teilzeichenkette befindet sich am Index 6.

</sample-output>

<sample-output>

Bitte geben Sie eine Zeichenkette ein: **aybabtu**
Bitte geben Sie eine Teilzeichenkette ein: **ba**
Die Teilzeichenkette kommt in der Zeichenkette nicht zweimal vor.

</sample-output>

</in-browser-programming-exercise>

<!---
