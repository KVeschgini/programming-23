---
path: '/part-2/2-else-elif'
title: 'Weitere bedingte Anweisungen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- wissen Sie, wie Sie mehrere Verzweigungen innerhalb bedingter Anweisungen erstellen
- verstehen Sie den Zweck von `if`-, `elif`- und `else`-Anweisungen innerhalb einer bedingten Anweisung
- können Sie die Modulo-Operation `%` in Booleschen Ausdrücken verwenden

</text-box>

Betrachten wir ein Programm, das den Benutzer auffordert, eine Zahl einzugeben, und dann verschiedene Nachrichten ausgibt, je nachdem, ob die Zahl negativ, positiv oder gleich Null ist:

```python
zahl = int(input("Bitte geben Sie eine Zahl ein: "))

if zahl < 0:
    print("Die Zahl ist negativ")

if zahl >= 0:
    print("Die Zahl ist positiv oder Null")
```

Dies wirkt etwas schwerfällig und repetitiv. Wir möchten eigentlich immer nur einen der `if`-Blöcke ausführen, da die Eingabe entweder kleiner als Null oder Null beziehungsweise größer als Null sein wird. Das heißt, entweder ist `zahl < 0` oder `zahl >= 0` wahr, aber niemals beides gleichzeitig. Die erste bedingte Anweisung enthält also eigentlich schon alles, was wir benötigen. Wenn sie wahr ist, ist die Zahl negativ. Wenn sie falsch ist, ist die Zahl gleich Null oder positiv.

Anstatt eine komplett neue bedingte Anweisung zu erstellen, wie im obigen Beispiel, ist es möglich, eine weitere Verzweigung derselben bedingten Anweisung zu erstellen, um alle Fälle abzudecken, _in denen die Bedingung falsch war_. Dies wird als `else`-Anweisung bezeichnet.

Das vorherige Beispiel neu geschrieben:

```python
zahl = int(input("Bitte geben Sie eine Zahl ein: "))

if zahl < 0:
    print("Die Zahl ist negativ")
else:
    print("Die Zahl ist positiv oder Null")
```

Bei Verwendung einer if-else-Konstruktion wird immer genau eine der Verzweigungen ausgeführt. Das folgende Bild veranschaulicht die Struktur:

<img src="2_2_1.png">

Hinweis: Es kann niemals eine else-Verzweigung ohne eine vorangehende if-Verzweigung geben. Die if-else-Konstruktion als Ganzes bildet eine einzige _bedingte Anweisung_.

Das folgende Beispiel prüft, ob eine vom Benutzer eingegebene Zahl gerade ist oder nicht. Die Parität kann mit dem Modulo-Operator `%` überprüft werden, der den Rest einer Ganzzahldivision liefert. Wenn der Rest bei der Division durch zwei Null ist, ist die Zahl gerade. Andernfalls ist die Zahl ungerade.

```python
zahl = int(input("Bitte geben Sie eine Zahl ein: "))

if zahl % 2 == 0:
    print("Die Zahl ist gerade")
else:
    print("Die Zahl ist ungerade")
```

<sample-output>

Bitte geben Sie eine Zahl ein: **5**
Die Zahl ist ungerade

</sample-output>

Ein weiteres Beispiel mit einem String-Vergleich:

```python
korrekt = "kätzchen"
passwort = input("Bitte geben Sie das Passwort ein: ")

if passwort == korrekt:
    print("Willkommen")
else:
    print("Kein Zutritt")
```

Mit zwei verschiedenen Eingaben sollte dies Folgendes ausgeben:

<sample-output>

Bitte geben Sie das Passwort ein: **kätzchen**
Willkommen

</sample-output>

<sample-output>

Bitte geben Sie das Passwort ein: **affe**
Kein Zutritt

</sample-output>

<in-browser-programming-exercise name="Volljährigkeit" tmcname="part02-04_age_of_maturity" height="400px">

Bitte schreiben Sie ein Programm, das den Benutzer nach seinem Alter fragt. Das Programm soll dann eine Nachricht ausgeben, je nachdem, ob der Benutzer volljährig ist oder nicht, wobei 18 als Alter der Volljährigkeit gilt.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Wie alt sind Sie? **12**
Sie sind noch nicht volljährig!

</sample-output>

<sample-output>

Wie alt sind Sie? **32**
Sie sind volljährig!

</sample-output>

</in-browser-programming-exercise>

## Alternative Verzweigungen mit der elif-Anweisung

Oft gibt es mehr als zwei Optionen, die das Programm berücksichtigen sollte. Beispielsweise könnte das Ergebnis eines Fußballspiels auf drei Arten ausgehen: Heimsieg, Auswärtssieg oder Unentschieden.

Eine bedingte Anweisung kann um eine `elif`-Verzweigung ergänzt werden. Dies ist eine Abkürzung für "else if", was bedeutet, dass die Verzweigung eine Alternative zur ursprünglichen Bedingung enthält. Wichtig ist, dass eine `elif`-Anweisung nur dann ausgeführt wird, wenn keine der vorangehenden Verzweigungen ausgeführt wurde.

<img src="2_2_2.png">

Betrachten wir ein Programm, das den Gewinner eines Spiels ermittelt:

```python
tore_heim = int(input("Heimtore: "))
tore_gast = int(input("Gasttore: "))

if tore_heim > tore_gast:
    print("Die Heimmannschaft hat gewonnen!")
elif tore_gast > tore_heim:
    print("Die Gastmannschaft hat gewonnen!")
else:
    print("Es ist ein Unentschieden!")
```

Dieses Programm könnte bei verschiedenen Eingaben drei verschiedene Aussagen ausgeben:

<sample-output>

Heimtore: **4**
Gasttore: **2**
Die Heimmannschaft hat gewonnen!

</sample-output>

<sample-output>

Heimtore: **0**
Gasttore: **6**
Die Gastmannschaft hat gewonnen!

</sample-output>

<sample-output>

Heimtore: **3**
Gasttore: **3**
Es ist ein Unentschieden!

</sample-output>

Im obigen Beispiel gibt es drei alternative Verzweigungen, von denen immer genau eine ausgeführt wird. Es gibt jedoch keine Begrenzung für die Anzahl der `elif`-Verzweigungen, die eine bedingte Anweisung enthalten kann, und die `else`-Verzweigung ist nicht zwingend erforderlich.

Dies ist ebenfalls eine gültige bedingte Anweisung:

```python
print("Feiertagskalender")
datum = input("Welches Datum haben wir heute? ")

if datum == "26. Dez":
    print("Es ist der zweite Weihnachtsfeiertag")
elif datum == "31. Dez":
    print("Es ist Silvester")
elif datum == "1. Jan":
    print("Es ist Neujahr")

print("Vielen Dank und auf Wiedersehen.")
```

<sample-output>

Feiertagskalender
Welches Datum haben wir heute? **31. Dez**
Es ist Silvester
Vielen Dank und auf Wiedersehen.

</sample-output>

Beachten Sie, dass das vorherige Beispiel keine `else`-Verzweigung hat. Wenn der Benutzer ein Datum eingibt, das in keiner der `if`- oder `elif`-Verzweigungen erwähnt wird, oder ein Datum in einem anderen Format eingibt, wird keine der drei Verzweigungen der bedingten Anweisung ausgeführt.

<sample-output>

Feiertagskalender
Welches Datum haben wir heute? **25. Dez**
Vielen Dank und auf Wiedersehen.

</sample-output>

<in-browser-programming-exercise name="Größer oder gleich" tmcname="part02-05_greater_or_equal" height="400px">

Bitte schreiben Sie ein Programm, das nach zwei Ganzzahlen fragt. Das Programm soll dann ausgeben, welche der beiden größer ist. Wenn die Zahlen gleich sind, soll das Programm eine andere Nachricht ausgeben.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Bitte geben Sie die erste Zahl ein: **5**
Bitte geben Sie eine weitere Zahl ein: **3**
Die größere Zahl war: 5

</sample-output>

<sample-output>

Bitte geben Sie die erste Zahl ein: **5**
Bitte geben Sie eine weitere Zahl ein: **8**
Die größere Zahl war: 8

</sample-output>

<sample-output>

Bitte geben Sie die erste Zahl ein: **5**
Bitte geben Sie eine weitere Zahl ein: **5**
Die Zahlen sind gleich!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Wer ist älter?" tmcname="part02-06_elder" height="550px">

Bitte schreiben Sie ein Programm, das nach den Namen und dem Alter von zwei Personen fragt. Das Programm soll dann den Namen der älteren Person ausgeben.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Person 1:
Name: **Alan**
Alter: **26**
Person 2:
Name: **Ada**
Alter: **27**
Die ältere Person ist Ada

</sample-output>

<sample-output>

Person 1:
Name: **Bill**
Alter: **1**
Person 2:
Name: **Jean**
Alter: **1**
Bill und Jean sind gleich alt

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Alphabetisch an letzter Stelle" tmcname="part02-07_alphabetically_last" height="500px">

Python-Vergleichsoperatoren können auch auf Zeichenketten angewendet werden. Die Zeichenkette `a` ist kleiner als die Zeichenkette `b`, wenn sie alphabetisch vor `b` kommt. Beachten Sie jedoch, dass der Vergleich nur dann zuverlässig ist, wenn
- die verglichenen Zeichen die gleiche Groß-/Kleinschreibung haben, d. h. beide GROSS oder beide klein geschrieben sind
- nur das Standard-Alphabet von a bis z bzw. A bis Z verwendet wird.

Bitte schreiben Sie ein Programm, das den Benutzer nach zwei Wörtern fragt. Das Programm soll dann ausgeben, welches der beiden Wörter alphabetisch an letzter Stelle steht.

Sie können davon ausgehen, dass alle Wörter vollständig in Kleinbuchstaben eingegeben werden.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Bitte geben Sie das 1. Wort ein: **Auto**
Bitte geben Sie das 2. Wort ein: **Roller**
Roller steht alphabetisch an letzter Stelle.

</sample-output>

<sample-output>

Bitte geben Sie das 1. Wort ein: **zorro**
Bitte geben Sie das 2. Wort ein: **batman**
zorro steht alphabetisch an letzter Stelle.

</sample-output>

<sample-output>

Bitte geben Sie das 1. Wort ein: **python**
Bitte geben Sie das 2. Wort ein: **python**
Sie haben zweimal das gleiche Wort eingegeben.

</sample-output>

</in-browser-programming-exercise>
