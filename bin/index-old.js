#!/usr/bin/env node

const { exec } = require("child_process");
const spawn = require('child_process').spawn;

console.log("Start script...");
function allPossibleCombinations(input, length, curstr) {
    if (curstr.length == length) return [curstr];
    var ret = [];
    for (var i = 0; i < input.length; i++) {
        ret.push.apply(ret, allPossibleCombinations(input, length, curstr + input[i]));
    }
    return ret;
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// seeds 
// puppy throw depend flavor fatal future traffic program nose visa knock anxiety


// var input = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p' ];
// console.log(allPossibleCombinations(input, 12, ''));

const addressLength = 51;
const allowedChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const testAdress = '14DYZe6aDQQmBERb9ewJ3a6wD6Y3LQKif7QcUNfD82gaAbcSnWe';
const maxAttempts = 10;
const testBucket = [];

let found = false;
let counter = 0;
do {
    const randomAddress = randomString(addressLength, allowedChars);
    if (testBucket.indexOf(randomAddress) === -1 && counter <= maxAttempts) {
        console.log('address - ', randomAddress);

        exec("ls -la", (error, stdout, stderr) => {
            //
            // test wallet here
            //
        });

    }
    if (counter === maxAttempts) {
        found = true;
    }
    counter++;
} while (!found);