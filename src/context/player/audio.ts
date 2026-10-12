export const audio = new Audio();
audio.crossOrigin = "anonymous";

export const audioCtx = new AudioContext();
export const analyser = audioCtx.createAnalyser();
// Default window (-100..-30 dB) pins loud music near full scale.
analyser.maxDecibels = -10;

export const source = audioCtx.createMediaElementSource(audio);
// After the analyser so the visualizer ignores volume.
export const gain = audioCtx.createGain();

source.connect(analyser);
analyser.connect(gain);
gain.connect(audioCtx.destination);
