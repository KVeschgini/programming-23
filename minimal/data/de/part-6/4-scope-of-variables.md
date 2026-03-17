---
path: '/part-6/4-scope-of-variables'
title: 'Lokale und globale Variablen'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, was mit einer lokalen Variable gemeint ist
- werden Sie wissen, wie der Gültigkeitsbereich (Scope) einer Variable beeinflusst, wie sie verwendet wird
- werden Sie wissen, was das Python-Schlüsselwort `global` bedeutet
- werden Sie in der Lage sein, lokale und globale Variablen in den richtigen Kontexten zu verwenden

</text-box>

Der _Gültigkeitsbereich_ (Scope) einer Variable bezieht sich auf die Abschnitte eines Programms, in denen eine Variable zugänglich ist. Eine _lokale_ Variable ist nur in einem definierten Abschnitt des Programms zugänglich, während eine _globale_ Variable für die Verwendung in jedem Abschnitt des Programms verfügbar ist.

## Lokale Variablen

Variablen, die innerhalb einer Python-Funktion definiert sind, sind lokale Variablen, die nur innerhalb der Funktion verfügbar sind. Dies gilt sowohl für Funktionsparameter als auch für andere Variablen, die innerhalb der Funktionsdefinition definiert wurden. Eine Variable, die lokal für eine Funktion ist, _existiert außerhalb der Funktion nicht_.

Im folgenden Beispiel versuchen wir, auf die Variable `x` im Hauptprogramm zuzugreifen, was jedoch einen Fehler verursacht:

```python
def testing():
    x = 5
    print(x)

testing()
print(x)
```

<sample-output>

5
NameError: name 'x' is not defined

</sample-output>

Die Variable `x` existiert nur, während die Funktion `testing` ausgeführt wird. Andere Funktionen oder das Hauptprogramm können nicht auf die Variable zugreifen.

## Globale Variablen

Variablen, die innerhalb des Hauptprogramms definiert sind, sind globale Variablen. Wir haben das Hauptprogramm zuvor als diejenigen Codeabschnitte in einem Python-Programm definiert, die nicht in eine andere Funktion fallen. Der in einer globalen Variable gespeicherte Wert kann von jeder anderen Funktion im Programm aufgerufen werden, sodass das Folgende keine Fehler verursacht:

```python
def testing():
    print(x)

x = 3
testing()
```

<sample-output>

3

</sample-output>

Eine globale Variable kann nicht direkt von innerhalb einer anderen Funktion geändert werden. Die folgende Funktion _hat keine Auswirkung_ auf den in der globalen Variable gespeicherten Wert:

```python
def testing():
    x = 5
    print(x)

x = 3
testing()
print(x)
```

<sample-output>

5
3

</sample-output>

Hier erstellt die Funktion `testing` eine _neue, lokale_ Variable `x`, die die globale Variable "maskiert", während die Funktion ausgeführt wird. Diese Variable hat den Wert 5, aber es ist eine andere Variable als das globale `x`, das im Hauptprogramm definiert ist.

Aber was würde der folgende Code tun?

```python
def testing():
    print(x)
    x = 5

x = 3
testing()
print(x)
```

<sample-output>

UnboundLocalError: local variable 'x' referenced before assignment

</sample-output>


Die Funktion `testing` weist der Variable `x` einen Wert zu, daher interpretiert Python `x` als lokale Variable statt als die globale Variable gleichen Namens. Die Funktion versucht, auf die Variable zuzugreifen, bevor sie definiert ist, was zu einem Fehler führt.

Wenn wir angeben möchten, dass wir die globale Variable innerhalb einer Funktion ändern wollen, benötigen wir das Python-Schlüsselwort `global`:

```python
def testing():
    global x
    x = 3
    print(x)

x = 5
testing()
print(x)
```

<sample-output>

3
3

</sample-output>

Nun wirkt sich die Zuweisung `x = 3` innerhalb der Funktion auch auf das Hauptprogramm aus. Alle Abschnitte des Programms verwenden dieselbe globale Variable `x`.

## Wann sollten Sie globale Variablen verwenden?

Globale Variablen sind kein Weg, um Funktionsparameter oder Rückgabewerte zu umgehen, und sie sollten nicht als solche verwendet werden. Das heißt, es ist zwar _möglich_, eine Funktion zu schreiben, die ihre Ergebnisse direkt in einer globalen Variable speichert:

```python
def calculate_sum(a, b):
    global result
    result = a + b

calculate_sum(2, 3)
print(result)
```

Es ist besser, eine Funktion mit einem Rückgabewert zu schreiben, wie wir es inzwischen gewohnt sind:

```python
def calculate_sum(a, b):
    return a + b

result = calculate_sum(2, 3)
print(result)
```

Der Vorteil des letzteren Ansatzes besteht darin, dass die Funktion ein _unabhängiges_ Ganzes ist. Sie hat bestimmte, definierte Parameter und gibt ein Ergebnis zurück. Sie hat keine Seiteneffekte, sodass sie unabhängig von den anderen Abschnitten des Programms getestet und geändert werden kann.

Globale Variablen sind in Situationen nützlich, in denen wir bestimmte gemeinsame Informationen auf "höherer Ebene" für alle Funktionen im Programm verfügbar machen müssen. Das Folgende ist ein Beispiel für eine solche Situation:

```python
def calculate_sum(a, b):
    global count
    count += 1
    return a + b

def calculate_difference(a, b):
    global count
    count += 1
    return a - b


count = 0
print(calculate_sum(2, 3))
print(calculate_sum(5, 5))
print(calculate_difference(5, 2))
print(calculate_sum(1, 0))
print("Es gab", count, "Funktionsaufrufe")
```

<sample-output>

5
10
3
1
Es gab 4 Funktionsaufrufe

</sample-output>

In diesem Fall möchten wir verfolgen, wie oft eine der Funktionen während der Ausführung des Programms aufgerufen wurde. Die globale Variable `count` ist hier nützlich, da wir sie direkt aus den Funktionen heraus erhöhen können, während sie ausgeführt werden, aber dennoch auf den Endwert im Hauptprogramm zugreifen können.

## Daten von einer Funktion an eine andere übergeben, revisited

<!--- siehe auch Abschnitt 4-6, einige signifikante Überschneidungen-->
Besteht ein Programm aus mehreren Funktionen, stellt sich oft die Frage nach der Datenübergabe von einer Funktion an eine andere.

Als wir dieses Thema [zuvor](/part-4/6-strings-and-lists#passing-data-from-one-function-to-another) angeschnitten haben, hatten wir ein Programm, das den Benutzer nach einigen Ganzzahlwerten fragt, diese ausdruckt und eine statistische Analyse der Zahlen durchführt. Das Programm war in drei separate Funktionen unterteilt:

```python
def input_from_user(how_many: int):
    print(f"Bitte geben Sie {how_many} Zahlen ein:")
    numbers = []

    for i in range(how_many):
        number = int(input(f"Zahl {i+1}: "))
        numbers.append(number)

    return numbers

def print_result(numbers: list):
    print("Die Zahlen sind: ")
    for number in numbers:
        print(number)

def analyze(numbers: list):
    mean = sum(numbers) / len(numbers)
    return f"Es sind insgesamt {len(numbers)} Zahlen, der Mittelwert ist {mean}, die kleinste ist {min(numbers)} und die größte ist {max(numbers)}"

# Das Hauptprogramm, das diese Funktionen nutzt
inputs = input_from_user(5)
print_result(inputs)
analysis_result = analyze(inputs)
print(analysis_result)
```

Ein Beispiel für die Ausführung des Programms:

<sample-output>

Bitte geben Sie 5 Zahlen ein:
Zahl 1: 10
Zahl 2: 34
Zahl 3: -32
Zahl 4: 99
Zahl 5: -53
Die Zahlen sind:
10
34
-32
99
-53
Es sind insgesamt 5 Zahlen, der Mittelwert ist 11.6, die kleinste ist -53 und die größte ist 99

</sample-output>

Das Grundprinzip hierbei ist, dass das Hauptprogramm die vom Programm verarbeiteten Daten "speichert". Hier bedeutet dies die vom Benutzer eingegebenen Zahlen, die in der Variable `inputs` gespeichert sind.

Werden die Zahlen in einer Funktion benötigt, wird die Variable als Argument übergeben, wie oben beim Aufruf der Funktionen `print_result` und `analyze` zu sehen ist. Produziert die Funktion ein Ergebnis, das an anderer Stelle im Programm relevant ist, gibt die Funktion dieses mit einer `return`-Anweisung zurück, wie oben bei den Funktionen `input_from_user` und `analyze` zu sehen ist.

Wie immer beim Programmieren gibt es viele Wege, um zur gleichen Funktionalität zu gelangen. Es wäre möglich, das Schlüsselwort `global` zu verwenden und die Funktionen direkt auf die im Hauptprogramm definierte Variable `inputs` zugreifen zu lassen. Es gibt jedoch gute Gründe, warum [dies kein kluger Schachzug ist](https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil). Wenn viele verschiedene Funktionen direkt auf eine Variable zugreifen und diese potenziell ändern können, wird es schnell unmöglich, den Zustand des Programms zuverlässig zu verfolgen, und das Programm läuft Gefahr, unvorhersehbar zu werden. Dies ist insbesondere dann der Fall, wenn die Anzahl der beteiligten Funktionen groß wird, wie es bei großen Softwareprojekten üblich ist.

Zusammenfassend lässt sich sagen, dass die Übergabe von Daten in Funktionen hinein und aus ihnen heraus am besten über Argumente und Rückgabewerte gehandhabt wird.

Sie könnten das implizite Hauptprogramm im obigen Beispiel auch in eine eigene, explizite `main`-Funktion separieren. Dann wäre die Variable `inputs` keine globale Variable mehr, sondern eine lokale Variable innerhalb der `main`-Funktion:

```python
# Ihre Hauptfunktion kommt hierhin
def main():
    inputs = input_from_user(5)
    print_result(inputs)
    analysis_result = analyze(inputs)

    print(analysis_result)

# Führe die Hauptfunktion aus
main()
```
