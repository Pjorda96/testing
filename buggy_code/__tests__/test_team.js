//Importar ficheros
const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
const Team = require('../app/data/team').Team;
const Player = require('../app/data/player').Player;
let jsonObjects = readJSONData('./data/sample.json');
let jsonObjects1 = readJSONData('./data/sample1.json');
let jsonObjects2= readJSONData('./data/fifa_data.json');
let arrayPlayers = extractDataFromRawJSON(jsonObjects);
let arrayPlayers1 = extractDataFromRawJSON(jsonObjects1);
let jsonObjectsFifa = extractDataFromRawJSON(jsonObjects2);

let team1 = new Team('team1');



let cristiano = arrayPlayers[0];
let messi = arrayPlayers[1];
let neymar = arrayPlayers[2];
let keylor = arrayPlayers1[3];
let ramos = arrayPlayers1[4];
let bale = arrayPlayers1[8];
let suarez = arrayPlayers1[9];
team1.addPlayer(cristiano);
team1.addPlayer(messi);

let delanteros_medios=[];

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

	let team2 = new Team('test');
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

test('TEAM TEST ADD PLAYER', () => {

	expect(team1.addPlayer(neymar)).toBe(true);
	expect(f => addPlayer(neymar)).toThrowError(Error);

});

test('TEAM TEST ADD PLAYERS', () => {
	let test_team = new Team('team');
	let player = new Player(96);
	let player2 = new Player(25);

	test_team.addPlayers([
		player,
		player2
	]);

	expect(test_team.listPlayers[0].id).toBe(96);
	expect(test_team.listPlayers[1].id).toBe(25);

	expect(f => addPlayer([
		player,
		player2
	])).toThrowError(Error);

});

test('TEAM TEST GET TEAM-QUALITY', () => {

	expect(team1.getTeamOverallQuality()).toBe(93);

});

test('TEAM TEST GET RANDOM TEAM TACTICS', () => {
	let tactics = [
		'3-4-3',
		'3-5-2',
		'3-6-1',
		'4-3-3',
		'4-4-2',
		'4-5-1',
		'5-3-2'
	];
	let myMap = new Map();

	for (let i = 0; i <= 1000; i++) {
		let tactic = Team.getRandomTeamTactic();

		expect(tactics.includes(tactic)).toBe(true);

		if (!myMap.has(tactic)) {
			myMap.set(tactic, 1);
		} else {
			myMap.set(tactic, myMap.get(tactic) + 1);
		}
	}

	for (let tac of tactics) {
		let flag = undefined;
		if (myMap.has(tac) && myMap.get(tac) > 0) {
			flag = true;
		} else {
			flag = false;
		}

		expect(flag).toBe(true);
	}

});

test('TEAM TEST PARSE TACTICS', () => {
	expect(Team._parseTactic('4-3-3')).toEqual([4,3,3]);

	expect(() => Team._parseTactic('S-3-3')).toThrowError(Error);
	expect(() => Team._parseTactic('3-S-3')).toThrowError(Error);
	expect(() => Team._parseTactic('5-3-S')).toThrowError(Error);
	expect(() => Team._parseTactic('5-3')).toThrowError(Error);
	expect(() => Team._parseTactic('5-1-5')).toThrowError(Error);
	expect(() => Team._parseTactic('5-2-5')).toThrowError(Error);
});

test('TEAM TEST GET RANDOM PLAYERS', () => {
	expect(Team._getRandomPlayers(players,2)).toEqual(players);

	expect(() => Team._getRandomPlayers(players, 4)).toThrowError(Error);
});

/**
 * Gets a random number of players from a group of players
 * @param {Array<Player>} listPlayers The group of players to select from
 * @param {Number} numberPlayers The total number of players to select
 * @returns {Array<Player>} The group of players selected
 * @throws Error in case that there are not enough players to choose randomly
 *
static _getRandomPlayers(listPlayers, numberPlayers) {
	if (listPlayers.length < numberPlayers) {
		throw Error('Insufficient players to make a team');
	}
	let selectedPlayers = new Array(); //Array used to put chosen players
	let copyListPlayers = listPlayers.slice(); //Array that copies the original pool of players. Used to dynamically remove players

	for (let playersAdded = 0; playersAdded < numberPlayers; playersAdded++) { //For each random player to select
		let indexPlayer = Math.floor(Math.random() * copyListPlayers.length); //Index of the random player to be chosen
		let player = copyListPlayers[indexPlayer];
		selectedPlayers.push(player);
	}
	return selectedPlayers;
}*/


/* test('TEAM TEST CREATE RANDOM TEAM', () => {

    expect(Team.createRandomTeam(jsonObjectsFifa,'3-4-3','randomTeam1',1000000000).getTeamValue()).toBeLessThan(1000000000);
	expect(Team.createRandomTeam(arrayPlayers,'3-4-3','randomTeam2',1000000000)).toThrowError(Error);

}); */


