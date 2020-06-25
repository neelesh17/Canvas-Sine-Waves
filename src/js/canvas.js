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

const rectColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01
}


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

const rectFolder = gui.addFolder('rectColor');
rectFolder.add(rectColor, 'r', 0, 255);
rectFolder.add(rectColor, 'b', 0, 255);
rectFolder.add(rectColor, 'g', 0, 255);
rectFolder.add(rectColor, 'a', 0, 0.06);
rectFolder.open();

let increment = wave.frequency;
function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${rectColor.r}, ${rectColor.g}, ${rectColor.b}, ${rectColor.a})`;
  c.fillRect(0,0,innerWidth, innerHeight);
  c.beginPath();
  c.moveTo(0,canvas.height/2);
  for(let  i=0;i<canvas.width;i++){
    c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(1 - increment));
  }
  c.strokeStyle = `hsl(${strokeColor.h}, ${strokeColor.s}%, ${strokeColor.l}%)`
  c.stroke();
  increment += wave.frequency;
}

animate();