---
path: '/part-13/2-animation'
title: 'Animation'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man eine Animation mit Pygame erstellt
- werden Sie in der Lage sein, eine Uhr (Clock) zu verwenden, um die Geschwindigkeit Ihres Programms festzulegen
- werden Sie in der Lage sein, grundlegende trigonometrische Funktionen in Ihren Animationen zu verwenden

</text-box>

Viele Spiele haben sich bewegende Charaktere, daher ist die Erstellung von Animationen ein logischer nächster Schritt. Wir können die Illusion von Bewegung erzeugen, indem wir dasselbe Bild an verschiedenen Stellen auf dem Bildschirm zeichnen und die Änderungen zeitlich passend abstimmen.

## Erstellen einer Animation

Der folgende Code erstellt eine Animation, in der sich ein Roboter in einem Pygame-Fenster von links nach rechts bewegt:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

x = 0
y = 0
clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()

    x += 1
    clock.tick(60)
```

Wenn dies ausgeführt wird, sollte das Ergebnis so aussehen:

<img src="pygame_animation.gif">

Lassen Sie uns die beteiligten Befehle genauer betrachten. Wenn wir die Bewegung des Bildes auf dem Bildschirm verfolgen wollen, müssen wir seine Position kennen. Deshalb haben wir zwei Variablen für die Koordinaten der oberen linken Ecke des Bildes:

```python
x = 0
y = 0
```

Wir haben auch eine Uhr, mit der wir sicherstellen, dass die Geschwindigkeit der Animation genau richtig ist:

```python
clock = pygame.time.Clock()
```

Die Hauptschleife zeichnet das Bild bei jeder Iteration an seiner aktuellen Position:

```python
    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()
```

Zuerst füllt die Methode `fill` das Fenster wie zuvor mit Schwarz. Die Farbe wird als Tupel übergeben, das die RGB-Werte für die Farbe enthält. In diesem Fall ist das Argument `(0, 0, 0)`, was bedeutet, dass alle drei Komponenten – Rot, Grün und Blau – den Wert 0 haben. Jede Komponente kann einen Wert zwischen 0 und 255 haben. Wenn wir also `(255, 255, 255)` als Argument übergeben würden, erhielten wir ein weißes Fenster, und mit `(255, 0, 0)` erhielten wir ein rotes Fenster. RGB-Farbcodes bilden das Rückgrat der digitalen Farbgebung, und es gibt viele Online-Tools für die Arbeit mit ihnen, zum Beispiel [RGB Color Codes Chart](https://www.rapidtables.com/web/color/RGB_Color.html).

Nachdem das Fenster mit Farbe gefüllt wurde, wird das Bild mit der Methode `blit` an der angegebenen Position gezeichnet. Dann wird der Inhalt des Fensters mit der Funktion `pygame.display.flip` aktualisiert.

Schließlich wird der in `x` gespeicherte Wert erhöht, wodurch sich das Bild bei jeder Iteration um einen Pixel nach rechts bewegt:

```python
    x += 1
```

Am Ende wird die Uhrenmethode `tick` aufgerufen:

```python
    clock.tick(60)
```

Die Methode `tick` kümmert sich um die Geschwindigkeit der Animation. Das Argument `60` schreibt vor, dass die Schleife 60 Mal pro Sekunde ausgeführt werden soll, was bedeutet, dass sich das Bild jede Sekunde um 60 Pixel nach rechts bewegt. Dies entspricht in etwa dem _FPS_- oder _Frames per Second_-Wert (Bilder pro Sekunde), der bei Spielen verwendet wird.

Im Prinzip stellt die Methode `tick` sicher, dass die Animation auf jedem Computer mit der gleichen Geschwindigkeit läuft. Wenn kein solches Timing involviert wäre, würde die Geschwindigkeit der Animation von der Geschwindigkeit des Computers abhängen.

## Abprallen von einer Wand

Die vorherige Animation war ansonsten hervorragend, aber als der Roboter eine Wand erreichte, verschwand er einfach aus dem Sichtfeld. Lassen Sie uns den Roboter von der Wand abprallen.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

x = 0
y = 0
velocity = 1
clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()
    
    x += velocity
    if velocity > 0 and x+robot.get_width() >= 640:
        velocity = -velocity
    if velocity < 0 and x <= 0:
        velocity = -velocity

    clock.tick(60)
```

Das Ausführen des obigen Codes sollte so aussehen:

<img src="pygame_animation2.gif">

Es gibt eine neue Variable `velocity` (Geschwindigkeit), welche die Richtung der Bewegung bestimmt. Wenn der Wert über Null liegt, erfolgt die Bewegung nach rechts, und wenn er unter Null liegt, erfolgt die Bewegung nach links. Genauer gesagt bewegt sich der Roboter in diesem Fall nach rechts, wenn der Wert `1` ist, und nach links, wenn er `-1` ist.

Die folgenden Zeilen lassen den Roboter von den Seitenwänden abprallen:

```python
    if velocity > 0 and x+robot.get_width() >= 640:
        velocity = -velocity
    if velocity < 0 and x <= 0:
        velocity = -velocity
```

Wenn die Geschwindigkeit über Null liegt, sodass sich der Roboter nach rechts bewegt, und die rechte Kante des Bildes über die rechte Kante des Fensters hinausgeht, wird die Richtung umgekehrt und der Roboter beginnt, sich nach links zu bewegen. Ebenso wird die Richtung wieder umgekehrt, wenn die Geschwindigkeit unter Null liegt, sodass sich der Roboter nach links bewegt, und die linke Kante des Bildes die linke Kante des Fensters erreicht, und der Roboter beginnt wieder, sich nach rechts zu bewegen.

Dadurch bewegt sich der Roboter auf einem Pfad von der linken Kante des Fensters zur rechten Kante und zurück nach links und dann wieder nach rechts, was ad infinitum wiederholt wird.

## Rotation

Lassen Sie uns noch eine Animation erstellen. Diesmal soll der Roboter im Kreis um die Mitte des Fensters _rotieren_:

```python
import pygame
import math

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

angle = 0
clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()

    x = 320+math.cos(angle)*100-robot.get_width()/2
    y = 240+math.sin(angle)*100-robot.get_height()/2

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()

    angle += 0.01
    clock.tick(60)
```

Das Ausführen des obigen Codes sollte so aussehen:

<img src="pygame_rotation.gif">

Die Rotation in einem relativ präzisen Kreis wird mit Hilfe einiger grundlegender trigonometrischer Funktionen erreicht. Die Variable `angle` (Winkel) enthält den Winkel der Position des Roboters im Verhältnis zur Mitte des Fensters und der horizontalen Linie, die durch diese verläuft. Die Sinus- und Kosinusfunktionen aus der Python-Mathematikbibliothek werden verwendet, um die Koordinaten der Position des Roboters zu berechnen:

```python
        x = 320+math.cos(angle)*100-robot.get_width()/2
        y = 240+math.sin(angle)*100-robot.get_height()/2
```

Der Roboter rotiert in einem Kreis mit dem Radius 100 um die Mitte des Fensters. Die Hypotenuse in diesem Szenario ist der Radius des Kreises. Die Kosinusfunktion gibt die Länge der _Ankathete_ eines rechtwinkligen Dreiecks im Verhältnis zur Hypotenuse an, was bedeutet, dass sie uns die `x`-Koordinate der Position liefert. Die Sinusfunktion gibt die Länge der _Gegenkathete_ an, also die `y`-Koordinate. Die Position wird dann an die Größe des Bildes angepasst, sodass sich der Mittelpunkt des Kreises in der Mitte des Fensters befindet.

Bei jeder Iteration wird die Größe des Winkels `angle` um 0,01 erhöht. Da wir Bogenmaß (Radianten) verwenden, beträgt ein voller Kreis 2π, was etwa 6,28 entspricht. Es dauert etwa 628 Iterationen, bis der Roboter einen vollen Kreis durchlaufen hat, und bei 60 Iterationen pro Sekunde dauert dies etwas mehr als 10 Sekunden.

<programming-exercise name='Vertikale Bewegung' tmcname='part13-05_vertical_movement'>

Bitte erstellen Sie eine Animation, bei der sich der Roboter in einer Endlosschleife auf und ab bewegt. Das Endergebnis sollte so aussehen:

<img src="pygame_vertical.gif">

</programming-exercise>

<programming-exercise name='Um den Umfang herum' tmcname='part13-06_round_the_perimeter'>

Bitte erstellen Sie eine Animation, bei der der Roboter den Umfang des Fensters abfährt. Das Endergebnis sollte so aussehen:

<img src="pygame_perimeter.gif">

</programming-exercise>

<programming-exercise name='Zwei Roboter' tmcname='part13-07_two_robots'>

Bitte erstellen Sie eine Animation, bei der sich zwei Roboter nach links und rechts hin und her bewegen. Der untere Roboter soll sich mit der doppelten Geschwindigkeit des oberen bewegen. Das Endergebnis sollte so aussehen:

<img src="pygame_move2.gif">

</programming-exercise>

<programming-exercise name='Roboter im Kreis' tmcname='part13-08_robot_circle'>

Bitte erstellen Sie eine Animation, bei der zehn Roboter im Kreis laufen. Das Endergebnis sollte so aussehen:

<img src="pygame_circle.gif">

</programming-exercise>

<programming-exercise name='Springender Ball' tmcname='part13-09_bouncing_ball'>

Bitte erstellen Sie eine Animation, bei der ein Ball von den Rändern des Fensters abprallt. Das Endergebnis sollte so aussehen:

<img src="pygame_bounce.gif">

Die Übungsvorlage enthält das Bild `ball.png`.

</programming-exercise>

<programming-exercise name='Roboter-Invasion' tmcname='part13-10_robot_invasion'>

Bitte erstellen Sie eine Animation, bei der Roboter zufällig vom Himmel fallen. Wenn ein Roboter den Boden erreicht, beginnt er sich nach links oder rechts zu bewegen und verschwindet schließlich vom Bildschirm. Das Endergebnis sollte so aussehen:

<img src="pygame_invasion.gif">

</programming-exercise>
