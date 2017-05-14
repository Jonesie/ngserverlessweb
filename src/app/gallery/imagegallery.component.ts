import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GalleryService } from 'ng-gallery';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'comp-imggallery',
  templateUrl: './imagegallery.component.html'
})
export class ImageGalleryComponent implements OnInit {
  private sub: Subscription;

  private imageIndexUrl: string = "assets/gallery/index.json";
  private imageFolder: string = "assets/gallery/";

  images : any[];

  constructor(private gallery: GalleryService, private http: Http) {

  }

  ngOnInit() {
    this.sub = this.http.get(this.imageIndexUrl)
      .map((response: Response) => <any[]>response.json())
      .subscribe(val => {
        console.log(val);
        this.images = val;
        this.gallery.load(this.images);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
