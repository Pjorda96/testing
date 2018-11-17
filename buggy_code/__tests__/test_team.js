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

let insufficient_players = [suarez,ramos];
let delanteros_medios=[cristiano,bale,suarez,modric,casemiro,kross,cristiano,bale,suarez,modric,casemiro,kross];
let defensa_medios=[ramos,varane,carvajal,modric,kross,casemiro,ramos,varane,carvajal,modric,kross,casemiro];
let defensa_delanteros=[ramos,varane,carvajal,cristiano,bale,suarez,ramos,varane,carvajal,cristiano,bale,suarez];

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

/**
 * Static method that gets a tactic and parses it to extract the number of defenders, 
 * midfielders, and attackers
 * @param {String} tactic A tactic in string format numberBackers-numberMifielders-
 * numberForwarders
 * @returns {Array<Number>} An array of numbers with 3 positions: numberBackers, 
 * numberMidfielders, numberForwarders
 * @throws {Error} In case that the tactic is not specified in the format numberBackers-
 * numberMidfielders-numberForwarders
 * @throws {Error} In case that the specified tactic employs more than 10 (+1) players
 *
static _parseTactic(tactic) {
	//Split the string using the - character
	let playersPerPosition = tactic.split('-');
	//If more or less than 3 positions, the tactic is in incorrect format
	if (playersPerPosition.length !== 3) {
		throw Error('Tactics may only take 3 positions and got ' + playersPerPosition + ' with ' +
			playersPerPosition.length + ' elements');
	}
	//Parse tactic elements to numbers
	playersPerPosition = playersPerPosition.map(elem => parseInt(elem));
	//If any of the elements is not an integer, then raise error
	if (playersPerPosition.some(n => isNaN(n))) {
		throw Error('One of the specified positions is not a number');
	}

	return playersPerPosition;
}*/


test('TEAM TEST CREATE RANDOM TEAM', () => {

    expect(Team.createRandomTeam(jsonObjectsFifa,'3-4-3','randomTeam1',1000000000).getTeamValue()).toBeLessThan(1000000000);
    expect(Team.createRandomTeam(insufficient_players,'3-4-3','randomTeam2',1000000000)).toThrowError(Error);
    expect(Team.createRandomTeam(delanteros_medios,'3-4-3','randomTeam3',1000000000)).toThrowError(Error);
    expect(Team.createRandomTeam(defensa_delanteros,'3-4-3','randomTeam4',1000000000)).toThrowError(Error);
    expect(Team.createRandomTeam(defensa_medios,'3-4-3','randomTeam5',1000000000)).toThrowError(Error);


});


