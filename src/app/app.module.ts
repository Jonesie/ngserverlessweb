import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';

import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';
import { BlogSummaryComponent } from './blog/blogsummary.component';

import { HomeComponent } from './home.component';
import { ImageGalleryComponent } from './gallery/imagegallery.component';


import { BlogModule } from './blog/blog.module';

import { BlogService } from './blog/blog.service';


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
      { path: 'about', component: AboutComponent },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
    ], { useHash: false }),
    BlogModule,
    SharedModule
  ],
  providers: [
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
