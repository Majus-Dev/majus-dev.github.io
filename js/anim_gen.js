let out = [
    { t: " ", ms: 200},
    { t: "_", ms: 200},
    { t: " ", ms: 200},
    { t: "_", ms: 200},
    { t: " ", ms: 200},
    { t: "_", ms: 200},
];

let title = "Majus-Dev"
let titleArr = title.split("")
let currentLetter, previousLetters = "";
for(let [i, letter] of titleArr.entries()) {
    let obj = new Object();
    previousLetters += letter
    if (i!==title.length-1) {obj.t = previousLetters + "_"}
    else {obj.t = previousLetters}
    if (letter== " ") {
        obj.ms = 300;
    }
    else if (i===title.length-2) {
        obj.ms = 200;
    }
    else {
        obj.ms = 100;
    }
    out.push(obj);
}
console.log(out)