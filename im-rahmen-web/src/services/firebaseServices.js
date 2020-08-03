import firebase from './../firebase.js';

/* This class holds all the functions which are linked to firebase. Some of them are used in more than one place and most of them
    are quite similar which is why we chose to bundle them in this file. */

export function getGamesEnum() {
    var GamesEnum = Object.freeze({
        "quiz": "Quiz", 
        "trueOrFalse": "Wahr oder falsch?", 
        "cutouts": "Ausschnittspiel",
        "counting": "Zählspiel",
        "estimation": "Schätzspiel",
        "difference": "Finde die Fehler"
    })

    return GamesEnum;
}

export function getGamesEnumKeyForValue(value) {
    var gamesEnum = getGamesEnum();

    for (var gametype in gamesEnum) {
        if (gamesEnum[gametype] === value) {
            return gametype;
        }
    }
}


/* GAMES ---------------------------------------------------------------------------------*/
export function getGames(context, id) {
    var GamesEnum = getGamesEnum()    

    const gamesRef = firebase.database().ref('games');

    const queryRef = gamesRef.orderByChild("artwork_id").equalTo(id);
    queryRef.on('value', (snapshot) => {
        let games = snapshot.val();

        let newState = [];
        for (let game in games) {
            newState.push({
                id: game,
                color: games[game].color,
                hint: games[game].hint,
                is_active: games[game].is_active,
                results: games[game].results,
                seconds: games[game].seconds,
                type: GamesEnum[games[game].type],
                value: games[game].value,
                title: games[game].title,
                answers: games[game].answers,
                additional_info_text: games[game].additional_info_text,
                artwork_id: games[game].artwork_id,
                selected: games[game].selected
            });
        }
        context.setState({
            games: newState
        });
    });
}

export function saveGame(type, seconds, color, title, results, value, answers, additional_info_text, artwork_id) {
    const gamesRef = firebase.database().ref('games');
    
    const game = {
        type: type,
        seconds: seconds,
        color: color,
        title: title,
        results: results,
        value: value,
        answers: answers,
        additional_info_text: additional_info_text,
        artwork_id: artwork_id,
        selected: false
    }
    
    gamesRef.push(game);

    return game;
}

export function setIsSelectedGame(id, isSelected) {
    const type = "games";
    var updates = {};
    updates['/selected'] = isSelected;
    const ref = firebase.database().ref(`/${type}/${id}`); 
    ref.update(updates);
}

/* ARTWORKS ---------------------------------------------------------------------------------*/

export function getArtworks(context) {
    const artworksRef = firebase.database().ref('artworks');
    
    artworksRef.on('value', (snapshot) => {
      let artworks = snapshot.val();
      let newState = [];
      
      for (let artwork in artworks) {
        newState.push({
            id: artwork,
          state: artworks[artwork].state,
          title: artworks[artwork].title,
          artist: artworks[artwork].artist,
          year: artworks[artwork].year,
          artwork_id: artworks[artwork].artwork_id,
          room: artworks[artwork].room,
          beacon: artworks[artwork].beacon,
          info: artworks[artwork].info, 
          image_base64_string: artworks[artwork].image_base64_string,
          selected: artworks[artwork].selected
        });
      }

      context.setState({
        artworks: newState,
        all_artworks: newState
      });
    });
}

export function saveArtwork(state, title, artist, year, artwork_id, room, beacon, info, image_base64_string) {
    const artworksRef = firebase.database().ref('artworks');
    
    var myRef = firebase.database().ref().push();

    const artwork = {
        state: state,
        title: title,
        artist: artist,
        year: year,
        artwork_id: artwork_id,
        room: room,
        beacon: beacon,
        info: info,
        image_base64_string: image_base64_string,
        selected: false
    }

    artworksRef.push(artwork);
    return artwork;
}

export function setIsSelectedArtwork(id, isSelected) {
    const type = "artworks";
    var updates = {};
    updates['/selected'] = isSelected;
    const ref = firebase.database().ref(`/${type}/${id}`); 
    ref.update(updates);
}

export function deleteArtwork(artworkId) {
    const artworkRef = firebase.database().ref(`/artworks/${artworkId}`);
    artworkRef.remove();
}

export function updateArtwork(state, title, artist, year, artwork_id, room, beacon, info, image_base64_string, id) {
    const type = "artworks";
    var updates = {};
    updates['/state'] = state;
    updates['/title'] = title;
    updates['/artist'] = artist;
    updates['/year'] = year;
    updates['/artwork_id'] = artwork_id;
    updates['/room'] = room;
    updates['/beacon'] = beacon;
    updates['/info'] = info;
    updates['/image_base64_string'] = image_base64_string;
    const ref = firebase.database().ref(`/${type}/${id}`); 
    ref.update(updates);

    const artwork = {
        state: state,
        title: title,
        artist: artist,
        year: year,
        artwork_id: artwork_id,
        room: room,
        beacon: beacon,
        info: info,
        image_base64_string: image_base64_string,
        selected: false
    }
    return artwork;
}

/* BEACONS ---------------------------------------------------------------------------------*/

export function getBeacons(context) {
    const beaconsRef = firebase.database().ref('beacons'); 
    
    beaconsRef.on('value', (snapshot) => { 
      let beacons = snapshot.val(); 
      let newState = []; 
      for (let beacon in beacons) { 
        newState.push({ 
          id: beacon, 
          name: beacons[beacon].name, 
          uuid: beacons[beacon].uuid, 
          major: beacons[beacon].major, 
          minor: beacons[beacon].minor, 
          color: beacons[beacon].color,
          selected: beacons[beacon].selected
        }); 
      } 
      
      context.setState({ 
        beacons: newState,
        all_beacons: newState
      }); 
    }); 
}

export function saveBeacon(name, uuid, major, minor, color) {
    const beaconsRef = firebase.database().ref('beacons');
    
    const beacon = {
      name: name,
      uuid: uuid,
      major: major,
      minor: minor,
      color: color,
      selected: false
    }
    
    beaconsRef.push(beacon);
    return beacon;
}

export function updateBeacon(name, uuid, major, minor, color, id) {
    const type = "beacons";
    var updates = {};
    updates['/name'] = name;
    updates['/uuid'] = uuid;
    updates['/major'] = major;
    updates['/minor'] = minor;
    updates['/color'] = color;
    const ref = firebase.database().ref(`/${type}/${id}`); 
    ref.update(updates);

    const beacon = {
      name: name,
      uuid: uuid,
      major: major,
      minor: minor,
      color: color
    }
    return beacon;
}

export function setIsSelectedBeacon(id, isSelected) {
    const type = "beacons";
    var updates = {};
    updates['/selected'] = isSelected;
    const ref = firebase.database().ref(`/${type}/${id}`); 
    ref.update(updates);
}

export function deleteBeacon(beaconId) { 
    const beaconRef = firebase.database().ref(`/beacons/${beaconId}`); 
    beaconRef.remove(); 
} 


/* VERSIONS ---------------------------------------------------------------------------------*/
export function getVersions(context) {
    const versionsRef = firebase.database().ref('versions');
    
    versionsRef.on('value', (snapshot) => { 
      let versions = snapshot.val(); 

      let newState = []; 
      for (let version in versions) { 
        newState.push({ 
            id: version,
            title: versions[version].title,
            createDate: versions[version].createDate,
            changeDate: versions[version].changeDate,
            isActive: versions[version].isActive,
            gameIDs: versions[version].gameIDs
        }); 
      } 
      
      context.setState({ 
        versions: newState,
        all_versions: newState
      }); 
    }); 
}

export function saveVersion(title, createDate, changeDate, isActive, gameIDs) {
    const versionsRef = firebase.database().ref('versions');
    
    const version = {
        title: title,
        createDate: createDate,
        changeDate: changeDate,
        isActive: isActive,
        gameIDs: gameIDs
    }
    
    versionsRef.push(version);
    return version;
}

export function getVersionElements(context, gameIDs) {
    const gamesRef = firebase.database().ref('games');

    var versionElementsTmp = []

    for (let gameID in gameIDs) {

        var gameType = '';
        var gameTitle = '';
        var artwork_id = '';
        var artwork_title = '';
        var artist = '';
        var beacon_name = '';
        var beacon_major = '';
        var image_base64_string = '';

        firebase.database().ref('/games/' + gameIDs[gameID]).once('value').then(function(snapshot) {

            gameType = (snapshot.val() && snapshot.val().type);
            gameTitle = (snapshot.val() && snapshot.val().title);
            artwork_id = (snapshot.val() && snapshot.val().artwork_id);

            firebase.database().ref('/artworks/' + artwork_id).once('value').then(function(snapshot) {

                artwork_title = (snapshot.val() && snapshot.val().title);
                artist = (snapshot.val() && snapshot.val().artist);
                beacon_name = (snapshot.val() && snapshot.val().beacon.name);
                beacon_major = (snapshot.val() && snapshot.val().beacon.major);
                image_base64_string = (snapshot.val() && snapshot.val().image_base64_string);
       
                versionElementsTmp.push({
                    gameType: gameType,
                    gameTitle: gameTitle,
                    artwork_id: artwork_id,
                    artwork_title: artwork_title,
                    artist: artist,
                    beacon_name: beacon_name,
                    beacon_major: beacon_major,
                    image_base64_string: image_base64_string
                });

                context.setState({ 
                    versionElements: versionElementsTmp
                });
            });
        });
    }
}

export function publishVersion(id) {
    console.log(id)
    const type = "versions";
    var updates = {};
    updates['/isActive'] = true;
    const ref = firebase.database().ref(`/${type}/${id}`); 
    ref.update(updates);
}