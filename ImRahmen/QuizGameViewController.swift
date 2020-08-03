//
//  QuizGameViewController.swift
//  ImRahmen
//
//  Created by Sonja Nürenberg on 16.08.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class QuizGameViewController: AbstractGameViewController, UIScrollViewDelegate {
    
    @IBOutlet weak var answerButtonOne: AnswerSquareButton!
    @IBOutlet weak var answerButtonTwo: AnswerSquareButton!
    @IBOutlet weak var answerButtonThree: AnswerSquareButton!
    
    var gameStopped = false
    var tappedAnswer: Int?
    
    override func viewDidLoad() {
        do {
            try setGameData()
            try startGame()
        } catch {
            performSegue(withIdentifier: SegueIds.showError, sender: self)
        }
        self.navigationItem.setHidesBackButton(true, animated:true);
    }
    
    override func setGameData() throws {
        try super.setGameData()
        if((game?.answers?.count)! > 2){
            answerButtonOne.setTitle(game?.answers?[0], for: .normal)
            answerButtonTwo.setTitle(game?.answers?[1], for: .normal)
            answerButtonThree.setTitle(game?.answers?[2], for: .normal)
        }
        // set navigation bar color
        let color = game?.color ?? ColorValues.fallbackColour
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: color)
    }
    
    @IBAction func onAnswerButtonOneTap(_ sender: AnswerSquareButton) {
        sender.setStylePressed()
        answerButtonThree.setStyleNormal()
        answerButtonTwo.setStyleNormal()
        self.navigationItem.rightBarButtonItem?.isEnabled = true
        tappedAnswer = 0
    }
    
    @IBAction func onAnswerButtonTwoTap(_ sender: AnswerSquareButton) {
        sender.setStylePressed()
        answerButtonOne.setStyleNormal()
        answerButtonThree.setStyleNormal()
        self.navigationItem.rightBarButtonItem?.isEnabled = true
        tappedAnswer = 1
    }
    
    @IBAction func onAnswerButtonThreeTap(_ sender: AnswerSquareButton) {
        sender.setStylePressed()
        answerButtonOne.setStyleNormal()
        answerButtonTwo.setStyleNormal()
        self.navigationItem.rightBarButtonItem?.isEnabled = true
        tappedAnswer = 2
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if let destinationVC = segue.destination as? ResultViewController {
            destinationVC.game = game
            
            guard let results = game?.results else {
                performSegue(withIdentifier: SegueIds.showError, sender: self)
                return
            }
            
            let didGuessCorrect = (tappedAnswer == results[0])
            
            let correctPercentage =  didGuessCorrect ? 1.0 : 0.0
            
            destinationVC.points = calculateGainedPoints(correctPercentage: correctPercentage)
            
            let firstText = "Deine Antwort ist "
            let attributedString = NSMutableAttributedString(string: firstText)
            var middleText: String?
            var boldText = ""
            var lastText = ""
            
            if didGuessCorrect {
                boldText = "richtig."
            } else {
                middleText = "leider "
                boldText = "falsch. "
                let rightAnswer = game?.answers?[results[0]]
                if(rightAnswer != nil){
                    lastText = "'\(rightAnswer!)' wäre die richtige Antwort gewesen."
                }
            }
            
            let attributesBold = [NSFontAttributeName : UIFont.boldSystemFont(ofSize: 17)]
            let attributesNormal = [NSFontAttributeName : UIFont.systemFont(ofSize: 17)]
            
            if let middleText = middleText {
                let middleTextNormal = NSMutableAttributedString(string: middleText, attributes:attributesNormal)
                attributedString.append(middleTextNormal)
            }
            
            let boldString = NSMutableAttributedString(string: boldText, attributes:attributesBold)
            let lastTextNormal = NSMutableAttributedString(string: lastText, attributes:attributesNormal)
            
            attributedString.append(boldString)
            attributedString.append(lastTextNormal)
            
            destinationVC.yourGuessLabelText = attributedString
        }
    }
    
    @IBAction func onDoneBarButtonTap(_ sender: Any) {
        gameStopped = true
        stopGame()
        performSegue(withIdentifier: SegueIds.showResultFromQuiz, sender: self)
    }
}
