let money = 10;

const gamba = [
    {
        name: "ehehe",
        url: "https://cdn.7tv.app/emote/01H5ECBJ080004C067KYDBPSQ2/4x.gif",
        amount: 1,
        mult: 50
    },
    {
        name: "eww",
        url: "https://cdn.7tv.app/emote/01GQXH6YQ00001C243KH4N2RSK/4x.png",
        amount: 1,
        mult: 0
    },
    {
        name: "plaksa",
        url: "https://cdn.7tv.app/emote/01HYR7EMK80001WWQ8ZKWKN7QQ/4x.gif",
        amount: 2,
        mult: 20
    },
    {
        name: "pickle",
        url: "https://cdn.7tv.app/emote/01GZ5FBTWR000DKQJNY0FBSSFS/4x.gif",
        amount: 4,
        mult: 12
    },
    {
        name: "tasty",
        url: "https://cdn.7tv.app/emote/01F6NAA63800052X5637DGY0E8/4x.gif",
        amount: 6,
        mult: 8
    },
    {
        name: "juh",
        url: "https://cdn.7tv.app/emote/01H71GDB9G000D7KSF3J6CMMK4/4x.gif",
        amount: 8,
        mult: 5
    },
    {
        name: "keking",
        url: "https://cdn.7tv.app/emote/01H44YJ3R000075DM8MX06CDRN/4x.gif",
        amount: 10,
        mult: 3
    }
]

const reel = [
    "keking", "juh", "tasty", "ehehe", "keking", "juh",
    "tasty", "keking", "juh", "tasty", "keking", "juh", "tasty",
    "pickle", "keking", "juh", "tasty", "pickle", "keking",
    "juh", "plaksa", "keking", "juh", "pickle", "keking",
    "tasty", "plaksa", "keking", "juh", "eww", "keking",
    "pickle"
];

let spinner1
let spinner2
let spinner3

let spinner1velocity = 0;
let spinner2velocity = 0;
let spinner3velocity = 0;

let spinner1position = 0;
let spinner2position = 0;
let spinner3position = 0;

let spinner1yvalue = 0;
let spinner2yvalue = 0;
let spinner3yvalue = 0;

let spinning = false;

//load gifs
document.addEventListener("DOMContentLoaded", () => {
    let icons = document.querySelector("#icons");
    gamba.forEach((slot) => {
        let elem = document.createElement("img");
        elem.src = slot.url;
        elem.alt = slot.name;
        icons.appendChild(elem);
    });

    spinner1 = document.createElement("div");
    spinner1.id = "spinner1"
    spinner2 = document.createElement("div");
    spinner2.id = "spinner2"
    spinner3 = document.createElement("div");
    spinner3.id = "spinner3"

    reel.forEach((icon) => {
        let slot = gamba.filter(a => a.name == icon)[0];
        let elem = document.createElement("img");
        elem.src = slot.url;
        elem.alt = slot.name;
        elem.classList = "w-32 h-32 m-2 rounded-lg";
        spinner1.appendChild(elem.cloneNode());
        spinner2.appendChild(elem.cloneNode());
        spinner3.appendChild(elem.cloneNode());
    });

    reel.forEach((icon) => {
        let slot = gamba.filter(a => a.name == icon)[0];
        let elem = document.createElement("img");
        elem.src = slot.url;
        elem.alt = slot.name;
        elem.classList = "w-32 h-32 m-2 lg";
        spinner1.appendChild(elem.cloneNode());
        spinner2.appendChild(elem.cloneNode());
        spinner3.appendChild(elem.cloneNode());
    });

    spinner1position = random(0, 32)*136;
    spinner2position = random(0, 32)*136;    
    spinner3position = random(0, 32)*136;

    spinner1.style.transform = `translateY(${-68 - spinner1position - 32*136}px)`
    spinner2.style.transform = `translateY(${-68 - spinner2position - 32*136}px)`
    spinner3.style.transform = `translateY(${-68 - spinner3position - 32*136}px)`


    document.querySelector("#reel1").appendChild(spinner1)
    document.querySelector("#reel2").appendChild(spinner2)
    document.querySelector("#reel3").appendChild(spinner3)

    document.querySelector("#gambago").addEventListener("click", () => {
        startSpin(Number(document.querySelector("#gambamount").value));
    })
})

let from1 = 0;
let from2 = 0;
let from3 = 0;

function startSpin(money_amount) {
    if (money_amount > money) return "NOT ENOUGH MONEY";
    if (spinning) return "STILL SPINNING";
    spinning = true;
    start = undefined;
    requestAnimationFrame(drawFrame);
    
    let startoffset = Math.random()*0.1;
    
    let spinner1result_num = random(0, reel.length);
    let spinner2result_num = random(0, reel.length);
    let spinner3result_num = random(0, reel.length);
    
    let spinner1result = reel[spinner1result_num];
    let spinner2result = reel[spinner2result_num];
    let spinner3result = reel[spinner3result_num];
    
    spinner1yvalue = -68 - (spinner1result_num*136) - 31*136;
    spinner2yvalue = -68 - (spinner2result_num*136) - 31*136;
    spinner3yvalue = -68 - (spinner3result_num*136) - 31*136;
    
    spinner1velocity = random(25, 35);
    spinner2velocity = random(25, 35);
    spinner3velocity = random(25, 35);
    
    from1 = spinner1velocity;
    from2 = spinner2velocity;
    from3 = spinner3velocity;

    
    console.log(`${spinner1result} | ${spinner2result} | ${spinner3result}`)

}
let start;
let prev;

function drawFrame(timestamp) {
    if (!spinning) return;
    if (prev == undefined) prev = timestamp;
    if (start == undefined) start = timestamp;
    let delta = Number(timestamp - prev)/10;
    const duration = (timestamp - start)/1000;
    prev = timestamp

    spinner1position += spinner1velocity*delta;
    spinner2position += spinner2velocity*delta;    
    spinner3position += spinner3velocity*delta;

    spinner1.style.transform = `translateY(${-68 -(spinner1position % (32*136)) - 30*136}px)`
    spinner2.style.transform = `translateY(${-68 -(spinner2position % (32*136)) - 30*136}px)`
    spinner3.style.transform = `translateY(${-68 -(spinner3position % (32*136)) - 30*136}px)`

    spinner1velocity = lerp(from1, 0, duration/10)
    spinner2velocity = lerp(from2, 0, duration/10)
    spinner3velocity = lerp(from3, 0, duration/10)

    if (spinner1velocity <= 0.1 &&
        spinner2velocity <= 0.1 &&
        spinner3velocity <= 0.1
    ) {
        spinning=false;
        return
    }

    requestAnimationFrame(drawFrame)
}

const lerp = (start, end, t) => start + (end - start) * t;
const random = (from, to) => Math.floor(Math.random() * (to-(from+1)))+from;