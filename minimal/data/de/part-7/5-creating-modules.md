---
path: '/part-7/5-creating-modules'
title: 'Eigene Module erstellen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie in der Lage sein, Ihre eigenen Module zu schreiben
- werden Sie wissen, was die Python-Variable `__name__` und der Wert `__main__` bedeuten

</text-box>

Das Schreiben eigener Python-Module ist einfach. Jede Datei, die gültigen Python-Code enthält, kann als Modul importiert werden. Nehmen wir an, wir haben eine Datei namens `words.py` mit folgendem Inhalt:

```python
def first_word(my_string: str):
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str):
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str):
    parts = my_string.split(" ")
    return len(parts)
```

Auf die in der Datei definierten Funktionen kann durch Importieren der Datei zugegriffen werden:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

Sheila
seashore
6

</sample-output>

Hinweis: Die Datei, die das Python-Modul enthält, muss sich entweder im selben Verzeichnis wie das Programm befinden, das sie importiert, oder in einem der Standard-Python-Verzeichnisse, da der Python-Interpreter sie sonst beim Ausführen der `import`-Anweisung nicht findet.

Wir können unsere eigenen Module genau so verwenden, wie wir gelernt haben, die Module aus der Python-Standardbibliothek zu verwenden:

```python
from words import first_word, last_word

sentence = input("Bitte geben Sie einen Satz ein: ")

print("Das erste Wort war: " + first_word(sentence))
print("Das letzte Wort war: " + last_word(sentence))
```

<sample-output>

Bitte geben Sie einen Satz ein: **Python is a swell programming language**
Das erste Wort war: Python
Das letzte Wort war: language

</sample-output>

## Typ-Hinweise nutzen

Bei der Verwendung von Modulen werden Typ-Hinweise (Type Hints) besonders nützlich. Wenn Sie einen Editor verwenden, der Typ-Hinweise nativ unterstützt, wird die Verwendung verschiedener Module viel einfacher.

Zum Beispiel zeigt Visual Studio Code die Typ-Hinweise an, während Sie Code schreiben:

<img src="7_vihje.png">

## Hauptfunktionscode in einem Modul

Wenn ein Modul Code enthält, der nicht innerhalb einer Funktionsdefinition steht (das heißt, wenn das Modul Code in der Hauptfunktion des Moduls enthält), wird dieser Code automatisch ausgeführt, wann immer das Modul importiert wird.

Nehmen wir an, unsere Datei `words.py` enthielte auch einige Testfälle:

```python
def first_word(my_string: str):
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str):
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str):
    parts = my_string.split(" ")
    return len(parts)

print(first_word("This is a test"))
print(last_word("Here we are still testing"))
print(number_of_words("One two three four five"))
```

Wenn wir das Modul nun mit einer `import`-Anweisung importieren, wird der gesamte Code im Modul, der außerhalb der definierten Funktionen steht, automatisch ausgeführt:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

This
testing
5
Sheila
seashore
6

</sample-output>

Wie Sie oben sehen können, ist dies kein gutes Ergebnis, da das Programm, das wir zu schreiben versuchen, durch die Testfälle aus dem Modul selbst gestört wird.

Glücklicherweise gibt es eine Lösung, und es ist eine, die Sie in den Übungen dieses Kurses schon oft verwendet haben. Wir müssen nur prüfen, ob das Programm eigenständig ausgeführt wird oder ob der Code mit einer `import`-Anweisung importiert wurde. Python verfügt über eine integrierte Variable `__name__`, die den Namen des ausgeführten Programms enthält. Wenn das Programm eigenständig ausgeführt wird, ist der Wert der Variable `__main__`. Wenn das Programm importiert wurde, ist der Wert der Variable der Name des importierten Moduls (in diesem Fall `words`).

Mit diesem Wissen können wir eine bedingte Anweisung hinzufügen, die es uns ermöglicht, die Testfälle nur dann auszuführen, wenn das Programm eigenständig ausgeführt wird. Wie Sie unten sehen können, sieht die Struktur vertraut aus:

```python
def first_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str) -> int:
    parts = my_string.split(" ")
    return len(parts)

if __name__ == "__main__":
    # Testfunktionalität
    print(first_word("This is a test"))
    print(last_word("Here we are still testing"))
    print(number_of_words("One two three four five"))
```

Wenn Sie das Modul eigenständig ausführen, werden die Testfälle ausgedruckt:

<sample-output>

This
testing
5

</sample-output>

Wenn das Modul in ein anderes Programm importiert wird, werden die Testfälle nicht ausgeführt:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

Sheila
seashore
6

</sample-output>

In den Übungen dieses Kurses wurde von Ihnen, wann immer Sie Funktionen schreiben sollten, normalerweise auch erwartet, dass Sie Testfälle in einen `if __name__ == "__main__"`-Block einwickeln, genau wie den oben gezeigten. Jetzt wissen Sie, warum.

<programming-exercise name='String-Helfer' tmcname='part07-17_string_helper'>

Bitte schreiben Sie ein Modul namens `string_helper`, das die folgenden Funktionen enthält:

Die Funktion `change_case(orig_string: str)` erstellt eine neue Version des Parameter-Strings und gibt diese zurück. Die Kleinbuchstaben im Original sollen Großbuchstaben sein und die Großbuchstaben Kleinbuchstaben.

Die Funktion `split_in_half(orig_string: str)` teilt den Parameter-String in der Mitte und gibt die Ergebnisse in einem Tuple zurück. Wenn das Original eine ungerade Anzahl von Zeichen hat, soll die erste Hälfte kürzer sein.

Die Funktion `remove_special_characters(orig_string: str)` gibt eine neue Version des Parameter-Strings zurück, aus der alle Sonderzeichen entfernt wurden. Nur Klein- und Großbuchstaben, Zahlen und Leerzeichen sind im zurückgegebenen String erlaubt.

Einige Beispiele für die Verwendung des Moduls:

```python
import string_helper

my_string = "Well hello there!"

print(string_helper.change_case(my_string))

p1, p2 = string_helper.split_in_half(my_string)

print(p1)
print(p2)

m2 = string_helper.remove_special_characters("This is a test, lets see how it goes!!!11!")
print(m2)
```

<sample-output>

wELL HELLO THERE!
Well hel
lo there!
This is a test lets see how it goes11

</sample-output>

</programming-exercise>
