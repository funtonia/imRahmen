//
//  Singletons.swift
//  Ar-App
//
//  Created by Antonia verdier on 02/05/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import CoreLocation

protocol BeaconsControllerDelegate {
    func didFindBeacon(foundBeacon: [CLBeacon])
    func noBeaconAvailable()
}

class BeaconsController: NSObject, CLLocationManagerDelegate {
    // UUID : B9407F30-F5F8-466E-AFF9-25556B57FE6D
    // gruen:   28024
    // blau :   32002
    // lila :   46269
    
    let locationManager = CLLocationManager()
    let region = CLBeaconRegion(proximityUUID: NSUUID(uuidString: "B9407F30-F5F8-466E-AFF9-25556B57FE6D")! as UUID, identifier: "Estimotes")
    static let sharedInstance = BeaconsController()
    var beaconsControllerDelegate: BeaconsControllerDelegate?
    
    override init() {
        super.init()
        setupBeacons()
    }
    
    func setupBeacons() {
        locationManager.delegate = self
        if (CLLocationManager.authorizationStatus() != .authorizedWhenInUse) {
            locationManager.requestWhenInUseAuthorization()
        }
    }

    func startLookingForBeacons() {
        locationManager.startRangingBeacons(in: region)
    }
    
    func stopLookingForBeacons() {
        locationManager.stopRangingBeacons(in: region)
    }
    
    func locationManager(_ manager: CLLocationManager, didRangeBeacons beacons: [CLBeacon], in region: CLBeaconRegion) {
        let knownBeacons = beacons.filter{ $0.proximity != .unknown }
        if (knownBeacons.count > 0) {
            beaconsControllerDelegate?.didFindBeacon(foundBeacon: knownBeacons)
        } else {
            beaconsControllerDelegate?.noBeaconAvailable()
        }
    }
}
