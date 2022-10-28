let zones = [
    {name: "Pack", tz: "NZST", loc: "Pacific/Auckland"},
    {name: "Wub", tz: "ACST", loc: "Australia/Adelaide"},
    {name: "Line", tz: "CET", loc: "Europe/Oslo"},
    {name: "Lina", tz: "CET", loc: "Europe/Oslo"},
    {name: "Zelley", tz: "CET", loc: "Europe/Oslo"},
    {name: "Majus", tz: "CET", loc: "Europe/Oslo"},
	{name: "Jay", tz: "GMT", loc: "Europe/London"},
    {name: "Darky", tz: "GMT", loc: "Europe/London"},
    {name: "Crim", tz: "EST", loc: "America/Detroit"},
    {name: "Pep", tz: "EST", loc: "America/Detroit"},
    {name: "Smo", tz: "EST", loc: "America/Detroit"},
    {name: "Toxic", tz: "EST", loc: "America/Detroit"},
    {name: "Timmy", tz: "EST", loc: "America/Detroit"},
    {name: "Keke", tz: "PST", loc: "America/Los_Angeles"}
]

let tzones = [
    {name: "Hap", tz: "CET", loc: "Europe/Oslo"},
    {name: "Locke", tz: "CET", loc: "Europe/Oslo"},
    {name: "Cel", tz: "EST", loc: "America/Detroit"},
    {name: "Cloud", tz: "EST", loc: "America/Detroit"},
    {name: "Ceph", tz: "CST", loc: "America/Chicago"},
    {name: "Scrub", tz: "CST", loc: "America/Chicago"},
    {name: "Lila", tz: "PST", loc: "America/Los_Angeles"},
    {name: "Derg", tz: "PST", loc: "America/Los_Angeles"},
]

function init() {
    const cont = document.getElementById("mods")
    const con2 = document.getElementById("twt")
    if (!cont || !con2) return 
    cont.innerHTML = ""
    con2.innerHTML = ""
    for (let z of zones) {
        t = new Intl.DateTimeFormat("en-US", {timeZone: z.loc, timeStyle: "medium"}).format(new Date())
        //console.log(`${z.tz} | ${z.name}: ${t}`)
        
        let div = document.createElement("div");
        div.classList = "mod";
        div.innerHTML = `<span class="content-l"><p>${z.name}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></span><span class="content-r" id="timer-${z.name}"><p>${t} | ${z.tz}</p></span>`
        cont.append(div)
    
    }
    for (let z of tzones) {
        t = new Intl.DateTimeFormat("en-US", {timeZone: z.loc, timeStyle: "medium"}).format(new Date())
    
        let div = document.createElement("div");
        div.classList = "mod";
        div.innerHTML = `<span class="content-l"><p>${z.name}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></span><span class="content-r" id="timer-${z.name}"><p>${t} | ${z.tz}</p></span>`
        con2.append(div)
    }
}

function loop() 
{
    for (let z of zones) {
        t = new Intl.DateTimeFormat("en-US", {timeZone: z.loc, timeStyle: "medium"}).format(new Date())

        let spam = document.getElementById(`timer-${z.name}`)
        spam.innerHTML = `<p>${t} | ${z.tz}`
    }
    for (let z of tzones) {
        t = new Intl.DateTimeFormat("en-US", {timeZone: z.loc, timeStyle: "medium"}).format(new Date())
        
        let spam = document.getElementById(`timer-${z.name}`)
        spam.innerHTML = `<p>${t} | ${z.tz}`
    }
}
function looper() {
    loop()
    setTimeout(() => {
        looper()
    }, 1000);
}
init()
looper()