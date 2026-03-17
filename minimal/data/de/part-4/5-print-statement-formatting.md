---
path: '/part-4/5-print-statement-formatting'
title: Formatierung der print-Anweisung
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man Argumente verwendet, um das Ergebnis des `print`-Befehls zu formatieren
- werden Sie in der Lage sein, f-Strings zur Formatierung von Ausgaben zu verwenden

</text-box>

Bisher haben wir drei Methoden gelernt, um das Argument für den `print`-Befehl zu formulieren.

Die erste ist der `+`-Operator für Zeichenketten. Er ermöglicht die einfache Verkettung von String-Segmenten:

```python
name = "Mark"
age = 37
print("Hallo " + name + ", dein Alter ist " + str(age) + " Jahre")
```

Diese Methode funktioniert nicht, wenn eines der Segmente keine Zeichenkette ist. Im obigen Beispiel wurde die Variable `age` mit der Funktion `str` in eine Zeichenkette umgewandelt, da sie eine Ganzzahl ist und nicht ohne Weiteres verkettet werden kann.

Die zweite Methode besteht darin, jedes Segment des Arguments als separates Argument zu betrachten und sie durch Kommas zu trennen:

```python
print("Hallo", name, "dein Alter ist", age, "Jahre")
```

Dieser Code erzeugt genau das gleiche Ergebnis wie die vorherige Version. Der `print`-Befehl fügt normalerweise ein Leerzeichen zwischen jedem Argument hinzu. Der Vorteil hierbei ist, dass die Segmente von unterschiedlichem Typ sein können, sodass nichts in eine Zeichenkette umgewandelt werden muss.

Wenn Sie die automatisch hinzugefügten Leerzeichen entfernen möchten, können Sie ein spezielles benanntes Argument `sep` hinzufügen:

```python
print("Hallo", name, "dein Alter ist", age, "Jahre", sep="")
```

Dies gibt folgendes aus:

<sample-output>

HalloMarkdein Alter ist37Jahre

</sample-output>


Das Argument `sep=""` ist ein _Schlüsselwort-Argument_ (keyword argument), und sein Name ist die Abkürzung für _Separator_ (Trennzeichen). Es gibt an, dass die anderen Argumente nun durch eine leere Zeichenkette getrennt werden sollen. Sie können das Trennzeichen auf eine beliebige Zeichenkette setzen. Wenn Sie beispielsweise jedes Argument in einer eigenen Zeile haben möchten, könnten Sie das Trennzeichen auf `"\n"` setzen, welches das Zeilenumbruchzeichen ist:

```python
print("Hallo", name, "dein Alter ist", age, "Jahre", sep="\n")
```

<sample-output>

Hallo
Mark
dein Alter ist
37
Jahre

</sample-output>

Standardmäßig endet der `print`-Befehl immer mit einem Zeilenumbruchzeichen, aber auch das können Sie ändern. Das Schlüsselwort-Argument `end` gibt an, was am Ende einer Zeile steht. Wenn Sie `end` auf eine leere Zeichenkette setzen, bedeutet dies, dass am Ende der Ausgabe kein Zeilenumbruchzeichen steht:

```python
print("Hallo ", end="")
print("zusammen!")
```

<sample-output>

Hallo zusammen!

</sample-output>

## f-Strings

Die dritte Methode zur Aufbereitung von Zeichenketten sind f-Strings. Das vorherige Beispiel mit dem Namen und dem Alter würde mit f-Strings formuliert so aussehen:

```python
name = "Erkki"
age = 39
print(f"Hallo {name}, dein Alter ist {age} Jahre")
```

Bisher haben wir nur sehr einfache f-Strings verwendet, aber sie können bei der Formatierung von Inhalten des Typs String sehr vielseitig sein. Ein sehr häufiger Anwendungsfall ist das Festlegen der Anzahl der Nachkommastellen, die bei einer Gleitkommazahl ausgegeben werden. Standardmäßig ist die Anzahl recht hoch:

```python
number = 1/3
print(f"Die Zahl ist {number}")
```

<sample-output>

Die Zahl ist 0.333333333333333

</sample-output>

Das spezifische Format, in dem die Zahl angezeigt werden soll, kann innerhalb der geschweiften Klammern des Variablen-Ausdrucks festgelegt werden. Fügen wir einen Doppelpunkt und einen _Format-Spezifizierer_ nach dem Variablennamen hinzu:

```python
number = 1/3
print(f"Die Zahl ist {number:.2f}")
```

```python
Die Zahl ist 0.33
```

Der Format-Spezifizierer `.2f` gibt an, dass wir 2 Dezimalstellen anzeigen möchten. Der Buchstabe _f_ am Ende bedeutet, dass die Variable als `float`, d. h. als Gleitkommazahl, angezeigt werden soll.

Hier ist ein weiteres Beispiel, bei dem wir die Menge an Leerzeichen angeben, die für die Variable in der Ausgabe reserviert ist. Jedes Mal, wenn die Variable `name` in der resultierenden Zeichenkette enthalten ist, ist ein Platz von 15 Zeichen reserviert. Zuerst werden die Namen linksbündig ausgerichtet, dann rechtsbündig:

```python
names =  [ "Steve", "Jean", "Katherine", "Paul" ]
for name in names:
  print(f"{name:15} Mitte {name:>15}")
```

```python
Steve           Mitte           Steve
Jean            Mitte            Jean
Katherine       Mitte       Katherine
Paul            Mitte            Paul
```

Die Verwendung von f-Strings ist nicht auf `print`-Befehle beschränkt. Sie können Variablen zugewiesen und mit anderen Zeichenketten kombiniert werden:

```python
name = "Larry"
age = 48
city = "Palo Alto"
greeting = f"Hallo {name}, du bist {age} Jahre alt"
print(greeting + f", und du lebst in {city}")
```

<sample-output>

Hallo Larry, du bist 48 Jahre alt, und du lebst in Palo Alto

</sample-output>

Sie können sich einen f-String als eine Art Funktion vorstellen, die eine normale Zeichenkette basierend auf den "Argumenten" innerhalb der geschweiften Klammern erstellt.

<programming-exercise name='Ganzzahlen zu Zeichenketten' tmcname='part04-32_integers_to_strings'>

Bitte schreiben Sie eine Funktion namens `formatted`, die eine Liste von Gleitkommazahlen als Argument entgegennimmt. Die Funktion gibt eine neue Liste zurück, die jedes Element der ursprünglichen Liste im String-Format enthält, gerundet auf zwei Dezimalstellen. Die Reihenfolge der Elemente in der Liste soll unverändert bleiben.

_Hinweis: Verwenden Sie f-Strings, um die Gleitkommazahlen in geeignete Zeichenketten zu formatieren._

Ein Beispiel für das erwartete Verhalten:

```python
my_list = [1.234, 0.3333, 0.11111, 3.446]
new_list = formatted(my_list)
print(new_list)
```

<sample-output>

['1.23', '0.33', '0.11', '3.45']

</sample-output>

</programming-exercise>
