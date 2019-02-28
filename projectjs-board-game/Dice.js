Dice = {};
Dice.toss = tossDice();

Dice.min=1;
Dice.max=6;

function tossDice() {
    return random.getRandomNumber(Dice.min,Dice.max);
}


