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
const speedvariable = 5;
const speed = 3;

const slots = [
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

    const machine = new SlotMachine();

    let betting_amount = Number(localStorage.getItem("ba") ?? 0.01);
    
    function increase_betting_amount() {
        if (machine.spinning) return;
        betting_amount = Number(document.querySelector("#gambamount").value);
        betting_amount = Math.round((betting_amount+0.01)*1000)/1000;
        document.querySelector("#gambamount").value = betting_amount
        localStorage.setItem("ba", betting_amount)
    }
    document.querySelector("#gambainc").addEventListener("click", increase_betting_amount);
    
    function decrease_betting_amount() {
        if (machine.spinning) return;
        betting_amount = Number(document.querySelector("#gambamount").value);
        betting_amount = Math.max(0.01, Math.round((betting_amount-0.01)*1000)/1000);
        document.querySelector("#gambamount").value = betting_amount
        localStorage.setItem("ba", betting_amount)
    }
    document.querySelector("#gambadec").addEventListener("click", decrease_betting_amount);
    
    document.querySelector("#gambamount").addEventListener("change", () => {
        if (machine.spinning) {
            document.querySelector("#gambamount").value = betting_amount;
            console.log("hey i saw you trying to cheat")
        }
        let val = Number(document.querySelector("#gambamount").value) 
        if (val <= 0 ) val = 0.01;
        if (isNaN(val)) val = 0.01;
        betting_amount = val;
        betting_amount = Math.round((betting_amount)*1000)/1000;
    
        document.querySelector("#gambamount").value = betting_amount
        localStorage.setItem("ba", betting_amount)
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
        await machine.GambaGoGamba()
    });

    machine.updatemoney();
});


class SlotMachine {
    #money = Number(localStorage.getItem("cashmoneyganggang") ?? 50);
    #spinning = false;
    #canstop = false;
    #previous;
    constructor() {
        this.frame = this.frame.bind(this)
    }

    get money() {
        return this.#money
    }

    get spinning() {
        return this.#spinning
    }

    updatemoney() {
        localStorage.setItem("cashmoneyganggang", this.#money);
        document.querySelector("#money").textContent = `$${this.#money}`;
    }

    async GambaGoGamba() {
        const gamba_amount = Number(document.querySelector("#gambamount").value);
        if (gamba_amount > this.#money) return "ermm";
        if (this.#spinning) return "stahp";
        
        for(let slot of slots) {
            slot.startpos = slot.position%(height*count);
            slot.t = 0;
            slot.target = random(0,count-1);
        }
        this.#spinning = true;
        this.#canstop = false;
        this.#previous = undefined;
        this.#money = round(this.#money-gamba_amount);
        this.updatemoney();

        requestAnimationFrame(this.frame)

        for(let slot of slots) {
            slot.targetpos = (speed*height*count)+(slot.target*height);
            slot.spinning = true;
            
            await wait(random(50,200));
        
        }
        this.#canstop = true;
    }

    frame(timestamp) {
        if (this.#spinning === false) return;
        if (this.#previous === undefined) this.#previous = timestamp
        const delta = Number(timestamp-this.#previous)/1000;
        this.#previous = timestamp;
        
        for(let slot of slots) {
            if (!slot.spinning) continue;
            slot.position = Qlerp(slot.startpos, slot.targetpos, slot.t);
            slot.dom_element.style.transform = `translateY(${-((slot.position)%(height*count))+offset+height}px`
            slot.t = Math.min(1, slot.t+delta/speedvariable);
            if (slot.t >= 1) slot.spinning = false;
        }
        if (slots.every(a => !a.spinning) && this.#canstop) {
            this.dothemoneything(Number(document.querySelector("#gambamount").value));
            this.#spinning = false;
        }
        requestAnimationFrame(this.frame)
    }

    async dothemoneything(gamba_amount) {
        let multiplier =  gamba.filter(a => a.name == reel[slots[0].target])[0].mult;
        const primary =   reel[slots[0].target] == reel[slots[1].target] && reel[slots[1].target] == reel[slots[2].target]; 
        const secondary = reel[slots[0].target] == reel[slots[1].target] && reel[slots[1].target] != reel[slots[2].target];
        if (primary) {
            this.#money += gamba_amount*multiplier;
        }
        else if (secondary) {
            this.#money += Math.ceil((gamba_amount*multiplier/10)*100)/100;
        }
        this.#money = round(this.#money);
        this.updatemoney();
        

        slots.forEach(slot => slot.target = -1);
        if(document.getElementById("infinitegambago").checked == true) {
            await wait(10)
            document.querySelector("#gambago").click()
        }
    }

    daily() {
        //add daily ehehe
    }
}
/*
const updatemoney = () => {
    localStorage.setItem("cashmoneyganggang", money)
    document.querySelector("#money").textContent = `$${money}`
}
let spinning = false;
let canstop = false;
let money = 10;
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
    canstop = false;
    previous = undefined;
    money = round(money-gamba_amount);
    updatemoney();

    // console.log(`${reel[slots[0].target]} | ${reel[slots[1].target]} | ${reel[slots[2].target]}`)
    //start frame thing
    requestAnimationFrame(frame)

    for(let slot of slots) {
        slot.targetpos = (speed*height*count)+(slot.target*height);
        slot.spinning = true;
        // console.log(slot.targetpos-slot.startpos)
        await wait(random(50,200));
        
        // slot.position = slot.targetpos
        // slot.dom_element.style.transform = `translateY(${-((slot.position)%(height*count))+offset+height}px`
    }
    canstop = true;
}

const speedvariable = 5;
let previous;
function frame(timestamp) {
    if (!spinning) return;
    if (previous === undefined) previous = timestamp
    const delta = Number(timestamp-previous)/1000;
    previous = timestamp;
    
    for(let slot of slots) {
        if (!slot.spinning) continue;
        slot.position = Qlerp(slot.startpos, slot.targetpos, slot.t);
        slot.dom_element.style.transform = `translateY(${-((slot.position)%(height*count))+offset+height}px`
        slot.t = Math.min(1, slot.t+delta/speedvariable);
        if (slot.t >= 1) slot.spinning = false;
    }
    if (slots.every(a => !a.spinning) && canstop) {
        dothemoneything(Number(document.querySelector("#gambamount").value));
        spinning = false;
    }
    requestAnimationFrame(frame)
}

function dothemoneything(gamba_amount) {
    let multiplier =  gamba.filter(a => a.name == reel[slots[0].target])[0].mult;
    const primary =   reel[slots[0].target] == reel[slots[1].target] && reel[slots[1].target] == reel[slots[2].target]; 
    const secondary = reel[slots[0].target] == reel[slots[1].target] && reel[slots[1].target] != reel[slots[2].target];
    if (primary) {
        money += gamba_amount*multiplier;
    }
    else if (secondary) {
        money += Math.ceil((gamba_amount*multiplier/10)*100)/100;
    }
    money = round(money);
    updatemoney();
    console.log(primary, secondary)
    slots.forEach(slot => slot.target = -1);
}
*/

const Qlerp = (a, b, t) => a + (b - a) * ((t = Math.max(0, Math.min(1, t))) * (2 - t));
const lerp = (start, end, t) => start + (end - start) * t;
const random = (from, to) => Math.floor(Math.random() * (to-(from+1)))+from;
const wait = (duration) => new Promise(resolve => {setTimeout(resolve,duration)});
const round = (value) => Math.round(value*100)/100