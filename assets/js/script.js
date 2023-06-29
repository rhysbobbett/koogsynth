/*jshint esversion: 6 */
// Audio Context and Nodes
const audioContext = new(window.AudioContext || window.webkitAudioContext)();
const vcaOscillator = audioContext.createOscillator();
const vcaOscillatorGain = audioContext.createGain();
// Power Button
const powerButton = document.getElementById('onoff');
// enable audio
function enableAudio() {
	if (audioContext.state === 'suspended') {
		audioContext.resume().then(function() {
			console.log('Audio started');
		});
	}
}
// disable audio
function disableAudio() {
	if (audioContext.state === 'running') {
		audioContext.suspend().then(function() {
			console.log('audio stopped');
		});
	}
}
// Event listener power button (checkbox)
powerButton.addEventListener('change', function() {
	var synthTitle = document.getElementById(
		'title'); // Get the #title element
	if (powerButton.checked) {
		disableAudio();
		synthTitle.classList.add(
			'power-on'); // Add the class 'power-on' to #title
	}
	else {
		enableAudio();
		synthTitle.classList.remove(
			'power-on'); // Remove the class 'power-on' from #title
	}
});
// audio default state
disableAudio();
// VCA Oscillator and Gain Control
const vcaGainSlider = document.getElementById('vcagain');
const vcaWaveformSelect = document.getElementById('waveformVcaOscillator');
// LFO Oscillator and Gain Control
const lfoFrequencySlider = document.getElementById('lforate');
const lfoIntensitySlider = document.getElementById('lfopeak');
const lfoWaveformSelect = document.getElementById('waveformLfoOscillator');
// Octave Control
const octaveSlider = document.getElementById('octave-slider');
let currentOctave = parseInt(octaveSlider.value);
// Note-to-Pitch and Note-to-Key Mappings
const noteToPitch = {
	'F1': 43.653528929125485,
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
const keyToNote = {
	'A': 'F1',
	'W': 'F#',
	'S': 'G',
	'E': 'G#',
	'D': 'A',
	'R': 'A#',
	'F': 'B',
	'G': 'C',
	'Y': 'C#',
	'H': 'D',
	'U': 'D#',
	'J': 'E',
	'K': 'F2',
};
// Play and Stop Note Functions
const activeNotes = {};

function playSound(note) {
	if (!activeNotes[note]) {
		const frequency = noteToPitch[note] * Math.pow(2, currentOctave - 4);
		const vcaOscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		const lfoMod = audioContext.createOscillator();
		const lfoModGain = audioContext.createGain();
		lfoMod.frequency.value = parseFloat(lfoFrequencySlider.value);
		lfoMod.type = lfoWaveformSelect.value;
		lfoModGain.gain.value = parseFloat(lfoIntensitySlider.value);
		lfoMod.connect(lfoModGain);
		vcaOscillator.type = vcaWaveformSelect.value;
		vcaOscillator.frequency.value = frequency;
		vcaOscillator.connect(gainNode);
		gainNode.gain.value = parseFloat(vcaGainSlider.value);
		gainNode.connect(audioContext.destination);
		activeNotes[note] = {
			vcaOscillator,
			gainNode,
			lfoMod,
			lfoModGain
		};
		lfoModGain.connect(vcaOscillator.frequency);
		vcaOscillator.start();
		lfoMod.start();
	}
}

function stopSound(note) {
	if (activeNotes[note]) {
		const {
			vcaOscillator,
			gainNode,
			lfoMod
		} = activeNotes[note];
		vcaOscillator.stop();
		lfoMod.stop();
		gainNode.disconnect();
		lfoMod.disconnect();
		delete activeNotes[note];
	}
}
// Event Listeners
powerButton.addEventListener('change', function() {
	if (powerButton.checked) {
		audioContext.resume();
	}
	else {
		audioContext.suspend();
	}
});
vcaGainSlider.addEventListener('input', function() {
	const gainValue = parseFloat(vcaGainSlider.value);
	for (const note in activeNotes) {
		activeNotes[note].gainNode.gain.setValueAtTime(gainValue,
			audioContext.currentTime);
	}
});
lfoFrequencySlider.addEventListener('input', function() {
	const frequencyValue = parseFloat(lfoFrequencySlider.value);
	for (const note in activeNotes) {
		activeNotes[note].lfoMod.frequency.setValueAtTime(
			frequencyValue, audioContext.currentTime);
	}
});
lfoIntensitySlider.addEventListener('input', function() {
	const intensityValue = parseFloat(lfoIntensitySlider.value);
	for (const note in activeNotes) {
		activeNotes[note].lfoModGain.gain.setValueAtTime(intensityValue,
			audioContext.currentTime);
	}
});
octaveSlider.addEventListener('input', function() {
	currentOctave = parseInt(octaveSlider.value);
});
document.addEventListener('keydown', function(event) {
	if (event.key === 'z') {
		if (currentOctave > 0) {
			currentOctave--;
			octaveSlider.value = currentOctave;
		}
		event.preventDefault();
	}
	else if (event.key === 'x') {
		if (currentOctave < 8) {
			currentOctave++;
			octaveSlider.value = currentOctave;
		}
		event.preventDefault();
	}
	else {
		const note = keyToNote[event.key.toUpperCase()];
		if (note && !activeNotes[note]) {
			playSound(note);
		}
	}
});
// Event listener for keyup event
document.addEventListener('keyup', function(event) {
	if (event.key === 'z' || event.key === 'x') {
		// ...
	}
	const note = keyToNote[event.key.toUpperCase()];
	if (note) {
		stopSound(note);
	}
});
// Connect Nodes
vcaOscillator.connect(vcaOscillatorGain);
vcaOscillatorGain.connect(audioContext.destination);
// Function to handle mouse click on a key
function handleMouseClick(note) {
	if (!activeNotes[note]) {
		playSound(note);
	}
}
// Function to handle mouse release on a key
function handleMouseRelease(note) {
	if (activeNotes[note]) {
		stopSound(note);
	}
}
// Event listeners for mouse clicks and releases on keys
const whiteKeys = document.querySelectorAll('.white-key');
const blackKeys = document.querySelectorAll('.black-key');
whiteKeys.forEach((key) => {
	key.addEventListener('mousedown', function() {
		const note = this.dataset.note;
		handleMouseClick(note);
	});
	key.addEventListener('mouseup', function() {
		const note = this.dataset.note;
		handleMouseRelease(note);
	});
	key.addEventListener('mouseleave', function() {
		const note = this.dataset.note;
		handleMouseRelease(note);
	});
});
blackKeys.forEach((key) => {
	key.addEventListener('mousedown', function() {
		const note = this.dataset.note;
		handleMouseClick(note);
	});
	key.addEventListener('mouseup', function() {
		const note = this.dataset.note;
		handleMouseRelease(note);
	});
	key.addEventListener('mouseleave', function() {
		const note = this.dataset.note;
		handleMouseRelease(note);
	});
});
// Event listeners for touch events on keys (for touchscreens)
whiteKeys.forEach((key) => {
	key.addEventListener('touchstart', function(event) {
		event.preventDefault();
		const note = this.dataset.note;
		handleMouseClick(note);
	});
	key.addEventListener('touchend', function(event) {
		event.preventDefault();
		const note = this.dataset.note;
		handleMouseRelease(note);
	});
	key.addEventListener('touchcancel', function(event) {
		event.preventDefault();
		const note = this.dataset.note;
		handleMouseRelease(note);
	});
});
blackKeys.forEach((key) => {
	key.addEventListener('touchstart', function(event) {
		event.preventDefault();
		const note = this.dataset.note;
		handleMouseClick(note);
	});
	key.addEventListener('touchend', function(event) {
		event.preventDefault();
		const note = this.dataset.note;
		handleMouseRelease(note);
	});
	key.addEventListener('touchcancel', function(event) {
		event.preventDefault();
		const note = this.dataset.note;
		handleMouseRelease(note);
	});
});
var button = document.getElementById('toggleButton');
button.addEventListener('click', function() {
	this.classList.toggle("active");
	var content = this.nextElementSibling;
	if (content.style.display === "block") {
		content.style.display = "none";
		button.textContent = 'Click to show tooltips';
	}
	else {
		content.style.display = "block";
		button.textContent = 'Click to hide tooltips';
	}
});