const octaveSlider = document.getElementById('octave-slider');
const waveformSelectVCO = document.getElementById('waveform-select-vco');
let dial1 = new Knob({
    size: "medium",
    type: "LittlePhatty",
    lowVal: 0,
    highVal: 100,
    value: 50,
    sensitivity: 0.9,
    id: "vcfcutoffknob"
});
