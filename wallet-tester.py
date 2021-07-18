import os
import subprocess
import pexpect
import random
import datetime

# globals
maxRuns = 1
seedList = []
masterWallet = ''
seedWords = []

# start functions
def get_seed(array):
    testSeed = ''
    while True:
        testArray = random.sample( array, len(array) )
        separator = ' '
        testSeed = separator.join(testArray)
        # check if seed is in array
        if testSeed not in seedList:
            seedList.append(testSeed)
            break
    return testSeed

def get_seed_file(array):
    testSeed = ''
    while True:
        testArray = random.sample( array, len(array) )
        separator = ' '
        testSeed = separator.join(testArray)
        # check if seed is in array
        print(check_seed(testSeed))
        # testSeed = 'require gadget head comfort portion cloth economy thumb concert wine damp ice'
        if not check_seed(testSeed):
            f = open('seeds.txt', 'a')
            f.write(testSeed + '\n')
            f.close()
            break
        else:
            testSeed = ''
            break
    return testSeed

def check_seed(seed):
    with open('seeds.txt', 'r') as inF:
        for line in inF:
            if seed in line:
                return True
    return False

def check_address(output):
    search = output.find(masterWallet)
    if search != -1:
        return True
    return False
# end functions

print('start...')

# run through the random seeds and build a new wallet
startTime = datetime.datetime.now()
found = False
counter = 0
while True:
    if counter >= maxRuns:
        print('end')
        print(startTime)
        print(datetime.datetime.now())
        break
    
    # shuffle array and generate seed
    testSeed = get_seed_file(seedWords)
    print('new seed')
    print(testSeed)
    if testSeed:
        # build wallet
        child = pexpect.spawn('./helium-wallet create basic --seed --force')
        print(child.before) 
        child.expect('Seed Words:*')
        print(child.after) 
        child.sendline(testSeed)

        i = child.expect (['Password:*', 'error: invalid checksum'])
        print('Checking seed')
        print(i)
        if i==0:
            # child.expect('Password:*')
            print(child.after) 
            child.sendline('test')
            child.expect('Confirm password:*')
            child.sendline ('test')
            print(child.after) 
            child.expect('Address*')
            fullOutput = child.read()
            print(fullOutput)

            # check 
            doesMatch = check_address(fullOutput)

            if doesMatch:
                print('FOUND WINNER!!!!')
                print(testSeed)
                f = open("found.txt", "a")
                f.write(testSeed)
                f.close()
                print('END')
                break
        elif i==1:
            print('Invalid checksum')
            child.kill(0)

    counter = counter + 1