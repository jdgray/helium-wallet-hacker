#!/usr/bin/env node

const { exec } = require("child_process");
const spawn = require('child_process').spawn;
const events = require('events');
const myEmitter = new events.EventEmitter();


// 133HHKLKeM2L4JSbZ6zmcjb2VPoGhQoj1ys5T7KxyxCwm4Sg1Ju
// throw puppy fatal depend flavor future traffic visa program nose knock anxiety
/*

create seed string from array of words

confirm seed is unique

create wallet with seed
- helium-wallet create basic --seed --force

parse for wallet address and check against master address

*/


console.log("Start script...");

const seeds = ['throw', 'puppy', 'fatal', 'depend', 'flavor', 'future', 'traffic', 'visa', 'program', 'nose', 'knock', 'anxiety'];
const testBucket = [];

/* Start Helper Functions */
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

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function getUniqueSeeds(array) {
    let unique = false;
    let newSeed = '';
    do {

        const shuffledArray = shuffle(array);
        newSeed = shuffledArray.join(' ');
        if (testBucket.indexOf(newSeed) === -1) {
            unique = true;
            testBucket.push(newSeed);
        }

    } while (!unique);

    return newSeed;
}

/* End Helper Functions */

console.log('Start Seed - ', seeds.join(' '));
const uniqueSeed = getUniqueSeeds(seeds);
console.log('Current Seed - ', uniqueSeed);

try {

    // exec('./helium-wallet create basic --seed --force', function(err, stdout, stderr) {
    //     if (stdout){console.log('stdout:'+stdout);}
    //     if (stderr){console.log('stderr:'+stderr);}
    //     if (err){throw err;}
    //     //...
    // });


    const ls = spawn('./helium-wallet', ['create', 'basic', '--seed']);
    ls.stdout.setEncoding('utf8');
    // const ls = spawn('ls', ['-lh', '/usr']);
    let current = '';
    let prompts = 0;

    myEmitter.emit('started');

    ls.stdout.on('data', function (data) {
        // current += data;
        // if (current === '[Seed Words:' && prompts === 0) {
        //     childProcess.stdin.write(uniqueSeed + '\n');
        //     prompts++;
        // }
    
        // if (prompts > 0) {
        //     ls.kill('SIGHUP');
        // }

        // ls.kill('SIGHUP');
        // console.log(`stdout: ${data}`);
        

        // console.log(`stdout: ${data}`);
        // current += data;
        // if (current[current.length-1] == '\n') {
        //     console.log('current', current);
        //     current = '';
        // }

        myEmitter.emit('test', data);

    });

    // ls.stderr.pipe(process.stderr);
    // ls.stdout.pipe(process.stdout);

    ls.stderr.on('data', (data) => {
        current += data;
        console.log(data.length);
        if (current[current.length-1] == '\n') {
            myEmitter.emit('stderr - data', data);
            ls.kill('SIGHUP');
        }

        if (data === 'Seed Words: \n') {
            myEmitter.emit('stderr - propmt', data);
            
        }
        // ls.kill('SIGHUP');
        
        // if (prompts > 5){
        //     ls.kill('SIGHUP');
        // }
        // prompts++;
        
    });


    ls.on('close', (code) => {
        console.log(`child process exited with code`);
    });


    myEmitter.on('test', (code, msg) => console.log(`code - ${code} : msg - ${msg}`));


} catch (error) {
    console.log('Error - ', error)
}


// exec('helium-wallet create basic --seed --force', function(error, stdout, stderr){
//     if (!error) {
//       // print the output
//       console.log('', stdout);
//     } else {
//       // handle error
//     }
//   });