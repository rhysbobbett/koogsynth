
waveformSelectVCO.addEventListener('click', () => {
  waveformSelectVCO.checked = true;
  waveformSelectVCF.checked = false;
  waveformSelectVCOVCF.checked = false;
});

waveformSelectVCF.addEventListener('click', () => {
  waveformSelectVCO.checked = false;
  waveformSelectVCF.checked = true;
  waveformSelectVCOVCF.checked = false;
});

waveformSelectVCOVCF.addEventListener('click', () => {
  waveformSelectVCO.checked = false;
  waveformSelectVCF.checked = false;
  waveformSelectVCOVCF.checked = true;
});


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

dials[5] = new Knob({
  id: "VCAGain",
  size: "medium",
  type: "LittlePhatty",
  lowVal: 0,
  highVal: 100,
  value: 50,
  sensitivity: 0.9,
  onChange: (val) => knobChanged("noise", val),
});

// Knob parameter console log
function knobChanged(id, val) {
  console.log(`Knob with ID: ${id} changed to ${val}`);
}

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
  if (synthOn) {
    audioContext.close();
    synthOn = false;
    document.getElementById("onoff").value = "Off";
  }
  else {
    if (createInstrument()) { // ensure that it succeeded
      synthOn = true;
      document.getElementById("onoff").value = "On";
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

function handleKeyDown(event) {
  if (event.repeat) return;

  const key = event.key.toLowerCase();
  const note = getNoteFromKey(key);

  if (note) {
    playNote(note);
  }

  // Octave control key handler
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

// Octave Control Logic
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

// Letter to Note Assignment //
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

// Oscillator Note playback
function playNote(note) {
  const frequency = getFrequency(note);
  const audioCtx = new AudioContext();
  
  if (toggleButtonVCOVCF.checked) {
    const vcoVcfWaveform = waveformSelectVCO.value;
    const vcoVcfCutoff = dials[0].getValue() * 10;
    const vcoVcfPeak = dials[1].getValue() * 10;
    const lfoVcfRate = dials[2].getValue() * 10;
    const lfoVcfInt = dials[3].getValue() * 10;

    vcoVcfOscillator.start();
    
    oscillators[note] = [vcoVcfOscillator, vcfOscillator, lfoOscillator, lfoVcfModu, ];
  } 
  
  else {
    const vcfWaveform = waveformSelectVCF.value;
    const vcfCutoff = dials[0].getValue() * 10;
    const vcfPeak = dials[1].getValue() * 10;
    const vcfOscillator = createOscillator(vcfWaveform, frequency, vcfCutoff, vcfPeak);
    const vcoWaveform = waveformSelectVCO.value;
    const vcoCutoff = dials[1].getValue() * 10;
    const vcoOscillator = createOscillator(vcoWaveform, frequency, vcoCutoff);
    vcoOscillator.start();
    vcfOscillator.start();

    oscillators[note] = [vcoOscillator, vcfOscillator];
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
      lfo.frequency.setValueAtTime(dials[3].getValue() * 100, audioContext.currentTime);
      lfo.start();
    }

    oscillator.connect(vcf.frequency);
    lfo.connect(vcf.frequency);

    return oscillator;
  }
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

function knobChanged(id, val) {
  console.log(`Knob with ID: ${id} changed to ${val}`);
};





