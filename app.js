const topRight = document.querySelector('.top-right');
const bottomRight = document.querySelector('.bottom-right');
const topLeft = document.querySelector('.top-left');
const bottomLeft = document.querySelector('.bottom-left');

const panels = [topRight, bottomRight, topLeft, bottomLeft];

const getRandomPanel = () => {
    return panels[parseInt(Math.random() * panels.length)];
}

let canClick = false;
let count = 0;
const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const sounds = {
    btn: new Audio('click-button-166324.mp3'),
};

const flash = (panel) => {
    return new Promise((resolve) => {
        panel.classList.add('colo');
        setTimeout(() => {
            panel.classList.remove('colo');
            setTimeout(() => {
                resolve();
            }, 250);
        }, 1000);
    });
}

const playSound = () => {
    sounds.btn.play();
}

const resetGame = () => {
    alert("Wrong! Your total score is " + count + ". Starting a new game.");
    count = 0;
    sequence.length = 0;
    sequence.push(getRandomPanel());
    sequenceToGuess = [...sequence];
    setTimeout(() => {
        main();
    }, 500);
}

const panelClicked = (panelClicked) => {
    if (!canClick) return;

    const expectedPanel = sequenceToGuess.shift();

    if (expectedPanel === panelClicked) {
        count += 1;
        playSound();
        if (sequenceToGuess.length === 0) {
            sequence.push(getRandomPanel());
            sequenceToGuess = [...sequence];
            canClick = false;
            setTimeout(() => {
                main();
            }, 500);
        }
    } else {
        resetGame();
    }
}

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        panelClicked(panel);
    });
});

const main = async () => {
    canClick = false;
    for (const panel of sequence) {
        await flash(panel);
    }
    canClick = true;
}

main();
