import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from '../about.component';
import { BlogComponent } from './blog.component';
import { BlogIndexComponent } from './blogindex.component';
import { KiwianaComponent } from './kiwiana.component';

import { BlogService } from './blog.service';
import { BlogPostGaurdService } from './blog.routegaurd.service';

@NgModule({
  declarations: [
    BlogComponent,
    BlogIndexComponent,
    KiwianaComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'about', component: AboutComponent },
      { path: ':id', component: BlogComponent }, //, canActivate: [BlogPostGaurdService]
      { path: '', component: BlogComponent }
    ])
  ],
  providers: [
    BlogService,
    BlogPostGaurdService
  ]
})
export class BlogModule {

}
