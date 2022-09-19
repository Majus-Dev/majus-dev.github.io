let zones = [
    {name: "Pack", tz: "NZST", loc: "Pacific/Auckland"},
    {name: "Wub", tz: "ACST", loc: "Australia/Adelaide"},
    {name: "Line", tz: "CET", loc: "Europe/Oslo"},
    {name: "Lina", tz: "CET", loc: "Europe/Oslo"},
    {name: "Zelley", tz: "CET", loc: "Europe/Oslo"},
    {name: "Zelley", tz: "CET", loc: "Europe/Oslo"},
    {name: "Majus", tz: "CET", loc: "Europe/Oslo"},
    {name: "Crim", tz: "EST", loc: "America/Detroit"},
    {name: "Pep", tz: "EST", loc: "America/Detroit"},
    {name: "Smo", tz: "EST", loc: "America/Detroit"},
    {name: "Toxic", tz: "EST", loc: "America/Detroit"},
    {name: "Wolf", tz: "EST", loc: "America/Detroit"},
    {name: "Timmy", tz: "EST", loc: "America/Detroit"},
    {name: "Keke", tz: "PST", loc: "America/Los_Angeles"}
]
function loop() 
{
    const cont = document.getElementById("mods")
    if (!cont) return 
    cont.innerHTML = ""
    for (let z of zones) {
        t = new Intl.DateTimeFormat("en-US", {timeZone: z.loc, timeStyle: "medium"}).format(new Date())
        //console.log(`${z.tz} | ${z.name}: ${t}`)
        let div = document.createElement("div");
        div.classList = "mod";
        div.innerHTML = `<span class="content-l"><p>${z.tz} | ${z.name}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></span><span class="content-r"><p>${t}</p></span>`
        cont.append(div)
    }
}
function looper() {
    loop()
    setTimeout(() => {
        looper()
    }, 1000);
}
looper()