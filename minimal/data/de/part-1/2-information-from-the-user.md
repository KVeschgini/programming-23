---
path: '/part-1/2-information-from-the-user'
title: 'Informationen vom Benutzer'
hidden: false
---

<text-box variant='learningObjectives' name='Lernziele'>

Nach diesem Abschnitt

- werden Sie wissen, wie man ein Programm schreibt, das Eingaben vom Benutzer verwendet
- werden Sie wissen, wie man Variablen verwendet, um Eingaben zu speichern und auszugeben
- werden Sie in der Lage sein, Strings zu kombinieren

</text-box>

_Eingabe_ (Input) bezieht sich auf alle Informationen, die ein Benutzer dem Programm gibt. Konkret liest der Python-Befehl `input` eine Zeile der vom Benutzer eingegebenen Eingabe ein. Er kann auch verwendet werden, um dem Benutzer eine Nachricht anzuzeigen, um eine bestimmte Eingabe anzufordern.

Das folgende Programm liest mit dem Befehl `input` den Namen des Benutzers ein. Anschließend gibt es ihn mit dem Befehl `print` wieder aus:

```python
name = input("Wie ist Ihr Name? ")
print("Hallo, " + name)
```

Die Ausführung dieses Programms könnte so aussehen (Eingabe des Benutzers in Fettdruck):

<sample-output>

Wie ist Ihr Name? **Paul Python**
Hallo, Paul Python

</sample-output>

Was dieses Programm ausgibt, hängt teilweise von der Eingabe des Benutzers ab. Das bedeutet, dass die Ausführung des Programms auch so aussehen könnte:

<sample-output>

Wie ist Ihr Name? **Paula Programmiererin**
Hallo, Paula Programmiererin

</sample-output>

Das Wort `name` in diesem Programm ist eine _Variable_. Im Kontext der Programmierung ist eine Variable ein Ort zum Speichern eines _Wertes_, wie zum Beispiel eines Strings oder einer Zahl. Dieser Wert kann später verwendet und auch geändert werden.

<text-box variant="hint" name="Benennung von Variablen">

Im Prinzip können Variablen innerhalb bestimmter, in der Sprache Python festgelegter Grenzen recht frei benannt werden.

Es ist eine gängige internationale Programmierpraxis, Variablen auf Englisch zu benennen, aber Sie können auch auf Code stoßen, bei dem Variablen in anderen Sprachen benannt sind, zum Beispiel in der Muttersprache des Programmierers. Der Name der Variable hat keinen direkten Einfluss auf ihren Inhalt, daher spielt der Name in diesem Sinne keine Rolle. Es kann jedoch oft hilfreich sein, die Funktionsweise von Code zu verstehen, wenn Variablen logisch und auf Englisch benannt sind.

</text-box>

<in-browser-programming-exercise name="Name zweimal" tmcname="part01-06_name_twice">

Bitte schreiben Sie ein Programm, das nach dem Namen des Benutzers fragt und ihn dann zweimal in zwei aufeinanderfolgenden Zeilen ausgibt.

Ein Beispiel dafür, wie das Programm funktionieren sollte:

<sample-output>

Wie ist Ihr Name? **Paul**
Paul
Paul

</sample-output>

</in-browser-programming-exercise>

## Referenzieren einer Variable

Auf eine einzelne Variable kann in einem Programm oft verwiesen werden:

```python
name = input("Wie ist Ihr Name? ")

print("Hallo, " + name + "!")
print(name + " ist ein ziemlich schöner Name.")
```

Wenn der Benutzer den Namen `Paul Python` angibt, gibt dieses Programm Folgendes aus:

<sample-output>

Wie ist Ihr Name? **Paul Python**
Hallo, Paul Python!
Paul Python ist ein ziemlich schöner Name.

</sample-output>

Schauen wir uns die Art und Weise, wie der `print`-Befehl oben verwendet wird, genauer an. Innerhalb der Klammern des Befehls befinden sich sowohl Text in Anführungszeichen als auch Variablennamen, die sich auf die Eingabe des Benutzers beziehen. Diese wurden mit einem `+`-Operator kombiniert, der zwei Strings zu einem einzigen String _verknüpft_ (konkateniert).

Strings und Variablen können recht frei kombiniert werden:

```python
name = input("Wie ist Ihr Name? ")

print("Hallo " + name + "! Lassen Sie mich sichergehen: Ihr Name ist " + name + "?")
```

Wenn der Benutzer den Namen `Ellen Example` angibt, wird Folgendes ausgegeben:

<sample-output>

Wie ist Ihr Name? **Ellen Example**
Hallo Ellen Example! Lassen Sie mich sichergehen: Ihr Name ist Ellen Example?

</sample-output>

<in-browser-programming-exercise name="Name und Ausrufezeichen" tmcname="part01-07_name_and_exclamation_marks">

Bitte schreiben Sie ein Programm, das nach dem Namen des Benutzers fragt und ihn dann zweimal in einer einzigen Zeile ausgibt, so dass am Anfang der Zeile ein Ausrufezeichen steht, ein weiteres zwischen den beiden Namen und ein drittes am Ende der Zeile.

Das Programm sollte wie folgt funktionieren:

<sample-output>

Wie ist Ihr Name? **Paul**
!Paul!Paul!

</sample-output>

</in-browser-programming-exercise>

## Mehr als eine Eingabe

Ein Programm kann nach mehr als einer Eingabe fragen. Beachten Sie, wie unten jeder `input`-Befehl den empfangenen Wert in einer anderen Variable speichert.

```python
name = input("Wie ist Ihr Name? ")
email = input("Wie ist Ihre E-Mail-Adresse? ")
nickname = input("Wie ist Ihr Spitzname? ")

print("Lassen Sie uns sicherstellen, dass wir das richtig verstanden haben")
print("Ihr Name: " + name)
print("Ihre E-Mail-Adresse: " + email)
print("Ihr Spitzname: " + nickname)
```

Das Programm könnte zum Beispiel Folgendes ausgeben:

<sample-output>

Wie ist Ihr Name? **Frances Fictitious**
Wie ist Ihre E-Mail-Adresse? **frances99@example.com**
Wie ist Ihr Spitzname? **Fran**
Lassen Sie uns sicherstellen, dass wir das richtig verstanden haben
Ihr Name: Frances Fictitious
Ihre E-Mail-Adresse: frances99@example.com
Ihr Spitzname: Fran

</sample-output>

Wenn dieselbe Variable verwendet wird, um mehr als eine Eingabe zu speichern, ersetzt jeder neue Wert den vorherigen. Zum Beispiel:

```python
address = input("Wie ist Ihre Adresse? ")
print("Sie wohnen also unter der Adresse " + address)

address = input("Bitte geben Sie eine neue Adresse ein: ")
print("Ihre Adresse ist jetzt " + address)
```

Eine beispielhafte Ausführung des Programms:

<sample-output>

Wie ist Ihre Adresse? **Python Path 101, Flat 3D**
Sie wohnen also unter der Adresse Python Path 101, Flat 3D
Bitte geben Sie eine neue Adresse ein: **New Road 999**
Ihre Adresse ist jetzt New Road 999

</sample-output>

Das bedeutet, dass es keine Möglichkeit gibt, auf den ersten Eingabewert zuzugreifen, nachdem er durch den zweiten ersetzt wurde, wenn dieselbe Variable verwendet wird, um zwei Eingaben nacheinander zu speichern:

```python
address = input("Wie ist Ihre Adresse? ")
address = input("Bitte geben Sie eine neue Adresse ein: ")

print("Ihre Adresse ist jetzt " + address)
```

Ein Beispiel dafür, wie die Ausgabe des Programms aussehen könnte:

<sample-output>

Wie ist Ihre Adresse? **Python Path 10**
Bitte geben Sie eine neue Adresse ein: **Programmer's Walk 23**
Ihre Adresse ist jetzt Programmer's Walk 23

</sample-output>

<in-browser-programming-exercise name="Name und Adresse" tmcname="part01-08_name_and_address">

Bitte schreiben Sie ein Programm, das nach dem Namen und der Adresse des Benutzers fragt. Das Programm sollte die angegebenen Informationen wie folgt ausgeben:

<sample-output>

Vorname: **Steve**
Nachname: **Sanders**
Straße: **91 Station Road**
Stadt und Postleitzahl: **London EC05 6AW**
Steve Sanders
91 Station Road
London EC05 6AW

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Code korrigieren: Äußerungen" tmcname="part01-09_utterances">

Hier ist ein Programm, das nach drei Äußerungen fragen und diese ausgeben soll, etwa so:

<sample-output>

Der 1. Teil: **hickory**
Der 2. Teil: **dickory**
Der 3. Teil: **dock**
hickory-dickory-dock!

</sample-output>

Es stimmt jedoch etwas nicht mit dem unten stehenden Code. Bitte korrigieren Sie ihn.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Geschichte" tmcname="part01-10_story">

Bitte schreiben Sie ein Programm, das die folgende Geschichte ausgibt. Der Benutzer gibt einen Namen und eine Jahreszahl an, die in den Ausdruck eingefügt werden sollen.

<sample-output>

Bitte geben Sie einen Namen ein: **Mary**
Bitte geben Sie ein Jahr ein: **1572**

Mary ist eine tapfere Ritterin, geboren im Jahr 1572. Eines Morgens wachte Mary durch einen schrecklichen Lärm auf: Ein Drache näherte sich dem Dorf. Nur Mary konnte die Bewohner des Dorfes retten.

</sample-output>

Die Geschichte sollte sich entsprechend der vom Benutzer gemachten Eingaben ändern.

</in-browser-programming-exercise>
