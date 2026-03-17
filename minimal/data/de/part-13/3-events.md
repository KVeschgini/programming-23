---
path: '/part-13/3-events'
title: 'Ereignisse'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie mit Pygame-Ereignissen (Events) vertraut sein
- werden Sie in der Lage sein, ein Programm zu schreiben, das auf Tastendrücke reagiert
- werden Sie in der Lage sein, ein Programm zu schreiben, das auf Mausereignisse reagiert

</text-box>

Bisher haben unsere Hauptschleifen nur vorgegebene Animationen ausgeführt und nur auf Ereignisse vom Typ `pygame.QUIT` reagiert, obwohl die Schleife eine Liste aller Ereignisse vom Betriebssystem erhält. Machen wir uns also mit einigen anderen Arten von Ereignissen vertraut.

## Ereignisbehandlung

Dieses Programm gibt Informationen über alle Ereignisse aus, die das Betriebssystem während der Laufzeit an das Pygame-Programm übergibt:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        print(event)
        if event.type == pygame.QUIT:
            exit()
```

Nehmen wir an, das Programm wurde eine Weile laufen gelassen und dann wurde auf die Schaltfläche zum Beenden geklickt. Das Programm gibt die folgenden Informationen aus:

```x
<Event(4-MouseMotion {'pos': (495, 274), 'rel': (495, 274), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (494, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (492, 274), 'rel': (-2, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (491, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(5-MouseButtonDown {'pos': (491, 274), 'button': 1, 'window': None})>
<Event(6-MouseButtonUp {'pos': (491, 274), 'button': 1, 'window': None})>
<Event(2-KeyDown {'unicode': 'a', 'key': 97, 'mod': 0, 'scancode': 38, 'window': None})>
<Event(3-KeyUp {'key': 97, 'mod': 0, 'scancode': 38, 'window': None})>
<Event(2-KeyDown {'unicode': 'b', 'key': 98, 'mod': 0, 'scancode': 56, 'window': None})>
<Event(3-KeyUp {'key': 98, 'mod': 0, 'scancode': 56, 'window': None})>
<Event(2-KeyDown {'unicode': 'c', 'key': 99, 'mod': 0, 'scancode': 54, 'window': None})>
<Event(3-KeyUp {'key': 99, 'mod': 0, 'scancode': 54, 'window': None})>
<Event(12-Quit {})>
```

Die ersten Ereignisse betreffen die Mausnutzung, dann folgen einige Ereignisse von der Tastatur und schließlich das letzte Ereignis, welches das Programm schließt. Jedes Ereignis hat mindestens einen Typ, kann aber auch andere identifizierende Informationen bieten, wie die Position des Mauszeigers oder die gedrückte Taste.

Sie können nach Ereignisbeschreibungen in der [Pygame-Dokumentation](https://www.pygame.org/docs/ref/event.html) suchen, aber es kann manchmal einfacher sein, Ereignisse mit dem obigen Code auszugeben und nach dem Ereignis zu suchen, das eintritt, wenn etwas passiert, auf das Sie reagieren möchten.

## Tastaturereignisse

Dieses Programm kann Ereignisse verarbeiten, bei denen der Benutzer die Pfeiltaste nach rechts oder links auf seiner Tastatur drückt. Das Programm gibt aus, welche Taste gedrückt wurde.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                print("links")
            if event.key == pygame.K_RIGHT:
                print("rechts")

        if event.type == pygame.QUIT:
            exit()
```

Die Konstanten `pygame.K_LEFT` und `pygame.K_RIGHT` beziehen sich auf die Pfeiltasten nach links und rechts. Die Pygame-Tastenkonstanten für die verschiedenen Tasten einer Tastatur sind in der [Pygame-Dokumentation](https://www.pygame.org/docs/ref/key.html#key-constants-label) aufgeführt.

Wenn der Benutzer beispielsweise zweimal die Pfeiltaste nach rechts drückt, dann einmal die linke und dann noch einmal die rechte, gibt das Programm Folgendes aus:

```x
rechts
rechts
links
rechts
```

Wir haben nun alle Werkzeuge, die wir benötigen, um einen Charakter oder _Sprite_ auf dem Bildschirm mit den Pfeiltasten nach rechts und links zu bewegen. Der folgende Code erreicht dies:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")
x = 0
y = 480-robot.get_height()

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                x -= 10
            if event.key == pygame.K_RIGHT:
                x += 10

        if event.type == pygame.QUIT:
            exit()

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()
```

Je nachdem, wie Sie Ihre Pfeiltasten verwenden, könnte das Ausführen des Programms so aussehen:

<img src="pygame_move_robot.gif">

Im obigen Code haben wir die Variablen `x` und `y`, welche die Koordinatenposition für das Sprite enthalten. Die Variable `y` ist so eingestellt, dass das Sprite am unteren Rand des Fensters erscheint. Der `y`-Wert ändert sich während der Ausführung des Programms nicht. Der `x`-Wert erhöht sich jedoch um 10, wann immer der Benutzer die Pfeiltaste nach rechts drückt, und verringert sich um 10, wann immer die linke Pfeiltaste gedrückt wird.

Das Programm funktioniert ansonsten recht gut, aber die Taste muss jedes Mal neu gedrückt werden, wenn wir uns wieder bewegen wollen. Es wäre besser, wenn die Bewegung kontinuierlich wäre, solange die Taste gedrückt gehalten wird. Das folgende Programm bietet diese Funktionalität:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")
x = 0
y = 480-robot.get_height()

to_right = False
to_left = False

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                to_left = True
            if event.key == pygame.K_RIGHT:
                to_right = True

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT:
                to_left = False
            if event.key == pygame.K_RIGHT:
                to_right = False

        if event.type == pygame.QUIT:
            exit()

    if to_right:
        x += 2
    if to_left:
        x -= 2

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()

    clock.tick(60)
```

Der Code enthält nun die Variablen `to_right` und `to_left`. Diese speichern die Information, ob sich das Sprite in jedem Moment nach rechts oder links bewegen soll. Wenn der Benutzer eine Pfeiltaste drückt, wird der in der entsprechenden Variablen gespeicherte Wert `True`. Wenn die Taste losgelassen wird, ändert sich der Wert auf `False`.

Die Uhr wird verwendet, um die Bewegungen des Sprites zeitlich abzustimmen, sodass sie potenziell 60 Mal pro Sekunde stattfinden. Wenn eine Pfeiltaste gedrückt wird, bewegt sich das Sprite um zwei Pixel nach rechts oder links. Das bedeutet, dass sich das Sprite bei gedrückter Taste um 120 Pixel pro Sekunde bewegt.

<programming-exercise name='Vier Richtungen' tmcname='part13-11_four_directions'>

Bitte schreiben Sie ein Programm, bei dem der Spieler einen Roboter mit den Pfeiltasten auf der Tastatur in vier Richtungen bewegen kann. Das Endergebnis sollte so aussehen:

<img src="pygame_four_directions.gif">

</programming-exercise>

<programming-exercise name='Vier Wände' tmcname='part13-12_four_walls'>

Bitte verbessern Sie das Programm aus der vorherigen Übung so, dass der Roboter das Fenster in keine der vier Richtungen verlassen kann. Das Endergebnis sollte so aussehen:

<img src="pygame_four_walls.gif">

</programming-exercise>

<programming-exercise name='Zwei Spieler' tmcname='part13-13_two_players'>

Bitte schreiben Sie ein Programm, bei dem zwei Spieler jeweils ihren eigenen Roboter steuern. Einer der Spieler sollte die Pfeiltasten verwenden, während der andere beispielsweise die Tasten W-S-A-D verwenden könnte. Das Endergebnis sollte so aussehen:

<img src="pygame_two_players.gif">

</programming-exercise>

## Mausereignisse

Der folgende Code reagiert auf Ereignisse, bei denen eine Maustaste gedrückt wird, während sich der Zeiger innerhalb des Fensterbereichs befindet:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            print("Sie haben die Taste Nummer", event.button, "an der Position", event.pos, "gedrückt")

        if event.type == pygame.QUIT:
            exit()
```

Die Ausführung dieses Programms sollte in etwa so aussehen:

```x
Sie haben die Taste Nummer 1 an der Position (82, 135) gedrückt
Sie haben die Taste Nummer 1 an der Position (369, 135) gedrückt
Sie haben die Taste Nummer 1 an der Position (269, 297) gedrückt
Sie haben die Taste Nummer 3 an der Position (515, 324) gedrückt
```

Taste Nummer 1 bezieht sich auf die linke Maustaste und Taste Nummer 3 auf die rechte Maustaste.

Dieses nächste Programm kombiniert die Behandlung von Mausereignissen mit dem Zeichnen eines Bildes auf dem Bildschirm. Wenn der Benutzer eine Maustaste drückt, während sich der Mauszeiger innerhalb der Grenzen des Fensters befindet, wird an dieser Stelle ein Bild eines Roboters gezeichnet.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            x = event.pos[0]-robot.get_width()/2
            y = event.pos[1]-robot.get_height()/2

            window.fill((0, 0, 0))
            window.blit(robot, (x, y))
            pygame.display.flip()

        if event.type == pygame.QUIT:
            exit()
```

Die Ausführung des Programms könnte so aussehen:

<img src="pygame_cursor.gif">

Das folgende Programm enthält eine Animation, bei der das Roboter-Sprite dem Mauszeiger folgt. Die Position des Sprites wird in den Variablen `robot_x` und `robot_y` gespeichert. Wenn sich die Maus bewegt, wird ihre Position in den Variablen `target_x` und `target_y` gespeichert. Wenn sich der Roboter nicht an dieser Position befindet, bewegt er sich in die entsprechende Richtung.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

robot_x = 0
robot_y = 0
target_x = 0
target_y = 0

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEMOTION:
            target_x = event.pos[0]-robot.get_width()/2
            target_y = event.pos[1]-robot.get_height()/2

        if event.type == pygame.QUIT:
            exit(0)

    if robot_x > target_x:
        robot_x -= 1
    if robot_x < target_x:
        robot_x += 1
    if robot_y > target_y:
        robot_y -= 1
    if robot_y < target_y:
        robot_y += 1

    window.fill((0, 0, 0))
    window.blit(robot, (robot_x, robot_y))
    pygame.display.flip()

    clock.tick(60)
```

Die Ausführung des Programms sollte in etwa so aussehen:

<img src="pygame_cursor2.gif">

<programming-exercise name='Roboter und Maus' tmcname='part13-14_robot_and_mouse'>

Bitte schreiben Sie ein Programm, bei dem der Roboter dem Mauszeiger so folgt, dass sich die Mitte des Roboters immer direkt am Mauszeiger befindet. Das Endergebnis sollte so aussehen:

<img src="pygame_robot_cursor.gif">

</programming-exercise>

<programming-exercise name='Die Position des Roboters' tmcname='part13-15_robot_location'>

Bitte schreiben Sie ein Programm, bei dem der Roboter an einer zufälligen Stelle im Fenster erscheint. Wenn der Spieler mit der Maus auf den Roboter klickt, bewegt sich der Roboter an eine neue Stelle. Das Endergebnis sollte so aussehen:

<img src="pygame_robot_location.gif">

</programming-exercise>
