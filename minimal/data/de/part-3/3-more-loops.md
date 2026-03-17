---
path: '/part-3/3-more-loops'
title: 'Weitere Schleifen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie verstehen, wann der `break`-Befehl benötigt wird, um aus Schleifen auszubrechen
- werden Sie in der Lage sein, den `continue`-Befehl zu verwenden, um zur nächsten Iteration zu springen
- werden Sie verstehen, wie verschachtelte Schleifen funktionieren

</text-box>

## Der break-Befehl

Sie sind bereits auf den `break`-Befehl gestoßen. Er kann verwendet werden, um die Ausführung einer Schleife sofort zu stoppen. Ein typisches Beispiel für seine Verwendung ist eine Situation, in der das Programm den Benutzer um eine Eingabe bittet und die Ausführung erst endet, wenn eine bestimmte Eingabe empfangen wird.

Dieselbe Funktionalität kann ohne den `break`-Befehl unter Verwendung einer geeigneten Bedingung erreicht werden. Die beiden folgenden Programme bitten den Benutzer jeweils um die Eingabe von Zahlen und berechnen die Summe der Zahlen, bis der Benutzer -1 eingibt.

```python
# 1. Version mit dem break-Befehl

sum = 0

while True:
    number = int(input("Bitte geben Sie eine Zahl ein, -1 zum Beenden: "))
    if number == -1:
        break
    sum += number

print (f"Die Summe ist {sum}")
```

```python
# 2. Version ohne den break-Befehl

sum = 0
number = 0

while number != -1:
    number = int(input("Bitte geben Sie eine Zahl ein, -1 zum Beenden: "))
    if number != -1:
        sum += number

print (f"Die Summe ist {sum}")
```

Beide Programme geben bei gleichen Eingaben dasselbe aus, zum Beispiel:

<sample-output>

Bitte geben Sie eine Zahl ein, -1 zum Beenden: **2**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **4**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **5**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **3**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **-1**
Die Summe ist 14

</sample-output>

Die beiden Programme sind also funktional praktisch identisch. Die erste Methode ist jedoch oft einfacher, da die Bedingung `number == -1` nur einmal vorkommt und die Variable `number` nicht außerhalb der Schleife initialisiert werden muss.

Der `break`-Befehl und eine geeignete Bedingung können auch zusammen in einer `while`-Schleife verwendet werden. Beispielsweise wird die folgende Schleife so lange wiederholt, wie die Summe der Zahlen höchstens 100 beträgt, stoppt aber auch, wenn der Benutzer die Zahl -1 eingibt.

```python
sum = 0

while sum <= 100:
    number = int(input("Bitte geben Sie eine Zahl ein, -1 zum Beenden: "))
    if number == -1:
        break
    sum += number

print (f"Die Summe ist {sum}")
```

Einige Beispiele für die Ausführung des Programms:

<sample-output>

Bitte geben Sie eine Zahl ein, -1 zum Beenden: **15**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **8**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **21**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **-1**
Die Summe ist 44

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein, -1 zum Beenden: **15**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **8**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **21**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **45**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **17**
Die Summe ist 106

</sample-output>

Im ersten Beispiel stoppt die Ausführung der Schleife, weil der Benutzer die Zahl -1 eingibt. Im zweiten Beispiel stoppt sie, weil die Summe der Zahlen 100 überschreitet.

Wie immer beim Programmieren gibt es viele Wege, um die gleiche Funktionalität zu erreichen. Das folgende Programm ist funktional identisch mit dem oben genannten:

```python
sum = 0

while True:
    number = int(input("Bitte geben Sie eine Zahl ein, -1 zum Beenden: "))
    if number == -1:
        break
    sum += number
    if sum > 100:
        break

print (f"Die Summe ist {sum}")
```
## Der continue-Befehl

Eine weitere Möglichkeit, die Art und Weise der Ausführung einer Schleife zu ändern, ist der `continue`-Befehl. Er bewirkt, dass die Ausführung der Schleife direkt zum Anfang der Schleife springt, wo sich die Bedingung der Schleife befindet. Dann wird die Ausführung normal mit der Überprüfung der Bedingung fortgesetzt:

<img src="3_3_1.png">

Zum Beispiel summiert das folgende Programm Zahlen aus der Eingabe auf, berücksichtigt aber nur die Zahlen, die kleiner als 10 sind. Wenn die Zahl 10 oder größer ist, springt die Ausführung zum Anfang der Schleife und die Zahl wird nicht zur Summe hinzugefügt.

```python
sum = 0

while True:
    number = int(input("Bitte geben Sie eine Zahl ein, -1 zum Beenden: "))
    if number == -1:
        break
    if number >= 10:
        continue
    sum += number

print (f"Die Summe ist {sum}")
```

<sample-output>

Bitte geben Sie eine Zahl ein, -1 zum Beenden: **4**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **7**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **99**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **5**
Bitte geben Sie eine Zahl ein, -1 zum Beenden: **-1**
Die Summe ist 16

</sample-output>

## Verschachtelte Schleifen

Genau wie `if`-Anweisungen können auch Schleifen innerhalb anderer Schleifen platziert werden. Das folgende Programm verwendet beispielsweise eine Schleife, um den Benutzer zur Eingabe von Zahlen aufzufordern. Es verwendet dann eine weitere Schleife innerhalb der ersten, um einen Countdown von der gegebenen Zahl bis 1 auszugeben:

```python
while True:
    number = int(input("Bitte geben Sie eine Zahl ein: "))
    if number == -1:
        break
    while number > 0:
        print(number)
        number -= 1
```

<sample-output>

Bitte geben Sie eine Zahl ein: **4**
4
3
2
1
Bitte geben Sie eine Zahl ein: **3**
3
2
1
Bitte geben Sie eine Zahl ein: **6**
6
5
4
3
2
1
Bitte geben Sie eine Zahl ein: **-1**

</sample-output>

Wenn es verschachtelte Schleifen gibt, wirken sich `break`- und `continue`-Befehle nur auf die innerste Schleife aus, deren Teil sie sind. Das vorherige Beispiel könnte auch so geschrieben werden:

```python
while True:
    number = int(input("Bitte geben Sie eine Zahl ein: "))
    if number == -1:
        break
    while True:
        if number <= 0:
            break
        print(number)
        number -= 1
```

Hier stoppt der letztere `break`-Befehl nur die innerste Schleife, die zum Ausgeben der Zahlen verwendet wird.

## Weitere Hilfsvariablen bei Schleifen

Wir haben bereits viele Male Hilfsvariablen verwendet, die sich mit jeder Iteration einer Schleife erhöhen oder verringern, daher sollte das folgende Programm in seiner Struktur recht vertraut aussehen. Das Programm gibt alle geraden Zahlen über Null aus, bis es eine vom Benutzer festgelegte Grenze erreicht:

```python
limit = int(input("Bitte geben Sie eine Zahl ein: "))
i = 0
while i < limit:
    print(i)
    i += 2
```

<sample-output>

Bitte geben Sie eine Zahl ein: **8**
0
2
4
6

</sample-output>

Die Hilfsvariable `i` wird vor der Schleife auf 0 gesetzt und erhöht sich mit jeder Iteration um zwei.

Die Verwendung verschachtelter Schleifen erfordert manchmal eine separate Hilfsvariable für die innere Schleife. Das folgende Programm gibt eine "Zahlenpyramide" basierend auf einer vom Benutzer eingegebenen Zahl aus:

```python
number = int(input("Bitte geben Sie eine Zahl ein: "))
while number > 0:
    i = 0
    while i < number:
        print(f"{i} ", end="")
        i += 1
    print()
    number -= 1
```

<sample-output>

Bitte geben Sie eine Zahl ein: **5**
0 1 2 3 4
0 1 2 3
0 1 2
0 1
0

</sample-output>

In diesem Programm verwendet die äußere Schleife die Hilfsvariable `number`, die sich mit jeder Iteration um 1 verringert, bis sie 0 erreicht. Die Hilfsvariable `i` wird jedes Mal, wenn die äußere Schleife wiederholt wird, kurz vor dem Betreten der inneren Schleife auf 0 gesetzt.

Die innere Schleife verwendet die Hilfsvariable `i`, die sich mit jeder Iteration der inneren Schleife um 1 erhöht. Die innere Schleife wird wiederholt, bis `i` gleich `number` ist, und gibt jeden Wert von `i` in derselben Zeile aus, getrennt durch ein Leerzeichen. Wenn die innere Schleife beendet ist, beginnt der `print`-Befehl in der äußeren Schleife eine neue Zeile.

Bedenken Sie nun, dass mit jeder Iteration der äußeren Schleife der Wert von `number` abnimmt, sodass auch die Anzahl der Wiederholungen der inneren Schleife abnimmt. Mit jeder Wiederholung wird die Zahlenzeile kürzer, und so erhalten wir die Pyramidenform.

Verschachtelte Schleifen können schnell unübersichtlich werden, aber das Verständnis ihrer Funktionsweise ist unerlässlich. Das Python Tutor [Visualisierungswerkzeug](http://www.pythontutor.com/visualize.html#mode=edit) kann Ihnen helfen zu verstehen, wie dieses Beispiel funktioniert. Kopieren Sie den obigen Code in das Code-Fenster des Werkzeugs und verfolgen Sie die Entstehung der Ausgabe und die sich ändernden Werte der Hilfsvariablen im Verlauf der Ausführung.

<in-browser-programming-exercise name="Multiplikation" tmcname="part03-23_multiplication">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer positiven ganzen Zahl fragt. Das Programm gibt dann eine Liste von Multiplikationsoperationen aus, bis beide Operanden die vom Benutzer angegebene Zahl erreichen. Weitere Einzelheiten finden Sie in den folgenden Beispielen:

<sample-output>

Bitte geben Sie eine Zahl ein: 2
1 x 1 = 1
1 x 2 = 2
2 x 1 = 2
2 x 2 = 4

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: 3
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Erste Buchstaben von Wörtern" tmcname="part03-24_first_letters_of_words">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, einen Satz einzugeben. Das Programm gibt dann den ersten Buchstaben jedes Wortes im Satz aus, jeden Buchstaben in einer separaten Zeile.

Ein Beispiel für das erwartete Verhalten:

<sample-output>

Bitte geben Sie einen Satz ein: **Humpty Dumpty sat on a wall**
H
D
s
o
a
w

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Fakultät" tmcname="part03-25_factorial">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine ganze Zahl einzugeben. Wenn der Benutzer eine Zahl gleich oder kleiner als 0 eingibt, endet die Ausführung. Andernfalls gibt das Programm die Fakultät der Zahl aus.

Die Fakultät einer Zahl beinhaltet die Multiplikation der Zahl mit allen positiven ganzen Zahlen, die kleiner als sie selbst sind. Mit anderen Worten, sie ist das Produkt aller positiven ganzen Zahlen, die kleiner oder gleich der Zahl sind. Beispielsweise ist die Fakultät von 5 gleich 1 * 2 * 3 * 4 * 5 = 120.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Bitte geben Sie eine Zahl ein: **3**
Die Fakultät der Zahl 3 ist 6
Bitte geben Sie eine Zahl ein: **4**
Die Fakultät der Zahl 4 ist 24
Bitte geben Sie eine Zahl ein: **-1**
Danke und tschüss!

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **1**
Die Fakultät der Zahl 1 ist 1
Bitte geben Sie eine Zahl ein: **0**
Danke und tschüss!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Paare vertauschen" tmcname="part03-26_flip_the_pairs">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Zahl einzugeben. Das Programm gibt dann alle positiven ganzzahligen Werte von 1 bis zu dieser Zahl aus. Die Reihenfolge der Zahlen wird jedoch so geändert, dass jedes Zahlenpaar vertauscht wird. Das heißt, 2 kommt vor 1, 4 vor 3 und so weiter. Einzelheiten finden Sie in den folgenden Beispielen.

<sample-output>

Bitte geben Sie eine Zahl ein: **5**
2
1
4
3
5

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **6**
2
1
4
3
6
5

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Abwechselnd" tmcname="part03-27_taking_turns">

Bitte schreiben Sie ein Programm, das den Benutzer auffordert, eine Zahl einzugeben. Das Programm gibt dann die positiven ganzen Zahlen zwischen 1 und der Zahl selbst aus, wobei es zwischen den beiden Enden des Bereichs abwechselt, wie in den folgenden Beispielen gezeigt.

<sample-output>

Bitte geben Sie eine Zahl ein: **5**
1
5
2
4
3

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **6**
1
6
2
5
3
4

</sample-output>

</in-browser-programming-exercise>

<!---
