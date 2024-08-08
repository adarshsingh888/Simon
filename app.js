let gameseq = [];
let userseq = [];
let color = ["green", "blue", "red", "yellow"];
let start = false;
let level = 0;
let high=0;
const lev = document.querySelector("#level");
let score=document.querySelector("#score");
let button=document.querySelector("button");
button.addEventListener("click", function(event) {
    if (!start) {
        alert("Game is Started");
        button.innerText="Restart";
        start = true;
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}

function levelup() {
    // Clear the game and user sequences for the new level
    gameseq.length = 0;
    userseq.length = 0;

    // Increase the level
    level++;
    lev.innerText = 'Level ' + level;

    // Start the sequence with a delay after the level is incremented
    setTimeout(function() {
        for (let i = 0; i < level; i++) {
            setTimeout(function() {
                let ranIdx = Math.floor(Math.random() * 4);
                gameseq.push(color[ranIdx]);
                let ranbtn = document.querySelector('.' + color[ranIdx]);
                btnflash(ranbtn);

                // Log the game sequence after the last button is flashed
                if (i === level - 1) {
                    console.log("Game Sequence:");
                    console.log(gameseq);
                }
            }, 1500 * i);
        }

        setTimeout(function() {
            // Enable user input only after the sequence has been displayed
            enableUserInput();
        }, 1500 * level); // Adjusted to match the timing of sequence flashing

    }, 2000); // Delay before starting the next level, you can adjust this value
}


function gameflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 500);
}

function enableUserInput() {
    userseq = [];
    let allbtn = document.querySelectorAll(".box");
    for (let btn of allbtn) {
        btn.addEventListener("click", btnpress);
    }
}

function btnpress(event) {
    if (userseq.length < gameseq.length) {
        gameflash(this);

        let colo = this.getAttribute("id");
        userseq.push(colo);
        console.log("User Sequence:", userseq);

        check(userseq.length - 1);
    }
}

function check(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            // Disable user input to prevent premature clicking before the next level
            disableUserInput();
            setTimeout(levelup, 1000);
        }
    } else {
        lev.innerText = 'Game Over! Press Key to Start Again.';
        if(high<level){
            high=level;
            score.innerText="High Score: "+high;
        }
        reset();
    }
}

function disableUserInput() {
    let allbtn = document.querySelectorAll(".box");
    for (let btn of allbtn) {
        btn.removeEventListener("click", btnpress);
    }
}

function reset() {
    start = false;
    gameseq.length = 0;
    userseq.length = 0;
    level = 0;
    score = 0;
}
