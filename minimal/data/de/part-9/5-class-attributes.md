---
path: '/part-9/5-class-attributes'
title: 'Klassenattribute'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Sind Sie mit den Begriffen Klassenvariable und Klassenmethode vertraut
- Wissen Sie, wie sich statische Merkmale von Merkmalen von Instanzen unterscheiden
- Sind Sie in der Lage, statische Merkmale zu Ihren eigenen Klassen hinzuzufügen

</text-box>

Die _Merkmale_ (Traits) von Objekten sind ein zentrales Konzept der objektorientierten Programmierung. Der Begriff umfasst die in der Klassendefinition definierten Methoden und Variablen. Auch hier verwenden nicht alle Python-Programmierer den Begriff "Traits", manche bevorzugen _Attribute_, _Features_ oder _Member_. "Traits" ist in der weiteren Welt der objektorientierten Programmierung weitgehend akzeptiert, daher verwenden wir diesen Begriff hier.

Bisher haben wir uns hauptsächlich mit _Merkmalen von Objekten_ befasst. Dazu gehören die Methoden und Attribute, die in jeder Instanz einer Klasse zugänglich sind. Tatsächlich können Klassen _selbst_ auch Merkmale haben, die manchmal als _statische Merkmale_ bezeichnet werden, genauer gesagt als _Klassenvariablen_ und _Klassenmethoden_.

## Klassenvariablen

Jede Instanz einer Klasse hat ihre eigenen spezifischen Werte für jedes in der Klasse definierte Attribut, wie wir in den Beispielen der vorangegangenen Abschnitte gesehen haben. Aber was wäre, wenn wir Daten hätten, die von den verschiedenen Instanzen gemeinsam genutzt werden sollen? Hier kommen _Klassenvariablen_ ins Spiel, auch bekannt als statische Variablen. Eine Klassenvariable ist eine Variable, auf die über die Klasse selbst zugegriffen wird, nicht über die auf Basis der Klasse erstellten Instanzen. Zu jedem Zeitpunkt während der Programmausführung hat eine Klassenvariable einen einzigen Wert, unabhängig davon, wie viele Instanzen der Klasse erstellt werden.

Eine Klassenvariable wird ohne das Präfix `self` deklariert und üblicherweise außerhalb jeder Methodendefinition, da sie von überall innerhalb der Klasse oder sogar von außerhalb der Klasse zugänglich sein sollte.

```python
class SavingsAccount:
    general_rate = 0.03

    def __init__(self, account_number: str, balance: float, interest_rate: float):
        self.__account_number = account_number
        self.__balance = balance
        self.__interest_rate = interest_rate

    def add_interest(self):
        # Der Gesamtzinssatz entspricht
        # dem allgemeinen Zinssatz + dem Zinssatz des Kontos
        total_interest = SavingsAccount.general_rate + self.__interest_rate
        self.__balance += self.__balance * total_interest

    @property
    def balance(self):
        return self.__balance
```

Da die Variable `general_rate` innerhalb der Klasse, aber außerhalb jeder Methodendefinition definiert ist und nicht das Präfix `self` verwendet, handelt es sich um eine Klassenvariable.

Auf eine Klassenvariable wird über den Namen der Klasse zugegriffen, zum Beispiel so:

```python
# Der allgemeine Zinssatz existiert unabhängig von Objektinstanzen
print("Der allgemeine Zinssatz beträgt", SavingsAccount.general_rate)

account = SavingsAccount("12345", 1000, 0.05)
# Die insgesamt aufgelaufenen Zinsen zum Kontostand hinzufügen
account.add_interest()
print(account.balance)
```

<sample-output>

Der allgemeine Zinssatz beträgt 0.03
1080.0

</sample-output>

Klassenvariablen werden also über den Namen der Klasse aufgerufen, zum Beispiel mit `SavingsAccount.general_rate`, während Instanzvariablen über den Namen der Objektvariablen aufgerufen werden, wie etwa `account.balance`. Eine Instanzvariable existiert naturgemäß erst, wenn eine Instanz der Klasse erstellt wurde, aber eine Klassenvariable ist überall und zu jedem Zeitpunkt verfügbar, an dem die Klasse selbst verfügbar ist.

Klassenvariablen sind nützlich, wenn Werte benötigt werden, die von allen Instanzen der Klasse gemeinsam genutzt werden. Im obigen Beispiel sind wir davon ausgegangen, dass sich der Gesamtzinssatz aller Sparkonten aus zwei Komponenten zusammensetzt: Der allgemeine Zinssatz wird von allen Konten geteilt, aber jedes Konto hat zudem seinen eigenen Zinssatz in einer Instanzvariablen. Der allgemeine Zinssatz kann sich ebenfalls ändern, aber die Änderung wirkt sich dann auf alle Instanzen der Klasse gleichermaßen aus.

```python
class SavingsAccount:
    general_rate = 0.03

    def __init__(self, account_number: str, balance: float, interest_rate: float):
        self.__account_number = account_number
        self.__balance = balance
        self.__interest_rate = interest_rate

    def add_interest(self):
        # Der Gesamtzinssatz entspricht
        # dem allgemeinen Zinssatz + dem Zinssatz des Kontos
        total_interest = SavingsAccount.general_rate + self.__interest_rate
        self.__balance += self.__balance * total_interest

    @property
    def balance(self):
        return self.__balance

    @property
    def total_interest(self):
        return self.__interest_rate + SavingsAccount.general_rate
```

```python
account1 = SavingsAccount("12345", 100, 0.03)
account2 = SavingsAccount("54321", 200, 0.06)

print("Allgemeiner Zinssatz:", SavingsAccount.general_rate)
print(account1.total_interest)
print(account2.total_interest)

# Der allgemeine Zinssatz beträgt nun 10 Prozent
SavingsAccount.general_rate = 0.10

print("Allgemeiner Zinssatz:", SavingsAccount.general_rate)
print(account1.total_interest)
print(account2.total_interest)
```

<sample-output>

Allgemeiner Zinssatz: 0.03
0.06
0.09
Allgemeiner Zinssatz: 0.1
0.13
0.16

</sample-output>

Wenn sich der allgemeine Zinssatz ändert, ändert sich der Gesamtzinssatz für alle Instanzen der Klasse. Wie Sie oben sehen können, ist es möglich, eine Getter-Methode mit dem `@property`-Dekorator hinzuzufügen, auch wenn es kein Attribut desselben Namens in der Klasse gibt. Diese Methode gibt die Summe aus dem allgemeinen Zinssatz und dem kontospezifischen Zinssatz zurück.

Schauen wir uns ein weiteres Beispiel an. Die Klasse `PhoneNumber` wird verwendet, um eine einzelne Telefonnummer zu definieren, enthält aber auch einige Ländervorwahlen in einem Dictionary. Dieses Dictionary ist eine Klassenvariable und wird als solche von allen Instanzen der Klasse geteilt, da die Ländervorwahl für Telefonnummern aus einem einzelnen Land immer gleich ist.

```python
class PhoneNumber:
    country_codes = {"Finland": "+358", "Sweden": "+46", "United States": "+1"}

    def __init__(self, name: str, phone_number: str, country: str):
        self.__name = name
        self.__phone_number = phone_number
        self.__country = country

    @property
    def phone_number(self):
        # Wenn die Ländervorwahl hinzugefügt wird,
        # wird die führende Null von der Telefonnummer entfernt
        return PhoneNumber.country_codes[self.__country] + " " + self.__phone_number[1:]
```

```python
paulas_no = PhoneNumber("Paula Pythons", "050 1234 567", "Finland")
print(paulas_no.phone_number)
```

<sample-output>

+358 50 1234 567

</sample-output>

Jedes `PhoneNumber`-Objekt enthält den Namen des Besitzers, die Nummer selbst und das Land der Telefonnummer. Wenn auf das Attribut mit der Telefonnummer über die Getter-Methode zugegriffen wird, wird die entsprechende Ländervorwahl basierend auf dem Länderattribut aus dem Dictionary der Klassenvariablen abgerufen und das Ergebnis der Nummer vorangestellt.

Die obige Beispielimplementierung ist ansonsten noch nicht sehr funktional. Im folgenden Beispiel haben wir Getter und Setter für alle Attribute hinzugefügt:

```python
class PhoneNumber:
    country_codes = {"Finland": "+358", "Sweden": "+46", "United States": "+1"}

    def __init__(self, name: str, phone_number: str, country: str):
        self.__name = name
        # Dies ist ein Aufruf der Methode phone_number.setter
        self.phone_number = phone_number
        # Dies ist ein Aufruf der Methode country.setter
        self.country = country

    # Die Getter-Methode für phone_number kombiniert die Ländervorwahl
    # und das Attribut phone_number
    @property
    def phone_number(self):
        # Die führende Null wird entfernt, wenn die Ländervorwahl vorangestellt wird
        return PhoneNumber.country_codes[self.__country] + " " + self.__phone_number[1:]

    @phone_number.setter
    def phone_number(self, number):
        # Sicherstellen, dass die Nummer nur Ziffern und Leerzeichen enthält
        for character in number:
            if character not in "1234567890 ":
                raise ValueError("Eine Telefonnummer darf nur Ziffern und Leerzeichen enthalten")
        self.__phone_number = number

    # Ein Getter nur für die Nummer selbst ohne Ländervorwahl
    @property
    def local_number(self):
        return self.__phone_number

    @property
    def country(self):
        return self.__country

    @country.setter
    def country(self, country):
        # Sicherstellen, dass das Land ein Schlüssel im Dictionary der Ländervorwahlen ist
        if country not in PhoneNumber.country_codes:
            raise ValueError("Dieses Land steht nicht auf der Liste.")
        self.__country = country

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        self.__name = name

    def __str__(self):
        return f"{self.phone_number} ({self.__name})"
```

```python
if __name__ == "__main__":
    pn = PhoneNumber("Peter Pythons", "040 111 1111", "Sweden")
    print(pn)
    print(pn.phone_number)
    print(pn.local_number)
```

<sample-output>

+46 40 111 1111 (Peter Pythons)
+46 40 111 1111
040 111 1111

</sample-output>

<programming-exercise name='Postleitzahlen' tmcname='part09-13_postcodes'>

Die Aufgabenvorlage enthält die Klassendefinition `City`, die ein Modell für eine einzelne Stadt ist.

Bitte fügen Sie eine Klassenvariable namens `postcodes` hinzu, die sich auf ein Dictionary bezieht. Die Schlüssel des Dictionarys sind Namen von Städten, und die zugeordneten Werte sind die Postleitzahlen dieser Städte. Beides sind Strings.

Das Dictionary sollte (mindestens) die folgenden Postleitzahlen enthalten:

* Helsinki 00100
* Turku 20100
* Tampere 33100
* Rovaniemi 96100
* Oulu 90100

Sie müssen keine weitere Funktionalität implementieren.

</programming-exercise>

## Klassenmethoden

Eine Klassenmethode, auch statische Methode genannt, ist eine Methode, die nicht an eine einzelne Instanz der Klasse gebunden ist. Eine Klassenmethode kann aufgerufen werden, ohne Instanzen der Klasse zu erstellen.

Klassenmethoden sind in der Regel Werkzeuge, die etwas mit dem Zweck der Klasse zu tun haben, aber in dem Sinne losgelöst sind, dass es nicht notwendig sein sollte, Instanzen der Klasse zu erstellen, um sie aufrufen zu können. Klassenmethoden sind üblicherweise öffentlich, sodass sie sowohl von außerhalb der Klasse als auch von innerhalb der Klasse aufgerufen werden können, einschließlich von innerhalb von Instanzen der Klasse.

Eine Klassenmethode wird mit der `@classmethod`-Annotation definiert. Der erste Parameter ist immer `cls`. Der Variablenname `cls` ähnelt dem Parameter `self`. Der Unterschied besteht darin, dass `cls` auf die Klasse zeigt, während `self` auf eine Instanz der Klasse zeigt. Keiner der Parameter wird beim Aufruf der Funktion in die Argumentliste aufgenommen; Python füllt den entsprechenden Wert automatisch aus.

Im folgenden Beispiel haben wir eine Klasse, die Fahrzeugregistrierungen modelliert. Die Klasse `Registration` enthält eine statische Methode zur Überprüfung, ob ein Kennzeichen gültig ist. Die Methode ist eine statische Klassenmethode, da es nützlich ist, prüfen zu können, ob ein Kennzeichen gültig ist, noch bevor ein einziges `Registration`-Objekt erstellt wurde:

```python
class Registration:
    def __init__(self, owner: str, make: str, year: int, license_plate: str):
        self.__owner = owner
        self.__make = make
        self.__year = year

        # Die Methode license_plate.setter aufrufen
        self.license_plate = license_plate

    @property
    def license_plate(self):
        return self.__license_plate

    @license_plate.setter
    def license_plate(self, plate):
        if Registration.license_plate_valid(plate):
            self.__license_plate = plate
        else:
            raise ValueError("Das Kennzeichen ist nicht gültig")

    # Eine Klassenmethode zur Validierung des Kennzeichens
    @classmethod
    def license_plate_valid(cls, plate: str):
        if len(plate) < 3 or "-" not in plate:
            return False

        # Anfangs- und Endabschnitt des Kennzeichens separat prüfen
        letters, numbers = plate.split("-")

        # Der Anfangsabschnitt darf nur Buchstaben enthalten
        for character in letters:
            if character.lower() not in "abcdefghijklmnopqrstuvwxyzåäö":
                return False

        # Der Endabschnitt darf nur Ziffern enthalten
        for character in numbers:
            if character not in "1234567890":
                return False

        return True
```

```python
registration = Registration("Mary Motorist", "Volvo", 1992, "abc-123")

if Registration.license_plate_valid("xyz-789"):
    print("Dies ist ein gültiges Kennzeichen!")
```

<sample-output>

Dies ist ein gültiges Kennzeichen!

</sample-output>

Die Gültigkeit eines Kennzeichens kann auch ohne Erstellung einer einzigen Instanz der Klasse geprüft werden, zum Beispiel mit `Registration.license_plate_valid("xyz-789")`. Dieselbe Methode wird innerhalb des Konstruktors der Klasse aufgerufen. Hinweis: Selbst innerhalb des Konstruktors wird auf diese Methode über den Namen der Klasse zugegriffen, nicht über `self`!

<programming-exercise name='Listen-Helfer' tmcname='part09-14_list_helper'>

Bitte erstellen Sie eine Klasse namens `ListHelper`, die die folgenden zwei Klassenmethoden enthält.

* `greatest_frequency(my_list: list)` gibt das am häufigsten vorkommende Element in der Liste zurück
* `doubles(my_list: list)` gibt die Anzahl der eindeutigen Elemente zurück, die mindestens zweimal in der Liste vorkommen

Es sollte möglich sein, diese Methoden zu verwenden, ohne eine Instanz der Klasse zu erstellen. Ein Beispiel für die Verwendung der Methoden:

```python
numbers = [1, 1, 2, 1, 3, 3, 4, 5, 5, 5, 6, 5, 5, 5]
print(ListHelper.greatest_frequency(numbers))
print(ListHelper.doubles(numbers))
```

<sample-output>

5
3

</sample-output>

</programming-exercise>
