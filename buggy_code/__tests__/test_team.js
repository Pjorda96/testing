//Importar ficheros
const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
const Team = require('../app/data/team').Team;
const Player = require('../app/data/player').Player;
let jsonObjects = readJSONData('./data/sample.json');
let jsonObjects1 = readJSONData('./data/sample1.json');
let arrayPlayers = extractDataFromRawJSON(jsonObjects);
let arrayPlayers1 = extractDataFromRawJSON(jsonObjects1);

let team1 = new Team('team1');

let cristiano = arrayPlayers[0];
let messi = arrayPlayers[1];
let neymar = arrayPlayers[2];
let keylor = arrayPlayers1[3];
let ramos = arrayPlayers1[4];
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
	let players = [];
	let player = new Player(96);
	let player2 = new Player(25);
	players.push(player);
	players.push(player2);

	test_team.addPlayers([
		player,
		player2
	]);

	console.log(test_team);

	/* expect(team1.listPlayers[3].name).toBe('Keylor Navas');
	expect(team1.listPlayers[4].name).toBe('Ramos');
	
    expect(f => addPlayer([
		messi,
		keylor
	])).toThrowError(Error); */

});

/*test('TEAM TEST GET TEAM-QUALITY', () => {

	expect(team1.getTeamOverallQuality()).toBe(93.5);

});*/