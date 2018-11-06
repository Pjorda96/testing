//Importar ficheros
const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
let jsonObjects = readJSONData('./data/sample.json');
let arrayPlayers = extractDataFromRawJSON(jsonObjects);

//Tests
test('TEAM TEST "PLAYER" FORWARD',()=>{

    expect(arrayPlayers[0].isForward()).toBe(true);
    expect(arrayPlayers[1].isForward()).toBe(false);


});

test('TEAM TEST "PLAYER" GOALKEEPER',()=>{

    expect(arrayPlayers[0].isGoalKeeper()).toBe(false);

});

test('TEAM TEST "PLAYER" BACK',()=>{

    expect(arrayPlayers[0].isBack()).toBe(false);

});

test('TEAM TEST "PLAYER" MIDFIELDER',()=>{

    expect(arrayPlayers[0].isMidfielder()).toBe(true);

});

test('TEAM TEST "PLAYER" VALUE',()=>{

    expect(arrayPlayers[0].getValue()).toBe(95500000);

});

test('TEAM TEST "PLAYER" NATIONALITY',()=>{

    expect(arrayPlayers[0].getNationality()).toBe('Portugal');

});

test('TEAM TEST "PLAYER" TEAM',()=>{

    expect(arrayPlayers[0].getTeam()).toBe('Real Madrid CF');

});

test('TEAM TEST "PLAYER" AGE',()=>{

    expect(arrayPlayers[0].getAge()).toBe(32);

});

test('TEAM TEST "PLAYER" NAME',()=>{

    expect(arrayPlayers[0].getName()).toBe('Cristiano Ronaldo');

});

test('TEAM TEST "PLAYER" ID',()=>{

    expect(arrayPlayers[0].getID()).toBe(20801);

});

test('TEAM TEST "PLAYER" QUALITY',()=>{

    expect(arrayPlayers[0].getQuality()).toBe(94);

});

test('TEAM TEST "PLAYER" EQUALS',()=>{

    expect(arrayPlayers[0].equals(arrayPlayers[0])).toBe(true);

});
