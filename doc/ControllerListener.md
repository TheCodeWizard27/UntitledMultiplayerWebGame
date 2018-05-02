# Controller Listener
## Sinn und Zweck
Mit diesem Kontroller kann man einfacher auf die Daten, der angeschlossenen Kontrollern, zugreiffen, wie auch ein Binding für Events fest legen.
## Funktionen
###start
Dies startet den Interval, inwelchem die Daten verarbeitet werden.
###stop
Dieser setzt den Interval zurück
###_loop
Hauptverarbeitungsschlaufe
###_scanGamePads
Hier werden alle Kontroller durchlaufen. Neue werden der internen Liste hinzugefügt, und getrennte werden aus der Liste entfernt.
###setButtonCallback
Die setzt die Events fest, welche aufgerufen wird, wenn etwas bei den Knöpfeh passiert.
###setDPadCallback
Die setzt die Events fest, welche aufgerufen wird, wenn etwas auf dem Steuerknüpel passiert.
###setGlobalEvents
Die setzt die Events fest, welche aufgerufen wird, wenn ein Kontroller verbunden oder getrennt wird.
###getDPadDirection
Diese Funktion liefert immer den aktuellen Wert des Steuerknüpels.