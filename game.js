//game back ground image (https://www.pinterest.com/pin/780952391619832095/)

function preload() {
  map = loadImage("img/Free-Pixel-Art-Forest-by-edermunizz.png");
  //Enemy1-frames
  E1.walking = [
    loadImage("img/characters/E1/E1-walking-frame1.png"),
    loadImage("img/characters/E1/E1-walking-frame2.png"),
  ];
  E1.Mwalking = [
    loadImage("img/characters/E1/M-E1-walking-frame1.png"),
    loadImage("img/characters/E1/M-E1-walking-frame2.png"),
  ];
  E1.attacking = loadImage("img/characters/E1/E1-attacking.png");
  E1.Mattacking = loadImage("img/characters/E1/M-E1-attacking.png");

  //Enemy2-frames
  E2.walking = [
    loadImage("img/characters/E2/E2-walking-frame1.png"),
    loadImage("img/characters/E2/E2-walking-frame2.png"),
  ];
  E2.Mwalking = [
    loadImage("img/characters/E2/M-E2-walking-frame1.png"),
    loadImage("img/characters/E2/M-E2-walking-frame2.png"),
  ];
  E2.shooting = loadImage("img/characters/E2/E2-shooting.png");
  E2.Mshooting = loadImage("img/characters/E2/M-E2-shooting.png");
  E2.bullet = loadImage("img/characters/E2/E2-bullet.png");

  //Enemy3-frames
  E3.walking = [
    loadImage("img/characters/E3/E3-walking-frame1.png"),
    loadImage("img/characters/E3/E3-walking-frame2.png"),
  ];
  E3.shooting = loadImage("img/characters/E3/E3-shooting.png");
  E3.bullet = loadImage("img/characters/E3/E3-bullet.png");

  //Player1-frames
  P1.walking = [
    loadImage("img/characters/P1/P1-walking-frame1.png"),
    loadImage("img/characters/P1/P1-walking-frame2.png"),
  ];
  P1.Mwalking = [
    loadImage("img/characters/P1/M-P1-walking-frame1.png"),
    loadImage("img/characters/P1/M-P1-walking-frame2.png"),
  ];

  P1.slash = loadImage("img/characters/P1/P1-slash.png");
  P1.Mslash = loadImage("img/characters/P1/M-P1-slash.png");
  P1.swordSlash = loadImage("img/characters/P1/swordSlash.png");
  P1.MswordSlash = loadImage("img/characters/P1/MSwordSlash.png");
  P1.dead = loadImage("img/characters/P1/P1-dead.png");
  P1.standing = loadImage("img/characters/P1/P1-standing-still-forward.png");
  P1Selfi = loadImage("img/characters/P1/P1Selfi.png");
  P1DeadSelfi = loadImage("img/characters/P1/P1DeadSelfi.png");
  //Player2-frames
  P2.walking = [
    loadImage("img/characters/P2/P2-walking-frame1.png"),
    loadImage("img/characters/P2/P2-walking-frame2.png"),
  ];
  P2.Mwalking = [
    loadImage("img/characters/P2/M-P2-walking-frame1.png"),
    loadImage("img/characters/P2/M-P2-walking-frame2.png"),
  ];
  P2.shooting = loadImage("img/characters/P2/P2-shooting.png");
  P2.Mshooting = loadImage("img/characters/P2/M-P2-shooting.png");
  P2.dead = loadImage("img/characters/P2/P2-dead.png");
  P2.standing = loadImage("img/characters/P2/P2-standing-still-forward.png");
  P2.bullet = loadImage("img/characters/P2/P2-bullet.png");
  P2Selfi = loadImage("img/characters/P2/P2Selfi.png");
  P2DeadSelfi = loadImage("img/characters/P2/P2DeadSelfi.png");
}
function setup() {
  let myCanvas = createCanvas(700, 500);
  myCanvas.child("sketchHolder");
  mode = 0;
  frameRate(35);
}
let map;
//storing object variables
let E1 = {
  x: 0,
  y: 0,
  walking: 0,
  Mwalkig: 0,
  attacking: 0,
  Mattacking: 0,
  position: 0,
  coolDown: 70,
  facing: 0,
  hp: 3,
};
let E2 = {
  x: 0,
  y: 0,
  walking: 0,
  Mwalkig: 0,
  shooting: 0,
  Mattacking: 0,
  bullet: 0,
  coolDown: 125,
  hp: 2,
};
let E3 = {
  x: 0,
  y: 0,
  walking: 0,
  shooting: 0,
  bullet: 0,
  coolDown: 125,
  hp: 2,
};
//Charachters Classes
class cE1 {
  constructor(x, y, w, h, current, hp, velX, coolDown) {
    this.x = x;
    this.y = y;
    this.current = current;
    this.hp = hp;
    this.hp = E1.hp;
    this.w = w;
    this.h = h;
    this.velX = velX;
    this.coolDown = coolDown;
    this.coolDown = E1.coolDown;
  }
  update() {
    if (this.hp > 0) {
      this.x += this.velX;
      this.coolDown -= coolDownCounter;
      for (let i = 0; i < this.hp; i++) {
        push();
        fill(255, 255, 0);
        strokeWeight(1);
        rect(this.x + (i * this.w) / E1.hp, this.y - 20, this.w / E1.hp, 10);
        pop();
      }
    }
  }
  EAI() {
    if (this.hp > 0) {
      //P1 closer
      if (
        (this.w / 2 + this.x - (ncP1.w / 2 + ncP1.x) <=
          this.w / 2 + this.x - (ncP2.w / 2 + ncP2.x) &&
          ncP1.hp > 0) ||
        (ncP2.hp <= 0 && ncP1.hp > 0)
      ) {
        if (this.w / 2 + this.x >= ncP1.w / 2 + ncP1.x) {
          if (
            ncP1.x + ncP1.w >= this.x - 25 &&
            ncP1.y + ncP1.h >= this.y &&
            this.coolDown <= 0
          ) {
            this.coolDown = E1.coolDown;
            this.velX = 0;
            this.current = image(E1.Mattacking, this.x - 28, this.y);

            E1Projectiles.push(
              new cE1AttackHb(this.x - 25, this.y, this.w + 25, this.h)
            );
          } else if (ncP1.x + ncP1.w <= this.x + this.w / 2) {
            this.current = image(E1.Mwalking[index], this.x, this.y);
            this.velX = -1;
          } else this.current = image(E1.Mwalking[index], this.x, this.y);
        } else if (this.w / 2 + this.x <= ncP1.w / 2 + ncP1.x) {
          if (
            ncP1.x <= this.x + this.w + 25 &&
            ncP1.y + ncP1.h >= this.y &&
            this.coolDown <= 0
          ) {
            this.coolDown = E1.coolDown;
            this.velX = 0;
            this.current = image(E1.attacking, this.x, this.y);

            E1Projectiles.push(
              new cE1AttackHb(this.x, this.y, this.w + 25, this.h)
            );
          } else if (ncP1.x > this.x + this.w / 2) {
            this.current = image(E1.walking[index], this.x, this.y);
            this.velX = 1;
          } else this.current = image(E1.walking[index], this.x, this.y);
        }
      }
      //P2 closer
      else if (
        (this.w / 2 + this.x - (ncP1.w / 2 + ncP1.x) >=
          this.w / 2 + this.x - (ncP2.w / 2 + ncP2.x) &&
          ncP2.hp > 0) ||
        (ncP1.hp <= 0 && ncP2.hp > 0)
      ) {
        if (this.w / 2 + this.x >= ncP2.w / 2 + ncP2.x) {
          if (
            ncP2.x + ncP2.w >= this.x - 25 &&
            ncP2.y + ncP2.h >= this.y &&
            this.coolDown <= 0
          ) {
            this.coolDown = E1.coolDown;
            this.velX = 0;
            this.current = image(E1.Mattacking, this.x - 28, this.y);

            E1Projectiles.push(
              new cE1AttackHb(this.x - 25, this.y, this.w + 25, this.h)
            );
          } else if (ncP2.x + ncP2.w <= this.x + this.w / 2) {
            this.current = image(E1.Mwalking[index], this.x, this.y);
            this.velX = -1;
          } else this.current = image(E1.Mwalking[index], this.x, this.y);
        } else if (this.w / 2 + this.x <= ncP2.w / 2 + ncP2.x) {
          if (
            ncP2.x <= this.x + this.w + 25 &&
            ncP2.y + ncP2.h >= this.y &&
            this.coolDown <= 0
          ) {
            this.coolDown = E1.coolDown;
            this.velX = 0;
            this.current = image(E1.attacking, this.x, this.y);
            E1Projectiles.push(
              new cE1AttackHb(this.x, this.y, this.w + 25, this.h)
            );
          } else if (ncP2.x > this.x + this.w / 2) {
            this.current = image(E1.walking[index], this.x, this.y);
            this.velX = 1;
          } else this.current = image(E1.walking[index], this.x, this.y);
        }
      }
      P2Projectiles.forEach((P2projectile, i) => {
        if (
          P2projectile.x + P2projectile.w >= this.x &&
          P2projectile.x <= this.x + this.w &&
          P2projectile.y + P2projectile.h >= this.y &&
          P2projectile.y <= this.y + this.h
        ) {
          P2Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });
      if (
        (ncP1.atk === "on" &&
          P1.current === "right" &&
          ncP1.x + ncP1.w + 50 >= this.x &&
          ncP1.x + 50 <= this.x + this.w &&
          ncP1.y + ncP1.h >= this.y &&
          ncP1.y <= this.y + this.h) ||
        (ncP1.atk === "on" &&
          P1.current === "left" &&
          ncP1.x >= this.x &&
          ncP1.x - 50 <= this.x + this.w &&
          ncP1.y + ncP1.h >= this.y &&
          ncP1.y <= this.y + this.h)
      ) {
        this.hp = this.hp - 1;
      }
    }
  }
}
//E2
class cE2 {
  constructor(x, y, w, h, current, hp, velX, coolDown) {
    this.x = x;
    this.y = y;
    this.current = current;
    this.hp = hp;
    this.hp = E2.hp;
    this.w = w;
    this.h = h;
    this.velX = velX;
    this.coolDown = coolDown;
    this.coolDown = E2.coolDown;
  }
  update() {
    if (this.hp > 0) {
      this.x += this.velX;
      this.coolDown -= coolDownCounter;
      for (let i = 0; i < this.hp; i++) {
        push();
        fill(255, 255, 0);
        strokeWeight(1);
        rect(this.x + (i * this.w) / E2.hp, this.y - 20, this.w / E2.hp, 10);
        pop();
      }
    }
  }
  EAI() {
    if (this.hp > 0) {
      //P1 closer
      if (
        (this.w / 2 + this.x - (ncP1.w / 2 + ncP1.x) <=
          this.w / 2 + this.x - (ncP2.w / 2 + ncP2.x) &&
          ncP1.hp > 0) ||
        (ncP2.hp <= 0 && ncP1.hp > 0)
      ) {
        if (this.w / 2 + this.x >= ncP1.w / 2 + ncP1.x) {
          if (ncP1.x + ncP1.w >= this.x - 200) {
            this.velX = 0;
            this.current = image(E2.Mshooting, this.x, this.y);
            if (this.coolDown <= 0) {
              this.coolDown = E2.coolDown;
              E2Projectiles.push(
                new cE2Bullet(this.x - 11, this.y + 21, 11, 10, -5)
              );
            }
          } else if (ncP1.x + ncP1.w <= this.x + this.w / 2) {
            this.current = image(E2.Mwalking[index], this.x, this.y);
            this.velX = -3;
          } else this.current = image(E2.Mwalking[index], this.x, this.y);
        } else if (this.w / 2 + this.x <= ncP1.w / 2 + ncP1.x) {
          if (ncP1.x <= this.x + this.w + 200) {
            this.velX = 0;
            this.current = image(E2.shooting, this.x, this.y);
            if (this.coolDown <= 0) {
              this.coolDown = E2.coolDown;
              E2Projectiles.push(
                new cE2Bullet(this.x + this.w, this.y + 21, 11, 10, 5)
              );
            }
          } else if (ncP1.x > this.x + this.w / 2) {
            this.current = image(E2.walking[index], this.x, this.y);
            this.velX = 3;
          } else this.current = image(E2.walking[index], this.x, this.y);
        }
      }
      //P2 closer
      else if (
        (this.w / 2 + this.x - (ncP1.w / 2 + ncP1.x) >=
          this.w / 2 + this.x - (ncP2.w / 2 + ncP2.x) &&
          ncP2.hp > 0) ||
        (ncP1.hp <= 0 && ncP2.hp > 0)
      ) {
        if (this.w / 2 + this.x >= ncP2.w / 2 + ncP2.x) {
          if (ncP2.x + ncP2.w >= this.x - 200) {
            this.velX = 0;
            this.current = image(E2.Mshooting, this.x, this.y);
            if (this.coolDown <= 0) {
              this.coolDown = E2.coolDown;
              E2Projectiles.push(
                new cE2Bullet(this.x - 11, this.y + 21, 11, 10, -5)
              );
            }
          } else if (ncP2.x + ncP2.w <= this.x + this.w / 2) {
            this.current = image(E2.Mwalking[index], this.x, this.y);
            this.velX = -3;
          } else this.current = image(E2.Mwalking[index], this.x, this.y);
        } else if (this.w / 2 + this.x <= ncP2.w / 2 + ncP2.x) {
          if (ncP2.x <= this.x + this.w + 200) {
            this.velX = 0;
            this.current = image(E2.shooting, this.x, this.y);
            if (this.coolDown <= 0) {
              this.coolDown = E2.coolDown;
              E2Projectiles.push(
                new cE2Bullet(this.x + this.w, this.y + 21, 11, 10, 5)
              );
            }
          } else if (ncP2.x > this.x + this.w / 2) {
            this.current = image(E2.walking[index], this.x, this.y);
            this.velX = 3;
          } else this.current = image(E2.walking[index], this.x, this.y);
        }
      }
      P2Projectiles.forEach((P2projectile, i) => {
        if (
          P2projectile.x + P2projectile.w >= this.x &&
          P2projectile.x <= this.x + this.w &&
          P2projectile.y + P2projectile.h >= this.y &&
          P2projectile.y <= this.y + this.h
        ) {
          P2Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });
      if (
        (ncP1.atk === "on" &&
          P1.current === "right" &&
          ncP1.x + ncP1.w + 50 >= this.x &&
          ncP1.x + 50 <= this.x + this.w &&
          ncP1.y + ncP1.h >= this.y &&
          ncP1.y <= this.y + this.h) ||
        (ncP1.atk === "on" &&
          P1.current === "left" &&
          ncP1.x >= this.x &&
          ncP1.x - 50 <= this.x + this.w &&
          ncP1.y + ncP1.h >= this.y &&
          ncP1.y <= this.y + this.h)
      ) {
        this.hp = this.hp - 1;
      }
    }
  }
}
//E3
class cE3 {
  constructor(x, y, w, h, current, hp, velX, coolDown) {
    this.x = x;
    this.y = y;
    this.current = current;
    this.hp = hp;
    this.hp = E3.hp;
    this.w = w;
    this.h = h;
    this.velX = velX;
    this.coolDown = coolDown;
    this.coolDown = E3.coolDown;
  }
  update() {
    if (this.hp > 0) {
      this.x += this.velX;
      this.coolDown -= coolDownCounter;
      for (let i = 0; i < this.hp; i++) {
        push();
        fill(255, 255, 0);
        strokeWeight(1);
        rect(this.x + (i * this.w) / E3.hp, this.y - 20, this.w / E3.hp, 10);
        pop();
      }
    }
  }
  EAI() {
    if (this.hp > 0) {
      //P1 closer
      if (
        (this.w / 2 + this.x - (ncP1.w / 2 + ncP1.x) <=
          this.w / 2 + this.x - (ncP2.w / 2 + ncP2.x) &&
          ncP1.hp > 0) ||
        (ncP2.hp <= 0 && ncP1.hp > 0)
      ) {
        if (this.w / 2 + this.x >= ncP1.w / 2 + ncP1.x) {
          if (ncP1.x + ncP1.w >= this.x + this.w / 2) {
            this.velX = 0;
            this.current = image(E3.shooting, this.x, this.y);
            if (this.coolDown <= 0) {
              this.coolDown = E3.coolDown;
              E3Projectiles.push(
                new cE3Bullet(
                  this.x + this.w / 2 - 3.5,
                  this.y + this.h,
                  7,
                  14,
                  5
                )
              );
            }
          } else if (ncP1.x + ncP1.w <= this.x + this.w / 2) {
            this.current = image(E3.walking[index], this.x, this.y);
            this.velX = -3.5;
          } else this.current = image(E3.walking[index], this.x, this.y);
        } else if (this.w / 2 + this.x <= ncP1.w / 2 + ncP1.x) {
          if (ncP1.x <= this.x + this.w / 2) {
            this.velX = 0;
            this.current = image(E3.shooting, this.x, this.y);
            if (this.coolDown <= 0) {
              this.coolDown = E3.coolDown;
              E3Projectiles.push(
                new cE3Bullet(
                  this.x + this.w / 2 - 3.5,
                  this.y + this.h,
                  7,
                  14,
                  5
                )
              );
            }
          } else if (ncP1.x > this.x + this.w / 2) {
            this.current = image(E3.walking[index], this.x, this.y);
            this.velX = 3.5;
          } else this.current = image(E3.walking[index], this.x, this.y);
        }
      }

      //P2 closer
      else if (
        (this.w / 2 + this.x - (ncP1.w / 2 + ncP1.x) >=
          this.w / 2 + this.x - (ncP2.w / 2 + ncP2.x) &&
          ncP2.hp > 0) ||
        (ncP1.hp <= 0 && ncP2.hp > 0)
      ) {
        if (this.w / 2 + this.x >= ncP2.w / 2 + ncP2.x) {
          if (ncP2.x + ncP2.w >= this.x + this.w / 2) {
            this.velX = 0;
            this.current = image(E3.shooting, this.x, this.y);
            if (this.coolDown <= 0) {
              this.coolDown = E3.coolDown;
              E3Projectiles.push(
                new cE3Bullet(
                  this.x + this.w / 2 - 3.5,
                  this.y + this.h,
                  7,
                  14,
                  5
                )
              );
            }
          } else if (ncP2.x + ncP2.w <= this.x + this.w / 2) {
            this.current = image(E3.walking[index], this.x, this.y);
            this.velX = -3.5;
          } else this.current = image(E3.walking[index], this.x, this.y);
        } else if (this.w / 2 + this.x <= ncP2.w / 2 + ncP2.x) {
          if (ncP2.x <= this.x + this.w / 2) {
            this.velX = 0;
            this.current = image(E3.shooting, this.x, this.y);
            if (this.coolDown <= 0) {
              this.coolDown = E3.coolDown;
              E3Projectiles.push(
                new cE3Bullet(
                  this.x + this.w / 2 - 3.5,
                  this.y + this.h,
                  7,
                  14,
                  5
                )
              );
            }
          } else if (ncP2.x > this.x + this.w / 2) {
            this.current = image(E3.walking[index], this.x, this.y);
            this.velX = 3.5;
          } else this.current = image(E3.walking[index], this.x, this.y);
        }
      }
      P2Projectiles.forEach((P2projectile, i) => {
        if (
          P2projectile.x + P2projectile.w >= this.x &&
          P2projectile.x <= this.x + this.w &&
          P2projectile.y + P2projectile.h >= this.y &&
          P2projectile.y <= this.y + this.h
        ) {
          P2Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });
      if (
        (ncP1.atk === "on" &&
          P1.current === "right" &&
          ncP1.x + ncP1.w + 50 >= this.x &&
          ncP1.x + 50 <= this.x + this.w &&
          ncP1.y + ncP1.h >= this.y &&
          ncP1.y <= this.y + this.h) ||
        (ncP1.atk === "on" &&
          P1.current === "left" &&
          ncP1.x >= this.x &&
          ncP1.x - 50 <= this.x + this.w &&
          ncP1.y + ncP1.h >= this.y &&
          ncP1.y <= this.y + this.h)
      ) {
        this.hp = this.hp - 1;
      }
    }
  }
}
let P1 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  velX: 0,
  velY: 0,
  walking: 0,
  Mwalking: 0,
  slash: 0,
  Mslash: 0,
  swordSlash: 0,
  MswordSlash: 0,
  dead: 0,
  standing: 0,
  current: "left",
  coolDown: 40,
  up: 1,
  hp: 13,
  atk: "off",
};
let P2 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,

  velX: 0,
  velY: 0,
  walking: 0,
  Mwalking: 0,
  shooting: 0,
  Mshooting: 0,
  dead: 0,
  standing: 0,
  bullet: 0,
  current: "right",
  coolDown: 50,
  up: 1,
  hp: 13,
};
//P1
class cP1 {
  constructor(x, y, w, h, hp, velX, velY, current, coolDown, atk) {
    this.x = x;
    this.y = y;
    this.current = current;
    this.hp = hp;
    this.hp = P1.hp;
    this.w = w;
    this.h = h;
    this.velX = velX;
    this.velY = velY;
    this.current = current;
    this.coolDown = coolDown;
    this.coolDown = P1.coolDown;
    this.atk = atk;
    this.atk = P1.atk;
  }
  update() {
    this.y += this.velY;
    this.velY -= gravity;
    if (this.hp > 0) {
      this.x += this.velX;
    }
    this.coolDown -= coolDownCounter;
    this.atk = "off";
    if (this.y + this.h >= boxSize.bottom) {
      this.y = boxSize.bottom - this.h;
      this.velY = 0;
      P1.up = 1;
    } else if (this.y <= boxSize.top) {
      this.y = boxSize.top;
    }

    if (this.x + this.w >= boxSize.right) {
      this.x = boxSize.right - this.w;
    } else if (this.x <= boxSize.left) {
      this.x = boxSize.left;
    }
  }
  cP1Moving() {
    if (this.hp > 0) {
      //moving
      if (keyIsDown(87) && P1.up === 1) {
        this.velY = -17;
        P1.up = 0;
      }
      if (keyIsDown(65)) {
        this.velX = -5;
        P1.current = "left";
        this.current = image(P1.Mwalking[index], this.x, this.y);
      } else if (keyIsDown(68)) {
        this.velX = 5;
        P1.current = "right";
        this.current = image(P1.walking[index], this.x, this.y);
      }
      //slashing
      else if (keyIsDown(88)) {
        if (P1.current === "right") {
          this.current = image(P1.slash, this.x, this.y);
          if (this.coolDown <= 0) {
            this.coolDown = P1.coolDown;
            cP1Slash.update(image(P1.swordSlash, this.x + this.w, this.y));
            this.atk = "on";
          }
          this.velX = 0;
        } else if (P1.current === "left") {
          this.current = image(P1.Mslash, this.x, this.y);
          if (this.coolDown <= 0) {
            this.coolDown = P1.coolDown;
            cP1Slash.update(image(P1.MswordSlash, this.x - 50, this.y));
            this.atk = "on";
          }
          this.velX = 0;
        }
      } else {
        this.velX = 0;

        this.current = image(P1.standing, this.x, this.y);
      }
      E2Projectiles.forEach((E2projectile, i) => {
        if (
          E2projectile.x + E2projectile.w >= this.x &&
          E2projectile.x <= this.x + this.w &&
          E2projectile.y + E2projectile.h >= this.y &&
          E2projectile.y <= this.y + this.h
        ) {
          E2Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });
      E3Projectiles.forEach((E3projectile, i) => {
        if (
          E3projectile.x + E3projectile.w >= this.x &&
          E3projectile.x <= this.x + this.w &&
          E3projectile.y + E3projectile.h >= this.y &&
          E3projectile.y <= this.y + this.h
        ) {
          E3Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });

      E1Projectiles.forEach((E1projectile, i) => {
        if (
          E1projectile.x + E1projectile.w >= this.x &&
          E1projectile.x <= this.x + this.w &&
          E1projectile.y + E1projectile.h >= this.y &&
          E1projectile.y <= this.y + this.h
        ) {
          E1Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });
    } else if (this.hp <= 0) {
      this.current = image(P1.dead, this.x, this.y + 12);
    }
  }
}

//P2
class cP2 {
  constructor(x, y, w, h, hp, velX, velY, current, coolDown) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.hp = P2.hp;
    this.w = w;
    this.h = h;
    this.velX = velX;
    this.velY = velY;
    this.current = current;
    this.coolDown = coolDown;
    this.coolDown = P2.coolDown;
  }
  update() {
    this.y += this.velY;
    this.velY -= gravity;
    if (this.hp > 0) {
      this.x += this.velX;
    }
    this.coolDown -= coolDownCounter;
    if (this.y + this.h >= boxSize.bottom) {
      this.y = boxSize.bottom - this.h;
      this.velY = 0;
      P2.up = 1;
    } else if (this.y <= boxSize.top) {
      this.y = boxSize.top;
    }

    if (this.x + this.w >= boxSize.right) {
      this.x = boxSize.right - this.w;
    } else if (this.x <= boxSize.left) {
      this.x = boxSize.left;
    }
  }

  cP2Moving() {
    if (this.hp > 0) {
      if (keyIsDown(38) && P2.up === 1) {
        //moving
        this.velY = -17;
        P2.up = 0;
      }
      if (keyIsDown(37)) {
        this.velX = -5;
        P2.current = "left";
        this.current = image(P2.Mwalking[index], this.x, this.y);
      } else if (keyIsDown(39)) {
        this.velX = 5;
        P2.current = "right";
        this.current = image(P2.walking[index], this.x, this.y);
      }
      //shooting
      else if (keyIsDown(32)) {
        if (P2.current === "right") {
          this.current = image(P2.shooting, this.x, this.y);
          this.velX = 0;
          if (this.coolDown <= 0) {
            this.coolDown = P2.coolDown;
            P2Projectiles.push(
              new cP2Bullet(this.x + this.w, this.y + 25, 14, 9, 5)
            );
          }
        } else if (P2.current === "left") {
          this.current = image(P2.Mshooting, this.x, this.y);
          this.velX = 0;
          if (this.coolDown <= 0) {
            this.coolDown = P2.coolDown;
            P2Projectiles.push(
              new cP2Bullet(this.x - 14, this.y + 25, 14, 9, -5)
            );
          }
        }
      } else {
        this.velX = 0;

        this.current = image(P2.standing, this.x, this.y);
      }
      E2Projectiles.forEach((E2projectile, i) => {
        if (
          E2projectile.x + E2projectile.w >= this.x &&
          E2projectile.x <= this.x + this.w &&
          E2projectile.y + E2projectile.h >= this.y &&
          E2projectile.y <= this.y + this.h
        ) {
          E2Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });

      E3Projectiles.forEach((E3projectile, i) => {
        if (
          E3projectile.x + E3projectile.w >= this.x &&
          E3projectile.x <= this.x + this.w &&
          E3projectile.y + E3projectile.h >= this.y &&
          E3projectile.y <= this.y + this.h
        ) {
          E3Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });
      E1Projectiles.forEach((E1projectile, i) => {
        if (
          E1projectile.x + E1projectile.w >= this.x &&
          E1projectile.x <= this.x + this.w &&
          E1projectile.y + E1projectile.h >= this.y &&
          E1projectile.y <= this.y + this.h
        ) {
          E1Projectiles.splice(i, 1);
          this.hp = this.hp - 1;
        }
      });
    } else if (this.hp <= 0) {
      this.current = image(P2.dead, this.x, this.y + 12);
    }
  }
}

class cP2Bullet {
  constructor(x, y, w, h, velX, current) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velX = velX;
    this.current = current;
  }
  display() {
    this.current = image(P2.bullet, this.x, this.y);
    this.x += this.velX;
  }
}
class cE2Bullet {
  constructor(x, y, w, h, velX, current) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velX = velX;
    this.current = current;
  }
  display() {
    this.current = image(E2.bullet, this.x, this.y);
    this.x += this.velX;
  }
}
class cE3Bullet {
  constructor(x, y, w, h, velY, current) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velY = velY;
    this.current = current;
  }
  display() {
    this.current = image(E3.bullet, this.x, this.y);
    this.y += this.velY;
  }
}
class cP1SlashHb {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  update() {}
}

class cE1AttackHb {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  display() {
    push();
    noFill();
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
class cWaveS {
  constructor(wave, nextW, totalEnemies) {
    this.wave = wave;
    this.wave = waveS.wave;
    this.nextW = nextW;
    this.wave = waveS.nextW;
    this.totalEnemies = totalEnemies;
    this.totalEnemies = waveS.totalEnemies;
  }
  update() {
    //wave 1
    if (this.wave === 1) {
      w1ncE1.update();
      w1ncE1.EAI();

      w1nc2E1.update();
      w1nc2E1.EAI();
      if (w1nc2E1.hp <= 0 && w1ncE1.hp <= 0) {
        this.wave += this.nextW;
      }
    }
    //wave 2
    else if (this.wave === 2) {
      w2ncE1.update();
      w2ncE1.EAI();

      w2nc2E1.update();
      w2nc2E1.EAI();

      if (w2nc2E1.hp <= 0 && w2ncE1.hp <= 0) {
        this.wave += this.nextW;
      }
    }
    //wave 3
    else if (this.wave === 3) {
      w3ncE1.update();
      w3ncE1.EAI();

      w3nc2E1.update();
      w3nc2E1.EAI();

      w3ncE2.update();
      w3ncE2.EAI();

      w3nc2E2.update();
      w3nc2E2.EAI();
      if (
        w3nc2E1.hp <= 0 &&
        w3ncE1.hp <= 0 &&
        w3nc2E2.hp <= 0 &&
        w3ncE2.hp <= 0
      ) {
        this.wave += this.nextW;
      }
    }
    //wave 4
    else if (this.wave === 4) {
      w4ncE1.update();
      w4ncE1.EAI();

      w4nc2E1.update();
      w4nc2E1.EAI();

      w4ncE2.update();
      w4ncE2.EAI();

      w4nc2E2.update();
      w4nc2E2.EAI();
      if (
        w4nc2E1.hp <= 0 &&
        w4ncE1.hp <= 0 &&
        w4nc2E2.hp <= 0 &&
        w4ncE2.hp <= 0
      ) {
        this.wave += this.nextW;
      }
    }
    //wave 5
    else if (this.wave === 5) {
      w5ncE1.update();
      w5ncE1.EAI();

      w5nc2E1.update();
      w5nc2E1.EAI();

      w5ncE2.update();
      w5ncE2.EAI();

      w5nc2E2.update();
      w5nc2E2.EAI();

      w5ncE3.update();
      w5ncE3.EAI();

      w5nc2E3.update();
      w5nc2E3.EAI();
      if (
        w5nc2E1.hp <= 0 &&
        w5ncE1.hp <= 0 &&
        w5nc2E2.hp <= 0 &&
        w5ncE2.hp <= 0 &&
        w5nc2E3.hp <= 0 &&
        w5ncE3.hp <= 0
      ) {
        this.wave += this.nextW;
      }
    }
    //wave 6
    else if (this.wave === 6) {
      w6ncE1.update();
      w6ncE1.EAI();

      w6nc2E1.update();
      w6nc2E1.EAI();

      w6ncE2.update();
      w6ncE2.EAI();

      w6nc2E2.update();
      w6nc2E2.EAI();

      w6ncE3.update();
      w6ncE3.EAI();

      w6nc2E3.update();
      w6nc2E3.EAI();
      if (
        w6nc2E1.hp <= 0 &&
        w6ncE1.hp <= 0 &&
        w6nc2E2.hp <= 0 &&
        w6ncE2.hp <= 0 &&
        w6nc2E3.hp <= 0 &&
        w6ncE3.hp <= 0
      ) {
        this.wave += this.nextW;
      }
    }
    //wave 7
    else if (this.wave === 7) {
      w7ncE1.update();
      w7ncE1.EAI();

      w7nc2E1.update();
      w7nc2E1.EAI();

      w7ncE2.update();
      w7ncE2.EAI();

      w7nc2E2.update();
      w7nc2E2.EAI();

      w7ncE3.update();
      w7ncE3.EAI();

      w7nc2E3.update();
      w7nc2E3.EAI();
      if (
        w7nc2E1.hp <= 0 &&
        w7ncE1.hp <= 0 &&
        w7nc2E2.hp <= 0 &&
        w7ncE2.hp <= 0 &&
        w7nc2E3.hp <= 0 &&
        w7ncE3.hp <= 0
      ) {
        this.wave += this.nextW;
      }
    }
    //wave 8
    else if (this.wave === 8) {
      w8ncE1.update();
      w8ncE1.EAI();

      w8nc2E1.update();
      w8nc2E1.EAI();

      w8ncE2.update();
      w8ncE2.EAI();

      w8nc2E2.update();
      w8nc2E2.EAI();

      w8ncE3.update();
      w8ncE3.EAI();

      w8nc2E3.update();
      w8nc2E3.EAI();
      if (
        w8nc2E1.hp <= 0 &&
        w8ncE1.hp <= 0 &&
        w8nc2E2.hp <= 0 &&
        w8ncE2.hp <= 0 &&
        w8nc2E3.hp <= 0 &&
        w8ncE3.hp <= 0
      ) {
        this.wave += this.nextW;
      }
    }
    //wave 9
    else if (this.wave === 9) {
      w9ncE1.update();
      w9ncE1.EAI();

      w9nc2E1.update();
      w9nc2E1.EAI();

      w9ncE2.update();
      w9ncE2.EAI();

      w9nc2E2.update();
      w9nc2E2.EAI();

      w9ncE3.update();
      w9ncE3.EAI();

      w9nc2E3.update();
      w9nc2E3.EAI();
      if (
        w9nc2E1.hp <= 0 &&
        w9ncE1.hp <= 0 &&
        w9nc2E2.hp <= 0 &&
        w9ncE2.hp <= 0 &&
        w9nc2E3.hp <= 0 &&
        w9ncE3.hp <= 0
      ) {
        this.wave += this.nextW;
      }
    }
    //wave 10
    else if (this.wave === 10) {
      w10ncE1.update();
      w10ncE1.EAI();

      w10nc2E1.update();
      w10nc2E1.EAI();

      w10ncE2.update();
      w10ncE2.EAI();

      w10nc2E2.update();
      w10nc2E2.EAI();

      w10ncE3.update();
      w10ncE3.EAI();

      w10nc2E3.update();
      w10nc2E3.EAI();
      if (
        w10nc2E1.hp <= 0 &&
        w10ncE1.hp <= 0 &&
        w10nc2E2.hp <= 0 &&
        w10ncE2.hp <= 0 &&
        w10nc2E3.hp <= 0 &&
        w10ncE3.hp <= 0
      ) {
        mode = 3;
      }
    }
  }
}
let waveS = { wave: 1, nextW: 1, totalEnemies: 0 };
let boxSize = { left: 0, right: 700, top: 0, bottom: 383 };
let gravity = -0.5;
let coolDownCounter = 1;
//used variable for animated images
let index = 0;
//P 1 - 2
let ncP1 = new cP1(310, 305, 40, 78, P1.hp, 0, 0, P1.coolDown, P1.atk);
let ncP2 = new cP2(350, 305, 40, 78, P2.hp, 0, 0, P2.coolDown);

//E1 w = wave
let w1ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w1nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w2ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w2nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w3ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w3nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w4ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w4nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w5ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w5nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w6ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w6nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w7ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w7nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w8ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w8nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w9ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w9nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);

let w10ncE1 = new cE1(-60, 323, 60, 60, 0, E1.hp, 0, 50);
let w10nc2E1 = new cE1(700, 323, 60, 60, 0, E1.hp, 0, 50);
//E2 w = wave
let w3ncE2 = new cE2(10, 310, 33, 73, 0, E2.hp, 0, 50);
let w3nc2E2 = new cE2(657, 310, 33, 73, 0, E2.hp, 0, 50);

let w4ncE2 = new cE2(10, 310, 33, 73, 0, E2.hp, 0, 50);
let w4nc2E2 = new cE2(657, 310, 33, 73, 0, E2.hp, 0, 50);

let w5ncE2 = new cE2(10, 310, 33, 73, 0, E2.hp, 0, 50);
let w5nc2E2 = new cE2(657, 310, 33, 73, 0, E2.hp, 0, 50);

let w6ncE2 = new cE2(10, 310, 33, 73, 0, E2.hp, 0, 50);
let w6nc2E2 = new cE2(657, 310, 33, 73, 0, E2.hp, 0, 50);

let w7ncE2 = new cE2(10, 310, 33, 73, 0, E2.hp, 0, 50);
let w7nc2E2 = new cE2(657, 310, 33, 73, 0, E2.hp, 0, 50);

let w8ncE2 = new cE2(10, 310, 33, 73, 0, E2.hp, 0, 50);
let w8nc2E2 = new cE2(657, 310, 33, 73, 0, E2.hp, 0, 50);

let w9ncE2 = new cE2(10, 310, 33, 73, 0, E2.hp, 0, 50);
let w9nc2E2 = new cE2(657, 310, 33, 73, 0, E2.hp, 0, 50);

let w10ncE2 = new cE2(10, 310, 33, 73, 0, E2.hp, 0, 50);
let w10nc2E2 = new cE2(657, 310, 33, 73, 0, E2.hp, 0, 50);

//E3 w = wave
let w4ncE3 = new cE3(10, 90, 60, 30, 0, E3.hp, 0, 50);
let w4nc2E3 = new cE3(630, 90, 60, 30, 0, E3.hp, 0, 50);

let w5ncE3 = new cE3(10, 90, 60, 30, 0, E3.hp, 0, 50);
let w5nc2E3 = new cE3(630, 90, 60, 30, 0, E3.hp, 0, 50);

let w6ncE3 = new cE3(10, 90, 60, 30, 0, E3.hp, 0, 50);
let w6nc2E3 = new cE3(630, 90, 60, 30, 0, E3.hp, 0, 50);

let w7ncE3 = new cE3(10, 90, 60, 30, 0, E3.hp, 0, 50);
let w7nc2E3 = new cE3(630, 90, 60, 30, 0, E3.hp, 0, 50);

let w8ncE3 = new cE3(10, 90, 60, 30, 0, E3.hp, 0, 50);
let w8nc2E3 = new cE3(630, 90, 60, 30, 0, E3.hp, 0, 50);

let w9ncE3 = new cE3(10, 90, 60, 30, 0, E3.hp, 0, 50);
let w9nc2E3 = new cE3(630, 90, 60, 30, 0, E3.hp, 0, 50);

let w10ncE3 = new cE3(10, 90, 60, 30, 0, E3.hp, 0, 50);
let w10nc2E3 = new cE3(630, 90, 60, 30, 0, E3.hp, 0, 50);

let cP1Slash = new cP1SlashHb();

const P2Projectiles = [];
const E1Projectiles = [];
const E2Projectiles = [];
const E3Projectiles = [];
const waveSystem = new cWaveS(waveS.wave, waveS.nextW, waveS.totalEnemies);

//projectiles place
function animate() {
  P2Projectiles.forEach((P2projectile) => P2projectile.display());
  E1Projectiles.forEach((E1projectile) => E1projectile.display());
  E2Projectiles.forEach((E2projectile) => E2projectile.display());
  E3Projectiles.forEach((E3projectile) => E3projectile.display());
  // waveSystem.forEach((wave) => wave.EAI());
  P2Projectiles.forEach((P2projectile, i) => {
    if (
      P2projectile.x >= boxSize.right ||
      P2projectile.x + P2projectile.w <= boxSize.left
    ) {
      P2Projectiles.splice(i, 1);
    }
  });

  E2Projectiles.forEach((E2projectile, i) => {
    if (
      E2projectile.x >= boxSize.right ||
      E2projectile.x + E2projectile.w <= boxSize.left
    ) {
      E2Projectiles.splice(i, 1);
    }
  });

  E3Projectiles.forEach((E3projectile, i) => {
    if (E3projectile.y + E3projectile.h >= boxSize.bottom) {
      E3Projectiles.splice(i, 1);
    }
  });
}
function draw() {
  clear();
  if (mode === 0) {
    mainMenu();
  }

  //frames for animation helped by Romas
  if (frameCount % 15 == 0) {
    index = 0;
  }
  if (frameCount % 30 == 0) {
    index = 1;
  }

  //play screen
  if (mode === 1) {
    background(221, 186, 143);
    image(map, 0, 0);
    hpInterface();
    //game functions
    ncP1.update();
    ncP1.cP1Moving();
    ncP2.update();
    ncP2.cP2Moving();
    animate();
    push();
    fill(0, 125, 0);
    textSize(40);
    text("wave", 304, 440);
    text(waveSystem.wave, 340, 485);
    pop();

    if (waveSystem.wave === 11) {
      mode = 3;
    }

    if (ncP1.hp > 0 || ncP2.hp > 0) {
      waveSystem.update();
    } else if (ncP1.hp <= 0 && ncP2.hp <= 0) {
      mode = 2;
    }
  }

  if (mode === 2) {
    resaultsScreen();
  }
  if (mode === 3) {
    resaultsScreenWin();
  }
}

function mainMenu() {
  background(221, 186, 143);
  push();
  textSize(70);
  text("Well Of Fire", 160, 150);
  pop();
  push();
  fill(138, 98, 74);
  rect(200, 250, 300, 100, 25);
  fill(221, 186, 143);
  textSize(50);
  text("Play Now", 244, 320);
  pop();
  if (
    mouseIsPressed &&
    mouseX >= 200 &&
    mouseX <= 500 &&
    mouseY >= 250 &&
    mouseY <= 350
  ) {
    mode = 1;
    waveSystem.wave = 1;
  }
}

function hpInterface() {
  //hp bar
  for (let i = 0; i < ncP1.hp; i++) {
    fill(255, 0, 0);
    rect(105 + i * 13.5, 405, 12, 95);
  }
  for (let i = 0; i < ncP2.hp; i++) {
    fill(0, 0, 255);
    rect(595 + i * -13.5, 405, -12, 95);
  }
  if (ncP2.hp <= 0) {
    push();
    noStroke();
    fill(0, 0, 0);
    rect(595, 406, 105);
    pop();
    image(P2DeadSelfi, 600, 418);
  } else if (ncP2.hp > 0) {
    if (ncP2.coolDown > 0) {
      push();
      noStroke();
      fill(255, 100, 0);
      rect(595, 406, 105);
      pop();
    } else if (ncP2.coolDown <= 0) {
      push();
      noStroke();
      fill(50, 255, 0);
      rect(595, 406, 105);
      pop();
    }
    image(P2Selfi, 600, 400);
  }
  if (ncP1.hp <= 0) {
    push();
    noStroke();
    fill(0, 0, 0);
    rect(0, 406, 105);
    pop();
    image(P1DeadSelfi, 0, 418);
  } else if (ncP1.hp > 0) {
    if (ncP1.coolDown > 0) {
      push();
      noStroke();
      fill(255, 100, 0);
      rect(0, 406, 105);
      pop();
    } else if (ncP1.coolDown <= 0) {
      push();
      noStroke();
      fill(50, 255, 0);
      rect(0, 406, 105);
      pop();
    }
    image(P1Selfi, 0, 400);
  }
}

function resaultsScreen() {
  background(221, 186, 143);
  push();
  fill(0);
  textSize(70);
  text("You survived to", 110, 150);

  text("wave", 214, 220);
  fill(0, 125, 0);
  text(waveSystem.wave, 414, 220);
  pop();
  push();
  fill(0);
  rect(200, 250, 300, 100, 25);
  fill(221, 186, 143);
  textSize(50);
  text("Main menu", 224, 320);
  pop();
  if (
    mouseIsPressed &&
    mouseX >= 200 &&
    mouseX <= 500 &&
    mouseY >= 250 &&
    mouseY <= 350
  ) {
    mode = 0;
    location.reload();
  }
}

function resaultsScreenWin() {
  background(221, 186, 143);
  push();
  fill(0);
  textSize(70);
  text("You survived all", 110, 150);

  text("10 waves", 200, 220);
  fill(0, 135, 0);
  pop();
  push();
  fill(0, 125, 0);
  rect(200, 250, 300, 100, 25);
  fill(221, 186, 143);
  textSize(50);
  text("Main menu", 224, 320);
  pop();
  if (
    mouseIsPressed &&
    mouseX >= 200 &&
    mouseX <= 500 &&
    mouseY >= 250 &&
    mouseY <= 350
  ) {
    mode = 0;
    location.reload();
  }
}

function saveHighscore() {
  const nameElement = document.getElementById("name");
  let highscore = {
    name: nameElement.value,
    score: waveSystem.wave,
  };

  if (nameElement.value && waveSystem.wave >= 2) {
    if (localStorage.highscore === undefined) {
      localStorage.highscore = JSON.stringify([]);
    }
    let highscoreArray = JSON.parse(localStorage.highscore);
    highscoreArray.push(highscore);
    localStorage.highscore = JSON.stringify(highscoreArray);

    displayHighscore();
  }
}
function displayHighscore() {
  if (localStorage.highscore !== undefined) {
    let highscoreArray = JSON.parse(localStorage.highscore);
    highscoreArray.sort(function (a, b) {
      return b.score - a.score;
    });

    const highscoreElement = document.getElementById("highscore");
    highscoreElement.innerText = "";
    for (let score of highscoreArray) {
      let index = highscoreArray.indexOf(score);
      if (index <= 5) {
        const item = document.createElement("li");
        item.innerText = "- " + score.name + " survived till " + score.score;
        highscoreElement.appendChild(item);
      }
    }
  }
}

window.addEventListener(
  "keydown",
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

function loadHandler() {
  const saveButton = document.getElementById("save");
  saveButton.addEventListener("click", function () {
    saveHighscore();
    location.reload();
  });
  displayHighscore();
}
window.addEventListener("load", loadHandler);
