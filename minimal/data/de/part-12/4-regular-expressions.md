---
path: '/part-12/4-regular-expressions'
title: 'Reguläre Ausdrücke'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was reguläre Ausdrücke sind
- werden Sie in der Lage sein, reguläre Ausdrücke in Ihren eigenen Programmen zu verwenden

</text-box>

Wir haben bereits festgestellt, dass Python eine hervorragende Umgebung für die Textverarbeitung ist. Ein weiteres mächtiges Werkzeug für die Textverarbeitung sind _reguläre Ausdrücke_, oft als _Regex_ oder _Regexp_ abgekürzt. Sie sind eine Möglichkeit, Zeichenketten auszuwählen und nach ihnen zu suchen, die einem bestimmten Muster folgen. Dieser Abschnitt führt Sie in die Grundlagen der regulären Ausdrücke ein, aber Sie finden online viel mehr Informationen, unter anderem im Python-[Tutorial](https://docs.python.org/3/howto/regex.html).

## Was sind reguläre Ausdrücke?

Reguläre Ausdrücke sind nicht nur ein Python-Feature. Sie stellen in gewisser Weise eine Programmiersprache innerhalb einer Programmiersprache dar. Sie sind bis zu einem gewissen Grad über viele verschiedene Programmiersprachen hinweg kompatibel. Reguläre Ausdrücke haben ihre eigene spezifische Syntax. Die Idee ist, eine Sammlung von Zeichenketten zu definieren, die bestimmten Regeln folgen.

Beginnen wir mit einem einfachen Beispiel, bevor wir tiefer in die Syntax eintauchen:

```python
import re

words = ["Python", "Pantone", "Pontoon", "Pollute", "Pantheon"]

for word in words:
    # Die Zeichenkette sollte mit "P" beginnen und mit "on" enden
    if re.search("^P.*on$", word):
        print(word, "gefunden!")
```

<sample-output>

Python gefunden!
Pontoon gefunden!
Pantheon gefunden!

</sample-output>

Wir müssen das Modul `re` importieren, um reguläre Ausdrücke in Python verwenden zu können. Das Modul `re` enthält viele Funktionen für die Arbeit mit regulären Ausdrücken. Im obigen Beispiel nimmt die Funktion `search` zwei Zeichenketten-Argumente entgegen: die Muster-Zeichenkette (Pattern) und die Ziel-Zeichenkette, in der nach dem Muster gesucht wird.

Dieses zweite Beispiel sucht nach beliebigen Zahlen in einer Zeichenkette. Die Funktion `findall` gibt eine Liste aller Instanzen zurück, die dem Muster entsprechen:

```python
import re

sentence = "Erstens, 2 !#drittens 44 fünf 678xyz962"

numbers = re.findall("\d+", sentence)

for number in numbers:
    print(number)
```

<sample-output>

2
44
678
962

</sample-output>

## Die Syntax regulärer Ausdrücke

Machen wir uns mit der grundlegenden Syntax regulärer Ausdrücke vertraut. Die meisten der folgenden Beispiele nutzen dieses Testprogramm:

```python
import re

expression = input("Bitte geben Sie einen Ausdruck ein: ")

while True:
    input_string = input("Bitte geben Sie eine Zeichenkette ein: ")
    if input_string == "":
        break
    if re.search(expression, input_string):
        print("Gefunden!")
    else:
        print("Nicht gefunden.")
```

### Alternative Teilzeichenketten

Der vertikale Strich `|`, auch Pipe-Zeichen genannt, ermöglicht es Ihnen, alternative Teilzeichenketten abzugleichen. Seine Bedeutung ist also _oder_. Beispielsweise entspricht der Ausdruck `911|112` Zeichenketten, die entweder die Teilzeichenkette `911` oder die Teilzeichenkette `112` enthalten.

Ein Beispiel mit dem Testprogramm:

<sample-output>

Bitte geben Sie einen Ausdruck ein: **aa|ee|ii**
Bitte geben Sie eine Zeichenkette ein: **aardvark**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **feelings**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **radii**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **smooch**
Nicht gefunden.
Bitte geben Sie eine Zeichenkette ein: **continuum**
Nicht gefunden.

</sample-output>


### Gruppen von Zeichen

Eckige Klammern werden verwendet, um Gruppen von akzeptierten Zeichen zu kennzeichnen. Beispielsweise würde der Ausdruck `[aeio]` allen Zeichenketten entsprechen, die eines der Zeichen a, e, i oder o enthalten.

Ein Bindestrich ist ebenfalls erlaubt, um Bereiche von Zeichen abzugleichen. Beispielsweise würde der Ausdruck `[0-68a-d]` allen Zeichenketten entsprechen, die eine Ziffer zwischen 0 und 6, eine Acht oder ein Zeichen zwischen a und d enthalten. In dieser Notation sind alle Bereiche _inklusiv_.

Die Kombination von zwei Klammerpaaren ermöglicht es Ihnen, zwei aufeinanderfolgende Zeichen abzugleichen. Beispielsweise würde der Ausdruck `[1-3][0-9]` jeder zweistelligen Zahl zwischen 10 und 39 (einschließlich) entsprechen.

Ein Beispiel mit dem Testprogramm:

<sample-output>

Bitte geben Sie einen Ausdruck ein: **[C-FRSO]**
Bitte geben Sie eine Zeichenkette ein: **C**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **E**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **G**
Nicht gefunden.
Bitte geben Sie eine Zeichenkette ein: **R**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **O**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **T**
Nicht gefunden.

</sample-output>

### Wiederholte Übereinstimmungen

Jeder Teil eines Ausdrucks kann mit den folgenden Operatoren wiederholt werden:

* `*` wiederholt beliebig oft, einschließlich Null
* `+` wiederholt beliebig oft, aber mindestens einmal
* `{m}` wiederholt genau `m` Mal

Diese Operatoren wirken auf den Teil des Ausdrucks, der dem Operator unmittelbar vorangeht. Beispielsweise würde der Ausdruck `ba+b` unter anderem den Teilzeichenketten `bab`, `baab` und `baaaaaaaaaaab` entsprechen. Der Ausdruck `A[BCDE]*Z` würde unter anderem den Teilzeichenketten `AZ`, `ADZ` oder `ABCDEBCDEBCDEZ` entsprechen.

Ein Beispiel mit dem Testprogramm:

<sample-output>

Bitte geben Sie einen Ausdruck ein: **1[234]\*5**
Bitte geben Sie eine Zeichenkette ein: **15**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **125**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **145**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **12342345**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **126**
Nicht gefunden.
Bitte geben Sie eine Zeichenkette ein: **165**
Nicht gefunden.

</sample-output>


### Andere Sonderzeichen

Ein Punkt ist ein Platzhalterzeichen (Wildcard), das jedem einzelnen Zeichen entsprechen kann. Beispielsweise würde der Ausdruck `c...o` jeder fünf Zeichen langen Teilzeichenkette entsprechen, die mit einem `c` beginnt und mit einem `o` endet, wie z. B. `c-3po` oder `cello`.

Das Zeichen `^` gibt an, dass die Übereinstimmung am Anfang der Zeichenkette liegen muss, und `$` gibt an, dass die Übereinstimmung am Ende der Zeichenkette liegen muss. Diese können auch verwendet werden, um alle anderen als die angegebenen Zeichen von den Übereinstimmungen auszuschließen:

<sample-output>

Bitte geben Sie einen Ausdruck ein: **\^[123]\*$**
Bitte geben Sie eine Zeichenkette ein: **4**
Nicht gefunden.
Bitte geben Sie eine Zeichenkette ein: **1221**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **333333333**
Gefunden!

</sample-output>

Manchmal müssen Sie die Sonderzeichen abgleichen, die für die Syntax regulärer Ausdrücke reserviert sind. Der Backslash `\` kann verwendet werden, um Sonderzeichen zu _maskieren_ (Escaping). So entspricht der Ausdruck `1+` einer oder mehreren Zahlen `1`, aber der Ausdruck `1\+` entspricht der Zeichenkette `1+`.

<sample-output>

Bitte geben Sie einen Ausdruck ein: **^\\\***
Bitte geben Sie eine Zeichenkette ein: **hallo\***
Nicht gefunden.
Bitte geben Sie eine Zeichenkette ein: **h\*a\*l\*l\*o**
Nicht gefunden.
Bitte geben Sie eine Zeichenkette ein: **\*hallo**
Gefunden!

</sample-output>

Runde Klammern können verwendet werden, um verschiedene Teile des Ausdrucks zu gruppieren. Beispielsweise würde der Ausdruck `(ab)+c` den Teilzeichenketten `abc`, `ababc` und `ababababababc` entsprechen, aber nicht den Zeichenketten `ac` oder `bc`, da die gesamte Teilzeichenkette `ab` mindestens einmal erscheinen müsste.

<sample-output>

Bitte geben Sie einen Ausdruck ein: **^(jabba).\*(hut)$**
Bitte geben Sie eine Zeichenkette ein: **jabba the hut**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **jabba a hut**
Gefunden!
Bitte geben Sie eine Zeichenkette ein: **jarjar the hut**
Nicht gefunden.
Bitte geben Sie eine Zeichenkette ein: **jabba the smut**
Nicht gefunden.

</sample-output>

<programming-exercise name='Reguläre Ausdrücke' tmcname='part12-14_regular_expressions'>

Hier sind einige Übungen, um sich mit der Syntax regulärer Ausdrücke vertraut zu machen.

## Wochentage

Bitte schreiben Sie unter Verwendung eines regulären Ausdrucks eine Funktion namens `is_dotw(my_string: str)`. Die Funktion soll `True` zurückgeben, wenn die als Argument übergebene Zeichenkette eine Abkürzung für einen Wochentag enthält (Mon, Tue, Wed, Thu, Fri, Sat, Sun).

Einige Beispiele für die Funktionsweise der Funktion:

```python
print(is_dotw("Mon"))
print(is_dotw("Fri"))
print(is_dotw("Tui"))
```

<sample-output>

True
True
False

</sample-output>

## Auf Vokale prüfen

Bitte schreiben Sie eine Funktion namens `all_vowels(my_string: str)`, die einen regulären Ausdruck verwendet, um zu prüfen, ob alle Zeichen in der gegebenen Zeichenkette Vokale sind.

Einige Beispiele für die Funktionsweise der Funktion:

```python
print(all_vowels("eioueioieoieou"))
print(all_vowels("autoooo"))
```

<sample-output>

True
False

</sample-output>

## Uhrzeit

Bitte schreiben Sie eine Funktion namens `time_of_day(my_string: str)`, die einen regulären Ausdruck verwendet, um zu prüfen, ob eine Zeichenkette im Format `XX:YY:ZZ` eine gültige Uhrzeit im 24-Stunden-Format ist, mit jeweils zwei Ziffern für Stunden, Minuten und Sekunden.

Einige Beispiele für die Funktionsweise der Funktion:

```python
print(time_of_day("12:43:01"))
print(time_of_day("AB:01:CD"))
print(time_of_day("17:59:59"))
print(time_of_day("33:66:77"))
```

<sample-output>

True
False
True
False

</sample-output>

</programming-exercise>

## Finale

Zum Abschluss dieses Teils des Materials arbeiten wir noch etwas mehr mit Objekten und Klassen, indem wir ein etwas umfangreicheres Programm erstellen. Diese Übung beinhaltet nicht notwendigerweise reguläre Ausdrücke, aber die Abschnitte über [Funktionen als Argumente](/part-12/1-functions-as-arguments) und [Listen-Abstraktionen](/part-11/1-list-comprehensions) werden wahrscheinlich nützlich sein.

Vielleicht finden Sie auch das Beispiel in [Teil 10](/part-10/4-application-development) hilfreich.

<programming-exercise name='Eishockey-Statistiken' tmcname='part12-15_hockey_statistics'>

In dieser Übung erstellen Sie eine Anwendung zur Untersuchung von Eishockey-Statistiken der NHL auf verschiedene Arten.

Die Übungsvorlage enthält zwei JSON-Dateien: `partial.json` und `all.json`. Die erste davon ist hauptsächlich zum Testen gedacht. Letztere enthält viele Daten, da alle NHL-Spielerstatistiken für die Saison 2019-20 in der Datei enthalten sind.

Der Eintrag für einen einzelnen Spieler hat das folgende Format:

```json
{
    "name": "Patrik Laine",
    "nationality": "FIN",
    "assists": 35,
    "goals": 28,
    "penalties": 22,
    "team": "WPG",
    "games": 68
}
```

Beide Dateien enthalten eine Liste von Einträgen im obigen Format.

Wenn Sie eine Auffrischung zum Umgang mit JSON-Dateien benötigen, werfen Sie bitte einen Blick auf [Teil 7 dieses Kursmaterials](/part-7/4-data-processing#reading-json-files).

## Suchen und Auflisten

Bitte schreiben Sie eine interaktive Anwendung, die zuerst nach dem Namen der Datei fragt und dann die folgenden Funktionen anbietet:

- Suche nach den Statistiken eines einzelnen Spielers nach Namen
- Auflistung aller Abkürzungen für Teamnamen in alphabetischer Reihenfolge
- Auflistung aller Abkürzungen für Länder in alphabetischer Reihenfolge

Diese Funktionalitäten bringen Ihnen einen Übungspunkt ein. Ihre Anwendung sollte nun wie folgt funktionieren:

<sample-output>

Dateiname: **partial.json**
Daten von 14 Spielern gelesen

Befehle:
0 Beenden
1 Spieler suchen
2 Teams
3 Länder
4 Spieler im Team
5 Spieler aus Land
6 meiste Punkte
7 meiste Tore

Befehl: **1**
Name: **Travis Zajac**
<pre>
Travis Zajac         NJD   9 + 16 =  25
</pre>

Befehl: **2**
BUF
CGY
DAL
NJD
NYI
OTT
PIT
WPG
WSH

Befehl: **3**
CAN
CHE
CZE
SWE
USA

Befehl: **0**

</sample-output>

Hinweis: Das Ausgabeformat für einen Spieler muss exakt wie folgt aussehen:

<sample-output>

<pre>
Leon Draisaitl       EDM  43 + 67 = 110
Connor McDavid       EDM  34 + 63 =  97
Travis Zajac         NJD   9 + 16 =  25
Mike Green           EDM   3 +  8 =  11
Markus Granlund      EDM   3 +  1 =   4
123456789012345678901234567890123456789
</pre>

</sample-output>

Die letzte Zeile im obigen Beispiel dient dazu, Ihnen bei der Berechnung der Breiten der verschiedenen Felder in der Ausgabe zu helfen; Sie sollten die Zahlenzeile in Ihrer endgültigen Einreichung nicht selbst ausgeben.

Die Abkürzung für das Team wird ab dem 22. Zeichen ausgegeben. Das `+`-Zeichen ist das 30. Zeichen und das `=`-Zeichen ist das 35. Zeichen. Alle Felder sollten rechtsbündig ausgerichtet sein. Alle Leerzeichen sind Leerzeichen-Zeichen.

F-Strings sind wahrscheinlich der einfachste Weg, um die erforderliche Ausgabe zu erzielen. Der Prozess ähnelt [dieser Übung](/part-6/1-reading-files#programming-exercise-course-grading-part-3) aus Teil 6.

## Spieler nach Punkten auflisten

Diese beiden Funktionalitäten bringen Ihnen einen zweiten Übungspunkt ein:

- Auflistung der Spieler eines bestimmten Teams in der Reihenfolge der erzielten Punkte, von der höchsten zur niedrigsten. Punkte entsprechen _Toren_ + _Vorlagen_
- Auflistung der Spieler eines bestimmten Landes in der Reihenfolge der erzielten Punkte, von der höchsten zur niedrigsten

Ihre Anwendung sollte nun wie folgt funktionieren:

<sample-output>

Dateiname: **partial.json**
Daten von 14 Spielern gelesen

Befehle:
0 Beenden
1 Spieler suchen
2 Teams
3 Länder
4 Spieler im Team
5 Spieler aus Land
6 meiste Punkte
7 meiste Tore

Befehl: **4**
Team: **OTT**
<pre>
Drake Batherson      OTT   3 +  7 =  10
Jonathan Davidsson   OTT   0 +  1 =   1
</pre>

Befehl: **5**
Land: **CAN**
<pre>
Jared McCann         PIT  14 + 21 =  35
Travis Zajac         NJD   9 + 16 =  25
Taylor Fedun         DAL   2 +  7 =   9
Mark Jankowski       CGY   5 +  2 =   7
Logan Shaw           WPG   3 +  2 =   5
</pre>

Befehl: **0**

</sample-output>

## Erfolgreichste Spieler

Diese beiden Funktionalitäten bringen Ihnen einen dritten Übungspunkt ein:

- Liste von `n` Spielern, die die meisten Punkte erzielt haben
  - Wenn zwei Spieler die gleiche Punktzahl haben, kommt derjenige zuerst, der die höhere Anzahl an Toren erzielt hat
- Liste von `n` Spielern, die die meisten Tore erzielt haben
  - Wenn zwei Spieler die gleiche Anzahl an Toren haben, kommt derjenige zuerst, der die geringere Anzahl an Spielen absolviert hat

Ihre Anwendung sollte nun wie folgt funktionieren:

<sample-output>

Dateiname: **partial.json**
Daten von 14 Spielern gelesen

Befehle:
0 Beenden
1 Spieler suchen
2 Teams
3 Länder
4 Spieler im Team
5 Spieler aus Land
6 meiste Punkte
7 meiste Tore

Befehl: **6**
Wie viele: **2**
<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
</pre>

Befehl: **6**
Wie viele: **5**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
John Klingberg       DAL   6 + 26 =  32
Travis Zajac         NJD   9 + 16 =  25
Conor Sheary         BUF  10 + 13 =  23
</pre>

Befehl: **7**
Wie viele: **6**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
Conor Sheary         BUF  10 + 13 =  23
Travis Zajac         NJD   9 + 16 =  25
John Klingberg       DAL   6 + 26 =  32
Mark Jankowski       CGY   5 +  2 =   7
</pre>

Befehl: **0**

</sample-output>

</programming-exercise>
