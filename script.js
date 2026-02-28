console.log("I have no clue what any of these words mean anymore. This is pure muscle memory");


const lines = ["Welcome, alchemist.", "But first, let me introduce myself.", "I am Anna, the grand alchemist, and I have been assigned to help you on your journey today."
             , "Before we can begin, introduce yourself.", "What is your name?", "ASK_NAME", "Nice to meet you, {{name}}", "Now, we must go to your new tavern, {{name}}"
             , "Are you ready to begin your apprenticeship as an alchemist?"];
let i = 0;
let typing = false; 
let interval;
let playerName = "";

const text = document.getElementByID("dialoguetext");
const next = document.getElementByID("nextbutton");
const playerStep =  document.getElementByID("namestep");
const nameInput = document.getElementByID("name");
const submitName = document.getElementByID("submitname");

function typingLine(line) {
        typing = true;
        text.textContent = "";
        let j = 0;

        interval = setInterval (() => {
                text.textContent += line[c];
                c++
                if (c == line.length) {
                        clearInterval(interval);
                        typing = false;
                }
        }, 35)
}
        
