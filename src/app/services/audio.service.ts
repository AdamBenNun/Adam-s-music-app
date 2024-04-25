import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio();
  private currentSong: Song | null = null;
  private playing = false;
  private endedSubject = new Subject<void>();
  private timeUpdateSubject = new Subject<number>();

  ended$ = this.endedSubject.asObservable();
  timeUpdate$ = this.timeUpdateSubject.asObservable();

  constructor() {
    this.audio.addEventListener('ended', () => {
      this.endedSubject.next();
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.isPlaying()) {
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration;
        const progress = (currentTime / duration) * 100;
        this.timeUpdateSubject.next(progress);
      }
    });
  }

  play(song: Song): void {
    if (song.audioUrl !== this.currentSong?.audioUrl) {
      this.audio.src = song.audioUrl;
      this.audio.play();
      this.currentSong = song;
      this.playing = true;
    } else {
      this.resume();
    }
  }

  pause(): void {
    this.audio.pause();
    this.playing = false;
  }

  resume(): void {
    this.audio.play();
    this.playing = true;
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.playing = false;
  }

  seekTo(timeInSeconds: number): void {
    if (this.isPlaying()) {
      this.audio.currentTime = timeInSeconds;
    }
  }

  isPlaying(): boolean {
    return this.playing;
  }

  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  getDuration(): number {
    return this.audio.duration || 0;
  }
}
