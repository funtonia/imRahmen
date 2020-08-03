//
//  Game.swift
//  Ar-App
//
//  Created by Antonia verdier on 02/05/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

enum GameType : String, CustomStringConvertible {
    case difference = "difference"
    case estimation = "estimation"
    case cutouts = "cutouts"
    case counting = "counting"
    case trueorfalse = "trueOrFalse"
    case quiz = "quiz"
    
    var description : String {
        switch self {
            case .difference: return "Finde den Fehler";
            case .estimation: return "Schätzen";
            case .cutouts: return "Puzzle Mix";
            case .counting: return "Zähl genau";
            case .trueorfalse: return "Wahr oder Falsch";
            case .quiz: return "Quiz";
        }
    }
}

class Game {
    
    var type: GameType!
    var major: Int!
    var title: String!
    var answers: [String]?
    var feedback_pos: String?
    var feedback_neg: String?
    var results: [Int]?
    var image_url: String?
    var information: String?
    var color: String?
    var hint: String?
    var value: String?
    var seconds: Int!
    var name: String?
    var artist: String?
    var year: String?
    var additional_info_title: String?
    var additional_info_text: String?
    
    var alreadyPlayed: Bool = false
    var achievedPoints: Int = -1
    
    init(type: GameType!, major: Int!, title: String!, answers: [String]?, feedback_pos: String?, feedback_neg: String?, results: [Int]?, image_url: String?, information: String?, color: String?, hint: String?, value: String?, seconds: Int?, name: String?, artist: String?, year: String?, additional_info_title: String?, additional_info_text: String?) {
    
        self.type = type
        self.major = major
        self.title = title
        self.answers = answers
        self.feedback_pos = feedback_pos
        self.feedback_neg = feedback_neg
        self.results = results
        self.image_url = image_url
        self.information = information
        self.color = color
        self.hint = hint
        self.value = value
        self.seconds = seconds
        self.name = name
        self.artist = artist
        self.year = year
        self.additional_info_text = additional_info_text
        self.additional_info_title = additional_info_title
    }
}
