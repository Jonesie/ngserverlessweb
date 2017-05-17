import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { IKeyedCollection, KeyedCollection } from '../shared/keyedcollection';
import { IVideo } from './video';

@Component({
  selector: 'comp-video',
  templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  selectedVideo: IVideo;

  videos: IKeyedCollection<IVideo> = new KeyedCollection<IVideo>();

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    this.videos.Add('SQ7pV3FirIA', {
      menu: 'West of Eden',
      title: 'West of Eden, Similan Islands, Thailand. 23 December 2016',
      description: 'This was my second trip to the Similan Islands with Wicked Dive.  This time I was much more confident and enjoyed every dive a lot more.  The Wicked Dive crew on the board were awesome!',
      id: 'SQ7pV3FirIA' });
    this.videos.Add('GlkLQq2Sdsw', {
      menu: 'Strong Current',
      title: 'Strong Current @ Canyons, Sebang, Philippines',
      description: "The guides here were not as particular about safety as I'm used to.  I never felt in danger here, but I would worry about anyone with very little experience.  On this dive the current could have been a problem if anything had gone wrong.  On another dive they seemed unconcerned that my BCD was faulty - I was much more worried so I stayed on the boat.",
      id: 'GlkLQq2Sdsw' });
    this.videos.Add('TeZYSM16Wfk', {
      menu: 'Cuttlefish',
      title: 'Two cute Cuttlefish',
      description: "It was quite unusal to see Cuttlefish in fairly shallow water (about 10 meters from memory).  We where amazeed and floated with them for about 10 minutes.  My tank was down to about 10 bar when we surfaced :) Ssshhhh!.",
      id: 'TeZYSM16Wfk' });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        let id = params['id'];
        if (id === undefined) {
          id = 'SQ7pV3FirIA';
        }
        this.getVideo(id);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getVideo(id: string) {
    this.selectedVideo = this.videos.Item(id);
  }

  getCurrentUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.selectedVideo.id}`);
  }

  getActiveClass(id: string): string {
    return (id == this.selectedVideo.id) ? 'active' : '';
  }
}
