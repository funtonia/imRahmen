//
//  CutoutSelectionController.swift
//  ImRahmen
//
//  Created by Aurelia Bachmann on 11/06/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class CutoutSelectionGameViewController: AbstractGameViewController, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    @IBOutlet weak var cutoutCollectionView: UICollectionView!
    
    var allCutouts = [0,1,2,3,4,5,6,7,8]
    var allImages = ["cutouts_0.png","cutouts_1.png","cutouts_2.png","cutouts_3.png","cutouts_4.png","cutouts_5.png","cutouts_6.png","cutouts_7.png","cutouts_8.png"]
    var rightCutouts : [Int] = [] 
    var selectedCutouts : [Int] = []
    var correctAnswers : Double = 0.0
    var gameStopped = false
    
    override func viewDidLoad() {
        cutoutCollectionView.allowsMultipleSelection = true
        allImages = game?.answers ?? ["no answers"]
        
        if let results = game?.results {
            for rightAnswer in results {
                rightCutouts.append(rightAnswer)
            }
        }
        
        do {
            try setGameData()
            try startGame()
        } catch {
            performSegue(withIdentifier: SegueIds.showError, sender: self)
        }
        
        self.navigationItem.setHidesBackButton(true, animated:true)
    }

    override func setGameData() throws {
        try super.setGameData()
        
        // set navigation bar color
        let color = game?.color ?? ColorValues.fallbackColour
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: color)
    }
    
    func checkForCorrectEntries() {
        for cutout in selectedCutouts{
            if(rightCutouts.contains(cutout)){
                correctAnswers += 1;
            }
        }
        print("You have \(correctAnswers) of \(rightCutouts.count) right answers")
    }
    
    override func stopGame() {
        super.stopGame()
        
        gameStopped = true
        checkForCorrectEntries()
        self.cutoutCollectionView.reloadData()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let destinationVC = segue.destination as? ResultViewController {
            destinationVC.game = game
            
            if let numberOfPossibleCorrectAnswers = game?.results?.count {
                let numberOfChosenCorrectAnswers = correctAnswers
                let numberOfChosenWrongAnswers = Double(selectedCutouts.count) - numberOfChosenCorrectAnswers
                let numberOfPossibleWrongAnswers = Double(allImages.count - numberOfPossibleCorrectAnswers)
                
                var correctPercentage = (numberOfChosenCorrectAnswers / Double(numberOfPossibleCorrectAnswers)) - (numberOfChosenWrongAnswers / numberOfPossibleWrongAnswers)
                
                if correctPercentage < 0.0 {
                    correctPercentage = 0.0
                }
                
                destinationVC.points = calculateGainedPoints(correctPercentage: Double(correctPercentage))
                
                let firstText = "Du hast "
        
                let boldText1 = String(describing:  Int(numberOfChosenWrongAnswers))
                let boldText2 = numberOfChosenWrongAnswers == 0 ? " falsche und " : " falschen und "
                let boldText3 = String(describing: Int(numberOfChosenCorrectAnswers))
                let boldText4 = " von "
                let boldText5 = String(describing: numberOfPossibleCorrectAnswers)
                let boldText6 = " richtigen "
                let lastText = " Ausschnitten ausgewählt."
                
                let attributedString = NSMutableAttributedString(string: firstText)
                
                let attributesBold = [NSFontAttributeName : UIFont.boldSystemFont(ofSize: 17)]
                let attributesNormal = [NSFontAttributeName : UIFont.systemFont(ofSize: 17)]
                let lastTextNormal = NSMutableAttributedString(string: lastText, attributes:attributesNormal)
                let boldString1 = NSMutableAttributedString(string: boldText1, attributes:attributesBold)
                let boldString2 = NSMutableAttributedString(string: boldText2, attributes:attributesBold)
                let boldString3 = NSMutableAttributedString(string: boldText3, attributes:attributesBold)
                let boldString4 = NSMutableAttributedString(string: boldText4, attributes:attributesBold)
                let boldString5 = NSMutableAttributedString(string: boldText5, attributes:attributesBold)
                let boldString6 = NSMutableAttributedString(string: boldText6, attributes:attributesBold)
                
                attributedString.append(boldString1)
                attributedString.append(boldString2)
                attributedString.append(boldString3)
                attributedString.append(boldString4)
                attributedString.append(boldString5)
                attributedString.append(boldString6)
                attributedString.append(lastTextNormal)
                
                destinationVC.yourGuessLabelText = attributedString
            }
        }
    }
    
    @IBAction func onDoneBarButtonTap(_ sender: Any) {
        if(!gameStopped){
            stopGame()
        }  else {
            performSegue(withIdentifier: SegueIds.showResultFromCutoutSelection, sender: self)
        }
    }
    
    //CollectionView
    
    var itemSize: CGSize?
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        // only recalculate if the itemsize has not been calculated yet
        if let itemSize = itemSize {
            return itemSize
        } else {
            let minimumInterItemSpacing: CGFloat = 6.0
            let numberOfCellsPerRow: CGFloat = 3.0
            
            let containerWidth = collectionView.bounds.width - ((numberOfCellsPerRow - 1.0) * minimumInterItemSpacing)
            
            let itemWidth = containerWidth / numberOfCellsPerRow
            
            let itemSize = CGSize(width: itemWidth, height: itemWidth)
            
            self.itemSize = itemSize
            
            return itemSize
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 6.0
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return allCutouts.count
    }
    
    func collectionView(_ collectionView: UICollectionView,
                        cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cutoutCell",
                                                      for: indexPath) as! CutoutCollectionCell
        guard let image = UIImage(named:allImages[indexPath.item]) else{
            print("no such image")
            return cell
        }
        
        if(gameStopped){
            if(rightCutouts.contains(Int(indexPath.item))&&selectedCutouts.contains(Int(indexPath.item))){
                cell.markAsRightAnswer()
            } else if(!(rightCutouts.contains(Int(indexPath.item)))&&selectedCutouts.contains(Int(indexPath.item))){
                cell.markAsWrongAnswer()
            }else if(rightCutouts.contains(Int(indexPath.item))&&(!selectedCutouts.contains(Int(indexPath.item)))){
                cell.markAsMissingAnswer()
            }
            else{
                cell.deselect()
            }
        }
        cell.configureCell(image: image)
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if(!gameStopped){
            if let cell = collectionView.cellForItem(at: indexPath as IndexPath) as? CutoutCollectionCell {
                cell.select()
                selectedCutouts.append(allCutouts[indexPath.item])
            } else {
                // Error indexPath is not on screen: this should never happen.
            }
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, didDeselectItemAt indexPath: IndexPath) {
        if(!gameStopped){
            if let cell = collectionView.cellForItem(at: indexPath as IndexPath) as? CutoutCollectionCell {
                cell.deselect()
                
                var index = 0;
                for cutout in selectedCutouts{
                    if(cutout==allCutouts[indexPath.item]){
                        selectedCutouts.remove(at: index)
                    }
                    index += 1;
                }
            } else {
                // Error indexPath is not on screen: this should never happen.
            }
        }
    }
}
