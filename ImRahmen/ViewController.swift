//
//  ViewController.swift
//  Ar-App
//
//  Created by Antonia verdier on 02/05/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//
//import Foundation
import UIKit
import CoreLocation
import CoreBluetooth

class ViewController: UIViewController, BeaconsControllerDelegate, CBPeripheralManagerDelegate, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var highscoreButton: HighscoreButton!
    @IBOutlet weak var gifImageView: UIImageView!
    @IBOutlet weak var foundGamesTitle: UILabel!
    @IBOutlet weak var noGamesView: UIView!
    @IBOutlet weak var listOfGamesView: UIView!
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet var noBluetoothOverlay: UIView!
    
    var bluetoothManager: CBPeripheralManager?
    var timer : Timer!
    var selectedGame: Game!
    var gamesFiltered = [Game]()
    var recentlyPlayedGame : Game?
    var beacons = [CLBeacon]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //required for UITesting
        view.accessibilityIdentifier = "lookingForGamesView"
        
        checkCurrentGameStatus()
        
        bluetoothManager = CBPeripheralManager(delegate: self, queue: nil, options: nil)
        
        // configure noBluetoothOverlay
        let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(redirectToBluetoothSettings))
        noBluetoothOverlay.addGestureRecognizer(tapGestureRecognizer)
        
        BeaconsController.sharedInstance.beaconsControllerDelegate = self
        
        highscoreButton.setStyleNormal()
        let highscore = AppDelegate.currentHighscore
        if highscore > 1 || highscore == 0 {
            highscoreButton.setTitle(String(highscore)+" Punkte", for: .normal)
        } else {
            highscoreButton.setTitle(String(highscore)+" Punkt", for: .normal)
        }
        
        styleTableView()
        setSettingsIconInNavBar()
        gifImageView.loadGif(name: "anim_search")
        
        self.navigationItem.setHidesBackButton(true, animated:true);
    }
    
    override func viewWillAppear(_ animated: Bool) {
        // start searching beacons
        GlobalStyles.setNavbarColor(navigationBar: self.navigationController?.navigationBar, hex: ColorValues.cyan)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        // stop searching beacons
        BeaconsController.sharedInstance.stopLookingForBeacons()
        stopTimer()
    }
    
    func checkCurrentGameStatus() {
        if UserDefaults.standard.object(forKey: "currentScore") != nil {
            let number = UserDefaults.standard.object(forKey: "currentScore") as! Int
            AppDelegate.currentHighscore = number
        }
        
        for game in AppDelegate.allGames {
            if UserDefaults.standard.object(forKey: String(game.major)) != nil {
                let achievedPoints = UserDefaults.standard.object(forKey: String(game.major)) as! Int
                        game.alreadyPlayed = true
                        game.achievedPoints = achievedPoints
            }
        }
    }
    
    
    //Bluetooth Manager
    
    func redirectToBluetoothSettings() {
        guard let settingsUrl = URL(string:"App-Prefs:root=Bluetooth") else {
            return
        }
        
        if #available(iOS 10.0, *) {
            UIApplication.shared.open(settingsUrl, options: [:], completionHandler: nil)
        } else {
            // don't do anything
        }
    }
    
    func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
        switch peripheral.state {
        case .poweredOn:
            configureTableAndSearchGif(isBluetoothOn: true)
            break
        default:
            configureTableAndSearchGif(isBluetoothOn: false)
            break
            
        }
    }
    
    func configureTableAndSearchGif(isBluetoothOn: Bool) {
        noBluetoothOverlay.isHidden = isBluetoothOn
        
        if isBluetoothOn {
            // start looking for beacons
            BeaconsController.sharedInstance.startLookingForBeacons()
            startScheduledTimerWithTimeInterval()
        } else {
            noGamesView.isHidden = false
            listOfGamesView.isHidden = true
            BeaconsController.sharedInstance.stopLookingForBeacons()
            stopTimer()
        }
    }

    
    //Highscore Button
    @IBAction func showHighscore(_ sender: Any) {
        highscoreButton.setStylePressed()
        let alert = UIAlertController(title: "", message: "Dieser Bereich ist in dieser Version leider noch nicht vorhanden.", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Okay", style: UIAlertActionStyle.default, handler: nil))
        self.present(alert, animated: true, completion: nil)
        highscoreButton.setStyleNormal()

    }
    
    //Segue
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let destinationVC = segue.destination as? ExplanationViewController {
            destinationVC.game = selectedGame
        }
    }
    
    
    //Beacon
    func didFindBeacon(foundBeacon: [CLBeacon]) {
        beacons = foundBeacon
    }
    
    func noBeaconAvailable() {
        beacons = [CLBeacon]()
    }
    
    func updateGameStatus(playedGame:Game, points: Int){
        for game in AppDelegate.allGames{
            if(playedGame.major == game.major ){
                game.alreadyPlayed = true
                game.achievedPoints = points
                let key = String(game.major)
                UserDefaults.standard.set(points, forKey: key)
            }
        }
    }
    
    func updatePoints(achievedPoints: Int){
        AppDelegate.currentHighscore += achievedPoints
        UserDefaults.standard.set(AppDelegate.currentHighscore, forKey: "currentScore")
    }
    
    
    //Game-Table
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return gamesFiltered.count
    }
    
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "foundBeaconCell") as! FoundBeaconTableCell
        //sets the seperator-lines between the cells to full width
        cell.preservesSuperviewLayoutMargins = false
        cell.separatorInset = UIEdgeInsets.zero
        cell.layoutMargins = UIEdgeInsets.zero
        //configures the cell so it displays the right game
        cell.configureCell(game: gamesFiltered[indexPath.row])
        return cell
    }
    
    public func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if(!gamesFiltered[indexPath.row].alreadyPlayed){
            selectedGame = gamesFiltered[indexPath.row]
            performSegue(withIdentifier: SegueIds.showExplanation, sender: self)
        }
    }
    
    
    //Timer
    
    func startScheduledTimerWithTimeInterval(){
        timer = Timer.scheduledTimer(timeInterval: 3, target: self, selector: #selector(self.refreshBeaconTableView), userInfo: nil, repeats: true)
    }
    
    func stopTimer() {
        if timer != nil {
            timer.invalidate()
            timer = nil
        }
    }
    
    func refreshBeaconTableView(){
        if(beacons.count > 0) {
            filterGames()
            if(gamesFiltered.count > 0){
                foundGamesTitle.text = "VERFÜGBARE SPIELE"
                listOfGamesView.isHidden = false
                noGamesView.isHidden = true
                self.tableView.reloadData()
            } else {
                }
        } else {
            foundGamesTitle.text = "KEINE SPIELE IN DER NÄHE"
            listOfGamesView.isHidden = true
            noGamesView.isHidden = false
        }
    }
    
    
    //Helper
    
    func filterGames(){
        gamesFiltered.removeAll()
        for b in beacons {
            let g = getGameForBeacon(beacon: b)
            if (g != nil) {
                gamesFiltered.append(g!)
            }
        }
    }
    
    func getGameForBeacon(beacon: CLBeacon) -> Game?{
        for g in AppDelegate.allGames {
            if(g.major == beacon.major as? Int){
                return g
            }
        }
        return nil
    }
    
    
    //Icon Nav-Bar
    
    func setSettingsIconInNavBar() {
        let settingsIcon = UIImage(named: "icon_settings.png")
        let settingsNavBarButton = UIBarButtonItem(image: settingsIcon, style: .plain, target: self, action: #selector(ViewController.showSettings(sender:)))
        self.navigationItem.rightBarButtonItem = settingsNavBarButton
    }
    
    func showSettings(sender: UIBarButtonItem) {
        let alert = UIAlertController(title: "", message: "Dieser Bereich ist in dieser Version leider noch nicht vorhanden.", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Okay", style: UIAlertActionStyle.default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
    
    
    //TableView Style
    
    func styleTableView() {
        tableView.tableFooterView = UIView(frame: .zero)
        let px = 1 / UIScreen.main.scale
        let frame = CGRect(x: 0, y: 0, width: self.tableView.frame.size.width, height: px)
        let line = UIView(frame: frame)
        self.tableView.tableHeaderView = line
        line.backgroundColor = self.tableView.separatorColor
    }
}
