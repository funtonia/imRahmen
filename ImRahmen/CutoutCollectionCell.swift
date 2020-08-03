//
//  CutoutCollectionCell.swift
//  ImRahmen
//
//  Created by Aurelia Bachmann on 12/06/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit
import CoreLocation

class CutoutCollectionCell : UICollectionViewCell {
    
    //import image
    @IBOutlet weak var cutoutImage: UIImageView!
    
    func configureCell(image: UIImage){
        cutoutImage.image = image
    }
    
    func select() {
        self.layer.borderWidth = 4.0
        self.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.selectedCutoutCell).cgColor
    }
    
    func deselect() {
        self.layer.borderWidth = 0.0
    }
    
    func markAsRightAnswer() {
        self.layer.borderWidth = 4.0
        self.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.rightAnswerCutoutCell).cgColor
    }
    
    func markAsWrongAnswer() {
        self.layer.borderWidth = 4.0
        self.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.wrongAnswerCutoutCell).cgColor
    }
    
    func markAsMissingAnswer() {
        self.layer.borderWidth = 4.0
        self.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.missingAnswerCutoutCell).cgColor
    }
}

