let header = document.querySelector('#intro');
let anim = [
  //animated text that says "Majus-Dev"
  { t: " ", ms: 200},
  { t: "_", ms: 200},
  { t: " ", ms: 200},
  { t: "_", ms: 200},
  { t: " ", ms: 200},
  { t: "_", ms: 200},
  { t: "M_", ms: 100},
  { t: "Ma_", ms: 100},
  { t: "Maj_", ms: 100},
  { t: "Maju_", ms: 100},
  { t: "Majus_", ms: 500},
  { t: "Majus-_", ms: 100},
  { t: "Majus-D_", ms: 100},
  { t: "Majus-De_", ms: 100},
  { t: "Majus-Dev", ms: 100},
  { t: "Majus-Dev", ms: 500},
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