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
        name: ":b",
        url: "https://cdn.7tv.app/emote/01H212CQY8000D9DEP10Z93JA9/4x.png",
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
    "keking", "juh", ":b", "ehehe", "keking", "juh",
    ":b", "keking", "juh", ":b", "keking", "juh", ":b",
    "pickle", "keking", "juh", ":b", "pickle", "keking",
    "juh", "plaksa", "keking", "juh", "pickle", "keking",
    ":b", "plaksa", "keking", "juh", "eww", "keking",
    "pickle"
];

const height = 144; //px
const count = reel.length;
const offset = -height*count;

let slots = [
    {
        id: 1,
        t: 0,
        startpos: 0,
        targetpos: 0,
        position: 0,
        positionid: 0,
        dom_element: document.createElement("div"),
        spinning: false,
        target: 0,
    },
    {
        id: 2,
        t: 0,
        startpos: 0,
        targetpos: 0,
        position: 0,
        positionid: 0,
        dom_element: document.createElement("div"),
        spinning: false,
        target: 0,
    },
    {
        id: 3,
        t: 0,
        startpos: 0,
        targetpos: 0,
        position: 0,
        positionid: 0,
        dom_element: document.createElement("div"),
        spinning: false,
        target: 0,
    },
]


document.addEventListener("DOMContentLoaded", () => {
    let icons = document.querySelector("#icons");
    gamba.forEach((slot) => {
        let elem = document.createElement("img");
        elem.src = slot.url;
        elem.alt = slot.name;
        icons.appendChild(elem);
    });

    slots.forEach(slot => {
        slot.dom_element.id = `spinner-${slot.id}`
        slot.dom_element.classList = "flex flex-col justify-center items-center"
        document.querySelector(`#reel${slot.id}`).appendChild(slot.dom_element);
    
        [ ...reel, ...reel, reel[0], reel[1] ].forEach(icon => {
            let gambaitem = gamba.filter(a => a.name == icon)[0];
            let elem = document.createElement("img");
            elem.src = gambaitem.url;
            elem.alt = gambaitem.name;
            elem.classList = "w-32 h-32 m-2 rounded-sm";
            slot.dom_element.appendChild(elem)
        });

        slot.positionid = random(0, count-1);
        slot.position = slot.positionid*height

        slot.dom_element.style.transform = `translateY(${-((slot.positionid*height)%(height*count))+offset+height}px`
    });

    document.querySelector("#gambago").addEventListener("click", async () => {
        await GambaGoGamba()
    })
});

const speed = 3;
let spinning = false;
async function GambaGoGamba() {
    const gamba_amount = Number(document.querySelector("#gambamount").value);
    if (gamba_amount > money) return "ermm";
    if (spinning) return "stahp";
    
    for(let slot of slots) {
        slot.startpos = slot.position%(height*count);
        slot.t = 0;
        slot.target = random(0,count-1);
    }
    spinning = true;
    //start frame thing
    requestAnimationFrame(frame)

    for(let slot of slots) {
        slot.targetpos = (speed*height*count)+(slot.target*height);
        slot.spinning = true;
        console.log(slot)
        await wait(random(50,200));
        
        // slot.position = slot.targetpos
        // slot.dom_element.style.transform = `translateY(${-((slot.position)%(height*count))+offset+height}px`
    }
}

const speedvariable = 5;
let previous = 0;
function frame(timestamp) {
    if (!spinning) return;

    const delta = Number(timestamp-previous)/1000;
    previous = timestamp;
    
    for(let slot of slots) {
        if (!slot.spinning) continue;
        slot.position = Qlerp(slot.startpos, slot.targetpos, slot.t);
        slot.dom_element.style.transform = `translateY(${-((slot.position)%(height*count))+offset+height}px`
        slot.t = Math.min(1, slot.t+delta/speedvariable);
        if (slot.t >= 1) slot.spinning = false;
    }
    if (slots.every(a => !a.spinning)) {
        dothemoneything();
        spinning = false;
    }
    requestAnimationFrame(frame)
}

function dothemoneything() {

}

const Qlerp = (a, b, t) => a + (b - a) * ((t = Math.max(0, Math.min(1, t))) * (2 - t));
const lerp = (start, end, t) => start + (end - start) * t;
const random = (from, to) => Math.floor(Math.random() * (to-(from+1)))+from;
const wait = (duration) => new Promise(resolve => {setTimeout(resolve,duration)});