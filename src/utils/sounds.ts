// Simple sound utility for button clicks and interactions
export const playClickSound = () => {
  // Create a simple click sound using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

export const playSuccessSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
  oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
  oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + 0.1);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + 0.2);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

// Winner fanfare for final score screen
export const playWinSound = () => {
  const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const audioContext = new AC();

  const createOsc = (type: OscillatorType, freq: number, start: number, dur: number, gain: number) => {
    const osc = audioContext.createOscillator();
    const g = audioContext.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioContext.currentTime + start);
    g.gain.setValueAtTime(0, audioContext.currentTime + start);
    g.gain.linearRampToValueAtTime(gain, audioContext.currentTime + start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + start + dur);
    osc.connect(g).connect(audioContext.destination);
    osc.start(audioContext.currentTime + start);
    osc.stop(audioContext.currentTime + start + dur + 0.05);
  };

  // Short major fanfare (C5, E5, G5, C6)
  const notes = [
    { f: 523.25, t: 0.00, d: 0.12, g: 0.15 }, // C5
    { f: 659.26, t: 0.15, d: 0.12, g: 0.15 }, // E5
    { f: 783.99, t: 0.30, d: 0.12, g: 0.15 }, // G5
    { f: 1046.5, t: 0.55, d: 0.40, g: 0.20 }, // C6 (long)
  ];
  notes.forEach(n => createOsc('triangle', n.f, n.t, n.d, n.g));

  // Final short chord (C5/E5/G5)
  const finaleStart = 0.95;
  [{ f: 523.25 }, { f: 659.26 }, { f: 783.99 }].forEach(n =>
    createOsc('sawtooth', (n as any).f, finaleStart, 0.20, 0.08)
  );
};