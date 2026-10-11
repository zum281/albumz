export const audio = new Audio();
audio.crossOrigin = "anonymous";

export const audioCtx = new AudioContext();
export const analyser = audioCtx.createAnalyser();
// Default window (-100..-30 dB) pins loud music near full scale.
analyser.maxDecibels = -10;

export const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
