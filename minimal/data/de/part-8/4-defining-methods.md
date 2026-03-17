---
path: '/part-8/4-defining-methods'
title: 'Eigene Methoden definieren'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Wissen Sie, wie Klassenmethoden funktionieren
- Sind Sie in der Lage, neue Methoden in Ihren eigenen Klassen zu schreiben
- Verstehen Sie die Konzepte der Kapselung (Encapsulation) und des Clients in der objektorientierten Programmierung

</text-box>

Klassen, die nur Datenattribute enthalten, unterscheiden sich nicht wesentlich von Dictionarys. Unten finden Sie zwei Möglichkeiten, ein Bankkonto zu modellieren: zuerst mit einer Klassendefinition und dann unter Verwendung eines Dictionarys.

```python
# Beispiel 1: Bankkonto mit Klassendefinition
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
```

```python
# Beispiel 2: Bankkonto mit Dictionary
peters_account = {"account_number": "12345-678", "owner": "Peter Python", "balance": 1500.0, "annual_interest": 0.0}
```

Mit einem Dictionary ist die Implementierung viel kürzer und unkomplizierter. Bei einer Klasse ist die Struktur jedoch "fester gebunden", sodass wir erwarten können, dass alle `BankAccount`-Objekte strukturell gleich sind. Eine Klasse ist zudem benannt. Auf die Klasse `BankAccount` wird beim Erstellen eines neuen Bankkontos verwiesen, und der Typ des Objekts ist `BankAccount`, nicht `dict`.

Ein weiterer wesentlicher Vorteil von Klassen besteht darin, dass sie zusätzlich zu Daten auch Funktionalität enthalten können. Eines der Leitprinzipien der objektorientierten Programmierung ist, dass ein Objekt verwendet wird, um sowohl auf die an ein Objekt gebundenen Daten als auch auf die Funktionalität zur Verarbeitung dieser Daten zuzugreifen.

## Methoden in Klassen

Eine Methode ist ein Unterprogramm oder eine Funktion, die an eine bestimmte Klasse gebunden ist. Normalerweise betrifft eine Methode nur ein einzelnes Objekt. Eine Methode wird innerhalb der Klassendefinition definiert und kann auf die Datenattribute der Klasse wie auf jede andere Variable zugreifen.

Fahren wir mit der oben eingeführten Klasse `BankAccount` fort. Unten haben wir eine neue Methode, die dem Konto Zinsen hinzufügt:

```python
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

    # Diese Methode fügt die jährlichen Zinsen zum Kontostand hinzu
    def add_interest(self):
        self.balance += self.balance * self.annual_interest


peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
peters_account.add_interest()
print(peters_account.balance)
```

<sample-output>

1522.5

</sample-output>

Die Methode `add_interest` multipliziert den Kontostand mit dem jährlichen Zinssatz und addiert das Ergebnis zum aktuellen Kontostand. Die Methode wirkt nur auf das Objekt, auf dem sie aufgerufen wird.

Sehen wir uns an, wie das funktioniert, wenn wir mehrere Instanzen der Klasse erstellt haben:

```python
# Die Klasse BankAccount ist im vorherigen Beispiel definiert

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
paulas_account = BankAccount("99999-999", "Paula Pythonen", 1500.0, 0.05)
pippas_account = BankAccount("1111-222", "Pippa Programmer", 1500.0, 0.001)

# Zinsen auf Peters und Paulas Konten hinzufügen, aber nicht auf Pippas
peters_account.add_interest()
paulas_account.add_interest()

# Alle Kontostände ausgeben
print(peters_account.balance)
print(paulas_account.balance)
print(pippas_account.balance)
```

<sample-output>

1522.5
1575.0
1500.0

</sample-output>

Wie Sie oben sehen können, werden die jährlichen Zinsen nur den Konten hinzugefügt, auf denen die Methode aufgerufen wird. Da die jährlichen Zinssätze für Peters und Paulas Konten unterschiedlich sind, sind auch die Ergebnisse für diese beiden Konten unterschiedlich. Der Kontostand auf Pippas Konto ändert sich nicht, da die Methode `add_interest` nicht auf dem Objekt `pippas_account` aufgerufen wird.

## Kapselung (Encapsulation)

In der objektorientierten Programmierung taucht gelegentlich das Wort _Client_ auf. Damit ist ein Codeabschnitt gemeint, der ein Objekt erstellt und den durch seine Methoden bereitgestellten Dienst nutzt. Wenn die in einem Objekt enthaltenen Daten nur über die von ihm bereitgestellten Methoden verwendet werden, ist die _interne Integrität_ des Objekts gewährleistet. In der Praxis bedeutet dies beispielsweise, dass eine Klasse `BankAccount` Methoden zur Handhabung des Attributs `balance` anbietet, sodass der Client nie direkt auf den Kontostand zugreift. Diese Methoden können dann beispielsweise sicherstellen, dass der Kontostand nicht unter Null sinken darf.

Ein Beispiel dafür, wie das funktionieren würde:

```python
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

    # Diese Methode fügt die jährlichen Zinsen zum Kontostand hinzu
    def add_interest(self):
        self.balance += self.balance * self.annual_interest

    # Diese Methode "hebt Geld ab" vom Konto
    # Wenn die Abhebung erfolgreich ist, gibt die Methode True zurück, andernfalls False
    def withdraw(self, amount: float):
        if amount <= self.balance:
            self.balance -= amount
            return True

        return False

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)

if peters_account.withdraw(1000):
    print("Die Abhebung war erfolgreich, der Kontostand beträgt nun", peters_account.balance)
else:
    print("Die Abhebung war nicht erfolgreich, das Guthaben reicht nicht aus")

# Erneuter Versuch
if peters_account.withdraw(1000):
    print("Die Abhebung war erfolgreich, der Kontostand beträgt nun", peters_account.balance)
else:
    print("Die Abhebung war nicht erfolgreich, das Guthaben reicht nicht aus")
```

<sample-output>

Die Abhebung war erfolgreich, der Kontostand beträgt nun 500.0
Die Abhebung war nicht erfolgreich, das Guthaben reicht nicht aus

</sample-output>

Die Aufrechterhaltung der internen Integrität des Objekts und das Anbieten geeigneter Methoden, um dies sicherzustellen, wird als _Kapselung_ bezeichnet. Die Idee dahinter ist, dass die inneren Abläufe des Objekts vor dem Client verborgen bleiben, das Objekt jedoch Methoden anbietet, mit denen auf die im Objekt gespeicherten Daten zugegriffen werden kann.

Das Hinzufügen einer Methode verbirgt das Attribut nicht automatisch. Obwohl die Definition der Klasse `BankAccount` die Methode `withdraw` zum Abheben von Geld enthält, kann der Client-Code immer noch direkt auf das Attribut `balance` zugreifen und es ändern:

```python
peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)

# Versuch, 2000 abzuheben
if peters_account.withdraw(2000):
    print("Die Abhebung war erfolgreich, der Kontostand beträgt nun", peters_account.balance)
else:
    print("Die Abhebung war nicht erfolgreich, das Guthaben reicht nicht aus")

    # Die Abhebung von 2000 "erzwingen"
    peters_account.balance -= 2000

print("Der Kontostand beträgt nun:", peters_account.balance)
```

<sample-output>

Die Abhebung war nicht erfolgreich, das Guthaben reicht nicht aus
Der Kontostand beträgt nun: -500.0

</sample-output>

Es ist möglich, die Datenattribute vor dem Client-Code zu verbergen, was bei der Lösung dieses Problems helfen kann. Wir werden im nächsten Teil auf dieses Thema zurückkommen.

<programming-exercise name='Abnehmender Zähler' tmcname='part08-10_decreasing_counter'>

Diese Aufgabe besteht aus mehreren Teilen. Sie können die Teile separat einreichen. Jeder Teil ist einen Aufgabenpunkt wert.

Die Aufgabenvorlage enthält eine teilweise fertiggestellte Klasse `DecreasingCounter`:

```python
class DecreasingCounter:
    def __init__(self, initial_value: int):
        self.value = initial_value

    def print_value(self):
        print("value:", self.value)

    def decrease(self):
        pass

    # definieren Sie hier den Rest Ihrer Methoden
```

Die Klasse kann nun wie unten gezeigt verwendet werden und sollte nach Abschluss des ersten Teils der Aufgabe die folgende Ausgabe erzeugen:

```python
counter = DecreasingCounter(10)
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
```

<sample-output>

value: 10
value: 9
value: 8

</sample-output>


### Den Wert des Zählers verringern

Bitte vervollständigen Sie die in der Vorlage definierte Methode `decrease`, sodass sie den im Zähler gespeicherten Wert um eins verringert. Siehe das obige Beispiel für das erwartete Verhalten.

### Der Zähler darf keinen negativen Wert haben

Bitte fügen Sie Ihrer Methode `decrease` Funktionalität hinzu, sodass der Wert des Zählers niemals negative Werte erreicht. Wenn der Wert des Zählers 0 ist, wird er nicht weiter verringert.

```python
counter = DecreasingCounter(2)
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
```

<sample-output>

value: 2
value: 1
value: 0
value: 0

</sample-output>

### Den Wert auf Null setzen

Bitte fügen Sie eine Methode `set_to_zero` hinzu, die den Wert des Zählers auf 0 setzt:

```python
counter = DecreasingCounter(100)
counter.print_value()
counter.set_to_zero()
counter.print_value()
```

<sample-output>

value: 100
value: 0

</sample-output>

### Den Zähler zurücksetzen

Bitte fügen Sie eine Methode `reset_original_value()` hinzu, die den Zähler in seinen Ausgangszustand zurückversetzt:

```python
counter = DecreasingCounter(55)
counter.decrease()
counter.decrease()
counter.decrease()
counter.decrease()
counter.print_value()
counter.reset_original_value()
counter.print_value()
```

<sample-output>

value: 51
value: 55

</sample-output>

</programming-exercise>

Zum Abschluss dieses Abschnitts schauen wir uns eine Klasse an, die die persönliche Bestleistung eines Spielers modelliert. Die Klassendefinition enthält separate Validierungsmethoden, die sicherstellen, dass die übergebenen Argumente gültig sind. Die Methoden werden bereits innerhalb des Konstruktors aufgerufen. Dies stellt sicher, dass das erstellte Objekt intern konsistent ist.

```python
from datetime import date

class PersonalBest:

    def __init__(self, player: str, day: int, month: int, year: int, points: int):
        # Standardwerte
        self.player = ""
        self.date_of_pb = date(1900, 1, 1)
        self.points = 0

        if self.name_ok(player):
            self.player = player

        if self.date_ok(day, month, year):
            self.date_of_pb = date(year, month, day)

        if self.points_ok(points):
            self.points = points

    # Hilfsmethoden zur Überprüfung der Gültigkeit der Argumente
    def name_ok(self, name: str):
        return len(name) >= 2 # Der Name sollte mindestens zwei Zeichen lang sein

    def date_ok(self, day, month, year):
        try:
            date(year, month, day)
            return True
        except:
            # Eine Ausnahme wird ausgelöst, wenn die Argumente nicht gültig sind
            return False

    def points_ok(self, points):
        return points >= 0

if __name__ == "__main__":
    result1 = PersonalBest("Peter", 1, 11, 2020, 235)
    print(result1.points)
    print(result1.player)
    print(result1.date_of_pb)

    # Das Datum war nicht gültig
    result2 = PersonalBest("Paula", 4, 13, 2019, 4555)
    print(result2.points)
    print(result2.player)
    print(result2.date_of_pb) # Gibt den Standardwert 1900-01-01 aus
```

<sample-output>

235
Peter
2020-11-01
4555
Paula
1900-01-01

</sample-output>

Im obigen Beispiel wurden auch die Hilfsmethoden über den Parameternamen `self` aufgerufen, wenn sie im Konstruktor verwendet wurden. Es ist möglich, auch _statische_ Methodendefinitionen in Klassendefinitionen aufzunehmen. Dies sind Methoden, die aufgerufen werden können, ohne jemals eine Instanz der Klasse zu erstellen. Wir werden im nächsten Teil auf dieses Thema zurückkommen.

Der Parametername `self` wird nur verwendet, wenn man sich auf die Merkmale des _Objekts als Instanz der Klasse_ bezieht. Dazu gehören sowohl die Datenattribute als auch die an ein Objekt gebundenen Methoden. Um die Terminologie noch verwirrender zu machen, werden die Datenattribute und Methoden zusammen manchmal einfach als _Attribute_ des Objekts bezeichnet. Deshalb haben wir in diesem Material oft _Datenattribute_ spezifiziert, wenn wir die innerhalb der Klasse definierten Variablen meinen. Hier unterscheidet sich die Terminologie einiger Python-Programmierer geringfügig von der Terminologie, die in der objektorientierten Programmierung allgemeiner verwendet wird, wo sich _Attribute_ normalerweise nur auf die Datenattribute eines Objekts beziehen.

Es ist auch möglich, lokale Variablen innerhalb von Methodendefinitionen zu erstellen, ohne auf `self` zu verweisen. Sie sollten dies tun, wenn kein Bedarf besteht, außerhalb der Methode auf die Variablen zuzugreifen. Lokale Variablen innerhalb von Methoden haben keine speziellen Schlüsselwörter; sie werden genau wie alle normalen Variablen verwendet, denen Sie bisher begegnet sind.

So würde zum Beispiel dies funktionieren:

```python
class BonusCard:
    def __init__(self, name: str, balance: float):
        self.name = name
        self.balance = balance

    def add_bonus(self):
        # Die Variable bonus unten ist eine lokale Variable.
        # Sie ist kein Datenattribut des Objekts.
        # Auf sie kann nicht direkt über das Objekt zugegriffen werden.
        bonus = self.balance * 0.25
        self.balance += bonus

    def add_superbonus(self):
        # Die Variable superbonus ist ebenfalls eine lokale Variable.
        # In der Regel sind Hilfsvariablen lokale Variablen, da
        # kein Bedarf besteht, von anderen Methoden der Klasse
        # oder direkt über ein Objekt auf sie zuzugreifen.
        superbonus = self.balance * 0.5
        self.balance += superbonus

    def __str__(self):
        return f"BonusCard(name={self.name}, balance={self.balance})"
```

<programming-exercise name="Vor- und Nachname" tmcname='part08-11_first_and_last_name'>

Bitte schreiben Sie eine Klasse namens `Person` mit einem _einzelnen Attribut_ `name`, das mit einem dem Konstruktor übergebenen Argument gesetzt wird.

Bitte fügen Sie auch zwei Methoden hinzu:

Die Methode `return_first_name` sollte den Vornamen der Person zurückgeben, während die Methode `return_last_name` den Nachnamen der Person zurückgeben sollte.

Sie können davon ausgehen, dass der an den Konstruktor übergebene Name genau zwei durch ein Leerzeichen getrennte Namenselemente enthält.

Ein Beispiel für einen Anwendungsfall:

```python
if __name__ == "__main__":
    peter = Person("Peter Pythons")
    print(peter.return_first_name())
    print(peter.return_last_name())

    paula = Person("Paula Pythonnen")
    print(paula.return_first_name())
    print(paula.return_last_name())
```

<sample-output>

Peter
Pythons
Paula
Pythonnen

</sample-output>


</programming-exercise>

<programming-exercise name='Statistik über Zahlen' tmcname='part08-12_number_stats'>

In dieser Aufgabe werden Sie gebeten, ein Programm für die Arbeit mit Zahlen zu erstellen, ähnlich wie in der Aufgabe am [Ende von Teil 2](/part-2/4-simple-loops#programming-exercise-working-with-numbers) im Einführungskurs in die Programmierung. Diesmal werden Sie eine Klasse für diesen Zweck definieren.

### Die Zahlen zählen

Bitte schreiben Sie eine Klasse namens `NumberStats` mit den folgenden Methoden:

- Die Methode `add_number` fügt der statistischen Aufzeichnung eine neue Zahl hinzu
- Die Methode `count_numbers` gibt die Anzahl der hinzugefügten Zahlen zurück

An dieser Stelle ist es nicht erforderlich, die Zahlen selbst in einer Datenstruktur zu speichern. Es genügt, sich einfach zu merken, wie viele hinzugefügt wurden. Die Methode `add_number` nimmt zwar ein Argument entgegen, aber es besteht noch keine Notwendigkeit, den tatsächlichen Wert in irgendeiner Weise zu verarbeiten.

Die Aufgabenvorlage enthält das folgende Gerüst für die Klassendefinition:

```python
class NumberStats:
    def __init__(self):
        self.numbers = 0

    def add_number(self, number: int):
        pass

    def count_numbers(self):
        pass
```

```python
stats = NumberStats()
stats.add_number(3)
stats.add_number(5)
stats.add_number(1)
stats.add_number(2)
print("Hinzugefügte Zahlen:", stats.count_numbers())
```

<sample-output>

Hinzugefügte Zahlen: 4

</sample-output>

### Die Summe und der Durchschnitt

Bitte fügen Sie Ihrer Klassendefinition die folgenden Methoden hinzu:

- Die Methode `get_sum` sollte die Summe der hinzugefügten Zahlen zurückgeben (wenn keine Zahlen hinzugefügt wurden, sollte die Methode 0 zurückgeben)
- Die Methode `average` sollte den Durchschnitt der hinzugefügten Zahlen zurückgeben (wenn keine Zahlen hinzugefügt wurden, sollte die Methode 0 zurückgeben)

```python
stats = NumberStats()
stats.add_number(3)
stats.add_number(5)
stats.add_number(1)
stats.add_number(2)
print("Hinzugefügte Zahlen:", stats.count_numbers())
print("Summe der Zahlen:", stats.get_sum())
print("Durchschnitt der Zahlen:", stats.average())
```

<sample-output>

Hinzugefügte Zahlen: 4
Summe der Zahlen: 11
Durchschnitt der Zahlen: 2.75

</sample-output>

### Benutzereingabe

Bitte schreiben Sie ein Hauptprogramm, das den Benutzer so lange nach Ganzzahlen fragt, bis der Benutzer -1 eingibt. Das Programm sollte dann die Summe und den Durchschnitt der eingegebenen Zahlen ausgeben.

Ihr Programm sollte ein `NumberStats`-Objekt verwenden, um die hinzugefügten Zahlen aufzuzeichnen.

Hinweis: Sie müssen die Klasse `NumberStats` in diesem Teil der Aufgabe nicht ändern, vorausgesetzt, sie hat die Tests für den vorherigen Teil der Aufgabe bestanden. Verwenden Sie eine Instanz der Klasse, um diesen Teil abzuschließen.

Hinweis 2: Ihr Hauptprogramm sollte nicht in einem `if __name__ == "__main__":`-Block stehen, da die Tests sonst nicht funktionieren.

<sample-output>

Bitte geben Sie Ganzzahlen ein:
**4**
**2**
**5**
**2**
**-1**
Summe der Zahlen: 13
Durchschnitt der Zahlen: 3.25

</sample-output>

### Mehrere Summen

Bitte erweitern Sie Ihr Hauptprogramm so, dass es auch separat die Summe der geraden und der ungeraden hinzugefügten Zahlen zählt.

Hinweis: Ändern Sie auch in diesem Teil der Aufgabe Ihre Klassendefinition `NumberStats` nicht. Definieren Sie stattdessen drei `NumberStats`-Objekte. Eines davon sollte alle Zahlen verfolgen, ein anderes die geraden Zahlen und das dritte die eingegebenen ungeraden Zahlen.

Hinweis 2: Ihr Hauptprogramm sollte nicht in einem `if __name__ == "__main__":`-Block stehen, da die Tests sonst nicht funktionieren.

Bitte schauen Sie sich dieses Beispiel an, wie Ihre Hauptfunktion funktionieren sollte:

<sample-output>

Bitte geben Sie Ganzzahlen ein:
**4**
**2**
**5**
**2**
**-1**
Summe der Zahlen: 13
Durchschnitt der Zahlen: 3.25
Summe der geraden Zahlen: 8
Summe der ungeraden Zahlen: 5

</sample-output>

</programming-exercise>
