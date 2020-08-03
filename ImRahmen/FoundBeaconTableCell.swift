//
//  FoundBeaconTableCell.swift
//  ImRahmen
//
//  Created by Sonja Nürenberg on 24.05.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//
import UIKit
import CoreLocation

class FoundBeaconTableCell : UITableViewCell {
    
    @IBOutlet weak var cellTitle: UILabel!
    @IBOutlet weak var cellImage: UIImageView!
    @IBOutlet weak var alreadyPlayedIcon: UIImageView!
    @IBOutlet weak var points: UILabel!
    
    func configureCell(game: Game){
        cellTitle.text = game.type.description
        
        GlobalStyles.setIconColor(icon: alreadyPlayedIcon, color: ColorValues.cyan)
        
        if let image = game.image_url{
            cellImage.image = UIImage(named: image)
        }
        
        if game.alreadyPlayed{
            alreadyPlayedIcon.alpha = 1
        } else {
            alreadyPlayedIcon.alpha = 0
        }
        
        let point = String(game.seconds)
        let achieved = String(game.achievedPoints)
        
        if(game.alreadyPlayed) {
            points.text = achieved + " / " + point + " Punkte"
        }
        else {
            points.text = point + " Punkte"
        }

        let selectedBgView = UIView()
        selectedBgView.backgroundColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.lightgrey)
        self.selectedBackgroundView = selectedBgView
    }
}
