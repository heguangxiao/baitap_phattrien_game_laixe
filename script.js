let myCanvas = {};
let myCar;
let stone = [];
let ctx;
myCanvas.canvas = document.createElement('canvas');
myCanvas.start = function () {
    myCanvas.canvas.width = window.innerWidth - 25;
    myCanvas.canvas.height = window.innerHeight - 25;
    myCanvas.context = myCanvas.canvas.getContext('2d');
    document.body.insertBefore(myCanvas.canvas, document.body.childNodes[0]);
    myCanvas.frameNo = 0;
    myCanvas.interval = setInterval(updateGame, 10);
    window.addEventListener('keydown', function (e) {
        myCanvas.keys = (myCanvas.keys || []);
        myCanvas.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
        myCanvas.keys[e.keyCode] = false;
    })
}
myCanvas.clear = function () {
    myCanvas.context.clearRect(0, 0, myCanvas.canvas.width, myCanvas.canvas.height);
}
myCanvas.stop = function () {
    clearInterval(myCanvas.interval);
}

function startGame() {
    myCanvas.start();
    myCar = new Component(50, 50, 'yellow', myCanvas.canvas.width / 2, myCanvas.canvas.height - 50);
}

function everyinterval(n) {
    if ((myCanvas.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function eventKey() {
    myCar.speedX = 0;
    myCar.speedY = 0;
    if (myCanvas.keys && myCanvas.keys[37]) {myCar.speedX = -1}
    if (myCanvas.keys && myCanvas.keys[38]) {myCar.speedY = -1}
    if (myCanvas.keys && myCanvas.keys[39]) {myCar.speedX = 1}
    if (myCanvas.keys && myCanvas.keys[40]) {myCar.speedY = 1}
}

let Component = function (width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myCanvas.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (stones) {
        let myleft = this.x;
        let myright = this.x + this.width;
        let mytop = this.y;
        let mybottom = this.y + this.height;
        let stonesleft = stones.x;
        let stonesright = stones.x + stones.width;
        let stonestop = stones.y;
        let stonesbottom = stones.y + stones.height;
        let crash = true;
        if ((mybottom < stonestop) || mytop > stonesbottom || myright < stonesleft || myleft > stonesright) {
            crash = false;
        }
        return crash;
    }
}

function updateGame() {
    let x = Math.floor(Math.random() * (myCanvas.canvas.width - 100)) + 50;
    let width = Math.floor(Math.random() * 50 ) + 1;
    let height = Math.floor(Math.random() * 50 ) + 1;
    for (let i = 0; i < stone.length; i++) {
        if (myCar.crashWith(stone[i])) {
            myCanvas.stop();
            return;
        }
    }

    myCanvas.clear();
    myCanvas.frameNo++;
    if (myCanvas.frameNo == 1 || everyinterval(149)) {
        stone.push(new Component(width, height, "black", x, 0));
    }
    if (everyinterval(299)) {
        stone.push(new Component(width, height, "black", x, 0));
    }
    if (everyinterval(449)) {
        stone.push(new Component(width, height, "black", x, 0));
    }
    for (let j = 0; j < stone.length; j++) {
        stone[j].y++;
        stone[j].update();
    }
    myCar.update();
    myCar.newPos();
    eventKey();
}

