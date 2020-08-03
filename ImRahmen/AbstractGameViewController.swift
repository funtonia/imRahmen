//
//  AbstractGameViewController.swift
//  ImRahmen
//
//  Created by Antonia verdier on 06.06.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit
import Foundation

class AbstractGameViewController: UIViewController {
    
    var game: Game?
    
    @IBOutlet var counterLabel: UILabel!
    @IBOutlet var counterIcon: UIImageView!
    
    @IBOutlet var titleLabel: UILabel!
    
    @IBOutlet var leftBorderView: UIView!
    @IBOutlet var rightBorderView: UIView!
    @IBOutlet var bottomBorderView: UIView!
    
    var count = 0
    var timer: Timer?
    
    func setGameData() throws {
        
        let colorHex = game?.color ?? ColorValues.fallbackColour
        let color = GlobalStyles.hexStringToUIColor(hex: colorHex)
        if  let seconds = game?.seconds,
            let title = game?.title {
            counterLabel.text = String(describing: seconds)
            titleLabel.text = title
            
            GlobalStyles.setIconColor(icon: counterIcon, color: colorHex)
            counterLabel.textColor = color
            leftBorderView.backgroundColor = color
            rightBorderView.backgroundColor = color
            bottomBorderView.backgroundColor = color
                
        } else {
            throw GameError.gameIsNil
        }
    }
    
    func startGame() throws {
        try initialisePointCounter()
    }

    func initialisePointCounter() throws {
        if let seconds = game?.seconds {
            count = seconds
        } else {
            throw GameError.gameIsNil
        }
        
        timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(update), userInfo: nil, repeats: true)
    }
    
    func update() {
        if(count > 0) {
            counterLabel.text = String(count)
            count -= 1
        } else {
            // stop timer and game
            counterLabel.text = String(count)
            stopGame()
        }
    }
    
    func stopGame() {
        if let timerTmp = timer {
            timerTmp.invalidate()
        }
    }
    
    func calculateGainedPoints(correctPercentage: Double) -> Int {
        // number of points the user can max. get for his answer
        let pointsToGet = count
        
        return Int(round(correctPercentage * Double(pointsToGet)))
    }
}
