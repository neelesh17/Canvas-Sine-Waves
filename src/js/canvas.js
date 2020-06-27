import * as dat from 'dat.gui';

const gui = new dat.GUI();
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
  y: canvas.height/2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
}

const strokeColor = {
  h: 200,
  s: 50,
  l: 50
}

// const rectColor = {
//   r: 0,
//   g: 0,
//   b: 0,
//   a: 0.01
// }


const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', -0.01, 0.01);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', 0.01, 1);
waveFolder.open();

const strokeFolder = gui.addFolder('strokeColor');
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 's', 0, 100);
strokeFolder.add(strokeColor, 'l', 0, 100);
strokeFolder.open();

// const rectFolder = gui.addFolder('rectColor');
// rectFolder.add(rectColor, 'r', 0, 255);
// rectFolder.add(rectColor, 'b', 0, 255);
// rectFolder.add(rectColor, 'g', 0, 255);
// rectFolder.add(rectColor, 'a', 0, 0.06);
// rectFolder.open();

let increment = wave.frequency;
function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(255, 255, 255, 0.02)`;
  c.fillRect(0,0,innerWidth, innerHeight);
  c.beginPath();
  c.moveTo(0,canvas.height/2);
  for(let  i=0;i<canvas.width;i++){
    c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(1 - increment));
  }
  c.strokeStyle = `hsl(${strokeColor.h}, ${strokeColor.s}%, ${strokeColor.l}%)`
  c.stroke();
  increment += wave.frequency;
  c.font = "bold 60px Balsamiq Sans";
  c.fillStyle = "rgba(0,0,0,0.5)";
  c.textAlign = "center";
  c.textBaseline = "ideographic";
  let ctext = "SINE WAVES".split("").join(String.fromCharCode(8201))
  c.fillText(ctext, canvas.width/2, canvas.height/2);
  c.font = "40px Crimson Text";
  c.fillText("Jul 25, 2020", canvas.width/2, canvas.height/2 + 100); 
  c.beginPath();
  c.moveTo(canvas.width/2 - 100 , canvas.height/2 + 20);
  c.lineTo(canvas.width/2 + 100, canvas.height/2 + 20); 
  c.strokeStyle = "rgba(0, 0, 0, 0.5)";
  c.lineWidth = 2.5;
  c.stroke();
  c.closePath();
}

animate();