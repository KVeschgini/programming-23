---
path: '/part-14/3-finishing-the-game'
title: 'Das Spiel fertigstellen'
hidden: false
---

Unser Spiel ist bereits recht funktional, daher ist es an der Zeit, ihm den letzten Schliff zu geben. Wir werden einen Zähler für die Anzeige der getätigten Züge hinzufügen, eine Option zum Starten eines neuen Spiels und zum Schließen des Spiels per Tastatureingabe sowie eine Benachrichtigung für den Fall, dass der Spieler das Spiel erfolgreich gelöst hat.

## Zugzähler

Der Zugzähler am unteren Rand des Spielfensters zeigt die Anzahl der vom Spieler bisher getätigten Züge an. Dies kann verwendet werden, um die Lösung mit der geringsten Anzahl von Zügen zu finden.

Der Zähler erfordert einige Änderungen am Code. Zuerst ändern wir den Konstruktor so, dass ausreichend Platz für den Zähler vorhanden ist und wir über eine geeignete Schriftart verfügen, um den Text zu zeichnen:

```python
    def __init__(self):
        ...
        self.window = pygame.display.set_mode((window_width, window_height + self.scale))

        self.game_font = pygame.font.SysFont("Arial", 24)
        ...
```

Der Zugzähler wird zu Beginn des Spiels auf Null initialisiert. Jeder Zug erhöht ihn um eins:

```python
    def new_game(self):
        ...
        self.moves = 0
```

```python
    def move(self, move_y, move_x):
        ...
        self.moves += 1

```

Jedes Mal, wenn der Fensterinhalt aktualisiert wird, sollte auch die auf dem Bildschirm angezeigte Anzahl der getätigten Züge aktualisiert werden:

```python
    def draw_window(self):
        ...
        game_text = self.game_font.render("Züge: " + str(self.moves), True, (255, 0, 0))
        self.window.blit(game_text, (25, self.height * self.scale + 10))
        ...
```

## Neues Spiel und Beenden des Spiels

Fügen wir als Nächstes Tastaturbefehle zum Starten eines neuen Spiels mit F2 und zum Beenden des Spiels mit Esc hinzu. Beides ist recht einfach zu implementieren:

```python
    def check_events(self):
        ...
                if event.key == pygame.K_F2:
                    self.new_game()
                if event.key == pygame.K_ESCAPE:
                    exit()
        ...
```

Wir sollten auch Informationen über diese Funktionalität für den Spieler sichtbar hinzufügen:

```python
    def draw_window(self):
        ...
        game_text = self.game_font.render("F2 = neues Spiel", True, (255, 0, 0))
        self.window.blit(game_text, (200, self.height * self.scale + 10))

        game_text = self.game_font.render("Esc = Spiel beenden", True, (255, 0, 0))
        self.window.blit(game_text, (400, self.height * self.scale + 10))
        ...
```

## Das Spiel lösen

Der Spieler hat das Spiel gelöst, wenn sich jede Kiste in einem der Ziel-Quadrate befindet. Die folgende Methode kümmert sich um die Überprüfung dessen:

```python
    def game_solved(self):
        for y in range(self.height):
            for x in range(self.width):
                if self.map[y][x] in [2, 6]:
                    return False
        return True
```

Die Methode durchläuft alle Quadrate im Spielgitter. Wenn eines der Quadrate eine 2 (ein leeres Ziel-Quadrat) oder eine 6 (ein Roboter in einem Ziel-Quadrat) ist, ist das Spiel noch nicht gelöst, daher gibt die Methode `False` zurück. Wenn kein solches Quadrat im Gitter vorhanden ist, müssen alle Ziel-Quadrate von Kisten besetzt sein, das Spiel ist gelöst und die Methode gibt `True` zurück.

Wenn der Spieler das Spiel löst, sollten wir mit der Methode `draw_window` eine entsprechende Nachricht anzeigen:

```python
    def draw_window(self):
        ...
        if self.game_solved():
            game_text = self.game_font.render("Herzlichen Glückwunsch, Sie haben das Spiel gelöst!", True, (255, 0, 0))
            game_text_x = self.scale * self.width / 2 - game_text.get_width() / 2
            game_text_y = self.scale * self.height / 2 - game_text.get_height() / 2
            pygame.draw.rect(self.window, (0, 0, 0), (game_text_x, game_text_y, game_text.get_width(), game_text.get_height()))
            self.window.blit(game_text, (game_text_x, game_text_y))
        ...
```

Der Vollständigkeit halber ändern wir auch die Methode `move`, sodass sich der Spieler nicht mehr bewegen kann, wenn er das Spiel gelöst hat:

```python
    def move(self, move_y, move_x):
        if self.game_solved():
            return
        ...
```

Der Spieler kann jedoch weiterhin das Spielgitter und den Endzustand des Spiels sehen.

## Ein Hinweis zum Testen

Bei der Entwicklung von Spielen kommt es oft vor, dass man überprüfen möchte, was in einer späteren Situation im Spiel passiert. In diesem Spiel ist beispielsweise der Moment, in dem das Spiel gelöst ist, eine solche Situation.

Es kann schwierig sein, das korrekte Funktionieren einer solchen Situation zu testen, da man normalerweise das Spiel lösen müsste, um diesen Punkt im Spiel zu erreichen. Als Programmierer können wir in unseren Spielen einige vorübergehende Erleichterungen einbauen, um das Testen zu vereinfachen. Beispielsweise könnten wir Folgendes hinzufügen, um das Lösen des Spiels vorübergehend zu erleichtern:

```python
    def game_solved(self):
        return True
```

Nun gibt die Methode immer `True` zurück, was bedeutet, dass das Spiel von vornherein "gelöst" ist. Dies macht es einfach zu überprüfen, ob die Benachrichtigung am Ende gut aussieht und der Spieler sich nach dem Lösen nicht mehr auf dem Gitter bewegen kann. Wenn diese Funktionalität gründlich getestet wurde, können wir die Änderungen rückgängig machen.

## Ihr Spiel auf GitHub?

Das Spiel ist nun fertig. Wenn Sie eine einfache Möglichkeit suchen, mit dem Code und den Bildern herumzuspielen, können Sie den Quellcode von GitHub abrufen:

* [https://github.com/moocfi/sokoban](https://github.com/moocfi/sokoban)

GitHub ist ein beliebter Ort für viele Arten von Programmierprojekten. Es kann verwendet werden, um den Quellcode und andere Materialien all Ihrer eigenen Programmierprojekte zu speichern. Ihr Programm wird dann über die Git-Versionskontrolle verwaltet und kann leicht mit anderen geteilt werden. Sie werden mit Git und GitHub sehr vertraut werden, wenn Sie weitere mooc.fi-Programmierkurse belegen.

## Wie viele Züge sind erforderlich?

Das Gitter in diesem Spiel ist recht klein, aber das Spiel ist gar nicht so einfach. Die erste Herausforderung besteht darin, das Spiel einfach zu bestehen, aber die nächste Stufe ist der Versuch, dies mit so wenigen Zügen wie möglich zu tun. Wie kurz ist der kürzeste Pfad zu einer Lösung?

Die Suche nach der kürzestmöglichen Lösung ist keineswegs eine einfache Aufgabe, aber auch hierfür gibt es rechnerische Lösungen. Sie sind eines der Themen des Kurses _Datenstrukturen und Algorithmen_.
