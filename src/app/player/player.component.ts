import { Component, OnDestroy } from '@angular/core';
import { SongsMockDbService } from '../services/songs-mock-db.service';
import { Song } from '../interfaces/song';
import { Subscription } from 'rxjs';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnDestroy {

  songs: Song[] = [];
  currentSong: Song | null = null;
  currentSongIndex: number | null = null;
  isPlaying: boolean = false;
  progressValue: number = 0;

  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();

  constructor(
    private songsMockDbService: SongsMockDbService,
    public audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.sub1 = this.songsMockDbService.getSongs().subscribe(
      songs => {
        this.songs = songs;
        this.currentSong = this.songs[0];
        this.currentSongIndex = 0;
      }
    );

    this.sub2 = this.audioService.timeUpdate$.subscribe(
      progress => {
        this.progressValue = progress;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  play(): void {
    if (this.currentSong) {
      this.audioService.play(this.currentSong);
      this.isPlaying = true;
    }
  }

  pause(): void {
    this.audioService.pause();
    this.isPlaying = false;
  }

  stop(): void {
    this.audioService.stop();
    this.isPlaying = false;
    this.progressValue = 0;
  }

  seekTo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    const seekTimeInSeconds = value * this.audioService.getDuration() / 100;
    this.audioService.seekTo(seekTimeInSeconds);
  }

  previous(): void {
    if (this.currentSongIndex !== null && this.currentSongIndex > 0) {
      this.currentSongIndex--;
      this.currentSong = this.songs[this.currentSongIndex];
      this.play();
    }
  }

  next(): void {
    if (this.currentSongIndex !== null && this.currentSongIndex < this.songs.length - 1) {
      this.currentSongIndex++;
      this.currentSong = this.songs[this.currentSongIndex];
      this.play();
    }
  }

  playRandomTrack(): void {
    const randomIndex = Math.floor(Math.random() * this.songs.length);
    this.currentSong = this.songs[randomIndex];
    this.play();
  }

  formatTime(seconds: number | undefined): string {
    if (typeof seconds !== 'undefined') {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return '';
  }
}
