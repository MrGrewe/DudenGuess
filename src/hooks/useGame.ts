import { useState, useCallback } from 'react';
import type { Player, GameData, DudenWord, GameState, GameMode, DrinkEvent } from '@/types/game';

// Extensive Duden words collection for the game
const DUDEN_WORDS: DudenWord[] = [
{ word: "Herzschmerz", definition: "Gefühl von Traurigkeit oder Liebeskummer" },
{ word: "Sehnsucht", definition: "Starkes Verlangen nach etwas oder jemandem" },
{ word: "Glücksmoment", definition: "Kurzer, intensiver Moment der Freude" },
{ word: "Vertrauen", definition: "Festes Gefühl der Zuversicht in jemanden oder etwas" },
{ word: "Leidenschaft", definition: "Starkes Gefühl von Begeisterung oder Liebe" },
{ word: "Geborgenheit", definition: "Gefühl von Sicherheit und Schutz" },
{ word: "Freiheit", definition: "Zustand, in dem man unabhängig und selbstbestimmt ist" },
{ word: "Abenteuerlust", definition: "Starkes Verlangen nach spannenden Erlebnissen" },
{ word: "Hoffnung", definition: "Zuversicht, dass sich etwas positiv entwickeln wird" },
{ word: "Schicksal", definition: "Eine nicht beeinflussbare Macht, die das Leben bestimmt" },
{ word: "Erinnerung", definition: "Bewusstsein vergangener Erlebnisse oder Ereignisse" },
{ word: "Dankbarkeit", definition: "Gefühl der Anerkennung und des Dankes" },
{ word: "Freundschaft", definition: "Enge, auf Vertrauen basierende Beziehung zwischen Menschen" },
{ word: "Mut", definition: "Fähigkeit, trotz Angst etwas zu wagen" },
{ word: "Geduld", definition: "Fähigkeit, ruhig und gelassen abzuwarten" },
{ word: "Ehrgeiz", definition: "Starkes Streben nach Erfolg oder Leistung" },
{ word: "Fantasie", definition: "Fähigkeit, sich Dinge vorzustellen, die nicht real sind" },
{ word: "Neugier", definition: "Starkes Interesse, Neues zu erfahren oder zu entdecken" },
{ word: "Rätsel", definition: "Aufgabe oder Problem, das gelöst werden muss" },
{ word: "Schatten", definition: "Bereich, der durch Lichtmangel dunkel erscheint" },
{ word: "Spiegel", definition: "Gegenstand, der Bilder durch Reflexion sichtbar macht" },
{ word: "Oase", definition: "Fruchtbare Stelle inmitten einer Wüste" },
{ word: "Illusion", definition: "Falsche Wahrnehmung oder Täuschung" },
{ word: "Finsternis", definition: "Völlige Abwesenheit von Licht" },
{ word: "Glanz", definition: "Starkes, helles Leuchten oder Strahlen" },
{ word: "Stille", definition: "Zustand völliger Geräuschlosigkeit" },
{ word: "Chaos", definition: "Völlige Unordnung oder Verwirrung" },
{ word: "Traum", definition: "Abfolge von Bildern und Gedanken im Schlaf" },
{ word: "Labyrinth", definition: "Irrgarten mit vielen Wegen und Sackgassen" },
{ word: "Verwandlung", definition: "Grundlegende Veränderung des Zustands oder Wesens" },
{ word: "Versuchung", definition: "Starker Reiz, etwas Verbotenes oder Unkluges zu tun" },
{ word: "Magie", definition: "Übernatürliche Kräfte oder Zauberei" },
{ word: "Gefahr", definition: "Situation, die Schaden oder Verletzung verursachen kann" },
{ word: "Macht", definition: "Fähigkeit, Einfluss auf andere oder Ereignisse auszuüben" },
{ word: "List", definition: "Geschicktes, oft täuschendes Vorgehen" },
{ word: "Sieg", definition: "Erfolg in einem Wettkampf oder einer Auseinandersetzung" },
{ word: "Niederlage", definition: "Verlust in einem Wettkampf oder einer Auseinandersetzung" },
{ word: "Rache", definition: "Vergeltung für erlittenes Unrecht" },
{ word: "Abenteuer", definition: "Aufregendes oder ungewöhnliches Erlebnis" },
{ word: "Schauer", definition: "Leichtes Gefühl von Angst oder Kälte" },
{ word: "Gedanke", definition: "Produkt des Denkens oder Überlegens" },
{ word: "Verlangen", definition: "Starkes inneres Bedürfnis nach etwas" },
{ word: "Zufall", definition: "Unvorhergesehenes Ereignis ohne erkennbare Ursache" },
{ word: "Horizont", definition: "Linie, an der Himmel und Erde scheinbar aufeinandertreffen" },
{ word: "Weisheit", definition: "Tiefes Verständnis und Wissen über das Leben" },
{ word: "Stärke", definition: "Fähigkeit, körperliche oder geistige Belastungen auszuhalten" },
{ word: "Leichtigkeit", definition: "Zustand von Mühelosigkeit oder Unbeschwertheit" },
{ word: "Stolz", definition: "Gefühl von Selbstwert und Zufriedenheit mit eigenen Leistungen" },
{ word: "Einsamkeit", definition: "Zustand, allein und ohne Gesellschaft zu sein" },
{ word: "Verlust", definition: "Das Fehlen von etwas, das man zuvor besessen hat" },
{ word: "Erfolg", definition: "Erreichen eines angestrebten Ziels" },
{ word: "Rebellion", definition: "Aufstand gegen bestehende Regeln oder Autoritäten" },
{ word: "Wunder", definition: "Ereignis, das Staunen oder Bewunderung hervorruft" },
{ word: "Stärkeprobe", definition: "Test der körperlichen oder geistigen Kraft" },
{ word: "Weitblick", definition: "Fähigkeit, langfristige Entwicklungen zu erkennen" },
{ word: "Zuflucht", definition: "Ort oder Person, bei der man Schutz findet" },
{ word: "Bestimmung", definition: "Vorgegebenes Ziel oder Zweck einer Sache" },
{ word: "Gleichgewicht", definition: "Zustand der Ausgeglichenheit oder Stabilität" },
{ word: "Verwirrung", definition: "Zustand der Unsicherheit oder Orientierungslosigkeit" },
{ word: "Kraft", definition: "Fähigkeit, Arbeit oder Wirkung zu erzeugen" },
{ word: "Ehre", definition: "Ansehen und Würde einer Person" },
{ word: "Gedränge", definition: "Dichtes Zusammenstehen vieler Menschen" },
{ word: "Flamme", definition: "Leuchtende Erscheinung beim Verbrennen" },
{ word: "Weite", definition: "Große räumliche Ausdehnung" },
{ word: "Gunst", definition: "Wohlwollen oder Zuneigung, die jemandem entgegengebracht wird" },
{ word: "Ruhm", definition: "Allgemeine Anerkennung und Bewunderung" },
{ word: "Bedeutung", definition: "Sinn oder Wert einer Sache" },
{ word: "Grenze", definition: "Trennlinie zwischen Gebieten oder Zuständen" },
{ word: "Wille", definition: "Innere Entschlossenheit, etwas zu tun oder zu erreichen" },
{ word: "Drang", definition: "Starkes inneres Bedürfnis oder Verlangen" },
{ word: "Hindernis", definition: "Etwas, das den Fortschritt erschwert oder verhindert" },
{ word: "Streit", definition: "Konflikt zwischen Personen oder Gruppen" },
{ word: "Gefühl", definition: "Innere, oft schwer beschreibbare Empfindung" },
{ word: "Zorn", definition: "Starkes Gefühl von Wut" },
{ word: "Ewigkeit", definition: "Unendliche Zeit ohne Anfang und Ende" },
{ word: "Erleuchtung", definition: "Plötzliche Erkenntnis oder tiefes Verständnis" },
{ word: "Stimme", definition: "Laut, den Menschen beim Sprechen erzeugen" },
{ word: "Finsternis", definition: "Völlige Abwesenheit von Licht" },
{ word: "Wechsel", definition: "Vorgang des Sich-Veränderns oder Austauschs" },
{ word: "Durst", definition: "Starkes Bedürfnis nach Flüssigkeit" },
{ word: "Hoffnungsschimmer", definition: "Kleines Zeichen für eine positive Wendung" },
{ word: "Zerfall", definition: "Allmähliche Auflösung oder Zerstörung" },
{ word: "Erstaunen", definition: "Gefühl der Verwunderung oder Überraschung" },
{ word: "Widerstand", definition: "Gegenwehr gegen äußere Einflüsse oder Druck" },
{ word: "Neuanfang", definition: "Start nach einem Ende oder einer Veränderung" },
{ word: "Vereinigung", definition: "Zusammenschluss mehrerer Teile zu einem Ganzen" },
{ word: "Spur", definition: "Anzeichen, das auf etwas Vergangenes hinweist" },
{ word: "Erbe", definition: "Materielle oder immaterielle Hinterlassenschaft" }
{ word: "Abgrund", definition: "Sehr tiefer, steiler Abfall oder schwerwiegende Situation" },
{ word: "Absicht", definition: "Geplanter Wille, etwas Bestimmtes zu tun" },
{ word: "Alltag", definition: "Täglicher Ablauf des Lebens" },
{ word: "Anfang", definition: "Zeitpunkt oder Ort, an dem etwas beginnt" },
{ word: "Angst", definition: "Gefühl starker Unsicherheit oder Bedrohung" },
{ word: "Armut", definition: "Mangel an lebensnotwendigen Mitteln" },
{ word: "Asche", definition: "Rückstand von etwas, das verbrannt ist" },
{ word: "Aufbruch", definition: "Beginn einer neuen Entwicklung oder Reise" },
{ word: "Ausdauer", definition: "Fähigkeit, eine Anstrengung lange durchzuhalten" },
{ word: "Aussicht", definition: "Blick in die Ferne oder Erwartung für die Zukunft" },
{ word: "Balance", definition: "Zustand des Gleichgewichts" },
{ word: "Bedrohung", definition: "Gefahr, die sich abzeichnet" },
{ word: "Begeisterung", definition: "Starkes, freudiges Engagement" },
{ word: "Bewegung", definition: "Zustand des Sich-Verändernden im Raum" },
{ word: "Beweis", definition: "Nachweis für die Richtigkeit einer Aussage" },
{ word: "Bewusstsein", definition: "Erkennen und Erleben der eigenen Existenz" },
{ word: "Blüte", definition: "Teil einer Pflanze, aus dem Früchte entstehen" },
{ word: "Brand", definition: "Großes, unkontrolliertes Feuer" },
{ word: "Chance", definition: "Möglichkeit, Erfolg zu haben" },
{ word: "Dämmerung", definition: "Zeit des Übergangs zwischen Tag und Nacht" },
{ word: "Denkmal", definition: "Bauwerk zum Gedenken an Personen oder Ereignisse" },
{ word: "Durcheinander", definition: "Zustand völliger Unordnung" },
{ word: "Durchbruch", definition: "Plötzlicher, entscheidender Fortschritt" },
{ word: "Eigenschaft", definition: "Besonderes Merkmal einer Person oder Sache" },
{ word: "Einfluss", definition: "Fähigkeit, auf andere einzuwirken" },
{ word: "Eingebung", definition: "Plötzlich auftretender Gedanke oder Idee" },
{ word: "Einsamkeit", definition: "Zustand des Alleinseins ohne Gesellschaft" },
{ word: "Enttäuschung", definition: "Gefühl, wenn Erwartungen nicht erfüllt werden" },
{ word: "Erlebnis", definition: "Besondere Erfahrung oder Begebenheit" },
{ word: "Ernüchterung", definition: "Erkenntnis, die eine Illusion beendet" },
{ word: "Eroberung", definition: "Einnehmen oder Gewinnen von etwas" },
{ word: "Erwartung", definition: "Hoffnung auf ein zukünftiges Ereignis" },
{ word: "Fackel", definition: "Tragbare Lichtquelle mit offener Flamme" },
{ word: "Fessel", definition: "Vorrichtung, die Bewegung einschränkt" },
{ word: "Feuerwerk", definition: "Spektakel aus bunten Lichtern und Knallen" },
{ word: "Flut", definition: "Große, sich schnell ausbreitende Menge" },
{ word: "Freiwilligkeit", definition: "Handeln ohne Zwang oder Pflicht" },
{ word: "Frust", definition: "Gefühl der Enttäuschung oder des Ärgers" },
{ word: "Funke", definition: "Kleiner Lichtpunkt, der durch Hitze entsteht" },
{ word: "Furcht", definition: "Starkes Gefühl von Angst vor Gefahr" },
{ word: "Geheimhaltung", definition: "Bewahren von Wissen vor anderen" },
{ word: "Gelassenheit", definition: "Innere Ruhe und Ausgeglichenheit" },
{ word: "Gerücht", definition: "Unbestätigte Nachricht, die sich verbreitet" },
{ word: "Gewissheit", definition: "Sichere Erkenntnis über etwas" },
{ word: "Gier", definition: "Starkes, maßloses Verlangen nach etwas" },
{ word: "Glut", definition: "Hitze, die nach einem Feuer übrig bleibt" },
{ word: "Gnade", definition: "Barmherziges Verhalten gegenüber jemandem" },
{ word: "Granit", definition: "Sehr hartes, körniges Gestein" },
{ word: "Grenzfall", definition: "Beispiel, das nur knapp in eine Kategorie passt" },
{ word: "Groll", definition: "Langanhaltendes Gefühl von Ärger oder Hass" },
{ word: "Hafen", definition: "Ort, an dem Schiffe Schutz finden" },
{ word: "Halt", definition: "Stütze oder Sicherheit in einer Situation" },
{ word: "Harmonie", definition: "Ausgewogenes und friedliches Zusammenspiel" },
{ word: "Härte", definition: "Eigenschaft, hart oder widerstandsfähig zu sein" },
{ word: "Heimat", definition: "Ort, an dem man sich zugehörig fühlt" },
{ word: "Heldenmut", definition: "Besondere Tapferkeit in schwierigen Situationen" },
{ word: "Herausforderung", definition: "Schwierige Aufgabe, die bewältigt werden muss" },
{ word: "Herzklopfen", definition: "Schneller Herzschlag durch Aufregung oder Angst" },
{ word: "Hierarchie", definition: "Ordnung nach Rang oder Stellung" },
{ word: "Hitze", definition: "Hohe Temperatur" },
{ word: "Hunger", definition: "Starkes Bedürfnis nach Nahrung" },
{ word: "Ideal", definition: "Vorstellung von Vollkommenheit" },
{ word: "Instinkt", definition: "Angeborenes Verhalten ohne bewusste Überlegung" },
{ word: "Irrtum", definition: "Fehlerhafte Annahme oder Einschätzung" },
{ word: "Jubel", definition: "Lauter Ausdruck von Freude" },
{ word: "Kälte", definition: "Niedrige Temperatur" },
{ word: "Katastrophe", definition: "Großes Unglück mit schweren Folgen" },
{ word: "Kerze", definition: "Wachsstock mit Docht zum Abbrennen" },
{ word: "Klugheit", definition: "Fähigkeit, überlegt und weitsichtig zu handeln" },
{ word: "Kompass", definition: "Gerät zur Bestimmung der Himmelsrichtungen" },
{ word: "Kraftakt", definition: "Große, anstrengende Leistung" },
{ word: "Kritik", definition: "Beurteilung mit Hinweisen auf Stärken und Schwächen" },
{ word: "Krönung", definition: "Höhepunkt oder feierlicher Abschluss" },
{ word: "Kugel", definition: "Runder, dreidimensionaler Körper" },
{ word: "Kunstwerk", definition: "Werk künstlerischen Schaffens" },
{ word: "Lagerfeuer", definition: "Feuer im Freien zur Wärme oder Beleuchtung" },
{ word: "Lichtblick", definition: "Hoffnungsvolles Zeichen in einer schwierigen Lage" },
{ word: "Lockerheit", definition: "Zustand von Entspannung und Gelassenheit" },
{ word: "Lücke", definition: "Fehlende Stelle in einem Ganzen" },
{ word: "Lust", definition: "Starkes Verlangen nach Genuss oder Erleben" },
{ word: "Märchen", definition: "Fantasievolle Erzählung mit wundersamen Elementen" },
{ word: "Melodie", definition: "Folge von Tönen, die ein musikalisches Ganzes bilden" },
{ word: "Menschheit", definition: "Gesamtheit aller Menschen" },
{ word: "Mitte", definition: "Zentraler Punkt oder Bereich" },
{ word: "Möglichkeit", definition: "Option, dass etwas eintreten kann" },
{ word: "Mondlicht", definition: "Licht, das vom Mond ausgeht" },
{ word: "Mutlosigkeit", definition: "Fehlender Antrieb oder Zuversicht" },
{ word: "Nacht", definition: "Dunkler Zeitraum zwischen Sonnenuntergang und -aufgang" },
{ word: "Nebelhauch", definition: "Leichter, dünner Nebel" },
{ word: "Not", definition: "Schwierige oder gefährliche Lage" },
{ word: "Opfer", definition: "Jemand, der Schaden erleidet, oder eine bewusste Hingabe" },
{ word: "Paradies", definition: "Ort vollkommener Glückseligkeit" },
{ word: "Pech", definition: "Unglückliche Fügung von Ereignissen" },
{ word: "Plage", definition: "Langanhaltende, belastende Situation" },
{ word: "Präzision", definition: "Genauigkeit und Exaktheit" },
{ word: "Puls", definition: "Rhythmischer Herzschlag, fühlbar am Körper" },
{ word: "Rettung", definition: "Befreiung aus einer Gefahr" },
{ word: "Risiko", definition: "Möglichkeit eines negativen Ausgangs" },
{ word: "Ruhestand", definition: "Lebensphase nach dem Arbeitsleben" },
{ word: "Ruine", definition: "Überreste eines zerstörten Bauwerks" },
{ word: "Schlüssel", definition: "Werkzeug zum Öffnen oder Schließen von Schlössern" },
{ word: "Schimmer", definition: "Schwaches, flackerndes Licht" },
{ word: "Schutz", definition: "Bewahrung vor Gefahr oder Schaden" },
{ word: "Signal", definition: "Zeichen zur Verständigung oder Warnung" },
{ word: "Spiegelung", definition: "Abbild, das durch Reflexion entsteht" },
{ word: "Sturm", definition: "Starker Wind mit hoher Geschwindigkeit" },
{ word: "Täuschung", definition: "Irreführung durch falschen Eindruck" },
{ word: "Träne", definition: "Flüssigkeit, die beim Weinen aus den Augen kommt" },
{ word: "Verrat", definition: "Preisgabe von Geheimnissen oder Vertrauen" },
{ word: "Wunderwerk", definition: "Besonders beeindruckendes Werk oder Objekt" },
{ word: "Zeremonie", definition: "Feierlicher, geregelter Ablauf" },
{ word: "Zwielicht", definition: "Halbdunkel in der Dämmerung" },
{ word: "Zyklus", definition: "Sich wiederholende Abfolge von Ereignissen" }
{ word: "Abendrot", definition: "Rötliche Färbung des Himmels bei Sonnenuntergang" },
{ word: "Abschied", definition: "Trennung von Personen oder Orten" },
{ word: "Adler", definition: "Großer Greifvogel mit kräftigem Schnabel" },
{ word: "Ahnung", definition: "Vorgefühl oder leiser Verdacht" },
{ word: "Aktivität", definition: "Zustand des Tätigseins" },
{ word: "Alptraum", definition: "Schrecklicher Traum, der Angst auslöst" },
{ word: "Amulett", definition: "Schmuckstück mit Schutzfunktion" },
{ word: "Anker", definition: "Gerät, das ein Schiff am Platz hält" },
{ word: "Anmut", definition: "Harmonische, elegante Ausstrahlung" },
{ word: "Applaus", definition: "Beifall, meist durch Klatschen" },
{ word: "Arbeiter", definition: "Person, die körperliche oder geistige Arbeit verrichtet" },
{ word: "Ast", definition: "Größerer Zweig eines Baumes" },
{ word: "Atemzug", definition: "Einmaliges Ein- und Ausatmen" },
{ word: "Attraktion", definition: "Besonderer Anziehungspunkt" },
{ word: "Ausblick", definition: "Aussicht in die Ferne oder Perspektive für die Zukunft" },
{ word: "Ausflug", definition: "Kürzere Reise zu Erholungszwecken" },
{ word: "Ausnahme", definition: "Etwas, das sich von der Regel unterscheidet" },
{ word: "Ausrüstung", definition: "Gesamtheit von Gegenständen für eine bestimmte Tätigkeit" },
{ word: "Austausch", definition: "Wechselseitiges Geben und Nehmen" },
{ word: "Autorität", definition: "Ansehen und Einfluss, den jemand besitzt" },
{ word: "Bach", definition: "Kleiner, natürlicher Wasserlauf" },
{ word: "Berggipfel", definition: "Höchster Punkt eines Berges" },
{ word: "Beleuchtung", definition: "Licht, das einen Raum oder Ort erhellt" },
{ word: "Beruhigung", definition: "Wiederherstellung von Ruhe und Gelassenheit" },
{ word: "Beschleunigung", definition: "Zunahme der Geschwindigkeit" },
{ word: "Besonderheit", definition: "Merkmal, das etwas einzigartig macht" },
{ word: "Besuch", definition: "Aufsuchen einer Person oder eines Ortes" },
{ word: "Bestechung", definition: "Beeinflussung durch Geschenke oder Geld" },
{ word: "Betonung", definition: "Hervorhebung eines Wortes oder Gedankens" },
{ word: "Beweggrund", definition: "Grund für eine Handlung oder Entscheidung" },
{ word: "Bewertung", definition: "Einschätzung des Werts oder der Qualität" },
{ word: "Bildung", definition: "Erwerb von Wissen und Fähigkeiten" },
{ word: "Bindung", definition: "Starke Verbindung zwischen Menschen oder Dingen" },
{ word: "Biografie", definition: "Lebensbeschreibung einer Person" },
{ word: "Blitz", definition: "Lichterscheinung bei einem Gewitter" },
{ word: "Blut", definition: "Körperflüssigkeit, die Sauerstoff transportiert" },
{ word: "Bogen", definition: "Gebogene Linie oder Waffe zum Schießen" },
{ word: "Botschaft", definition: "Mitteilung oder diplomatische Vertretung eines Landes" },
{ word: "Brücke", definition: "Bauwerk zur Überquerung von Hindernissen" },
{ word: "Buch", definition: "Gebundene Sammlung von bedruckten Seiten" },
{ word: "Burg", definition: "Befestigtes Bauwerk aus vergangener Zeit" },
{ word: "Chaossturm", definition: "Sehr heftige, ungeordnete Situation" },
{ word: "Charme", definition: "Besondere, anziehende Ausstrahlung" },
{ word: "Chance", definition: "Gelegenheit, die Erfolg bringen kann" },
{ word: "Dach", definition: "Abdeckung eines Gebäudes nach oben hin" },
{ word: "Dame", definition: "Frau mit höflichem oder vornehmem Auftreten" },
{ word: "Denkweise", definition: "Art und Weise, wie jemand denkt" },
{ word: "Dialog", definition: "Gespräch zwischen zwei oder mehreren Personen" },
{ word: "Diebstahl", definition: "Wegnahme fremden Eigentums" },
{ word: "Dorf", definition: "Kleine Siedlung auf dem Land" },
{ word: "Drache", definition: "Fabelwesen mit Flügeln und oft Feueratem" },
{ word: "Druck", definition: "Kraft, die auf eine Fläche ausgeübt wird" },
{ word: "Durchblick", definition: "Verständnis für eine komplexe Sache" },
{ word: "Ebbe", definition: "Zurückgehendes Wasser im Meer bei Gezeiten" },
{ word: "Ehrlichkeit", definition: "Eigenschaft, die Wahrheit zu sagen" },
{ word: "Einheit", definition: "Ganzes, das aus Teilen besteht" },
{ word: "Einklang", definition: "Harmonie oder Übereinstimmung" },
{ word: "Einladung", definition: "Aufforderung, an einem Ereignis teilzunehmen" },
{ word: "Einsicht", definition: "Verständnis für einen Zusammenhang" },
{ word: "Eisberg", definition: "Großer schwimmender Block aus Eis" },
{ word: "Elan", definition: "Schwungvolle Begeisterung und Tatkraft" },
{ word: "Empathie", definition: "Fähigkeit, die Gefühle anderer nachzuempfinden" },
{ word: "Entfaltung", definition: "Entwicklung von Fähigkeiten oder Möglichkeiten" },
{ word: "Entscheidung", definition: "Auswahl zwischen mehreren Möglichkeiten" },
{ word: "Entwicklung", definition: "Prozess der Veränderung und Verbesserung" },
{ word: "Erdbeben", definition: "Starke Erschütterung der Erdoberfläche" },
{ word: "Erfindung", definition: "Etwas Neues, das erstmals entwickelt wurde" },
{ word: "Ergebnis", definition: "Resultat eines Vorgangs oder Prozesses" },
{ word: "Erleichterung", definition: "Gefühl, wenn eine Belastung nachlässt" },
{ word: "Ernte", definition: "Einbringen von reifen Feldfrüchten" },
{ word: "Errettung", definition: "Rettung aus großer Gefahr" },
{ word: "Erwartung", definition: "Hoffnung auf ein bestimmtes Ereignis" },
{ word: "Fabel", definition: "Erzählung mit lehrreicher Moral" },
{ word: "Fahrstuhl", definition: "Mechanische Vorrichtung zum Transport zwischen Etagen" },
{ word: "Fantasiewelt", definition: "Gedanklich erschaffene, erfundene Umgebung" },
{ word: "Feder", definition: "Leichtes Körperteil eines Vogels" },
{ word: "Feier", definition: "Festliches Zusammensein aus bestimmtem Anlass" },
{ word: "Fenster", definition: "Öffnung in einer Wand mit Glasfüllung" },
{ word: "Fesselung", definition: "Handlung des Festbindens" },
{ word: "Film", definition: "Aufzeichnung bewegter Bilder" },
{ word: "Flügel", definition: "Körperteil zum Fliegen oder Teil eines Gebäudes" },
{ word: "Fluss", definition: "Natürlich fließendes Gewässer" },
{ word: "Formel", definition: "Mathematischer oder sprachlicher Ausdruck" },
{ word: "Frage", definition: "Aussage, die eine Antwort erwartet" },
{ word: "Freiheitssinn", definition: "Innerer Wunsch nach Unabhängigkeit" },
{ word: "Freude", definition: "Gefühl großer Zufriedenheit oder Glück" },
{ word: "Frucht", definition: "Essbarer Teil einer Pflanze" },
{ word: "Funkeln", definition: "Aufblitzen von Lichtpunkten" },
{ word: "Furchtlosigkeit", definition: "Zustand, ohne Angst zu handeln" },
{ word: "Gabe", definition: "Natürliches Talent oder Geschenk" },
{ word: "Garten", definition: "Abgegrenztes Stück Land mit Pflanzen" },
{ word: "Gebirge", definition: "Gruppe zusammenhängender Berge" },
{ word: "Gefängnis", definition: "Ort zur Unterbringung von Straftätern" },
{ word: "Geflüster", definition: "Leise, kaum hörbare Stimme" },
{ word: "Gefräßigkeit", definition: "Übermäßiger Appetit oder Hunger" },
{ word: "Gelegenheit", definition: "Günstiger Moment für eine Handlung" },
{ word: "Geografie", definition: "Wissenschaft von der Erdoberfläche" },
{ word: "Geradlinigkeit", definition: "Eigenschaft, ehrlich und direkt zu handeln" },
{ word: "Geschenk", definition: "Etwas, das man jemandem ohne Gegenleistung gibt" },
{ word: "Gesellschaft", definition: "Gemeinschaft von Menschen" },
{ word: "Gestaltung", definition: "Formung oder künstlerische Ausarbeitung" },
{ word: "Gewitter", definition: "Stürmisches Wetter mit Donner und Blitz" },
{ word: "Gipfel", definition: "Höchster Punkt eines Berges oder einer Entwicklung" },
{ word: "Glück", definition: "Zustand großer Freude und Zufriedenheit" },
{ word: "Gold", definition: "Edelmetall mit hoher Wertschätzung" },
{ word: "Gunstbeweis", definition: "Zeichen von Wohlwollen" },
{ word: "Haftung", definition: "Verantwortung für verursachten Schaden" },
{ word: "Halle", definition: "Großer, überdachter Raum" },
{ word: "Handlung", definition: "Abfolge von Taten oder Ereignissen" },
{ word: "Harmoniegefühl", definition: "Empfindung des inneren Gleichgewichts" },
{ word: "Heilung", definition: "Wiederherstellung der Gesundheit" },
{ word: "Helm", definition: "Kopfbedeckung zum Schutz" },
{ word: "Herz", definition: "Organ, das Blut durch den Körper pumpt" },
{ word: "Himmel", definition: "Raum über der Erde, der den Blick ins All freigibt" },
{ word: "Hindernislauf", definition: "Laufstrecke mit Hindernissen" },
{ word: "Hoffnungsstrahl", definition: "Plötzliches Gefühl von Zuversicht" },
{ word: "Holz", definition: "Material, das aus Bäumen gewonnen wird" },
{ word: "Horizontlinie", definition: "Linie zwischen Erde und Himmel" },
{ word: "Humor", definition: "Fähigkeit, über Dinge lachen zu können" },
{ word: "Hungerast", definition: "Plötzlicher Leistungsabfall durch Energiemangel" },
{ word: "Idealismus", definition: "Streben nach hohen moralischen Werten" },
{ word: "Illusionist", definition: "Person, die Täuschungen vorführt" },
{ word: "Industrie", definition: "Produktion von Waren in großem Maßstab" },
{ word: "Instabilität", definition: "Zustand mangelnder Festigkeit" },
{ word: "Instrument", definition: "Werkzeug oder Musikinstrument" },
{ word: "Isolation", definition: "Abgeschiedenheit oder Trennung" },
{ word: "Jagd", definition: "Verfolgung von Tieren oder Personen" },
{ word: "Jahrhundert", definition: "Zeitraum von hundert Jahren" },
{ word: "Jahrmarkt", definition: "Öffentliches Fest mit Attraktionen" },
{ word: "Jasmin", definition: "Duftende Blütenpflanze" },
{ word: "Juwel", definition: "Wertvoller Edelstein" },
{ word: "Kaffee", definition: "Getränk aus gerösteten Bohnen" },
{ word: "Kammer", definition: "Kleiner Raum oder Abteil" },
{ word: "Kapitel", definition: "Abschnitt eines Buches" },
{ word: "Karawane", definition: "Gruppe von Reisenden, meist mit Tieren" },
{ word: "Katze", definition: "Haustier mit weichem Fell und Krallen" },
{ word: "Kerker", definition: "Altes Wort für Gefängnis" },
{ word: "Kieselstein", definition: "Kleiner, glatter Stein" },
{ word: "Kirche", definition: "Gebäude für christliche Gottesdienste" },
{ word: "Kissen", definition: "Gepolstertes Objekt zum Liegen oder Sitzen" },
{ word: "Kloster", definition: "Gebäude, in dem Mönche oder Nonnen leben" },
{ word: "Kochkunst", definition: "Fähigkeit, schmackhafte Gerichte zuzubereiten" },
{ word: "Kompassrose", definition: "Symbol auf einer Karte zur Orientierung" },
{ word: "Kontinent", definition: "Großes, zusammenhängendes Festland" },
{ word: "Kontrast", definition: "Starker Unterschied zwischen Dingen" },
{ word: "Krieg", definition: "Bewaffneter Konflikt zwischen Gruppen oder Ländern" },
{ word: "Krone", definition: "Kopfschmuck eines Herrschers" },
{ word: "Kugelblitz", definition: "Seltene Erscheinung bei Gewittern" },
{ word: "Kunststück", definition: "Beeindruckende Leistung oder Darbietung" },
{ word: "Küste", definition: "Übergangsbereich zwischen Land und Meer" },
{ word: "Ladung", definition: "Menge von Gütern, die transportiert wird" },
{ word: "Laterne", definition: "Tragbare oder fest installierte Lichtquelle" },
{ word: "Lebensfreude", definition: "Große Freude am Leben" },
{ word: "Lebensmittel", definition: "Produkte, die der Ernährung dienen" },
{ word: "Lehre", definition: "Vermittlung von Wissen oder Fähigkeiten" },
{ word: "Leid", definition: "Großes seelisches oder körperliches Schmerzempfinden" },
{ word: "Leiter", definition: "Hilfsmittel zum Hinauf- oder Hinabsteigen" },
{ word: "Lichtquelle", definition: "Ursprung von Licht" },
{ word: "Linderung", definition: "Abschwächung von Schmerz oder Leid" },
{ word: "Lob", definition: "Anerkennende Worte oder Gesten" },
{ word: "Logik", definition: "Wissenschaft des richtigen Denkens" },
{ word: "Loyalität", definition: "Treue und Zuverlässigkeit gegenüber jemandem" },
{ word: "Luftzug", definition: "Bewegung der Luft in einem Raum" },
{ word: "Magnet", definition: "Körper mit Anziehungskraft auf Metalle" },
{ word: "Mahnung", definition: "Erinnerung an eine Pflicht oder Zahlung" },
{ word: "Märtyrer", definition: "Person, die für ihre Überzeugung leidet oder stirbt" },
{ word: "Markierung", definition: "Kennzeichnung durch ein Zeichen" },
{ word: "Mauer", definition: "Massive Wand aus Stein oder Beton" },
{ word: "Melancholie", definition: "Stimmung stiller Traurigkeit" },
{ word: "Menschlichkeit", definition: "Mitgefühl und Achtung vor anderen" },
{ word: "Meteor", definition: "Himmelskörper, der in der Atmosphäre verglüht" },
{ word: "Mission", definition: "Besonderer Auftrag oder Zweck" },
{ word: "Morgenrot", definition: "Rötliche Färbung des Himmels bei Sonnenaufgang" },
{ word: "Mystik", definition: "Geheimnisvolle, spirituelle Erfahrungen" },
{ word: "Nachhall", definition: "Verzögertes Fortklingen eines Tons" },
{ word: "Nachricht", definition: "Mitteilung über Ereignisse oder Informationen" },
{ word: "Nachsicht", definition: "Verständnisvolles Verzeihen" },
{ word: "Nahrung", definition: "Alles, was der Ernährung dient" },
{ word: "Naturgewalt", definition: "Starke, unkontrollierbare Kraft der Natur" },
{ word: "Nebelwand", definition: "Dichte, undurchsichtige Nebelmasse" },
{ word: "Neuanfang", definition: "Neuer Beginn nach einem Ende" },
{ word: "Norm", definition: "Regel oder Standard" },
{ word: "Notruf", definition: "Signal zur Anforderung von Hilfe" },
{ word: "Oberfläche", definition: "Äußerste Begrenzung eines Körpers" },
{ word: "Obsidian", definition: "Schwarzes vulkanisches Gestein" },
{ word: "Offenbarung", definition: "Unerwartete, oft tiefgreifende Erkenntnis" },
{ word: "Opfergabe", definition: "Geschenk, das einer höheren Macht dargebracht wird" },
{ word: "Orakel", definition: "Weissagung oder deren Überbringer" },
{ word: "Ordnung", definition: "Systematische Anordnung von Dingen" },
{ word: "Organisation", definition: "Strukturierter Zusammenschluss von Personen" },
{ word: "Orkan", definition: "Sehr starker Sturm" },
{ word: "Panorama", definition: "Weitreichender Rundumblick" },
{ word: "Paradox", definition: "Widersprüchliche, aber wahre Aussage"}
];

// Trinkspiel: zwei einfache Events
const DRINK_EVENTS: DrinkEvent[] = [
  { id: 'random-player-drinks', name: 'Zufalls-Trinker', description: 'Ein Spieler trinkt 1–5 Schlücke', type: 'solo', intensity: 1, rarity: 'common' },
  { id: 'leader-distributes', name: 'Leader verteilt', description: 'Der Leader verteilt 1–5 Schlücke', type: 'team', intensity: 1, rarity: 'common' }
];

function pickWeightedPlayer(players: Player[], scoresById: Record<string, number>): Player | null {
  if (players.length === 0) return null;
  const maxScore = players.reduce((m, p) => Math.max(m, scoresById[p.id] ?? 0), 0);
  const weights = players.map(p => 0.3 + Math.sqrt((maxScore - (scoresById[p.id] ?? 0)) + 1));
  const sum = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * sum;
  for (let i = 0; i < players.length; i++) {
    r -= weights[i];
    if (r <= 0) return players[i];
  }
  return players[players.length - 1];
}

function pickLeader(players: Player[], scoresById: Record<string, number>): Player | null {
  if (players.length === 0) return null;
  return players.slice().sort((a, b) => (scoresById[b.id] ?? 0) - (scoresById[a.id] ?? 0))[0] ?? null;
}

export const useGame = () => {
  const [gameData, setGameData] = useState<GameData>({
    players: [],
    currentRound: 1,
    gameState: 'setup',
    currentWord: null,
    gameMasterId: null,
    selectedWinner: null,
    totalRounds: 5,
    isWordRevealed: false,
    gameMode: 'normal',
    activeDrinkEvent: null,
    activeDrinkEventTargetId: null,
    activeDrinkEventAmount: null
  });

  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());

  const addPlayer = useCallback((name: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      score: 0
    };
    
    setGameData(prev => ({
      ...prev,
      players: [...prev.players, newPlayer]
    }));
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setGameData(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId)
    }));
  }, []);

  const setGameMode = useCallback((mode: GameMode) => {
    // Moduswechsel nur im Setup zulassen
    setGameData(prev => prev.gameState === 'setup' ? { ...prev, gameMode: mode } : prev);
  }, []);

  const getRandomWord = useCallback((): DudenWord => {
    const availableWords = DUDEN_WORDS.filter(word => !usedWords.has(word.word));
    
    if (availableWords.length === 0) {
      // Reset used words if all have been used
      setUsedWords(new Set());
      return DUDEN_WORDS[Math.floor(Math.random() * DUDEN_WORDS.length)];
    }
    
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }, [usedWords]);

  function computeDrinkEventForRound(nextRoundNumber: number, mode: GameMode | undefined, players: Player[], scoresById: Record<string, number>) {
    if (mode !== 'trinkspiel') return { event: null as DrinkEvent | null, targetId: null as string | null, amount: null as number | null };
    if (nextRoundNumber % 2 !== 0) return { event: null, targetId: null, amount: null };
    const event = DRINK_EVENTS[Math.floor(Math.random() * DRINK_EVENTS.length)];
    const amount = Math.floor(Math.random() * 5) + 1; // 1..5
    let targetId: string | null = null;
    if (event.id === 'random-player-drinks') {
      const target = pickWeightedPlayer(players, scoresById);
      targetId = target ? target.id : null;
    } else if (event.id === 'leader-distributes') {
      const leader = pickLeader(players, scoresById);
      targetId = leader ? leader.id : null;
    }
    return { event, targetId, amount };
  }

  const startGame = useCallback(() => {
    if (gameData.players.length < 2) return;
    
    // Select random game master
    const randomIndex = Math.floor(Math.random() * gameData.players.length);
    const gameMaster = gameData.players[randomIndex];
    
    const newWord = getRandomWord();
    setUsedWords(prev => new Set([...prev, newWord.word]));

    const scoresById: Record<string, number> = Object.fromEntries(gameData.players.map(p => [p.id, p.score]));
    const { event, targetId, amount } = computeDrinkEventForRound(gameData.currentRound, gameData.gameMode, gameData.players, scoresById);
    
    setGameData(prev => ({
      ...prev,
      gameState: 'playing',
      currentWord: newWord,
      gameMasterId: gameMaster.id,
      isWordRevealed: prev.currentRound > 1, // in Runde 1 ist false, ab Runde 2 direkt sichtbar
      activeDrinkEvent: event,
      activeDrinkEventTargetId: targetId,
      activeDrinkEventAmount: amount
    }));
  }, [gameData.players, gameData.currentRound, gameData.gameMode, getRandomWord]);

  const startScoring = useCallback(() => {
    setGameData(prev => ({
      ...prev,
      gameState: 'scoring',
      selectedWinner: null
    }));
  }, []);

  const selectWinner = useCallback((playerId: string) => {
    setGameData(prev => ({
      ...prev,
      selectedWinner: playerId
    }));
  }, []);

  const nextRound = useCallback(() => {
    // Award points to selected winner if any
    if (gameData.selectedWinner) {
      setGameData(prev => ({
        ...prev,
        players: prev.players.map(player =>
          player.id === prev.selectedWinner
            ? { ...player, score: player.score + 100 }
            : player
        )
      }));
    }
    
    // Spiel beenden, wenn gewünschte Anzahl erreicht
    if (gameData.currentRound >= gameData.totalRounds) {
      setGameData(prev => ({
        ...prev,
        gameState: 'finished'
      }));
      return;
    }

    // Select new random game master (different from current one if possible)
    const otherPlayers = gameData.players.filter(p => p.id !== gameData.gameMasterId);
    const newGameMaster = otherPlayers.length > 0 
      ? otherPlayers[Math.floor(Math.random() * otherPlayers.length)]
      : gameData.players[Math.floor(Math.random() * gameData.players.length)];
    
    const newWord = getRandomWord();
    setUsedWords(prev => new Set([...prev, newWord.word]));

    const nextRoundNumber = gameData.currentRound + 1;
    const scoresById: Record<string, number> = Object.fromEntries(gameData.players.map(p => [p.id, p.score]));
    const { event, targetId, amount } = computeDrinkEventForRound(nextRoundNumber, gameData.gameMode, gameData.players, scoresById);
    
    setGameData(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      gameState: 'playing',
      currentWord: newWord,
      gameMasterId: newGameMaster.id,
      selectedWinner: null,
      isWordRevealed: true,
      activeDrinkEvent: event,
      activeDrinkEventTargetId: targetId,
      activeDrinkEventAmount: amount
    }));
  }, [gameData.players, gameData.gameMode, gameData.gameMasterId, gameData.selectedWinner, gameData.currentRound, gameData.totalRounds, getRandomWord]);

  const resetGame = useCallback(() => {
    setGameData({
      players: [],
      currentRound: 1,
      gameState: 'setup',
      currentWord: null,
      gameMasterId: null,
      selectedWinner: null,
      totalRounds: 5,
      isWordRevealed: false,
      gameMode: 'normal',
      activeDrinkEvent: null,
      activeDrinkEventTargetId: null,
      activeDrinkEventAmount: null
    });
    setUsedWords(new Set());
  }, []);

  const setTotalRounds = useCallback((rounds: number) => {
    setGameData(prev => ({ ...prev, totalRounds: Math.max(1, Math.floor(rounds)) }));
  }, []);

  const revealWord = useCallback(() => {
    setGameData(prev => ({ ...prev, isWordRevealed: true }));
  }, []);

  return {
    gameData,
    addPlayer,
    removePlayer,
    startGame,
    startScoring,
    selectWinner,
    nextRound,
    resetGame,
    setTotalRounds,
    revealWord,
    setGameMode
  };
};