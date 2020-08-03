//
//  CountingGameViewController.swift
//  ImRahmen
//
//  Created by Aurelia Bachmann on 01/08/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class CountingGameViewController: AbstractGameViewController, UIScrollViewDelegate, UITextFieldDelegate {
    
    @IBOutlet weak var answerView: SquareView!
    @IBOutlet weak var image: UIImageView!
    @IBOutlet weak var numberLabel: UILabel!
    @IBOutlet weak var minusButton: SquareButton!
    @IBOutlet weak var plusButton: SquareButton!
    
    var currentNumber : Int = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        numberLabel.text = String(currentNumber)
        numberLabel.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.buttonTextAndBorder).cgColor
        numberLabel.layer.borderWidth = 1.0
        
        answerView.layer.borderWidth = 0.0
        
        minusButton.layer.borderWidth = 1.0
        minusButton.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.buttonTextAndBorder).cgColor
        minusButton.setTitleColor(UIColor .white, for: UIControlState.normal)
        minusButton.setTitleColor(GlobalStyles.hexStringToUIColor(hex: ColorValues.buttonBackgroundPressed), for: UIControlState.highlighted)
        
        plusButton.layer.borderWidth = 1.0
        plusButton.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.buttonTextAndBorder).cgColor
        plusButton.setTitleColor(GlobalStyles.hexStringToUIColor(hex: ColorValues.buttonBackgroundPressed), for: UIControlState.highlighted)
        
        do {
            try setGameData()
            try startGame()
        } catch {
            performSegue(withIdentifier: SegueIds.showError, sender: self)
        }
        self.navigationItem.setHidesBackButton(true, animated:true);
        self.navigationItem.rightBarButtonItem?.isEnabled = false;
    }
    
    override func setGameData() throws {
        try super.setGameData()
        guard let image_url = game?.image_url else{
            throw GameError.gameIsNil
        }
        image.image = UIImage(named: image_url)
        
        // set navigation bar color
        let color = game?.color ?? ColorValues.fallbackColour
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: color)
    }
    
    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        return image
    }
    
    @IBAction func minusButtonDown(_ sender: Any) {
        minusButton.setStylePressed()
    }
    
    @IBAction func minusButton(_ sender: Any) {
        
        if( currentNumber > 0){
            currentNumber -= 1
        }
        numberLabel.text = String(currentNumber)
        self.navigationItem.rightBarButtonItem?.isEnabled = true
        minusButton.setStyleNormal()
    }

    
    @IBAction func plusButtonDown(_ sender: Any) {
        plusButton.setStylePressed()
    }
    @IBAction func plusButton(_ sender: Any) {
        currentNumber += 1
        numberLabel.text = String(currentNumber)
        self.navigationItem.rightBarButtonItem?.isEnabled = true
        plusButton.setStyleNormal()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let destinationVC = segue.destination as? ResultViewController {
            destinationVC.game = game
            
            if let correctAnswer = game?.results?[0] {
                // get the absolute value of the difference
                
                let correctAnswerDouble = Double(correctAnswer)
                let givenAnswerDouble = Double(currentNumber)
                
                var difference = 0.0
                var correctPercentage = 0.0
                
                if correctAnswerDouble > givenAnswerDouble {
                    difference = correctAnswerDouble - givenAnswerDouble
                } else {
                    difference = givenAnswerDouble - correctAnswerDouble
                }
                
                correctPercentage = 1 - (difference / Double(correctAnswer))
                
                if correctPercentage < 0 {
                    correctPercentage = 0.0
                }
                
                destinationVC.points = calculateGainedPoints(correctPercentage: correctPercentage)
            }
            
            let firstText = "Du hast "
            
            let boldText1 = String(currentNumber)

            let lastText = " gezählt."
            
            let attributedString = NSMutableAttributedString(string: firstText)
            
            let attributesBold = [NSFontAttributeName : UIFont.boldSystemFont(ofSize: 17)]
            let attributesNormal = [NSFontAttributeName : UIFont.systemFont(ofSize: 17)]
            let lastTextNormal = NSMutableAttributedString(string: lastText, attributes:attributesNormal)
            let boldString1 = NSMutableAttributedString(string: boldText1, attributes:attributesBold)

            
            attributedString.append(boldString1)
            attributedString.append(lastTextNormal)
            
            destinationVC.yourGuessLabelText = attributedString
        }
    }
    
    @IBAction func onDoneBarButtonTap(_ sender: Any) {
        stopGame()
        performSegue(withIdentifier: SegueIds.showResultFromCountingGame, sender: self)
    }
}
