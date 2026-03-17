---
path: '/part-13/4-more-pygame-techniques'
title: 'Weitere Pygame-Techniken'
hidden: false
---

<text-box variant='learningObjectives' name="Lernziele">

Nach diesem Abschnitt

- werden Sie wissen, wie man den Titel des Pygame-Fensters festlegt
- werden Sie in der Lage sein, Formen mit Pygame zu zeichnen
- werden Sie wissen, wie man Text in Ihrem Fenster anzeigt

</text-box>

## Der Fenstertitel

Ihre Programme werden professioneller aussehen, wenn der Fenstertitel anstelle von "pygame window" den tatsächlichen Namen des Programms enthält. Der Titel wird mit der Funktion `pygame.display.set_caption` festgelegt:

```python
pygame.display.set_caption("Großes Abenteuer")
```

## Zeichnen von Formen

Das folgende Programm zeichnet ein Rechteck, einen Kreis und eine Linie auf den Bildschirm:

```python
import pygame

pygame.init()
display = pygame.display.set_mode((640, 480))
display.fill((0, 0, 0))

pygame.draw.rect(display, (0, 255, 0), (50, 100, 200, 250))
pygame.draw.circle(display, (255, 0, 0), (200, 150), 40)
pygame.draw.line(display, (0, 0, 255), (80, 120), (300, 160), 2)

pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Das Ausführen des obigen Codes sollte so aussehen:

<img src="pygame_shapes.gif">

## Text zeichnen

Text wird in Pygame in zwei Schritten gezeichnet: Zuerst erstellen wir ein Bild, das den gewünschten Text enthält, und dann wird dieses Bild auf den Bildschirm gezeichnet. Es funktioniert wie folgt:

```python
import pygame

pygame.init()
display = pygame.display.set_mode((640, 480))
display.fill((0, 0, 0))

game_font = pygame.font.SysFont("Arial", 24)
text = game_font.render("Hallo zusammen!", True, (255, 0, 0))
display.blit(text, (100, 50))
pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Das Ausführen des obigen Codes sollte so aussehen:

<img src="pygame_text.gif">

Hier erstellt die Methode `pygame.font.SysFont` ein Schriftart-Objekt, das die Systemschriftart Arial in Größe 24 verwendet. Die Methode `render` erstellt ein Bild des angegebenen Textes in der gewählten Farbe. Dieses Bild wird mit der Methode `blit` wie zuvor auf das Fenster gezeichnet.

Hinweis: Verschiedene Systeme haben unterschiedliche Schriftarten zur Verfügung. Wenn das System, auf dem dieses Programm ausgeführt wird, nicht über die Schriftart Arial verfügt (obwohl Arial eine sehr verbreitete Schriftart ist, die auf den meisten Systemen verfügbar ist), wird stattdessen die Standard-Systemschriftart verwendet. Wenn Sie eine bestimmte Schriftart für Ihr Spiel benötigen, können Sie die Schriftartdatei in das Spielverzeichnis aufnehmen und ihren Speicherort für die Methode `pygame.font.Font` angeben.

## Übungen

Hier sind einige fortgeschrittenere Übungen zum Üben dessen, was Sie in diesem Teil des Kursmaterials gelernt haben.

<programming-exercise name='Uhr' tmcname='part13-16_clock'>

Bitte schreiben Sie ein Programm, das ein Zifferblatt anzeigt, welches die Systemzeit wiedergibt. Das Endergebnis sollte so aussehen:

<img src="pygame_clock.gif">

</programming-exercise>

<programming-exercise name='Asteroiden' tmcname='part13-17_asteroids'>

Bitte erstellen Sie ein Spiel, bei dem Asteroiden vom Himmel fallen. Der Spieler bewegt einen Roboter nach links und rechts und versucht, die fallenden Felsen einzusammeln. Der Spieler erhält einen Punkt für jeden gesammelten Asteroiden, und die Gesamtpunktzahl wird oben im Fenster angezeigt. Das Spiel endet, wenn der Spieler einen Asteroiden verpasst. Das Endergebnis sollte so aussehen:

<img src="pygame_asteroids.gif">

Hinweis: Die obige Animation stammt aus der finnischen Version des Kurses. Sie können das Wort "Points" anstelle des oben abgebildeten finnischen Äquivalents "Pisteet" verwenden.

Die Übungsvorlage enthält das Bild `rock.png` für den Asteroiden.

</programming-exercise>
