var AllMus = [];
const { error } = require('console');
const fs = require('fs');
const { default: test } = require('node:test');

const readline = require('readline');
/*
const file = readline.createInterface({
    input: fs.createReadStream('/Users/qwer/Desktop/musicplayer/test.txt'),
    output: process.stdout,
    terminal: false
});


file.on('line', (line) => {
    for (let i = 0; i < 4; i++){}
    AllMus.push(line);
    console.log(AllMus);
});

*/
var AllMus2 = ["Pink Guy", "She's So Nice", "jpg", "mp3"];

fs.appendFileSync('test.txt', AllMus2[0]);



/*
AllMus2.forEach(element => {
});
*/

