---
path: "/part-1/5-conditional-statements"
title: "Bedingte Anweisungen"
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie in der Lage sein, eine einfache bedingte Anweisung in der Programmierung zu verwenden
- werden Sie wissen, was ein Boolean-Wert ist
- werden Sie in der Lage sein, Bedingungen mit Vergleichsoperatoren auszudrücken

</text-box>

Bisher wurde jedes Programm, das wir geschrieben haben, Zeile für Zeile in der richtigen Reihenfolge ausgeführt. Anstatt jede Codezeile bei jeder Ausführung eines Programms auszuführen, ist es oft nützlich, Abschnitte des Programms zu erstellen, die nur in bestimmten Situationen ausgeführt werden.

Der folgende Code prüft zum Beispiel, ob der Benutzer volljährig ist:

```python
age = int(input("Wie alt sind Sie? "))

if age > 17:
    print("Sie sind volljährig!")
    print("Hier ist eine Kopie von GTA6 für Sie.")

print("Der Nächste bitte!")
```

Wenn der Benutzer über 17 Jahre alt ist, sollte die Ausführung des Programms so aussehen:

<sample-output>

Wie alt sind Sie? **18**
Sie sind volljährig!
Hier ist eine Kopie von GTA6 für Sie.
Der Nächste bitte!

</sample-output>

Wenn der Benutzer 17 Jahre oder jünger ist, wird nur dies ausgegeben:

<sample-output>

Wie alt sind Sie? **16**
Der Nächste bitte!

</sample-output>

Diese Beispiele zeigen uns, dass der als Eingabe gegebene Wert beeinflusst, welche Teile des Programms ausgeführt werden. Das Programm enthält eine _bedingte Anweisung_ mit einem Codeblock, der nur ausgeführt wird, wenn die Bedingung in der Anweisung wahr (true) ist.

<img src="1_5_1.png">

In einer bedingten Anweisung folgt auf das Schlüsselwort `if` eine _Bedingung_, wie zum Beispiel ein Vergleich von zwei Werten. Der auf diese Kopfzeile folgende Codeblock wird nur ausgeführt, wenn die Bedingung wahr ist.

Beachten Sie das Doppelpunkt-Zeichen nach dem `if`-Header. Im folgenden Code fehlt der Doppelpunkt:

```python
age = 10

# kein Doppelpunkt am Ende der folgenden Zeile
if age > 17
    print("Sie sind volljährig.")
```

Bei der Ausführung verursacht dies einen Fehler:

<sample-output>
<pre>
File "program.py", line 3
  if age > 17
            ^
SyntaxError: invalid syntax
</pre>
</sample-output>

## Vergleichsoperatoren

Typischerweise bestehen Bedingungen aus dem Vergleich von zwei Werten. Hier ist eine Tabelle mit den gängigsten Vergleichsoperatoren, die in Python verwendet werden:

| Operator | Zweck          | Beispiel  |
|:--------:|----------------|----------|
| `==`     | Gleich         | `a == b` |
| `!=`     | Ungleich       | `a != b` |
| `>`      | Größer als     | `a > b`  |
| `>=`     | Größer oder gleich | `a >= b` |
| `<`      | Kleiner als    | `a < b`  |
| `<=`     | Kleiner oder gleich | `a <= b` |

Schauen wir uns ein Programm an, das verschiedene Dinge ausgibt, je nachdem, ob die vom Benutzer eingegebene Zahl negativ, positiv oder gleich Null ist:

```python
number = int(input("Bitte geben Sie eine Zahl ein: "))

if number < 0:
    print("Die Zahl ist negativ.")

if number > 0:
    print("Die Zahl ist positiv.")

if number == 0:
    print("Die Zahl ist Null.")
```

Beispiele für die Funktionsweise des Programms mit drei verschiedenen Eingaben:

<sample-output>

Bitte geben Sie eine Zahl ein: **15**
Die Zahl ist positiv.

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **-18**
Die Zahl ist negativ.

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **0**
Die Zahl ist Null.

</sample-output>

## Einrückung

Python erkennt, dass ein Codeblock Teil einer bedingten Anweisung ist, wenn jede Codezeile im Block gleich _eingerückt_ ist. Das heißt, am Anfang jeder Codeze innerhalb des Codeblocks sollte ein Stück Leerzeichen stehen. Jede Zeile sollte die gleiche Menge an Leerzeichen haben.

Zum Beispiel:

````python
password = input("Bitte geben Sie ein Passwort ein: ")

if password == "kittycat":
    print("Sie kannten das Passwort!")
    print("Sie müssen entweder der vorgesehene Benutzer sein...")
    print("...oder ein ziemlich versierter Hacker.")

print("Das Programm hat seine Ausführung beendet. Danke und tschüss!")
````

Sie können die Tab-Taste verwenden, um eine festgelegte Menge an Leerzeichen einzufügen.

<img src="1_5_keyboard.png">

Viele Texteditoren rücken die folgende Zeile automatisch ein, wenn die Eingabetaste nach einem Doppelpunkt gedrückt wird. Wenn Sie einen eingerückten Codeblock beenden möchten, können Sie die `Backspace`-Taste verwenden, um zum Anfang der Zeile zurückzukehren.

<img src="1_5_keyboard2.png">
<small><center>
Die Quelle der Tastaturbilder:
 <a href="https://pixabay.com/users/Clker-Free-Vector-Images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Clker-Free-Vector-Images</a> von <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Pixabay</a>
</center></small>

<in-browser-programming-exercise name="Orwell" tmcname="part01-21_orwell">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Ganzzahl fragt. Das Programm sollte "Orwell" ausgeben, wenn die Zahl exakt 1984 ist, und ansonsten nichts tun.

<sample-output>

Bitte geben Sie eine Zahl ein: **2020**

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **1984**
Orwell

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Absolutwert" tmcname="part01-22_absolute_value">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Ganzzahl fragt. Wenn die Zahl kleiner als Null ist, sollte das Programm die Zahl multipliziert mit -1 ausgeben. Andernfalls gibt das Programm die Zahl so aus, wie sie ist. Bitte schauen Sie sich die Beispiele für das erwartete Verhalten unten an.

<sample-output>

Bitte geben Sie eine Zahl ein: **-7**
Der Absolutwert dieser Zahl ist 7

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **1**
Der Absolutwert dieser Zahl ist 1

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **-99**
Der Absolutwert dieser Zahl ist 99

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Suppe oder keine Suppe" tmcname="part01-23_soup_or_no_soup">

Bitte schreiben Sie ein Programm, das nach dem Namen des Benutzers fragt. Wenn der Name nicht "Jerry" ist, fragt das Programm nach der Anzahl der Portionen und gibt die Gesamtkosten aus. Der Preis für eine einzelne Portion beträgt 5.90.

Zwei Beispiele für die Ausführung des Programms:

<sample-output>

Bitte nennen Sie mir Ihren Namen: **Kramer**
Wie viele Portionen Suppe? **2**
Die Gesamtkosten betragen 11.8
Der Nächste bitte!

</sample-output>

<sample-output>

Bitte nennen Sie mir Ihren Namen: **Jerry**
Der Nächste bitte!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Größenordnung" tmcname="part01-24_order_of_magnitude">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Ganzzahl fragt. Das Programm sollte dann die Größenordnung der Zahl gemäß den folgenden Beispielen ausgeben.

<sample-output>

Bitte geben Sie eine Zahl ein: **950**
Diese Zahl ist kleiner als 1000
Vielen Dank!

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **59**
Diese Zahl ist kleiner als 1000
Diese Zahl ist kleiner als 100
Vielen Dank!

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **2**
Diese Zahl ist kleiner als 1000
Diese Zahl ist kleiner als 100
Diese Zahl ist kleiner als 10
Vielen Dank!

</sample-output>

<sample-output>

Bitte geben Sie eine Zahl ein: **1123**
Vielen Dank!

</sample-output>

</in-browser-programming-exercise>

## Boolean-Werte und Boolean-Ausdrücke

Jede Bedingung, die in einer bedingten Anweisung verwendet wird, führt zu einem Wahrheitswert, d. h. entweder wahr (true) oder falsch (false). Zum Beispiel ist die Bedingung `a < 5` wahr, wenn `a` kleiner als 5 ist, und falsch, wenn `a` gleich oder größer als 5 ist.

Diese Arten von Werten werden oft _Boolean_-Werte genannt, benannt nach dem englischen Mathematiker George Boole. In Python werden sie durch den Datentyp `bool` verarbeitet. Variablen vom Typ `bool` können nur zwei Werte haben: `True` oder `False`.

Jedes Stück Code, das zu einem Boolean-Wert führt, wird als _Boolean-Ausdruck_ bezeichnet. Zum Beispiel ist die Bedingung in einer bedingten Anweisung immer ein Boolean-Ausdruck, und die Begriffe _Bedingung_ und _Boolean-Ausdruck_ können oft synonym verwendet werden.

Das Ergebnis eines Boolean-Ausdrucks kann in einer Variable gespeichert werden, genau wie das Ergebnis einer numerischen Berechnung:

```python
a = 3
condition = a < 5
print(condition)
if condition:
    print("a ist kleiner als 5")
```

<sample-output>

True
a ist kleiner als 5

</sample-output>

Die Python-Schlüsselwörter `True` und `False` können auch direkt verwendet werden. Im folgenden Beispiel wird der `print`-Befehl jedes Mal ausgeführt, weil der Wert der Bedingung `True` ist:

```python
condition = True
if condition:
    print("Dies wird jedes Mal ausgegeben.")
```

<sample-output>

Dies wird jedes Mal ausgegeben.

</sample-output>

Ein Programm wie dieses ist nicht sehr nützlich, aber später im Kurs werden Sie Beispiele sehen, in denen Boolean-Variablen sehr praktisch sind.

<in-browser-programming-exercise name="Taschenrechner" tmcname="part01-25_calculator">

Bitte schreiben Sie ein Programm, das den Benutzer nach zwei Zahlen und einer Operation fragt. Wenn die Operation _add_ (addieren), _multiply_ (multiplizieren) oder _subtract_ (subtrahieren) ist, sollte das Programm das Ergebnis der Operation mit den gegebenen Zahlen berechnen und ausgeben. Wenn der Benutzer etwas anderes eingibt, sollte das Programm nichts ausgeben.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Zahl 1: **10**
Zahl 2: **17**
Operation: **add**

10 + 17 = 27

</sample-output>

<sample-output>

Zahl 1: **4**
Zahl 2: **6**
Operation: **multiply**

4 * 6 = 24

</sample-output>

<sample-output>

Zahl 1: **4**
Zahl 2: **6**
Operation: **subtract**

4 - 6 = -2

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Temperaturen" tmcname="part01-26_temperatures">

Bitte schreiben Sie ein Programm, das den Benutzer nach einer Temperatur in Grad Fahrenheit fragt und dann dieselbe in Grad Celsius ausgibt. Wenn die umgerechnete Temperatur unter Null Grad Celsius fällt, sollte das Programm außerdem "Brrr! Hier ist es kalt!" ausgeben.

Die Formel für die Umrechnung von Grad Fahrenheit in Grad Celsius lässt sich leicht mit einer Suchmaschine Ihrer Wahl finden.

Zwei Beispiele für das erwartete Verhalten:

<sample-output>

Bitte geben Sie eine Temperatur (F) ein: **101**
101 Grad Fahrenheit entsprechen 38.333333333333336 Grad Celsius

Bitte geben Sie eine Temperatur (F) ein: **21**
21 Grad Fahrenheit entsprechen -6.111111111111111 Grad Celsius
Brrr! Hier ist es kalt!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Tageslohn" tmcname="part01-27_daily_wages">

Bitte schreiben Sie ein Programm, das nach dem Stundenlohn, den geleisteten Arbeitsstunden und dem Wochentag fragt. Das Programm sollte dann den Tageslohn ausgeben, der dem Stundenlohn multipliziert mit den geleisteten Arbeitsstunden entspricht, außer an Sonntagen, an denen der Stundenlohn verdoppelt wird.

<sample-output>

Stundenlohn: **8.5**
Geleistete Arbeitsstunden: **3**
Wochentag: **Montag**
Tageslohn: 25.5 Euro

</sample-output>

<sample-output>

Stundenlohn: **12.5**
Geleistete Arbeitsstunden: **10**
Wochentag: **Sonntag**
Tageslohn: 250.0 Euro

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Treuebonus" tmcname="part01-28_loyalty_bonus">

Dieses Programm berechnet den Jahresendbonus, den ein Kunde auf seine Treuekarte erhält. Der Bonus wird mit der folgenden Formel berechnet:

* Wenn weniger als hundert Punkte auf der Karte sind, beträgt der Bonus 10 %
* In jedem anderen Fall beträgt der Bonus 15 %

Das Programm sollte so funktionieren:

<sample-output>

Wie viele Punkte sind auf Ihrer Karte? **55**
Ihr Bonus beträgt 10 %
Sie haben jetzt 60.5 Punkte

</sample-output>

Aber es gibt ein Problem mit dem Programm, so dass es bei einigen Eingaben nicht ganz richtig funktioniert:

<sample-output>

Wie viele Punkte sind auf Ihrer Karte? **95**
Ihr Bonus beträgt 10 %
Ihr Bonus beträgt 15 %
Sie haben jetzt 120.175 Punkte

</sample-output>

Bitte korrigieren Sie das Programm so, dass es immer entweder einen Bonus von 10 % oder 15 % gibt, aber niemals beides.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Was morgen anziehen" tmcname="part01-29_what_to_wear_tomorrow">

Bitte schreiben Sie ein Programm, das nach der Wettervorhersage für morgen fragt und dann wetterangemessene Kleidung vorschlägt.

Der Vorschlag sollte sich ändern, wenn die Temperatur (gemessen in Grad Celsius) über 20, 10 oder 5 Grad liegt und auch wenn Regen auf dem Radar ist.

Einige Beispiele für das erwartete Verhalten:

<sample-output>

Wie ist die Wettervorhersage für morgen?
Temperatur: **21**
Wird es regnen (ja/nein): **nein**
Tragen Sie Jeans und ein T-Shirt

</sample-output>

<sample-output>

Wie ist die Wettervorhersage für morgen?
Temperatur: **11**
Wird es regnen (ja/nein): **nein**
Tragen Sie Jeans und ein T-Shirt
Ich empfehle zusätzlich einen Pullover

</sample-output>

<sample-output>

Wie ist die Wettervorhersage für morgen?
Temperatur: **7**
Wird es regnen (ja/nein): **nein**
Tragen Sie Jeans und ein T-Shirt
Ich empfehle zusätzlich einen Pullover
Nehmen Sie eine Jacke mit

</sample-output>

<sample-output>

Wie ist die Wettervorhersage für morgen?
Temperatur: **3**
Wird es regnen (ja/nein): **ja**
Tragen Sie Jeans und ein T-Shirt
Ich empfehle zusätzlich einen Pullover
Nehmen Sie eine Jacke mit
Machen Sie daraus am besten einen warmen Mantel
Ich denke, Handschuhe sind angebracht
Vergessen Sie Ihren Regenschirm nicht!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Lösen einer quadratischen Gleichung" tmcname="part01-30_quadratic_formula">

Im Python-Modul `math` gibt es die Funktion `sqrt`, die die Quadratwurzel einer Zahl berechnet. Sie können sie wie folgt verwenden:

```python
from math import sqrt

print(sqrt(9))
```

Dies sollte ausgeben:

<sample-output>

3.0

</sample-output>

Wir werden später auf das Konzept eines _Moduls_ und die `import`-Anweisung zurückkommen. Für den Moment reicht es zu verstehen, dass die Zeile `from math import sqrt` uns erlaubt, die `sqrt`-Funktion in unserem Programm zu verwenden.

Bitte schreiben Sie ein Programm zur Lösung einer quadratischen Gleichung der Form ax²+bx+c. Das Programm fragt nach den Werten a, b und c. Es sollte dann die Mitternachtsformel verwenden, um die Gleichung zu lösen. Die Mitternachtsformel, ausgedrückt mit der Python-Funktion `sqrt`, lautet wie folgt:

x = (-b ± sqrt(b²-4ac))/(2a).

Sie können davon ausgehen, dass die Gleichung immer zwei reelle Wurzeln hat, so dass die obige Formel immer funktioniert.

Ein Beispiel für das erwartete Verhalten:

<sample-output>

Wert von a: **1**
Wert von b: **2**
Wert von c: **-8**

Die Wurzeln sind 2.0 und -4.0

</sample-output>

</in-browser-programming-exercise>
