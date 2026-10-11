export const audio = new Audio();
audio.crossOrigin = "anonymous";

export const audioCtx = new AudioContext();
export const analyser = audioCtx.createAnalyser();

export const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
