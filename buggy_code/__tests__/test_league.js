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
	let league = League.createRandomLeague(arrayPlayers,3,1,10000000000000000);


	//expect(league.listTeams.length).toBe(1);
	//expect(league.listTeams[0]).toBe('test');

	expect(f => League.createRandomLeague(arrayPlayers, 100, 1, 100000000)).toThrowError(Error);
});

/**
 * Creates a League object based on a pool of players, a number of teams to compete, 
 * and a minimum and maximum team value
 * @param {Array<Player>} playerData An array of player profiles that will be selected to 
 * generate the teams
 * @param {Number} numberOfTeams An integer that delimits the number of teams that will 
 * compete in the league
 * @param {Number} minTeamValue The minimum amount of euros that will be spent by clubs 
 * on forming the team
 * @param {Number} maxTeamValue The maximum amount of euros that will be spent by clubs 
 * on forming the team
 * @returns {League} The league that has been created
 * @throws {Error} In case that there are not enough players to create the desired number 
 * of teams, or in case that the minimum team value is higher than the maximum team value 
 *
static createRandomLeague(playerData, numberOfTeams, minTeamValue, maxTeamValue) {

	if (playerData.length < numberOfTeams * 11) {
		throw Error('Not enough players to create the league');
	}

	let newLeague = new League(numberOfTeams);
	let playersInLeague = new Set();
	for (let i = 0; i < numberOfTeams; i++) { //For each team to be created
		//Filter players that are currently available
		let playersAvailable = playerData.filter(player => !playersInLeague.has(player));
		//Select random team budget between the minimum and maximum specified as parameter
		let teamValue = Math.random() * (maxTeamValue - minTeamValue) + minTeamValue;
		//Create the team randomly
		let team = Team.createRandomTeam(playersAvailable, Team.getRandomTeamTactic(), "Team" + i, teamValue);
		//Add the team to the league
		newLeague.addTeam(team);
	}
	return newLeague;
}*/