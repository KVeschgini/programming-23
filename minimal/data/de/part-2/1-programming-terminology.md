---
path: '/part-2/1-programming-terminology'
title: 'Programmierungsterminologie'
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- sind Sie mit einigen wesentlichen Begriffen der Programmierung vertraut
- kennen Sie den Unterschied zwischen einer Anweisung (Statement) und einem Ausdruck (Expression)
- können Sie den Datentyp eines evaluierten Ausdrucks bestimmen
- haben Sie gelernt, Debugging-Methoden anzuwenden, um Fehler in Ihrem Code zu finden

</text-box>

Im ersten Teil dieses Kurses haben wir der Terminologie wenig Aufmerksamkeit geschenkt. Lassen Sie uns daher nun einige zentrale Konzepte der Programmierung betrachten.

## Anweisung (Statement)

Eine _Anweisung_ ist ein Teil des Programms, der eine Aktion ausführt. Sie bezieht sich oft, aber nicht immer, auf einen einzelnen Befehl.

Beispielsweise ist `print("Hallo!")` eine Anweisung, die eine Textzeile ausgibt. Ebenso ist `zahl = 2` eine Anweisung, die einer Variablen einen Wert zuweist.

Eine Anweisung kann auch komplexer sein. Sie kann beispielsweise andere Anweisungen enthalten. Die folgende Anweisung erstreckt sich über drei Zeilen:

```python
if name == "Anna":
    print("Hallo!")
    zahl = 2
```

In diesem Fall befinden sich zwei Anweisungen (eine Print-Anweisung und eine Zuweisung) innerhalb einer bedingten Anweisung.

## Block

Ein _Block_ ist eine Gruppe aufeinanderfolgender Anweisungen, die sich auf derselben Ebene in der Programmstruktur befinden. Beispielsweise enthält der Block einer bedingten Anweisung jene Anweisungen, die nur ausgeführt werden, wenn die Bedingung wahr ist.

```python
if alter > 17:
    # Beginn des bedingten Blocks
    print("Du bist volljährig!")
    alter = alter + 1
    print("Du bist nun ein Jahr älter...")
    # Ende des bedingten Blocks

print("Dies hier gehört zu einem anderen Block")
```

In Python werden Blöcke ausgedrückt, indem der gesamte Code im Block um den gleichen Betrag an Leerzeichen eingerückt wird.

Hinweis: Der Hauptblock eines Python-Programms muss immer am linken Rand der Datei stehen, ohne Einrückung:

```python
# Dieses Programm wird nicht funktionieren, da es nicht am linken Rand der Datei geschrieben ist
  print("Hallo Welt")
  print("Dieses Programm ist nicht besonders gut...")
```

## Ausdruck (Expression)

Ein _Ausdruck_ ist ein Stück Code, das in einem bestimmten Datentyp resultiert. Wenn das Programm ausgeführt wird, wird der Ausdruck evaluiert, sodass er einen Wert erhält, der dann im Programm verwendet werden kann.

Hier sind einige Beispiele für Ausdrücke:

| Ausdruck | Wert | Typ | Python-Datentyp |
|----------|------|-----|-----------------|
|`2 + 4 + 3` | `9` | Ganzzahl | `int` |
|`"abc" + "de"` | `"abcde"` | Zeichenkette | `str`|
|`11 / 2` | `5.5` | Gleitkommazahl | `float` |
|`2 * 5 > 9` | `True` | Boolescher Wert | `bool`|

Da alle Ausdrücke einen Typ haben, können sie Variablen zugewiesen werden:

```python
# Der Variablen x wird der Wert des Ausdrucks 1 + 2 zugewiesen
x = 1 + 2
```

Einfache Ausdrücke können zu komplexeren Ausdrücken kombiniert werden, beispielsweise mit arithmetischen Operationen:

```python
# Der Variablen y wird der Wert des Ausdrucks '3 mal x plus x zum Quadrat' zugewiesen
y = 3 * x + x**2
```

## Funktion

Eine _Funktion_ führt eine bestimmte Funktionalität aus. Funktionen können auch ein oder mehrere _Argumente_ entgegennehmen. Dabei handelt es sich um Daten, die der Funktion übergeben und von ihr verarbeitet werden können. Argumente werden manchmal auch als _Parameter_ bezeichnet. Es gibt eine technische Unterscheidung zwischen einem Argument und einem Parameter, aber die Begriffe werden oft synonym verwendet. Für den Moment genügt es zu wissen, dass sich beide Begriffe auf die Idee beziehen, dass Daten an eine Funktion übergeben werden.

Eine Funktion wird ausgeführt, wenn sie _aufgerufen_ wird. Das heißt, wenn die Funktion (und ihre Argumente, falls vorhanden) im Code erwähnt wird. Die folgende Anweisung ruft die `print`-Funktion mit dem Argument `"Dies ist ein Argument"` auf:

```python
print("Dies ist ein Argument")
```

Eine weitere Funktion, die Sie bereits häufig verwendet haben, ist die `input`-Funktion, die den Benutzer um eine Eingabe bittet. Das Argument dieser Funktion ist die Nachricht, die dem Benutzer angezeigt wird:

```python
name = input("Bitte geben Sie Ihren Namen ein: ")
```

In diesem Fall _gibt die Funktion auch einen Wert zurück_. Nachdem die Funktion ausgeführt wurde, wird der Codeabschnitt, in dem sie aufgerufen wurde, durch den zurückgegebenen Wert ersetzt; es handelt sich um einen weiteren Ausdruck, der nun evaluiert wurde. Die Funktion `input` gibt einen String-Wert zurück, der die Eingabe des Benutzers enthält. Der Rückgabewert einer Funktion wird oft in einer Variablen gespeichert, damit er später im Programm verwendet werden kann.

## Datentyp

_Datentyp_ bezieht sich auf die Eigenschaften eines jeden Wertes im Programm. Im folgenden Codeabschnitt ist der Datentyp der Variablen `name` eine Zeichenkette (`str`) und der Datentyp der Variablen `resultat` eine Ganzzahl (`int`):

```python
name = "Anna"
resultat = 100
```

Sie können die Funktion `type` verwenden, um den Datentyp eines beliebigen Ausdrucks herauszufinden. Ein Beispiel für ihre Verwendung:

```python
print(type("Anna"))
print(type(100))
```

<sample-output>

<class 'str'>
<class 'int'>

</sample-output>

## Syntax

Ähnlich wie bei natürlichen Sprachen bestimmt die _Syntax_ einer Programmiersprache, wie der Code eines Programms geschrieben werden muss. Jede Programmiersprache hat ihre eigene spezifische Syntax.

Die Syntax von Python legt unter anderem fest, dass die erste Zeile einer `if`-Anweisung mit einem Doppelpunkt enden muss und der Block der Anweisung eingerückt sein sollte:

```python
if name == "Anna":
    print("Hallo!")
```

Wenn die syntaktischen Regeln der Programmiersprache nicht befolgt werden, tritt ein Fehler auf:

```python
if name == "Anna"
    print("Hallo!")
```

<sample-output>

<pre>
  File "test.py", line 1
    if name == "Anna"
                    ^
SyntaxError: invalid syntax
</pre>

</sample-output>

## Debugging

Wenn die Syntax des Programms korrekt ist, das Programm aber dennoch nicht wie beabsichtigt funktioniert, liegt ein _Bug_ (Fehler) im Programm vor.

Bugs äußern sich auf unterschiedliche Weise. Einige Bugs verursachen einen Fehler während der Ausführung. Beispielsweise verursacht das folgende Programm

```python
x = 10
y = 0
resultat = x / y

print(f"{x} geteilt durch {y} ist {resultat}")
```

diesen Fehler:

<sample-output>

<pre>
ZeroDivisionError: integer division or modulo by zero on line 3
</pre>

</sample-output>

Das Problem ist hier mathematischer Natur: Eine Division durch Null ist nicht zulässig, was die Ausführung des Programms stoppt.

Fehler während der Ausführung sind in der Regel recht einfach zu beheben, da die Fehlermeldung die Codezeile angibt, die den Fehler verursacht. Natürlich kann die eigentliche Ursache des Bugs an einer ganz anderen Stelle liegen als in der Zeile, die den Fehler auslöst.

Manchmal zeigt sich ein Bug im Programm dadurch, dass das Ergebnis, das der Code liefert, falsch ist. Das Entdecken und Lokalisieren dieser Art von Bugs kann eine Herausforderung sein. In den Programmierübungen dieses Kurses sollen die Tests in der Regel solche Bugs aufdecken. Bevor ein Bug behoben werden kann, muss zunächst seine Ursache lokalisiert werden.

Im Programmierjargon wird das Entdecken der Ursachen von Bugs als _Debugging_ bezeichnet. Es ist eine äußerst wichtige Fähigkeit im Werkzeugkasten eines jeden Programmierers. Professionelle Programmierer verbringen oft mehr Zeit mit dem Debugging als mit dem Schreiben von neuem Code.

Eine einfache, aber effektive Methode zum Debuggen eines Programms besteht darin, Debugging-Print-Anweisungen in Ihren Code einzufügen. Das Überprüfen der Ergebnisse Ihres Codes mit `print`-Befehlen gibt eine schnelle Bestätigung, ob der Code das tut, was Sie beabsichtigen.

Das Folgende ist ein Versuch, eine der Übungen aus dem [vorherigen Abschnitt](/part-1/5-conditional-statements) zu lösen:

```python
stundenlohn = float(input("Stundenlohn: "))
stunden = int(input("Geleistete Stunden: "))
wochentag = input("Wochentag: ")

tageslohn = stundenlohn * stunden
if wochentag == "sonntag":
    tageslohn * 2

print(f"Tageslohn: {tageslohn} Euro")
```

Das Programm funktioniert nicht ganz richtig. Das Ausführen der Tests ergibt Folgendes:

<sample-output>

<pre>
FAIL: PythonEditorTest: test_sunday_1

With input 20.0,6,Sunday correct wage 240.0 is not found in output Daily wages: 120.0 euros
</pre>

</sample-output>

Beim Debuggen der Übungen in diesem Kurs besteht der erste Schritt oft darin, zu prüfen, wie sich das Programm bei der im fehlgeschlagenen Test angegebenen Eingabe verhält. Tatsächlich entspricht das Ergebnis nicht den Erwartungen:

<sample-output>

Tageslohn: 120.0 Euro

</sample-output>

Debugging bedeutet in der Regel, das Programm mehrmals auszuführen. Es kann hilfreich sein, die problematische Eingabe vorübergehend "fest zu verdrahten" (Hard-Coding), anstatt den Benutzer jedes Mal um eine Eingabe zu bitten. In diesem Fall könnte das Hard-Coding so aussehen:

```python
# stundenlohn = float(input("Stundenlohn: "))
# stunden = int(input("Geleistete Stunden: "))
# wochentag = input("Wochentag: ")
stundenlohn = 20.0
stunden = 6
wochentag = "Sunday"

tageslohn = stundenlohn * stunden
if wochentag == "sonntag":
    tageslohn * 2

print(f"Tageslohn: {tageslohn} Euro")
```

Der nächste Schritt könnte das Hinzufügen von _Debugging-Print-Anweisungen_ sein. Der problematische Teil des Codes liegt in dem Abschnitt, der sich mit Sonntagen befasst. Fügen wir also `print`-Befehle vor und nach der Zeile ein, die den Tageslohn an Sonntagen verdoppeln soll:

```python
# ...

tageslohn = stundenlohn * stunden
if wochentag == "sonntag":
    print("Lohn vorher:", tageslohn)
    tageslohn * 2
    print("Lohn nach Verdopplung:", tageslohn)

print(f"Tageslohn: {tageslohn} Euro")
```

Das Ausführen des Codes zeigt nun gar nichts an – die Debugging-Print-Anweisungen werden überhaupt nicht ausgegeben. Es scheint, dass der Inhalt des `if`-Blocks nie ausgeführt wird, also muss ein Problem mit der bedingten Anweisung vorliegen. Versuchen wir, den Wert des Booleschen Ausdrucks auszugeben:

```python
# ...

tageslohn = stundenlohn * stunden
print("Bedingung:", wochentag == "sonntag")
if wochentag == "sonntag":
    print("Lohn vorher:", tageslohn)
    tageslohn * 2
    print("Lohn nach Verdopplung:", tageslohn)

print(f"Tageslohn: {tageslohn} Euro")
```

Tatsächlich ist der Wert `False`, sodass der Inhalt des if-Blocks nie ausgeführt wird:

<sample-output>

Bedingung: False
Tageslohn: 120.0 Euro

</sample-output>

Das Problem muss also in der Bedingung der `if`-Anweisung liegen. Wie in so vielen Situationen in der Programmierung spielt die Groß- und Kleinschreibung auch bei Vergleichen eine Rolle. Beachten Sie, dass "sonntag" im Booleschen Ausdruck kleingeschrieben wurde, in der Eingabe jedoch großgeschrieben war. Korrigieren wir dies (sowohl im `print`-Befehl als auch in der `if`-Anweisung):

```python
# ...

tageslohn = stundenlohn * stunden
print("Bedingung:", wochentag == "Sunday")
if wochentag == "Sunday":
    print("Lohn vorher:", tageslohn)
    tageslohn * 2
    print("Lohn nach Verdopplung:", tageslohn)

print(f"Tageslohn: {tageslohn} Euro")
```

Das Ausführen ergibt nun Folgendes:

<sample-output>

Bedingung: True
Lohn vorher: 120
Lohn nach Verdopplung: 120
Tageslohn: 120.0 Euro

</sample-output>

Es scheint, dass der in `tageslohn` gespeicherte Wert zunächst korrekt ist: `stundenlohn = 20.0` und `stunden = 6`, und 20.0 * 6 = 120.0. Der Befehl, der den Wert verdoppeln soll, tut dies jedoch nicht, also muss ein Problem mit dem Befehl vorliegen. Und tatsächlich verdoppelt der Befehl

```python
tageslohn * 2
```

den Wert zwar, speichert den neuen Wert aber nirgendwo. Ändern wir ihn so, dass er den neuen Wert auch speichert:

```python
tageslohn *= 2
```

Ein erneutes Ausführen des Programms zeigt, dass die Ausgabe am Ende nun ebenfalls korrekt ist:

<sample-output>

Bedingung: True
Lohn vorher: 120
Lohn nach Verdopplung: 240
Tageslohn: 240.0 Euro

</sample-output>

Wenn das Programm korrigiert wurde, denken Sie daran, alle Debugging-Print-Anweisungen und anderen Code, der zu Debugging-Zwecken hinzugefügt wurde, zu entfernen.

Dieses Beispiel war recht einfach, und in einem so kurzen Programm könnte man die Bugs wahrscheinlich allein durch sorgfältiges Lesen des Codes finden. Die Verwendung von Debugging-Print-Anweisungen ist jedoch oft ein schneller Weg, um ein Gefühl dafür zu bekommen, wo das Problem liegen könnte. Print-Anweisungen können verwendet werden, um herauszufinden, welche Teile des Programms korrekt zu funktionieren scheinen, sodass sich die Bemühungen zur Fehlersuche auf die Codeabschnitte konzentrieren können, die am ehesten als Verursacher infrage kommen.

Debugging-Print-Anweisungen sind nur ein Werkzeug zum Debuggen von Programmen. Wir werden später in diesem Kurs auf dieses Thema zurückkommen. Sie sollten es sich nun zur Gewohnheit machen, Debugging-Print-Anweisungen zu verwenden, um nach Fehlern in Ihrem Code zu suchen. Programmierprofis kommen ohne sie nicht aus, daher ist es auch für Anfänger ein sehr nützliches Werkzeug.

<in-browser-programming-exercise name="Syntax korrigieren" tmcname="part02-01_fix_syntax" height="400px">

Das folgende Programm enthält mehrere _Syntaxfehler_. Bitte korrigieren Sie das Programm so, dass die Syntax in Ordnung ist und das Programm wie in den folgenden Beispielen angegeben funktioniert.

```python
  zahl = input("Bitte geben Sie eine Zahl ein: ")
  if zahl>100
    print("Die Zahl war größer als einhundert")
    zahl - 100
    print("Nun hat sich ihr Wert um einhundert verringert)
     print("Ihr Wert ist nun"+ zahl)
 print(zahl + " muss meine Glückszahl sein!")
 print("Einen schönen Tag noch!)
```

<sample-output>

Bitte geben Sie eine Zahl ein: **13**
13 muss meine Glückszahl sein!
Einen schönen Tag noch!

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **101**
Die Zahl war größer als einhundert
Nun hat sich ihr Wert um einhundert verringert
Ihr Wert ist nun 1
1 muss meine Glückszahl sein!
Einen schönen Tag noch!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Anzahl der Zeichen" tmcname="part02-02_number_of_characters">

Die Funktion `len` kann unter anderem dazu verwendet werden, die Länge einer Zeichenkette herauszufinden. Die Funktion gibt die Anzahl der Zeichen in einer Zeichenkette zurück.

Einige Beispiele für die Funktionsweise:

```python
wort = "abcd"
print(len(wort))

print(len("Hallo zusammen"))

wort2 = "HalliGalli"
laenge = len(wort2)
print(laenge)

leerer_string = ""
laenge = len(leerer_string)
print(laenge)
```

<sample-output>

4
14
10
0

</sample-output>

Bitte schreiben Sie ein Programm, das den Benutzer nach einem Wort fragt und dann die Anzahl der Zeichen ausgibt, sofern mehr als ein Zeichen eingegeben wurde.

Beispiele für das erwartete Verhalten:

<sample-output>

Bitte geben Sie ein Wort ein: **hey**
Das Wort hey hat 3 Buchstaben
Vielen Dank!

</sample-output>

<sample-output>

Bitte geben Sie ein Wort ein: **Banane**
Das Wort Banane hat 6 Buchstaben
Vielen Dank!

</sample-output>

<sample-output>

Bitte geben Sie ein Wort ein: **b**
Vielen Dank!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Typumwandlung (Typecasting)" tmcname="part02-03_typecasting">

Beim Programmieren in Python müssen wir oft den Datentyp eines Wertes ändern. Beispielsweise kann eine Gleitkommazahl mit der Funktion `int` in eine Ganzzahl umgewandelt werden:

```python

temperatur = float(input("Bitte geben Sie eine Temperatur ein: "))

print("Die Temperatur ist", temperatur)

print("...und abgerundet ist sie", int(temperatur))

```

<sample-output>

Bitte geben Sie eine Temperatur ein: **5.15**
Die Temperatur ist 5.15
...und abgerundet ist sie 5

</sample-output>

Beachten Sie, dass die Funktion immer abrundet und nicht nach den mathematischen Rundungsregeln verfährt. Dies ist ein Beispiel für eine _Abrundungsfunktion_ (Floor-Funktion).

<sample-output>

Bitte geben Sie eine Temperatur ein: **8.99**
Die Temperatur ist 8.99
...und abgerundet ist sie 8

</sample-output>

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Gleitkommazahl fragt und dann den ganzzahligen Teil und den Dezimalteil separat ausgibt. Verwenden Sie die Python-Funktion `int`.

Sie können davon ausgehen, dass die vom Benutzer eingegebene Zahl immer größer als Null ist.

Ein Beispiel für das erwartete Verhalten:

<sample-output>

Bitte geben Sie eine Zahl ein: **1.34**
Ganzzahliger Teil: 1
Dezimalteil: 0.34

</sample-output>

</in-browser-programming-exercise>

<!--

-->
