//
//  ResultViewController.swift
//  ImRahmen
//
//  Created by Aurelia Bachmann on 24/06/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//


import UIKit
import CoreLocation

class ResultViewController : UIViewController {

    @IBOutlet var leftBarView: UIView!
    @IBOutlet var bottomBarView: UIView!
    @IBOutlet var rightBarView: UIView!
    @IBOutlet var aufloesungLabel: UILabel!
    @IBOutlet var divider1View: UIView!
    @IBOutlet var divider2View: UIView!
    @IBOutlet var schonGewusstView: UILabel!
    @IBOutlet weak var informationLabel: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var artistLabel: UILabel!
    @IBOutlet weak var yearLabel: UILabel!
    @IBOutlet weak var image: UIImageView!
    @IBOutlet weak var additionalInfoTitleLabel: UILabel!
    @IBOutlet weak var additionalInfoTextLabel: UILabel!
    @IBOutlet var yourGuessLabel: UILabel!
    @IBOutlet var gainedPointsLabel: UILabel!
    @IBOutlet var yourGuessLabelToAufloesungConstraint: NSLayoutConstraint!
    
    var game: Game?
    var yourGuessLabelText: NSAttributedString?
    var points: Int?
    
    override func viewDidLoad() {
        if      let information = game?.information,
                let name = game?.name,
                let artist = game?.artist,
                let year = game?.year,
                let image_url = game?.image_url,
                let additional_info_title = game?.additional_info_title,
                let additional_info_text = game?.additional_info_text {
            
            informationLabel.text = information
            nameLabel.text = name
            artistLabel.text = artist
            yearLabel.text = year
            image.image = UIImage(named: image_url)
            additionalInfoTextLabel.text = additional_info_text
            additionalInfoTitleLabel.text = additional_info_title
            
        } else {
            performSegue(withIdentifier: SegueIds.showError, sender: self)
        }
        
        if let information = game?.information, information == "" {
            yourGuessLabelToAufloesungConstraint.priority = 900
        } else {
            yourGuessLabelToAufloesungConstraint.priority = 700
        }
        
        yourGuessLabel.attributedText = yourGuessLabelText
        
        var gainedPointsText = "Du erhältst\n"
        
        if let pointsTmp = points {
            gainedPointsText += String(describing: pointsTmp)
            
            if pointsTmp > 1 || pointsTmp == 0 {
                gainedPointsText += " Punkte"
            } else {
                gainedPointsText += " Punkt"
            }
            
        } else {
            gainedPointsText += String(describing: 0)
            gainedPointsText += " Punkte"
        }
        
        gainedPointsLabel.text = gainedPointsText
        self.navigationItem.setHidesBackButton(true, animated:true);
        setColors()
    }
    
    func setColors() {
        let colorHex = game?.color ?? ColorValues.fallbackColour
        let color = GlobalStyles.hexStringToUIColor(hex: colorHex)
        
        leftBarView.backgroundColor = color
        bottomBarView.backgroundColor = color
        rightBarView.backgroundColor = color
        divider1View.backgroundColor = color
        divider2View.backgroundColor = color
        schonGewusstView.textColor = color
        aufloesungLabel.textColor = color
        nameLabel.textColor = color
        
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: colorHex)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let destinationVC = segue.destination as? ViewController {
            if let game = game, let points = points {
                destinationVC.updateGameStatus(playedGame: game, points: points)
            } else {
                print("no game")
            }
            
            destinationVC.updatePoints(achievedPoints: points ?? 0)
        }
    }
}
