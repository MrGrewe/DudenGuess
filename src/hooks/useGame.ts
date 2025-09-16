import { useState, useCallback } from 'react';
import type { Player, GameData, DudenWord, GameState } from '@/types/game';

// Extensive Duden words collection for the game
const DUDEN_WORDS: DudenWord[] = [
  {
    word: "Fernweh",
    definition: "das starke Verlangen, in die Ferne zu reisen; Sehnsucht nach fremden Ländern"
  },
  {
    word: "Verschlimmbessern", 
    definition: "durch gut gemeinte Verbesserungsversuche etwas verschlechtern"
  },
  {
    word: "Kopfkino",
    definition: "das Entstehen von Bildern, Vorstellungen im Kopf beim Lesen, Hören von etwas"
  },
  {
    word: "Fremdschämen",
    definition: "Scham empfinden für das Verhalten einer anderen Person"
  },
  {
    word: "Ohrwurm",
    definition: "eine Melodie, die einem nicht mehr aus dem Kopf geht"
  },
  {
    word: "Kummerspeck",
    definition: "zusätzliches Körpergewicht, das durch übermäßiges Essen bei Kummer entstanden ist"
  },
  {
    word: "Geborgenheit",
    definition: "Zustand des Sichgeborgenfühlens; Sicherheit und Schutz gewährende Umgebung"
  },
  {
    word: "Backpfeifengesicht",
    definition: "Gesicht, das zu einer Ohrfeige herausfordert (derb)"  
  },
  {
    word: "Schnapsidee",
    definition: "verrückte, unsinnige Idee; törichte Eingebung"
  },
  {
    word: "Fingerspitzengefühl",
    definition: "Fähigkeit zu taktvoll-geschicktem Verhalten; Einfühlungsvermögen"
  },
  {
    word: "Verschlimmerung",
    definition: "das Schlechterwerden; Zunahme der Schwere, Intensität von etwas Unerwünschtem"
  },
  {
    word: "Doppelgänger",
    definition: "Person, die einer anderen Person zum Verwechseln ähnlich sieht"
  },
  {
    word: "Gedankenverloren",
    definition: "völlig in Gedanken versunken; zerstreut"
  },
  {
    word: "Weltschmerz",
    definition: "wehmütige Stimmung angesichts der Unzulänglichkeit der Welt"
  },
  {
    word: "Zungenbrecher",
    definition: "schwer aussprechbare Wortfolge"
  },
  {
    word: "Bauchgefühl",
    definition: "instinktive Ahnung oder Empfindung"
  },
  {
    word: "Schildbürgerstreich",
    definition: "törichter, unsinniger Streich; närrische Handlung"
  },
  {
    word: "Scheinriese",
    definition: "Person oder Sache, die nur von weitem beeindruckend wirkt"
  },
  {
    word: "Büchernarr",
    definition: "jemand, der leidenschaftlich gern und viel liest"
  },
  {
    word: "Gedankensprung",
    definition: "plötzlicher Wechsel des Gesprächsthemas ohne erkennbaren Zusammenhang"
  },
  {
    word: "Herzschmerz",
    definition: "seelischer Schmerz, besonders durch Liebeskummer"
  },
  {
    word: "Wortklauberei",
    definition: "kleinliches Streiten um die genaue Bedeutung von Worten"
  },
  {
    word: "Augenschmaus",
    definition: "etwas, was den Betrachter durch seine Schönheit erfreut"
  },
  {
    word: "Gänsehaut",
    definition: "durch Kälte, Aufregung oder Rührung hervorgerufene Erhebung der Haarwurzeln"
  },
  {
    word: "Trübsalblasen",
    definition: "traurig, schwermütig sein; sich gehen lassen"
  },
  {
    word: "Luftschloss",
    definition: "unrealistische Pläne oder Hoffnungen"
  },
  {
    word: "Herzensangelegenheit",
    definition: "etwas, was jemandem sehr wichtig ist"
  },
  {
    word: "Gedächtnislücke",
    definition: "Unvermögen, sich an bestimmte Dinge zu erinnern"
  },
  {
    word: "Schadenfreude",
    definition: "Freude über das Missgeschick anderer"
  },
  {
    word: "Spatzenhirn",
    definition: "sehr vergessliche oder unaufmerksame Person"
  },
  {
    word: "Torschlusspanik",
    definition: "Angst, eine Gelegenheit zu versäumen"
  },
  {
    word: "Verschlimmbesserer",
    definition: "jemand, der durch Verbesserungsversuche etwas verschlechtert"
  },
  {
    word: "Wetterfrosch",
    definition: "jemand, der das Wetter vorhersagt oder wetterempfindlich ist"
  },
  {
    word: "Zungenfertig",
    definition: "redegewandt; schlagfertig im Sprechen"
  },
  {
    word: "Augenblick",
    definition: "sehr kurzer Zeitraum; Moment"
  },
  {
    word: "Baumkrone",
    definition: "oberer, belaubter Teil eines Baumes"
  },
  {
    word: "Gedankenblitz",
    definition: "plötzlich aufkommende gute Idee"
  },
  {
    word: "Herzensbrecher",
    definition: "Mann, der viele Frauen unglücklich macht"
  },
  {
    word: "Sternstunde",
    definition: "besonders glücklicher oder bedeutsamer Augenblick"
  },
  {
    word: "Tagträumer",
    definition: "jemand, der viel träumerisch vor sich hin denkt"
  },
  {
    word: "Wortwitz",
    definition: "geistreiche, witzige Art zu sprechen"
  },
  {
    word: "Zeitgeist",
    definition: "die Denkart einer bestimmten Zeit"
  },
  {
    word: "Augenwischerei",
    definition: "bewusste Täuschung; Irreführung"
  },
  {
    word: "Bärenhunger",
    definition: "sehr großer Hunger"
  },
  {
    word: "Gefühlsduselei",
    definition: "übertriebene Sentimentalität"
  },
  {
    word: "Herzenskälte",
    definition: "Mangel an menschlicher Wärme und Mitgefühl"
  },
  {
    word: "Spießbürger",
    definition: "engherziger, kleinbürgerlich denkender Mensch"
  },
  {
    word: "Traumtänzer",
    definition: "unrealistisch denkender, weltfremder Mensch"
  },
  {
    word: "Weltverbesserer",
    definition: "jemand, der die Welt durch naive Vorstellungen verbessern will"
  },
  {
    word: "Augenschein",
    definition: "das, was sichtbar, erkennbar ist"
  },
  {
    word: "Gedankengut",
    definition: "Gesamtheit der Ideen und Überzeugungen einer Person oder Gruppe"
  },
  {
    word: "Herzenswunsch",
    definition: "sehnlichster Wunsch; das, was man sich am meisten wünscht"
  },
  {
    word: "Seelenruhe",
    definition: "innere Gelassenheit und Ausgeglichenheit"
  },
  {
    word: "Wortschatz",
    definition: "Gesamtheit der Wörter, die jemand kennt oder verwendet"
  },
  {
    word: "Gemütsmensch",
    definition: "warmherziger, gutmütiger Mensch"
  },
  {
    word: "Himmelsstürmer",
    definition: "schwärmerisch-idealistischer Mensch"
  },
  {
    word: "Gedankenleser",
    definition: "jemand, der zu erraten scheint, was andere denken"
  },
  {
    word: "Augenstern",
    definition: "sehr geliebte Person, besonders ein Kind"
  },
  {
    word: "Bauernschläue",
    definition: "praktische Klugheit; Gerissenheit"
  },
  {
    word: "Herzblatt",
    definition: "geliebte Person (Kosewort)"
  },
  {
    word: "Tagedieb",
    definition: "fauler Mensch, der seine Zeit vertrödelt"
  },
  {
    word: "Weltanschauung",
    definition: "Gesamtheit der Überzeugungen über das Leben und die Welt"
  },
  {
    word: "Gedächtnisstütze",
    definition: "Hilfsmittel zum Erinnern"
  },
  {
    word: "Glückspilz",
    definition: "jemand, der oft Glück hat"
  },
  {
    word: "Herzschlag",
    definition: "das Schlagen des Herzens; Pulsschlag"
  },
  {
    word: "Seelenverwandt",
    definition: "in der Denkart, im Empfinden übereinstimmend"
  },
  {
    word: "Wortkarg",
    definition: "wenig redend; schweigsam"
  },
  {
    word: "Augenmaß",
    definition: "Fähigkeit, Entfernungen und Größen richtig zu schätzen"
  },
  {
    word: "Gedankenfreiheit",
    definition: "Recht auf freie Meinungsäußerung und Denkweise"
  },
  {
    word: "Herzenstrost",
    definition: "seelischer Trost; Beruhigung"
  },
  {
    word: "Tageslicht",
    definition: "natürliches Licht der Sonne am Tag"
  },
  {
    word: "Weltfremd",
    definition: "die Realität nicht kennend; unpraktisch"
  },
  {
    word: "Gedächtnisverlust",
    definition: "Verlust der Erinnerungsfähigkeit"
  },
  {
    word: "Glücksgefühl",
    definition: "Empfindung des Glücklichseins"
  },
  {
    word: "Herzensgüte",
    definition: "natürliche Güte und Freundlichkeit"
  },
  {
    word: "Seelenfrieden",
    definition: "innere Ruhe und Zufriedenheit"
  },
  {
    word: "Wortgewalt",
    definition: "überzeugende, mitreißende Ausdruckskraft"
  },
  {
    word: "Augenweide",
    definition: "etwas Schönes, das man gern betrachtet"
  },
  {
    word: "Gedankenreichtum",
    definition: "Fülle von Ideen und Einfällen"
  },
  {
    word: "Herzensfreude",
    definition: "große, innige Freude"
  },
  {
    word: "Tagesordnung",
    definition: "Programm einer Sitzung oder Versammlung"
  },
  {
    word: "Weltwunder",
    definition: "außergewöhnliches Bauwerk oder Naturphänomen"
  },
  {
    word: "Gedächtniskunst",
    definition: "Technik zur Verbesserung der Merkfähigkeit"
  },
  {
    word: "Glücksfall",
    definition: "glücklicher Zufall; günstiger Umstand"
  },
  {
    word: "Herzenslust",
    definition: "nach Belieben; so viel man will"
  },
  {
    word: "Seelenspiegelung",
    definition: "Wiedergabe seelischer Vorgänge"
  },
  {
    word: "Wortführer",
    definition: "jemand, der für andere spricht; Sprecher einer Gruppe"
  },
  {
    word: "Augenzwinkern",
    definition: "kurzes Schließen eines Auges als Zeichen der Verständigung"
  },
  {
    word: "Gedankenaustausch",
    definition: "Meinungsaustausch; Diskussion"
  },
  {
    word: "Herzensbildung",
    definition: "Entwicklung der Gefühle und des Charakters"
  },
  {
    word: "Tagwerk",
    definition: "Tagesarbeit; das am Tag zu Verrichtende"
  },
  {
    word: "Weltbürger",
    definition: "jemand, der sich als Bürger der ganzen Welt fühlt"
  },
  {
    word: "Geburtshelfer",
    definition: "Arzt, der bei Geburten hilft; Hebamme"
  },
  {
    word: "Glücksbringer",
    definition: "Gegenstand oder Person, die Glück bringen soll"
  },
  {
    word: "Herzensregung",
    definition: "Gefühlsaufwallung; emotionale Bewegung"
  },
  {
    word: "Seelenschmerz",
    definition: "tiefer seelischer Schmerz"
  },
  {
    word: "Wortspiel",
    definition: "geistreiches Spiel mit Worten und Bedeutungen"
  },
  {
    word: "Augenblicklich",
    definition: "sofort; ohne Verzögerung"
  },
  {
    word: "Gedankentiefe",
    definition: "Gründlichkeit und Durchdachtheit der Gedanken"
  },
  {
    word: "Herzenskummer",
    definition: "seelischer Schmerz; Liebeskummer"
  },
  {
    word: "Tagesgespräch",
    definition: "aktuelles Thema, über das alle sprechen"
  },
  {
    word: "Weltklugheit",
    definition: "praktische Lebenserfahrung"
  },
  {
    word: "Gedächtnisfeier",
    definition: "Feier zum Gedenken an jemanden oder etwas"
  },
  {
    word: "Glückssache",
    definition: "etwas, was vom Zufall abhängt"
  },
  {
    word: "Herzensgrund",
    definition: "tiefste Überzeugung; innerste Gesinnung"
  },
  {
    word: "Seelenqual",
    definition: "schwere seelische Pein"
  },
  {
    word: "Wortbruch",
    definition: "Nichteinhalten eines gegebenen Versprechens"
  },
  {
    word: "Augenlicht",
    definition: "Fähigkeit zu sehen; Sehkraft"
  },
  {
    word: "Gedankengang",
    definition: "logische Folge von Überlegungen"
  },
  {
    word: "Herzenswärme",
    definition: "menschliche Wärme; herzliche Art"
  },
  {
    word: "Tagesbuch",
    definition: "Buch, in das man täglich Erlebnisse einträgt"
  },
  {
    word: "Weltgeschichte",
    definition: "Geschichte der Menschheit"
  },
  {
    word: "Geburtsort",
    definition: "Ort, an dem jemand geboren wurde"
  },
  {
    word: "Glücksstern",
    definition: "günstiges Schicksal; Glück"
  },
  {
    word: "Herzenskraft",
    definition: "seelische Stärke und Energie"
  },
  {
    word: "Seelenruhe",
    definition: "innere Gelassenheit"
  },
  {
    word: "Wortlaut",
    definition: "genauer Wortinhalt eines Textes"
  },
  {
    word: "Augenblickserfolg",
    definition: "kurzfristiger, vorübergehender Erfolg"
  },
  {
    word: "Gedankenstrich",
    definition: "Satzzeichen zur Kennzeichnung einer Pause"
  },
  {
    word: "Herzensangst",
    definition: "tiefe, seelische Angst"
  },
  {
    word: "Tageszeit",
    definition: "bestimmte Zeit des Tages"
  },
  {
    word: "Weltreise",
    definition: "Reise rund um die Welt"
  },
  {
    word: "Geburtsstunde",
    definition: "Zeitpunkt der Entstehung von etwas"
  },
  {
    word: "Glücksspiel",
    definition: "Spiel, bei dem der Zufall entscheidet"
  },
  {
    word: "Herzensruf",
    definition: "innerer Drang; seelischer Aufruf"
  },
  {
    word: "Seelenvoll",
    definition: "voller Gefühl; ausdrucksvoll"
  },
  {
    word: "Wortreich",
    definition: "viele Worte verwendend; redselig"
  },
  {
    word: "Augenpaar",
    definition: "beide Augen zusammen"
  },
  {
    word: "Gedankenwelt",
    definition: "Gesamtheit der Gedanken und Vorstellungen"
  },
  {
    word: "Herzensbedürfnis",
    definition: "dringendes inneres Verlangen"
  },
  {
    word: "Tagesanbruch",
    definition: "Beginn des Tages; Morgendämmerung"
  },
  {
    word: "Weltmacht",
    definition: "Staat mit großem weltweiten Einfluss"
  },
  {
    word: "Geburtsland",
    definition: "Land, in dem jemand geboren wurde"
  },
  {
    word: "Glücksritter",
    definition: "Abenteurer, der sein Glück sucht"
  },
  {
    word: "Herzenssprache",
    definition: "aufrichtige, gefühlvolle Ausdrucksweise"
  },
  {
    word: "Seelengrund",
    definition: "tiefstes Innere der Seele"
  },
  {
    word: "Wortschöpfung",
    definition: "Bildung eines neuen Wortes"
  },
  {
    word: "Augenzeuge",
    definition: "jemand, der etwas persönlich gesehen hat"
  },
  {
    word: "Gedankenflucht",
    definition: "schnell wechselnde, zusammenhanglose Gedanken"
  },
  {
    word: "Herzensmensch",
    definition: "warmherziger, gefühlvoller Mensch"
  },
  {
    word: "Tagesschau",
    definition: "tägliche Nachrichtensendung"
  },
  {
    word: "Weltbild",
    definition: "Gesamtvorstellung von der Welt und dem Leben"
  },
  {
    word: "Geburtsurkunde",
    definition: "amtliche Bescheinigung über die Geburt"
  },
  {
    word: "Glückskind",
    definition: "jemand, der von Geburt an Glück hat"
  },
  {
    word: "Herzenssache",
    definition: "etwas, was jemandem sehr am Herzen liegt"
  },
  {
    word: "Seelenlandschaft",
    definition: "seelische Verfassung; Gemütszustand"
  },
  {
    word: "Wortklang",
    definition: "Klang und Melodie von Worten"
  },
  {
    word: "Augenbraue",
    definition: "Haarbogen über dem Auge"
  },
  {
    word: "Gedankensplitter",
    definition: "unvollständige, fragmentarische Gedanken"
  },
  {
    word: "Herzenstür",
    definition: "Zugang zum Herzen; zu den Gefühlen"
  },
  {
    word: "Tageslauf",
    definition: "Verlauf eines Tages; Tagesablauf"
  },
  {
    word: "Weltsprache",
    definition: "Sprache von internationaler Bedeutung"
  },
  {
    word: "Geburtstag",
    definition: "jährlicher Wiederkehr des Tages der Geburt"
  },
  {
    word: "Glücksmoment",
    definition: "Augenblick des Glücks"
  },
  {
    word: "Herzensweite",
    definition: "Großherzigkeit; Toleranz"
  },
  {
    word: "Seelenpartner",
    definition: "Person, mit der man seelisch verbunden ist"
  },
  {
    word: "Wortführung",
    definition: "das Sprechen für andere; Leitung einer Diskussion"
  },
  {
    word: "Augenblick",
    definition: "sehr kurzer Zeitabschnitt; Moment"
  },
  {
    word: "Gedankensprung",
    definition: "unvermittelter Themenwechsel"
  },
  {
    word: "Herzenslicht",
    definition: "geliebte Person; Sonnenschein"
  },
  {
    word: "Tageszeitung",
    definition: "täglich erscheinende Zeitung"
  },
  {
    word: "Weltrekord",
    definition: "beste je erreichte Leistung weltweit"
  },
  {
    word: "Geburtsjahr",
    definition: "Jahr, in dem jemand geboren wurde"
  },
  {
    word: "Glücksbotschaft",
    definition: "erfreuliche Nachricht"
  },
  {
    word: "Herzenskälte",
    definition: "Gefühlskälte; Herzlosigkeit"
  },
  {
    word: "Seelenruhig",
    definition: "völlig gelassen; ungerührt"
  },
  {
    word: "Wortgewandt",
    definition: "sprachlich geschickt; redegewandt"
  },
  {
    word: "Augenöffner",
    definition: "etwas, was zu neuen Erkenntnissen führt"
  },
  {
    word: "Gedankenstrom",
    definition: "ununterbrochene Folge von Gedanken"
  },
  {
    word: "Herzensdemut",
    definition: "innere Bescheidenheit"
  },
  {
    word: "Tagesform",
    definition: "momentane körperliche und geistige Verfassung"
  },
  {
    word: "Weltkrieg",
    definition: "Krieg zwischen vielen Ländern der Welt"
  },
  {
    word: "Geburtsstätte",
    definition: "Ort der Entstehung oder Geburt"
  },
  {
    word: "Glücksgöttin",
    definition: "mythische Göttin des Glücks; Fortuna"
  },
  {
    word: "Herzensgrund",
    definition: "tiefste Überzeugung"
  },
  {
    word: "Seelenblindheit",
    definition: "Unfähigkeit, seelische Vorgänge zu erkennen"
  },
  {
    word: "Wortmeldung",
    definition: "Bitte um das Rederecht"
  },
  {
    word: "Augentrost",
    definition: "etwas, was die Augen erfreut"
  },
  {
    word: "Gedankenfaden",
    definition: "Zusammenhang der Gedanken"
  },
  {
    word: "Herzensreinheit",
    definition: "Unschuld und Lauterkeit des Herzens"
  },
  {
    word: "Tagesgeschäft",
    definition: "alltägliche Arbeit; Routine"
  },
  {
    word: "Weltliteratur",
    definition: "Literatur von weltweiter Bedeutung"
  },
  {
    word: "Geburtsschein",
    definition: "Bescheinigung über die Geburt"
  },
  {
    word: "Glückseligkeit",
    definition: "höchstes Glück; Zustand völliger Zufriedenheit"
  },
  {
    word: "Herzenstrost",
    definition: "seelischer Trost"
  },
  {
    word: "Seelenärger",
    definition: "tiefer, anhaltender Ärger"
  },
  {
    word: "Wortschwall",
    definition: "Flut von Worten; endloses Gerede"
  },
  {
    word: "Augenaufschlag",
    definition: "Bewegung der Augen nach oben"
  },
  {
    word: "Gedankenvertiefung",
    definition: "intensive Beschäftigung mit Gedanken"
  },
  {
    word: "Herzensbildner",
    definition: "jemand, der die Gefühle formt"
  },
  {
    word: "Tagesablauf",
    definition: "zeitliche Abfolge der Tagesereignisse"
  },
  {
    word: "Weltruf",
    definition: "weltweiter Ruhm und Ansehen"
  },
  {
    word: "Geburtswehen",
    definition: "Schmerzen bei der Geburt; Entstehungsschmerzen"
  },
  {
    word: "Glücksrad",
    definition: "Rad, das Glück oder Unglück symbolisiert"
  },
  {
    word: "Herzenserguss",
    definition: "spontaner Gefühlsausbruch"
  },
  {
    word: "Seelenführer",
    definition: "jemand, der andere seelisch leitet"
  },
  {
    word: "Wortkünstler",
    definition: "jemand, der virtuos mit Sprache umgeht"
  },
  {
    word: "Augenklappe",
    definition: "Schutz oder Verband für ein Auge"
  },
  {
    word: "Gedankenarmut",
    definition: "Mangel an Ideen und Einfällen"
  },
  {
    word: "Herzenskälte",
    definition: "emotionale Kälte; Lieblosigkeit"
  },
  {
    word: "Tagesrhythmus",
    definition: "regelmäßiger Ablauf des Tages"
  },
  {
    word: "Weltende",
    definition: "Ende der Welt; Apokalypse"
  },
  {
    word: "Geburtshelfer",
    definition: "Arzt, der bei Geburten assistiert"
  },
  {
    word: "Glücksspiel",
    definition: "Spiel, dessen Ausgang vom Zufall abhängt"
  },
  {
    word: "Herzensfeind",
    definition: "jemand, den man von Herzen hasst"
  },
  {
    word: "Seelenkenner",
    definition: "jemand, der Menschen gut durchschaut"
  },
  {
    word: "Wortmacher",
    definition: "jemand, der viel redet ohne viel zu sagen"
  },
  {
    word: "Augenbrauen",
    definition: "Haare über den Augen"
  },
  {
    word: "Gedankenblitz",
    definition: "plötzliche geniale Idee"
  },
  {
    word: "Herzensruf",
    definition: "innere Stimme; Berufung"
  },
  {
    word: "Tagesende",
    definition: "Schluss des Tages; Abend"
  },
  {
    word: "Weltmeer",
    definition: "die Ozeane der Erde"
  },
  {
    word: "Geburtsmonat",
    definition: "Monat, in dem jemand geboren wurde"
  },
  {
    word: "Glücksstern",
    definition: "Symbol für günstiges Schicksal"
  },
  {
    word: "Herzensschreck",
    definition: "großer Schreck; Schock"
  },
  {
    word: "Seelenmalerei",
    definition: "Darstellung seelischer Zustände"
  },
  {
    word: "Wortstellung",
    definition: "Anordnung der Wörter im Satz"
  },
  {
    word: "Augenweide",
    definition: "schöner Anblick"
  },
  {
    word: "Gedankenführung",
    definition: "Leitung und Lenkung der Gedanken"
  },
  {
    word: "Herzensöffnung",
    definition: "Bereitschaft, sich emotional zu zeigen"
  },
  {
    word: "Tagespensum",
    definition: "geplante Arbeit für einen Tag"
  },
  {
    word: "Weltordnung",
    definition: "Organisation und Struktur der Welt"
  },
  {
    word: "Geburtsfehler",
    definition: "von Geburt an vorhandener Mangel"
  },
  {
    word: "Glücksgefühl",
    definition: "Empfindung des Glücklichseins"
  },
  {
    word: "Herzensqual",
    definition: "seelische Pein; großer Kummer"
  },
  {
    word: "Seelenforschung",
    definition: "Wissenschaft von der Seele; Psychologie"
  },
  {
    word: "Wortfindung",
    definition: "das Finden der passenden Worte"
  },
  {
    word: "Augenweite",
    definition: "Entfernung, die das Auge erfassen kann"
  },
  {
    word: "Gedankenschärfe",
    definition: "Klarheit und Präzision des Denkens"
  },
  {
    word: "Herzensretter",
    definition: "jemand, der in emotionaler Not hilft"
  },
  {
    word: "Tagesaktualität",
    definition: "Bezug zu aktuellen Ereignissen"
  },
  {
    word: "Weltlauf",
    definition: "Gang der Welt; Weltgeschehen"
  },
  {
    word: "Geburtszeichen",
    definition: "Merkmal, das von Geburt an vorhanden ist"
  },
  {
    word: "Glücksgriff",
    definition: "zufällig gelungene Handlung"
  },
  {
    word: "Herzensneigung",
    definition: "innere Zuneigung; Sympathie"
  },
  {
    word: "Seelennotstand",
    definition: "schwere seelische Krise"
  },
  {
    word: "Wortgepränge",
    definition: "Prunk mit Worten; geschwollene Rede"
  },
  {
    word: "Augenprüfung",
    definition: "Untersuchung der Sehkraft"
  },
  {
    word: "Gedankenreise",
    definition: "mentale Reise; Fantasiereise"
  },
  {
    word: "Herzensschlag",
    definition: "Herzschlag; Pulsschlag"
  },
  {
    word: "Tagesgang",
    definition: "Verlauf eines Tages"
  },
  {
    word: "Weltgericht",
    definition: "göttliches Endgericht über die Welt"
  },
  {
    word: "Geburtsschmerz",
    definition: "Schmerz bei der Geburt"
  },
  {
    word: "Glücksträne",
    definition: "Träne der Freude"
  },
  {
    word: "Herzensfroh",
    definition: "von Herzen fröhlich"
  },
  {
    word: "Seelenregung",
    definition: "emotionale Bewegung"
  },
  {
    word: "Wortklauberei",
    definition: "übertriebenes Achten auf genaue Wortwahl"
  },
  {
    word: "Augenringe",
    definition: "dunkle Ringe unter den Augen"
  },
  {
    word: "Gedankenspiel",
    definition: "theoretische Überlegung"
  },
  {
    word: "Herzenstier",
    definition: "besonders geliebtes Tier"
  },
  {
    word: "Tageshelle",
    definition: "Helligkeit des Tages"
  },
  {
    word: "Weltflucht",
    definition: "Rückzug aus der Welt"
  },
  {
    word: "Geburtswunder",
    definition: "Wunder der Geburt"
  },
  {
    word: "Glückshaube",
    definition: "Embryonalhaut, die Glück bringen soll"
  },
  {
    word: "Herzenstiefe",
    definition: "emotionale Tiefe"
  },
  {
    word: "Seelengebilde",
    definition: "seelische Struktur"
  },
  {
    word: "Wortschatz",
    definition: "Gesamtheit der bekannten Wörter"
  },
  {
    word: "Augentäuschung",
    definition: "falsche Wahrnehmung mit den Augen"
  },
  {
    word: "Gedankenmüll",
    definition: "unnütze, störende Gedanken"
  },
  {
    word: "Herzenskraft",
    definition: "emotionale Stärke"
  },
  {
    word: "Tagesreise",
    definition: "Strecke, die an einem Tag zurückgelegt wird"
  },
  {
    word: "Weltbühne",
    definition: "die Welt als Schauplatz des Geschehens"
  },
  {
    word: "Geburtstrauma",
    definition: "seelische Verletzung durch die Geburt"
  },
  {
    word: "Glücksbote",
    definition: "Überbringer guter Nachrichten"
  },
  {
    word: "Herzensbildung",
    definition: "Entwicklung der Gefühle"
  },
  {
    word: "Seelenarbeit",
    definition: "Arbeit an der eigenen Persönlichkeit"
  },
  {
    word: "Wortgebrauch",
    definition: "Art der Verwendung von Wörtern"
  },
  {
    word: "Augenblicksbild",
    definition: "Schnappschuss; spontanes Foto"
  },
  {
    word: "Gedankenschnelle",
    definition: "Geschwindigkeit des Denkens"
  },
  {
    word: "Herzensreinheit",
    definition: "Unschuld des Herzens"
  },
  {
    word: "Tagesauftrag",
    definition: "Aufgabe für einen Tag"
  },
  {
    word: "Weltbrand",
    definition: "weltweiter Krieg oder Konflikt"
  },
  {
    word: "Geburtsadel",
    definition: "von Geburt an vorhandener Adel"
  },
  {
    word: "Glückszauber",
    definition: "magische Kraft, die Glück bringen soll"
  },
  {
    word: "Herzensruhe",
    definition: "innere Gelassenheit"
  },
  {
    word: "Seelenlandschaft",
    definition: "seelische Verfassung"
  },
  {
    word: "Wortmagie",
    definition: "zauberhafte Wirkung von Worten"
  },
  {
    word: "Augenblickseinfall",
    definition: "spontane Idee"
  },
  {
    word: "Gedankensammlung",
    definition: "Zusammenstellung von Gedanken"
  },
  {
    word: "Herzenssache",
    definition: "sehr wichtige Angelegenheit"
  },
  {
    word: "Tagesgewinn",
    definition: "an einem Tag erzielter Gewinn"
  },
  {
    word: "Weltgeist",
    definition: "allgemeine geistige Strömung der Zeit"
  },
  {
    word: "Geburtsstunde",
    definition: "Moment der Entstehung"
  },
  {
    word: "Glücksnummer",
    definition: "Zahl, die Glück bringen soll"
  },
  {
    word: "Herzenssprache",
    definition: "aufrichtige Ausdrucksweise"
  },
  {
    word: "Seelenpartnerschaft",
    definition: "tiefe seelische Verbindung"
  },
  {
    word: "Wortfeld",
    definition: "Gruppe verwandter Wörter"
  },
  {
    word: "Augenblicksstimmung",
    definition: "momentane Gefühlslage"
  },
  {
    word: "Gedankenverbindung",
    definition: "Assoziation zwischen Gedanken"
  },
  {
    word: "Herzensfreund",
    definition: "sehr enger Freund"
  },
  {
    word: "Tagesklima",
    definition: "Wetter und Stimmung eines Tages"
  },
  {
    word: "Weltschöpfung",
    definition: "Erschaffung der Welt"
  },
  {
    word: "Geburtsrecht",
    definition: "Recht, das durch Geburt erworben wird"
  },
  {
    word: "Glückstag",
    definition: "besonders glücklicher Tag"
  },
  {
    word: "Herzensweisheit",
    definition: "emotionale Intelligenz"
  },
  {
    word: "Seelennahrung",
    definition: "das, was die Seele nährt"
  },
  {
    word: "Wortkunst",
    definition: "künstlerischer Umgang mit Sprache"
  },
  {
    word: "Augenblickslaune",
    definition: "momentane Stimmung"
  },
  {
    word: "Gedankenkreis",
    definition: "Bereich der geistigen Beschäftigung"
  },
  {
    word: "Herzensgrund",
    definition: "tiefste Überzeugung"
  },
  {
    word: "Tagesereignis",
    definition: "Ereignis eines bestimmten Tages"
  },
  {
    word: "Weltenschöpfer",
    definition: "Schöpfer der Welt; Gott"
  },
  {
    word: "Geburtstermin",
    definition: "voraussichtlicher Tag der Geburt"
  },
  {
    word: "Glückswechsel",
    definition: "Wechsel zwischen Glück und Unglück"
  },
  {
    word: "Herzenssprung",
    definition: "Freudensprung des Herzens"
  },
  {
    word: "Seelensuche",
    definition: "Suche nach sich selbst"
  },
  {
    word: "Wortarmut",
    definition: "geringer Wortschatz"
  }
];

export const useGame = () => {
  const [gameData, setGameData] = useState<GameData>({
    players: [],
    currentRound: 1,
    gameState: 'setup',
    currentWord: null,
    gameMasterId: null,
    selectedWinner: null,
    totalRounds: 5,
    isWordRevealed: false
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

  const getRandomWord = useCallback((): DudenWord => {
    const availableWords = DUDEN_WORDS.filter(word => !usedWords.has(word.word));
    
    if (availableWords.length === 0) {
      // Reset used words if all have been used
      setUsedWords(new Set());
      return DUDEN_WORDS[Math.floor(Math.random() * DUDEN_WORDS.length)];
    }
    
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }, [usedWords]);

  const startGame = useCallback(() => {
    if (gameData.players.length < 2) return;
    
    // Select random game master
    const randomIndex = Math.floor(Math.random() * gameData.players.length);
    const gameMaster = gameData.players[randomIndex];
    
    const newWord = getRandomWord();
    setUsedWords(prev => new Set([...prev, newWord.word]));
    
    setGameData(prev => ({
      ...prev,
      gameState: 'playing',
      currentWord: newWord,
      gameMasterId: gameMaster.id,
      isWordRevealed: prev.currentRound > 1 // in Runde 1 ist false, ab Runde 2 direkt sichtbar
    }));
  }, [gameData.players, getRandomWord]);

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
    
    setGameData(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      gameState: 'playing',
      currentWord: newWord,
      gameMasterId: newGameMaster.id,
      selectedWinner: null,
      isWordRevealed: true
    }));
  }, [gameData.players, gameData.gameMasterId, gameData.selectedWinner, gameData.currentRound, gameData.totalRounds, getRandomWord]);

  const resetGame = useCallback(() => {
    setGameData({
      players: [],
      currentRound: 1,
      gameState: 'setup',
      currentWord: null,
      gameMasterId: null,
      selectedWinner: null,
      totalRounds: 5,
      isWordRevealed: false
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
    revealWord
  };
};