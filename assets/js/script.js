
const octaveSlider = document.getElementById('octave-slider');
const waveformSelectVCO = document.getElementById('waveform-select-vco');
const waveformSelectVCF = document.getElementById('waveform-select-vcf');
const toggleButtonVCOVCF = document.getElementById('vcf+vco');



let dials = [];

dials[0] = new Knob({
  id: "vcfcutoff",
  size: "medium",
  type: "LittlePhatty",
  lowVal: 0,
  highVal: 100,
  value: 50,
  sensitivity: 0.9,
  onChange: (val) => knobChanged("vcfcutoff", val),
});

dials[1] = new Knob({
  id: "vcfpeak",
  size: "medium",
  type: "LittlePhatty",
  lowVal: 0,
  highVal: 100,
  value: 50,
  sensitivity: 0.9,
  onChange: (val) => knobChanged("vcfpeak", val),
});

dials[2] = new Knob({
  id: "lforate",
  size: "medium",
  type: "LittlePhatty",
  lowVal: 0,
  highVal: 100,
  value: 50,
  sensitivity: 0.9,
  onChange: (val) => knobChanged("lforate", val),
});

dials[3] = new Knob({
  id: "lfoint",
  size: "medium",
  type: "LittlePhatty",
  lowVal: 0,
  highVal: 100,
  value: 50,
  sensitivity: 0.9,
  onChange: (val) => knobChanged("lfoint", val),
});

dials[4] = new Knob({
  id: "noise",
  size: "medium",
  type: "LittlePhatty",
  lowVal: 0,
  highVal: 100,
  value: 50,
  sensitivity: 0.9,
  onChange: (val) => knobChanged("noise", val),
});

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillators = [];
let lfo;

let octave = 4;
const noteToPitch = {
  'F': 43.653528929125485,
  'F#': 46.249302838954299,
  'G': 48.999429497718661,
  'G#': 51.913087197493142,
  'A': 55.000000000000000,
  'A#': 58.270470189761239,
  'B': 61.735412657015513,
  'C': 65.41,
  'C#': 69.30,
  'D': 73.42,
  'D#': 77.78,
  'E': 82.41,
  'F2': 87.31,
};




// event listeners
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Synth power //
function synthOnOff() {
  if ( synthOn ) {
    audioContext.close();
    synthOn = false;
    document.getElementById( "onoff" ).value = "Off";
  }
  else {
    if ( createInstrument() ) { // ensure that it succeeded
      synthOn = true;
      document.getElementById( "onoff" ).value = "On";
    }
  }
}


function handleKeyDown(event) {
  if (event.repeat) return;

  const key = event.key.toLowerCase();
  const note = getNoteFromKey(key);

  if (note) {
    playNote(note);
  }

  // Octave control
  if (key === 'z') {
    decreaseOctave();
  } else if (key === 'x') {
    increaseOctave();
  }
}

function handleKeyUp(event) {
  const key = event.key.toLowerCase();
  const note = getNoteFromKey(key);

  if (note) {
    stopNote(note);
  }
}

function getNoteFromKey(key) {
  const keyboardMap = {
    a: 'F',
    w: 'F#',
    s: 'G',
    e: 'G#',
    d: 'A',
    r: 'A#',
    f: 'B',
    g: 'C',
    y: 'C#',
    h: 'D',
    u: 'D#',
    j: 'E',
    k: 'F2',
  };

  return keyboardMap[key];
  
}

function playNote(note) {
  const frequency = getFrequency(note);

  if (toggleButtonVCOVCF.checked) {
    const vcoVcfWaveform = waveformSelectVCO.value;
    const vcoVcfCutoff = dials[0].getValue() * 10;
    const vcoVcfOscillator = createOscillator(vcoVcfWaveform, frequency, vcoVcfCutoff);
    
  
    vcoVcfOscillator.start();
    oscillators[note] = [vcoVcfOscillator];
  } else {
    const vcfWaveform = waveformSelectVCF.value;
    const vcfCutoff = dials[0].getValue() * 10;
    const vcfOscillator = createOscillator(vcfWaveform, frequency, vcfCutoff);
    vcfOscillator.start();
    const vcoWaveform = waveformSelectVCO.value;
    const vcoCutoff = dials[1].getValue() * 10;
    const vcoOscillator = createOscillator(vcoWaveform, frequency, vcoCutoff);
    vcoOscillator.start();
  
    oscillators[note] = [vcoOscillator, vcfOscillator];
  }
}
function createOscillator(waveform, frequency, cutoff) {
  const oscillator = audioContext.createOscillator();
  const vcf = audioContext.createBiquadFilter();
  


  oscillator.type = waveform;
  vcf.type = "oscillator";

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  vcf.frequency.setValueAtTime(cutoff, audioContext.currentTime);

  oscillator.connect(vcf).connect(audioContext.destination);

  if (!lfo) {
    lfo = audioContext.createOscillator();
    lfo.type = waveformSelectVCO.value;
    lfo.frequency.setValueAtTime(dials[2].getValue() * 10, audioContext.currentTime);
    lfo.start();
  }

  oscillator.connect(vcf.frequency);
  lfo.connect(vcf.frequency);

  return oscillator;
}

function stopNote(note) {
  const oscillatorsToStop = oscillators[note];
  if (oscillatorsToStop) {
    oscillatorsToStop.forEach(oscillator => {
      oscillator.stop();
      oscillator.disconnect();
    });
    delete oscillators[note];
  }
}


function getFrequency(note) {
  const octaveMultiplier = Math.pow(2, octave);
  return noteToPitch[note] * octaveMultiplier;
}

octaveSlider.addEventListener('input', () => {
  octave = parseInt(octaveSlider.value);
});

function decreaseOctave() {
  if (octave > 0) {
    octave--;
    octaveSlider.value = octave;
  }
}

function increaseOctave() {
  if (octave < 8) {
    octave++;
    octaveSlider.value = octave;
  }
}


function knobChanged(id, val) {
  console.log(`Knob with ID: ${id} changed to ${val}`);

  if (id === "lforate" && lfo) {
    lfo.frequency.setValueAtTime(val * 10, audioContext.currentTime);
  }

  if (id === "lfoint") {
    const lfoIntensity = val * 10;
    for (const note in oscillators) {
      const noteOscillators = oscillators[note];
      noteOscillators.forEach(oscillator => {
        oscillator.gain.setValueAtTime(lfoIntensity, audioContext.currentTime);
      });
    }
  }
}

// Mouse Listener for keyboard click //
const keyboard = document.getElementById('keyboard');
const keys = keyboard.querySelectorAll('.white-key, .black-key');
const pressedKeys = {};

keys.forEach(key => {
  key.addEventListener('mousedown', () => {
    const note = key.dataset.note;
    playNote(note);
    pressedKeys[note] = true;
  });

  key.addEventListener('mouseup', () => {
    const note = key.dataset.note;
    stopNote(note);
    delete pressedKeys[note];
  });

  key.addEventListener('mouseleave', () => {
    const note = key.dataset.note;
    if (pressedKeys[note]) {
      stopNote(note);
      delete pressedKeys[note];
    }
  });
});


