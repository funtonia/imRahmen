//
//  CountGameViewController.swift
//  ImRahmen
//
//  Created by Antonia Verdier on 10.08.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class TrueOrFalseGameViewController: AbstractGameViewController, UIScrollViewDelegate, UITextFieldDelegate {
    
    @IBOutlet var trueButton: SquareButton!
    @IBOutlet var falseButton: SquareButton!
    
    var tappedAnswer: Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        do {
            try setGameData()
            try startGame()
        } catch {
            performSegue(withIdentifier: SegueIds.showError, sender: self)
        }
        
        self.navigationItem.setHidesBackButton(true, animated:true)
        self.navigationItem.rightBarButtonItem?.isEnabled = false
    }
    
    override func setGameData() throws {
        try super.setGameData()
        
        // set navigation bar color
        let color = game?.color ?? ColorValues.fallbackColour
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: color)
    }
    
    @IBAction func onTrueTapped() {
        tappedAnswer = 1
        
        falseButton.setStyleNormal()
        self.navigationItem.rightBarButtonItem?.isEnabled = true
        
        GlobalStyles.setBorder(view: trueButton, color: GlobalStyles.hexStringToUIColor(hex: ColorValues.selectedCutoutCell))
    }
    
    @IBAction func onFalseTapped() {
        tappedAnswer = 0
        
        trueButton.setStyleNormal()
        self.navigationItem.rightBarButtonItem?.isEnabled = true
        
        GlobalStyles.setBorder(view: falseButton, color: GlobalStyles.hexStringToUIColor(hex: ColorValues.selectedCutoutCell))
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if let destinationVC = segue.destination as? ResultViewController {
            destinationVC.game = game
            
            guard let results = game?.results else {
                // we need this data -> show error
                performSegue(withIdentifier: SegueIds.showError, sender: self)
                return
            }
            
            let didGuessCorrect = (tappedAnswer == results[0])
            
            let correctPercentage =  didGuessCorrect ? 1.0 : 0.0
            
            destinationVC.points = calculateGainedPoints(correctPercentage: correctPercentage)
            
            let firstText = "Du hast "
            let attributedString = NSMutableAttributedString(string: firstText)
            var middleText: String?
            var boldText = ""
            var lastText = ""
            
            if didGuessCorrect {
                boldText = "richtig "
                lastText = "geschätzt!"
            } else {
                middleText = "leider "
                boldText = "falsch "
                lastText = "geschätzt."
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
        stopGame()
        performSegue(withIdentifier: SegueIds.showResultFromTrueOrFalse, sender: self)
    }
}
