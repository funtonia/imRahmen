import UIKit

class SquareView: UIView {
    
    required public init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        self.layer.borderColor = GlobalStyles.hexStringToUIColor(hex: ColorValues.darkgrey).cgColor
        self.layer.borderWidth = 1
    }
}
