---
path: '/part-14/1-game-project'
title: 'Spielprojekt'
hidden: false
---

In diesem Teil werden wir Pygame verwenden, um ein etwas größeres Spiel zu erstellen. Es handelt sich um eine Variation des klassischen Sokoban-Spiels, bei dem der Spieler einen Roboter auf einem Gitter bewegt und Kisten mit so wenigen Zügen wie möglich an die richtigen Stellen schiebt.

Das Endergebnis wird so aussehen:

<img src="game.png">

## Die Spielkarte

Beginnen wir mit dem Zeichnen der im Spiel verwendeten Karte. Das Spiel wird in der Klasse `Sokoban` implementiert, die alle zum Spielen erforderlichen Funktionen enthalten wird. In dieser ersten Phase sieht der Inhalt der Klasse wie folgt aus:

```python
import pygame

class Sokoban:
    def __init__(self):
        pygame.init()
        
        self.load_images()
        self.new_game()
        
        self.height = len(self.map)
        self.width = len(self.map[0])
        self.scale = self.images[0].get_width()

        window_height = self.scale * self.height
        window_width = self.scale * self.width
        self.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption("Sokoban")

        self.main_loop()

    def load_images(self):
        self.images = []
        for name in ["floor", "wall", "target", "box", "robot", "done", "target_robot"]:
            self.images.append(pygame.image.load(name + ".png"))

    def new_game(self):
        self.map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    def main_loop(self):
        while True:
            self.check_events()
            self.draw_window()

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

    def draw_window(self):
        self.window.fill((0, 0, 0))

        for y in range(self.height):
            for x in range(self.width):
                square = self.map[y][x]
                self.window.blit(self.images[square], (x * self.scale, y * self.scale))

        pygame.display.flip()

if __name__ == "__main__":
    Sokoban()
```

Das Ausführen des Programms sollte ein Fenster mit dem Anfangszustand des Spiels anzeigen. Lassen Sie uns den Code, der dies erreicht, genauer betrachten.

## Der Konstruktor

Der Konstruktor der Klasse initialisiert die Pygame-Module sowie die wesentlichen Variablen und Datenstrukturen des Spiels. Er ruft auch die Methode für die Hauptschleife des Spiels auf.

```python
    def __init__(self):
        pygame.init()
        
        self.load_images()
        self.new_game()
        
        self.height = len(self.map)
        self.width = len(self.map[0])
        self.scale = self.images[0].get_width()

        window_height = self.scale * self.height
        window_width = self.scale * self.width
        self.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption("Sokoban")

        self.main_loop()
```

Die Methode `load_images` lädt die im Spiel verwendeten Bilder in eine Liste namens `images`. Die Methode `new_game` erstellt eine zweidimensionale Liste namens `map`, die den Zustand des Spielgitters zu Beginn des Spiels enthält.

Die Variablen `height` (Höhe) und `width` (Breite) werden basierend auf den Dimensionen des Spielgitters initialisiert. Die Variable `scale` (Skalierung) enthält die Seitenlänge eines Quadrats im Gitter. Da jedes Bild ein Quadrat der exakt gleichen Größe ist, wird die Größe aller Quadrate durch diese eine Variable abgedeckt, und die Breite des ersten Bildes reicht als Wert völlig aus. Dieser Wert kann verwendet werden, um die Breite und Höhe des gesamten Gitters zu berechnen, was uns ermöglicht, ein Fenster in der passenden Größe für das Spielgitter zu erstellen.

## Bilder laden

Die Methode `load_images` lädt alle im Spiel verwendeten Bilder:

```python
    def load_images(self):
        self.images = []
        for name in ["floor", "wall", "target", "box", "robot", "done", "target_robot"]:
            self.images.append(pygame.image.load(name + ".png"))
```

Das Spiel verwendet die folgenden Bilder:

### Boden-Quadrat

<img src="floor.png">

* Dateiname: `floor.png`
* Position in der Liste: 0

### Wand-Quadrat

<img src="wall.png">

* Dateiname: `wall.png`
* Position in der Liste: 1

### Ziel-Quadrat

<img src="target.png">

* Dateiname: `target.png`
* Position in der Liste: 2
* Der Roboter sollte eine Kiste auf dieses Quadrat schieben

### Kiste

<img src="box.png">

* Dateiname: `box.png`
* Position in der Liste: 3

### Roboter

<img src="robot.png">

* Dateiname: `robot.png`
* Position in der Liste: 4

### Kiste auf einem Ziel-Quadrat

<img src="done.png">

* Dateiname: `done.png`
* Position in der Liste: 5
* Die Kiste wurde auf das Ziel-Quadrat geschoben

### Roboter auf einem Ziel-Quadrat

<img src="target_robot.png">

* Dateiname: `target_robot.png`
* Position in der Liste: 6
* Der Roboter kann sich auch auf einem leeren Ziel-Quadrat befinden

## Erstellen des Gitters

Die Methode `new_game` erstellt den Anfangszustand des Spielgitters:

```python
    def new_game(self):
        self.map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
```

Die Methode erstellt eine zweidimensionale Liste namens `map`, welche die nummerierten Positionen der Bilder in _ihrer_ Liste verwendet, um zu markieren, welches Bild wohin gehört. Auf diese Weise enthält das Spiel jederzeit eine Aufzeichnung des Zustands des Spielgitters.

Hinweis: Zu Beginn enthalten alle Felder auf dem Gitter eine Zahl zwischen 0 und 4. Die Zahlen 5 und 6 sind nicht enthalten, da sich zu Beginn weder eine Kiste noch der Roboter auf einem Ziel-Quadrat befindet.

## Die Hauptschleife

Die Methode `main_loop` ist recht kurz. Bei jeder Iteration ruft sie zwei Methoden auf: `check_events` durchläuft alle seit der vorherigen Iteration gesammelten Ereignisse, und die Methode `draw_window` aktualisiert den Inhalt des Fensters.

```python
    def main_loop(self):
        while True:
            self.check_events()
            self.draw_window()

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

    def draw_window(self):
        self.window.fill((0, 0, 0))

        for y in range(self.height):
            for x in range(self.width):
                square = self.map[y][x]
                self.window.blit(self.images[square], (x * self.scale, y * self.scale))

        pygame.display.flip()
```

In diesem Stadium ist das einzige Ereignis, das tatsächlich vom Spiel verarbeitet wird, das Schließen des Spielfensters, z. B. über die Schaltfläche zum Beenden. Das Spiel wird dann durch Aufrufen der Python-Funktion `exit` beendet.

Jedes Mal, wenn die Methode `draw_window` aufgerufen wird, wird die gesamte Matrix des Spielgitters durchlaufen und das Bild, das jedem Quadrat im Gitter entspricht, an der richtigen Stelle gezeichnet.

Hinweis: Die Koordinaten x und y werden im Spiel auf zwei verschiedene Arten verwendet. Wenn man mit den Indizes einer zweidimensionalen Liste arbeitet, ist es logisch, die y-Koordinate zuerst anzugeben, da y sich auf die Nummer der Zeile bezieht, während x die Nummer der Spalte ist. Andererseits wird bei der Verwendung von Pygame-Methoden x normalerweise zuerst übergeben, wie es bei Grafiken und auch in mathematischen Kontexten üblich ist.
