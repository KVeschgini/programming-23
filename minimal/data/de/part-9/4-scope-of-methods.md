---
path: '/part-9/4-scope-of-methods'
title: 'Sichtbarkeit von Methoden'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Wissen Sie, wie Sie die Sichtbarkeit einer Methode in Python einschränken können
- Sind Sie in der Lage, private Methoden zu schreiben

</text-box>

Die innerhalb einer Klasse definierten Methoden können auf exakt dieselbe Weise verborgen werden wie die Attribute im vorherigen Abschnitt. Wenn der Methodenname mit zwei Unterstrichen `__` beginnt, ist sie für den Client nicht direkt zugänglich.

Die Technik ist also für Methoden und Attribute gleich, aber die Anwendungsfälle sind in der Regel etwas unterschiedlich. Private Attribute treten oft zusammen mit Getter- und Setter-Methoden auf, um den Zugriff auf sie zu steuern. Private Methoden hingegen sind meist nur für den internen Gebrauch gedacht, als Hilfsmethoden für Prozesse, über die der Client nichts wissen muss.

Eine private Methode kann innerhalb der Klasse wie jede andere Methode verwendet werden, wobei natürlich an das Präfix `self` gedacht werden muss. Das folgende Beispiel zeigt eine einfache Klasse, die den Empfänger von E-Mails repräsentiert. Sie enthält eine private Hilfsmethode zur Überprüfung, ob die E-Mail-Adresse ein gültiges Format hat:

```python
class Recipient:
    def __init__(self, name: str, email: str):
        self.__name = name
        if self.__check_email(email):
            self.__email = email
        else:
            raise ValueError("Die E-Mail-Adresse ist nicht gültig")

    def __check_email(self, email: str):
        # Eine einfache Prüfung: Die Adresse muss länger als 5 Zeichen sein
        # und einen Punkt sowie ein @-Zeichen enthalten
        return len(email) > 5 and "." in email and "@" in email
```

Der Versuch, die private Methode direkt aufzurufen, verursacht einen Fehler:

```python
peter = Recipient("Peter Emailer", "peter@example.com")
peter.__check_email("someone@example.com")
```

<sample-output>

AttributeError: 'Recipient' object has no attribute '__check_email'

</sample-output>

Innerhalb der Klasse kann auf die Methode normal zugegriffen werden, und es ist sinnvoll, sie auch zum Setzen eines neuen Wertes für die Adresse zu verwenden. Fügen wir Getter- und Setter-Methoden für die E-Mail-Adresse hinzu:

```python
class Recipient:
    def __init__(self, name: str, email: str):
        self.__name = name
        if self.__check_email(email):
            self.__email = email
        else:
            raise ValueError("Die E-Mail-Adresse ist nicht gültig")

    def __check_email(self, email: str):
        # Eine einfache Prüfung: Die Adresse muss länger als 5 Zeichen sein
        # und einen Punkt sowie ein @-Zeichen enthalten
        return len(email) > 5 and "." in email and "@" in email

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, email: str):
        if self.__check_email(email):
            self.__email = email
        else:
            raise ValueError("Die E-Mail-Adresse ist nicht gültig")
```

<text-box variant="info" name="Gültigkeitsbereich und Namensraum in Python">

Wir sind dem Begriff _Gültigkeitsbereich_ (Scope) bereits in [Teil 6](/part-6/4-scope-of-variables) dieses Materials begegnet und haben ihn als die Abschnitte eines Programms definiert, in denen ein (Variablen-)Name sichtbar ist. Aus einer anderen Perspektive betrachtet, bezieht sich der Begriff auch darauf, was von einem bestimmten Punkt im Programmcode aus sichtbar ist. Ein weiterer verwandter Begriff ist _Namensraum_ (Namespace), der sich auf die Namen bezieht, die speziell innerhalb einer definierten Python-Einheit, wie einer Klasse oder einer Funktionsdefinition, verfügbar sind.

Der Gültigkeitsbereich innerhalb einer Methode unterscheidet sich von dem innerhalb einer Klasse, welcher wiederum anders ist als der Gültigkeitsbereich im Client-Code, der eine Instanz der Klasse erstellt. Eine Methode hat Zugriff auf ihre lokalen Variablen, aber auch auf die Attribute und andere Methoden der Klasse, zu der sie gehört, selbst wenn diese privat sind. Die Klasse hat ebenfalls Zugriff auf diese, ihre eigenen Mitglieder, kann aber nicht direkt auf die lokalen Variablen innerhalb ihrer Methoden zugreifen. Der Client-Code hat nur Zugriff auf die öffentlichen Methoden und Attribute, die in der Klasse definiert sind, sowie natürlich auf andere Namen in der Umgebung, in der er existiert.

Es mag kontraintuitiv erscheinen, dass eine Klasse keinen Zugriff auf alle ihre Inhalte hätte, aber dies ist für die Gewährleistung der Integrität unerlässlich. Beispielsweise könnte es sinnvoll sein, denselben Namen für eine lokale Variable in verschiedenen Methoden innerhalb derselben Klasse zu verwenden, wenn diese irgendwie ähnliche Funktionalitäten ausführen. Hätte die Klasse direkten Zugriff auf alle lokalen Variablen innerhalb der Methoden, müssten diese unterschiedlich benannt werden, da sonst nicht klar wäre, welche Version der Variablen wo gemeint ist. Wir haben bereits bei mit `self` deklarierten Attributen gesehen, dass Hilfsvariablen nicht außerhalb einer Methode zugänglich gemacht werden sollten. Daher sollte das Hinzufügen der Variablen als Attribute oder globale Variablen keine Option sein. Es muss einen Weg geben, Namen in verschiedenen Teilen des Programms getrennt zu halten, und genau dafür sind Namensräume da.

Die Idee eines Namensraums hilft zu verstehen, wie derselbe Name friedlich in verschiedenen Funktionen, Klassen oder Modulen gleichzeitig koexistieren kann. Wenn ein Name spezifisch für einen Namensraum ist, wie etwa eine Methodendefinition, ist er außerhalb dessen nicht direkt zugänglich, und es gibt keinen Grund, warum ein anderer Namensraum nicht denselben Namen verwenden könnte. Das Beherrschen von Namensräumen und Gültigkeitsbereichen ist entscheidend, um ein kompetenter Programmierer zu werden, und Sie werden in diesem Kurs viel Übung darin erhalten.

</text-box>

## Benötige ich eine private Methode?

Im folgenden Beispiel ist die Klasse `DeckOfCards` ein Modell für ein Kartenspiel mit 52 Karten. Sie enthält die Hilfsmethode `__reset_deck`, die ein neues, gemischtes Kartenspiel erstellt. Die private Methode wird derzeit nur in der Konstruktormethode aufgerufen, sodass die Implementierung theoretisch auch direkt in den Konstruktor geschrieben werden könnte. Die Verwendung einer separaten Methode macht den Code jedoch besser lesbar und ermöglicht es zudem, später bei Bedarf in anderen Methoden auf die Funktionalität zuzugreifen.

```python
from random import shuffle

class DeckOfCards:
    def __init__(self):
        self.__reset_deck()

    def __reset_deck(self):
        self.__deck = []
        # Alle 52 Karten zum Deck hinzufügen
        suits = ["spades", "hearts", "clubs", "diamonds"]
        for suit in suits:
            for number in range(1, 14):
                self.__deck.append((suit, number))
        # Das Deck mischen
        shuffle(self.__deck)

    def deal(self, number_of_cards: int):
        hand = []
        # Die obersten Karten vom Deck auf die Hand geben
        for i in range(number_of_cards):
            hand.append(self.__deck.pop())
        return hand
```

Testen wir die Klasse:

```python
deck = DeckOfCards()
hand1 = deck.deal(5)
print(hand1)
hand2 = deck.deal(5)
print(hand2)
```

Da die Hände zufällig generiert werden, ist das Folgende nur ein Beispiel für eine mögliche Ausgabe:

<sample-output>

[('spades', 7), ('spades', 11), ('hearts', 7), ('diamonds', 3), ('spades', 4)]
[('clubs', 8), ('spades', 12), ('diamonds', 13), ('clubs', 11), ('spades', 10)]

</sample-output>

Private Methoden sind im Allgemeinen seltener als private Attribute. Als Faustregel gilt: Eine Methode sollte immer dann verborgen werden, wenn der Client keinen Grund hat, direkt auf sie zuzugreifen. Dies ist insbesondere dann der Fall, wenn es möglich ist, dass der Client durch den Aufruf der Methode die Integrität des Objekts beeinträchtigen könnte.

<programming-exercise name='Servicegebühr' tmcname='part09-12_service_charge'>

Bitte erstellen Sie eine Klasse namens `BankAccount`, die ein Bankkonto modelliert. Die Klasse sollte Folgendes enthalten:

* Einen Konstruktor, der den Namen des Besitzers (str), die Kontonummer (str) und den Kontostand (float) als Argumente entgegennimmt
* Eine Methode `deposit(amount: float)` zum Einzahlen von Geld auf das Konto
* Eine Methode `withdraw(amount: float)` zum Abheben von Geld vom Konto
* Eine Getter-Methode `balance`, die den Kontostand zurückgibt

Die Klasse sollte zudem die private Methode enthalten:

* `__service_charge()`, welche den Kontostand um ein Prozent verringert. Immer wenn eine der Methoden `deposit` oder `withdraw` aufgerufen wird, sollte auch diese Methode aufgerufen werden. Die Servicegebühr wird erst berechnet und abgezogen, nachdem die eigentliche Operation abgeschlossen ist (das heißt, nachdem der angegebene Betrag zum Kontostand hinzugefügt oder davon abgezogen wurde).

Alle Datenattribute innerhalb der Klassendefinition sollten privat sein.

Sie können den folgenden Code zum Testen Ihrer Klasse verwenden:

```python
account = BankAccount("Randy Riches", "12345-6789", 1000)
account.withdraw(100)
print(account.balance)
account.deposit(100)
print(account.balance)
```

<sample-output>

891.0
981.09

</sample-output>


</programming-exercise>
