// Web Audio API sound effects + Web Speech API Indonesian narrator

class AudioEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private speaking = false;
  private onSpeakingChange: ((speaking: boolean) => void) | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setEnabled(value: boolean) {
    this.enabled = value;
    if (!value) {
      this.stopSpeech();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public subscribeSpeaking(cb: (speaking: boolean) => void) {
    this.onSpeakingChange = cb;
  }

  private setSpeaking(state: boolean) {
    this.speaking = state;
    this.onSpeakingChange?.(state);
  }

  public isSpeaking(): boolean {
    return this.speaking;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    delay = 0,
    gainPeak = 0.14
  ) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playClick() {
    this.playTone(580, 0.06, 'triangle', 0, 0.08);
  }

  public playCorrect() {
    if (!this.enabled) return;
    // Cheerful ascending triad (C5 - E5 - G5 - C6)
    this.playTone(523.25, 0.14, 'triangle', 0, 0.14);
    this.playTone(659.25, 0.14, 'triangle', 0.09, 0.14);
    this.playTone(783.99, 0.16, 'triangle', 0.18, 0.15);
    this.playTone(1046.5, 0.28, 'sine', 0.27, 0.16);
  }

  public playPartial() {
    if (!this.enabled) return;
    this.playTone(440, 0.15, 'triangle', 0, 0.12);
    this.playTone(554.37, 0.22, 'triangle', 0.12, 0.12);
  }

  public playIncorrect() {
    if (!this.enabled) return;
    // Gentle constructive descending two-note tone (not harsh)
    this.playTone(349.23, 0.16, 'sine', 0, 0.12);
    this.playTone(293.66, 0.26, 'sine', 0.14, 0.12);
  }

  public playFinishFanfare() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.24, 'triangle', idx * 0.1, 0.14);
    });
  }

  public speakText(text: string) {
    if (!this.enabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const superMap: Record<string, string> = {
      '⁰': '0',
      '¹': '1',
      '²': '2',
      '³': '3',
      '⁴': '4',
      '⁵': '5',
      '⁶': '6',
      '⁷': '7',
      '⁸': '8',
      '⁹': '9',
      '⁻': ' minus ',
      'ⁿ': 'n',
    };

    const cleaned = text
      .replace(/<sup>(.*?)<\/sup>/g, (_, exp: string) => ` pangkat ${exp.replace(/\//g, ' per ')} `)
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿ]+/g, (seq) => {
        const mapped = seq
          .split('')
          .map((ch) => superMap[ch] ?? ch)
          .join('');
        return ` pangkat ${mapped} `;
      })
      .replace(/×/g, ' kali ')
      .replace(/÷/g, ' bagi ')
      .replace(/≤/g, ' kurang dari atau sama dengan ')
      .replace(/≥/g, ' lebih dari atau sama dengan ')
      .replace(/√/g, ' akar ')
      .replace(/±/g, ' kurang lebih ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = 'id-ID';
    utterance.rate = 0.96;
    utterance.pitch = 1.04;

    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onstart = () => this.setSpeaking(true);
    utterance.onend = () => this.setSpeaking(false);
    utterance.onerror = () => this.setSpeaking(false);

    this.setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.setSpeaking(false);
  }
}

export const audioEngine = new AudioEngine();
