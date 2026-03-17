---
path: '/part-9/3-encapsulation'
title: 'Kapselung (Encapsulation)'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Wissen Sie, was Kapselung bedeutet
- Sind Sie in der Lage, private Attribute zu erstellen
- Wissen Sie, wie Sie Getter und Setter für Ihre Attribute erstellen

</text-box>

In der objektorientierten Programmierung bezieht sich der Begriff _Client_ auf ein Programm, das eine Klasse oder Instanzen einer Klasse verwendet. Eine Klasse bietet dem Client _Dienste_ an, über die der Client auf die auf Basis der Klasse erstellten Objekte zugreifen kann. Die Ziele dabei sind:

1) Die Verwendung einer Klasse und/oder von Objekten soll aus Sicht des Clients so einfach wie möglich sein.
2) Die _Integrität_ jedes Objekts soll jederzeit gewahrt bleiben.

Die Integrität eines Objekts bedeutet, dass der _Zustand_ eines Objekts immer akzeptabel bleibt. In der Praxis bedeutet dies, dass die Werte der Attribute des Objekts immer zulässig sind. Beispielsweise sollte ein Objekt, das ein Datum repräsentiert, niemals den Wert 13 für den Monat haben; ein Objekt, das einen Studenten modelliert, sollte niemals eine negative Zahl für die erreichten Leistungspunkte haben und so weiter.

Schauen wir uns eine Klasse namens `Student` an:

```python
class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number
        self.study_credits = 0

    def add_credits(self, study_credits):
        if study_credits > 0:
            self.study_credits += study_credits
```

Das `Student`-Objekt bietet seinen Clients die Methode `add_credits` an, mit der der Client eine bestimmte Anzahl von Leistungspunkten zum Gesamtwert des Studenten hinzufügen kann. Die Methode stellt sicher, dass der als Argument übergebene Wert größer als Null ist. Der folgende Code fügt bei drei Gelegenheiten Leistungspunkte hinzu:

```python
sally = Student("Sally Student", "12345")
sally.add_credits(5)
sally.add_credits(5)
sally.add_credits(10)
print("Leistungspunkte:", sally.study_credits)
```

<sample-output>

Leistungspunkte: 20

</sample-output>

Trotz der Methodendefinition ist es immer noch möglich, direkt auf das Attribut `study_credits` zuzugreifen. Dies könnte zu einem fehlerhaften Zustand führen, in dem die Integrität des Objekts verloren geht:

```python
sally = Student("Sally Student", "12345")
sally.study_credits = -100
print("Leistungspunkte:", sally.study_credits)
```

<sample-output>

Leistungspunkte: -100

</sample-output>

## Kapselung

Ein gemeinsames Merkmal objektorientierter Programmiersprachen ist, dass Klassen ihre Attribute in der Regel vor potenziellen Clients verbergen können. Verborgene Attribute werden üblicherweise als _privat_ bezeichnet. In Python wird diese Privatheit erreicht, indem zwei Unterstriche `__` am Anfang des Attributnamens hinzugefügt werden:

```python
class CreditCard:
    # Das Attribut number ist privat, während das Attribut name zugänglich ist
    def __init__(self, number: str, name: str):
        self.__number = number
        self.name = name
```

Ein privates Attribut ist für den Client nicht direkt sichtbar. Der Versuch, darauf zu verweisen, verursacht einen Fehler. Im obigen Beispiel kann das Attribut `name` leicht aufgerufen und geändert werden:

```python
card = CreditCard("123456", "Randy Riches")
print(card.name)
card.name = "Charlie Churchmouse"
print(card.name)
```

<sample-output>

Randy Riches
Charlie Churchmouse

</sample-output>

Der Versuch, die Kartennummer auszugeben, verursacht jedoch einen Fehler:

```python
card = CreditCard("123456", "Randy Riches")
print(card.__number)
```

<sample-output>

AttributeError: 'CreditCard' object has no attribute '__number'

</sample-output>

Das Verbergen von Attributen vor Clients wird als _Kapselung_ bezeichnet. Wie der Name schon sagt, ist das Attribut in einer "Kapsel" eingeschlossen. Dem Client wird dann eine geeignete Schnittstelle zum Zugriff auf und zur Verarbeitung der im Objekt gespeicherten Daten angeboten.

Fügen wir ein weiteres gekapseltes Attribut hinzu: das Guthaben auf der Kreditkarte. Diesmal fügen wir auch öffentlich sichtbare Methoden hinzu, die es dem Client ermöglichen, auf das Guthaben zuzugreifen und es zu ändern:

```python
class CreditCard:
    def __init__(self, number: str, name: str, balance: float):
        self.__number = number
        self.name = name
        self.__balance = balance

    def deposit_money(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def withdraw_money(self, amount: float):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount

    def retrieve_balance(self):
        return self.__balance
```

```python
card = CreditCard("123456", "Randy Riches", 5000)
print(card.retrieve_balance())
card.deposit_money(100)
print(card.retrieve_balance())
card.withdraw_money(500)
print(card.retrieve_balance())
# Das Folgende wird nicht funktionieren, da das Guthaben nicht ausreicht
card.withdraw_money(10000)
print(card.retrieve_balance())
```

<sample-output>

5000
5100
4600
4600

</sample-output>

Das Guthaben kann nicht direkt geändert werden, da das Attribut privat ist, aber wir haben die Methoden `deposit_money` und `withdraw_money` zur Änderung des Wertes aufgenommen. Die Methode `retrieve_balance` gibt den im Guthaben gespeicherten Wert zurück. Die Methoden enthalten einige grundlegende Prüfungen zur Wahrung der Integrität des Objekts: Beispielsweise kann die Karte nicht überzogen werden.

<programming-exercise name='Auto' tmcname='part09-09_car'>

Bitte implementieren Sie eine Klasse namens `Car`, die zwei private, _gekapselte_ Variablen hat: die Benzinmenge im Tank (0 bis 60 Liter) und den Kilometerstand (in Kilometern). Das Auto verbraucht einen Liter Benzin pro Kilometer.

Die Klasse sollte zudem die folgenden Methoden enthalten:

- `fill_up()`, welche den Tank auffüllt
- `drive(km: int)`, welche das Auto über die angegebene Distanz fährt, oder so weit, wie das Benzin im Tank reicht
- `__str__`, welche eine String-Repräsentation des Autos gemäß den folgenden Beispielen zurückgibt

Ein Beispiel für die Verwendung der Klasse:

```python
car = Car()
print(car)
car.fill_up()
print(car)
car.drive(20)
print(car)
car.drive(50)
print(car)
car.drive(10)
print(car)
car.fill_up()
car.fill_up()
print(car)
```

<sample-output>

Car: odometer reading 0 km, petrol remaining 0 litres
Car: odometer reading 0 km, petrol remaining 60 litres
Car: odometer reading 20 km, petrol remaining 40 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 60 litres

</sample-output>

**Hinweis:** Sie werden gebeten, die verbleibende Benzinmenge und den Kilometerstand zu kapseln. Es sollte nicht möglich sein, direkt von außerhalb der klasseneigenen Methoden darauf zuzugreifen.

</programming-exercise>

## Eine kurze Anmerkung zu privaten Attributen, Python und objektorientierter Programmierung

Es gibt Wege um die `__`-Notation zum Verbergen von Attributen herum, auf die Sie stoßen könnten, wenn Sie online nach Ressourcen suchen. Kein Python-Attribut ist wirklich privat, und dies ist von den Schöpfern von Python so gewollt. Andererseits wird von einem Python-Programmierer im Allgemeinen erwartet, dass er die in Klassen festgelegten Sichtbarkeitsrichtlinien respektiert, und es erfordert einen besonderen Aufwand, diese zu umgehen. In anderen objektorientierten Programmiersprachen wie Java sind private Variablen oft wirklich verborgen, und es ist am besten, wenn Sie sich private Python-Variablen ebenfalls als solche vorstellen.

## Getter und Setter

In der objektorientierten Programmierung werden Methoden, die dem Zugriff auf und der Änderung von Attributen gewidmet sind, üblicherweise _Getter_ und _Setter_ genannt. Nicht alle Python-Programmierer verwenden die Begriffe "Getter" und "Setter", aber das unten skizzierte Konzept der _Properties_ ist sehr ähnlich, weshalb wir hier die allgemein akzeptierte Terminologie der objektorientierten Programmierung verwenden werden.

Oben haben wir also einige öffentliche Methoden für den Zugriff auf private Attribute erstellt, aber es gibt einen direkteren, "pythonischen" Weg, auf Attribute zuzugreifen. Schauen wir uns eine einfache Klasse namens `Wallet` mit einem einzigen, privaten Attribut `money` an:

```python
class Wallet:
    def __init__(self):
        self.__money = 0
```

Wir können Getter- und Setter-Methoden für den Zugriff auf das private Attribut unter Verwendung des `@property`-Dekorators hinzufügen:

```python
class Wallet:
    def __init__(self):
        self.__money = 0

    # Eine Getter-Methode
    @property
    def money(self):
        return self.__money

    # Eine Setter-Methode
    @money.setter
    def money(self, money):
        if money >= 0:
            self.__money = money
```

Zuerst definieren wir eine Getter-Methode, die den aktuell in der Brieftasche befindlichen Geldbetrag zurückgibt. Dann definieren wir eine Setter-Methode, die einen neuen Wert für das Geld-Attribut setzt und dabei sicherstellt, dass der neue Wert nicht negativ ist.

Die neuen Methoden können wie folgt verwendet werden:

```python
wallet = Wallet()
print(wallet.money)

wallet.money = 50
print(wallet.money)

wallet.money = -30
print(wallet.money)
```

<sample-output>

0
50
50

</sample-output>

Aus Sicht des Clients unterscheidet sich die Verwendung dieser neuen Methoden nicht vom direkten Zugriff auf ein Attribut. Klammern sind nicht erforderlich; stattdessen ist es vollkommen akzeptabel, `wallet.money = 50` zu schreiben, als ob wir einer Variablen einfach einen Wert zuweisen würden. Tatsächlich war es das Ziel, die interne Implementierung des Attributs zu verbergen (d. h. zu kapseln) und gleichzeitig eine einfache Möglichkeit zum Zugriff auf und zur Änderung der im Objekt gespeicherten Daten anzubieten.

Das vorherige Beispiel hat ein kleines Problem: Der Client wird nicht über das Scheitern beim Setzen eines negativen Wertes für das Geld-Attribut informiert. Wenn ein angegebener Wert eindeutig falsch ist, ist es normalerweise eine gute Idee, eine Ausnahme auszulösen und so den Client zu informieren. In diesem Fall sollte die Ausnahme wahrscheinlich vom Typ `ValueError` sein, um zu signalisieren, dass der angegebene Wert unzulässig war.

Hier haben wir eine verbesserte Version der Klasse zusammen mit Code zum Testen:

```python
class Wallet:
    def __init__(self):
        self.__money = 0

    # Eine Getter-Methode
    @property
    def money(self):
        return self.__money

    # Eine Setter-Methode
    @money.setter
    def money(self, money):
        if money >= 0:
            self.__money = money
        else:
            raise ValueError("Der Betrag darf nicht unter Null liegen")
```

```python
wallet.money = -30
print(wallet.money)
```

<sample-output>

ValueError: Der Betrag darf nicht unter Null liegen

</sample-output>

**Hinweis:** Die Getter-Methode, also der `@property`-Dekorator, muss vor der Setter-Methode eingeführt werden, da sonst beim Ausführen der Klasse ein Fehler auftritt. Dies liegt daran, dass der `@property`-Dekorator den Namen des dem Client angebotenen "Attributs" definiert. Die mit `.setter` hinzugefügte Setter-Methode fügt diesem lediglich eine neue Funktionalität hinzu.

<programming-exercise name='Aufnahme' tmcname='part09-10_recording'>

Bitte erstellen Sie eine Klasse namens `Recording`, die eine einzelne Aufnahme modelliert. Die Klasse sollte eine private Variable haben: `__length` vom Typ Integer.

Bitte implementieren Sie Folgendes:

* Einen Konstruktor, der die Länge als Argument entgegennimmt
* Eine Getter-Methode `length`, die die Länge der Aufnahme zurückgibt
* Eine Setter-Methode, die die Länge der Aufnahme setzt

Es sollte möglich sein, die Klasse wie folgt zu nutzen:

```python
the_wall = Recording(43)
print(the_wall.length)
the_wall.length = 44
print(the_wall.length)
```

<sample-output>

43
44

</sample-output>

Wenn das Argument für entweder den Konstruktor oder die Setter-Methode unter Null liegt, sollte dies einen `ValueError` auslösen.

Falls Sie eine Auffrischung zum Auslösen von Ausnahmen benötigen, schauen Sie sich bitte [Teil 6](/part-6/3-errors#raising-exceptions) der Kursmaterialien an.

</programming-exercise>

Das folgende Beispiel zeigt eine Klasse mit zwei privaten Attributen sowie Gettern und Settern für beide. Bitte probieren Sie das Programm mit verschiedenen als Argumente übergebenen Werten aus:

```python
class Player:
    def __init__(self, name: str, player_number: int):
        self.__name = name
        self.__player_number = player_number

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name: str):
        if name != "":
            self.__name = name
        else:
            raise ValueError("Der Name darf kein leerer String sein")

    @property
    def player_number(self):
        return self.__player_number

    @player_number.setter
    def player_number(self, player_number: int):
        if player_number > 0:
            self.__player_number = player_number
        else:
            raise ValueError("Die Spielernummer muss eine positive Ganzzahl sein")
```

```python
player = Player("Betty Ballmer", 10)
print(player.name)
print(player.player_number)

player.name = "Buster Ballmer"
player.player_number = 11
print(player.name)
print(player.player_number)
```

<sample-output>

Betty Ballmer
10
Buster Ballmer
11

</sample-output>

Zum Abschluss dieses Abschnitts schauen wir uns eine Klasse an, die ein einfaches Tagebuch modelliert. Alle Attribute sind privat, werden aber über unterschiedliche Schnittstellen gehandhabt: Der Besitzer des Tagebuchs hat Getter- und Setter-Methoden, aber die Tagebucheinträge werden mit "traditionellen" Methoden verarbeitet. In diesem Fall ist es sinnvoll, dem Client jeglichen Zugriff auf die interne Datenstruktur des Tagebuchs zu verweigern. Nur die öffentlichen Methoden sind für den Client direkt sichtbar.

Die Kapselung stellt zudem sicher, dass die interne Implementierung der Klasse nach Belieben geändert werden kann, sofern die öffentliche Schnittstelle intakt bleibt. Der Client muss nicht wissen oder sich darum kümmern, ob die interne Datenstruktur auf Listen, Dictionarys oder etwas völlig anderem basiert.

```python
class Diary:
    def __init__(self, owner: str):
        self.__owner = owner
        self.__entries = []

    @property
    def owner(self):
        return self.__owner

    @owner.setter
    def owner(self, owner):
        if owner != "":
            self.__owner = owner
        else:
            raise ValueError("Der Besitzer darf kein leerer String sein")

    def add_entry(self, entry: str):
        self.__entries.append(entry)

    def print_entries(self):
        print("Insgesamt", len(self.__entries), "Einträge")
        for entry in self.__entries:
            print("- " + entry)
```

```python
diary = Diary("Peter")
diary.add_entry("Heute habe ich Haferbrei gegessen")
diary.add_entry("Heute habe ich objektorientierte Programmierung gelernt")
diary.add_entry("Heute bin ich früh ins Bett gegangen")
diary.print_entries()
```

<sample-output>

Insgesamt 3 Einträge
- Heute habe ich Haferbrei gegessen
- Heute habe ich objektorientierte Programmierung gelernt
- Heute bin ich früh ins Bett gegangen

</sample-output>

<programming-exercise name='Wetterstation' tmcname='part09-11_weather_station'>

Bitte erstellen Sie eine Klasse namens `WeatherStation`, die zum Speichern von Wetterbeobachtungen verwendet wird. Die Klasse sollte die folgenden öffentlichen Attribute haben:

* Einen Konstruktor, der den Namen der Station als Argument entgegennimmt
* Eine Methode namens `add_observation(observation: str)`, die eine Beobachtung als letzten Eintrag in eine Liste einfügt
* Eine Methode namens `latest_observation()`, die die zuletzt hinzugefügte Beobachtung zurückgibt. Wenn noch keine Beobachtungen vorhanden sind, sollte die Methode einen _leeren String_ zurückgeben.
* Eine Methode namens `number_of_observations()`, die die Gesamtzahl der hinzugefügten Beobachtungen zurückgibt
* Eine `__str__`-Methode, die den Namen der Station und die Gesamtzahl der hinzugefügten Beobachtungen gemäß dem folgenden Beispiel zurückgibt.

Alle Attribute sollten gekapselt sein, damit sie nicht direkt aufgerufen werden können. Es liegt an Ihnen, wie Sie die Klasse implementieren, solange die öffentliche Schnittstelle exakt wie oben beschrieben ist.

Ein Beispiel für die Verwendung der Klasse:

```python
station = WeatherStation("Houston")
station.add_observation("Regen 10mm")
station.add_observation("Sonnig")
print(station.latest_observation())

station.add_observation("Gewitter")
print(station.latest_observation())

print(station.number_of_observations())
print(station)
```

<sample-output>

Sonnig
Gewitter
3
Houston, 3 observations

</sample-output>

</programming-exercise>
