// Educational nature audio synthesizer using standard Web Audio API

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientInterval: number | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Tiếng phát hiện sinh vật (Success Chime)
  public playDiscoveryChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
    });
  }

  // Tiếng chim bói cá líu lo (Kingfisher chirp)
  public playBirdChirp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const chirps = [
      { start: 0, f1: 2200, f2: 3200, dur: 0.08 },
      { start: 0.1, f1: 2600, f2: 3600, dur: 0.09 },
      { start: 0.22, f1: 3000, f2: 4200, dur: 0.12 },
    ];

    chirps.forEach((c) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const st = ctx.currentTime + c.start;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(c.f1, st);
      osc.frequency.exponentialRampToValueAtTime(c.f2, st + c.dur);

      gain.gain.setValueAtTime(0, st);
      gain.gain.linearRampToValueAtTime(0.15, st + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, st + c.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(st);
      osc.stop(st + c.dur + 0.01);
    });
  }

  // Tiếng ếch kêu ộp ộp (Frog ribbit)
  public playFrogCroak() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    for (let r = 0; r < 2; r++) {
      const startTime = ctx.currentTime + r * 0.18;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, startTime);
      osc.frequency.exponentialRampToValueAtTime(90, startTime + 0.12);

      // Lowpass filter for throaty frog sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.22, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    }
  }

  // Tiếng bọt nước / cá quẫy đuôi (Water splash & bubble)
  public playWaterBubble() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const st = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, st);
    osc.frequency.exponentialRampToValueAtTime(800, st + 0.12);

    gain.gain.setValueAtTime(0.15, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(st);
    osc.stop(st + 0.17);
  }

  // Tiếng côn trùng vo ve nhẹ (Insect buzz)
  public playInsectBuzz() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const st = ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, st);
    osc.frequency.linearRampToValueAtTime(330, st + 0.2);

    gain.gain.setValueAtTime(0, st);
    gain.gain.linearRampToValueAtTime(0.08, st + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(st);
    osc.stop(st + 0.26);
  }

  // Tiếng nấm rừng / bào tử nhẹ nhàng (Mysterious soft bell)
  public playSporeChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const st = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, st);
    osc.frequency.exponentialRampToValueAtTime(880, st + 0.4);

    gain.gain.setValueAtTime(0.12, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(st);
    osc.stop(st + 0.46);
  }

  // Tiếng click nút giao diện
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const st = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, st);
    osc.frequency.exponentialRampToValueAtTime(200, st + 0.04);

    gain.gain.setValueAtTime(0.08, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(st);
    osc.stop(st + 0.05);
  }
}

export const sound = new SoundEngine();
