---
path: '/part-10/2-access-modifiers'
title: 'Zugriffsmodifikatoren'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- Verstehen Sie die Zugriffsmodifikatoren privat und geschützt (protected)
- Wissen Sie, wie die Sichtbarkeit von Merkmalen in Python bestimmt wird

</text-box>

Wenn ein Merkmal in der Basisklasse als privat definiert ist, ist es in abgeleiteten Klassen nicht direkt zugänglich, wie im vorherigen Abschnitt kurz erwähnt wurde. Schauen wir uns ein Beispiel an. In der Klasse `Notebook` unten werden die Notizen in einer Liste gespeichert, und das Listenattribut ist privat:

```python
class Notebook:
    """ Ein Notebook speichert Notizen im String-Format """

    def __init__(self):
        # Privates Attribut
        self.__notes = []

    def add_note(self, note):
        self.__notes.append(note)

    def retrieve_note(self, index):
        return self.__notes[index]

    def all_notes(self):
        return ",".join(self.__notes)
```

Wenn die Integrität der Klasse entscheidend ist, ist es sinnvoll, das Listenattribut `notes` privat zu machen. Die Klasse bietet dem Client schließlich geeignete Methoden zum Hinzufügen und Durchsuchen von Notizen an. Dieser Ansatz wird problematisch, wenn wir eine neue Klasse `NotebookPro` definieren, die von der Klasse `Notebook` erbt. Das private Listenattribut ist für den Client nicht zugänglich, aber ebenso wenig für die abgeleiteten Klassen. Wenn wir versuchen, darauf zuzugreifen, wie in der Methode `find_notes` unten, erhalten wir einen Fehler:

```python
class NotebookPro(Notebook):
    """ Ein besseres Notebook mit Suchfunktion """
    def __init__(self):
        # Dies ist OK, der Konstruktor ist trotz der Unterstriche öffentlich
        super().__init__()

    # Dies verursacht einen Fehler
    def find_notes(self, search_term):
        found = []
        # Das Attribut __notes ist privat
        # Die abgeleitete Klasse kann nicht direkt darauf zugreifen
        for note in self.__notes:
            if search_term in note:
                found.append(note)

        return found
```

<sample-output>

AttributeError: 'NotebookPro' object has no attribute '_NotebookPro__notes'

</sample-output>

## Geschützte Merkmale (Protected)

Viele objektorientierte Programmiersprachen verfügen über eine Funktion, meist ein spezielles Schlüsselwort, zum _Schützen_ (Protecting) von Merkmalen. Dies bedeutet, dass ein Merkmal vor den Clients der Klasse verborgen bleiben soll, aber für ihre Unterklassen zugänglich bleibt. Da Python im Allgemeinen Schlüsselwörter ablehnt, ist eine solche Funktion in Python nicht direkt verfügbar. Stattdessen gibt es eine _Konvention_, geschützte Merkmale auf eine bestimmte Weise zu kennzeichnen.

Denken Sie daran, dass ein Merkmal verborgen werden kann, indem seinem Namen zwei Unterstriche vorangestellt werden:

```python
def __init__(self):
    self.__notes = []
```

Die vereinbarte Konvention zum _Schützen_ eines Merkmals besteht darin, dem Namen einen _einzelnen_ Unterstrich voranzustellen. Dies ist _nur_ eine Konvention. Nichts hindert einen Programmierer daran, die Konvention zu brechen, aber es gilt als schlechte Programmierpraxis.

```python
def __init__(self):
    self._notes = []
```

Unten sehen Sie das vollständige Notebook-Beispiel mit geschütztem `_notes` anstelle von privatem `__notes`:

```python
class Notebook:
    """ Ein Notebook speichert Notizen im String-Format """

    def __init__(self):
        # Geschütztes Attribut
        self._notes = []

    def add_note(self, note):
        self._notes.append(note)

    def retrieve_note(self, index):
        return self._notes[index]

    def all_notes(self):
        return ",".join(self._notes)

class NotebookPro(Notebook):
    """ Ein besseres Notebook mit Suchfunktion """
    def __init__(self):
        # Dies ist OK, der Konstruktor ist trotz der Unterstriche öffentlich
        super().__init__()

    # Dies funktioniert, das geschützte Attribut ist für die abgeleitete Klasse zugänglich
    def find_notes(self, search_term):
        found = []
        for note in self._notes:
            if search_term in note:
                found.append(note)

        return found
```

Unten finden Sie eine praktische Tabelle zur Sichtbarkeit von Attributen mit verschiedenen Zugriffsmodifikatoren:

Zugriffsmodifikator | Beispiel | Sichtbar für Client | Sichtbar für abgeleitete Klasse
:--------:|:-------------:|:---:|:----:
Öffentlich (Public) | `self.name` | ja | ja
Geschützt (Protected) | `self._name` | nein | ja
Privat (Private) | `self.__name` | nein | nein

Zugriffsmodifikatoren funktionieren bei allen Merkmalen gleich. In der Klasse `Person` unten haben wir beispielsweise die geschützte Methode `capitalize_initials`. Sie kann von der abgeleiteten Klasse `Footballer` verwendet werden:

```python
class Person:
    def __init__(self, name: str):
        self._name = self._capitalize_initials(name)

    def _capitalize_initials(self, name):
        name_capitalized = []
        for n in name.split(" "):
            name_capitalized.append(n.capitalize())

        return " ".join(name_capitalized)

    def __repr__(self):
        return self.__name

class Footballer(Person):

    def __init__(self, name: str, nickname: str, position: str):
        super().__init__(name)
        # Die Methode ist verfügbar, da sie in der Basisklasse geschützt ist
        self.__nickname = self._capitalize_initials(nickname)
        self.__position = position

    def __repr__(self):
        r = f"Footballer - name: {self._name}, nickname: {self.__nickname}"
        r += f", position: {self.__position}"
        return r

# Klassen testen
if __name__ == "__main__":
    jp = Footballer("peter pythons", "pyper", "Stürmer")
    print(jp)
```

<sample-output>

Footballer - name: Peter Pythons, nickname: Pyper, position: Stürmer

</sample-output>


<programming-exercise name='Supergruppe' tmcname='part10-05_supergroup'>

Die Aufgabenvorlage enthält die Klassendefinition für einen `SuperHero`.

Bitte definieren Sie eine Klasse namens `SuperGroup`, die eine Gruppe von Superhelden repräsentiert. Die Klasse sollte die folgenden Mitglieder enthalten:

* **Geschützte** Attribute name (str), location (str) und members (list)
* Einen Konstruktor, der den Namen und den Standort der Gruppe als Argumente in dieser Reihenfolge entgegennimmt
* Getter-Methoden für die Attribute name und location
* Eine Methode namens `add_member(hero: SuperHero)`, die der Gruppe ein neues Mitglied hinzufügt
* Eine Methode namens `print_group`, die Informationen über die Gruppe und ihre Mitglieder im unten angegebenen Format ausgibt

Ein Beispiel für die Klasse in Aktion:

```python
superperson = SuperHero("SuperPerson", "Supergeschwindigkeit, Superstärke")
invisible = SuperHero("Invisible Inca", "Unsichtbarkeit")
revengers = SuperGroup("Revengers", "Emerald City")

revengers.add_member(superperson)
revengers.add_member(invisible)
revengers.print_group()
```

<sample-output>

Revengers, Emerald City
Members:
SuperPerson, superpowers: Supergeschwindigkeit, Superstärke
Invisible Inca, superpowers: Unsichtbarkeit

</sample-output>

Falls Sie eine Auffrischung zu Getter- und Setter-Methoden benötigen, schauen Sie sich bitte [diesen Abschnitt im vorherigen Teil](/part-9/3-encapsulation#getter-und-setter) des Materials an.

</programming-exercise>

<programming-exercise name='Geheimer Zaubertrank' tmcname='part10-06_secret_magic_potion'>

Die Aufgabenvorlage enthält die Klassendefinition für einen `MagicPotion`, mit dem Sie ein Rezept für einen Zaubertrank speichern können. Die Klassendefinition enthält einen Konstruktor sowie die Methoden

* `add_ingredient(ingredient: str, amount: float)` und
* `print_recipe()`

Bitte definieren Sie eine Klasse namens `SecretMagicPotion`, die von der Klasse `MagicPotion` erbt und es ermöglicht, das Rezept zusätzlich mit einem Passwort zu schützen.

Die neue Klasse sollte einen Konstruktor haben, der zusätzlich den Passwort-String als Argument entgegennimmt.

Die Klasse sollte zudem die folgenden Methoden enthalten:

* `add_ingredient(ingredient: str, amount: float, password: str)`
* `print_recipe(password: str)`

Wenn das Passwort-Argument, das einer dieser Methoden übergeben wird, falsch ist, sollten die Methoden eine `ValueError`-Ausnahme auslösen.

Wenn das Passwort korrekt ist, sollte jede Methode die entsprechende Methode in der Elternklasse aufrufen. Kopieren Sie nichts aus der Klasse `MagicPotion`.

Ein Beispiel für die Funktionsweise:

```python
diminuendo = SecretMagicPotion("Diminuendo maximus", "hocuspocus")
diminuendo.add_ingredient("Fliegenpilz", 1.5, "hocuspocus")
diminuendo.add_ingredient("Zaubersand", 3.0, "hocuspocus")
diminuendo.add_ingredient("Froschlaich", 4.0, "hocuspocus")
diminuendo.print_recipe("hocuspocus")

diminuendo.print_recipe("pocushocus") # FALSCHES Passwort!
```

<sample-output>

Diminuendo maximus:
Fliegenpilz 1.5 Gramm
Zaubersand 3.0 Gramm
Froschlaich 4.0 Gramm
Traceback (most recent call last):
  File "secret_magic_potion.py", line 98, in <module>
    raise ValueError("Falsches Passwort!")
ValueError: Falsches Passwort!

</sample-output>

</programming-exercise>
