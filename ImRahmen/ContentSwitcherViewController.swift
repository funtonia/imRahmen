//
//  ContentSwitcherViewController.swift
//  ImRahmen
//
//  Created by Antonia verdier on 03.06.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit


class ContentSwitcherViewController: UIViewController {
    @IBOutlet weak var containerView: UIView!
    
    func setNewChildViewController(viewController: UIViewController) {
        addChildViewController(viewController)
        view.addSubview(viewController.view)
        
    }
    
}
