//
//  GlobalStyles.swift
//  Ar-App
//
//  Created by Antonia verdier on 02/05/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class GlobalStyles {
    
    class func roundedCorners(view: UIView) {
        view.layer.cornerRadius = 0.1 * view.bounds.size.width
    }
    
    class func roundButtonCorners(view: UIView) {
        view.layer.cornerRadius = 0.5 * view.bounds.size.width
    }
    
    class func hexStringToUIColor (hex:String) -> UIColor {
        var cString:String = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        
        if (cString.hasPrefix("#")) {
            cString.remove(at: cString.startIndex)
        }
        
        if ((cString.characters.count) != 6) {
            return UIColor.gray
        }
        
        var rgbValue:UInt32 = 0
        Scanner(string: cString).scanHexInt32(&rgbValue)
        
        return UIColor(
            red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
            alpha: CGFloat(1.0)
        )
    }
    
    class func setNavbarColor (navigationBar: UINavigationBar?, hex: String) {
        if (navigationBar != nil) {
            navigationBar!.barTintColor = hexStringToUIColor(hex: hex)
        }
    }
    
    class func setIconColor (icon: UIImageView, color: String) {
        icon.image = icon.image!.withRenderingMode(.alwaysTemplate)
        icon.tintColor = hexStringToUIColor(hex: color)
    }
    
    class func setBorder(view: UIView, color: UIColor) {
        view.layer.borderColor = color.cgColor
        view.layer.borderWidth = 1.0
    }
}
