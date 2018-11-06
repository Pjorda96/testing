const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
const isGoalKeeper = require('../app/data/dataset_utils.js').isGoalKeeper;
const isBack = require('../app/data/dataset_utils.js').isBack;
const isForward = require('../app/data/dataset_utils.js').isForward;
const isMidfielder = require('../app/data/dataset_utils.js').isMidfielder;

test('Test readJSONData 1: Valid JSON', () => {
    let jsonObj = readJSONData('./data/sample.json');
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
});

test('Test readJSONData 2: Error JSON', () => {
    expect(f => readJSONData('./data/sample_error.json')).toThrowError(SyntaxError)
});

test('Test readJSONData 3: No file found', () => {
    expect(f => readJSONData('./data/idontexist.json')).toThrowError(Error);
});

test('Test extractDataFromRawJSON', () => {
    let jsonObjects = readJSONData('./data/sample.json');
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

//Forward
test('Is Forward: all forward', () => {
    positions = new Set();
    positions.add('CF');
    expect(isForward(positions)).toBe(true);
    positions = new Set();
    positions.add('LF');
    expect(isForward(positions)).toBe(true);
    positions = new Set();
    positions.add('RF');
    expect(isForward(positions)).toBe(true);
    positions = new Set();
    positions.add('ST');
    expect(isForward(positions)).toBe(true);
    positions = new Set();
    positions.add('RS');
    expect(isForward(positions)).toBe(true);
    positions = new Set();
    positions.add('LS');
    expect(isForward(positions)).toBe(true);
});

test('Is Forward: one forward', () => {
    positions = new Set();
    positions.add('CF');
    positions.add('LCB');
    expect(isForward(positions)).toBe(true);
});

test('Is Forward: no forward', () => {
    positions = new Set();
    positions.add('EFT');
    positions.add('LCB');
    expect(isForward(positions)).toBe(false);
});

//Midfielder
test('Is Midfielder: all midfielder', () => {
    positions = new Set();
    positions.add('CAM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('CDM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('CM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('LAM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('LCM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('LDM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('LM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('LW');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('RAM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('RCM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('RDM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('RM');
    expect(isMidfielder(positions)).toBe(true);
    positions = new Set();
    positions.add('RW');
    expect(isMidfielder(positions)).toBe(true);

});

test('Is Midfielder: one midfielder', () => {
    positions = new Set();
    positions.add('CAM');
    positions.add('FGTB');
    expect(isMidfielder(positions)).toBe(true);
});

test('Is Midfielder: no midfielder', () => {
    positions = new Set();
    positions.add('CSDFAM');
    positions.add('CGJDM');
    expect(isMidfielder(positions)).toBe(false);
});

//Back
test('Is Back: all back', () => {
    positions = new Set();
    positions.add('CB');
    expect(isBack(positions)).toBe(true);
    positions = new Set();
    positions.add('LB');
    expect(isBack(positions)).toBe(true);
    positions = new Set();
    positions.add('LCB');
    expect(isBack(positions)).toBe(true);
    positions = new Set();
    positions.add('LWB');
    expect(isBack(positions)).toBe(true);
    positions = new Set();
    positions.add('RB');
    expect(isBack(positions)).toBe(true);
    positions = new Set();
    positions.add('RCB');
    expect(isBack(positions)).toBe(true);
    positions = new Set();
    positions.add('RWB');
    expect(isBack(positions)).toBe(true);

});

test('Is Back: one back', () => {
    positions = new Set();
    positions.add('RWB');
    positions.add('FGTB');
    expect(isBack(positions)).toBe(true);
});

test('Is Back: no back', () => {
    positions = new Set();
    positions.add('CSDFAM');
    positions.add('CGJDM');
    expect(isBack(positions)).toBe(false);
});

//Goalkeeper
test('Is Goalkeeper: goalkeeper', () => {
    positions = new Set();
    positions.add('GK');
    expect(isGoalKeeper(positions)).toBe(true);

});

test('Is Goalkeeper: no goalkeeper', () => {
    positions = new Set();
    positions.add('CSDFAM');
    expect(isGoalKeeper(positions)).toBe(false);
});