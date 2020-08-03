//
//  EstimationGameViewController.swift
//  Ar-App
//
//  Created by Antonia verdier on 02/05/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class EstimationGameViewController: AbstractGameViewController, UIScrollViewDelegate, UITextFieldDelegate {
    
    @IBOutlet weak var image: UIImageView!
    @IBOutlet weak var answerTextField: UITextField!
    @IBOutlet weak var valueLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        answerTextField.delegate = self
        answerTextField.becomeFirstResponder()

        do {
            try setGameData()
            try startGame()
        } catch {
            performSegue(withIdentifier: SegueIds.showError, sender: self)
        }

        initTapGestureRecognizer()
        self.navigationItem.setHidesBackButton(true, animated:true);
        self.navigationItem.rightBarButtonItem?.isEnabled = false;
    }
    
    override func setGameData() throws {
        try super.setGameData()
        guard let image_url = game?.image_url else{
            throw GameError.gameIsNil
        }
        image.image = UIImage(named: image_url)
        
        valueLabel.text = game?.value
        
        // set navigation bar color
        let color = game?.color ?? ColorValues.fallbackColour
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: color)
    }
    
    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        return image
    }
    
    func initTapGestureRecognizer() {
        let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        self.view.addGestureRecognizer(tapGestureRecognizer)
    }
    
    func dismissKeyboard() {
        answerTextField.resignFirstResponder()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if let destinationVC = segue.destination as? ResultViewController {
            destinationVC.game = game
            
            if let givenAnswer = answerTextField.text, let correctAnswer = game?.results?[0] {
                // get the absolute value of the difference
                let givenAnswerWithoutDot = givenAnswer.replacingOccurrences(of: ".", with: "")
                let correctAnswerDouble = Double(correctAnswer)
                let givenAnswerDouble = Double(givenAnswerWithoutDot)!
                
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
            
            let firstText = "Du hast den Wert auf "
            
            let boldText1 = answerTextField.text ?? ""
            let space = " "
            let boldText2 = valueLabel.text ?? ""
            let lastText = " geschätzt."
            
            let attributedString = NSMutableAttributedString(string: firstText)
            
            let attributesBold = [NSFontAttributeName : UIFont.boldSystemFont(ofSize: 17)]
            let attributesNormal = [NSFontAttributeName : UIFont.systemFont(ofSize: 17)]
            let spaceNormal = NSMutableAttributedString(string: space, attributes:attributesNormal)
            let lastTextNormal = NSMutableAttributedString(string: lastText, attributes:attributesNormal)
            let boldString1 = NSMutableAttributedString(string: boldText1, attributes:attributesBold)
            let boldString2 = NSMutableAttributedString(string: boldText2, attributes:attributesBold)
            
            attributedString.append(boldString1)
            attributedString.append(spaceNormal)
            attributedString.append(boldString2)
            attributedString.append(lastTextNormal)
            
            destinationVC.yourGuessLabelText = attributedString
        }
    }
    
    
    //TextField
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if textField == answerTextField {
            textField.resignFirstResponder()
            return false
        }
        return true
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.locale = Locale.current
        formatter.maximumFractionDigits = 0

        if let groupingSeparator = formatter.groupingSeparator {
            if string == groupingSeparator {
                return true
            }
            if let textWithoutGroupingSeparator = textField.text?.replacingOccurrences(of: groupingSeparator, with: "") {
                var totalTextWithoutGroupingSeparators = textWithoutGroupingSeparator + string
                if string == "" { // pressed Backspace key
                    totalTextWithoutGroupingSeparators.characters.removeLast()
                }
                if let numberWithoutGroupingSeparator = formatter.number(from: totalTextWithoutGroupingSeparators),
                    let formattedText = formatter.string(from: numberWithoutGroupingSeparator) {
                    textField.text = formattedText
                    textFieldDidChange()
                    return false
                }
            }
        }
        return true
    }
    
    func textFieldDidChange(){
        if (answerTextField.text != nil && answerTextField.text!.characters.count > 0){
            self.navigationItem.rightBarButtonItem?.isEnabled = true;
        } else {
            self.navigationItem.rightBarButtonItem?.isEnabled = false;
        }
    }
}
