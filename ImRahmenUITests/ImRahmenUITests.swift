//
//  ImRahmenUITests.swift
//  ImRahmenUITests
//
//  Created by Antonia verdier on 06/05/2017.
//  Copyright © 2017 Ar-App. All rights reserved.
//

import XCTest

class ImRahmenUITests: XCTestCase {
    
    let app = XCUIApplication()
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app.launchArguments.append("--uitesting")
    }
    
    override func tearDown() {
        super.tearDown()
    }
    
    func testIfStartScreenIsFirstScreen() {
        app.launch()
        XCTAssertTrue(app.isDisplayingStartScreen)
    }
    
    func testIfAlertDialogWillBeShownAfterButtonTab() {
        app.launch()
        let alert = app.alerts["Nicht in der Staatsgalerie?"]
        XCTAssertFalse(alert.exists)
        app.buttons["Nicht in der Staatsgalerie?"].tap()
        XCTAssertTrue(alert.exists)
    }
    
    func testIfAlertDialogHasCancelButton() {
        app.launch()
        let alert = app.alerts["Nicht in der Staatsgalerie?"]
        app.buttons["Nicht in der Staatsgalerie?"].tap()
        XCTAssertTrue(alert.buttons["Abbrechen"].exists)
        XCTAssertTrue(alert.buttons["Abbrechen"].isHittable)
    }
    
    func testIfAlertDialogHasShowOnMapButton() {
        app.launch()
        let alert = app.alerts["Nicht in der Staatsgalerie?"]
        app.buttons["Nicht in der Staatsgalerie?"].tap()
        XCTAssertTrue(alert.buttons["Auf Karte anzeigen"].exists)
        XCTAssertTrue(alert.buttons["Auf Karte anzeigen"].isHittable)
    }
    
    func testIfAlertDialogCancelButtonClosesDialog() {
        app.launch()
        let alert = app.alerts["Nicht in der Staatsgalerie?"]
        app.buttons["Nicht in der Staatsgalerie?"].tap()
        XCTAssertTrue(alert.exists)
        alert.buttons["Abbrechen"].tap()
        XCTAssertFalse(alert.exists)
    }
    
    func testIfStartButtonTabWillDisplayDifferentScreen() {
        app.launch()
        XCTAssertTrue(app.isDisplayingStartScreen)
        app.buttons["START"].tap()
        XCTAssertFalse(app.isDisplayingStartScreen)
    }
    
    func testIfSecondViewIsDisplayesAfterButtonTap() {
        app.launch()
        XCTAssertFalse(app.isDisplayingLookingForGamesScreen)
        app.buttons["START"].tap()
        XCTAssertTrue(app.isDisplayingLookingForGamesScreen)
    }
    
    func testIfTitleOfSecondScreenIsCorrect() {
        app.launch()
        app.buttons["START"].tap()
        XCTAssert(app.staticTexts["Spielefinder"].exists)
    }
    
    func testIfAlertDialogWillBeShownAfterHighscoreButtonTab() {
        app.launch()
        app.buttons["START"].tap()
        let alert = app.alerts[""]
        XCTAssertFalse(alert.exists)
        app.buttons["0 Punkte"].tap()
        XCTAssertTrue(alert.exists)
    }
    
    func testIfAlertOnSecondScreenHasOkayButton() {
        app.launch()
        app.buttons["START"].tap()
        let alert = app.alerts[""]
        app.buttons["0 Punkte"].tap()
        XCTAssertTrue(alert.buttons["Okay"].exists)
        XCTAssertTrue(alert.buttons["Okay"].isHittable)
    }
    
    func testIfAlertOnSecondScreenOkayButtonClosesDialog() {
        app.launch()
        app.buttons["START"].tap()
        let alert = app.alerts[""]
        app.buttons["0 Punkte"].tap()
        XCTAssertTrue(alert.exists)
        alert.buttons["Okay"].tap()
        XCTAssertFalse(alert.exists)
    }
}

extension XCUIApplication {
    var isDisplayingStartScreen: Bool {
        return otherElements["startView"].exists
    }
    var isDisplayingLookingForGamesScreen: Bool {
        return otherElements["lookingForGamesView"].exists
    }
}
