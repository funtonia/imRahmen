//
//  StartScreenViewController.swift
//  ImRahmen
//
//  Created by Aurelia Bachmann on 10/05/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit
import CoreLocation

class StartScreenViewController: UIViewController, UIAlertViewDelegate {
    
    @IBOutlet weak var startButton: SquareButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: UIBarMetrics.default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        
        updateVersion()
        
        //required for UITesting
        view.accessibilityIdentifier = "startView"
    }
    
    override func viewWillAppear(_ animated: Bool) {
        startButton.setStyleNormal()
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        // Remove self from navigation hierarchy
        guard let viewControllers = navigationController?.viewControllers,
            let index = viewControllers.index(of: self) else { return }
        navigationController?.viewControllers.remove(at: index)
    }
    
    func updateVersion() {
        // check for version changes
        
        let isNewVersion = true
        
        if isNewVersion {
            let databaseReader = DatabaseReader()
            databaseReader.getGamesFromDatabase()
        }
    }
    
    @IBAction func startButtonPressed(_ sender: Any) {
        startButton.setStylePressed()
    }
    
    @IBAction func onLocationTap(_ sender: Any) {
        let alertController = UIAlertController(title: "Nicht in der Staatsgalerie?", message: "Die vollen Funktionen dieser App sind nur in der Staatsgalerie Stuttgart nutzbar. Du weißt nicht, wie du am schnellsten zur Staatsgalerie kommst? Dann klicke auf 'Auf Karte anzeigen'.", preferredStyle: .alert)
        let cancelAction = UIAlertAction(title: "Abbrechen", style: .cancel) { action in }
        alertController.addAction(cancelAction)
        let showAction = UIAlertAction(title: "Auf Karte anzeigen", style: .default) { action in
            UIApplication.shared.openURL(NSURL(string: "http://maps.apple.com/?address=State%20Gallery")! as URL)
        }
        alertController.addAction(showAction)
        self.present(alertController, animated: true) { }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}
