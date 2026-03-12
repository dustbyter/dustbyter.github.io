console.log("I have no clue what any of these words mean anymore. This is pure muscle memory");

//javascript for page 2
if (document.getElementById("dialoguetext")) {
  const lines = ["Welcome, alchemist.", "But first, let me introduce myself.", "I am Anna, the grand alchemist, and I have been assigned to help you on your journey today."
             , "Before we can begin, introduce yourself.", "ASK_NAME", "Nice to meet you, {{name}}", "Now, we must go to your new tavern, {{name}}"
             , "Are you ready to begin your apprenticeship as an alchemist?"];
  let i = 0;
  let typing = false; 
  let interval;
  let playerName = "";

  const text = document.getElementById("dialoguetext");
  const next = document.getElementById("nextbutton");
  const playerStep =  document.getElementById("namestep");
  const nameInput = document.getElementById("name");
  const submitName = document.getElementById("submitname");
  const image = document.getElementById("portrait");
  const start = document.getElementById("start");
  const box = document.getElementById("dioboxpg2");
  
  function typingLine(line) {
          typing = true;
          text.textContent = "";
          let j = 0;

          interval = setInterval (() => {
                  text.textContent += line[j];
                  j++
                  if (j == line.length) {
                          clearInterval(interval);
                          typing = false;
                  }
          }, 35)
  }

  next.addEventListener("click", () => {
    if (typing) {
      clearInterval(interval);
      text.textContent = lines[i];
      typing = false;
      return;
    }

    i++;

    if (lines[i] == "ASK_NAME") {
      text.textContent = "What is your name?";
      next.style.display = "none";
      playerStep.style.display = "block";
      return;
    }

    if (i <lines.length) {
      const line = lines[i].replace("{{name}}", playerName);
      typingLine(line);
    }
    else {
      next.style.display = "none";
      text.style.display = "none";
      image.style.display = "none";
      box.style.display = "none";
      start.style.display = "block";
    
    }
  });
  
  submitName.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) return;
    playerName = name;
    playerStep.style.display = "none"; 
    next.style.display = "block"; 
    i++;
    const line = lines[i].replace("{{name}}", playerName);
    typingLine(line);
  });
  
  typingLine(lines[0]);
}
// javascript for page3 (actual questions)
if (document.getElementById("question")) {

  var potionName = ""; 
  var randMess1 = "";
  var randMess2 = "";
  
  let lives = 3;
  let questions = [];
  let currentQ = 0;
  
  const questionText = document.getElementById("question");
  const potions = { 
    aura_essence: "assets/potions/aura.png",
    balance_essence: "assets/potions/balance.png",
    dream_essence: "assets/potions/dream.png",
    fire_essence: "assets/potions/fire.png",
    fortune_essence: "assets/potions/fortune.png",
    moon_essence: "assets/potions/moon.png",
    ocean_essence: "assets/potions/ocean.png",
    royal_essence: "assets/potions/royal.png",
    sunlight_essence: "assets/potions/sunlight.png",
    truth_essence: "assets/potions/truth.png",
  }
  const potionNames = {
    aura_essence: "Sanus Ralym",
    balance_essence: "Aequilibrs", 
    dream_essence: "Lavender Lullaby",
    fire_essence: "Ferruous Incidate",
    fortune_essence: "Prophecy Ink",
    moon_essence: "Luna Dimidiata",
    ocean_essence: "Saiwaz Mar",
    royal_essence: "Roilate Heredis",
    sunlight_essence: "Sawelix Tincture",
    truth_essence: "Jaded Truth",
  }
  const messOpsGoodResult = ["Success! The potion bubbles and shimmers softly... you made the ", "Amazing work! The hues look amazing for the ", 
                             "Beautiful! Please teach me how to make the ", "Gorgeous masterpiece of a potion! You made the ", 
                             "Incredible! You're well on your way to becoming the next master of the ", "Splendid demonstration! You made the "];
  const messOpsBadResult = ["Oh no... the potion bursts in your face and your protective charms snap into action. One down...", 
                            "Yikes! That can't be good, your lab is now covered in bright glitter!", "Uh-oh... your protective charms seem to be working overtime"];
  const btn = document.getElementById("continue");
  const resultPop =  document.getElementById("resultpopup");
  const resultMessage = document.getElementById("resultmessage");
  const resultContinue = document.getElementById("resultcontinue");
  const endPop = document.getElementById("endpopup");
  const endMessage = document.getElementById("endmessage");
  const restart = document.getElementById("restart");

  function loseLives() {
    if (lives > 0) {
      lives--;
      const hearts = document.querySelectorAll("#lives .heart");
      hearts[lives].style.opacity = 0;
    }
  }
  
  function showQuestion() {
    const q = questions[currentQ]
    questionText.textContent = q.prompt;
    displayOption(q);
  }

  function givePotion(rewardName) {
    const popup = document.getElementById("reward");
    popup.innerHTML = "";
  
    const img = document.createElement("img");
    img.src = potions[rewardName];
    img.classList.add("rewardimg");
    popup.appendChild(img);
  
    setTimeout(() => {
      img.style.opacity = 0;
    }, 2000);
  
    setTimeout(() => {
      popup.innerHTML = "";
    }, 3000);
  }
    
  function displayOption(q) {
    const box = document.getElementById("answerbox");
    box.innerHTML = "";
  
    q.choices.forEach((choices, index) => {
      const button = document.createElement("button");
      button.classList.add("answeroption");
      button.textContent = choices;
      button.onclick = () => {
        if (index == q.answer) {
          givePotion(q.reward);
          setTimeout(() => {
            randMess1 = messOpsGoodResult[Math.floor(Math.random()*messOpsGoodResult.length)];
            potionName = potionNames[q.reward];
            result(randMess1 + potionName);
          }, 1000);
           counter.innerHTML + 1;
        }
        else {
          loseLives();
          if (lives == 0) {
            ending("You lost all of your protection charms. Better luck next time... restart?");
            return;
          }
          else {
            randMess2 = messOpsBadResult[Math.floor(Math.random()*messOpsBadResult.length)];
            result(randMess2);
          }
        }
        currentQ++;
        
        if (currentQ < questions.length) {
          showQuestion();
        }
        else {
          ending("Congratulations, alchemist! You've completed your apprenticeship, and perhaps, you're a better alchemist than me...");
        }
      };
      box.appendChild(button);
    });
  }

  function result(message) {
    resultMessage.textContent = message;
    resultPop.classList.remove("hidden");
  }

  function ending(message) {
    endMessage.textContent = message;
    endPop.classList.remove("hidden");
  }
  
  fetch("database.json")
  .then (res => res.json())
  .then (data => {
    questions = data;
    showQuestion();
  })

  if (btn) {
    btn.addEventListener("click", () => {
      document.getElementById("overlay").style.display = "none";
    });
  }

  resultContinue.addEventListener("click", () => {
    resultPop.classList.add("hidden");
    showQuestion();
  });

  restart.addEventListener("click", () => {
    window.location.reload();
  });
}
