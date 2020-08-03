//
//  JsonReader.swift
//  ImRahmen
//
//  Created by Sonja Nürenberg on 22.06.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import Foundation
import FirebaseDatabase

class DatabaseReader {
    
    func getGamesFromDatabase() {
        // Get games from the database
        var databaseReference: DatabaseReference!
        
        databaseReference = Database.database().reference()
        
        let childReference = databaseReference.child(DatabaseIds.games)
        
        childReference.queryOrderedByKey().observe(.childAdded, with: { (snapshot) in
            guard let value = snapshot.value as? NSDictionary else {
                // TODO: display error if data could not be loaded
                return
            }
            
            AppDelegate.allGames.append(self.createGameObject(game: value))
        }) { (error) in
            print(error.localizedDescription)
        }
    }
    
    func createGameObject(game: NSDictionary) -> Game {
        let type: GameType? = GameType(rawValue: (game["type"] as? String)!)
        let major: Int? = game["major"] as? Int
        let title: String? = game["title"] as? String
        let answers: [String]? = game["answers"] as? [String]
        let feedback_pos: String? = game["feedback_pos"] as? String
        let feedback_neg: String? = game["feedback_neg"] as? String
        let results: [Int]? = game["results"] as? [Int]
        let image_url: String? = game["image_url"] as? String
        let information: String? = game["information"] as? String
        let hint: String? = game["hint"] as? String
        let value: String? = game["value"] as? String
        let color: String? = game["color"] as? String
        let seconds: Int? = game["seconds"] as? Int
        let name: String? = game["name"] as? String
        let artist: String? = game["artist"] as? String
        let year: String? = game["year"] as? String
        let additional_info_title: String? = game["additional_info_title"] as? String
        let additional_info_text: String? = game["additional_info_text"] as? String
        
        
        let newGame = Game(type: type, major: major, title: title, answers: answers, feedback_pos: feedback_pos, feedback_neg: feedback_neg, results: results, image_url: image_url, information: information, color: color, hint: hint, value: value, seconds: seconds, name: name, artist: artist, year: year, additional_info_title: additional_info_title, additional_info_text: additional_info_text)
        
        return newGame
    }
}
