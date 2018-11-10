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
test('TEAM TEST CONSTRUCTOR', () => {

	let team2 = new Teams('test');
	expect(team2.teamName).toBe('test');
	expect(team2.listPlayers).toEqual([]);
	expect(team2.teamValue).toBe(0);

});

test('TEAM TEST NAME', () => {

	expect(team1.getTeamName()).toBe('team1');

});
test('TEAM TEST VALUE', () => {

	expect(team1.getTeamValue()).toBe(200500000);

});

test('TEAM TEST PLAYERS', () => {

	expect(team1.getPlayers()).toEqual(players);

});

test('TEAM TEST HAS_PLAYER', () => {

	expect(team1.hasPlayer(neymar)).toBe(false);
	expect(team1.hasPlayer(cristiano)).toBe(true);

});

test('TEAM TEST NUMBER OF PLAYERS', () => {

	expect(team1.getNumberPlayers()).toBe(2);

});

/**
 * Adds a new player to the team
 * @param {Player} player The player to be added
 * @returns {Boolean} true in case that the player was successfully 
 * added to the team, false otherwise
 *
addPlayer(player) {
    if (!this.hasPlayer(player)) {
        this.listPlayers.push(player);
        this.teamValue += player.getValue();
        return true;
    }
    return false;
}*/

test('TEAM TEST ADD PLAYER', () => {

	expect(team1.addPlayer(neymar)).toBe(true);
	expect(f => addPlayer('./data/team.js')).toThrowError(Error);

});

/*test('TEAM TEST ADD PLAYERS', () => {

    //expect(team1.getTeamOverallQuality()).toBe(93.5);

});*/

test('TEAM TEST GET TEAM-QUALITY', () => {

	expect(team1.getTeamOverallQuality()).toBe(93.5);

});