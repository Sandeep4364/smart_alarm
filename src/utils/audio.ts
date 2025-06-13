import type { Sound, SoundSettings } from '../types/sounds';

export class AlarmSound {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private currentSound: Sound;
  private settings: SoundSettings;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;

  constructor(
    sound: Sound = { id: 'default-beep', name: 'Default Beep', type: 'beep', frequency: 440 },
    settings: SoundSettings = { volume: 0.5, pattern: 'intermittent', interval: 500 }
  ) {
    this.currentSound = sound;
    this.settings = settings;
  }

  private initializeAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
  }

  setSound(sound: Sound) {
    this.currentSound = sound;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  setSettings(settings: Partial<SoundSettings>) {
    this.settings = { ...this.settings, ...settings };
    if (this.gainNode && this.isPlaying) {
      this.gainNode.gain.value = this.settings.volume;
    }
  }

  start() {
    if (this.isPlaying) {
      this.stop();
    }
    
    try {
      this.initializeAudioContext();
      if (!this.audioContext) return;

      this.oscillator = this.audioContext.createOscillator();
      this.gainNode = this.audioContext.createGain();

      // Configure oscillator
      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(
        this.currentSound.frequency || 440,
        this.audioContext.currentTime
      );

      // Set volume
      this.gainNode.gain.value = this.settings.volume;

      // Connect nodes
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);

      // Start sound
      this.oscillator.start();
      this.isPlaying = true;

      // Apply pattern if intermittent
      if (this.settings.pattern === 'intermittent') {
        this.createIntermittentPattern();
      }
    } catch (error) {
      console.error('Error starting audio:', error);
    }
  }

  private createIntermittentPattern() {
    if (!this.audioContext || !this.gainNode) return;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const interval = this.settings.interval || 500;
    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        return;
      }
      
      const now = this.audioContext!.currentTime;
      this.gainNode!.gain.setValueAtTime(this.settings.volume, now);
      this.gainNode!.gain.setValueAtTime(0, now + 0.1);
      this.gainNode!.gain.setValueAtTime(this.settings.volume, now + 0.2);
    }, interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (error) {
        console.error('Error stopping oscillator:', error);
      }
      this.oscillator = null;
    }
    
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch (error) {
        console.error('Error disconnecting gain node:', error);
      }
      this.gainNode = null;
    }
    
    this.isPlaying = false;
  }
}
