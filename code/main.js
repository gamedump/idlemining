import kaboom from "kaboom";

const red = 49;
const green = 62;
const blue = 66;

kaboom({
  height: 720,
  width: 1280,
  background: [red, green, blue],
  stretch: true,
  audio: true
});

loadSound("intro", "sounds/intro.wav")
play("intro")

layer("game");
layer("background");
layer("background2")

layers(["background2", "background", "game"])

let coalAmount = 0;
let money = 2000;

let exchangeValue = 0.5;
let timesExchanged = 0;
let increaseExchangePrice = 150;

let miner = 0;
let minerPrice = 250;

let drill = 0;
let drillPrice = 1000;

let minerTotal = miner * 0.5
let drillTotal = drill * 2

let coalPerTick = minerTotal + drillTotal

debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);

// sprite loader
loadSprite("coal", "sprites/coal.png");
loadSprite("exchange", "sprites/exchange.png");
loadSprite("increaseExchange", "sprites/increaseExchange.png");
loadSprite("dirt", "sprites/dirt.png")
loadSprite("miner", "sprites/miner.png")
loadSprite("drill", "sprites/drill.png")

// sound loader
loadSound("cash", "sounds/cash.wav")
loadSound("music", "sounds/music.wav")
loadSound("click", "sounds/click.wav")

const bgmusic = play("music", {
    volume: 0.8,
    loop: true
})

const button = add([
  sprite("coal"),
  scale(35),
  pos(center()),
  origin("center"),
  area(),
  layer("game")
]);

button.onClick(() => {
  coalAmount += 1;
  debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
  play("click")
});

button.onHover(() => {
  
})

const exchange = add([
  sprite("exchange"),
  scale(1),
  pos(100, 100),
  origin("botright"),
  area(),
  layer("game")
]);

exchange.onClick(() => {
  if (coalAmount > 0) {
    money += coalAmount * exchangeValue;
    coalAmount = 0;
    timesExchanged += 1;
    play("cash")
    if (timesExchanged === 10) {
      exchangeValue -= 0.5;
    } else if (timesExchanged === 20) {
      exchangeValue -= 0.5;
    } else if (timesExchanged === 30) {
      exchangeValue -= 0.5;
    } else if (timesExchanged === 50) {
      exchangeValue -= 1.0;
    } else if (timesExchanged === 100) {
      exchangeValue /= 2
    }
    debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
  }
});

const increaseExchange = add([
  sprite("increaseExchange"),
  scale(1),
  pos(100, 160),
  origin("botright"),
  area(),
  layer("game")
]);

increaseExchange.onClick(() => {
  if (money >= increaseExchangePrice) {
    exchangeValue += 0.5;
    money -= increaseExchangePrice;
    play("cash")
    increaseExchangePrice += 25;
    debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
  } else {
    debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
  }
});

if (money < 0) {
  money = 0;
} else if (money < -1) {
  money = 0;
}

const buyMiner = add([
  sprite("miner"),
  scale(1),
  pos(1150, 110),
  origin("botleft"),
  area(),
  layer("game")
])

buyMiner.onClick(() => {
  if (money >= minerPrice) {
    miner += 1;
    money -= minerPrice;
    minerTotal = miner * 0.5;
    play("cash")
    debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
  } else {
    debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
  }
});

const buyDrill = add([
  sprite("drill"),
  scale(0.6),
  pos(1155, 200),
  origin("botleft"),
  area(),
  layer("game")
])

buyDrill.onClick(() => {
  if (money >= drillPrice) {
    drill += 1
    money -= drillPrice
    drillTotal = drill * 2
    play("cash")
    debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
  } else {
    debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
  }
});

setInterval(() => {
  coalPerTick = minerTotal + drillTotal
  coalAmount += coalPerTick;
  debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
}, 1000);

onUpdate(() => {
  coalPerTick = minerTotal + drillTotal
  debug.log("Coal: " + coalAmount + " / $" + money + " / Value: " + exchangeValue + " / CPS: " + coalPerTick);
})

add([
  rect(width(), 50),
  pos(0, height() - 48),
  color(0, 0, 0),
  layer("background")
]);

add([
  rect(100, 160),
  pos(20, 30),
  color(255,255,255),
  outline(4),
  layer("background")
])

add([
  rect(100, 200),
  pos(1140, 30),
  color(255,255,255),
  outline(4),
  layer("background")
])

add([
  sprite("dirt"),
  pos(center()),
  origin("center"),
  scale(40),
  layer("background2")
])