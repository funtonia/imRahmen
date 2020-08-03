//
//  AnswerSquareButton.swift
//  ImRahmen
//
//  Created by Sonja Nürenberg on 16.08.17.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import UIKit

class AnswerSquareButton : SquareButton {
    
    required public init?(coder aDecoder: NSCoder) {
        
        super.init(coder: aDecoder)
        
        self.setStyleNormal()
        self.titleLabel?.textAlignment = NSTextAlignment.center;
        self.contentEdgeInsets = UIEdgeInsets(top: 6, left: 6, bottom: 6, right: 6)
        
        self.commonInit()
    }
    
    override func setStylePressed(){
        GlobalStyles.setBorder(view: self, color: GlobalStyles.hexStringToUIColor(hex: ColorValues.selectedCutoutCell))
    }
    
    private func commonInit() {
        self.titleLabel?.numberOfLines = 0
        self.titleLabel?.lineBreakMode = .byWordWrapping
    }
    
    override public var intrinsicContentSize: CGSize {
        if let contentSize = titleLabel?.intrinsicContentSize {
            return CGSize(width: contentSize.width, height: contentSize.height + 12)
        }
        return CGSize.zero
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        titleLabel?.preferredMaxLayoutWidth = titleLabel?.frame.size.width ?? 0
        super.layoutSubviews()
    }
}
