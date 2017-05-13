import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

import { BlogMainComponent } from './blogmain.component';
import { BlogComponent } from './blog.component';
import { BlogIndexComponent } from './blogindex.component';

import { BlogService } from './blog.service';
import { BlogPostGaurdService } from './blog.routegaurd.service';

@NgModule({
  declarations: [
    BlogMainComponent,
    BlogComponent,
    BlogIndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'blog/:id', component: BlogMainComponent }, //, canActivate: [BlogPostGaurdService]
      { path: 'blog', component: BlogMainComponent }
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
