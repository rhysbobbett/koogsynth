const octaveSlider = document.getElementById('octave-slider');
const waveformSelectVCO = document.getElementById('waveform-select-vco');
const waveformSelectVCF = document.getElementById('waveform-select-vcf');
const toggleButtonVCOVCF = document.getElementById('toggle-button2');

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


let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillators = [];

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

// Keyboard event listeners
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

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
});
