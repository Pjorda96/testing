//Importar ficheros
const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
let jsonObjects = readJSONData('./data/sample.json');
let arrayPlayers = extractDataFromRawJSON(jsonObjects);

const cristiano=arrayPlayers[0];
const messi=arrayPlayers[1];
const neymar=arrayPlayers[2];
const Keylor=arrayPlayers[3];
//Tests
test('TEAM TEST "PLAYER" FORWARD',()=>{

    expect(cristiano.isForward()).toBe(true);
    expect(messi.isForward()).toBe(false);


});

test('TEAM TEST "PLAYER" GOALKEEPER',()=>{
    expect(Keylor.isGoalKeeper()).toBe(true);
    expect(cristiano.isGoalKeeper()).toBe(false);

});

test('TEAM TEST "PLAYER" BACK',()=>{

    expect(cristiano.isBack()).toBe(false);

});

test('TEAM TEST "PLAYER" MIDFIELDER',()=>{

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

    expect(cristiano.equals(arrayPlayers[0])).toBe(true);

});
