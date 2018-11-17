//Importar ficheros
const League = require('../app/data/league').League;
const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
let jsonObjects = readJSONData('./data/fifa_data.json');
let arrayPlayers = extractDataFromRawJSON(jsonObjects);

test('TEAM TEST CONSTRUCTOR', () => {
	let league = new League(1);
	expect(league.listTeams).toEqual([]);
	expect(league.numberOfTeams).toBe(1);
	expect(league.calendar).toBe(null);
	expect(league.leagueTable).toBe(null);

	//expect(f => new League('test')).toThrowError(Error);
});

test('TEAM TEST ADD TEAM', () => {
	let league = new League(1);
	league.addTeam('test');
	expect(league.listTeams.length).toBe(1);
	expect(league.listTeams[0]).toBe('test');

	expect(f => league.addTeam('test')).toThrowError(Error);
});

test('TEAM TEST CREATES CALENDAR', () => {
	let league = new League(1);
	league.createCalendar();
	expect(league.calendar).toEqual([]);
});

test('TEAM TEST CREATES RANDOM LEAGUE', () => {
	let league = League.createRandomLeague(arrayPlayers, 3, 1, 10000000000000000);

	expect(league.listTeams.length).toBe(3);
	for (let i = 0; i <= league.listTeams.length-1; i++) {
		expect(league.listTeams[i].teamValue).toBeLessThanOrEqual(10000000000000000);
		expect(league.listTeams[i].teamValue).toBeGreaterThanOrEqual(1);
	}

	expect(f => League.createRandomLeague(arrayPlayers, 10000, 1, 100000000)).toThrowError(Error);
	expect(f => League.createRandomLeague(arrayPlayers, 1, 100000000, 100000001)).toThrowError(Error);
	expect(f => League.createRandomLeague(arrayPlayers, 1, 0, 2)).toThrowError(Error);
});

test('TEST 50', () => {
	let nota = 10
	expect(nota).toBe(10);
});