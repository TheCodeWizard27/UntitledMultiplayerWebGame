#Game Controller
## Sinn und Zweck
Dieser Kontroller initialisiert das Spiel, startet das Laden der Texturen und setzt die Eventlistener Funktionen. Die Klasse ist im Singleton Style aufgesetzt weshalb das Objekt in der Klasse erstellt wird.
## Funktionen
###getInstance
Erstellt neuer GameController falls noch nicht vorhanden und gibt ihn zurück.
###init
Setzt wichtige variablen ladet Texturen und setzt die EventListener.
###start
Wird nach dem Laden der Texturen ausgeführt und startet den Controller Listener sowie den FPS Ticker.
###update
Aktualisiert Rekursiv jedes Objekt und Rendert das Spiel erneut.
###controllerConnect
Wird bei Verbindung eines neues Kontrollers gerufen und erstellt neuen Spieler.
###controllerDisconnect
Wird bei trennung eines Kontrollers gerufen und löscht bei Verbinden erstellten Spieler mit gleicher ID.
###controllerBtnUp
Wird bei drücken eines Buttons gerufen und übergibt die ID sowie der Button der gedrückt wurde.
###controllerBtnDown
Wird bei loslasen eines Buttons gerufen und übergibt die ID sowie der losgelasene Button mit.
###controllerDPadUp
Wird bei loslasen einer Richtung des DPads gerufen und übergibt die ID sowie die Achse.
###controllerDPadDown
Wird bei drücken einer Richtung des DPads gerufen und übergibt die ID sowie die Achse.
###