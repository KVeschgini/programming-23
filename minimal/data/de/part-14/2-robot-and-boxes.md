---
path: '/part-14/2-robot-and-boxes'
title: 'Roboter und Kisten'
hidden: false
---

Das Schwierigste bei der Implementierung eines Spiels im Sokoban-Stil ist in der Regel die Bewegung des Roboters, damit er Kisten in die gewünschte Richtung schieben kann. Das Spiel sollte erkennen können, wann sich der Roboter in eine angegebene Richtung bewegen kann, und in der Lage sein, jede Situation zu handhaben, in der sich auch eine Kiste bewegen sollte. Nehmen wir diese Herausforderung nun in Angriff.

## Behandlung von Tastaturereignissen

Der Spieler steuert den Roboter mit den vier Pfeiltasten, daher sollte unser Ereignis-Handler auch in der Lage sein, auf die entsprechenden Tastaturereignisse zu reagieren:

```python
    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    self.move(0, -1)
                if event.key == pygame.K_RIGHT:
                    self.move(0, 1)
                if event.key == pygame.K_UP:
                    self.move(-1, 0)
                if event.key == pygame.K_DOWN:
                    self.move(1, 0)

            if event.type == pygame.QUIT:
                exit()
```

Wann immer der Spieler eine Pfeiltaste drückt, wird nun die Methode `move` mit einem entsprechenden Paar von Argumenten aufgerufen. Das erste Argument enthält die Bewegung in vertikaler Richtung, während das zweite die Bewegung in horizontaler Richtung enthält.

## Suche nach dem Roboter

Das Spiel muss die Position des Roboters kennen, um ihn korrekt bewegen zu können. Fügen wir die Methode `find_robot` hinzu, welche die Position des Roboters ermittelt:

```python
    def find_robot(self ):
        for y in range(self.height):
            for x in range(self.width):
                if self.map[y][x] in [4, 6]:
                    return (y, x)
```

Die Methode durchläuft alle Quadrate im Spielgitter und gibt die Koordinaten des Quadrats zurück, das entweder die Nummer 4 (der Roboter allein) oder die Nummer 6 (der Roboter auf einem Ziel-Quadrat) enthält.

Die Idee ist, dass jedes Mal, wenn der Spieler eine Pfeiltaste drückt, zuerst die Position des Roboters durch das Durchlaufen der Quadrate des Gitters ermittelt wird. Dies mag etwas langsam und überflüssig erscheinen, da wir die Position des Roboters genauso gut in einer oder zwei separaten Variablen speichern könnten. Der Vorteil dieses Suchansatzes besteht darin, dass wir die Position des Roboters nicht an zwei verschiedenen Stellen speichern (im Spielgitter _und_ in separaten Variablen), sondern uns nur um die eine Stelle (das Spielgitter) kümmern müssen, was bedeutet, dass der Zustand des Spiels im Computerspeicher einfacher zu handhaben ist.

## Änderungen am Spielgitter

Wir haben die Methode `move` oben bereits aufgerufen, sie aber noch nicht definiert. Tun wir das jetzt.

Die Methode `move` nimmt die Richtung, in die sich der Spieler bewegen möchte, als Argumente entgegen. Sie aktualisiert dann das Spielgitter entsprechend oder stellt fest, dass der Zug nicht erlaubt ist, und lässt das Gitter unverändert.

```python
    def move(self, move_y, move_x):
        robot_old_y, robot_old_x = self.find_robot() 
        robot_new_y = robot_old_y + move_y
        robot_new_x = robot_old_x + move_x

        if self.map[robot_new_y][robot_new_x] == 1:
            return

        if self.map[robot_new_y][robot_new_x] in [3, 5]:
            box_new_y = robot_new_y + move_y
            box_new_x = robot_new_x + move_x

            if self.map[box_new_y][box_new_x] in [1, 3, 5]:
                return

            self.map[robot_new_y][robot_new_x] -= 3
            self.map[box_new_y][box_new_x] += 3

        self.map[robot_old_y][robot_old_x] -= 4
        self.map[robot_new_y][robot_new_x] += 4
```

Die Methode hat recht viele verschiedene Phasen, also schauen wir uns jede nacheinander an:

### Die alte und neue Position des Roboters

```python
        robot_old_y, robot_old_x = self.find_robot() 
        robot_new_y = robot_old_y + move_y
        robot_new_x = robot_old_x + move_x
```

Zuerst ruft die Methode `find_robot` auf, um die aktuelle Position des Roboters vor dem Zug zu finden. Diese wird in den Variablen `robot_old_y` und `robot_old_x` gespeichert.

Dann wird die neue Position des Roboters nach dem beabsichtigten Zug in den Variablen `robot_new_y` und `robot_new_x` gespeichert. Die neuen Koordinaten lassen sich leicht berechnen, indem man die als Argumente übergebenen Werte zur alten Position des Roboters addiert, da beide vertikale und horizontale Werte enthielten.

### Hat der Roboter eine Wand getroffen?

```python
        if self.map[robot_new_y][robot_new_x] == 1:
            return
```

Die obige `if`-Anweisung kümmert sich um die Situation, in der der Roboter infolge des Zuges eine Wand treffen würde. Denken Sie daran, 1 war die Position eines Wand-Quadrats in der Liste der Bilder. Dies ist nicht erlaubt, also kehrt die Methode einfach ohne weiteres zurück.

### Eine Kiste bewegen

```python
        if self.map[robot_new_y][robot_new_x] in [3, 5]:
            box_new_y = robot_new_y + move_y
            box_new_x = robot_new_x + move_x

            if self.map[box_new_y][box_new_x] in [1, 3, 5]:
                return

            self.map[robot_new_y][robot_new_x] -= 3
            self.map[box_new_y][box_new_x] += 3
```

Wenn die neue beabsichtigte Position des Roboters eine Nummer 3 (eine Kiste allein) oder eine Nummer 5 (eine Kiste auf einem Ziel-Quadrat) enthält, versucht der Roboter, die Kiste auf das nächste Quadrat weiterzuschieben. Zu diesem Zweck benötigen wir zwei neue Variablen: `box_new_y` und `box_new_x`, welche die Position der Kiste nach dem Zug enthalten.

Ähnlich wie der Roboter kann auch die Kiste nicht auf ein Wand-Quadrat mit der Kennung 1 geschoben werden. Ebenso kann die Kiste nicht auf eine andere Kiste oder ein Ziel-Quadrat mit einer Kiste darauf geschoben werden. Sollte dies infolge des Zuges passieren, kehrt die Methode wieder einfach zurück, ohne Änderungen am Gitter vorzunehmen.

In jedem anderen Fall kann sich die Kiste bewegen. Der Wert an der aktuellen Gitterposition der Kiste wird um 3 verringert, und der Wert an ihrer neuen Gitterposition wird um 3 erhöht. Aufgrund der geschickten Reihenfolge der Elemente in der Liste `images` funktioniert dies sowohl dann korrekt, wenn es sich bei den beteiligten Quadraten um Boden-Quadrate als auch um Ziel-Quadrate handelt.

### Den Roboter bewegen

```python
        self.map[robot_old_y][robot_old_x] -= 4
        self.map[robot_new_y][robot_new_x] += 4
```

Wenn die Ausführung der Methode diesen Punkt erreicht hat, ohne zurückzukehren, ist es an der Zeit, auch den Roboter zu bewegen. Das Vorgehen ist ähnlich wie beim Bewegen der Kiste, aber der Wert, der an den entsprechenden Stellen im Gitter subtrahiert und addiert wird, ist diesmal 4. Dies stellt, wiederum durch die geschickte Reihenfolge der Elemente in der Liste `images`, sicher, dass das Endergebnis auf dem Gitter korrekt ist, sowohl wenn Boden- als auch Ziel-Quadrate am Zug beteiligt sind.

## Refactoring?

Nur das Gitter zu verwenden, um den Zustand des Spiels jederzeit zu speichern, ist sehr praktisch in dem Sinne, dass nur eine Variable permanent in den gesamten Prozess involviert ist und es relativ einfach ist, den Zustand des Gitters durch einfache Additionen und Subtraktionen zu aktualisieren.

Der Nachteil ist, dass es ein wenig schwierig sein kann, den Programmcode des Spiels zu verstehen. Wenn jemand, der mit der verwendeten Logik nicht vertraut ist, die folgende Codezeile sähe, wäre er wahrscheinlich etwas ratlos:

```python
            if self.map[box_new_y][box_new_x] in [1, 3, 5]:
```

Der obige Codeausschnitt verwendet _magische Zahlen_ (Magic Numbers), um die Quadrate im Gitter darzustellen. Jeder, der den Code liest, müsste wissen, dass 1 Wand bedeutet, 3 eine Kiste und 5 eine Kiste auf einem Ziel-Quadrat.

Die Zeilen mit den geschickten Subtraktionen und Additionen sähen noch verblüffender aus:

```python
            self.map[robot_new_y][robot_new_x] -= 3
```

Die Zahl 3 bedeutete gerade eben noch eine Kiste, aber jetzt wird sie vom Wert eines Quadrats auf dem Gitter subtrahiert. Dies funktioniert im Kontext unseres Nummerierungsschemas, da es eine Kiste (3) in ein normales Boden-Quadrat (0) verwandelt oder ein Ziel-Quadrat mit einer Kiste (5) in ein leeres Ziel-Quadrat (2), aber das Verständnis hierfür erfordert eine Einführung in das verwendete Nummerierungsschema.

Wir könnten es jedem, der den Code liest, erleichtern, indem wir unsere Implementierung _refactoren_. Das bedeutet, die Struktur und Lesbarkeit des Codes zu verbessern. Eine Möglichkeit, dies zu erreichen, wäre die Verwendung der Namen der Quadrate anstelle der Zahlen 0 bis 6, auch wenn dies immer noch nicht erklären würde, wie und warum Zahlen addiert und subtrahiert werden können, während die Integrität des Gitters gewahrt bleibt.

Um den Programmcode wirklich zugänglich zu machen, wäre wahrscheinlich ein wesentlich grundlegenderes Refactoring erforderlich. Beispielsweise könnten wir die Struktur der Spielkarte an einem Ort aufbewahren und die Positionen des Roboters und der Kisten in einer separaten Datenstruktur speichern. Der Nachteil _dessen_ wäre, dass dies wahrscheinlich zu viel mehr Code führen würde und die interne Struktur des Spiels wesentlich komplizierter würde.

Refactoring und Codequalität sind Themen für spätere Kurse, wie z. B. _Software-Entwicklungsmethoden_ und _Software Engineering_.
