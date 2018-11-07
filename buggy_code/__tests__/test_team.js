//Importar ficheros
const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
const Teams = require('../app/data/team').Team;
let jsonObjects = readJSONData('./data/sample.json');
let arrayPlayers = extractDataFromRawJSON(jsonObjects);

let team1 = new Teams('team1');

let cristiano = arrayPlayers[0];
let messi = arrayPlayers[1];
let neymar = arrayPlayers[2];
team1.addPlayer(cristiano);
team1.addPlayer(messi);

let players = [{
    "_isBack": false,
    "_isForward": true,
    "_isGoalKeeper": false,
    "_isMidfielder": true,
    "age": 32,
    "club": "Real Madrid CF",
    "country": "Portugal",
    "id": 20801,
    "name": "Cristiano Ronaldo",
    "overall": 94,
    "value": 95500000
}, {
    "_isBack": false,
    "_isForward": false,
    "_isGoalKeeper": false,
    "_isMidfielder": true,
    "age": 30,
    "club": "FC Barcelona",
    "country": "Argentina",
    "id": 158023,
    "name": "L. Messi",
    "overall": 93,
    "value": 105000000
}]

//Tests
test('TEAM TEST NAME',()=>{

    expect(team1.getTeamName()).toBe('team1');

});
test('TEAM TEST VALUE',()=>{

    expect(team1.getTeamValue()).toBe(200500000);

});

test('TEAM TEST PLAYERS',()=>{

    expect(team1.getPlayers()).toEqual(players);

});

test('TEAM TEST HAS_PLAYER',()=>{

    expect(team1.hasPlayer(neymar)).toBe(false);
    expect(team1.hasPlayer(cristiano)).toBe(true);

});
test('TEAM TEST NUMBER OF PLAYERS',()=>{

    expect(team1.getNumberPlayers()).toBe(2);

});

test('TEAM TEST GET TEAM-QUALITY ',()=>{

    expect(team1.getTeamOverallQuality()).toBe(93.5);

});

