/* ============================================
   AM — Music library: 4 real artists, real titles
   Audio is procedurally synthesized — NOT the real masters.
   Each recipe is tuned to feel like the energy of the track.
   ============================================ */

const TRACKS = [
  // === DRAKE ===
  {
    id: 'gods-plan', title: "God's Plan", artist: 'Drake', artistId: 'drake',
    album: 'Scorpion', albumId: 'scorpion', year: 2018, duration: 198, plays: '1.8B', art: 'a',
    color: '#c9a25b',
    key: 261.63, tempo: 77, pad: 'sine', bass: 'triangle',
    chords: [[0,3,7,10],[-2,5,8,12],[-4,3,7,10],[0,3,7,12]],
  },
  {
    id: 'hotline-bling', title: 'Hotline Bling', artist: 'Drake', artistId: 'drake',
    album: 'Views', albumId: 'views', year: 2016, duration: 267, plays: '2.4B', art: 'b',
    color: '#d4a24a',
    key: 220.00, tempo: 134, pad: 'triangle', bass: 'sine',
    chords: [[0,4,7,11],[-3,4,7,11],[-5,2,7,11],[0,4,7,14]],
  },
  {
    id: 'passionfruit', title: 'Passionfruit', artist: 'Drake', artistId: 'drake',
    album: 'More Life', albumId: 'more-life', year: 2017, duration: 298, plays: '1.5B', art: 'c',
    color: '#ec8a5d',
    key: 174.61, tempo: 112, pad: 'sine', bass: 'sine',
    chords: [[0,4,7,11],[-2,5,9,12],[-5,2,7,11],[-3,4,9,12]],
  },
  // === LIL UZI VERT ===
  {
    id: 'xo-tour-llif3', title: 'XO Tour Llif3', artist: 'Lil Uzi Vert', artistId: 'uzi',
    album: 'Luv Is Rage 2', albumId: 'luv-rage-2', year: 2017, duration: 182, plays: '2.1B', art: 'd',
    color: '#9b7cff',
    key: 196.00, tempo: 75, pad: 'sawtooth', bass: 'sawtooth',
    chords: [[0,3,7,10],[-4,3,7,10],[-5,2,7,10],[0,3,7,12]],
  },
  {
    id: 'just-wanna-rock', title: 'Just Wanna Rock', artist: 'Lil Uzi Vert', artistId: 'uzi',
    album: 'Pink Tape', albumId: 'pink-tape', year: 2022, duration: 158, plays: '780M', art: 'e',
    color: '#ff7ad9',
    key: 207.65, tempo: 140, pad: 'square', bass: 'triangle',
    chords: [[0,3,7,10],[-2,5,8,12],[0,3,7,10],[-4,3,7,10]],
  },
  {
    id: 'pink-tape', title: 'P2', artist: 'Lil Uzi Vert', artistId: 'uzi',
    album: 'Eternal Atake', albumId: 'eternal-atake', year: 2020, duration: 218, plays: '540M', art: 'f',
    color: '#b88bff',
    key: 246.94, tempo: 88, pad: 'triangle', bass: 'sawtooth',
    chords: [[0,4,7,11],[-3,4,7,12],[-5,2,7,11],[0,4,7,14]],
  },
  // === 21 SAVAGE ===
  {
    id: 'a-lot', title: 'A Lot', artist: '21 Savage', artistId: '21savage',
    album: 'I Am > I Was', albumId: 'i-am-i-was', year: 2018, duration: 287, plays: '720M', art: 'g',
    color: '#5c0d18',
    key: 164.81, tempo: 73, pad: 'sawtooth', bass: 'triangle',
    chords: [[0,3,7,10],[-5,2,7,10],[-3,4,7,10],[0,3,7,12]],
  },
  {
    id: 'bank-account', title: 'Bank Account', artist: '21 Savage', artistId: '21savage',
    album: 'Issa Album', albumId: 'issa', year: 2017, duration: 220, plays: '1.1B', art: 'a',
    color: '#7a0d18',
    key: 174.61, tempo: 75, pad: 'triangle', bass: 'sawtooth',
    chords: [[0,3,7,10],[-2,5,8,12],[-4,3,7,10],[0,3,7,10]],
  },
  {
    id: 'redrum', title: 'redrum', artist: '21 Savage', artistId: '21savage',
    album: 'american dream', albumId: 'american-dream', year: 2024, duration: 244, plays: '420M', art: 'b',
    color: '#a01020',
    key: 155.56, tempo: 70, pad: 'sawtooth', bass: 'triangle',
    chords: [[0,3,7,10],[-3,4,7,10],[-5,2,7,10],[-7,4,7,10]],
  },
  // === FUTURE ===
  {
    id: 'mask-off', title: 'Mask Off', artist: 'Future', artistId: 'future',
    album: 'FUTURE', albumId: 'future-album', year: 2017, duration: 204, plays: '1.9B', art: 'c',
    color: '#3a8c4f',
    key: 207.65, tempo: 75, pad: 'sine', bass: 'triangle',
    chords: [[0,3,7,10],[-2,5,8,12],[0,3,7,10],[-4,3,7,10]],
  },
  {
    id: 'life-is-good', title: 'Life Is Good', artist: 'Future', artistId: 'future',
    album: 'High Off Life', albumId: 'high-off-life', year: 2020, duration: 237, plays: '1.4B', art: 'd',
    color: '#4d9b6a',
    key: 220.00, tempo: 142, pad: 'triangle', bass: 'sine',
    chords: [[0,4,7,11],[-3,4,7,12],[-5,2,7,11],[0,4,9,12]],
  },
  {
    id: 'type-shit', title: 'Type Shit', artist: 'Future', artistId: 'future',
    album: 'WE DON\u2019T TRUST YOU', albumId: 'wdty', year: 2024, duration: 252, plays: '380M', art: 'e',
    color: '#2a6f3a',
    key: 196.00, tempo: 138, pad: 'sawtooth', bass: 'triangle',
    chords: [[0,3,7,10],[-4,3,7,10],[-2,5,8,12],[0,3,7,12]],
  },
];

const ARTISTS = [
  {
    id: 'drake', name: 'Drake', tag: 'Toronto · OVO Sound',
    initials: 'DR', listeners: '78.2M',
    color: '#c9a25b', accent: '#d4a24a',
    bio: 'Aubrey Drake Graham. From OVO to the Billboard Hot 100, the most-streamed artist of the streaming era.',
  },
  {
    id: 'uzi', name: 'Lil Uzi Vert', tag: 'Philadelphia · Generation Now',
    initials: 'UV', listeners: '42.8M',
    color: '#9b7cff', accent: '#ff7ad9',
    bio: 'Symere Bysil Woods. Genre-melting rage-pop with a punk heart, rewriting the rulebook of modern rap.',
  },
  {
    id: '21savage', name: '21 Savage', tag: 'Atlanta · Slaughter Gang',
    initials: '21', listeners: '36.1M',
    color: '#7a0d18', accent: '#a01020',
    bio: 'Sh\u00e9yaa Bin Abraham-Joseph. Cold, deliberate, surgical. A voice that turns minimalism into menace.',
  },
  {
    id: 'future', name: 'Future', tag: 'Atlanta · Freebandz',
    initials: 'FU', listeners: '47.5M',
    color: '#3a8c4f', accent: '#4d9b6a',
    bio: 'Nayvadius DeMun Cash. The architect of modern trap melody \u2014 a decade of mixtapes, classics, and lore.',
  },
];

const ALBUMS = [
  // Drake
  { id: 'scorpion', title: 'Scorpion', artist: 'Drake', artistId: 'drake', year: 2018, tracks: 25, type: 'Album', color: '#c9a25b' },
  { id: 'views', title: 'Views', artist: 'Drake', artistId: 'drake', year: 2016, tracks: 20, type: 'Album', color: '#d4a24a' },
  { id: 'more-life', title: 'More Life', artist: 'Drake', artistId: 'drake', year: 2017, tracks: 22, type: 'Playlist', color: '#ec8a5d' },
  // Uzi
  { id: 'pink-tape', title: 'Pink Tape', artist: 'Lil Uzi Vert', artistId: 'uzi', year: 2023, tracks: 26, type: 'Album', color: '#ff7ad9' },
  { id: 'eternal-atake', title: 'Eternal Atake', artist: 'Lil Uzi Vert', artistId: 'uzi', year: 2020, tracks: 18, type: 'Album', color: '#9b7cff' },
  { id: 'luv-rage-2', title: 'Luv Is Rage 2', artist: 'Lil Uzi Vert', artistId: 'uzi', year: 2017, tracks: 16, type: 'Album', color: '#b88bff' },
  // 21
  { id: 'american-dream', title: 'american dream', artist: '21 Savage', artistId: '21savage', year: 2024, tracks: 15, type: 'Album', color: '#7a0d18' },
  { id: 'i-am-i-was', title: 'I Am > I Was', artist: '21 Savage', artistId: '21savage', year: 2018, tracks: 15, type: 'Album', color: '#a01020' },
  { id: 'issa', title: 'Issa Album', artist: '21 Savage', artistId: '21savage', year: 2017, tracks: 14, type: 'Album', color: '#5c0d18' },
  // Future
  { id: 'wdty', title: 'WE DON\u2019T TRUST YOU', artist: 'Future & Metro Boomin', artistId: 'future', year: 2024, tracks: 17, type: 'Album', color: '#3a8c4f' },
  { id: 'future-album', title: 'FUTURE', artist: 'Future', artistId: 'future', year: 2017, tracks: 17, type: 'Album', color: '#4d9b6a' },
  { id: 'high-off-life', title: 'High Off Life', artist: 'Future', artistId: 'future', year: 2020, tracks: 21, type: 'Album', color: '#2a6f3a' },
];

window.TRACKS = TRACKS;
window.ARTISTS = ARTISTS;
window.ALBUMS = ALBUMS;

// ============================================
// Audio engine (unchanged from previous)
// ============================================
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.analyser = null;
    this.compressor = null;
    this.currentTrack = null;
    this.activeNodes = [];
    this.startedAt = 0;
    this.elapsed = 0;
    this.playing = false;
    this.volume = 0.7;
    this.shuffle = false;
    this.repeat = false;
    this._tickHandlers = new Set();
  }

  _ensureCtx() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -18;
    this.compressor.ratio.value = 3;
    this.compressor.attack.value = 0.005;
    this.compressor.release.value = 0.12;
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.82;
    this.verbInput = this.ctx.createGain();
    this.verbInput.gain.value = 0.35;
    const delay = this.ctx.createDelay(2);
    delay.delayTime.value = 0.28;
    const fb = this.ctx.createGain();
    fb.gain.value = 0.52;
    const verbLP = this.ctx.createBiquadFilter();
    verbLP.type = 'lowpass';
    verbLP.frequency.value = 2200;
    this.verbInput.connect(delay).connect(verbLP).connect(this.master);
    verbLP.connect(fb).connect(delay);
    this.master.connect(this.compressor).connect(this.analyser).connect(this.ctx.destination);
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.08);
    }
  }
  onTick(fn) { this._tickHandlers.add(fn); return () => this._tickHandlers.delete(fn); }
  _tick() { for (const fn of this._tickHandlers) fn(this.getProgress()); }
  getProgress() {
    if (!this.currentTrack) return { elapsed: 0, duration: 0, ratio: 0, playing: false };
    let elapsed = this.elapsed;
    if (this.playing && this.ctx) elapsed += this.ctx.currentTime - this.startedAt;
    const d = this.currentTrack.duration;
    return { elapsed: Math.min(elapsed, d), duration: d, ratio: Math.min(elapsed / d, 1), playing: this.playing };
  }
  _stopAll() {
    for (const n of this.activeNodes) {
      try { n.stop && n.stop(0); } catch (e) {}
      try { n.disconnect(); } catch (e) {}
    }
    this.activeNodes = [];
  }
  _scheduleVoice(freq, start, dur, type, gain, dest, opts = {}) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    if (opts.detune) osc.detune.value = opts.detune;
    const g = ctx.createGain();
    g.gain.value = 0;
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain, start + (opts.attack || 0.4));
    g.gain.linearRampToValueAtTime(gain * 0.7, start + dur * 0.7);
    g.gain.linearRampToValueAtTime(0, start + dur);
    osc.connect(g).connect(dest);
    osc.start(start);
    osc.stop(start + dur + 0.05);
    this.activeNodes.push(osc, g);
    return osc;
  }
  _scheduleLoop(track) {
    const ctx = this.ctx;
    const beat = 60 / track.tempo;
    const barLen = beat * 4;
    const chordCount = track.chords.length;
    const loopLen = barLen * chordCount;
    const startCtx = ctx.currentTime + 0.05;

    const trackBus = ctx.createGain();
    trackBus.gain.value = 0.85;
    const tape = ctx.createBiquadFilter();
    tape.type = 'lowpass';
    tape.frequency.value = 4800;
    tape.Q.value = 0.6;
    trackBus.connect(tape);
    tape.connect(this.master);
    tape.connect(this.verbInput);
    this.activeNodes.push(trackBus, tape);

    for (let i = 0; i < chordCount; i++) {
      const chord = track.chords[i];
      const tStart = startCtx + i * barLen;
      for (const semi of chord) {
        const freq = track.key * Math.pow(2, semi / 12);
        this._scheduleVoice(freq, tStart, barLen + 0.4, track.pad, 0.06, trackBus, { attack: 0.5 });
        this._scheduleVoice(freq, tStart, barLen + 0.4, track.pad, 0.04, trackBus, { attack: 0.5, detune: 8 });
      }
    }
    for (let i = 0; i < chordCount; i++) {
      const root = track.chords[i][0];
      const freq = (track.key / 2) * Math.pow(2, root / 12);
      const tStart = startCtx + i * barLen;
      this._scheduleVoice(freq, tStart, beat * 2.5, track.bass, 0.12, trackBus, { attack: 0.05 });
      this._scheduleVoice(freq, tStart + beat * 2.5, beat * 1.4, track.bass, 0.09, trackBus, { attack: 0.05 });
    }
    const arpFilter = ctx.createBiquadFilter();
    arpFilter.type = 'highpass';
    arpFilter.frequency.value = 600;
    arpFilter.connect(trackBus);
    this.activeNodes.push(arpFilter);
    for (let i = 0; i < chordCount; i++) {
      const chord = track.chords[i];
      const tStart = startCtx + i * barLen;
      for (let s = 0; s < 8; s++) {
        const semi = chord[s % chord.length] + 12;
        const freq = track.key * Math.pow(2, semi / 12);
        this._scheduleVoice(freq, tStart + s * (beat / 2), beat * 0.45, 'sine', 0.025, arpFilter, { attack: 0.005 });
      }
    }
    for (let i = 0; i < chordCount * 4; i++) {
      const tStart = startCtx + i * beat;
      const tick = ctx.createOscillator();
      tick.type = 'square';
      tick.frequency.value = 2400;
      const g = ctx.createGain();
      g.gain.value = 0;
      g.gain.setValueAtTime(0, tStart);
      g.gain.linearRampToValueAtTime(0.015, tStart + 0.001);
      g.gain.exponentialRampToValueAtTime(0.0001, tStart + 0.04);
      tick.connect(g).connect(trackBus);
      tick.start(tStart);
      tick.stop(tStart + 0.05);
      this.activeNodes.push(tick, g);
    }
    this._loopTimer = setTimeout(() => {
      if (this.playing && this.currentTrack && this.currentTrack.id === track.id) {
        this._scheduleLoop(track);
      }
    }, loopLen * 1000 - 100);
  }
  play(track) {
    this._ensureCtx();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    this._stopAll();
    clearTimeout(this._loopTimer);
    this.currentTrack = track;
    this.elapsed = 0;
    this.startedAt = this.ctx.currentTime;
    this.playing = true;
    this._scheduleLoop(track);
    this._startTickLoop();
  }
  resume() {
    if (!this.currentTrack) return;
    this._ensureCtx();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    this.startedAt = this.ctx.currentTime;
    this.playing = true;
    this._scheduleLoop(this.currentTrack);
    this._startTickLoop();
  }
  pause() {
    if (!this.playing) return;
    this.elapsed += this.ctx.currentTime - this.startedAt;
    this.playing = false;
    this._stopAll();
    clearTimeout(this._loopTimer);
    this._tick();
  }
  toggle() {
    if (this.playing) this.pause();
    else if (this.currentTrack) this.resume();
  }
  seek(ratio) {
    if (!this.currentTrack) return;
    const wasPlaying = this.playing;
    this.pause();
    this.elapsed = ratio * this.currentTrack.duration;
    if (wasPlaying) this.resume();
    this._tick();
  }
  _startTickLoop() {
    cancelAnimationFrame(this._raf);
    const loop = () => {
      this._tick();
      const p = this.getProgress();
      if (p.ratio >= 1 && this.playing) {
        if (this.onTrackEnd) this.onTrackEnd();
      }
      this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }
  getAnalyserData() {
    if (!this.analyser) return null;
    const arr = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(arr);
    return arr;
  }
}
window.AudioEngine = AudioEngine;
