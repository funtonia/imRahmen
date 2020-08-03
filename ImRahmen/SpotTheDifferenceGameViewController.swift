//
//  SpotTheDifferenceController.swift
//  ImRahmen
//
//  Created by Antonia Verdier on 16.05.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class SpotTheDifferenceGameViewController: AbstractGameViewController, UIScrollViewDelegate {
    
    @IBOutlet var doneBarButtonItem: UIBarButtonItem!
    @IBOutlet weak var differenceImageView: UIImageView!
    
    var counter = 0
    var correctAnswers: Double = 0.0
    var gameStopped = false
    
    override func viewDidLoad() {
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(didTapImage))
        self.differenceImageView.isUserInteractionEnabled = true
        self.differenceImageView.addGestureRecognizer(tapGesture)
        
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
        
        // set navigation bar color
        let color = game?.color ?? ColorValues.fallbackColour
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: color)
    }
    
    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        return differenceImageView
    }
    
    func didTapImage(sender: UITapGestureRecognizer) {
        let touchPoint = sender.location(in: differenceImageView)
        
        if counter < 3 {
            counter += 1
            addButtonToTouchedArea(touchPoint: touchPoint)
        } else if counter >= 3 {
            return
        }
    }
    
    func addButtonToTouchedArea(touchPoint: CGPoint) {
        let buttonWidth = 44
        let buttonHeight = 44
        let differenceButton = UIButton(frame: CGRect(x: Int(touchPoint.x - CGFloat(buttonWidth/2)), y: Int(touchPoint.y - CGFloat(buttonHeight/2)), width: buttonWidth, height: buttonHeight))
        differenceButton.backgroundColor = .clear
        differenceButton.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.selectedCutoutCell).cgColor
        differenceButton.layer.borderWidth = 4
        differenceButton.layer.cornerRadius = 0.5 * differenceButton.bounds.size.width
        differenceButton.layer.shadowColor = UIColor.black.cgColor
        differenceButton.layer.shadowOffset = CGSize(width: 2, height:2)
        
        differenceButton.addTarget(self, action: #selector(removeButtonAction), for: .touchUpInside)
        
        differenceImageView.addSubview(differenceButton)
    }
    
    func removeButtonAction(sender: UIButton) {
        counter -= 1
        sender.removeFromSuperview()
    }
    
    func checkForCorrectEntries() {
        let imageWidth = differenceImageView.frame.width
        let imageHeight = differenceImageView.frame.height
        
        var points = [CGPoint(x: imageWidth/4.5, y: imageHeight/2.1), CGPoint(x: imageWidth/2, y: imageHeight/3.1), CGPoint(x: imageWidth * (6.9/8), y: imageHeight/3.3)]
        
        outerloop: for subview in differenceImageView.subviews {
            for index in 0...points.count - 1 {
                if subview.frame.contains(points[index]) {
                    subview.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.rightAnswerCutoutCell).cgColor
                    correctAnswers += 1
                    points.remove(at: index)
                    continue outerloop
                }
            }
            subview.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.wrongAnswerCutoutCell).cgColor
        }
        
        for point in points {
            let width = 44
            let height = 44
            let differenceView = UIView(frame: CGRect(x: Int(point.x - CGFloat(width/2)), y: Int(point.y - CGFloat(height/2)), width: width, height: height))
            differenceView.backgroundColor = .clear
            differenceView.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.missingAnswerCutoutCell).cgColor
            differenceView.layer.borderWidth = 4
            differenceView.layer.shadowColor = UIColor.black.cgColor
            differenceView.layer.shadowOffset = CGSize(width: 2, height:2)
            differenceView.layer.cornerRadius = 0.5 * differenceView.bounds.size.width
            
            differenceImageView.addSubview(differenceView)
        }
    }
    
    override func stopGame() {
        super.stopGame()
        
        // user may not undo his choices or choose new ones -> disable user interaction
        gameStopped = true
        differenceImageView.isUserInteractionEnabled = false
        checkForCorrectEntries()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let destinationVC = segue.destination as? ResultViewController {
            destinationVC.game = game
            
            if let numberOfPossibleCorrectAnswers = game?.results?.count {
                // get the absolute value of the difference
                let correctPercentage = correctAnswers / Double(numberOfPossibleCorrectAnswers)
                destinationVC.points = calculateGainedPoints(correctPercentage: Double(correctPercentage))
                
                let firstText = "Du hast "
                
                let boldText1 = String(describing: Int(correctAnswers))
                let boldText2 = " von "
                let boldText3 = String(describing: numberOfPossibleCorrectAnswers)
                let lastText = " Fehlern gefunden."
                
                let attributedString = NSMutableAttributedString(string: firstText)
                
                let attributesBold = [NSFontAttributeName : UIFont.boldSystemFont(ofSize: 17)]
                let attributesNormal = [NSFontAttributeName : UIFont.systemFont(ofSize: 17)]
                let lastTextNormal = NSMutableAttributedString(string: lastText, attributes:attributesNormal)
                let boldString1 = NSMutableAttributedString(string: boldText1, attributes:attributesBold)
                let boldString2 = NSMutableAttributedString(string: boldText2, attributes:attributesBold)
                let boldString3 = NSMutableAttributedString(string: boldText3, attributes:attributesBold)
                
                attributedString.append(boldString1)
                attributedString.append(boldString2)
                attributedString.append(boldString3)
                attributedString.append(lastTextNormal)
                
                destinationVC.yourGuessLabelText = attributedString
            }
        }
    }
    
    @IBAction func onDoneBarButtonTap(_ sender: Any) {
        if(!gameStopped){
            stopGame()
        } else {
            performSegue(withIdentifier: SegueIds.showResultFromSpotTheDifference, sender: self)
        }
    }
}
