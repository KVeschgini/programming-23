---
path: '/part-11/4-more-recursion-examples'
title: 'Weitere Rekursionsbeispiele'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie mit Binärbäumen und einigen rekursiven Algorithmen zu deren Verarbeitung vertraut sein

</text-box>

Die wahren Vorteile der Rekursion werden deutlich, wenn wir auf Probleme stoßen, für die iterative Lösungen schwer zu schreiben sind. Betrachten wir zum Beispiel _Binärbäume_. Ein Binärbaum ist eine verzweigte Struktur, in der wir Knoten haben, und an jedem Knoten verzweigt sich die Struktur in höchstens zwei Kindzweige mit eigenen Knoten. Ein Binärbaum könnte dann so aussehen (die Informatik wird oft als Zweig der Naturwissenschaften betrachtet, aber unser Verständnis von Bäumen ist ein wenig auf dem Kopf gestellt, wie Sie bemerken werden):

<img src="11_4_1.png">

Binärbäume sollten zumindest theoretisch leicht rekursiv zu handhaben sein: Wenn wir eine Operation an jedem Knoten im Baum durchführen wollen, muss unser Algorithmus lediglich

1. den aktuellen Knoten verarbeiten
2. sich selbst für den Kindknoten auf der linken Seite aufrufen
3. sich selbst für den Kindknoten auf der rechten Seite aufrufen

<img src="11_4_2.png">

Wie Sie aus der obigen Abbildung ersehen können, sind sowohl der linke als auch der rechte "Teilbaum" selbst vollwertige Binärbäume, und der einzige Knoten, der außerhalb der rekursiven Aufrufe bleibt, ist der Elternknoten, der in Schritt 1 verarbeitet wird, bevor die Funktion rekursiv aufgerufen wird. So können wir sicher sein, dass nach Beendigung der Ausführung der Funktion jeder Knoten genau einmal besucht wurde.

Eine iterative Version einer Binärbaum-Traversierung wäre wesentlich komplizierter, da wir irgendwie den Überblick über alle Knoten behalten müssten, die wir bereits besucht haben. Dieselben Prinzipien gelten für alle rechnerischen Baumstrukturen, nicht nur für binäre.

Ein Binärbaum lässt sich auch in Python-Code leicht modellieren. Wir müssen lediglich eine Klassendefinition für einen einzelnen Knoten schreiben. Er verfügt über ein Attribut für den Wert sowie Attribute für den linken und rechten Kindknoten:

```python

class Node:
    """ Die Klasse repräsentiert einen einzelnen Knoten in einem Binärbaum """
    def __init__(self, value, left_child:'Node' = None, right_child:'Node' = None):
        self.value = value
        self.left_child = left_child
        self.right_child = right_child
```

Nehmen wir nun an, wir möchten den folgenden Baum modellieren:

<img src="11_4_3.png">

Dies könnten wir mit dem folgenden Code erreichen:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)
```

## Rekursive Binärbaum-Algorithmen

Werfen wir zunächst einen Blick auf einen Algorithmus, der alle Knoten in einem Binärbaum nacheinander ausgibt. In den folgenden Beispielen werden wir mit dem oben definierten Binärbaum arbeiten.

Das Argument für die Ausgabefunktion ist der Wurzelknoten (Root Node) des Binärbaums. Dies ist der Knoten ganz oben in unserer Abbildung. Alle anderen Knoten sind _Kinder_ dieses Knotens:

```python

def print_nodes(root: Node):
    print(root.value)

    if root.left_child is not None:
        print_nodes(root.left_child)

    if root.right_child is not None:
        print_nodes(root.right_child)

```

Die Funktion gibt den Wert des als Argument übergebenen Knotens aus und ruft sich dann selbst für den linken und rechten Kindknoten auf, sofern diese definiert sind. Dies ist ein sehr einfacher Algorithmus, der jedoch alle Knoten im Baum effizient und zuverlässig durchläuft, unabhängig von der Größe des Baums. Entscheidend ist, dass kein Knoten zweimal besucht wird. Jeder Wert wird nur einmal ausgegeben.

Wenn wir den Wurzelknoten `tree` des oben abgebildeten Binärbaums als Argument an die Funktion übergeben, gibt sie Folgendes aus:

<sample-output>

2
3
5
8
4
11

</sample-output>

Wie Sie an der Reihenfolge der Knoten im Ausdruck sehen können, bewegt sich der Algorithmus zuerst den "linken Schenkel" des Baums bis ganz nach unten und durchläuft von dort aus die anderen Knoten in der entsprechenden Reihenfolge.

In ähnlicher Weise können wir einen Algorithmus zur Berechnung der Summe aller in den Knoten des Baums gespeicherten Werte schreiben:

```python
def sum_of_nodes(root: Node):
    node_sum = root.value

    if root.left_child is not None:
        node_sum += sum_of_nodes(root.left_child)

    if root.right_child is not None:
        node_sum += sum_of_nodes(root.right_child)

    return node_sum
```

Die Variable `node_sum` wird so initialisiert, dass sie dem Wert des aktuellen Knotens entspricht. Der Wert in der Variablen wird dann durch rekursive Aufrufe der Knotensummen der linken und rechten Teilbäume erhöht (wobei natürlich zuerst sichergestellt wird, dass diese existieren). Dieses Ergebnis wird dann zurückgegeben.

<programming-exercise name='Größter Knoten' tmcname='part11-16_greatest_node'>

Bitte schreiben Sie eine Funktion namens `greatest_node(root: Node)`, die den Wurzelknoten eines Binärbaums als Argument entgegennimmt.

Die Funktion soll den Knoten mit dem größten Wert innerhalb des Baums zurückgeben. Der Baum soll rekursiv durchlaufen werden.

Hinweis: Die Funktion `sum_of_nodes` im obigen Beispiel könnte hilfreich sein.

Ein Beispiel für die Funktionsweise der Funktion:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)

    print(greatest_node(tree))
```

<sample-output>

11

</sample-output>

</programming-exercise>

## Ein sortierter Binärbaum

Ein Binärbaum ist besonders nützlich, wenn die Knoten auf eine bestimmte Weise sortiert sind. Dies macht das Finden von Knoten im Baum schnell und effizient.

Betrachten wir einen Baum, der wie folgt sortiert ist: Das linke Kind jedes Knotens ist kleiner als der Knoten selbst, und das rechte Kind ist entsprechend größer.

<img src="11_4_1.png">

Nun können wir einen rekursiven Algorithmus für die Suche nach Knoten schreiben. Die Idee ist der binären Suche aus dem vorangegangenen Abschnitt sehr ähnlich: Wenn der aktuelle Knoten der gesuchte Knoten ist, geben wir `True` zurück. Andernfalls fahren wir rekursiv mit dem linken oder dem rechten Kindbaum fort. Wenn der Knoten nicht definiert ist, geben wir `False` zurück.

```python
def find_node(root: Node, value):
    if root is None:
        return False

    if value == root.value:
        return True

    if value > root.value:
        return find_node(root.right_child, value)

    return find_node(root.left_child, value)
```

<programming-exercise name='Vorgesetzte und Untergebene' tmcname='part11-17_bosses_and_subordinates'>

Die Klasse `Employee` modelliert einen Mitarbeiter eines Unternehmens:

```python
class Employee:
    def __init__(self, name: str):
        self.name = name
        self.subordinates = []

    def add_subordinate(self, employee: 'Employee'):
        self.subordinates.append(employee)
```

Bitte schreiben Sie eine Funktion namens `count_subordinates(employee: Employee)`, die rekursiv die Anzahl der Untergebenen zählt, die jeder Mitarbeiter hat.

Ein Beispiel für die Funktion in Aktion:

```python
if __name__ == "__main__":
    t1 = Employee("Sally")
    t2 = Employee("Eric")
    t3 = Employee("Matthew")
    t4 = Employee("Emily")
    t5 = Employee("Adele")
    t6 = Employee("Claire")
    t1.add_subordinate(t4)
    t1.add_subordinate(t6)
    t4.add_subordinate(t2)
    t4.add_subordinate(t3)
    t4.add_subordinate(t5)
    print(count_subordinates(t1))
    print(count_subordinates(t4))
    print(count_subordinates(t5))
```

<sample-output>

5
3
0

</sample-output>

</programming-exercise>

## Rückblick auf die Zeit vor der Rekursion

Schließen wir diesen Teil des Materials mit einer etwas größeren Übung ab, die sich auf die Prinzipien der objektorientierten Programmierung konzentriert. Wir empfehlen, in dieser Aufgabenreihe keine Rekursion zu verwenden, aber Listen-Abstraktionstechniken werden nützlich sein.

<programming-exercise name='Auftragsbuch' tmcname='part11-18_order_book'>

In dieser Übung schreiben Sie zwei verschiedene Klassen, die wiederum das Rückgrat der darauf folgenden Programmierübung bilden, in der Sie eine interaktive Anwendung schreiben werden.

## Aufgabe

Bitte schreiben Sie eine Klasse namens `Task`, die eine einzelne Aufgabe in der Aufgabenliste eines Softwareunternehmens modelliert. Aufgaben haben
- eine Beschreibung
- eine Schätzung der für die Erledigung der Aufgabe erforderlichen Stunden
- den Namen des der Aufgabe zugewiesenen Programmierers
- ein Feld, um zu verfolgen, ob die Aufgabe abgeschlossen ist
- eine eindeutige Kennung (ID)

Die Klasse wird wie folgt verwendet:

```python
t1 = Task("program hello world", "Eric", 3)
print(t1.id, t1.description, t1.programmer, t1.workload)
print(t1)
print(t1.is_finished())
t1.mark_finished()
print(t1)
print(t1.is_finished())
t2 = Task("program webstore", "Adele", 10)
t3 = Task("program mobile app for workload accounting", "Eric", 25)
print(t2)
print(t3)
```

<sample-output>

1 program hello world Eric 3
1: program hello world (3 hours), programmer Eric NOT FINISHED
False
1: program hello world (3 hours), programmer Eric FINISHED
True
2: program webstore (10 hours), programmer Adele NOT FINISHED
3: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED

</sample-output>

Einige Klarstellungen:
- der Status der Aufgabe (abgeschlossen oder noch nicht abgeschlossen) kann mit der Funktion `is_finished(self)` überprüft werden, die einen booleschen Wert zurückgibt
- eine Aufgabe ist beim Erstellen nicht abgeschlossen
- eine Aufgabe wird durch Aufrufen der Methode `mark_finished(self)` als abgeschlossen markiert
- die ID einer Aufgabe ist eine laufende Nummer, die mit 1 beginnt. Die ID der ersten Aufgabe ist 1, die der zweiten 2 und so weiter.

**Hinweis**: `id` kann als [Klassenvariable](/part-9/5-class-attributes#class-variables) implementiert werden.

## OrderBook

Bitte schreiben Sie eine Klasse namens `OrderBook`, welche alle beim Softwareunternehmen bestellten Aufgaben sammelt. Die Aufgaben sollen mit der Klasse `Task` modelliert werden, die Sie gerade geschrieben haben.

Die Basisversion eines `OrderBook` wird wie folgt verwendet:

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)

for order in orders.all_orders():
    print(order)

print()

for programmer in orders.programmers():
    print(programmer)
```

<sample-output>

1: program webstore (10 hours), programmer Adele NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED

Adele
Eric

</sample-output>

In diesem Stadium sollte Ihr `OrderBook` drei Methoden bereitstellen:
- `add_order(self, description, programmer, workload)`, die dem `OrderBook` einen neuen Auftrag hinzufügt. Ein `OrderBook` speichert die Aufträge intern als `Task`-Objekte. Hinweis: Die Methode sollte genau die genannten Argumente entgegennehmen, da sonst die automatisierten Tests nicht korrekt funktionieren.
- `all_orders(self)` gibt eine Liste aller im `OrderBook` gespeicherten Aufgaben zurück
- `programmers(self)` gibt eine Liste der Namen aller Programmierer zurück, deren Aufgaben im `OrderBook` gespeichert sind. Die Liste sollte jeden Programmierer nur einmal enthalten.

**Hinweis:** Eine einfache Methode zum Entfernen von Duplikaten besteht darin, die Liste zunächst als [Set](https://docs.python.org/3.8/library/stdtypes.html#set) (Menge) zu behandeln. Ein Set ist eine Sammlung von Elementen, in der jedes eindeutige Element nur einmal vorkommt. Ein `set` kann dann wieder in eine Liste umgewandelt werden, und wir können sicher sein, dass jedes Element nun eindeutig ist:

```python
my_list = [1,1,3,6,4,1,3]
my_list2 = list(set(my_list))
print(my_list)
print(my_list2)
```

<sample-output>

[1, 1, 3, 6, 4, 1, 3]
[1, 3, 4, 6]

</sample-output>

## Einige weitere Funktionen für OrderBook

Bitte schreiben Sie drei weitere Methoden in Ihrer `OrderBook`-Klasse.

Die Methode `mark_finished(self, id: int)` nimmt die ID der Aufgabe als Argument entgegen und markiert die entsprechende Aufgabe als abgeschlossen:

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)

orders.mark_finished(1)
orders.mark_finished(2)

for order in orders.all_orders():
    print(order)
```

<sample-output>

1: program webstore (10 hours), programmer Adele FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED

</sample-output>

Wenn es keine Aufgabe mit der angegebenen ID gibt, sollte die Methode eine `ValueError`-Ausnahme auslösen. Wenn Sie eine Auffrischung zum Auslösen von Ausnahmen benötigen, werfen Sie bitte einen Blick auf [Teil 6](/part-6/3-errors#raising-exceptions).

Die Methoden `finished_orders(self)` und `unfinished_orders(self)` funktionieren wie erwartet: Beide geben eine Liste zurück, welche die entsprechenden Aufgaben aus dem `OrderBook` enthält.

## Letzter Schliff für OrderBook

Bitte schreiben Sie eine letzte Methode in Ihrer `OrderBook`-Klasse: `status_of_programmer(self, programmer: str)`, die ein _Tupel_ zurückgibt. Das Tupel sollte die Anzahl der abgeschlossenen und nicht abgeschlossenen Aufgaben enthalten, die dem Programmierer zugewiesen sind, zusammen mit den geschätzten Stunden in beiden Kategorien.

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Adele", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)
orders.add_order("program the next facebook", "Eric", 1000)

orders.mark_finished(1)
orders.mark_finished(2)

status = orders.status_of_programmer("Adele")
print(status)
```

<sample-output>

(2, 1, 35, 100)

</sample-output>

Das erste Element im Tupel ist die Anzahl der _abgeschlossenen_ Aufgaben, während das zweite Element die Anzahl der _nicht abgeschlossenen_ Aufgaben ist. Das dritte und vierte Element sind die Summen der Arbeitsaufwandsschätzungen für die abgeschlossenen bzw. nicht abgeschlossenen Aufgaben.

Wenn es keinen Programmierer mit dem angegebenen Namen gibt, sollte die Methode eine `ValueError`-Ausnahme auslösen.

</programming-exercise>

<programming-exercise name='Auftragsbuch-Anwendung' tmcname='part11-19_order_book_application'>

In dieser Übung erstellen Sie eine interaktive Anwendung zur Verwaltung der bei einem Softwareunternehmen bestellten Aufgaben. Die Implementierung bleibt ganz Ihnen überlassen, aber Sie können die Bausteine aus der vorangegangenen Übung in Ihrer Anwendung verwenden. Auch die Beispiele im [letzten Abschnitt von Teil 10](/part-10/4-application-development) können sich als nützlich erweisen.

## Ohne Fehlerbehandlung

Die Anwendung sollte _genau_ wie folgt funktionieren:

<sample-output>

Befehle:
0 Beenden
1 Auftrag hinzufügen
2 abgeschlossene Aufgaben auflisten
3 nicht abgeschlossene Aufgaben auflisten
4 Aufgabe als abgeschlossen markieren
5 Programmierer
6 Status des Programmierers

Befehl: **1**
Beschreibung: **program the next facebook**
Programmierer und Arbeitsaufwandsschätzung: **jonah 1000**
hinzugefügt!

Befehl: **1**
Beschreibung: **program mobile app for workload accounting**
Programmierer und Arbeitsaufwandsschätzung: **eric 25**
hinzugefügt!

Befehl: **1**
Beschreibung: **program an app for music theory revision**
Programmierer und Arbeitsaufwandsschätzung: **nina 12**
hinzugefügt!

Befehl: **1**
Beschreibung: **program the next twitter**
Programmierer und Arbeitsaufwandsschätzung: **jonah 55**
hinzugefügt!

Befehl: **2**
keine abgeschlossenen Aufgaben

Befehl: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer eric NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED
4: program the next twitter (55 hours), programmer jonah NOT FINISHED

Befehl: **4**
ID: **2**
als abgeschlossen markiert

Befehl: **4**
ID: **4**
als abgeschlossen markiert

Befehl: **2**
2: program mobile app for workload accounting (25 hours), programmer eric FINISHED
4: program the next twitter (55 hours), programmer jonah FINISHED

Befehl: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED

Befehl: **5**
jonah
eric
nina

Befehl: **6**
Programmierer: **jonah**
Aufgaben: abgeschlossen 2 nicht abgeschlossen 1, Stunden: erledigt 55 geplant 1000

</sample-output>

Der erste Übungspunkt wird für eine funktionierende Anwendung vergeben, wenn alle Benutzereingaben fehlerfrei sind.

## Umgang mit Fehlern bei Benutzereingaben

Um den zweiten Übungspunkt für diese Übung zu erhalten, wird von Ihrer Anwendung erwartet, dass sie sich von fehlerhaften Benutzereingaben erholt. Jede Eingabe, die nicht dem angegebenen Format entspricht, sollte eine Fehlermeldung _fehlerhafte Eingabe_ erzeugen und zu einer erneuten Wiederholung der Schleife führen, in der nach einem neuen Befehl gefragt wird:

<sample-output>

Befehl: **1**
Beschreibung: **program mobile app for workload accounting**
Programmierer und Arbeitsaufwandsschätzung: **eric xxx**
fehlerhafte Eingabe

Befehl: **1**
Beschreibung: **program mobile app for workload accounting**
Programmierer und Arbeitsaufwandsschätzung: **eric**
fehlerhafte Eingabe

Befehl: **4**
ID: **1000000**
fehlerhafte Eingabe

Befehl: **4**
ID: **XXXX**
fehlerhafte Eingabe

Befehl: **6**
Programmierer: **unbekannterprogrammierer**
fehlerhafte Eingabe

</sample-output>

</programming-exercise>
