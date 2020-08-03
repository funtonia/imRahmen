//
//  JsonReaderTests.swift
//  ImRahmen
//
//  Created by Sonja Nürenberg on 29.08.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import XCTest
@testable import ImRahmen

class JsonReaderTests: XCTestCase {
    
    let jsonReader: JsonReader = JsonReader()
    var dictionary: NSDictionary!
    let testGameDictionary : [String : Any] = [
        "type": "trueOrFalse",
         "major": 32002,
         "title": "Das Gemälde \"Widmung an Oskar Parizza\" zeigt eine belebte Straße in New York. Grosz widwet seinem alten Schulfreund dieses Bild, nachdem er im November 1917 an Krebs verstab.",
         "answers": [],
         "results": [0],
         "image_url": "true_or_false_image.png",
         "color": "#0100BE",
         "hint": "Ist die Aussage über das Gemälde Wahrheit oder Blödsinn? Beantworte die Frage und klicke dann auf Fertig. Du hast 180 Sekunden Zeit. Je schneller du bist, desto mehr Punkte bekommst du. Aber Achtung! Du bekommt nur Punkte, wenn deine Antwort richtig ist.",
         "value": "",
         "seconds": 180,
         "name":"Widmung an Oskar Panizza",
         "artist":"George Grosz",
         "year":"1917-1918",
         "information": "",
         "additional_info_title": "Widmung an Oskar Panizza (1917-1918) von George Grosz.",
         "additional_info_text": "In seiner Autobiographie nannte Grosz sein Bild ausdrücklich 'Widmung an Oskar Panizza'. Diesem an sich selbst und an der Welt leidenden, ruhelosen, später geisteskranken Dichter fühlte er sich vor allem deshalb verwandt, weil Panizzas kompromisslose Protesthaltung gänzlich dem moralisierenden Entlarvungskonzept entsprach, dem Grosz seine Malerei unterworfen hatte. Die infernalische Großstadtvision beschwört mit den Mitteln futuristischer Simultandarstellung den Weltuntergang."]
    
    override func setUp() {
        super.setUp()
        dictionary = ["games" : [testGameDictionary]]
    }
    
    override func tearDown() {
        super.tearDown()
    }
    
    func testFetchGamesResultIsNotEmpty() {
        let games = jsonReader.fetchGames()
        XCTAssertNotNil(games)
        XCTAssertTrue(games.count > 0)
    }
    
    func testReadJsonFileResultIsNotNil() {
        let jsonResult = jsonReader.readJsonFile()
        XCTAssertNotNil(jsonResult)
    }
    
    func testGetGamesFromJsonResultIsNotNil() {
        let games = jsonReader.getGamesFromJson(jsonResult: dictionary)
        XCTAssertNotNil(games)
    }
    
    func testGetGamesFromJsonResultContainsOneGame() {
        let games = jsonReader.getGamesFromJson(jsonResult: dictionary)
        XCTAssertTrue(games.count == 1)
    }
    
    func testCreateGameObjectResultIsNotNil() {
        let game = jsonReader.createGameObject(game: testGameDictionary)
        XCTAssertNotNil(game)
    }
    
    func testCreateGameObjectToCreateCorrectGame() {
        let game = jsonReader.createGameObject(game: testGameDictionary)
        XCTAssertEqual(game.type, GameType.trueorfalse)
        XCTAssertEqual(game.major, 32002)
        XCTAssertEqual(game.title, "Das Gemälde \"Widmung an Oskar Parizza\" zeigt eine belebte Straße in New York. Grosz widwet seinem alten Schulfreund dieses Bild, nachdem er im November 1917 an Krebs verstab.")
        XCTAssertEqual(game.answers!, [String]())
        XCTAssertEqual(game.results!, [0])
        XCTAssertEqual(game.image_url, "true_or_false_image.png")
        XCTAssertEqual(game.color, "#0100BE")
        XCTAssertEqual(game.hint, "Ist die Aussage über das Gemälde Wahrheit oder Blödsinn? Beantworte die Frage und klicke dann auf Fertig. Du hast 180 Sekunden Zeit. Je schneller du bist, desto mehr Punkte bekommst du. Aber Achtung! Du bekommt nur Punkte, wenn deine Antwort richtig ist.")
        XCTAssertEqual(game.value, "")
        XCTAssertEqual(game.seconds, 180)
        XCTAssertEqual(game.name, "Widmung an Oskar Panizza")
        XCTAssertEqual(game.artist, "George Grosz")
        XCTAssertEqual(game.year, "1917-1918")
        XCTAssertEqual(game.information, "")
        XCTAssertEqual(game.additional_info_title, "Widmung an Oskar Panizza (1917-1918) von George Grosz.")
        XCTAssertEqual(game.additional_info_text, "In seiner Autobiographie nannte Grosz sein Bild ausdrücklich 'Widmung an Oskar Panizza'. Diesem an sich selbst und an der Welt leidenden, ruhelosen, später geisteskranken Dichter fühlte er sich vor allem deshalb verwandt, weil Panizzas kompromisslose Protesthaltung gänzlich dem moralisierenden Entlarvungskonzept entsprach, dem Grosz seine Malerei unterworfen hatte. Die infernalische Großstadtvision beschwört mit den Mitteln futuristischer Simultandarstellung den Weltuntergang.")
    }
}
