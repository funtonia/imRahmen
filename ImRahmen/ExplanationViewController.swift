//
//  ExplanationViewController.swift
//  ImRahmen
//
//  Created by Antonia verdier on 06.06.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class ExplanationViewController: UIViewController, UIScrollViewDelegate {
    
    @IBOutlet weak var explanationLabel: UILabel!
    @IBOutlet var explanationImage: UIImageView!
    
    @IBOutlet var leftBorderView: UIView!
    @IBOutlet var rightBorderView: UIView!
    @IBOutlet var bottomBorderView: UIView!
    
    var game: Game!
    
    override func viewDidLoad() {
        if  let hint = game.hint,
            let image_url = game?.image_url{
            explanationLabel.text = hint
            explanationImage.image = UIImage(named: image_url)
        } else {
            performSegue(withIdentifier: SegueIds.showError, sender: self)
        }
        setGameData()
    }

    func setGameData() {
        let colorHex = game?.color ?? ColorValues.fallbackColour
        let color = GlobalStyles.hexStringToUIColor(hex: colorHex)
        
        leftBorderView.backgroundColor = color
        rightBorderView.backgroundColor = color
        bottomBorderView.backgroundColor = color
        
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: colorHex)
    }
    
    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        return explanationImage
    }
    
    @IBAction func onStartButtonTap(_ sender: Any) {
        if game?.type == GameType.estimation {
            performSegue(withIdentifier: SegueIds.showEstimationGame, sender: self)
        } else if game?.type == GameType.difference {
            performSegue(withIdentifier: SegueIds.showSpotTheDifferenceGame, sender: self)
        } else if game?.type == GameType.cutouts {
            performSegue(withIdentifier: SegueIds.showCutoutSelectionGame, sender: self)
        } else if game?.type == GameType.counting {
            performSegue(withIdentifier: SegueIds.showCountingGame, sender: self)
        } else if game?.type == GameType.trueorfalse {
            performSegue(withIdentifier: SegueIds.showTrueOrFalseGame, sender: self)
        } else if game?.type == GameType.quiz {
            performSegue(withIdentifier: SegueIds.showQuizGame, sender: self)
        } else {
            performSegue(withIdentifier: SegueIds.noGameYet, sender: self)
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let destinationVC = segue.destination as? AbstractGameViewController {
            destinationVC.game = game
        }
    }
}
