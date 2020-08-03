import UIKit

class SquareButton: UIButton {
    
    required public init?(coder aDecoder: NSCoder) {
        
        super.init(coder: aDecoder)
        
        self.setStyleNormal()
        self.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.darkgrey).cgColor
        self.titleLabel?.textColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.darkgrey)
        self.titleLabel?.highlightedTextColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.darkgrey)
    }
    
    func setStyleNormal(){
        self.backgroundColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.white)
        self.layer.borderWidth = 1
        self.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.darkgrey).cgColor
    }
    
    func setStylePressed(){
        self.backgroundColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.lightgrey)
        self.layer.borderWidth = 0
    }
    
}
