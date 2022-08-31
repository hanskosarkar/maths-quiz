

let playing = false;
let score;
let action;
let timeremaining;
let ans;
document.getElementById("startreset").onclick = function(){
    if(playing == true){
        location.reload(); // reaload page if playing
    }
    else{
        //if we are playing game
        playing = true;

        score = 0;
        document.getElementById("scorevalue").innerHTML = score; //if not playing set score to 0

        show("timeremain");
        timeremaining = 60;
        document.getElementById("timeremainvalue").innerHTML = timeremaining;

        // hide game over box
        hide("gameover");
        document.getElementById("startreset").innerHTML = "Reset Game";

        //countdown for timer
        startcountdown();

        // generate Q&A
        generateQA();

    }
}


//clicking on ans box 

for(i = 1; i < 5; i++){
    document.getElementById("box"+i).onclick = function(){
        // if we are playing
        if(playing == true){
            //yes
            if(this.innerHTML == ans){
                // we got correct ans
                score++;
                document.getElementById("scorevalue").innerHTML = score;
    
                //hide the wrong box 
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
            }
            else{
                //wrong answer
    
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
    
            generateQA();
        }
    }
}

// start countdown
function startcountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainvalue").innerHTML = timeremaining;

        //after 0 reset and end game
        if(timeremaining == 0){ //game over
           stopcountdown();
        //    document.getElementById("gameover").style.display = "block";
        show("gameover");
           document.getElementById("gameover").innerHTML = "<p>Game over! </p><p>your score is " + score + "</p>";

        //    document.getElementById("timeremain").style.display = "none";
        hide("timeremain");
        hide("correct");
        hide("wrong");
        playing = false;
        document.getElementById("startreset").innerHTML = "Start Game"
        }
    },1000);
}

// stop counter
function stopcountdown(){
    clearInterval(action);
}


// hide elements 
function hide(id){
    document.getElementById(id).style.display = "none";
}


// show elements
function show(id){
    document.getElementById(id).style.display = "block";
}

// generate Q&A
function generateQA(){
    // let x = 9*Math.random();
    // x = 1 + Math.round(x);

    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    ans = x * y;

    document.getElementById("question").innerHTML = x + "X" + y;
    var correctpos = 1 + Math.round(3 * Math.random());

    document.getElementById("box"+correctpos).innerHTML = ans; //box with correct answer

    //now fill other boxes with wrong answers
    var answers = [ans];
    for(i = 1; i < 5; i++){
        if(i != correctpos){
            var wrongans = ans;
            do{
                wrongans = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
            } while(answers.indexOf(wrongans) > -1)

            document.getElementById("box"+i).innerHTML = wrongans;
            answers.push(wrongans);
        }
    }

}

