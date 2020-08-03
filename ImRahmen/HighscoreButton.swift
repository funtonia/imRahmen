import UIKit

class HighscoreButton: UIButton {
    
    required public init?(coder aDecoder: NSCoder) {
        
        super.init(coder: aDecoder)
        
        self.setStyleNormal()
        self.titleEdgeInsets.left = 12;
        self.titleLabel?.textColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.darkgrey)
        self.titleLabel?.highlightedTextColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.darkgrey)
    }
    
    func setStyleNormal(){
        self.backgroundColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.white)
    }
    
    func setStylePressed(){
        self.backgroundColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.lightgrey)
    }
}
