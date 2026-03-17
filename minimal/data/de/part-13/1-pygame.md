---
path: '/part-13/1-pygame'
title: 'Pygame'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie die Pygame-Bibliothek auf Ihrem Computer installiert haben
- werden Sie wissen, wie man ein Pygame-Fenster erstellt und wie man ein Programm beendet
- werden Sie in der Lage sein, ein in einer Datei gespeichertes Bild in einem Pygame-Fenster zu verwenden

</text-box>

In diesen letzten beiden Teilen dieses Kursmaterials werden wir uns mit der Pygame-Bibliothek vertraut machen. Es handelt sich um eine Python-Bibliothek zur Programmierung von Spielen. Sie hilft Ihnen dabei, grafische Elemente zu erstellen, Ereignisse von der Tastatur und der Maus zu verarbeiten und andere Funktionen zu implementieren, die in Spielen notwendig sind.

## Pygame installieren

### Linux

Öffnen Sie eine Kommandozeile, geben Sie `pip3 install pygame` ein und drücken Sie `Enter`.

<img src="pygame_linux.png">

Dies sollte die Pygame-Bibliothek auf Ihrem Computer installieren.

### Windows

Öffnen Sie das Windows-Terminal, indem Sie das Menü öffnen, `cmd` eingeben und `Enter` drücken:

<img src="13_1_1.png">

Das Fenster des Kommandozeileninterpreters sollte sich öffnen. Geben Sie `pip3 install pygame` ein und drücken Sie `Enter`.

Dies sollte die Pygame-Bibliothek auf Ihrem Computer installieren.

Die Installation erfordert möglicherweise Administratorrechte. Wenn das oben Genannte nicht funktioniert, können Sie versuchen, die Terminal-Anwendung als Administrator auszuführen: Öffnen Sie das Windows-Menü, suchen Sie die CMD-Anwendung, klicken Sie mit der rechten Maustaste darauf und wählen Sie "Als Administrator ausführen".

Die Installation und der Zugriff auf Pygame erfordern, dass Ihre Python-Installation zum Pfad hinzugefügt wurde, wie [hier](https://www.mooc.fi/en/installation/vscode/#python3) beschrieben.

### Mac

Öffnen Sie das _Terminal_, zum Beispiel über das Lupensymbol in der oberen rechten Ecke:

<img src="13-1-2.png">

Das Suchwerkzeug sollte sich öffnen. Geben Sie `terminal` ein und drücken Sie `Enter`:

<img src="13-1-3.png">

Geben Sie Folgendes ein und drücken Sie `Enter`:

`pip3 install pygame`

<img src="13-1-4.png">

Dies sollte die Pygame-Bibliothek auf Ihrem Computer installieren.

## Ihr erstes Programm

Hier ist ein einfaches Programm, um zu überprüfen, ob Ihre Pygame-Installation korrekt funktioniert:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

window.fill((0,0,0))
pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Wenn dieses Programm ausgeführt wird, sollte ein Fenster angezeigt werden:

<img src="pygame_first.gif">

Das Programm besteht lediglich darin, ein Fenster anzuzeigen, und es läuft so lange, bis der Benutzer das Fenster schließt.

Lassen Sie uns die erforderlichen Schritte genauer betrachten. Die erste Zeile nimmt die Pygame-Bibliothek in Gebrauch: `import pygame`. Der nächste Befehl `pygame.init` initialisiert die Pygame-Module, und der folgende erstellt mit der Funktion `pygame.display.set_mode` ein Fenster.

```python
pygame.init()
window = pygame.display.set_mode((640, 480))
```

Die Funktion `set_mode` nimmt die Fensterdimensionen als Argument entgegen. Das Tupel `(640, 480)` gibt an, dass das Fenster 640 Pixel breit und 480 Pixel hoch ist. Der Variablenname `window` kann später verwendet werden, um auf das Fenster zuzugreifen, beispielsweise um etwas darin zu zeichnen.

Die folgenden zwei Befehle tun genau das:

```python
window.fill((0, 0, 0))
pygame.display.flip()
```

Die Methode `fill` füllt das Fenster mit der als Argument übergebenen Farbe. In diesem Fall ist die Farbe Schwarz, übergeben als RGB-Wert im Tupel `(0, 0, 0)`. `pygame.display.flip` aktualisiert den Inhalt des Fensters.

Nach diesen Initialisierungsbefehlen beginnt die _Hauptschleife_ (Main Loop) des Programms:

```python
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Die Hauptschleife verarbeitet alle Ereignisse, die das Betriebssystem an das Programm übergibt. Bei jeder Iteration gibt die Funktion `pygame.event.get` eine Liste aller Ereignisse zurück, die seit der vorherigen Iteration gesammelt wurden.

Im obigen Beispiel verarbeitet das Programm nur Ereignisse vom Typ `pygame.QUIT`. Dieses Ereignis wird beispielsweise durch Klicken auf die Schaltfläche zum Schließen in der Ecke des Fensters ausgelöst. Wenn das Ereignis `pygame.QUIT` ausgelöst wird, beendet sich das Programm über die Funktion `exit`.

Sie können versuchen zu sehen, was passiert, wenn Ihr Programm das Ereignis `pygame.QUIT` nicht verarbeitet. Dies sollte bedeuten, dass das Klicken auf die Schaltfläche zum Schließen nichts bewirkt, was für den Benutzer verwirrend wäre. Da das Programm von der Kommandozeile aus ausgeführt wird, können Sie es dennoch über die Kommandozeile mit Strg+C stoppen.

## Ein Bild hinzufügen

Fügen wir dem Fenster ein Bild hinzu:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

window.fill((0, 0, 0))
window.blit(robot, (100, 50))
pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Das Programm verwendet dieses Bild eines Roboters, das in der Datei `robot.png` gespeichert ist:

<img src="robot.png">

Die Datei `robot.png` muss sich im selben Verzeichnis wie der Quellcode Ihres Programms befinden, andernfalls kann das Programm sie nicht finden. In den Übungsvorlagen für diesen Teil warten die Bilder bereits im Übungsverzeichnis.

Das Fenster sollte nun so aussehen:

<img src="pygame_pic.gif">

Die Funktion `pygame.image.load` lädt das Bild aus der Datei `robot.png` und speichert einen Verweis darauf in der Variablen namens `robot`. Die Methode `blit` zeichnet das Bild an der Position `(100, 50)`, und die Funktion `pygame.display.flip` aktualisiert wie zuvor den Fensterinhalt. Die Position `(100, 50)` bedeutet, dass sich die _obere linke Ecke_ des Bildes an dieser Stelle innerhalb des Fensters befindet.

In Pygame befindet sich der Ursprungspunkt `(0, 0)` in der oberen linken Ecke des Fensters. Die x-Koordinaten nehmen nach rechts zu, und die y-Koordinaten nehmen nach unten zu, sodass die untere rechte Ecke die Koordinaten `(640, 480)` hat. Dies steht im Gegensatz dazu, wie Koordinaten üblicherweise z. B. in der Mathematik gehandhabt werden, ist aber im Programmierkontext recht verbreitet und es lohnt sich, sich daran zu gewöhnen.

Sobald Sie ein Bild geladen haben, können Sie es mehrmals innerhalb desselben Fensters verwenden. Der folgende Code zeichnet das Bild des Roboters an drei verschiedenen Stellen:

```python
window.blit(robot, (0, 0))
window.blit(robot, (300, 0))
window.blit(robot, (100, 200))
```

Das Fenster sollte als Ergebnis so aussehen:

<img src="pygame_pic2.gif">

Hier legen wir die Position des Bildes so fest, dass es in der Mitte des Fensters liegt:

```python
width = robot.get_width()
height = robot.get_height()
window.blit(robot, (320-width/2, 240-height/2))
```

Das Fenster sollte nun so aussehen:

<img src="pygame_pic3.gif">

Die Methode `get_width` gibt die Breite des Bildes zurück, und die Methode `get_height` gibt seine Höhe zurück, beides in Pixeln. Die Mitte des Fensters liegt bei der Hälfte seiner Breite und Höhe, also bei `(320, 240)`, was wir verwenden können, um eine geeignete Position für die obere linke Ecke des Bildes zu berechnen, damit es exakt in der Mitte liegt.

<text-box variant='hint' name='Pygame-Übungen'>

Die Übungen in diesem Teil des Kurses haben keine automatisierten Tests, da die Ergebnisse visuell überprüft werden. Die Tests vergeben automatisch Punkte, sobald Sie Ihre Lösung an den Server übermitteln, unabhängig von Ihrer Implementierung. Reichen Sie Ihre Lösung erst ein, wenn Sie bereit sind und Ihre Lösung der Übungsbeschreibung entspricht. Die Übungen haben zwar keine automatischen Tests, aber das Kurspersonal wird Ihre Lösung dennoch sehen. Auch das Einreichen einer unvollständigen Lösung an TMC Paste vergibt automatisch Punkte, daher sollte dies nicht verwendet werden, wenn Sie um Hilfe bei den Übungen in diesem Teil bitten. Sie können [Pastebin.com](https://pastebin.com/) oder einen anderen Internet-Pastebin-Dienst verwenden, wenn Sie in den Support-Kanälen des Kurses um Hilfe bitten.

Wenn Ihre Lösung offensichtlich nicht der Übungsbeschreibung entspricht, können Sie die für die Übungen in diesem Teil vergebenen Punkte verlieren.

</text-box>

<programming-exercise name='Vier Roboter' tmcname='part13-01_four_robots'>

Bitte schreiben Sie ein Programm, das einen Roboter in jede der vier Ecken des Fensters zeichnet. Das Endergebnis sollte so aussehen:

<img src="pygame_four.gif">

</programming-exercise>

<programming-exercise name='Roboter in einer Reihe' tmcname='part13-02_robots_row'>

Bitte schreiben Sie ein Programm, das zehn Roboter in einer Reihe zeichnet. Das Endergebnis sollte so aussehen:

<img src="pygame_row.gif">

</programming-exercise>

<programming-exercise name='Hundert Roboter' tmcname='part13-03_hundred_robots'>

Bitte schreiben Sie ein Programm, das hundert Roboter zeichnet: zehn Reihen mit jeweils zehn Robotern. Das Endergebnis sollte so aussehen:

<img src="pygame_hundred.gif">

</programming-exercise>

<programming-exercise name='Zufällige Roboter' tmcname='part13-04_random_robots'>

Bitte schreiben Sie ein Programm, das _tausend_ Roboter an zufälligen Stellen zeichnet. Das Endergebnis sollte so aussehen:

<img src="pygame_thousand.gif">

</programming-exercise>
