let header = document.querySelector('#intro');
let anim = [
  //animated text that says "Majus-Dev"
  { t: " ", ms: 200},
  { t: "M", ms: 100},
  { t: "Ma", ms: 100},
  { t: "Maj", ms: 100},
  { t: "Maju", ms: 100},
  { t: "Majus", ms: 500},
  { t: "Majus-", ms: 100},
  { t: "Majus-D", ms: 100},
  { t: "Majus-De", ms: 100},
  { t: "Majus-Dev", ms: 100},
]

let i = 0;
let update = () => {
  let step = anim[i];
  header.innerText = step.t;
  i++

  if (i < anim.length) {
    setTimeout(update, step.ms);
  }
  else {
    setTimeout(() => {
      document.getElementById('intro').style.fontSize = '4rem';
      setTimeout(() => {
        document.getElementById("nav").style.opacity = "1";
      }, 500);
    }, 200);

  }
}
update()