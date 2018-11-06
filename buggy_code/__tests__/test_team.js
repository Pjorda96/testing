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
//team1.addPlayer(neymar);
//Tests
test('TEAM TEST NAME',()=>{

    expect(team1.getTeamName()).toBe('team1');

});
test('TEAM TEST VALUE',()=>{

    expect(team1.getTeamValue()).toBe(200500000);

});
/*
test('TEAM TEST PLAYERS',()=>{

    expect(team1.getPlayers()).toBe('h');

});*/
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

