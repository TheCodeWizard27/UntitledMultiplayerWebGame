# Controller Listener
## Sinn und Zweck
Mit diesem Kontroller kann man einfacher auf die Daten, der angeschlossenen Kontrollern, zugreiffen, wie auch ein Binding für Events fest legen.
## Funktionen
###start
Dies startet den Interval, inwelchem die Daten verarbeitet werden.
###stop
Dieser setzt den Interval zurück
###_scanAddGamePads
Iteriert die lokale Liste mit der vom Browser. Neue Einträge werden in der Lokalen ergänzt.
###_scanRemoveGamePads
Iteriert die lokale Liste mit der vom Browser. Alte Einträge werden in der Lokalen entfernt.
###setButtonCallback
Die setzt die Events fest, welche aufgerufen wird, wenn etwas bei den Knöpfeh passiert.
###setDPadCallback
Die setzt die Events fest, welche aufgerufen wird, wenn etwas auf dem Steuerknüpel passiert.
###setGlobalEvents
Die setzt die Events fest, welche aufgerufen wird, wenn ein Kontroller verbunden oder getrennt wird.
###setDpadDelta
Setzt die Genauigkeit eines analogen Kontroller Knüppels, ab welcher Verschiebdistanz zur Mitte die Events getriggert werden.
###setIntervalDelay
Setzt die Zeitspanne in Milisekunden zwischen den Trigger Eventen
###reload
Setzt das gesetzte Delay zwischen den Perionen in kraft


