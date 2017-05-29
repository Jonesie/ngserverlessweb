import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

import { BlogComponent } from './blog.component';
import { BlogPostComponent } from './blogpost.component';
import { BlogIndexComponent } from './blogindex.component';

import { BlogService } from './blog.service';
import { BlogPostGaurdService } from './blog.routegaurd.service';

@NgModule({
  declarations: [
    BlogComponent,
    BlogPostComponent,
    BlogIndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'blog/:id', component: BlogComponent, canActivate: [BlogPostGaurdService]},
      { path: 'blog', component: BlogComponent }
    ]),
    SharedModule
  ],
  providers: [
    BlogService,
    BlogPostGaurdService
  ]
})
export class BlogModule {

}
