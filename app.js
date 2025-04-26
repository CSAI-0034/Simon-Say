const topRight=document.querySelector('.top-right');
const bottomRight=document.querySelector('.bottom-right');
const topLeft=document.querySelector('.top-left');
const bottomLeft=document.querySelector('.bottom-left');

const getRandomPanel = () =>{
    const panels=[
        topRight,
        bottomRight,
        topLeft,
        bottomLeft
    ]
    return panels[parseInt(Math.random() * panels.length)];
}

let canClick=false;
const sequence=[getRandomPanel()];
let sequenceToGuess=[...sequence]


const sounds = {
    btn: new Audio('click-button-166324.mp3'),
};

const flash = (panel)=> {
    console.log(panel);
    return new Promise((resolve,reject) => {
        panel.classList.add('colo')
        setTimeout(() =>{
            panel.classList.remove('colo');
            setTimeout(() => {
                resolve();
            },250)
        },1000) 
    })
}
 
const playSound = (panel) => {
    if (panel === topRight) {
        sounds.btn.play();
    } else if (panel === bottomRight) {
        sounds.btn.play();
    } else if (panel === topLeft) {
        sounds.btn.play();
    } else if (panel === bottomLeft) {
        sounds.btn.play();
    }
};

let count=0;
const PanelClicked=(panelClicked) => {
    // if(!canClick) return;
    const expectedPanel=sequenceToGuess.shift();
    if(expectedPanel===panelClicked){
        count +=1;
        playSound(panelClicked);
        if(sequenceToGuess.length===0){
            sequence.push(getRandomPanel());
            sequenceToGuess=[...sequence];
            setTimeout(()=>{
                main();
            },500)
        }
    }
    else{
        alert("Your total score is "+ count);
    }
}

// const resetGame =() => {
//     count=0;
//     canClick=false;    
//     sequence=[getRandomPanel()];
//     sequenceToGuess=[...sequence];
//     setTimeout(()=>{
//         main();
//     },500);
// }

const main= async() => {
    // canClick=false;
    for(const panel of sequence){
        await flash(panel)
    }
    // canClick=true;
}