const span = document.getElementById('age-h');
const span2 = document.getElementById('age-y');
// birthdate is June 27th 2004
function loop() {
  setTimeout(() => {
    loop()
    age()
  }, 10);
}

function age() {
  const birth = new Date('06/27/2004');
  const today = new Date();
  const age = (Math.round(((today - birth) / (1000 * 60 * 60))*10000))/10000;
  const age2 = (Math.round(((today - birth) / (1000 * 60 * 60 * 24 * 365))*10000))/10000
  span.innerText = age;
  span2.innerText = age2 ;
}
loop();