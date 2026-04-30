/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundService {
  private playSound(url: string) {
    const audio = new Audio(url);
    audio.play().catch(e => console.log('Audio play failed:', e));
  }

  pop() {
    this.playSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
  }

  success() {
    this.playSound('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');
  }

  error() {
    this.playSound('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3');
  }

  click() {
    this.playSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
  }
  
  collect() {
    this.playSound('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3');
  }

  speak(text: string) {
    if (!text) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Detect language
    const containsBangla = /[\u0980-\u09FF]/.test(text);
    const isEnglish = /[a-zA-Z]/.test(text);
    
    utterance.lang = containsBangla ? 'bn-BD' : (isEnglish ? 'en-US' : 'bn-BD');
    
    // Try to find a matching voice explicitly
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;
    
    window.speechSynthesis.speak(utterance);
  }
}

export const sounds = new SoundService();
