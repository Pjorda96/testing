//Importar ficheros
const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
const Team = require('../app/data/team').Team;
const Player = require('../app/data/player').Player;
let jsonObjects = readJSONData('./data/sample.json');
let jsonObjects1 = readJSONData('./data/sample1.json');
let jsonObjects2 = readJSONData('./data/fifa_data.json');
let arrayPlayers = extractDataFromRawJSON(jsonObjects);
let arrayPlayers1 = extractDataFromRawJSON(jsonObjects1);
let jsonObjectsFifa = extractDataFromRawJSON(jsonObjects2);

let team1 = new Team('team1');



let cristiano = arrayPlayers[0]; //st
let messi = arrayPlayers[1];
let neymar = arrayPlayers[2];
let keylor = arrayPlayers1[3];
let ramos = arrayPlayers1[4]; //cb (defensa)
let varane = arrayPlayers1[10]; //cb (defensa)
let carvajal = arrayPlayers1[11]; //cb (defensa)
let modric = arrayPlayers1[5]; //cm (medio)
let casemiro = arrayPlayers1[6]; //cm (medio)
let kross = arrayPlayers1[7]; //cm (medio)
let bale = arrayPlayers1[8]; //st (delantero)
let suarez = arrayPlayers1[9]; //st (delantero)
team1.addPlayer(cristiano);
team1.addPlayer(messi);

let insufficient_players = [suarez, ramos];
let delanteros_medios = [cristiano, bale, suarez, modric, casemiro, kross, cristiano, bale, suarez, modric, casemiro, kross];
let defensa_medios = [ramos, varane, carvajal, modric, kross, casemiro, ramos, varane, carvajal, modric, kross, casemiro];
let defensa_delanteros = [ramos, varane, carvajal, cristiano, bale, suarez, ramos, varane, carvajal, cristiano, bale, suarez];

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
}];

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
	expect(team1.addPlayer(neymar)).toBe(false);

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
	expect(Team._parseTactic('4-3-3')).toEqual([4, 3, 3]);

	expect(() => Team._parseTactic('S-3-3')).toThrowError(Error);
	expect(() => Team._parseTactic('3-S-3')).toThrowError(Error);
	expect(() => Team._parseTactic('5-3-S')).toThrowError(Error);
	expect(() => Team._parseTactic('5-3')).toThrowError(Error);
	expect(() => Team._parseTactic('5-1-5')).toThrowError(Error);
	expect(() => Team._parseTactic('5-2-5')).toThrowError(Error);
});

test('TEAM TEST GET RANDOM PLAYERS', () => {
	let random = [{
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
	}];

	expect(Team._getRandomPlayers(random, 1)).toEqual(random);
	expect(Team._getRandomPlayers(arrayPlayers, 3).length).toBe(3);

	expect(() => Team._getRandomPlayers(players, 4)).toThrowError(Error);
});


test('TEAM TEST CREATE RANDOM TEAM', () => {
	expect(Team.createRandomTeam(jsonObjectsFifa, '3-4-3', 'randomTeam1', 1000000000).getTeamValue()).toBeLessThan(1000000000);

	expect(() => Team.createRandomTeam(jsonObjectsFifa, '1-6-3', 'randomTeam3', 1000000000)).toThrowError(Error);
	expect(() => Team.createRandomTeam(jsonObjectsFifa, '4-2-4', 'randomTeam4', 1000000000)).toThrowError(Error);
	expect(() => Team.createRandomTeam(jsonObjectsFifa, '5-5-0', 'randomTeam5', 1000000000)).toThrowError(Error);
	expect(() => Team.createRandomTeam(jsonObjectsFifa, '4-3-3', 'randomTeam6', 10)).toThrowError(Error);

});