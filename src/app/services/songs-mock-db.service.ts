import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsMockDbService {

  songs: Song[] = [
    {
      artist: "INRA",
      title: "New Fresh Friends",
      artworkUrl: "assets/images/greenman-horse.webp",
      audioUrl: "assets/audio/INRA - New Fresh Friends.wav"
    },
    {
      artist: "Adam Howse",
      title: "Emblem",
      artworkUrl: "assets/images/glass_gas_mask.webp",
      audioUrl: "assets/audio/Emblem-RSEdit-14.4.23.wav"
    },
    {
      artist: "Adam Ben Nun",
      title: "Laharog Et Ze",
      artworkUrl: "assets/images/country_fair.webp",
      audioUrl: "assets/audio/Laharog Et Ze_m.wav"
    },
    {
      artist: "Adam Howse",
      title: "Swords",
      artworkUrl: "assets/images/HF2y0jLbN7ypxpbCsXFO--1--4dain.webp",
      audioUrl: "assets/audio/Swords_Mastering_v01.wav"
    },
    {
      artist: "INRA",
      title: "Discoteque Beast",
      artworkUrl: "assets/images/1919 film degas.webp",
      audioUrl: "assets/audio/Discoteque Beast_m.wav"
    },
  ]

  getSongs(): Observable<Song[]> {
    return of(this.songs);
  }

}
