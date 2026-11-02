// Web Audio API Synthesizer - 100% self-contained, no external audio files needed
class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private bgmOscillators: { stop: () => void } | null = null;
  public bgmEnabled: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tiếng nhô lên khỏi hang (Pop cute)
  playPop() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.1);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Tiếng đập trúng Dudu (Squeaky toy squeak / boing)
  playWhackDudu() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Tạo tiếng chút chít vui nhộn
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(600, now);
    osc1.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
    osc1.frequency.exponentialRampToValueAtTime(900, now + 0.18);

    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.2);
  }

  // Tiếng lỡ đập Bubu (Dỗi / Bonk / Còi cảnh báo buồn)
  playHitBubu() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Bonk thấp + âm trượt xuống biểu hiện giận dỗi
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Tiếng ăn Trà Sữa (Sparkle / Chime lấp lánh)
  playBoba() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.ctx!.currentTime + idx * 0.06;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  // Tiếng combo streak
  playCombo(level: number) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const baseFreq = Math.min(440 + level * 60, 1100);
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Tiếng Game Over
  playGameOver() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [440, 415.3, 392, 349.23];
    notes.forEach((freq, idx) => {
      const now = this.ctx!.currentTime + idx * 0.15;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  // Nhạc nền Lofi / Chiptune vui nhộn lặp lại
  startBGM() {
    if (!this.bgmEnabled) return;
    this.initCtx();
    if (!this.ctx || this.bgmOscillators) return;

    let isPlaying = true;
    const melody = [
      { f: 523.25, d: 0.3 }, // C5
      { f: 587.33, d: 0.3 }, // D5
      { f: 659.25, d: 0.3 }, // E5
      { f: 523.25, d: 0.3 }, // C5
      { f: 659.25, d: 0.3 }, // E5
      { f: 783.99, d: 0.6 }, // G5
      { f: 659.25, d: 0.3 }, // E5
      { f: 783.99, d: 0.6 }, // G5
      { f: 880.00, d: 0.3 }, // A5
      { f: 783.99, d: 0.3 }, // G5
      { f: 659.25, d: 0.3 }, // E5
      { f: 523.25, d: 0.6 }  // C5
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!isPlaying || !this.ctx || !this.bgmEnabled) return;
      const item = melody[noteIdx];
      noteIdx = (noteIdx + 1) % melody.length;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.f, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.d - 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + item.d);

      setTimeout(playNext, item.d * 1000);
    };

    playNext();

    this.bgmOscillators = {
      stop: () => {
        isPlaying = false;
        this.bgmOscillators = null;
      }
    };
  }

  stopBGM() {
    if (this.bgmOscillators) {
      this.bgmOscillators.stop();
    }
  }

  toggleBGM() {
    this.bgmEnabled = !this.bgmEnabled;
    if (this.bgmEnabled) {
      this.startBGM();
    } else {
      this.stopBGM();
    }
    return this.bgmEnabled;
  }
}

export const sound = new SoundController();
