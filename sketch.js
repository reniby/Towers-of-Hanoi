//TODO: save button = download text file
//save strings to populate text file
//update instructions
//maybe add time monitering??


let one = [];
let two = [];
let three = [];
let poles = [one, two, three];
let smallest = [null, null, null, null, null, null, null, null, null, null, null, null]; //x, y, width, i (height=50)
let discs = [];
let colors = ['red', 'orange', 'yellow', 'limeGreen', 'blue', 'purple', 'hotpink', 'black'];

let moves = 0;

let nDiscs = 3;

let title = "Tower of Hanoi";
let titlex = 260; //x pos of text
let popup = false;
let fade = 255;
let fadeChange = 1;

let started = false;

let l = 100; //first pole is at x = 100
let ll = 350;
let lll = 600;
let larr = [l, ll, lll];

let x;
let w;
let h;

let check = 0; //checks if squares are black
let move = 0; //which pole to move to

let data = "";
let time = 0;
let tries = 1;

function setup() {
  createCanvas(800, 700);

  newGame(nDiscs);


}

function draw() {
  background(220);

  fill(0);
  textSize(40);
  textStyle(NORMAL);
  text(title, titlex, 70);
  text("1", 140, 570);
  text("2", 390, 570);
  text("3", 640, 570);
  
  textSize(30);
  text("Moves: " + moves + " (Ideal = " + (pow(2, nDiscs) - 1) + ")", 10, 690);
  textSize(20);
  text("Move the discs from pole 1 to pole 3", 225, 110);


  strokeWeight(2);
  fill('red');
  rect(645, 645, 150, 50);
  fill('white');
  textSize(30);
  text("Reset?", 670, 680);
  
  strokeWeight(2);
  fill('green');
  rect(485, 645, 150, 50);
  fill('white');
  textSize(30);
  text("Save", 525, 680);

  line(150, 500, 150, 150);
  line(400, 500, 400, 150);
  line(650, 500, 650, 150);

  //horizontal lines
  line(100, 500, 200, 500);
  line(350, 500, 450, 500);
  line(600, 500, 700, 500);

  updateDiscs();
  fill(255);
  for (let j = 0; j < 3; j++) { //which pole
    let currY = 445;
    for (let i = 0; i < nDiscs; i++) { //which disc
      if (poles[j][i] == 1) {
        fill(colors[discs[i].num%8]);
        rect(larr[j] - discs[i].x, currY, discs[i].w, discs[i].h, 5);
        smallest[j] = larr[j] - discs[i].x; //smallest x
        smallest[j+3] = currY; //smallest y
        smallest[j+6] = discs[i].w; //smallest width
        smallest[j+9] = i;
        currY -= 55;
      }
      else if (poles[j][i] == 2){
        fill(colors[discs[i].num]);
        rect(mouseX-80, mouseY-25, discs[i].w, discs[i].h, 5);
      }
    }
  }

  checkWin();

  if (popup) {
    strokeWeight(0);
    fill(220, fade);
    rect(40, 40, 720, 100);
    textSize(25);
    textStyle(BOLD);
    fill(255, 0, 0, fade);
    text("Reminder: You cannot place a disc on top of a smaller disc", 47, 100);
    fade += fadeChange;
    if (fade == 405)
      fadeChange = -5;
    if (fade == 0) {
      fade = 255;
      fadeChange = 1;
      popup = false;
    }
  }

  if (!started) {
    fill(220);
    strokeWeight(0);
    rect(0, 0, 800, 700);
    fill('black');
    text("Click ready when ready", 250, 250);
    text("Instructions", 325, 200);
    fill('green');
    rect(325, 315, 150, 50);
    fill('white');
    textSize(30);
    text("Ready", 355, 350);
  }

}

function newGame(numDiscs) {
  moves = 0;
  x = 25;
  w = 150;
  h = 50;
  
  for (let i = 0; i < numDiscs; i++) {
    one[i] = 1;
    two[i] = 0;
    three[i] = 0;
    newDisc = new disc(x, w, h, i);
    discs[i] = newDisc;
    x -= 5;
    w -= 10;
  }
  //solve(nDiscs, 1, 3, 2);
}

function updateDiscs() {
  let val = -1; //placeholder value
  let canMove = true;
  let error = false;
  if (move > 0) {
    for (let i = nDiscs - 1; i >= 0; i--) { //find smallest on check pole
      if (poles[check - 1][i] == 2) {
        val = i;
        i = 0;
      }
    }

    poles[check-1][val] = 1;
    for (let j = nDiscs - 1; j >= val; j--) { //move to move pole if none smaller (large->small)
      if (poles[move - 1][j] == 1 && j != val) {
        error = true;
        check = 0;
      }
    }

    if (error) {
      popup = true;
      error = false;
      move = 0;
    } else if (val == -1) {
      move = 0;
      check = 0;
    } else {
      poles[check - 1][val] = 0;
      poles[move - 1][val] = 1;
      if (move != check)
        moves++;
      move = 0;
      check = 0;
    } 
  } 
}

function mouseClicked() {
  if (!started) { //rect(325, 315, 150, 50);
    if (mouseX > 325 && mouseX < 475 && mouseY > 315 && mouseY < 365) {
      newGame(nDiscs);
      started = true;
    }
  } else {
    if (mouseX > 50 && mouseX < 250) {
      if (mouseX > smallest[0] && mouseX < smallest[0]+smallest[6] && mouseY > smallest[3] && mouseY < smallest[3]+50 && check == 0) {
        check = 1;
        poles[0][smallest[9]] = 2;
      } else if (check > 0) {
        move = 1;
      }
    } else if (mouseX < 500 && mouseX > 300) {
      if (mouseX > smallest[1] && mouseX < smallest[1]+smallest[7] && mouseY > smallest[4] && mouseY < smallest[4]+50 && check == 0) {
        check = 2;
        poles[1][smallest[10]] = 2;
      } else if (check > 0) {
        move = 2;
      }
    } else if (mouseX < 750 && mouseX > 550) {
      if (mouseX > smallest[2] && mouseX < smallest[2]+smallest[8] && mouseY > smallest[5] && mouseY < smallest[5]+50 && check == 0) {
        check = 3;
        poles[2][smallest[11]] = 2;
      } else if (check > 0) {
        move = 3;
      }
    } 
  }
    if (mouseX > 645 && mouseY > 645) {
        tries++;
        newGame(nDiscs);
    }
    else if (mouseX < 645 && mouseX > 525 && mouseY > 645) {
      saveFile();
    }

}

function checkWin() {
  let win = true;
  for (let i = 0; i < nDiscs; i++) {
    if (poles[2][i] == 0)
      win = false;
  }
  if (win) {
    time = millis() - time;
    dataOutput();
    nDiscs++;
    tries = 1;
    newGame(nDiscs);

  }
}

function solve(n, a, b, c) {
  if (n == 1) {
    check = a;
    move = b;
    updateDiscs();
  } else {
    setTimeout(solve(n - 1, a, c, b), 3000);
    setTimeout(solve(1, a, b, c), 3000);
    setTimeout(solve(n - 1, c, b, a), 3000);
  }
}

function dataOutput() {
   data = data + "Discs: " + nDiscs + ", Moves: " + moves + ", Time (Sec): " + time/1000 + ", Tries: " + tries + "\n"; //still need time in seconds
   print(data);
}

function saveFile() {
  let list = split(data, "\n");
  saveStrings(list, month() + "/" + day() + "/" + year() + ".txt");
}