import UIKit

class ErrorViewController: UIViewController {
    
    override func viewDidLoad() {
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: ColorValues.cyan)
        
        let newBackButton = UIBarButtonItem(title:"Zurück", style: .plain, target: self, action: #selector(ErrorViewController.backToViewController(sender:)))
        self.navigationItem.leftBarButtonItem = newBackButton
    }
    
    func backToViewController(sender: UIBarButtonItem) {
        if let viewController = self.navigationController?.viewControllers[1] {
            self.navigationController?.popToViewController(viewController, animated: true)
        } else {
            self.navigationController?.popToRootViewController(animated: true)
        }
    }
}
