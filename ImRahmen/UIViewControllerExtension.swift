//
//  UIViewControllerExtension.swift
//  ImRahmen
//
//  Created by Antonia verdier on 06.06.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

extension UIView {
    
    func updateConstraintPriorityRecursive(fromPriority: Float, toPriority: Float) {
        for view in self.subviews {
            for constraint in view.constraints {
                if constraint.priority == fromPriority {
                    constraint.priority = toPriority
                }
            }
        }
    }
}
