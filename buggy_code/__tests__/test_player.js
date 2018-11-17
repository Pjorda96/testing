//Importar ficheros
const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
const Player = require('../app/data/player').Player;
let jsonObjects = readJSONData('./data/sample1.json');
let arrayPlayers = extractDataFromRawJSON(jsonObjects);

const cristiano=arrayPlayers[0];
const messi=arrayPlayers[1];
const neymar=arrayPlayers[2];
const keylor=arrayPlayers[3];
const ramos=arrayPlayers[4];
const modric=arrayPlayers[5];

//Tests
test('TEAM TEST "PLAYER" CONSTRUCTOR', () => {

    let player = new Player(8);
    expect(player.id).toBe(8);

});

test('TEAM TEST "PLAYER" FORWARD',()=>{

    expect(cristiano.isForward()).toBe(true);
    expect(messi.isForward()).toBe(false);


});

test('TEAM TEST "PLAYER" GOALKEEPER',()=>{
    expect(keylor.isGoalKeeper()).toBe(true);
    expect(cristiano.isGoalKeeper()).toBe(false);

});

test('TEAM TEST "PLAYER" BACK',()=>{
    expect(ramos.isBack()).toBe(true);
    expect(cristiano.isBack()).toBe(false);

});

test('TEAM TEST "PLAYER" MIDFIELDER',()=>{
    expect(messi.isBack()).toBe(false);
    expect(cristiano.isMidfielder()).toBe(true);

});

test('TEAM TEST "PLAYER" VALUE',()=>{

    expect(cristiano.getValue()).toBe(95500000);

});

test('TEAM TEST "PLAYER" NATIONALITY',()=>{

    expect(cristiano.getNationality()).toBe('Portugal');

});

test('TEAM TEST "PLAYER" TEAM',()=>{

    expect(cristiano.getTeam()).toBe('Real Madrid CF');

});

test('TEAM TEST "PLAYER" AGE',()=>{

    expect(cristiano.getAge()).toBe(32);

});

test('TEAM TEST "PLAYER" NAME',()=>{

    expect(cristiano.getName()).toBe('Cristiano Ronaldo');

});

test('TEAM TEST "PLAYER" ID',()=>{

    expect(cristiano.getID()).toBe(20801);

});

test('TEAM TEST "PLAYER" QUALITY',()=>{

    expect(cristiano.getQuality()).toBe(94);

});

test('TEAM TEST "PLAYER" EQUALS',()=>{

    expect(cristiano.equals(cristiano)).toBe(true);
    expect(cristiano.equals(messi)).toBe(false);

});

test('Test readJSONData 1: Valid JSON', () => {
    let jsonObj = readJSONData('./data/sample.json');
    let jsonObj1 = readJSONData('./data/sample1.json');
    //Check that exacly 3 objects were read
    expect(jsonObj.length).toBe(3);
    expect(jsonObj[0].Name).toBe('Cristiano Ronaldo');
    expect(jsonObj[0].Age).toBe(32);
    expect(jsonObj[0].Overall).toBe(94);
    expect(jsonObj[0].Nationality).toBe('Portugal');
    expect(jsonObj[0].Value).toBe('€95.5M');
    expect(jsonObj[0].Club).toBe('Real Madrid CF');
    expect(jsonObj[0]['Preferred Positions']).toBe('ST LW');

    expect(jsonObj[1].Name).toBe('L. Messi');
    expect(jsonObj[1].Age).toBe(30);
    expect(jsonObj[1].Overall).toBe(93);
    expect(jsonObj[1].Nationality).toBe('Argentina');
    expect(jsonObj[1].Value).toBe('€105M');
    expect(jsonObj[1].Club).toBe('FC Barcelona');
    expect(jsonObj[1]['Preferred Positions']).toBe('RW');

    expect(jsonObj[2].Name).toBe('Neymar');
    expect(jsonObj[2].Age).toBe(25);
    expect(jsonObj[2].Overall).toBe(92);
    expect(jsonObj[2].Nationality).toBe('Brazil');
    expect(jsonObj[2].Value).toBe('€123M');
    expect(jsonObj[2].Club).toBe('Paris Saint-Germain');
    expect(jsonObj[2]['Preferred Positions']).toBe('LW');
    expect(jsonObj1[4].Value).toBe('€80K');
});

test('Test readJSONData 2: Error JSON', () => {
    expect(f => readJSONData('./data/sample_error.json')).toThrowError(SyntaxError)
});

test('Test readJSONData 3: No file found', () => {
    expect(f => readJSONData('./data/idontexist.json')).toThrowError(Error);
});

test('Test extractDataFromRawJSON', () => {
    let jsonObjects = readJSONData('./data/sample.json');
    let jsonObjects1 = readJSONData('./data/sample1.json');
    let arrayPlayers = extractDataFromRawJSON(jsonObjects);
    expect(arrayPlayers.length).toBe(3);
    expect(arrayPlayers[0].getName()).toBe('Cristiano Ronaldo');
    expect(arrayPlayers[0].getAge()).toBe(32);
    expect(arrayPlayers[0].getQuality()).toBe(94);
    expect(arrayPlayers[0].getNationality()).toBe('Portugal');
    expect(arrayPlayers[0].getValue()).toBe(95500000);
    expect(arrayPlayers[0].getTeam()).toBe('Real Madrid CF');
    expect(arrayPlayers[0].isForward()).toBe(true);
    expect(arrayPlayers[0].isMidfielder()).toBe(true);
    expect(arrayPlayers[0].isBack()).toBe(false);
});
