import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';

import { SharedModule } from './shared/shared.module';

import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';
import { BlogSummaryComponent } from './blog/blogsummary.component';

import { HomeComponent } from './home.component';
import { ImageGalleryComponent } from './gallery/imagegallery.component';


import { BlogModule } from './blog/blog.module';

import { BlogService } from './blog/blog.service';

export const galleryConfig = {
  "style": {
    "background": "",
    "width": "900px",
    "height": "800px"
  },
  "animation": "fade",
  "loader": {
    "width": "50px",
    "height": "50px",
    "position": "center",
    "icon": "tail-spin"
  },
  "description": {
    "position": "top",
    "overlay": false,
    "text": true,
    "counter": true,
    "style": {
      "color": "black"
    }
  },
  "bullets": false,
  "player": false,
  "thumbnails": false,
  "navigation": true,
  "gestures": true
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BlogSummaryComponent,
    HomeComponent,
    ImageGalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'gallery', component: ImageGalleryComponent },
      { path: 'about', component: AboutComponent },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
    ], { useHash: false }),
    BlogModule,
    SharedModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(galleryConfig)
  ],
  providers: [
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
